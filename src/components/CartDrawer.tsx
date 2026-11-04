import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { OrderItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 35;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EFE8DC]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EFE8DC] flex items-center justify-between bg-[#FDFBF7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-900" />
              <h2 className="font-serif font-bold text-lg text-slate-900">Your Tea Basket</h2>
              <span className="text-xs text-slate-500 font-mono">({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF7F2] p-4 border-b border-[#EFE8DC] text-xs">
            <div className="flex items-center justify-between font-medium text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" />
                {amountToFreeShipping === 0 ? (
                  <strong className="text-emerald-800">You have earned FREE UK Tracked Delivery!</strong>
                ) : (
                  <span>Add <strong>£{amountToFreeShipping.toFixed(2)}</strong> more for <strong>FREE Delivery</strong></span>
                )}
              </span>
              <span className="font-mono text-slate-500">{progressToFreeShipping.toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="font-serif text-slate-800 text-base">Your tea basket is currently empty</p>
                <p className="text-xs text-slate-500">Discover our pure 100% dehydrated beetroot cuts and infusions.</p>
              </div>
            ) : (
              items.map(item => (
                <div key={item.productId} className="flex gap-4 p-3 bg-[#FDFBF7] rounded-xl border border-[#EFE8DC]">
                  <div className="w-16 h-16 rounded-lg bg-white border border-[#EFE8DC] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          if (!e.currentTarget.src.includes('/public/')) {
                            e.currentTarget.src = '/public' + item.image;
                          }
                        }}
                      />
                    ) : (
                      <div className="font-serif font-bold text-xs text-rose-900">BBG</div>
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.productId)}
                        className="text-slate-400 hover:text-rose-700 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500">{item.packSize}</div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center border border-slate-300 rounded bg-white text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100 min-h-[32px] min-w-[32px] flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100 min-h-[32px] min-w-[32px] flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-serif font-bold text-sm text-slate-900">
                        £{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#EFE8DC] bg-[#FDFBF7] space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-slate-900">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated UK Delivery</span>
                  <span>{subtotal >= 35 ? 'FREE (£0.00)' : '£3.50'}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-slate-900 pt-2 border-t border-[#EFE8DC]">
                  <span>Estimated Total</span>
                  <span>£{(subtotal + (subtotal >= 35 ? 0 : 3.50)).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full min-h-[48px] bg-[#881337] hover:bg-[#9F1239] text-white py-3.5 rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-slate-400">
                Encrypted test payment gateway · No raw card details stored
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
