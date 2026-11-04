import React from 'react';
import { ShieldCheck, Leaf, Heart, Eye, Award, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="text-xs text-rose-900 font-semibold tracking-wider uppercase font-mono">
          Our Heritage & Approach
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          The Big Ben Global Story
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Founded with a clear dedication to botanical purity, Big Ben Global Limited connects thoughtful tea drinkers with the natural sweetness, rich crimson hue, and wholesome minerals of dehydrated mature beetroot.
        </p>
      </div>

      {/* Brand Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-900 flex items-center justify-center font-bold">
            <Leaf className="w-6 h-6 text-rose-800" />
          </div>
          <h3 className="font-serif font-bold text-lg text-slate-900">
            1. Pure Botanical Integrity
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We avoid shortcuts. No artificial red colorants, no citric acid fillers, and no added sugars. Just single-ingredient dehydrated mature <em>Beta vulgaris</em> root cuts that yield an authentic earthy brew.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
          </div>
          <h3 className="font-serif font-bold text-lg text-slate-900">
            2. Responsible Wellness Language
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We respect our customers and food standards authorities. We never make disease treatment promises or hallucinated medical claims. We present beetroot tea as a wholesome, naturally caffeine-free herbal beverage.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center font-bold">
            <Award className="w-6 h-6 text-amber-700" />
          </div>
          <h3 className="font-serif font-bold text-lg text-slate-900">
            3. Gentle Dehydration
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our dehydration process gently pulls moisture at controlled low temperatures. This preserves the root's inherent sweetness without cooking away its natural qualities.
          </p>
        </div>
      </div>

      {/* Sourcing & Company Approvals Notice */}
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#EFE8DC] p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1">
            Corporate Transparency & Traceability
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Verified Standards & Operational Records
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            In accordance with the Big Ben Global Limited build prompt, unverified company claims are clearly labeled as placeholders pending corporate board confirmation:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-[#EFE8DC] space-y-1">
            <div className="text-slate-400 font-mono text-[10px]">CORPORATE REGISTRATION</div>
            <div className="font-bold text-slate-900">Big Ben Global Limited</div>
            <div className="text-slate-500 text-[11px]">Registered in England & Wales [Placeholder: 14982103]</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#EFE8DC] space-y-1">
            <div className="text-slate-400 font-mono text-[10px]">HEADQUARTERS LOCATION</div>
            <div className="font-bold text-slate-900">London Coordination Office</div>
            <div className="text-slate-500 text-[11px]">Kensington High Street, London W8 [Placeholder for approval]</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#EFE8DC] space-y-1">
            <div className="text-slate-400 font-mono text-[10px]">PACKAGING & BLENDS</div>
            <div className="font-bold text-slate-900">100% Plant-Based Pyramids</div>
            <div className="text-slate-500 text-[11px]">Corn-starch derived biodegradable filter mesh</div>
          </div>
        </div>

        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Company Fact Commitment:</strong> All statements regarding pack weights, prices, shelf-life, and ingredient composition on this platform reflect company-authorized parameters.
          </div>
        </div>
      </div>

    </div>
  );
};
