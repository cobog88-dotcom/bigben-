import React, { useState, useEffect } from 'react';
import { 
  initialProducts, 
  initialKnowledgeBase, 
  initialOrders, 
  demoCustomer, 
  demoAdmin, 
  initialEnquiries, 
  initialAuditLogs 
} from './data/seed';
import { Product, Order, OrderItem, User, KnowledgeItem, ContactEnquiry, AuditLog, Address, UnresolvedQuestion } from './types';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { BrewGuideSection } from './components/BrewGuideSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminWorkspace } from './components/AdminWorkspace';
import { AIChatbot } from './components/AIChatbot';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Search, Filter, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  // App Core State
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>(initialKnowledgeBase);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(initialEnquiries);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [unresolvedQuestions, setUnresolvedQuestions] = useState<UnresolvedQuestion[]>([
    {
      id: 'unres-1',
      query: 'Do you deliver to Guernsey or Jersey Channel Islands?',
      count: 3,
      firstAsked: '2026-11-01',
      status: 'pending'
    },
    {
      id: 'unres-2',
      query: 'Can beetroot tea be cold brewed in a French press overnight?',
      count: 5,
      firstAsked: '2026-10-28',
      status: 'pending'
    }
  ]);

  // Auth / Current User State (Persisted in localStorage)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('bbg_auth_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return demoCustomer;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Cart & Commerce State
  const [cartItems, setCartItems] = useState<OrderItem[]>([
    {
      productId: 'prod-1',
      productName: 'BEETROOT AND HIBISCUS TEA',
      packSize: '25 Tea Bags (Box)',
      price: 12.50,
      quantity: 1,
      image: '/assets/aistudio/Big_Ben_Original_Pure_Beetroot_Tea_8a68a0c8.jpg'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Navigation State
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'brew-guide' | 'about' | 'contact' | 'customer-dashboard' | 'admin-dashboard'>('home');

  // Shop Page Search & Filters
  const [shopCategory, setShopCategory] = useState<string>('all');
  const [shopSearch, setShopSearch] = useState('');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync with Backend Server if available
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.products) setProducts(data.products);
      })
      .catch(() => {});

    fetch('/api/orders')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.orders) setOrders(data.orders);
      })
      .catch(() => {});

    fetch('/api/admin/knowledge')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.knowledgeBase) setKnowledgeBase(data.knowledgeBase);
        if (data && data.unresolvedQuestions) setUnresolvedQuestions(data.unresolvedQuestions);
      })
      .catch(() => {});
  }, []);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            productName: product.name,
            packSize: product.packSize,
            price: product.price,
            quantity,
            image: product.image
          }
        ];
      }
    });
    showToast(`Added ${quantity}x ${product.name} to your basket`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  // Order Placement Success Handler
  const handleOrderSuccess = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    // Deduct stock locally
    setProducts(prev =>
      prev.map(p => {
        const matchingItem = order.items.find(i => i.productId === p.id);
        if (matchingItem) {
          return { ...p, stock: Math.max(0, p.stock - matchingItem.quantity) };
        }
        return p;
      })
    );
    // Add audit log
    const newLog: AuditLog = {
      id: 'log-' + Date.now(),
      action: 'ORDER_PLACED',
      performedBy: order.customerName,
      details: `New order ${order.orderRef} placed for £${order.total.toFixed(2)} (${order.items.length} items)`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
    setCartItems([]);
  };

  // Admin Product Handlers
  const handleAddProduct = (newProd: Partial<Product>) => {
    const created: Product = {
      id: 'prod-' + Date.now(),
      name: newProd.name || 'New Beetroot Product',
      slug: (newProd.name || 'product').toLowerCase().replace(/\s+/g, '-'),
      subtitle: newProd.subtitle || '',
      description: newProd.description || '',
      packSize: newProd.packSize || '100g Loose Cuts',
      price: Number(newProd.price) || 12.00,
      stock: Number(newProd.stock) || 0,
      sku: newProd.sku || 'BBG-' + Math.floor(1000 + Math.random() * 9000),
      image: newProd.image || '/assets/aistudio/Big_Ben_Original_Pure_Beetroot_Tea_8a68a0c8.jpg',
      isFeatured: false,
      isArchived: false,
      category: newProd.category || 'Tea Blends',
      ingredients: newProd.ingredients || '100% Dehydrated Beetroot',
      brewingInstructions: newProd.brewingInstructions || 'Steep in boiled water 5-7 min',
      storage: newProd.storage || 'Store in cool dry cupboard',
      badges: newProd.badges || ['Pure Botanicals']
    };

    setProducts(prev => [...prev, created]);
    const log: AuditLog = {
      id: 'log-' + Date.now(),
      action: 'PRODUCT_CREATED',
      performedBy: currentUser?.name || 'Administrator',
      details: `Created product "${created.name}" (SKU: ${created.sku})`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [log, ...prev]);
    showToast(`Product "${created.name}" published`);
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    const prod = products.find(p => p.id === id);
    const log: AuditLog = {
      id: 'log-' + Date.now(),
      action: 'PRODUCT_UPDATED',
      performedBy: currentUser?.name || 'Administrator',
      details: `Updated "${prod?.name || id}". New stock: ${updates.stock ?? prod?.stock}`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [log, ...prev]);
    showToast('Product updated successfully');
  };

  const handleArchiveProduct = (id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, isArchived: true } : p))
    );
    const prod = products.find(p => p.id === id);
    const log: AuditLog = {
      id: 'log-' + Date.now(),
      action: 'PRODUCT_ARCHIVED',
      performedBy: currentUser?.name || 'Administrator',
      details: `Archived product "${prod?.name || id}"`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [log, ...prev]);
    showToast('Product archived');
  };

  // Admin Order Status Update
  const handleUpdateOrderStatus = (orderId: string, status: Order['status'], trackingNumber?: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status, trackingNumber: trackingNumber || o.trackingNumber } : o))
    );
    const order = orders.find(o => o.id === orderId);
    const log: AuditLog = {
      id: 'log-' + Date.now(),
      action: 'ORDER_STATUS_CHANGE',
      performedBy: currentUser?.name || 'Administrator',
      details: `Order ${order?.orderRef} status set to ${status.toUpperCase()} (Tracking: ${trackingNumber || order?.trackingNumber || 'Pending'})`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [log, ...prev]);
    showToast(`Order status updated to ${status}`);
  };

  // Contact Enquiry Submission
  const handleSubmitEnquiry = (enquiry: { name: string; email: string; subject: string; message: string }) => {
    const newEnq: ContactEnquiry = {
      id: 'enq-' + Date.now(),
      name: enquiry.name,
      email: enquiry.email,
      subject: enquiry.subject,
      message: enquiry.message,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [newEnq, ...prev]);
    showToast('Enquiry received by customer care');
  };

  const handleUpdateEnquiryStatus = (id: string, status: 'reviewed' | 'resolved') => {
    setEnquiries(prev =>
      prev.map(e => (e.id === id ? { ...e, status } : e))
    );
  };

  // Knowledge Base Handlers
  const handleAddKnowledgeItem = (item: Partial<KnowledgeItem>) => {
    const created: KnowledgeItem = {
      id: 'kb-' + Date.now(),
      category: item.category || 'product',
      question: item.question || '',
      answer: item.answer || '',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setKnowledgeBase(prev => [...prev, created]);
    showToast('Knowledge fact added to AI Assistant');
  };

  const handleUpdateKnowledgeItem = (id: string, updates: Partial<KnowledgeItem>) => {
    setKnowledgeBase(prev =>
      prev.map(k => (k.id === id ? { ...k, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : k))
    );
    showToast('Knowledge item updated');
  };

  const handleDeleteKnowledgeItem = (id: string) => {
    setKnowledgeBase(prev => prev.filter(k => k.id !== id));
    showToast('Knowledge item removed');
  };

  // Auth Handlers (Sign In, Sign Up, Sign Out, Switch)
  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('bbg_auth_user', JSON.stringify(user));
    } catch {}
    showToast(`Welcome back, ${user.name}!`);
    if (user.role === 'admin') {
      setActiveView('admin-dashboard');
    }
  };

  const handleSignOut = () => {
    const prevName = currentUser?.name;
    setCurrentUser(null);
    try {
      localStorage.removeItem('bbg_auth_user');
    } catch {}
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    showToast(prevName ? `Signed out. Goodbye, ${prevName.split(' ')[0]}!` : 'Signed out successfully.');
    if (activeView === 'admin-dashboard' || activeView === 'customer-dashboard') {
      setActiveView('home');
    }
  };

  const handleSwitchUserRole = (role: 'customer' | 'admin' | 'guest') => {
    if (role === 'customer') {
      setCurrentUser(demoCustomer);
      try { localStorage.setItem('bbg_auth_user', JSON.stringify(demoCustomer)); } catch {}
      showToast('Switched to Customer account: Sarah Jenkins');
    } else if (role === 'admin') {
      setCurrentUser(demoAdmin);
      try { localStorage.setItem('bbg_auth_user', JSON.stringify(demoAdmin)); } catch {}
      showToast('Switched to Admin account: Arthur Pendelton');
    } else {
      handleSignOut();
    }
  };

  const handleUpdateCustomerAddresses = (addresses: Address[]) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        addresses
      };
      setCurrentUser(updatedUser);
      try {
        localStorage.setItem('bbg_auth_user', JSON.stringify(updatedUser));
      } catch {}
      showToast('Delivery addresses updated');
    }
  };

  // Filter products for Shop page
  const filteredShopProducts = products.filter(p => {
    if (p.isArchived) return false;
    const matchesCategory = shopCategory === 'all' || p.category === shopCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(shopSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(shopSearch.toLowerCase()) ||
      p.packSize.toLowerCase().includes(shopSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 flex flex-col font-sans selection:bg-rose-900 selection:text-white">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation with Sign In & Sign Out */}
      <Navbar
        currentUser={currentUser}
        onSwitchUserRole={handleSwitchUserRole}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        activeView={activeView}
        onNavigate={view => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
      />

          {/* VIEW: HOME */}
          {activeView === 'home' && (
            <main className="space-y-16 pb-20">
              <HomeHero
                onShopNow={() => {
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onLearnMore={() => {
                  setActiveView('brew-guide');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                featuredProducts={products}
                onViewProduct={prod => setSelectedProductDetail(prod)}
                onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
              />

              {/* Featured Tea Showcase */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="text-xs text-rose-900 font-semibold tracking-wider uppercase font-mono">
                      Curated Formats
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">
                      Pure Beetroot Tea Selection
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveView('shop')}
                    className="text-xs font-semibold text-rose-900 hover:text-rose-700 flex items-center gap-1"
                  >
                    <span>View All Pack Sizes & Blends</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, 3).map(prod => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onAddToCart={(p, q) => handleAddToCart(p, q)}
                      onViewDetails={p => setSelectedProductDetail(p)}
                    />
                  ))}
                </div>
              </section>

              {/* Quick Steeping Teaser */}
              <BrewGuideSection
                onShopNow={() => {
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </main>
          )}

          {/* VIEW: SHOP / PRODUCT CATALOGUE */}
          {activeView === 'shop' && (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
              <div className="max-w-2xl space-y-2">
                <div className="text-xs text-rose-900 font-semibold tracking-wider uppercase font-mono">
                  Full Catalogue & Product Range
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                  Big Ben Teas & Virgin Cold-Pressed Oils
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Single-origin herbal tea blends, 100% natural cold-pressed virgin oils, and pure moisturizing wellness. Free UK delivery on all orders over £35.
                </p>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white rounded-2xl border border-[#EFE8DC] p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm text-xs">
                {/* Search */}
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search teas, coconut oil, cocoa butter, peanut oil..."
                    value={shopSearch}
                    onChange={e => setShopSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  <button
                    onClick={() => setShopCategory('all')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      shopCategory === 'all'
                        ? 'bg-rose-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Products ({products.filter(p => !p.isArchived).length})
                  </button>
                  <button
                    onClick={() => setShopCategory('Tea Blends')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      shopCategory === 'Tea Blends'
                        ? 'bg-rose-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Tea Blends
                  </button>
                  <button
                    onClick={() => setShopCategory('Herbal Tea')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      shopCategory === 'Herbal Tea'
                        ? 'bg-rose-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Herbal Tea
                  </button>
                  <button
                    onClick={() => setShopCategory('Cold-Pressed Oils')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      shopCategory === 'Cold-Pressed Oils'
                        ? 'bg-rose-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Cold-Pressed Oils
                  </button>
                  <button
                    onClick={() => setShopCategory('Natural Care')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      shopCategory === 'Natural Care'
                        ? 'bg-rose-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Natural Care & Butter
                  </button>
                  <button
                    onClick={() => setShopCategory('Natural Wellness')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      shopCategory === 'Natural Wellness'
                        ? 'bg-rose-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Cocoa Powder
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              {filteredShopProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#EFE8DC] p-8 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="font-serif text-lg text-slate-900">No tea products match your search</p>
                  <button
                    onClick={() => {
                      setShopCategory('all');
                      setShopSearch('');
                    }}
                    className="text-xs text-rose-900 hover:underline font-semibold"
                  >
                    Clear search filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredShopProducts.map(prod => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onAddToCart={(p, q) => handleAddToCart(p, q)}
                      onViewDetails={p => setSelectedProductDetail(p)}
                    />
                  ))}
                </div>
              )}
            </main>
          )}

          {/* VIEW: BREW GUIDE */}
          {activeView === 'brew-guide' && (
            <main className="py-6">
              <BrewGuideSection
                onShopNow={() => {
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </main>
          )}

          {/* VIEW: ABOUT */}
          {activeView === 'about' && (
            <main>
              <AboutSection />
            </main>
          )}

          {/* VIEW: CONTACT */}
          {activeView === 'contact' && (
            <main>
              <ContactSection
                knowledgeBase={knowledgeBase}
                onSubmitEnquiry={handleSubmitEnquiry}
              />
            </main>
          )}

          {/* VIEW: CUSTOMER DASHBOARD */}
          {activeView === 'customer-dashboard' && (
            <main>
              <CustomerDashboard
                user={currentUser}
                orders={orders}
                onNavigateShop={() => setActiveView('shop')}
                onUpdateAddress={handleUpdateCustomerAddresses}
                onOpenAuth={handleOpenAuth}
              />
            </main>
          )}

          {/* VIEW: ADMIN DASHBOARD */}
          {activeView === 'admin-dashboard' && (
            <main>
              <AdminWorkspace
                products={products}
                orders={orders}
                knowledgeBase={knowledgeBase}
                enquiries={enquiries}
                auditLogs={auditLogs}
                unresolvedQuestions={unresolvedQuestions}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onArchiveProduct={handleArchiveProduct}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
                onAddKnowledgeItem={handleAddKnowledgeItem}
                onUpdateKnowledgeItem={handleUpdateKnowledgeItem}
                onDeleteKnowledgeItem={handleDeleteKnowledgeItem}
                currentUser={currentUser}
                onOpenAuth={handleOpenAuth}
                onReturnHome={() => setActiveView('home')}
              />
            </main>
          )}

          {/* Global Footer */}
          <Footer
            onNavigate={view => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Modals & Overlays */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onProceedToCheckout={() => setIsCheckoutOpen(true)}
          />

          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            items={cartItems}
            currentUser={currentUser}
            onOrderSuccess={handleOrderSuccess}
            onNavigateToCustomerDashboard={() => {
              setIsCheckoutOpen(false);
              setActiveView('customer-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuth={handleOpenAuth}
          />

          <ProductDetailModal
            product={selectedProductDetail}
            onClose={() => setSelectedProductDetail(null)}
            onAddToCart={handleAddToCart}
          />

          {/* Grounded AI Chatbot Launcher */}
          <AIChatbot
            currentUser={currentUser}
            onNavigate={view => setActiveView(view)}
          />

          {/* Sign In & Sign Up Authentication Modal */}
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            initialMode={authModalMode}
            onLoginSuccess={handleLoginSuccess}
            demoCustomerUser={demoCustomer}
            demoAdminUser={demoAdmin}
          />

    </div>
  );
}
