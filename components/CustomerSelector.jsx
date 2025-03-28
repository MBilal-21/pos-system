// components/app-sidebar.jsx
'use client'


import React, { useState } from "react";
import { Users, Search, Plus, X } from "lucide-react";

const CustomerSelector = ({ customers, selectedCustomer, onSelectCustomer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleOpen = () => setIsOpen(!isOpen);

  const filteredCustomers = searchQuery
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phone.includes(searchQuery)
      )
    : customers;

  return (
    <div className="relative">
      {selectedCustomer ? (
        <div className="flex items-center justify-between p-2 border border-border rounded-md bg-accent/30">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
              {selectedCustomer.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{selectedCustomer.name}</p>
              <p className="text-xs text-muted-foreground">{selectedCustomer.phone}</p>
            </div>
          </div>
          <button
            onClick={() => onSelectCustomer(null)}
            className="p-1 rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={toggleOpen}
          className="flex items-center space-x-2 w-full p-2 border border-border rounded-md hover:border-primary/50 transition-all"
        >
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">Select Customer</span>
        </button>
      )}

      {isOpen && (
        <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-background rounded-md border border-border shadow-elevated animate-slide-down">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customers..."
                className="w-full pl-8 px-3 py-2 border border-input rounded-md text-sm"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => {
                    onSelectCustomer(customer);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full p-2 hover:bg-accent text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">{customer.phone}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <p>No customers found</p>
              </div>
            )}
          </div>

          <div className="p-2 border-t border-border">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full p-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New Customer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSelector;
