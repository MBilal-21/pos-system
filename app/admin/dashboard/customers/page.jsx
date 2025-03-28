"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash, X } from "lucide-react";
import { Toaster, toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

const Customers = () => {
  // const router = useRouter();
  // const { data: session, status } = useSession();
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingc, setLoadingc] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });



  useEffect(() => {
    fetchCustomers();
  }, []);

  

  const filteredCustomers = searchQuery
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phone.includes(searchQuery)
      )
    : customers;

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setFormData(customer);
    setIsAddModalOpen(true);
  };

 
  

  const handleAddNewClick = () => {
    setSelectedCustomer(null);
    setFormData({ name: "", email: "", phone: "" });
    setIsAddModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
  
  // fetchCustomers function to get the list of customers from the server
// --------------------
const fetchCustomers = async () => {
  try {
    setLoadingc(true);
    const response = await fetch("/api/customer"); // ✅ Fixed endpoint
    const data = await response.json();
    setCustomers(data);
    setLoadingc(false);
  } catch (error) {
    setLoadingc(false);
    toast.error("Failed to fetch customers");
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let response;
    if (selectedCustomer) {
      response = await fetch(`/api/customer`, { // ✅ Fixed endpoint
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      response = await fetch("/api/customer", { // ✅ Fixed endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    const newCustomer = await response.json();
    if (!selectedCustomer) {
      setCustomers([...customers, newCustomer]);
    } else {
      setCustomers(customers.map((c) => (c.id === newCustomer.id ? newCustomer : c)));
    }
    toast.success("Customer saved successfully");
    setIsAddModalOpen(false);
  } catch (error) {
    toast.error("Failed to save customer");
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (customerId) => {
  try {
    await fetch(`/api/customer`, { // ✅ Fixed endpoint
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: customerId }),
    });
    setCustomers(customers.filter((c) => c.id !== customerId));
    toast.success("Customer deleted");
  } catch (error) {
    toast.error("Failed to delete customer");
  }
};

// --------------------
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="bg-card rounded-lg border border-border shadow-subtle">
        <div className="p-4 border-b bg-muted/30 flex justify-between">
          <h1 className="text-xl font-semibold">Customers</h1>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers..."
            className="w-64 px-3 py-2 border rounded-md"
          />
          <button onClick={handleAddNewClick} className="bg-primary text-white px-4 py-2 rounded">
            <Plus className="h-4 w-4 mr-1" /> Add Customer
          </button>
        </div>
        <div className="p-4">
          {filteredCustomers.length ? (
            <ul>
              {filteredCustomers.map((customer) => (
                <li key={customer.id} className="flex justify-between p-3 border-b">
                  <span>{customer.name}</span>
                  <span className="hidden lg:block">{customer.email}</span>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(customer)}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(customer.id)}>
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">{loadingc?"Loading...":"No customers found"}</p>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div className="flex justify-between">
              <h2>{selectedCustomer ? "Edit Customer" : "Add New Customer"}</h2>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Full Name" required className="w-full p-2 border mb-2" />
              <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" required className="w-full p-2 border mb-2" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone Number" required className="w-full p-2 border mb-2" />
              <button type="submit" className="w-full bg-primary text-white p-2 rounded-md" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Customers;
