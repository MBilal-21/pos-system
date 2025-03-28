"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { 
  Search, 
  Plus, 
  Filter, 
  Save,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { useSession } from 'next-auth/react';

import ProductGrid from '@/components/products/ProductGrid';
import { mockProducts } from '@/lib/utils/data';

const Products = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    }
  });

  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    category: '',
    barcode: '',
    image: ''
  });

  // Check if loading
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Filter products based on search
  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.barcode.includes(searchQuery)
      )
    : products;

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData(product);
    setIsAddModalOpen(true);
  };

  const handleDelete = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast.success("Product deleted", {
      description: "The product has been removed successfully",
    });
  };

  const handleAddNewClick = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      price: 0,
      stock: 0,
      category: '',
      barcode: '',
      image: ''
    });
    setIsAddModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || formData.price === undefined || formData.stock === undefined) {
      toast.error("Validation error", {
        description: "Please fill out all required fields",
      });
      return;
    }
    
    if (selectedProduct) {
      // Update existing product
      setProducts(prev => 
        prev.map(p => p.id === selectedProduct.id ? { ...p, ...formData } : p)
      );
      toast.success("Product updated", {
        description: "The product has been updated successfully",
      });
    } else {
      // Add new product
      const newProduct = {
        id: `${Math.floor(Math.random() * 10000)}`,
        name: formData.name,
        price: formData.price,
        stock: formData.stock,
        category: formData.category || 'Uncategorized',
        barcode: formData.barcode || `${Math.floor(Math.random() * 10000000000000)}`,
        image: formData.image
      };
      
      setProducts(prev => [...prev, newProduct]);
      toast.success("Product added", {
        description: "The new product has been added successfully",
      });
    }
    
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="bg-card rounded-lg border border-border shadow-subtle">
        {/* Header and tools */}
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <h1 className="text-xl font-semibold">Products</h1>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 px-3 py-2 border border-input rounded-md"
                />
              </div>
              
              <button className="flex items-center py-2 px-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors">
                <Filter className="h-4 w-4 mr-1" />
                <span>Filter</span>
              </button>
              
              <button
                onClick={handleAddNewClick}
                className="flex items-center py-2 px-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="p-4">
          {filteredProducts.length > 0 ? (
            <ProductGrid
              products={filteredProducts}
              mode="manage"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="h-60 flex items-center justify-center text-muted-foreground">
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-background rounded-lg shadow-elevated max-w-md w-full mx-4 animate-scale-in overflow-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-semibold">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Image</label>
                <div className="border border-dashed border-border rounded-md p-4 text-center">
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="w-32 h-32 object-cover mx-auto rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute top-1 right-1 bg-background/80 rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mb-2" />
                      <p className="text-sm">Drop image here or click to upload</p>
                    </div>
                  )}
                  <input
                    type="text"
                    name="image"
                    value={formData.image || ''}
                    onChange={handleFormChange}
                    placeholder="Enter image URL"
                    className="mt-2 w-full px-3 py-2 border border-input rounded-md text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleFormChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock || ''}
                    onChange={handleFormChange}
                    step="1"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-input rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Barcode</label>
                <input
                  type="text"
                  name="barcode"
                  value={formData.barcode || ''}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-input rounded-md"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-input rounded-md text-muted-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center"
                >
                  <Save className="h-4 w-4 mr-1" />
                  {selectedProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;