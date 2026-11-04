import React, { useState } from 'react';
import { 
  ShoppingBag, 
  User as UserIcon, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  LogIn,
  Check, 
  UserPlus
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  onSwitchUserRole: (role: 'customer' | 'admin' | 'guest') => void;
  cartCount: number;
  onOpenCart: () => void;
  activeView: 'home' | 'shop' | 'brew-guide' | 'about' | 'contact' | 'customer-dashboard' | 'admin-dashboard';
  onNavigate: (view: 'home' | 'shop' | 'brew-guide' | 'about' | 'contact' | 'customer-dashboard' | 'admin-dashboard') => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSwitchUserRole,
  cartCount,
  onOpenCart,
  activeView,
  onNavigate,
  onOpenAuth,
  onSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <>
      {/* Top Brand Notice Bar */}
      <aside aria-label="Store Announcement" className="bg-[#4C0519] text-[#FFE4E6] px-4 py-1.5 text-xs text-center border-b border-rose-950/60 font-sans tracking-wide flex items-center justify-center gap-3">
        <span className="hidden sm:inline font-semibold text-rose-300">Big Ben Global Limited</span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span>Pure Dehydrated Beetroot Tea</span>
        <span aria-hidden="true">·</span>
        <span className="text-amber-200 font-medium">Free UK Delivery on orders over £35</span>
        <span className="hidden md:inline" aria-hidden="true">·</span>
        <span className="hidden md:inline text-rose-200">100% Naturally Caffeine-Free</span>
      </aside>

      {/* Primary Navigation */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EFE8DC] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-11 h-11 rounded-lg bg-[#881337] text-white flex items-center justify-center shadow-md group-hover:bg-[#9F1239] transition-colors relative overflow-hidden">
              <div className="flex flex-col items-center">
                <span className="font-serif font-black text-lg tracking-tighter leading-none">BB</span>
                <span className="text-[8px] font-sans tracking-widest text-rose-200 uppercase mt-0.5">Tea</span>
              </div>
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-slate-900 tracking-tight block leading-tight">
                Big Ben Global
              </span>
              <span className="text-[11px] text-slate-500 font-sans tracking-wider uppercase block">
                Beetroot Tea Merchants
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors ${
                activeView === 'home'
                  ? 'text-rose-900 font-semibold border-b-2 border-rose-900 rounded-none'
                  : 'text-slate-700 hover:text-rose-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className={`px-3 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors ${
                activeView === 'shop'
                  ? 'text-rose-900 font-semibold border-b-2 border-rose-900 rounded-none'
                  : 'text-slate-700 hover:text-rose-900'
              }`}
            >
              Tea Catalogue
            </button>
            <button
              onClick={() => onNavigate('brew-guide')}
              className={`px-3 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors ${
                activeView === 'brew-guide'
                  ? 'text-rose-900 font-semibold border-b-2 border-rose-900 rounded-none'
                  : 'text-slate-700 hover:text-rose-900'
              }`}
            >
              How to Prepare
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors ${
                activeView === 'about'
                  ? 'text-rose-900 font-semibold border-b-2 border-rose-900 rounded-none'
                  : 'text-slate-700 hover:text-rose-900'
              }`}
            >
              Our Story & Quality
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`px-3 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors ${
                activeView === 'contact'
                  ? 'text-rose-900 font-semibold border-b-2 border-rose-900 rounded-none'
                  : 'text-slate-700 hover:text-rose-900'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* SIGN IN & SIGN OUT AUTH SECTION */}
            {!currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-rose-50 border border-[#EFE8DC] hover:border-rose-900 rounded-lg text-xs font-semibold text-slate-800 hover:text-rose-900 shadow-sm transition-all cursor-pointer"
                  title="Sign In"
                >
                  <LogIn className="w-3.5 h-3.5 text-rose-800" />
                  <span>Sign In</span>
                </button>
                
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="hidden sm:flex items-center gap-1 px-3 py-2 bg-transparent hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  title="Create Account"
                >
                  <UserPlus className="w-3.5 h-3.5 text-slate-500" />
                  <span>Register</span>
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#EFE8DC] hover:border-rose-900 rounded-lg text-xs font-medium text-slate-800 shadow-sm transition-colors cursor-pointer"
                  title="Account menu"
                  aria-expanded={userDropdownOpen}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-xs ${
                    currentUser.role === 'admin' ? 'bg-amber-700' : 'bg-emerald-700'
                  }`}>
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-[11px] font-semibold text-slate-900 leading-none truncate max-w-[100px]">
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div className={`text-[9px] uppercase tracking-wider font-semibold ${
                      currentUser.role === 'admin' ? 'text-amber-700' : 'text-emerald-700'
                    }`}>
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Signed in as</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          currentUser.role === 'admin' 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}>
                          {currentUser.role}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mt-1 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono truncate">{currentUser.email}</p>
                    </div>

                    {/* Navigation Links for Account */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('customer-dashboard');
                        }}
                        className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 text-slate-800"
                      >
                        <UserIcon className="w-4 h-4 text-emerald-700" />
                        <div>
                          <div className="font-semibold">My Account & Orders</div>
                          <div className="text-[10px] text-slate-500">Order tracking, history, addresses</div>
                        </div>
                      </button>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onNavigate('admin-dashboard');
                          }}
                          className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 text-slate-800"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-700" />
                          <div>
                            <div className="font-semibold">Admin Workspace</div>
                            <div className="text-[10px] text-slate-500">Inventory, orders, metrics & AI knowledge</div>
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Switch role quick toggle */}
                    <div className="border-t border-slate-100 py-1">
                      <div className="px-4 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Switch Account Demo
                      </div>
                      <button
                        onClick={() => {
                          onSwitchUserRole('customer');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 text-slate-700"
                      >
                        <span className="text-xs">Sarah Jenkins (Customer)</span>
                        {currentUser.role === 'customer' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                      <button
                        onClick={() => {
                          onSwitchUserRole('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 text-slate-700"
                      >
                        <span className="text-xs">Arthur Pendelton (Admin)</span>
                        {currentUser.role === 'admin' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                      </button>
                    </div>

                    {/* Sign Out Action */}
                    <div className="border-t border-slate-100 pt-1 mt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onSignOut();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-700 font-semibold hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Button with Count Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-[#881337] hover:bg-[#9F1239] text-white rounded-lg transition-colors shadow-sm flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#EFE8DC] px-4 py-4 space-y-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-white rounded"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('shop');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-white rounded"
            >
              Tea Catalogue
            </button>
            <button
              onClick={() => {
                onNavigate('brew-guide');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-white rounded"
            >
              How to Prepare
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-white rounded"
            >
              Our Story & Sourcing
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-white rounded"
            >
              Contact
            </button>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              {!currentUser ? (
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('signin');
                    }}
                    className="w-full py-2.5 px-4 bg-[#881337] text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Account</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('signup');
                    }}
                    className="w-full py-2 px-4 bg-white border border-slate-200 text-slate-700 font-medium text-xs rounded-lg flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Create New Account</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="px-3 py-2 bg-white rounded-lg border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Signed in as</p>
                    <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{currentUser.email}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      onNavigate('customer-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-emerald-700" />
                    <span>My Customer Dashboard</span>
                  </button>

                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => {
                        onNavigate('admin-dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-700" />
                      <span>Admin Operations Workspace</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignOut();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
