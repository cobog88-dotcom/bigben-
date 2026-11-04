import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Clock, 
  Flame, 
  Leaf, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Plus, 
  Minus 
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-[#EFE8DC] overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#EFE8DC] flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Big Ben Global Limited</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{product.sku}</span>
            <span aria-hidden="true">·</span>
            <span className="text-rose-900 font-semibold">{product.category}</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Visual Photo Panel */}
            <div className="bg-gradient-to-br from-[#FFF1F2] via-[#FDFBF7] to-[#F4EFEA] border border-[#EFE8DC] rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-full h-64 flex items-center justify-center p-2 mb-4 bg-white/70 rounded-xl border border-[#EFE8DC]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-56 max-w-full object-contain rounded-lg shadow-sm"
                  onError={(e) => {
                    if (!e.currentTarget.src.includes('/public/')) {
                      e.currentTarget.src = '/public' + product.image;
                    }
                  }}
                />
              </div>
              <h4 className="font-serif font-bold text-lg text-slate-900 text-center">
                {product.name}
              </h4>
              <p className="text-xs text-slate-500 text-center mt-1">
                {product.packSize}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] text-slate-600">
                <span className="bg-white px-2.5 py-1 rounded-full border border-[#EFE8DC] flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-emerald-700" />
                  <span>100% Botanicals</span>
                </span>
                <span className="bg-white px-2.5 py-1 rounded-full border border-[#EFE8DC] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-rose-800" />
                  <span>Caffeine-Free & Pure</span>
                </span>
              </div>
            </div>

            {/* Details & Purchasing */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span>Pack Format: {product.packSize}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-medium">In Stock ({product.stock} units)</span>
                </div>
                <h2 className="font-serif font-bold text-2xl text-slate-900">
                  {product.name}
                </h2>
                <div className="font-serif font-bold text-2xl text-rose-950 mt-2">
                  £{product.price.toFixed(2)}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector & Add To Cart Button */}
              <div className="pt-2 border-t border-[#EFE8DC] flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg min-h-[44px] min-w-[44px]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-sm text-slate-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg min-h-[44px] min-w-[44px]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={product.stock <= 0}
                  className="flex-1 min-h-[44px] bg-[#881337] hover:bg-[#9F1239] text-white px-6 py-3 rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Your Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart · £{(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Verified Product Fact Boxes */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE8DC]">
                  <span className="font-bold text-slate-900 block mb-0.5">Ingredients & Purity</span>
                  <p className="text-slate-600">{product.ingredients}</p>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE8DC]">
                  <span className="font-bold text-slate-900 block mb-0.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-900" />
                    <span>How to Prepare the Tea</span>
                  </span>
                  <p className="text-slate-600">{product.brewingInstructions}</p>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE8DC]">
                  <span className="font-bold text-slate-900 block mb-0.5">Storage Recommendations</span>
                  <p className="text-slate-600">{product.storage}</p>
                </div>
              </div>

              {/* Guarantees & Trust Signals */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Free UK delivery over £35</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-800 shrink-0" />
                  <span>14-day unopened return guarantee</span>
                </div>
              </div>

              {/* Compliance Notice */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-500 leading-normal">
                <strong>Wellness Disclaimer:</strong> Big Ben Global Limited beetroot tea is a natural root beverage packed with natural plant nitrates. It is not intended to diagnose, treat, cure, or prevent any illness. Consult your GP if taking blood pressure prescriptions or pregnant.
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
