"use client";
import React from "react";
import ProductCard from "./ProductCart";

const ProductGrid = ({ products, mode = "manage", onAddToCart, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          mode={mode}
          onAddToCart={onAddToCart}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
