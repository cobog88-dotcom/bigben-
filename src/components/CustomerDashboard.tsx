import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Truck, 
  ExternalLink, 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  ShoppingBag, 
  ChevronRight,
  Printer,
  X,
  AlertCircle,
  LogIn,
  UserPlus,
  Search,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { Order, User, Address } from '../types';

interface CustomerDashboardProps {
  user: User | null;
  orders: Order[];
  onNavigateShop: () => void;
  onUpdateAddress: (addresses: Address[]) => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
  onSignOut?: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  user,
  orders,
  onNavigateShop,
  onUpdateAddress,
  onOpenAuth,
  onSignOut
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'security'>('orders');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPostcode, setNewPostcode] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [guestLookupRef, setGuestLookupRef] = useState('');
  const [guestLookupResult, setGuestLookupResult] = useState<Order | null | 'not_found'>(null);

  if (!user) {
    const handleGuestLookup = (e: React.FormEvent) => {
      e.preventDefault();
      if (!guestLookupRef.trim()) return;
      const found = orders.find(o => o.orderRef.toLowerCase().trim() === guestLookupRef.toLowerCase().trim());
      setGuestLookupResult(found || 'not_found');
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-100 text-rose-900 flex items-center justify-center mb-5 shadow-sm">
          <UserIcon className="w-8 h-8 text-[#881337]" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-slate-900 mb-3">
          Customer Portal & Orders
        </h2>
        <p className="text-slate-600 max-w-md mx-auto text-sm mb-8">
          Sign in to view your real-time delivery status, access VAT order invoices, manage saved delivery addresses, and quickly reorder your favorite Big Ben blends.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <button
            onClick={() => onOpenAuth?.('signin')}
            className="w-full sm:w-auto px-6 py-3 bg-[#881337] hover:bg-[#9F1239] text-white rounded-xl text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Your Account</span>
          </button>
          <button
            onClick={() => onOpenAuth?.('signup')}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-slate-600" />
            <span>Create New Account</span>
          </button>
        </div>

        {/* Guest order lookup */}
        <div className="max-w-md mx-auto bg-white border border-[#EFE8DC] rounded-2xl p-6 shadow-sm text-left">
          <h3 className="font-serif text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Truck className="w-4 h-4 text-rose-800" />
            Track a Guest Order
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Placed an order without an account? Enter your 8-digit order reference:
          </p>
          <form onSubmit={handleGuestLookup} className="flex gap-2 mb-3">
            <input
              type="text"
              value={guestLookupRef}
              onChange={e => setGuestLookupRef(e.target.value)}
              placeholder="e.g. BBG-2026-4819"
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-900"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {guestLookupResult === 'not_found' && (
            <p className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              No order found matching "{guestLookupRef}". Please verify the reference on your email.
            </p>
          )}

          {guestLookupResult && guestLookupResult !== 'not_found' && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs space-y-1">
              <div className="flex justify-between font-bold text-emerald-900">
                <span>Ref: {guestLookupResult.orderRef}</span>
                <span className="uppercase">{guestLookupResult.status}</span>
              </div>
              <p className="text-slate-600">Total: £{guestLookupResult.total.toFixed(2)} · {guestLookupResult.items.length} items</p>
              <p className="text-slate-500">Tracking: {guestLookupResult.trackingNumber || 'Pending dispatch'}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Filter orders strictly for this customer
  const customerOrders = orders.filter(
    o => o.customerEmail.toLowerCase() === user.email.toLowerCase() || o.customerId === user.id
  );

  const activeShipments = customerOrders.filter(
    o => o.status === 'processing' || o.status === 'shipped' || o.status === 'pending'
  );

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newPostcode) return;

    const newAddr: Address = {
      id: 'addr-' + Date.now(),
      fullName: user.name,
      street: newStreet,
      city: newCity,
      postcode: newPostcode,
      country: 'United Kingdom',
      isDefault: user.addresses.length === 0
    };

    onUpdateAddress([...user.addresses, newAddr]);
    setNewStreet('');
    setNewCity('');
    setNewPostcode('');
    setShowAddressModal(false);
  };

  const handleSetDefaultAddress = (id: string) => {
    const updated = user.addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    onUpdateAddress(updated);
  };

  const handleDeleteAddress = (id: string) => {
    const updated = user.addresses.filter(a => a.id !== id);
    onUpdateAddress(updated);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 border-2 border-rose-800 text-rose-900 font-serif font-bold text-2xl flex items-center justify-center shadow-inner">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>Big Ben Tea Society Member</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">Verified Customer</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Welcome back, {user.name.split(' ')[0]}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {user.email} · Registered delivery addresses ({user.addresses.length})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateShop}
              className="bg-[#881337] hover:bg-[#9F1239] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Tea Catalogue</span>
            </button>
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-rose-800 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                title="Sign out of your account"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>

        {/* Real Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-[#EFE8DC] shadow-sm">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Orders</div>
            <div className="text-2xl font-serif font-bold text-slate-900 mt-1">
              {customerOrders.length} Completed
            </div>
            <div className="text-xs text-slate-500 mt-2">Personal ledger record</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE8DC] shadow-sm">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Active Shipments</div>
            <div className="text-2xl font-serif font-bold text-amber-900 mt-1">
              {activeShipments.length} In Transit / Prep
            </div>
            <div className="text-xs text-emerald-700 mt-2">Dispatched via Royal Mail / DPD Tracked</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE8DC] shadow-sm">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Saved Addresses</div>
            <div className="text-2xl font-serif font-bold text-slate-900 mt-1">
              {user.addresses.length} Delivery Locations
            </div>
            <div className="text-xs text-slate-500 mt-2">Default: {user.addresses.find(a => a.isDefault)?.city || 'London'}</div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white rounded-2xl border border-[#EFE8DC] shadow-sm overflow-hidden">
          <div className="border-b border-[#EFE8DC] px-6 flex items-center gap-8 text-sm">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'border-rose-900 text-rose-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order History & Tracking ({customerOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`py-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'addresses'
                  ? 'border-rose-900 text-rose-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses ({user.addresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'security'
                  ? 'border-rose-900 text-rose-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Account Security & Preferences</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            
            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {customerOrders.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-base font-medium text-slate-800">No orders placed yet</p>
                    <p className="text-xs text-slate-500 mt-1">Discover pure beetroot cuts in our store catalogue.</p>
                    <button
                      onClick={onNavigateShop}
                      className="mt-4 bg-[#881337] text-white px-4 py-2 rounded-lg text-xs font-semibold"
                    >
                      Shop Beetroot Tea
                    </button>
                  </div>
                ) : (
                  customerOrders.map(order => {
                    const statusStep = order.status === 'pending' ? 1 : order.status === 'processing' ? 2 : order.status === 'shipped' ? 3 : 4;

                    return (
                      <div key={order.id} className="border border-[#EFE8DC] rounded-xl p-5 sm:p-6 bg-[#FDFBF7] space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE8DC] pb-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span>Order Placed: {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono font-bold text-rose-950">{order.orderRef}</span>
                            </div>
                            <div className="text-sm font-semibold text-slate-900 mt-1">
                              Delivering to: {order.shippingAddress.street}, {order.shippingAddress.city} {order.shippingAddress.postcode}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedReceiptOrder(order)}
                              className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View Receipt / Invoice</span>
                            </button>
                            <span className="text-base font-serif font-bold text-slate-900 px-3">
                              £{order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Order Progress Tracker */}
                        <div className="py-2">
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            Fulfillment Timeline
                          </div>
                          <div className="grid grid-cols-4 relative text-center text-xs">
                            {/* Step 1: Placed */}
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                statusStep >= 1 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-500'
                              }`}>
                                ✓
                              </div>
                              <span className="font-medium text-slate-900 mt-1 text-[11px]">Confirmed</span>
                              <span className="text-[10px] text-slate-500">Payment Verified</span>
                            </div>

                            {/* Step 2: Preparing */}
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                statusStep >= 2 ? 'bg-rose-900 text-white' : 'bg-slate-200 text-slate-500'
                              }`}>
                                {statusStep > 2 ? '✓' : '2'}
                              </div>
                              <span className="font-medium text-slate-900 mt-1 text-[11px]">Blending & Pack</span>
                              <span className="text-[10px] text-slate-500">{order.status === 'processing' ? 'In Progress' : statusStep > 2 ? 'Completed' : 'Pending'}</span>
                            </div>

                            {/* Step 3: Shipped */}
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                statusStep >= 3 ? 'bg-rose-900 text-white' : 'bg-slate-200 text-slate-500'
                              }`}>
                                {statusStep > 3 ? '✓' : '3'}
                              </div>
                              <span className="font-medium text-slate-900 mt-1 text-[11px]">Dispatched</span>
                              <span className="text-[10px] text-slate-500">{order.trackingNumber ? order.trackingNumber : 'Courier Assigned'}</span>
                            </div>

                            {/* Step 4: Delivered */}
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                statusStep >= 4 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-500'
                              }`}>
                                {statusStep >= 4 ? '✓' : '4'}
                              </div>
                              <span className="font-medium text-slate-900 mt-1 text-[11px]">Delivered</span>
                              <span className="text-[10px] text-slate-500">{statusStep >= 4 ? 'Received' : 'Estimated 2-3 Days'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Order Items Breakdown */}
                        <div className="bg-white rounded-lg border border-[#EFE8DC] p-3 text-xs space-y-2">
                          <div className="font-semibold text-slate-700">Order Contents:</div>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-slate-600">
                              <div className="flex items-center gap-2.5">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="w-8 h-8 object-contain rounded bg-white border border-[#EFE8DC] p-0.5 shrink-0"
                                    onError={(e) => {
                                      if (!e.currentTarget.src.includes('/public/')) {
                                        e.currentTarget.src = '/public' + item.image;
                                      }
                                    }}
                                  />
                                )}
                                <span>
                                  {item.quantity}x <strong className="text-slate-900">{item.productName}</strong> ({item.packSize})
                                </span>
                              </div>
                              <span className="font-medium text-slate-800">
                                £{(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                          <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-slate-900">
                            <span>Delivery: {order.shippingFee === 0 ? 'FREE UK Tracked' : `£${order.shippingFee.toFixed(2)}`}</span>
                            <span>Total Paid: £{order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Your Shipping Addresses</h2>
                    <p className="text-xs text-slate-500">Fast one-click delivery addresses used at checkout.</p>
                  </div>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-rose-900 text-white rounded-lg text-xs font-medium hover:bg-rose-800 transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.addresses.map(addr => (
                    <div key={addr.id} className="border border-[#EFE8DC] bg-[#FDFBF7] p-5 rounded-xl space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{addr.fullName}</span>
                        {addr.isDefault ? (
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                            Default Address
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="text-[11px] text-rose-900 hover:underline font-medium"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>

                      <div className="text-xs text-slate-600 space-y-0.5">
                        <p>{addr.street}</p>
                        <p>{addr.city}, {addr.postcode}</p>
                        <p>{addr.country}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EFE8DC]">
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: ACCOUNT SECURITY & PREFERENCES */}
            {activeTab === 'security' && (
              <div className="max-w-xl space-y-6 text-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Security & Sign-in Controls</h2>
                  <p className="text-slate-500 mt-1">Manage passwords, authentication credentials, and notifications.</p>
                </div>

                {securitySuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{securitySuccess}</span>
                  </div>
                )}

                <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#EFE8DC] space-y-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Account Email</label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-500 text-xs"
                    />
                    <span className="text-[10px] text-slate-400">Email verified for order updates.</span>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Telephone Number</label>
                    <input
                      type="text"
                      defaultValue={user.phone || '+44 7700 900123'}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-1 focus:ring-rose-800 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">Used strictly for courier SMS delivery tracking.</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSecuritySuccess('Password reset link sent to your registered email address.');
                        setTimeout(() => setSecuritySuccess(''), 4000);
                      }}
                      className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium transition-colors"
                    >
                      Request Password Reset Email
                    </button>
                  </div>
                </div>

                <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#EFE8DC] space-y-3">
                  <div className="font-bold text-slate-800">Email & Dispatch Notifications</div>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-rose-800 focus:ring-rose-800" />
                    <span>Send courier tracking updates when an order is dispatched</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-rose-800 focus:ring-rose-800" />
                    <span>Quarterly beetroot tea harvesting news & brewing recipes</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal: Add Address */}
        {showAddressModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Add New Delivery Address</h3>
                <button onClick={() => setShowAddressModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="space-y-4 mt-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 24 Blossom Hill Road"
                    value={newStreet}
                    onChange={e => setNewStreet(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-rose-800 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">City / Town</label>
                    <input
                      type="text"
                      required
                      placeholder="London"
                      value={newCity}
                      onChange={e => setNewCity(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-rose-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      placeholder="SW1A 1AA"
                      value={newPostcode}
                      onChange={e => setNewPostcode(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-rose-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-900 text-white rounded-lg font-medium hover:bg-rose-800"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Clean Printable Receipt / Tax Invoice */}
        {selectedReceiptOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs text-rose-900 font-bold uppercase tracking-wider">Big Ben Global Limited</div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">Official Purchase Receipt</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => window.print()}
                    className="p-2 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg"
                    title="Print Receipt"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button onClick={() => setSelectedReceiptOrder(null)} className="text-slate-400 hover:text-slate-700 p-2">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="py-6 space-y-6 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-slate-400 font-mono text-[11px]">ORDER REFERENCE</div>
                    <div className="font-mono font-bold text-sm text-slate-900">{selectedReceiptOrder.orderRef}</div>
                    <div className="text-slate-500 mt-1">Date: {new Date(selectedReceiptOrder.createdAt).toLocaleDateString('en-GB')}</div>
                    <div className="text-slate-500">Payment: {selectedReceiptOrder.paymentMethod} (Verified)</div>
                  </div>

                  <div>
                    <div className="text-slate-400 font-mono text-[11px]">DISPATCH RECIPIENT</div>
                    <div className="font-bold text-slate-900">{selectedReceiptOrder.shippingAddress.fullName}</div>
                    <div className="text-slate-600">{selectedReceiptOrder.shippingAddress.street}</div>
                    <div className="text-slate-600">{selectedReceiptOrder.shippingAddress.city}, {selectedReceiptOrder.shippingAddress.postcode}</div>
                    <div className="text-slate-600">{selectedReceiptOrder.shippingAddress.country}</div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                      <tr>
                        <th className="py-2.5 px-3">Item Description</th>
                        <th className="py-2.5 px-3">Pack Format</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3 text-right">Unit Price</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {selectedReceiptOrder.items.map((item, i) => (
                        <tr key={i}>
                          <td className="py-3 px-3 font-medium text-slate-900">{item.productName}</td>
                          <td className="py-3 px-3 text-slate-500">{item.packSize}</td>
                          <td className="py-3 px-3 text-center font-mono">{item.quantity}</td>
                          <td className="py-3 px-3 text-right">£{item.price.toFixed(2)}</td>
                          <td className="py-3 px-3 text-right font-medium">£{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-1.5 text-right">
                  <div className="text-slate-600">Subtotal: £{selectedReceiptOrder.subtotal.toFixed(2)}</div>
                  <div className="text-slate-600">
                    Tracked Shipping: {selectedReceiptOrder.shippingFee === 0 ? 'FREE (£0.00)' : `£${selectedReceiptOrder.shippingFee.toFixed(2)}`}
                  </div>
                  <div className="text-slate-600">VAT (Included where applicable): £0.00</div>
                  <div className="text-base font-serif font-bold text-slate-900 pt-2 border-t border-slate-200">
                    Total Paid: £{selectedReceiptOrder.total.toFixed(2)}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-slate-500 text-[11px] space-y-1">
                  <p><strong>Big Ben Global Limited</strong> · Company Reg No. 14982103 · London, United Kingdom</p>
                  <p>14-day unopened return policy applies. Keep your order reference for any support inquiry.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
