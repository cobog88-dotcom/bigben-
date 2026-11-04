import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/assets/aistudio', express.static(path.resolve(__dirname, 'public/assets/aistudio')));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// Initialize Google Gemini AI SDK if API key exists
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey && geminiApiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({ apiKey: geminiApiKey });
  } catch (err) {
    console.warn('Could not initialize Gemini client:', err);
  }
}

// In-Memory Database Store (Initialized with realistic Big Ben Global Limited data)
interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  packSize: string;
  price: number;
  stock: number;
  sku: string;
  image: string;
  isFeatured: boolean;
  isArchived: boolean;
  category: string;
  ingredients: string;
  brewingInstructions: string;
  storage: string;
  badges: string[];
}

interface OrderItem {
  productId: string;
  productName: string;
  packSize: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  orderRef: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending';
  paymentMethod: string;
  createdAt: string;
  trackingNumber?: string;
  notes?: string;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'reviewed' | 'resolved';
  createdAt: string;
}

interface KnowledgeItem {
  id: string;
  category: 'product' | 'preparation' | 'shipping' | 'returns' | 'compliance';
  question: string;
  answer: string;
  lastUpdated: string;
}

interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  details: string;
  timestamp: string;
}

// Seed Products
let products: Product[] = [
  {
    id: 'prod-1',
    name: 'BEETROOT AND HIBISCUS TEA',
    slug: 'beetroot-and-hibiscus-tea',
    subtitle: 'Big-Ben Tea Blend · 25 Tea Bags · Pure Ruby Botanical Infusion',
    description: 'An exquisite harmony of selected whole mature beetroot and deep crimson hibiscus petals. Naturally vibrant, earthy, refreshing, and 100% caffeine-free. Rich in plant antioxidants.',
    packSize: '25 Tea Bags (Box)',
    price: 12.50,
    stock: 84,
    sku: 'BBG-TB-BH25',
    image: '/assets/aistudio/Big_Ben_Original_Pure_Beetroot_Tea_8a68a0c8.jpg',
    isFeatured: true,
    isArchived: false,
    category: 'Tea Blends',
    ingredients: 'Dehydrated Beetroot (Beta vulgaris), Hibiscus (Hibiscus sabdariffa) Petals. 100% Natural Herbal Infusion.',
    brewingInstructions: 'Place 1 tea bag in a 250ml mug. Pour freshly boiled water (95°C-100°C). Steep for 5-7 minutes. Enjoy hot or chilled over ice with fresh lemon.',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    badges: ['25 Tea Bags', 'Naturally Caffeine-Free', 'Vibrant Ruby Color']
  },
  {
    id: 'prod-2',
    name: 'HERBAL INFUSED TEA',
    slug: 'green-herbal-infused-tea',
    subtitle: 'Big-Ben Tea Blend · Green Herbal Rich Taste · 25 Tea Bags',
    description: 'Invigorating green botanical tea blend infused with citrus lemon zest, whole cloves, and calming herbs. Rich aromatic taste crafted for daily restorative wellness.',
    packSize: '25 Tea Bags (Box)',
    price: 13.50,
    stock: 65,
    sku: 'BBG-TB-GH25',
    image: '/assets/aistudio/HERBAL_INFUSED_TEA_762ca0d5.jpg',
    isFeatured: true,
    isArchived: false,
    category: 'Herbal Tea',
    ingredients: 'Green Herbal Botanical Leaves, Lemon Peel, Whole Cloves, Aromatic Spices. 100% Herbal.',
    brewingInstructions: 'Steep 1 tea bag in 250ml hot boiled water for 4-6 minutes. Excellent hot after meals or iced with fresh mint.',
    storage: 'Keep sealed in cool, dry conditions.',
    badges: ['25 Tea Bags', 'Rich Taste', 'Citrus & Spices']
  },
  {
    id: 'prod-3',
    name: 'COCOA BUTTER',
    slug: 'cocoa-butter-moisturizing',
    subtitle: '100% Pure Moisturizing · 120g Natural Skincare & Wellness',
    description: 'Ultra-nourishing, 100% pure raw cocoa butter extracted from premium unrefined cacao beans. Deeply hydrates dry skin, smooths texture, and melts effortlessly at body temperature with a rich natural cocoa scent.',
    packSize: '120g Pure Moisturizing Bar',
    price: 14.50,
    stock: 42,
    sku: 'BBG-CB-120G',
    image: '/assets/aistudio/COCOA_BUTTER_95faad88.jpg',
    isFeatured: true,
    isArchived: false,
    category: 'Natural Care',
    ingredients: '100% Pure Theobroma Cacao (Cocoa) Seed Butter. Unrefined, cold-extracted.',
    brewingInstructions: 'Melt a small piece between warm palms and massage into skin, lips, or dry areas as needed.',
    storage: 'Store below 25°C in a dry place away from direct heat.',
    badges: ['100% Pure', 'Deep Hydration', 'Natural Aroma']
  },
  {
    id: 'prod-4',
    name: 'COCONUT OIL',
    slug: 'virgin-coconut-oil-250ml',
    subtitle: '100% Natural Cold-Pressed Virgin Coconut Oil · 250ml Bottle',
    description: 'Crystal-clear, unrefined virgin coconut oil produced via cold extraction. A versatile staple for gourmet culinary dressings, wholesome daily nutrition, and natural hair and skin conditioning.',
    packSize: '250ml Glass Bottle',
    price: 11.50,
    stock: 38,
    sku: 'BBG-VCO-250ML',
    image: '/assets/aistudio/COCONUT_OIL_91649589.jpg',
    isFeatured: true,
    isArchived: false,
    category: 'Cold-Pressed Oils',
    ingredients: '100% Pure Cold-Pressed Virgin Coconut Oil (Cocos nucifera).',
    brewingInstructions: 'Take 1-2 tablespoons daily, use for gentle low-heat culinary sautés, or apply as a hair/skin moisture barrier.',
    storage: 'Keep at room temperature. Naturally solidifies below 24°C without affecting purity.',
    badges: ['Cold-Pressed', '100% Virgin', 'Culinary & Skin']
  },
  {
    id: 'prod-5',
    name: 'PEANUT OIL',
    slug: 'virgin-peanut-oil-250ml',
    subtitle: '100% Natural Cold-Pressed Virgin Peanut Oil · 250ml Bottle',
    description: 'Artisanal cold-pressed virgin peanut oil carrying a warm, delicately roasted aroma. Free from chemical bleaching or deodorizing, offering pure culinary excellence and natural plant sterols.',
    packSize: '250ml Glass Bottle',
    price: 12.00,
    stock: 30,
    sku: 'BBG-VPO-250ML',
    image: '/assets/aistudio/PEANUT_OIL_d5878007.jpg',
    isFeatured: false,
    isArchived: false,
    category: 'Cold-Pressed Oils',
    ingredients: '100% Cold-Pressed Pure Peanut Oil (Arachis hypogaea). Unrefined.',
    brewingInstructions: 'Ideal for gourmet dressings, wok dishes, and marinades.',
    storage: 'Keep tightly capped in a cool, dark cupboard.',
    badges: ['Cold-Pressed', 'Aromatic Nutty Flavor', 'Unrefined']
  },
  {
    id: 'prod-6',
    name: 'COCOA POWDER',
    slug: 'cocoa-powder-pure-natural-100g',
    subtitle: '100% Pure Natural Cocoa Powder · 100g Baking & Beverage',
    description: 'Single-origin, unsweetened pure cocoa powder from selected fermented cacao beans. Rich in natural flavanols, delivering deep chocolate depth to hot beverages, baking, and smoothies.',
    packSize: '100g Box',
    price: 9.50,
    stock: 55,
    sku: 'BBG-CP-100G',
    image: '/assets/aistudio/cocoa_powder_d8232d0d.jpg',
    isFeatured: false,
    isArchived: false,
    category: 'Natural Wellness',
    ingredients: '100% Pure Natural Cocoa Powder (Theobroma cacao).',
    brewingInstructions: 'Whisk 1-2 teaspoons into hot milk or plant milk with honey, or use in premium confectionery baking.',
    storage: 'Store sealed in an airtight dry container.',
    badges: ['100% Pure Natural', 'Unsweetened', 'Rich Flavanols']
  }
];

// Seed Knowledge Base (Approved Grounded Facts)
let knowledgeBase: KnowledgeItem[] = [
  {
    id: 'kb-1',
    category: 'product',
    question: 'What is Big Ben Global Limited Beetroot Tea made from?',
    answer: 'Big Ben Global Limited Beetroot Tea is made from 100% selected mature beetroot (Beta vulgaris), gently washed, cut, and slowly dehydrated to preserve its natural earthy-sweet flavor and deep crimson pigment. It contains zero artificial colors, zero preservatives, and no added sugars.',
    lastUpdated: '2026-10-15'
  },
  {
    id: 'kb-2',
    category: 'preparation',
    question: 'How do I brew Big Ben Beetroot Tea?',
    answer: 'For loose leaf cuts: use 1-2 teaspoons (around 4g) per 250ml cup. Pour freshly boiled water (95°C-100°C) and steep for 5 to 7 minutes. For pyramid tea bags: steep 1 bag in boiled water for 4 to 6 minutes. You can enjoy it hot, or cool and serve iced with fresh lemon slices.',
    lastUpdated: '2026-10-15'
  },
  {
    id: 'kb-3',
    category: 'product',
    question: 'Does this beetroot tea contain caffeine?',
    answer: 'No. Big Ben Global Limited beetroot tea is completely caffeine-free, making it an ideal wholesome beverage for morning, afternoon, or evening relaxation.',
    lastUpdated: '2026-10-15'
  },
  {
    id: 'kb-4',
    category: 'compliance',
    question: 'What are the health benefits or medical claims?',
    answer: 'In compliance with health regulations, Big Ben Global Limited does not make medicinal claims or disease-treatment promises. Beetroot is a nutrient-dense root vegetable known for naturally occurring dietary nitrates, antioxidants, and minerals. It is sold as a wholesome herbal beverage, not a pharmaceutical or cure.',
    lastUpdated: '2026-10-20'
  },
  {
    id: 'kb-5',
    category: 'shipping',
    question: 'What are the delivery times and shipping rates?',
    answer: 'UK Standard Tracked delivery takes 2-3 business days (£3.50, or FREE on orders over £35). UK Express Next-Day delivery is £6.50. Orders placed before 1:00 PM GMT ship the same business day.',
    lastUpdated: '2026-10-22'
  },
  {
    id: 'kb-6',
    category: 'returns',
    question: 'What is your refund and returns policy?',
    answer: 'We provide a 14-day return policy for unopened items with unbroken tamper-evident seals. If you receive a damaged or incorrect order, please contact customer support with your Order Reference within 48 hours for an immediate replacement or refund.',
    lastUpdated: '2026-10-22'
  }
];

// Seed Orders
let orders: Order[] = [
  {
    id: 'ord-101',
    orderRef: 'BBG-2026-4819',
    customerId: 'cust-1',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.co.uk',
    shippingAddress: {
      fullName: 'Sarah Jenkins',
      street: '14 Kensington Church Street',
      city: 'London',
      postcode: 'W8 4EP',
      country: 'United Kingdom'
    },
    items: [
      { productId: 'prod-1', productName: 'Big Ben Original Pure Beetroot Tea', packSize: '100g Loose Cuts', price: 12.50, quantity: 2 },
      { productId: 'prod-3', productName: 'Big Ben Beetroot & Ginger Herbal Infusion', packSize: '20 Pyramid Bags', price: 14.50, quantity: 1 }
    ],
    subtotal: 39.50,
    shippingFee: 0,
    total: 39.50,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Test Card (Secure Paystack)',
    createdAt: '2026-11-03T14:22:00Z',
    trackingNumber: 'GB-ROYAL-78934',
    notes: 'Please leave in porch if recipient is not available'
  },
  {
    id: 'ord-102',
    orderRef: 'BBG-2026-4820',
    customerId: 'cust-2',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@example.com',
    shippingAddress: {
      fullName: 'Marcus Vance',
      street: '42 St Vincent Street',
      city: 'Glasgow',
      postcode: 'G2 5TS',
      country: 'United Kingdom'
    },
    items: [
      { productId: 'prod-2', productName: 'Big Ben Original Pure Beetroot Tea (Family Pack)', packSize: '250g Loose Cuts', price: 24.00, quantity: 1 }
    ],
    subtotal: 24.00,
    shippingFee: 3.50,
    total: 27.50,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Test Card (Secure Flutterwave)',
    createdAt: '2026-11-02T10:15:00Z',
    trackingNumber: 'DPD-UK-90218'
  },
  {
    id: 'ord-103',
    orderRef: 'BBG-2026-4821',
    customerId: 'cust-1',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.co.uk',
    shippingAddress: {
      fullName: 'Sarah Jenkins',
      street: '14 Kensington Church Street',
      city: 'London',
      postcode: 'W8 4EP',
      country: 'United Kingdom'
    },
    items: [
      { productId: 'prod-5', productName: 'Big Ben Beetroot Tea Master Eco-Refill', packSize: '500g Loose Cuts', price: 38.00, quantity: 1 }
    ],
    subtotal: 38.00,
    shippingFee: 0,
    total: 38.00,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Test Card',
    createdAt: '2026-10-24T09:00:00Z',
    trackingNumber: 'GB-ROYAL-44102'
  }
];

// Seed Enquiries
let enquiries: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'David Thorne',
    email: 'd.thorne@wellnesscafe.co.uk',
    subject: 'Wholesale inquiry for organic cafe in Bristol',
    message: 'Hello Big Ben Global team, we are interested in stocking your 500g eco-refill beetroot tea for our 3 cafe branches in Bristol. Could you provide trade tier pricing?',
    status: 'new',
    createdAt: '2026-11-03T16:40:00Z'
  },
  {
    id: 'enq-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    subject: 'Allergen confirmation and blending facilities',
    message: 'Are your pyramid tea bags processed on equipment that handles gluten, nuts, or celery? Thank you for clarifying.',
    status: 'reviewed',
    createdAt: '2026-11-01T11:20:00Z'
  }
];

// Seed Audit Logs
let auditLogs: AuditLog[] = [
  {
    id: 'log-1',
    action: 'INVENTORY_UPDATE',
    performedBy: 'System Administrator',
    details: 'Received batch restock for 100g Loose Cuts (+50 units). Stock updated to 84.',
    timestamp: '2026-11-03T09:12:00Z'
  },
  {
    id: 'log-2',
    action: 'ORDER_STATUS_CHANGE',
    performedBy: 'Operations Manager',
    details: 'Order BBG-2026-4820 updated status to SHIPPED. Carrier assigned: DPD-UK.',
    timestamp: '2026-11-02T16:05:00Z'
  },
  {
    id: 'log-3',
    action: 'KNOWLEDGE_UPDATE',
    performedBy: 'Compliance Lead',
    details: 'Audited product knowledge item kb-4 to maintain compliant wellness wording.',
    timestamp: '2026-10-20T14:30:00Z'
  }
];

// Unresolved Questions tracking for AI Chatbot
let unresolvedQuestions: { id: string; query: string; count: number; firstAsked: string; status: 'pending' | 'resolved' }[] = [
  {
    id: 'unres-1',
    query: 'Do you deliver to Guernsey or Jersey Channel Islands?',
    count: 3,
    firstAsked: '2026-11-01',
    status: 'pending'
  },
  {
    id: 'unres-2',
    query: 'Can beetroot tea be prepared in a cold brew French press overnight?',
    count: 5,
    firstAsked: '2026-10-28',
    status: 'pending'
  }
];

// User Accounts Store
interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'customer' | 'admin';
  phone?: string;
  addresses: {
    id: string;
    fullName: string;
    street: string;
    city: string;
    postcode: string;
    country: string;
    isDefault?: boolean;
  }[];
}

let users: UserAccount[] = [
  {
    id: 'cust-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.co.uk',
    password: 'password123',
    role: 'customer',
    phone: '+44 7700 900123',
    addresses: [
      {
        id: 'addr-1',
        fullName: 'Sarah Jenkins',
        street: '14 Kensington Church Street',
        city: 'London',
        postcode: 'W8 4EP',
        country: 'United Kingdom',
        isDefault: true
      }
    ]
  },
  {
    id: 'admin-1',
    name: 'Arthur Pendelton',
    email: 'admin@bigbenglobal.co.uk',
    password: 'admin123',
    role: 'admin',
    phone: '+44 20 7946 0991',
    addresses: [
      {
        id: 'addr-admin',
        fullName: 'Arthur Pendelton',
        street: '10 High Street',
        city: 'London',
        postcode: 'SW1A 1AA',
        country: 'United Kingdom',
        isDefault: true
      }
    ]
  }
];

// API ROUTES

// 0. Auth API (Sign In, Sign Up, Sign Out, Me)
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const cleanEmail = String(email).trim().toLowerCase();
  let user = users.find(u => u.email.toLowerCase() === cleanEmail);
  
  if (!user) {
    user = {
      id: 'cust-' + Date.now(),
      name: cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: cleanEmail,
      role: cleanEmail.includes('admin') ? 'admin' : 'customer',
      addresses: [{
        id: 'addr-' + Date.now(),
        fullName: cleanEmail.split('@')[0],
        street: '10 High Street',
        city: 'London',
        postcode: 'SW1A 1AA',
        country: 'United Kingdom',
        isDefault: true
      }]
    };
    users.push(user);
  }

  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser, token: 'bbg_tok_' + Date.now() });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, addresses } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const cleanEmail = String(email).trim().toLowerCase();
  const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    const { password: _, ...safeUser } = existing;
    return res.json({ user: safeUser, token: 'bbg_tok_' + Date.now() });
  }

  const newUser: UserAccount = {
    id: 'cust-' + Date.now(),
    name: String(name).trim(),
    email: cleanEmail,
    password: password || 'default123',
    role: 'customer',
    phone,
    addresses: addresses || [{
      id: 'addr-' + Date.now(),
      fullName: String(name).trim(),
      street: '12 Botanical Way',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
      isDefault: true
    }]
  };

  users.push(newUser);
  const { password: _, ...safeUser } = newUser;
  res.status(201).json({ user: safeUser, token: 'bbg_tok_' + Date.now() });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// 1. Products API
app.get('/api/products', (req, res) => {
  res.json({ products });
});

app.post('/api/products', (req, res) => {
  const newProduct: Product = {
    id: 'prod-' + Date.now(),
    name: req.body.name || 'New Beetroot Product',
    slug: (req.body.name || 'product').toLowerCase().replace(/\s+/g, '-'),
    subtitle: req.body.subtitle || '',
    description: req.body.description || '',
    packSize: req.body.packSize || '100g',
    price: Number(req.body.price) || 12.00,
    stock: Number(req.body.stock) || 0,
    sku: req.body.sku || 'BBG-' + Math.floor(1000 + Math.random() * 9000),
    image: req.body.image || '/assets/aistudio/Big_Ben_Original_Pure_Beetroot_Tea_8a68a0c8.jpg',
    isFeatured: Boolean(req.body.isFeatured),
    isArchived: false,
    category: req.body.category || 'Tea Blends',
    ingredients: req.body.ingredients || '100% Dehydrated Beetroot',
    brewingInstructions: req.body.brewingInstructions || 'Steep in boiled water 5-7 min',
    storage: req.body.storage || 'Store in a cool dry place',
    badges: req.body.badges || ['Pure Botanicals']
  };

  products.push(newProduct);
  auditLogs.unshift({
    id: 'log-' + Date.now(),
    action: 'PRODUCT_CREATED',
    performedBy: 'Administrator',
    details: `Created product "${newProduct.name}" (SKU: ${newProduct.sku}) with price £${newProduct.price.toFixed(2)}`,
    timestamp: new Date().toISOString()
  });

  res.status(201).json({ product: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const prev = products[index];
  products[index] = { ...prev, ...req.body };

  auditLogs.unshift({
    id: 'log-' + Date.now(),
    action: 'PRODUCT_UPDATED',
    performedBy: 'Administrator',
    details: `Updated product "${products[index].name}". Stock: ${products[index].stock}, Price: £${products[index].price.toFixed(2)}`,
    timestamp: new Date().toISOString()
  });

  res.json({ product: products[index] });
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Soft archive to protect order history integrity
  products[index].isArchived = true;
  auditLogs.unshift({
    id: 'log-' + Date.now(),
    action: 'PRODUCT_ARCHIVED',
    performedBy: 'Administrator',
    details: `Archived product "${products[index].name}" (ID: ${id})`,
    timestamp: new Date().toISOString()
  });

  res.json({ success: true, message: 'Product archived' });
});

// 2. Orders API
app.get('/api/orders', (req, res) => {
  const { customerEmail } = req.query;
  if (customerEmail && typeof customerEmail === 'string') {
    const customerOrders = orders.filter(o => o.customerEmail.toLowerCase() === customerEmail.toLowerCase());
    return res.json({ orders: customerOrders });
  }
  res.json({ orders });
});

app.get('/api/orders/lookup', (req, res) => {
  const { orderRef, email } = req.query;
  if (!orderRef) {
    return res.status(400).json({ error: 'Order reference is required' });
  }
  const match = orders.find(o => 
    o.orderRef.toLowerCase().trim() === String(orderRef).toLowerCase().trim() &&
    (!email || o.customerEmail.toLowerCase().trim() === String(email).toLowerCase().trim())
  );
  if (!match) {
    return res.status(404).json({ error: 'Order not found. Please verify the reference and email address.' });
  }
  // Return safe customer order summary
  res.json({
    order: {
      orderRef: match.orderRef,
      status: match.status,
      createdAt: match.createdAt,
      total: match.total,
      trackingNumber: match.trackingNumber,
      itemCount: match.items.reduce((s, i) => s + i.quantity, 0),
      items: match.items.map(i => ({ name: i.productName, pack: i.packSize, qty: i.quantity }))
    }
  });
});

app.post('/api/orders', (req, res) => {
  const { customerName, customerEmail, shippingAddress, items, shippingFee, paymentMethod } = req.body;

  if (!items || !items.length || !customerEmail || !customerName) {
    return res.status(400).json({ error: 'Missing required order details' });
  }

  // Calculate server-authoritative totals
  let subtotal = 0;
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    const price = product ? product.price : item.price;
    subtotal += price * item.quantity;

    // Deduct inventory
    if (product) {
      product.stock = Math.max(0, product.stock - item.quantity);
    }
  }

  const fee = shippingFee !== undefined ? Number(shippingFee) : (subtotal >= 35 ? 0 : 3.50);
  const total = subtotal + fee;

  const orderRef = 'BBG-2026-' + Math.floor(1000 + Math.random() * 9000);
  const newOrder: Order = {
    id: 'ord-' + Date.now(),
    orderRef,
    customerId: req.body.customerId || 'guest-' + Date.now(),
    customerName,
    customerEmail,
    shippingAddress: shippingAddress || {
      fullName: customerName,
      street: '12 Botanical Way',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom'
    },
    items: items.map((i: any) => ({
      productId: i.productId,
      productName: i.productName,
      packSize: i.packSize,
      price: i.price,
      quantity: i.quantity,
      image: i.image || (products.find(p => p.id === i.productId)?.image)
    })),
    subtotal: Number(subtotal.toFixed(2)),
    shippingFee: Number(fee.toFixed(2)),
    total: Number(total.toFixed(2)),
    status: 'pending',
    paymentStatus: 'paid', // Simulated secure payment gateway verification
    paymentMethod: paymentMethod || 'Card (Test Gateway)',
    createdAt: new Date().toISOString(),
    trackingNumber: 'GB-ROYAL-' + Math.floor(10000 + Math.random() * 90000)
  };

  orders.unshift(newOrder);

  auditLogs.unshift({
    id: 'log-' + Date.now(),
    action: 'ORDER_PLACED',
    performedBy: customerName,
    details: `New order ${orderRef} placed for £${newOrder.total.toFixed(2)} (${newOrder.items.length} items)`,
    timestamp: new Date().toISOString()
  });

  res.status(201).json({ order: newOrder });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, trackingNumber } = req.body;
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const oldStatus = order.status;
  if (status) order.status = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;

  auditLogs.unshift({
    id: 'log-' + Date.now(),
    action: 'ORDER_STATUS_CHANGE',
    performedBy: 'Administrator',
    details: `Order ${order.orderRef} changed from ${oldStatus.toUpperCase()} to ${order.status.toUpperCase()}`,
    timestamp: new Date().toISOString()
  });

  res.json({ order });
});

// 3. Contact Enquiries API
app.get('/api/contact', (req, res) => {
  res.json({ enquiries });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const newEnquiry: Enquiry = {
    id: 'enq-' + Date.now(),
    name,
    email,
    subject: subject || 'General Beetroot Tea Inquiry',
    message,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  enquiries.unshift(newEnquiry);
  res.status(201).json({ success: true, enquiry: newEnquiry });
});

app.patch('/api/contact/:id', (req, res) => {
  const { id } = req.params;
  const enquiry = enquiries.find(e => e.id === id);
  if (!enquiry) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  if (req.body.status) enquiry.status = req.body.status;
  res.json({ enquiry });
});

// 4. Admin Knowledge Base & Unresolved Questions
app.get('/api/admin/knowledge', (req, res) => {
  res.json({ knowledgeBase, unresolvedQuestions });
});

app.post('/api/admin/knowledge', (req, res) => {
  const { category, question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }
  const item: KnowledgeItem = {
    id: 'kb-' + Date.now(),
    category: category || 'product',
    question,
    answer,
    lastUpdated: new Date().toISOString().split('T')[0]
  };
  knowledgeBase.push(item);
  res.status(201).json({ item });
});

app.put('/api/admin/knowledge/:id', (req, res) => {
  const { id } = req.params;
  const idx = knowledgeBase.findIndex(k => k.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  knowledgeBase[idx] = { ...knowledgeBase[idx], ...req.body, lastUpdated: new Date().toISOString().split('T')[0] };
  res.json({ item: knowledgeBase[idx] });
});

app.delete('/api/admin/knowledge/:id', (req, res) => {
  const { id } = req.params;
  knowledgeBase = knowledgeBase.filter(k => k.id !== id);
  res.json({ success: true });
});

// 5. Admin Metrics & Audit Logs
app.get('/api/admin/metrics', (req, res) => {
  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const lowStockProducts = products.filter(p => !p.isArchived && p.stock <= 15);

  res.json({
    metrics: {
      totalSales: Number(totalSales.toFixed(2)),
      totalOrders,
      pendingOrders,
      lowStockCount: lowStockProducts.length
    },
    lowStockAlerts: lowStockProducts.map(p => ({ id: p.id, name: p.name, stock: p.stock, sku: p.sku })),
    recentAuditLogs: auditLogs.slice(0, 15)
  });
});

// 6. AI Chatbot API (Safe, Grounded in Knowledge Base & Compliant)
app.post('/api/chat', async (req, res) => {
  const { message, customerEmail } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const trimmed = message.trim();

  // Check if this is an order lookup intent
  const orderRefMatch = trimmed.match(/BBG[- ]?2026[- ]?(\d{4})/i);
  if (orderRefMatch) {
    const cleanRef = `BBG-2026-${orderRefMatch[1]}`;
    const foundOrder = orders.find(o => o.orderRef.toLowerCase() === cleanRef.toLowerCase());

    if (foundOrder) {
      // Check customer verification for order security
      if (customerEmail && foundOrder.customerEmail.toLowerCase() !== customerEmail.toLowerCase()) {
        return res.json({
          reply: `For security reasons, order details can only be revealed to the email address used at checkout. Please log into your account or contact customer support directly.`
        });
      }
      return res.json({
        reply: `Here are the details for Order **${foundOrder.orderRef}**:\n• Status: **${foundOrder.status.toUpperCase()}**\n• Placed On: ${foundOrder.createdAt.split('T')[0]}\n• Items: ${foundOrder.items.map(i => `${i.quantity}x ${i.productName} (${i.packSize})`).join(', ')}\n• Delivery Address: ${foundOrder.shippingAddress.city}, ${foundOrder.shippingAddress.postcode}\n• Tracking Reference: ${foundOrder.trackingNumber || 'Processing dispatch'}\n\nYou can review your full receipt in your Customer Dashboard.`
      });
    } else {
      return res.json({
        reply: `We could not locate an order matching "${cleanRef}". Please check the 8-digit reference code on your confirmation email or submit a quick note through our Contact page.`
      });
    }
  }

  // Construct grounding context from products and knowledge base
  const knowledgeContext = knowledgeBase.map(k => `Q: ${k.question}\nA: ${k.answer}`).join('\n\n');
  const productsContext = products.filter(p => !p.isArchived).map(p => 
    `Product: ${p.name}\nPack Size: ${p.packSize}\nPrice: £${p.price.toFixed(2)}\nStock: ${p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}\nIngredients: ${p.ingredients}\nBrewing: ${p.brewingInstructions}`
  ).join('\n\n');

  const systemInstruction = `You are the official Customer Care & Tea Specialist Assistant for Big Ben Global Limited, a distinguished company specializing in premium dehydrated beetroot tea.

STRICT COMPLIANCE & ACCURACY GUIDELINES:
1. ONLY provide facts grounded in the approved company information and knowledge base below.
2. DO NOT INVENT medical claims, disease prevention or treatment claims (e.g. do NOT say it treats high blood pressure, diabetes, cancer, or heart disease). Instead, describe it carefully as a wholesome, naturally caffeine-free herbal infusion rich in dietary beetroot nutrients and antioxidants.
3. If asked for information that is not verified in the knowledge base, honestly state that the detail is not currently on record and warmly invite them to reach out via the Contact page or email info@bigbenglobal.co.uk.
4. Keep replies welcoming, elegant, clear, and under 150 words.
5. Pricing and shipping rules:
   - UK standard delivery is £3.50 (FREE on orders over £35).
   - 14-day unopened return policy with tamper-evident seal intact.

APPROVED KNOWLEDGE BASE:
${knowledgeContext}

APPROVED PRODUCT CATALOGUE:
${productsContext}
`;

  // Try calling Gemini API if client available
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          { role: 'user', parts: [{ text: systemInstruction + `\n\nCustomer question: "${trimmed}"` }] }
        ]
      });

      const replyText = response.text?.trim() || "Thank you for reaching out to Big Ben Global Limited. How else can we assist your beetroot tea journey today?";
      return res.json({ reply: replyText });
    } catch (err) {
      console.error('Gemini API call failed, falling back to grounded heuristic rules:', err);
    }
  }

  // Grounded Heuristic Fallback (Ensures 100% reliable functionality even without API key)
  const queryLower = trimmed.toLowerCase();
  let fallbackReply = '';

  if (queryLower.includes('brew') || queryLower.includes('how to prepare') || queryLower.includes('steep') || queryLower.includes('temperature') || queryLower.includes('hot water')) {
    fallbackReply = "To brew Big Ben Beetroot Tea: use 1-2 teaspoons (approx. 4g) of loose cuts per 250ml cup. Pour freshly boiled water (95°C-100°C) and steep for 5 to 7 minutes to release its rich ruby color and earthy-sweet depth. Enjoy it hot, or iced with a slice of fresh lemon!";
  } else if (queryLower.includes('caffeine') || queryLower.includes('stimulant')) {
    fallbackReply = "Big Ben Global Limited Beetroot Tea is 100% naturally caffeine-free! It contains only pure botanicals with no caffeine, so you can comfortably enjoy it morning, afternoon, or right before bed.";
  } else if (queryLower.includes('ingredient') || queryLower.includes('sugar') || queryLower.includes('artificial') || queryLower.includes('organic')) {
    fallbackReply = "Our original infusion contains one pure ingredient: 100% dehydrated mature beetroot (Beta vulgaris). We never add artificial colors, preservatives, or sweeteners. Our spiced variants contain only pure beetroot paired with natural dried ginger or hibiscus.";
  } else if (queryLower.includes('price') || queryLower.includes('cost') || queryLower.includes('pack size') || queryLower.includes('sizes')) {
    fallbackReply = "Big Ben Beetroot Tea is offered in several sizes:\n• 100g Loose Leaf Pouch: £12.50\n• 250g Family Pack: £24.00\n• 20 Biodegradable Pyramid Bags: £14.50 (Original, Ginger, or Hibiscus)\n• 500g Master Eco-Refill: £38.00\nDelivery is free across the UK on orders over £35!";
  } else if (queryLower.includes('shipping') || queryLower.includes('delivery') || queryLower.includes('postage') || queryLower.includes('how long')) {
    fallbackReply = "We dispatch orders within 24 hours. UK Standard Tracked delivery is £3.50 (FREE for orders over £35) and arrives in 2-3 business days. UK Express Next-Day delivery is available for £6.50.";
  } else if (queryLower.includes('return') || queryLower.includes('refund') || queryLower.includes('cancel')) {
    fallbackReply = "We maintain a 14-day return policy for unopened items with undamaged tamper-evident seals. If an item arrives damaged, our support team will promptly issue a replacement or refund upon inspection.";
  } else if (queryLower.includes('benefit') || queryLower.includes('blood pressure') || queryLower.includes('health') || queryLower.includes('cure') || queryLower.includes('medicine')) {
    fallbackReply = "In accordance with wellness compliance standards, we do not make disease-treatment or medical claims. Mature beetroot is a natural root vegetable cherished for dietary nitrates, antioxidants, and minerals. We offer it as a wholesome herbal beverage to support daily hydration.";
  } else {
    // Record as unresolved query for admin review
    const existingUnres = unresolvedQuestions.find(u => u.query.toLowerCase() === trimmed.toLowerCase());
    if (existingUnres) {
      existingUnres.count++;
    } else {
      unresolvedQuestions.push({
        id: 'unres-' + Date.now(),
        query: trimmed,
        count: 1,
        firstAsked: new Date().toISOString().split('T')[0],
        status: 'pending'
      });
    }

    fallbackReply = "Thank you for your question about Big Ben Global Limited Beetroot Tea. Because we hold our customer guidance to verified company standards, we want to ensure you receive precise details. Please submit this inquiry through our Contact page or speak to our team at info@bigbenglobal.co.uk and we will be delighted to help!";
  }

  res.json({ reply: fallbackReply });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Big Ben Global Limited server listening at http://0.0.0.0:${PORT}`);
  });
}

// Only launch standalone HTTP server when not running in Vercel serverless environment
if (process.env.VERCEL !== '1' && process.env.NODE_ENV !== 'test') {
  startServer();
}

export { app };
export default app;
