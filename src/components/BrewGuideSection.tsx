import React from 'react';
import { Flame, Clock, Coffee, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface BrewGuideSectionProps {
  onShopNow: () => void;
}

export const BrewGuideSection: React.FC<BrewGuideSectionProps> = ({ onShopNow }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="text-xs text-rose-900 font-semibold tracking-wider uppercase font-mono">
          The Art of the Infusion
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          How to Prepare Big Ben Beetroot Tea
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Because our tea uses pure dehydrated beetroot cuts rather than powdery instant additives, it requires a proper 5-7 minute steep to unlock its natural sweetness and crimson liquor.
        </p>
      </div>

      {/* 3-Step Brew Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Step 1 */}
        <div className="bg-white rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-900 border border-rose-200 flex items-center justify-center font-bold text-lg font-serif">
            1
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Flame className="w-3.5 h-3.5 text-rose-700" />
              <span>Freshly Boiled · 95°C – 100°C</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Heat Fresh Spring Water
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Boil fresh filtered or spring water. High mineral content in tap water can slightly mute the natural ruby tone of the beetroot.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center font-bold text-lg font-serif">
            2
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>Infuse 5 – 7 Minutes</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Measure & Steep Gently
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Add 1-2 heaped teaspoons (approx. 4g) of loose cuts per 250ml mug, or 1 pyramid bag. Cover the cup while steeping to retain the aromatic earthy botanicals.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center justify-center font-bold text-lg font-serif">
            3
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Coffee className="w-3.5 h-3.5 text-emerald-700" />
              <span>Hot or Iced with Lemon</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Savor & Personalize
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Enjoy piping hot for calming evening hydration, or let it chill over ice with a wheel of fresh lemon or crushed mint for an invigorating summer refresher.
          </p>
        </div>

      </div>

      {/* Culinary & Storage Guide Strip */}
      <div className="bg-[#FAF7F2] rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <span className="text-xs text-rose-900 font-bold uppercase tracking-wider font-mono">
            Optimal Storage Discipline
          </span>
          <h4 className="font-serif font-bold text-xl text-slate-900">
            Keep your beetroot cuts fresh for up to 18 months
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Because our dehydration removes almost 94% of water activity naturally, our tea requires no chemical stabilizers. Keep pouches zipped airtight in a cool, dry cupboard away from direct sunshine.
          </p>
        </div>

        <div className="space-y-2 text-xs text-slate-700 border-t md:border-t-0 md:border-l border-[#EFE8DC] pt-4 md:pt-0 md:pl-8">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Re-steep friendly: Can be brewed a 2nd time for a lighter cup</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>French press compatible: Effortless multi-cup table service</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Zero tannins: Never gets bitter even if steeped longer than 10 minutes</span>
          </div>
          <div className="pt-3">
            <button
              onClick={onShopNow}
              className="px-5 py-2.5 bg-[#881337] hover:bg-[#9F1239] text-white rounded-xl font-semibold shadow-sm text-xs flex items-center gap-2"
            >
              <span>Explore Pack Sizes in Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};
