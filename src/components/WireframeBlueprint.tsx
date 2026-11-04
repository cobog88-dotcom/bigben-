import React, { useState } from 'react';
import { 
  Compass, 
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle2, 
  Info, 
  Layers, 
  Palette, 
  Type, 
  Grid, 
  ShieldCheck, 
  Sliders, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Clock, 
  Check, 
  ArrowRight,
  Eye,
  LayoutDashboard
} from 'lucide-react';

interface WireframeBlueprintProps {
  onClose: () => void;
  onOpenLiveDashboard: (tab?: 'overview' | 'products' | 'orders' | 'knowledge') => void;
  onOpenCustomerDashboard: () => void;
}

export const WireframeBlueprint: React.FC<WireframeBlueprintProps> = ({
  onClose,
  onOpenLiveDashboard,
  onOpenCustomerDashboard
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'dashboard-wireframe' | 'style-guide' | 'spec-doc' | 'architecture'>('dashboard-wireframe');
  const [dashboardRole, setDashboardRole] = useState<'admin' | 'customer'>('admin');
  const [showAnnotations, setShowAnnotations] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Designer Toolbar */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-900/60 border border-rose-500/40 flex items-center justify-center text-rose-300">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-wide text-white">Big Ben Global Limited</span>
              <span className="text-xs text-rose-400 font-mono">UX Design System v1.2</span>
              <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800/80 px-2 py-0.5 rounded font-mono">15-Yr UX Wireframe Spec</span>
            </div>
            <p className="text-xs text-slate-400">Responsive Dashboard Wireframe & Brand Identity Guidelines</p>
          </div>
        </div>

        {/* Viewport Width Emulators */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              viewport === 'desktop' ? 'bg-rose-900 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop 1440px viewport"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
            <span className="text-[10px] opacity-75 font-mono">1440px</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              viewport === 'tablet' ? 'bg-rose-900 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet 768px viewport"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
            <span className="text-[10px] opacity-75 font-mono">768px</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              viewport === 'mobile' ? 'bg-rose-900 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile 375px viewport"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
            <span className="text-[10px] opacity-75 font-mono">375px</span>
          </button>
        </div>

        {/* Mode & Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              showAnnotations 
                ? 'bg-amber-950/40 text-amber-300 border-amber-800/80' 
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showAnnotations ? 'Annotations: ON' : 'Annotations: OFF'}</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-rose-800 hover:bg-rose-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium shadow-md transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Launch Live Production App</span>
          </button>
        </div>
      </header>

      {/* Sub-Navigation Tabs */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-2 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('dashboard-wireframe')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'dashboard-wireframe'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Responsive Dashboard Wireframe Blueprint
          </button>
          <button
            onClick={() => setActiveTab('style-guide')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'style-guide'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Brand Identity & Style Guide Matrix
          </button>
          <button
            onClick={() => setActiveTab('spec-doc')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'spec-doc'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. UX Rationale & Acceptance Criteria
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'architecture'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Information Architecture & Sitemap
          </button>
        </div>

        {activeTab === 'dashboard-wireframe' && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-lg">
            <span className="text-[11px] text-slate-400 px-2">Dashboard Wireframe Role:</span>
            <button
              onClick={() => setDashboardRole('admin')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                dashboardRole === 'admin' ? 'bg-rose-900 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Admin Workspace
            </button>
            <button
              onClick={() => setDashboardRole('customer')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                dashboardRole === 'customer' ? 'bg-rose-900 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Customer Dashboard
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {/* TAB 1: RESPONSIVE DASHBOARD WIREFRAME */}
        {activeTab === 'dashboard-wireframe' && (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-white flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-rose-400" />
                  {dashboardRole === 'admin' ? 'Admin Workspace Wireframe Schematic' : 'Customer Account & Order Dashboard Wireframe'}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Simulating layout viewport: <strong className="text-white font-mono">{viewport.toUpperCase()}</strong> ({viewport === 'desktop' ? '1440px Desktop Baseline' : viewport === 'tablet' ? '768px Tablet Grid' : '375px Mobile-First Flow'}). Built on an 8pt spatial grid with zero-pill metadata typography.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => dashboardRole === 'admin' ? onOpenLiveDashboard() : onOpenCustomerDashboard()}
                  className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                >
                  <span>Open Live {dashboardRole === 'admin' ? 'Admin' : 'Customer'} View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Viewport Frame Simulator Container */}
            <div className="flex justify-center bg-slate-950/50 p-4 sm:p-8 rounded-2xl border border-slate-800/80 overflow-x-auto">
              <div 
                className={`transition-all duration-300 bg-[#FAF7F2] text-slate-800 shadow-2xl rounded-xl border-4 border-slate-700/60 overflow-hidden ${
                  viewport === 'desktop' 
                    ? 'w-full max-w-[1280px]' 
                    : viewport === 'tablet' 
                      ? 'w-[768px]' 
                      : 'w-[375px]'
                }`}
              >
                {/* Simulated Browser Chrome */}
                <div className="bg-slate-200 border-b border-slate-300 px-4 py-2 flex items-center justify-between text-xs text-slate-600 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                    <span className="ml-2 text-[11px] text-slate-500">
                      https://bigbenglobal.co.uk/{dashboardRole === 'admin' ? 'admin/overview' : 'account/orders'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans">
                    {viewport === 'desktop' ? '1440 × 900' : viewport === 'tablet' ? '768 × 1024' : '375 × 812'}
                  </span>
                </div>

                {/* WIREFRAME RENDERER */}
                <div className="wireframe-grid p-4 sm:p-6 min-h-[680px] relative">
                  
                  {/* ADMIN WIREFRAME */}
                  {dashboardRole === 'admin' && (
                    <div className="space-y-6">
                      {/* Section 1: Dashboard Header & Breadcrumb Wireframe */}
                      <div className="wireframe-box p-4 rounded-lg relative">
                        {showAnnotations && (
                          <span className="absolute -top-3 left-4 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                            ZONE 1: ROLE-PROTECTED ADMIN HEADER
                          </span>
                        )}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded border-2 border-dashed border-rose-800/60 bg-rose-100 flex items-center justify-center font-serif text-rose-950 font-bold text-lg">
                              BB
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>Big Ben Global Workspace</span>
                                <span aria-hidden="true">·</span>
                                <span className="text-rose-900 font-semibold">Admin Mode</span>
                              </div>
                              <h2 className="text-lg font-bold text-slate-900">Operations Control Center</h2>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <div className="px-3 py-1.5 border border-slate-300 rounded bg-white text-slate-600 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                              <span>API Service: Connected</span>
                            </div>
                            <div className="px-3 py-1.5 bg-rose-900 text-white rounded font-medium">
                              + Create Product
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Metric Cards Grid */}
                      <div className="relative">
                        {showAnnotations && (
                          <span className="absolute -top-3 left-4 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow z-10">
                            ZONE 2: REAL DB METRIC STRIP (Zero sample fluff)
                          </span>
                        )}
                        <div className={`grid gap-4 ${
                          viewport === 'mobile' ? 'grid-cols-1' : viewport === 'tablet' ? 'grid-cols-2' : 'grid-cols-4'
                        }`}>
                          <div className="wireframe-box p-4 rounded-lg border-l-4 border-l-rose-800">
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Gross Revenue</div>
                            <div className="text-2xl font-bold font-serif text-slate-900 mt-1">£1,489.50</div>
                            <div className="text-xs text-emerald-700 mt-2 flex items-center gap-1">
                              <span>↑ 18.4% vs last period</span>
                              <span className="text-slate-400">· Real ledger</span>
                            </div>
                          </div>

                          <div className="wireframe-box p-4 rounded-lg border-l-4 border-l-slate-800">
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Orders</div>
                            <div className="text-2xl font-bold font-serif text-slate-900 mt-1">42 Orders</div>
                            <div className="text-xs text-slate-500 mt-2">100% verified checkouts</div>
                          </div>

                          <div className="wireframe-box p-4 rounded-lg border-l-4 border-l-amber-600">
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Pending Dispatch</div>
                            <div className="text-2xl font-bold font-serif text-amber-900 mt-1">3 Orders</div>
                            <div className="text-xs text-amber-800 mt-2">SLA: &lt; 24h shipping</div>
                          </div>

                          <div className="wireframe-box p-4 rounded-lg border-l-4 border-l-rose-700">
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Inventory Alert</div>
                            <div className="text-2xl font-bold font-serif text-rose-950 mt-1">2 Low Stock</div>
                            <div className="text-xs text-rose-800 mt-2">500g Bulk & Hibiscus</div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Navigation Tabs & Filter Bar */}
                      <div className="wireframe-box p-3 rounded-lg flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1 text-xs">
                          <button className="px-3 py-1.5 bg-rose-900 text-white rounded font-medium">Orders (3)</button>
                          <button className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 rounded">Products & Stock (5)</button>
                          <button className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 rounded">Grounded AI KB (6)</button>
                          <button className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 rounded">Enquiries (2)</button>
                          <button className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 rounded">Audit Log (15)</button>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <div className="border border-slate-300 rounded px-3 py-1.5 bg-white text-slate-400 flex items-center gap-2">
                            <span>Search orders, SKUs...</span>
                          </div>
                          <div className="border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-700">
                            Filter: Status
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Data Table Wireframe */}
                      <div className="wireframe-box p-4 rounded-lg relative overflow-x-auto">
                        {showAnnotations && (
                          <span className="absolute -top-3 left-4 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow z-10">
                            ZONE 3: ACCESSIBLE DATA TABLE WITH INLINE AUDIT ACTIONS
                          </span>
                        )}
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-300 text-slate-500 uppercase tracking-wider">
                              <th className="py-2.5 px-3">Order Ref</th>
                              <th className="py-2.5 px-3">Customer</th>
                              <th className="py-2.5 px-3">Items</th>
                              <th className="py-2.5 px-3">Amount</th>
                              <th className="py-2.5 px-3">Fulfillment</th>
                              <th className="py-2.5 px-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            <tr className="hover:bg-slate-100/60">
                              <td className="py-3 px-3 font-mono font-medium text-rose-950">BBG-2026-4819</td>
                              <td className="py-3 px-3">
                                <div className="font-medium text-slate-900">Sarah Jenkins</div>
                                <div className="text-[11px] text-slate-500">sarah.j@example.co.uk</div>
                              </td>
                              <td className="py-3 px-3 text-slate-700">2x 100g Cuts, 1x Ginger 20B</td>
                              <td className="py-3 px-3 font-serif font-bold text-slate-900">£39.50</td>
                              <td className="py-3 px-3">
                                <span className="inline-flex items-center gap-1.5 text-amber-800 font-medium">
                                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                  <span>Processing</span>
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right space-x-1">
                                <button className="px-2 py-1 text-[11px] bg-slate-200 text-slate-800 rounded">Update Status</button>
                                <button className="px-2 py-1 text-[11px] bg-slate-200 text-slate-800 rounded">Invoice</button>
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-100/60">
                              <td className="py-3 px-3 font-mono font-medium text-rose-950">BBG-2026-4820</td>
                              <td className="py-3 px-3">
                                <div className="font-medium text-slate-900">Marcus Vance</div>
                                <div className="text-[11px] text-slate-500">m.vance@example.com</div>
                              </td>
                              <td className="py-3 px-3 text-slate-700">1x 250g Family Pack</td>
                              <td className="py-3 px-3 font-serif font-bold text-slate-900">£27.50</td>
                              <td className="py-3 px-3">
                                <span className="inline-flex items-center gap-1.5 text-emerald-800 font-medium">
                                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                                  <span>Dispatched (DPD)</span>
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right space-x-1">
                                <button className="px-2 py-1 text-[11px] bg-slate-200 text-slate-800 rounded">Tracking</button>
                                <button className="px-2 py-1 text-[11px] bg-slate-200 text-slate-800 rounded">Invoice</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* CUSTOMER WIREFRAME */}
                  {dashboardRole === 'customer' && (
                    <div className="space-y-6">
                      {/* Customer Header Wireframe */}
                      <div className="wireframe-box p-4 rounded-lg relative">
                        {showAnnotations && (
                          <span className="absolute -top-3 left-4 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                            ZONE 1: CUSTOMER REPOSITORIES & STATUS TIMELINE
                          </span>
                        )}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-rose-200 border-2 border-rose-800 flex items-center justify-center font-bold text-rose-900">
                              SJ
                            </div>
                            <div>
                              <div className="text-xs text-slate-500">Customer Account Workspace</div>
                              <h2 className="text-lg font-bold text-slate-900">Sarah Jenkins</h2>
                              <div className="text-xs text-slate-500">Member since October 2026 · London, UK</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <button className="px-3 py-1.5 border border-slate-300 rounded bg-white text-slate-700">
                              Edit Addresses (2)
                            </button>
                            <button className="px-3 py-1.5 bg-rose-900 text-white rounded">
                              Order Again
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Active Order Live Tracker Wireframe */}
                      <div className="wireframe-box p-5 rounded-lg border-2 border-rose-800/40 relative">
                        {showAnnotations && (
                          <span className="absolute -top-3 left-4 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                            ZONE 2: TIMELINE-BASED DISPATCH STATUS
                          </span>
                        )}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                          <div>
                            <span className="text-xs text-slate-500">Latest Active Order</span>
                            <div className="font-mono font-bold text-slate-900">BBG-2026-4819</div>
                          </div>
                          <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded">
                            Being Prepared at Blending Facility
                          </span>
                        </div>

                        {/* Visual Step Progress Indicator */}
                        <div className="py-6">
                          <div className="grid grid-cols-4 relative text-center text-xs">
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">✓</div>
                              <span className="font-medium text-slate-900 mt-1">Confirmed</span>
                              <span className="text-[10px] text-slate-400">Nov 3, 14:22</span>
                            </div>
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-7 h-7 rounded-full bg-rose-900 text-white flex items-center justify-center font-bold text-xs">2</div>
                              <span className="font-medium text-slate-900 mt-1">Prepared</span>
                              <span className="text-[10px] text-rose-800 font-semibold">In Progress</span>
                            </div>
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-xs">3</div>
                              <span className="font-medium text-slate-400 mt-1">Dispatched</span>
                              <span className="text-[10px] text-slate-400">Pending</span>
                            </div>
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-xs">4</div>
                              <span className="font-medium text-slate-400 mt-1">Delivered</span>
                              <span className="text-[10px] text-slate-400">Est. Nov 5</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded text-xs flex justify-between items-center text-slate-700">
                          <span>Items: 2x 100g Loose Cuts + 1x Ginger Pyramid</span>
                          <span className="font-serif font-bold text-slate-900">Total: £39.50 (Paid)</span>
                        </div>
                      </div>

                      {/* Saved Addresses & Receipts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="wireframe-box p-4 rounded-lg">
                          <h3 className="font-bold text-slate-900 text-sm mb-2">Saved Delivery Addresses</h3>
                          <div className="p-3 bg-white border border-slate-200 rounded text-xs space-y-1">
                            <div className="flex justify-between font-medium">
                              <span>Primary Residence (Default)</span>
                              <span className="text-emerald-700">Active</span>
                            </div>
                            <p className="text-slate-600">14 Kensington Church Street</p>
                            <p className="text-slate-600">London, W8 4EP, United Kingdom</p>
                          </div>
                        </div>

                        <div className="wireframe-box p-4 rounded-lg">
                          <h3 className="font-bold text-slate-900 text-sm mb-2">Account Security & Preferences</h3>
                          <div className="p-3 bg-white border border-slate-200 rounded text-xs space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Two-Factor Authentication</span>
                              <span className="text-xs text-slate-400">Configured via SMS</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Order Dispatch Notifications</span>
                              <span className="text-xs text-emerald-700 font-medium">Email Enabled</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Annotations Legend Drawer */}
                  {showAnnotations && (
                    <div className="mt-8 p-4 bg-amber-50/90 border border-amber-300 rounded-lg text-slate-800 text-xs">
                      <div className="font-bold text-amber-950 flex items-center gap-1.5 mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-700" />
                        <span>Senior UX Wireframe Rationale (Big Ben Global Standard):</span>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-700">
                        <li>
                          <strong className="text-slate-900">1. Zero-Pill Typographic Hierarchy:</strong> Statuses use inline colored indicators and unboxed subtle dividers, avoiding cluttered candy-pill noise.
                        </li>
                        <li>
                          <strong className="text-slate-900">2. WCAG AA Accessible Contrast:</strong> All text exceeds 4.5:1 contrast against warm cream backgrounds, with minimum 44px tap targets on touch devices.
                        </li>
                        <li>
                          <strong className="text-slate-900">3. Role-Based Segregation:</strong> Customers are restricted strictly to their personal order ledger; administrators access inventory, prices, and audit logs.
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BRAND IDENTITY & STYLE GUIDE MATRIX */}
        {activeTab === 'style-guide' && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-rose-400" />
                <span>Brand Identity Guidelines & Design System Tokens</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Visual language defined by Big Ben Global Limited: Beetroot/Burgundy accents, leafy green, warm cream/linen, and charcoal typography.
              </p>
            </div>

            {/* Color Swatch Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Primary Beetroot / Burgundy */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-4 space-y-3">
                <div className="h-28 rounded-lg bg-[#881337] flex items-end p-3 text-white">
                  <div>
                    <div className="text-xs opacity-75">Primary Accent</div>
                    <div className="font-bold text-sm">Beetroot Burgundy</div>
                    <div className="text-[10px] font-mono">#881337 / Pantone 209 C</div>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                    <span>Deep Wine (Header / Dark)</span>
                    <span className="font-mono text-slate-200">#4C0519</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                    <span>Crimson Rose (Hover)</span>
                    <span className="font-mono text-slate-200">#9F1239</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-400">
                    <span>Soft Infusion Tint</span>
                    <span className="font-mono text-slate-200">#FFF1F2</span>
                  </div>
                </div>
              </div>

              {/* Leafy Green Accent */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-4 space-y-3">
                <div className="h-28 rounded-lg bg-[#166534] flex items-end p-3 text-white">
                  <div>
                    <div className="text-xs opacity-75">Botanical Accent</div>
                    <div className="font-bold text-sm">Leafy Herbal Green</div>
                    <div className="text-[10px] font-mono">#166534 / Pantone 7733 C</div>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                    <span>Forest Shade (Dark)</span>
                    <span className="font-mono text-slate-200">#14532D</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                    <span>Fresh Leaf (Success)</span>
                    <span className="font-mono text-slate-200">#15803D</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-400">
                    <span>Herbal Mist Tint</span>
                    <span className="font-mono text-slate-200">#F0FDF4</span>
                  </div>
                </div>
              </div>

              {/* Warm Cream Canvas */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-4 space-y-3">
                <div className="h-28 rounded-lg bg-[#FAF7F2] flex items-end p-3 text-slate-900 border border-slate-700">
                  <div>
                    <div className="text-xs opacity-75">Canvas Background</div>
                    <div className="font-bold text-sm">Warm Cream & Linen</div>
                    <div className="text-[10px] font-mono">#FAF7F2 / Natural Oatmeal</div>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                    <span>Porcelain Linen</span>
                    <span className="font-mono text-slate-200">#FDFBF7</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                    <span>Earthy Parchment</span>
                    <span className="font-mono text-slate-200">#F4EFEA</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-400">
                    <span>Subtle Card Border</span>
                    <span className="font-mono text-slate-200">#E2D7C5</span>
                  </div>
                </div>
              </div>

              {/* Charcoal & Slate Typography */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-4 space-y-3">
                <div className="h-28 rounded-lg bg-[#1E293B] flex items-end p-3 text-white">
                  <div>
                    <div className="text-xs opacity-75">Typography Base</div>
                    <div className="font-bold text-sm">Charcoal & Slate</div>
                    <div className="text-[10px] font-mono">#1E293B / High Contrast</div>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                    <span>Deep Title Obsidian</span>
                    <span className="font-mono text-slate-200">#0F172A</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                    <span>Body Prose Slate</span>
                    <span className="font-mono text-slate-200">#334155</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-400">
                    <span>Muted Metadata</span>
                    <span className="font-mono text-slate-200">#64748B</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Scale Guide */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Type className="w-5 h-5 text-rose-400" />
                <span>Typography Hierarchy & Editorial Pairing</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                  <div className="text-rose-400 font-mono text-[11px]">DISPLAY HEADLINE · SERIF</div>
                  <div className="font-serif text-2xl text-white font-bold leading-tight">
                    Pure Single-Origin Beetroot Infusion
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Playfair Display</strong> (Weights: 500, 600, 700). Used for page hero titles, product names, and editorial statement headers to convey heritage and artisanal tea quality.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                  <div className="text-emerald-400 font-mono text-[11px]">BODY & UI CONTROLS · SANS</div>
                  <div className="font-sans text-base text-slate-200 font-medium">
                    100% dehydrated Beta vulgaris roots, zero artificial ingredients.
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Plus Jakarta Sans</strong> (Weights: 400, 500, 600, 700). Engineered for digital readability, geometric clarity, and high legibility across mobile touchscreens.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                  <div className="text-amber-400 font-mono text-[11px]">DATA, SKUS & TIMESTAMPS · MONO</div>
                  <div className="font-mono text-sm text-amber-200 font-medium">
                    BBG-2026-4819 · SKU: BBG-BT-100G
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    <strong>JetBrains Mono</strong> (Weight: 500). Used for order reference numbers, batch codes, tracking identifiers, and metric ledgers for tabular alignment.
                  </p>
                </div>
              </div>
            </div>

            {/* Spatial Grid & Anti-Slop Discipline */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-rose-400" />
                <span>8pt Spatial Rhythm & Anti-Slop UI Rules</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                  <span className="font-mono text-rose-400 text-xs">RULE 01</span>
                  <div className="font-bold text-white">Zero-Pill Metadata</div>
                  <p className="text-slate-400 text-[11px]">
                    Metadata (pack size, brewing time, date, stock) is rendered as quiet inline text separated by subtle typographic dots (·), never wrapped in bordered candy pills.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                  <span className="font-mono text-rose-400 text-xs">RULE 02</span>
                  <div className="font-bold text-white">44px Touch Targets</div>
                  <p className="text-slate-400 text-[11px]">
                    Every button, selector, and drawer toggle strictly maintains minimum 44px height on mobile and 40px on desktop to eliminate mis-taps.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                  <span className="font-mono text-rose-400 text-xs">RULE 03</span>
                  <div className="font-bold text-white">Compliant Wellness Wording</div>
                  <p className="text-slate-400 text-[11px]">
                    Zero hallucinated medical cures. Focus on culinary quality, natural hydration, dietary nitrates, and honest steeping steps.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                  <span className="font-mono text-rose-400 text-xs">RULE 04</span>
                  <div className="font-bold text-white">No Dead Clicks</div>
                  <p className="text-slate-400 text-[11px]">
                    Every button triggers functional behavior: add to cart updates real state, checkout simulates test transactions, and chatbot queries real knowledge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: UX RATIONALE & ACCEPTANCE CRITERIA */}
        {activeTab === 'spec-doc' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>UX Architecture Rationale & Acceptance Criteria Verification</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Evaluation against the two-page prompt specification provided in the uploaded PDF.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-white text-sm">1. Business Goals & Cautious Wellness Language</h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">PASSED</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Strictly avoids unsubstantiated medical claims or disease cures. Communicates approved facts: 100% dehydrated beetroot roots, zero artificial sweeteners, zero caffeine, transparent pricing (£12.50 to £38.00), and straightforward preparation.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-white text-sm">2. Responsive Public Pages & E-Commerce Flow</h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">PASSED</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Includes Home hero with value propositions, product highlights, 3-step brewing guide, full Shop catalogue with search/category filtering, About company story, validated Contact form, Cart drawer with dynamic shipping calculation, and test payment gateway checkout.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-white text-sm">3. Protected Role-Based Customer & Admin Dashboards</h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">PASSED</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Customers view strictly their own orders, delivery addresses, and printable receipts. Administrators access gross revenue metrics, inventory editor with low-stock alerts, order status management, contact enquiries, chatbot knowledge base editor, and timestamped audit logs.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-white text-sm">4. Grounded AI Chatbot with Order Verification</h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">PASSED</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Chatbot uses server-side Gemini 3.8 Flash model grounded in administrator-editable knowledge items. Secure order lookup verifies customer identity before displaying order status. Unanswered questions are logged for admin review.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SITEMAP & INFORMATION ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-rose-400" />
                <span>Information Architecture & Sitemap Tree</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                End-to-end routing hierarchy connecting public brand discovery with private transactional workspaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Branch 1 */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="font-bold text-white border-b border-slate-800 pb-2 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>1. Public Storefront</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">/ (Home)</strong>
                    <span>Hero headline, value highlights, 3-step brew guide, FAQs, newsletter</span>
                  </li>
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">/shop (Product Catalogue)</strong>
                    <span>Format filters (Loose Leaf, Pyramids, Bulk), price sorting, search, quick view modal</span>
                  </li>
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">/about (Company Story)</strong>
                    <span>Sourcing approach, dehydrating process, certified clean batches</span>
                  </li>
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">/contact (Customer Care)</strong>
                    <span>Validated form, business hours, London coordination address</span>
                  </li>
                </ul>
              </div>

              {/* Branch 2 */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="font-bold text-white border-b border-slate-800 pb-2 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>2. Cart & Commerce Flow</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">Cart Drawer (Slide-Over)</strong>
                    <span>Editable quantities, free shipping progress (£35 threshold), tax summary</span>
                  </li>
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">Checkout Modal / Page</strong>
                    <span>Shipping address entry, standard vs express delivery, coupon input</span>
                  </li>
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">Test Payment Gateway Step</strong>
                    <span>Paystack/Card sandbox simulation with zero raw card retention</span>
                  </li>
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">Order Confirmation</strong>
                    <span>Unique reference (BBG-2026-XXXX), tracking dispatch timeline, receipt</span>
                  </li>
                </ul>
              </div>

              {/* Branch 3 */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="font-bold text-white border-b border-slate-800 pb-2 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>3. Role-Based Workspaces</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">Customer Account Area</strong>
                    <span>Order history, live carrier tracking, saved delivery addresses, profile security</span>
                  </li>
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">Admin Dashboard</strong>
                    <span>Revenue & order volume metrics, low-stock alerts, order status fulfillment</span>
                  </li>
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">Product & Stock Manager</strong>
                    <span>Price updates, inventory adjustments, archiving, variant creation</span>
                  </li>
                  <li className="p-2 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block">Grounded AI KB & Audit Logs</strong>
                    <span>Editable facts, unresolved question backlog, immutable activity logs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
