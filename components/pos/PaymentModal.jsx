"use client";
import React, { useState } from 'react';
import { X, CreditCard, Banknote, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

const PaymentModal = ({ isOpen, onClose, total, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete(selectedMethod);
    }, 1500);
  };
  
  if (!isOpen) return null;
  
  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard },
    { id: 'cash', name: 'Cash', icon: Banknote },
    { id: 'qr', name: 'QR Payment', icon: QrCode },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-background rounded-lg shadow-elevated max-w-md w-full mx-4 animate-scale-in overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold">Payment</h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4 text-center">
            <p className="text-muted-foreground">Total Amount</p>
            <p className="text-3xl font-bold">${total.toFixed(2)}</p>
          </div>
          
          <div className="space-y-2 mb-6">
            <p className="text-sm font-medium">Select Payment Method</p>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  disabled={isProcessing}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg border transition-all",
                    selectedMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <method.icon className={cn(
                    "h-6 w-6 mb-1",
                    selectedMethod === method.id ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className="text-xs">{method.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {selectedMethod === 'card' && (
            <div className="space-y-3 mb-6">
              <div>
                <label className="text-sm font-medium">Card Number</label>
                <input
                  type="text"
                  disabled={isProcessing}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 mt-1 border border-input rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Expiry Date</label>
                  <input
                    type="text"
                    disabled={isProcessing}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 mt-1 border border-input rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">CVC</label>
                  <input
                    type="text"
                    disabled={isProcessing}
                    placeholder="123"
                    className="w-full px-3 py-2 mt-1 border border-input rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
          
          {selectedMethod === 'cash' && (
            <div className="space-y-3 mb-6">
              <div>
                <label className="text-sm font-medium">Amount Received</label>
                <input
                  type="number"
                  disabled={isProcessing}
                  defaultValue={Math.ceil(total)}
                  className="w-full px-3 py-2 mt-1 border border-input rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Change</label>
                <input
                  type="text"
                  disabled
                  value={`$${(Math.ceil(total) - total).toFixed(2)}`}
                  className="w-full px-3 py-2 mt-1 border border-input rounded-md bg-muted"
                />
              </div>
            </div>
          )}
          
          {selectedMethod === 'qr' && (
            <div className="flex flex-col items-center justify-center p-4 mb-4">
              <div className="w-48 h-48 bg-muted flex items-center justify-center border border-border rounded-lg">
                <QrCode className="w-32 h-32 text-muted-foreground/50" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Scan to pay ${total.toFixed(2)}</p>
            </div>
          )}
          
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={cn(
              "w-full py-3 rounded-md text-white font-medium transition-all",
              isProcessing
                ? "bg-primary/70 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            )}
          >
            {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
