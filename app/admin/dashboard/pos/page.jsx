"use client";
import { useState, useEffect } from 'react';
import { Search, Zap, QrCode } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import ProductGrid from '@/components/products/ProductGrid';
import Cart from '@/components/pos/Cart';
import CustomerSelector from '@/components/CustomerSelector';
import { mockProducts, mockCustomers } from '@/lib/utils/data';
// import { useRouter } from 'next/navigation';
// import { Product } from '@/components/products/ProductCard';
// import { Customer } from '@/components/customers/CustomerSelector';
// import { cn } from '@/lib/utils';

// interface CartItem extends Product {
//   quantity: number;
// }

const Pos = () => {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Check authentication
  useEffect(() => {
  
    fetchCustomers();
  }, [ ]);
  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customer"); // ✅ Fixed endpoint
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      toast.error("Failed to fetch customers");
    }
  };

  // Filter products based on search
  const filteredProducts = searchQuery
    ? mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.barcode.includes(searchQuery)
    ): mockProducts;

  // Add product to cart
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item already in cart, increase quantity
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Otherwise add new item
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} added to cart`);
  };

  // Update cart item quantity
  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    const removedItem = cartItems.find(item => item.id === id);
    setCartItems(prev => prev.filter(item => item.id !== id));
    if (removedItem) {
      toast.warning(`${removedItem.name} removed from cart`);
    }
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
    setSelectedCustomer(null);
    toast.info('Cart cleared');
  };

  if (status === 'loading') {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-6rem)]">
        {/* Left side - Products */}
        <div className="lg:col-span-3 h-full flex flex-col bg-card rounded-lg border border-border shadow-subtle">
          {/* Search and toolbar */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex flex-wrap gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, category, or barcode..."
                  className="w-full pl-9 px-3 py-2 border border-input rounded-md"
                />
              </div>
              
              <button 
                className="flex items-center py-2 px-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors"
                onClick={() => toast.info('Scan functionality coming soon')}
              >
                <QrCode className="h-4 w-4 mr-1" />
                <span>Scan</span>
              </button>
              
              <button 
                className="flex items-center py-2 px-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => toast.info('Quick sale functionality coming soon')}
              >
                <Zap className="h-4 w-4 mr-1" />
                <span>Quick Sale</span>
              </button>
            </div>
            
            <div className="mt-3">
              <CustomerSelector
                customers={customers}
                selectedCustomer={selectedCustomer}
                onSelectCustomer={(customer) => {
                  setSelectedCustomer(customer);
                  toast.success(`Customer ${customer.name} selected`);
                }}
              />
            </div>
          </div>
          
          {/* Products grid */}
          <div className="flex-grow overflow-auto p-4">
            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                mode="pos"
                onAddToCart={handleAddToCart}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>No products found</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Cart */}
        <div className="h-full">
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            customer={selectedCustomer}
            // onCheckout={() => {
            //   if (cartItems.length === 0) {
            //     toast.error('Cart is empty');
            //     return;
            //   }
            //   if (!selectedCustomer) {
            //     toast.error('Please select a customer');
            //     return;
            //   }
            //   toast.success('Checkout completed!');
            //   handleClearCart();
            // }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pos;