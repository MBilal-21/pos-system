"use client";
import React, { useState } from "react";
import { Trash, Plus, Minus, ShoppingBag } from "lucide-react";
import PaymentModal from "./PaymentModal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Cart = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart, 
  customer,
  onCheckout 
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07; // Assuming 7% tax
  const total = subtotal + tax;

  const handleQuantityChange = (id, change) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = item.quantity + change;

    if (newQuantity > 0 && newQuantity <= item.stock) {
      onUpdateQuantity(id, newQuantity);
      toast.success(`Quantity updated to ${newQuantity}`);
    } else if (newQuantity <= 0) {
      onRemoveItem(id);
    } else {
      toast.error(`Only ${item.stock} available in stock`);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Please add items to your cart before checkout");
      return;
    }

    if (!customer) {
      toast.error("Please select a customer before checkout");
      return;
    }

    if (onCheckout) {
      onCheckout();
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const handlePaymentComplete = (method) => {
    toast.success(`Payment of $${total.toFixed(2)} via ${method} completed!`);
    onClearCart();
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border shadow-subtle overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h2 className="font-medium flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Current Sale
          </h2>
          {items.length > 0 && (
            <button
              onClick={() => {
                onClearCart();
                toast.info("Cart cleared");
              }}
              className="text-sm text-muted-foreground hover:text-destructive"
            >
              Clear All
            </button>
          )}
        </div>

        {customer && (
          <div className="mt-2 text-sm">
            <span className="text-muted-foreground">Customer: </span>
            <span className="font-medium">{customer.name}</span>
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-grow overflow-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-4">
            <ShoppingBag className="h-12 w-12 mb-2 opacity-20" />
            <p className="text-center">Your cart is empty</p>
            <p className="text-center text-sm">Add products to get started</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-background rounded-md p-2 border border-border/60"
            >
              <div className="flex-grow min-w-0">
                <h3 className="font-medium text-sm truncate">{item.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </span>
                  <span className="font-medium text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center ml-2">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="p-1 rounded-md hover:bg-muted"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="p-1 rounded-md hover:bg-muted"
                >
                  <Plus className="h-3 w-3" />
                </button>
                <button
                  onClick={() => {
                    onRemoveItem(item.id);
                    toast.warning(`${item.name} removed from cart`);
                  }}
                  className="p-1 rounded-md hover:bg-muted ml-1 text-muted-foreground hover:text-destructive"
                >
                  <Trash className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary & Checkout */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="space-y-1 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (7%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium pt-1 border-t border-border/60">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={items.length === 0}
          className={cn(
            "w-full py-2 px-4 rounded-md text-white font-medium transition-all",
            items.length === 0
              ? "bg-primary/50 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          Checkout
        </button>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default Cart;