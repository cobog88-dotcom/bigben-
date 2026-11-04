import React from 'react';
import { ArrowRight, Sparkles, Shield, Clock, Leaf, Heart } from 'lucide-react';
import { Product } from '../types';

interface HomeHeroProps {
  onShopNow: () => void;
  onLearnMore: () => void;
  featuredProducts: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, qty: number) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onShopNow,
  onLearnMore,
  featuredProducts,
  onViewProduct,
  onAddToCart
}) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F3EA] via-[#FAF7F2] to-[#FAF7F2] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#EFE8DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Zero-Pill Quiet Brand Tag */}
              <div className="flex items-center gap-2 text-xs text-rose-900 font-semibold tracking-wide">
                <span>Big Ben Global Limited</span>
                <span aria-hidden="true">·</span>
                <span>Single-Origin Pure Beetroot Infusion</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-800">100% Herbal</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.12] tracking-tight">
                Vibrant natural wellness, <span className="text-[#881337] italic font-serif">steeped from the earth.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed">
                Discover the deep crimson warmth of 100% pure dehydrated mature beetroot. Naturally sweet, earthy, and completely caffeine-free—crafted to turn every daily tea break into a mindful restorative ritual.
              </p>

              {/* Action Buttons (Touch targets >= 44px) */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onShopNow}
                  className="min-h-[48px] px-7 py-3.5 bg-[#881337] hover:bg-[#9F1239] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Shop Tea Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onLearnMore}
                  className="min-h-[48px] px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all"
                >
                  How to Prepare & Brew
                </button>
              </div>

              {/* Value Proposition Highlights Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#EFE8DC] text-xs text-slate-600">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Pure Dehydration</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Zero preservatives or additives</p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-rose-800" />
                    <span>Zero Caffeine</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Gentle hydration day or evening</p>
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>5-7 Min Infusion</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Rich natural crimson color</p>
                </div>
              </div>

            </div>

            {/* Right Visual Art Panel Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-gradient-to-tr from-[#FFF1F2] via-[#FDFBF7] to-[#FAF7F2] rounded-3xl border-2 border-[#EFE8DC] p-6 sm:p-7 shadow-xl relative overflow-hidden text-center">
                
                {/* Real Product Image Showcase */}
                <div className="relative h-56 bg-white/80 rounded-2xl border border-[#EFE8DC] p-4 flex items-center justify-center mb-5 shadow-sm overflow-hidden group">
                  <img
                    src={featuredProducts[0]?.image || '/assets/aistudio/Big_Ben_Original_Pure_Beetroot_Tea_8a68a0c8.jpg'}
                    alt="Beetroot and Hibiscus Tea"
                    className="max-h-48 w-auto object-contain rounded-lg drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      if (!e.currentTarget.src.includes('/public/')) {
                        e.currentTarget.src = '/public/assets/aistudio/Big_Ben_Original_Pure_Beetroot_Tea_8a68a0c8.jpg';
                      }
                    }}
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#881337] text-white px-2 py-0.5 rounded-full shadow-xs">
                    25 Tea Bags
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] text-rose-900 uppercase tracking-widest font-mono font-semibold">Featured Botanical Blend</span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                    BEETROOT AND HIBISCUS TEA
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed px-2">
                    Whole mature beetroot root paired with ruby red hibiscus petals. 100% natural, caffeine-free, and rich in natural antioxidants.
                  </p>
                </div>

                {/* Thumbnail strip of other uploaded lines */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-[#EFE8DC]">
                  {featuredProducts.slice(1, 5).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onViewProduct(p)}
                      className="w-12 h-12 bg-white rounded-lg border border-[#EFE8DC] p-1 shadow-2xs hover:border-rose-800 hover:scale-105 transition-all"
                      title={p.name}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          if (!e.currentTarget.src.includes('/public/')) {
                            e.currentTarget.src = '/public' + p.image;
                          }
                        }}
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs px-1">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 font-mono">PACK FORMAT</span>
                    <div className="font-serif font-bold text-base text-slate-900">25 Tea Bags · £12.50</div>
                  </div>
                  <button
                    onClick={() => {
                      if (featuredProducts[0]) onViewProduct(featuredProducts[0]);
                    }}
                    className="px-4 py-2 bg-[#881337] hover:bg-[#9F1239] text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                  >
                    View Details
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Botanical Fact Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-slate-700">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block text-sm">1. Sourced with Care</span>
              <p className="text-slate-500">Only mature roots harvested at peak sugar and nitrate development.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block text-sm">2. Pure Dehydration</span>
              <p className="text-slate-500">Gently dried under controlled low heat to lock in color and earthy flavor.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block text-sm">3. Transparent Pricing</span>
              <p className="text-slate-500">From £12.50 with zero hidden checkout fees. Free UK tracked delivery over £35.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block text-sm">4. Compliant Wellness</span>
              <p className="text-slate-500">Zero false medical promises. Genuine culinary hydration and honest preparation.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
