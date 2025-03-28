"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Search, Plus, Edit, Trash, X } from "lucide-react";
import { Toaster, toast } from "sonner"; 

import { mockCustomers } from "@/lib/utils/data";

const Customers = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Redirect if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

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

  const handleDelete = (customerId) => {
    setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    toast.error("Customer deleted", {
      description: "The customer has been removed successfully.",
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.warning("Validation error", {
        description: "Please fill out all required fields.",
      });
      return;
    }

    if (selectedCustomer) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === selectedCustomer.id ? { ...c, ...formData } : c))
      );
      toast.success("Customer updated", {
        description: "The customer has been updated successfully.",
      });
    } else {
      const newCustomer = {
        id: `${Math.floor(Math.random() * 10000)}`,
        ...formData,
      };
      setCustomers((prev) => [...prev, newCustomer]);
      toast.success("Customer added", {
        description: "The new customer has been added successfully.",
      });
    }

    setIsAddModalOpen(false);
  };

  return (
    <>
      {/* Toast Notification Provider */}
      <Toaster position="top-right" richColors />

      <div className="bg-card rounded-lg border border-border shadow-subtle">
        <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Customers</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-9 px-3 py-2 border border-input rounded-md"
            />
          </div>
          <button
            onClick={handleAddNewClick}
            className="flex items-center py-2 px-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span>Add Customer</span>
          </button>
        </div>
        <div className="p-4">
          {filteredCustomers.length > 0 ? (
            <ul>
              {filteredCustomers.map((customer) => (
                <li key={customer.id} className="flex justify-between items-center p-3 border-b">
                  <span>{customer.name}</span>
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
            <p className="text-center text-muted-foreground">No customers found</p>
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
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Full Name"
                required
                className="w-full p-2 border mb-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Email"
                required
                className="w-full p-2 border mb-2"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="Phone Number"
                required
                className="w-full p-2 border mb-2"
              />
              <button type="submit" className="w-full bg-primary text-white p-2 rounded-md">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Customers;
