import React from 'react';
import { ShoppingBag, Eye, Leaf } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails
}) => {
  const isLowStock = product.stock > 0 && product.stock <= 15;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="bg-white rounded-2xl border border-[#EFE8DC] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
      
      {/* Product Visual Container with Real Photo Asset */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative h-64 bg-gradient-to-b from-[#FDFBF7] to-[#F4EFEA] p-4 flex flex-col justify-between cursor-pointer overflow-hidden border-b border-[#EFE8DC]"
      >
        {/* Top Badges / Stock Alerts */}
        <div className="flex items-center justify-between z-10 text-xs">
          <span className="text-[11px] font-medium text-slate-700 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#EFE8DC] shadow-xs">
            {product.category}
          </span>
          {isOutOfStock ? (
            <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Only {product.stock} left
            </span>
          ) : (
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              In Stock
            </span>
          )}
        </div>

        {/* Real Product Photography */}
        <div className="flex-1 flex items-center justify-center p-2 z-10 my-auto">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-44 w-auto object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              // Fallback if path prefix differs
              if (!e.currentTarget.src.includes('/public/')) {
                e.currentTarget.src = '/public' + product.image;
              }
            }}
          />
        </div>

        {/* Quick View Floating Hint */}
        <div className="text-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[11px] text-slate-700 bg-white/95 px-3 py-1 rounded-full shadow-xs border border-slate-200 inline-flex items-center gap-1.5 font-medium">
            <Eye className="w-3.5 h-3.5 text-rose-900" />
            <span>Click to inspect details</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Zero-Pill Typography Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-medium text-slate-700">{product.packSize}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-800 font-medium">100% Natural</span>
          </div>

          <h3 
            onClick={() => onViewDetails(product)}
            className="font-serif font-bold text-base sm:text-lg text-slate-900 group-hover:text-rose-900 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-[#EFE8DC] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-mono">Price</span>
            <div className="font-serif font-bold text-lg text-slate-900">
              £{product.price.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product, 1)}
            disabled={isOutOfStock}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm ${
              isOutOfStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#881337] hover:bg-[#9F1239] text-white active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
