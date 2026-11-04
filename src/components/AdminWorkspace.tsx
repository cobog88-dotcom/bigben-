import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  HelpCircle, 
  Mail, 
  ShieldAlert, 
  Settings, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  FileText, 
  Clock, 
  Archive, 
  RefreshCw, 
  X,
  Sliders,
  DollarSign,
  Send,
  Sparkles
} from 'lucide-react';
import { Product, Order, KnowledgeItem, ContactEnquiry, AuditLog, UnresolvedQuestion, User } from '../types';

interface AdminWorkspaceProps {
  products: Product[];
  orders: Order[];
  knowledgeBase: KnowledgeItem[];
  enquiries: ContactEnquiry[];
  auditLogs: AuditLog[];
  unresolvedQuestions: UnresolvedQuestion[];
  onAddProduct: (product: Partial<Product>) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onArchiveProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status'], trackingNumber?: string) => void;
  onUpdateEnquiryStatus: (id: string, status: 'reviewed' | 'resolved') => void;
  onAddKnowledgeItem: (item: Partial<KnowledgeItem>) => void;
  onUpdateKnowledgeItem: (id: string, updates: Partial<KnowledgeItem>) => void;
  onDeleteKnowledgeItem: (id: string) => void;
  onRefreshData?: () => void;
  currentUser?: User | null;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
  onReturnHome?: () => void;
}

export const AdminWorkspace: React.FC<AdminWorkspaceProps> = ({
  products,
  orders,
  knowledgeBase,
  enquiries,
  auditLogs,
  unresolvedQuestions,
  onAddProduct,
  onUpdateProduct,
  onArchiveProduct,
  onUpdateOrderStatus,
  onUpdateEnquiryStatus,
  onAddKnowledgeItem,
  onUpdateKnowledgeItem,
  onDeleteKnowledgeItem,
  currentUser,
  onOpenAuth,
  onReturnHome
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'knowledge' | 'enquiries' | 'audit' | 'settings'>('overview');

  if (currentUser?.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-5 shadow-sm">
          <ShieldAlert className="w-8 h-8 text-amber-700" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
          Administrator Access Required
        </h2>
        <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
          The Big Ben Global operations workspace requires an authenticated administrator session to inspect inventory, manage orders, and train the customer AI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onOpenAuth?.('signin')}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#881337] hover:bg-[#9F1239] text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            Sign In with Admin Account
          </button>
          {onReturnHome && (
            <button
              onClick={onReturnHome}
              className="w-full sm:w-auto px-6 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Return to Tea Catalogue
            </button>
          )}
        </div>
      </div>
    );
  }
  
  // Search & Filter States
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  
  // Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<string>('Tea Blends');
  const [prodPackSize, setProdPackSize] = useState('25 Tea Bags (Box)');
  const [prodPrice, setProdPrice] = useState(12.50);
  const [prodStock, setProdStock] = useState(50);
  const [prodSku, setProdSku] = useState('BBG-TB-BH25');
  const [prodDescription, setProdDescription] = useState('');
  const [prodIngredients, setProdIngredients] = useState('100% Dehydrated Beetroot (Beta vulgaris), Hibiscus petals');

  // Knowledge Item Modal State
  const [showKnowledgeModal, setShowKnowledgeModal] = useState(false);
  const [editingKnowledge, setEditingKnowledge] = useState<KnowledgeItem | null>(null);
  const [kbCategory, setKbCategory] = useState<KnowledgeItem['category']>('product');
  const [kbQuestion, setKbQuestion] = useState('');
  const [kbAnswer, setKbAnswer] = useState('');

  // Order Details / Status Update Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<Order['status']>('processing');
  const [trackingCode, setTrackingCode] = useState('');

  // Real Calculated Metrics
  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const lowStockProducts = products.filter(p => !p.isArchived && p.stock <= 15);

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory('Tea Blends');
    setProdPackSize('100g Loose Cuts');
    setProdPrice(12.50);
    setProdStock(50);
    setProdSku(`BBG-${Math.floor(1000 + Math.random() * 9000)}`);
    setProdDescription('Pure dehydrated mature beetroot pieces, processed for tea brewing.');
    setProdIngredients('100% Dehydrated Beetroot (Beta vulgaris)');
    setShowProductModal(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdCategory(product.category);
    setProdPackSize(product.packSize);
    setProdPrice(product.price);
    setProdStock(product.stock);
    setProdSku(product.sku);
    setProdDescription(product.description);
    setProdIngredients(product.ingredients);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, {
        name: prodName,
        category: prodCategory,
        packSize: prodPackSize,
        price: Number(prodPrice),
        stock: Number(prodStock),
        sku: prodSku,
        description: prodDescription,
        ingredients: prodIngredients
      });
    } else {
      onAddProduct({
        name: prodName,
        slug: prodName.toLowerCase().replace(/\s+/g, '-'),
        subtitle: `${prodPackSize} · Pure Botanicals`,
        category: prodCategory,
        packSize: prodPackSize,
        price: Number(prodPrice),
        stock: Number(prodStock),
        sku: prodSku,
        description: prodDescription,
        ingredients: prodIngredients,
        brewingInstructions: 'Steep in freshly boiled water (95°C) for 5-7 minutes.',
        storage: 'Store in a cool dry pantry away from light.',
        badges: ['Approved Sourcing', 'Caffeine-Free']
      });
    }
    setShowProductModal(false);
  };

  const openKnowledgeModal = (item?: KnowledgeItem) => {
    if (item) {
      setEditingKnowledge(item);
      setKbCategory(item.category);
      setKbQuestion(item.question);
      setKbAnswer(item.answer);
    } else {
      setEditingKnowledge(null);
      setKbCategory('product');
      setKbQuestion('');
      setKbAnswer('');
    }
    setShowKnowledgeModal(true);
  };

  const handleSaveKnowledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kbQuestion || !kbAnswer) return;

    if (editingKnowledge) {
      onUpdateKnowledgeItem(editingKnowledge.id, {
        category: kbCategory,
        question: kbQuestion,
        answer: kbAnswer
      });
    } else {
      onAddKnowledgeItem({
        category: kbCategory,
        question: kbQuestion,
        answer: kbAnswer
      });
    }
    setShowKnowledgeModal(false);
  };

  const handleUpdateStatusSubmit = () => {
    if (!selectedOrder) return;
    onUpdateOrderStatus(selectedOrder.id, newStatus, trackingCode || selectedOrder.trackingNumber);
    setSelectedOrder(null);
  };

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.orderRef.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    return matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F4EFEA] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Title & Quick Context */}
        <div className="bg-white rounded-2xl border border-[#E2D7C5] p-6 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm">
              BBG
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Big Ben Global Limited</span>
                <span aria-hidden="true">·</span>
                <span className="text-rose-900 font-semibold">Store Management & Compliance Suite</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Operations & Commerce Admin Workspace
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Grounded AI Sync: Active</span>
            </span>
            <button
              onClick={openNewProductModal}
              className="px-4 py-2 bg-[#881337] hover:bg-[#9F1239] text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Real KPI Metric Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl border border-[#E2D7C5] shadow-sm border-l-4 border-l-rose-800">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Gross Sales</div>
            <div className="text-2xl font-serif font-bold text-slate-900 mt-1">
              £{totalSales.toFixed(2)}
            </div>
            <div className="text-xs text-emerald-700 mt-2 flex items-center gap-1">
              <span>Verified ledger ({orders.filter(o => o.paymentStatus === 'paid').length} transactions)</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2D7C5] shadow-sm border-l-4 border-l-slate-800">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Order Volume</div>
            <div className="text-2xl font-serif font-bold text-slate-900 mt-1">
              {totalOrdersCount} Orders
            </div>
            <div className="text-xs text-slate-500 mt-2">UK delivery addresses</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2D7C5] shadow-sm border-l-4 border-l-amber-600">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pending Fulfillment</div>
            <div className="text-2xl font-serif font-bold text-amber-900 mt-1">
              {pendingOrdersCount} Orders
            </div>
            <div className="text-xs text-amber-800 mt-2">Requires blending or carrier pickup</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2D7C5] shadow-sm border-l-4 border-l-rose-700">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Low Stock Warnings</div>
            <div className="text-2xl font-serif font-bold text-rose-950 mt-1">
              {lowStockProducts.length} Items &le; 15 units
            </div>
            <div className="text-xs text-rose-800 mt-2">Needs re-order from dehydrator</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-[#E2D7C5] shadow-sm overflow-hidden mb-8">
          <div className="border-b border-slate-200 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'orders' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'products' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Products & Stock ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('knowledge')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'knowledge' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>AI Knowledge Base ({knowledgeBase.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('enquiries')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'enquiries' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Customer Inquiries ({enquiries.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'audit' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Audit Logs ({auditLogs.length})</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Low Stock Warning List */}
                  <div className="border border-amber-200 bg-amber-50/40 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-700" />
                        <h3 className="font-bold text-amber-950 text-sm">Low-Stock Attention Required</h3>
                      </div>
                      <span className="text-xs font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {lowStockProducts.length} Items Critical
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {lowStockProducts.map(p => (
                        <div key={p.id} className="bg-white p-3 rounded-lg border border-amber-200 flex items-center justify-between">
                          <div>
                            <div className="font-bold text-slate-900">{p.name}</div>
                            <div className="text-slate-500 font-mono text-[11px]">{p.sku} · {p.packSize}</div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-rose-800 text-sm">{p.stock} units left</span>
                            <button
                              onClick={() => openEditProductModal(p)}
                              className="block text-[11px] text-slate-600 hover:text-rose-900 underline mt-0.5"
                            >
                              Restock SKU
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Customer Inquiries Preview */}
                  <div className="border border-slate-200 rounded-xl p-5 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-slate-700" />
                        <h3 className="font-bold text-slate-900 text-sm">Recent Customer Inquiries</h3>
                      </div>
                      <button 
                        onClick={() => setActiveTab('enquiries')}
                        className="text-xs text-rose-900 hover:underline font-semibold"
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      {enquiries.slice(0, 3).map(e => (
                        <div key={e.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                          <div className="flex justify-between font-medium">
                            <span className="text-slate-900">{e.name}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                              e.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {e.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-slate-600 truncate">{e.subject}</p>
                          <p className="text-[11px] text-slate-400">{new Date(e.createdAt).toLocaleDateString('en-GB')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity Log Strip */}
                <div className="border border-slate-200 rounded-xl p-5 bg-white">
                  <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-600" />
                    <span>Real-time Operational Audit Stream</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    {auditLogs.slice(0, 5).map(log => (
                      <div key={log.id} className="flex items-start justify-between py-2 border-b border-slate-100 last:border-none">
                        <div>
                          <div className="font-medium text-slate-900">{log.action}</div>
                          <div className="text-slate-600 text-[11px]">{log.details}</div>
                        </div>
                        <div className="text-right text-[11px] text-slate-400 font-mono">
                          <div>{new Date(log.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</div>
                          <div>{log.performedBy}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF7F2] p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search ref, customer, email..."
                        value={orderSearch}
                        onChange={e => setOrderSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium">Status Filter:</span>
                    <select
                      value={orderStatusFilter}
                      onChange={e => setOrderStatusFilter(e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 text-xs focus:outline-none"
                    >
                      <option value="all">All Orders ({orders.length})</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Orders Table */}
                <div className="border border-slate-200 rounded-xl overflow-x-auto bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Order Ref</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Items</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Fulfillment Status</th>
                        <th className="py-3 px-4">Carrier Tracking</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            No orders matching current filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map(order => (
                          <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-rose-950">
                              {order.orderRef}
                              <div className="text-[10px] text-slate-400 font-normal">
                                {new Date(order.createdAt).toLocaleDateString('en-GB')}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-900">{order.customerName}</div>
                              <div className="text-[11px] text-slate-500 font-mono">{order.customerEmail}</div>
                              <div className="text-[10px] text-slate-400">{order.shippingAddress.city}, {order.shippingAddress.postcode}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="text-slate-800 font-medium">
                                {order.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-serif font-bold text-slate-900">
                              £{order.total.toFixed(2)}
                              <span className="block text-[10px] text-emerald-700 font-sans font-normal">Paid</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold ${
                                order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                                order.status === 'cancelled' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  order.status === 'delivered' ? 'bg-emerald-600' :
                                  order.status === 'shipped' ? 'bg-blue-600' :
                                  order.status === 'processing' ? 'bg-amber-600' : 'bg-slate-600'
                                }`}></span>
                                <span className="capitalize">{order.status}</span>
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                              {order.trackingNumber || 'Pending Courier'}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setNewStatus(order.status);
                                  setTrackingCode(order.trackingNumber || '');
                                }}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded text-xs transition-colors"
                              >
                                Update Status
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: PRODUCTS & STOCK */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF7F2] p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium">Filter Category:</span>
                    <select
                      value={productCategoryFilter}
                      onChange={e => setProductCategoryFilter(e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 text-xs"
                    >
                      <option value="all">All Categories ({products.length})</option>
                      <option value="Tea Blends">Tea Blends</option>
                      <option value="Herbal Tea">Herbal Tea</option>
                      <option value="Cold-Pressed Oils">Cold-Pressed Oils</option>
                      <option value="Natural Care">Natural Care & Butter</option>
                      <option value="Natural Wellness">Natural Wellness</option>
                    </select>
                  </div>

                  <button
                    onClick={openNewProductModal}
                    className="px-3.5 py-1.5 bg-[#881337] text-white rounded-lg font-medium hover:bg-[#9F1239] transition-colors"
                  >
                    + Add New Product
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-x-auto bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Product & Visual</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Pack Format</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Stock Level</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredProducts.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-white rounded-lg border border-[#EFE8DC] p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
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
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{p.name}</div>
                                <div className="text-[11px] font-mono text-slate-400">{p.sku}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{p.category}</td>
                          <td className="py-3.5 px-4 text-slate-600">{p.packSize}</td>
                          <td className="py-3.5 px-4 font-serif font-bold text-slate-900">£{p.price.toFixed(2)}</td>
                          <td className="py-3.5 px-4">
                            <span className={`font-bold ${p.stock <= 15 ? 'text-rose-700' : 'text-slate-800'}`}>
                              {p.stock} units
                            </span>
                            {p.stock <= 15 && (
                              <span className="block text-[10px] text-rose-700 font-semibold">Low Stock Alert</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            {p.isArchived ? (
                              <span className="text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-[11px]">Archived</span>
                            ) : (
                              <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px] font-medium">Active</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1">
                            <button
                              onClick={() => openEditProductModal(p)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded text-xs"
                            >
                              Edit
                            </button>
                            {!p.isArchived && (
                              <button
                                onClick={() => onArchiveProduct(p.id)}
                                className="px-2 py-1 text-slate-500 hover:text-rose-800 text-xs"
                                title="Archive product"
                              >
                                Archive
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: AI KNOWLEDGE BASE & UNRESOLVED QUESTIONS */}
            {activeTab === 'knowledge' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-rose-50 border border-rose-200 p-4 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-rose-800" />
                      <h3 className="font-bold text-rose-950 text-sm">Grounded Gemini AI Knowledge Base</h3>
                    </div>
                    <p className="text-xs text-rose-900/80 mt-0.5">
                      The AI Assistant answers customer questions strictly grounded in the approved facts below. Updating these items immediately informs the chatbot.
                    </p>
                  </div>

                  <button
                    onClick={() => openKnowledgeModal()}
                    className="px-3.5 py-1.5 bg-[#881337] text-white rounded-lg text-xs font-semibold hover:bg-[#9F1239]"
                  >
                    + Add Grounded Fact
                  </button>
                </div>

                {/* Unresolved Questions backlog */}
                {unresolvedQuestions.length > 0 && (
                  <div className="border border-amber-200 bg-amber-50/50 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                        <h4 className="font-bold text-amber-950 text-xs">Customer Questions Awaiting Official Guidance</h4>
                      </div>
                      <span className="text-[11px] text-amber-800 font-medium">Logged from Chat Sessions</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {unresolvedQuestions.map(u => (
                        <div key={u.id} className="bg-white p-3 rounded-lg border border-amber-200 space-y-2">
                          <div className="font-semibold text-slate-900">"{u.query}"</div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Asked {u.count} times</span>
                            <button
                              onClick={() => {
                                setEditingKnowledge(null);
                                setKbCategory('product');
                                setKbQuestion(u.query);
                                setKbAnswer('');
                                setShowKnowledgeModal(true);
                              }}
                              className="text-rose-900 hover:underline font-semibold"
                            >
                              Add Official Answer →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grounded Knowledge Items List */}
                <div className="grid grid-cols-1 gap-3">
                  {knowledgeBase.map(item => (
                    <div key={item.id} className="border border-slate-200 p-4 rounded-xl bg-white space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                          Category: {item.category} · Verified: {item.lastUpdated}
                        </span>
                        <div className="space-x-2">
                          <button
                            onClick={() => openKnowledgeModal(item)}
                            className="text-slate-600 hover:text-slate-900 underline font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteKnowledgeItem(item.id)}
                            className="text-rose-700 hover:text-rose-900"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="font-bold text-slate-900 text-sm">
                        Q: {item.question}
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        A: {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CUSTOMER ENQUIRIES */}
            {activeTab === 'enquiries' && (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-sm">Customer Enquiries & Wholesale Leads</h3>
                  <span className="text-slate-500">{enquiries.length} Messages received</span>
                </div>

                <div className="space-y-3">
                  {enquiries.map(enq => (
                    <div key={enq.id} className="border border-slate-200 p-4 rounded-xl bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="text-slate-900 text-sm block">{enq.name}</strong>
                          <span className="text-slate-500 font-mono text-[11px]">{enq.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            enq.status === 'new' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {enq.status.toUpperCase()}
                          </span>
                          {enq.status === 'new' && (
                            <button
                              onClick={() => onUpdateEnquiryStatus(enq.id, 'reviewed')}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium"
                            >
                              Mark Reviewed
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="font-medium text-slate-800">
                        Subject: {enq.subject}
                      </div>
                      <p className="text-slate-600 bg-slate-50 p-3 rounded-lg leading-relaxed">
                        "{enq.message}"
                      </p>
                      <div className="text-[10px] text-slate-400">
                        Received on {new Date(enq.createdAt).toLocaleString('en-GB')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: AUDIT LOGS */}
            {activeTab === 'audit' && (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Administrative Audit Trail</h3>
                    <p className="text-slate-500">Immutable ledger of sensitive operations (inventory, pricing, orders).</p>
                  </div>
                  <span className="font-mono text-slate-400">{auditLogs.length} Records</span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left">
                    <thead className="bg-[#FAF7F2] border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Action Type</th>
                        <th className="py-3 px-4">Initiated By</th>
                        <th className="py-3 px-4">Operation Details</th>
                        <th className="py-3 px-4 text-right">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono font-medium text-rose-950">
                            {log.action}
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-900">
                            {log.performedBy}
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {log.details}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400">
                            {new Date(log.timestamp).toLocaleString('en-GB')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal: Create/Edit Product */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">
                  {editingProduct ? 'Edit Beetroot Tea Product' : 'Add New Beetroot Tea Product'}
                </h3>
                <button onClick={() => setShowProductModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 mt-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={e => setProdName(e.target.value)}
                    placeholder="e.g. Big Ben Spiced Beetroot & Cardamom"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Format Category</label>
                    <select
                      value={prodCategory}
                      onChange={e => setProdCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                    >
                      <option value="Tea Blends">Tea Blends</option>
                      <option value="Herbal Tea">Herbal Tea</option>
                      <option value="Cold-Pressed Oils">Cold-Pressed Oils</option>
                      <option value="Natural Care">Natural Care & Butter</option>
                      <option value="Natural Wellness">Natural Wellness</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Pack Size Label</label>
                    <input
                      type="text"
                      required
                      value={prodPackSize}
                      onChange={e => setProdPackSize(e.target.value)}
                      placeholder="e.g. 100g Loose Cuts"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Price (£)</label>
                    <input
                      type="number"
                      step="0.50"
                      min="1"
                      required
                      value={prodPrice}
                      onChange={e => setProdPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={prodStock}
                      onChange={e => setProdStock(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">SKU Code</label>
                    <input
                      type="text"
                      required
                      value={prodSku}
                      onChange={e => setProdSku(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Ingredients (Compliant)</label>
                  <input
                    type="text"
                    required
                    value={prodIngredients}
                    onChange={e => setProdIngredients(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400">Must reflect verified botanicals without medical claims.</span>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    required
                    value={prodDescription}
                    onChange={e => setProdDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-900 text-white rounded-lg font-medium hover:bg-rose-800"
                  >
                    {editingProduct ? 'Save Product Changes' : 'Publish Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Update Order Fulfillment */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">
                  Update Fulfillment: {selectedOrder.orderRef}
                </h3>
                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mt-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Order Status</label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing (Blending & Packing)</option>
                    <option value="shipped">Shipped (Handed to Carrier)</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Carrier Tracking Reference</label>
                  <input
                    type="text"
                    placeholder="e.g. GB-ROYAL-98721 or DPD-UK-8812"
                    value={trackingCode}
                    onChange={e => setTrackingCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 font-mono"
                  />
                  <span className="text-[10px] text-slate-400">Customer sees this live in their account timeline.</span>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateStatusSubmit}
                    className="px-4 py-2 bg-rose-900 text-white rounded-lg font-medium hover:bg-rose-800"
                  >
                    Save Fulfillment Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Knowledge Base Item */}
        {showKnowledgeModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">
                  {editingKnowledge ? 'Edit Grounded Knowledge Fact' : 'Add Grounded AI Knowledge Fact'}
                </h3>
                <button onClick={() => setShowKnowledgeModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveKnowledge} className="space-y-4 mt-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={kbCategory}
                    onChange={e => setKbCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="product">Product Details</option>
                    <option value="preparation">Preparation & Brewing</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="compliance">Wellness Compliance & Policies</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Question / Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Can beetroot tea be consumed chilled?"
                    value={kbQuestion}
                    onChange={e => setKbQuestion(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Approved Answer (Grounded Truth)</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide clear, verified facts. Never make medical promises."
                    value={kbAnswer}
                    onChange={e => setKbAnswer(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowKnowledgeModal(false)}
                    className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-900 text-white rounded-lg font-medium hover:bg-rose-800"
                  >
                    Save Grounded Fact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
