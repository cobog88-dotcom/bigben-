import React from 'react';
import { Layers, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: any) => void;
  onOpenWireframe?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1E293B] text-slate-300 border-t border-slate-800 pt-16 pb-12 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#881337] text-white flex items-center justify-center font-serif font-bold text-sm">
                BBG
              </div>
              <div>
                <span className="font-serif font-bold text-base text-white block">Big Ben Global</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Limited · London</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Purveyors of single-origin herbal tea blends, pure cold-pressed virgin oils, and natural wellness essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Public Storefront
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home & Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Tea Catalogue & Pack Sizes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('brew-guide')} className="hover:text-white transition-colors">
                  How to Prepare the Tea
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Our Story & Purity Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact & Wholesale Leads
                </button>
              </li>
            </ul>
          </div>

          {/* Workspaces & Accounts */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Portals & Roles
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('customer-dashboard')} className="hover:text-white transition-colors">
                  Customer Account & Orders
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-white transition-colors">
                  Admin Workspace & Operations
                </button>
              </li>
              <li>
                <span className="text-slate-500">Live Carrier Dispatch (Royal Mail / DPD)</span>
              </li>
              <li>
                <span className="text-slate-500">Grounded Gemini AI Support Assistant</span>
              </li>
            </ul>
          </div>

          {/* Delivery & Compliance Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Policies & Delivery
            </h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <p>• UK Standard Tracked (£3.50, FREE over £35)</p>
              <p>• UK Express Next-Day (£6.50)</p>
              <p>• 14-day unopened tamper-evident seal return policy</p>
              <p>• Secure Paystack & Flutterwave test sandbox</p>
            </div>
          </div>

        </div>

        {/* Regulatory Wellness Disclosure Box */}
        <div className="pt-8 border-t border-slate-800 text-slate-400 text-[11px] leading-relaxed space-y-2">
          <p className="flex items-start gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              <strong>Wellness Compliance Statement:</strong> Statements regarding Big Ben Global Limited beetroot tea have not been evaluated as medical treatment. Beetroot is a nutrient-dense root vegetable containing naturally occurring dietary nitrates. This beverage is sold strictly as a natural herbal tea, not a pharmaceutical or disease treatment.
            </span>
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-[11px] text-slate-500 border-t border-slate-800/80">
            <div>
              &copy; {new Date().getFullYear()} Big Ben Global Limited. All rights reserved. Registered in England & Wales.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Sale</span>
              <span>·</span>
              <span>Cookie Discipline</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
