"use client";
import React from "react";
import { Edit, Trash, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductCard = ({ product, mode = "manage", onAddToCart, onEdit, onDelete }) => {
  const { id, name, price, stock, category, image } = product;

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(product);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(id);
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-lg border border-border overflow-hidden transition-all duration-300",
        mode === "pos" ? "hover:shadow-subtle" : "hover:shadow-none"
      )}
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-secondary/30">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col p-3 flex-grow">
        <h3 className="font-medium text-sm line-clamp-1">{name}</h3>
        <div className="flex items-center mt-1 justify-between">
          <span className="text-primary font-bold">${price.toFixed(2)}</span>
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              stock > 10
                ? "bg-green-100 text-green-800"
                : stock > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </span>
        </div>
        <span className="text-xs text-muted-foreground mt-1">{category}</span>
      </div>

      {/* Actions */}
      <div className={cn("p-3 pt-0 flex", mode === "pos" ? "justify-between" : "justify-end gap-2")}>
        {mode === "pos" ? (
          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className={cn(
              "flex items-center justify-center rounded-md p-1",
              stock > 0
                ? "text-primary hover:bg-primary hover:text-primary-foreground"
                : "text-muted-foreground cursor-not-allowed"
            )}
          >
            <Plus className="h-5 w-5" />
          </button>
        ) : (
          <>
            <button onClick={handleEdit} className="text-muted-foreground hover:text-foreground rounded-md p-1">
              <Edit className="h-4 w-4" />
            </button>
            <button onClick={handleDelete} className="text-muted-foreground hover:text-destructive rounded-md p-1">
              <Trash className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
