// import { Product } from "@/components/products/ProductCard";
// import { Customer } from "@/components/customers/CustomerSelector";

export const mockProducts = [
  {
    id: "1",
    name: "Smartphone X",
    price: 899.99,
    stock: 15,
    category: "Electronics",
    barcode: "1234567890123",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2342&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 159.99,
    stock: 8,
    category: "Electronics",
    barcode: "2345678901234",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2184&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Laptop Pro",
    price: 1299.99,
    stock: 5,
    category: "Electronics",
    barcode: "3456789012345",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2340&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Smart Watch",
    price: 249.99,
    stock: 12,
    category: "Electronics",
    barcode: "4567890123456",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2344&auto=format&fit=crop"
  },
];

export const mockCustomers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "123-456-7890"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "234-567-8901"
  },
];

export const mockOrders = [
  {
    id: "ord-001",
    customerId: "1",
    customerName: "John Smith",
    items: [
      { productId: "1", name: "Smartphone X", price: 899.99, quantity: 1 },
      { productId: "5", name: "Bluetooth Speaker", price: 79.99, quantity: 1 }
    ],
    total: 979.98,
    date: "2023-10-15T14:35:42Z",
    paymentMethod: "card",
    status: "completed"
  },
];

export const getSalesData = () => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const dailySales = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const isWeekend = new Date(today.getFullYear(), today.getMonth(), day).getDay() % 6 === 0;
    const salesAmount = Math.round((isWeekend ? 2000 : 1000) + Math.random() * 1500);

    return {
      date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      sales: salesAmount
    };
  });

  return dailySales;
};

export const getCategorySales = () => {
  return [
    { name: "Electronics", value: 5840 },
    { name: "Home Appliances", value: 2490 },
  ];
};
