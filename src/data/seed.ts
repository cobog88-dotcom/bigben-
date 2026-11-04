import { Product, KnowledgeItem, Order, ContactEnquiry, User, AuditLog } from '../types';

export const initialProducts: Product[] = [
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

export const initialKnowledgeBase: KnowledgeItem[] = [
  {
    id: 'kb-1',
    category: 'product',
    question: 'What products does Big Ben Global Limited offer?',
    answer: 'Big Ben Global Limited offers premium botanical teas and cold-pressed wellness products: Beetroot and Hibiscus Tea (25 tea bags), Herbal Infused Tea (25 tea bags), 100% Pure Cocoa Butter (120g), Virgin Cold-Pressed Coconut Oil (250ml), Virgin Cold-Pressed Peanut Oil (250ml), and Pure Natural Cocoa Powder (100g). All products are 100% natural and free from artificial additives.',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'kb-2',
    category: 'preparation',
    question: 'How do I brew Big Ben Beetroot & Hibiscus Tea?',
    answer: 'Place 1 tea bag in a 250ml cup. Pour freshly boiled water (95°C-100°C) and steep for 5 to 7 minutes to release its rich ruby color and earthy-sweet depth. You can enjoy it hot, or cool and serve iced with fresh lemon slices.',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'kb-3',
    category: 'product',
    question: 'Are Big Ben teas caffeine-free?',
    answer: 'Yes! Both Big Ben Beetroot & Hibiscus Tea and Herbal Infused Tea are made with 100% natural botanicals and are naturally caffeine-free, making them perfect for any time of the day.',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'kb-4',
    category: 'compliance',
    question: 'What health or medical claims apply to your products?',
    answer: 'In compliance with wellness regulations, Big Ben Global Limited does not make medicinal claims or disease-treatment promises. Our teas and cold-pressed oils are offered as wholesome, natural nutrition and personal wellness staples.',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'kb-5',
    category: 'shipping',
    question: 'What are the delivery times and shipping rates?',
    answer: 'UK Standard Tracked delivery takes 2-3 business days (£3.50, or FREE on orders over £35). UK Express Next-Day delivery is £6.50. Orders placed before 1:00 PM GMT dispatch the same business day.',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'kb-6',
    category: 'returns',
    question: 'What is your refund and returns policy?',
    answer: 'We provide a 14-day return policy for unopened items with unbroken tamper-evident seals. If you receive a damaged product, please contact support with your Order Reference for a rapid resolution.',
    lastUpdated: '2026-11-04'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-101',
    orderRef: 'BBG-2026-4819',
    customerId: 'cust-1',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.co.uk',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Sarah Jenkins',
      street: '14 Kensington Church Street',
      city: 'London',
      postcode: 'W8 4EP',
      country: 'United Kingdom',
      isDefault: true
    },
    items: [
      { 
        productId: 'prod-1', 
        productName: 'BEETROOT AND HIBISCUS TEA', 
        packSize: '25 Tea Bags (Box)', 
        price: 12.50, 
        quantity: 2,
        image: '/assets/aistudio/Big_Ben_Original_Pure_Beetroot_Tea_8a68a0c8.jpg'
      },
      { 
        productId: 'prod-3', 
        productName: 'COCOA BUTTER', 
        packSize: '120g Pure Moisturizing Bar', 
        price: 14.50, 
        quantity: 1,
        image: '/assets/aistudio/COCOA_BUTTER_95faad88.jpg'
      }
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
      id: 'addr-2',
      fullName: 'Marcus Vance',
      street: '42 St Vincent Street',
      city: 'Glasgow',
      postcode: 'G2 5TS',
      country: 'United Kingdom'
    },
    items: [
      { 
        productId: 'prod-2', 
        productName: 'HERBAL INFUSED TEA', 
        packSize: '25 Tea Bags (Box)', 
        price: 13.50, 
        quantity: 1,
        image: '/assets/aistudio/HERBAL_INFUSED_TEA_762ca0d5.jpg'
      },
      { 
        productId: 'prod-4', 
        productName: 'COCONUT OIL', 
        packSize: '250ml Glass Bottle', 
        price: 11.50, 
        quantity: 1,
        image: '/assets/aistudio/COCONUT_OIL_91649589.jpg'
      }
    ],
    subtotal: 25.00,
    shippingFee: 3.50,
    total: 28.50,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Test Card (Secure Flutterwave)',
    createdAt: '2026-11-02T10:15:00Z',
    trackingNumber: 'DPD-UK-90218'
  }
];

export const demoCustomer: User = {
  id: 'cust-1',
  name: 'Sarah Jenkins',
  email: 'sarah.j@example.co.uk',
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
    },
    {
      id: 'addr-2',
      fullName: 'Sarah Jenkins (Office)',
      street: '33 Holborn Circus',
      city: 'London',
      postcode: 'EC1N 2HT',
      country: 'United Kingdom',
      isDefault: false
    }
  ]
};

export const demoAdmin: User = {
  id: 'admin-1',
  name: 'Arthur Pendelton (Operations Lead)',
  email: 'admin@bigbenglobal.co.uk',
  role: 'admin',
  phone: '+44 20 7946 0991',
  addresses: []
};

export const initialEnquiries: ContactEnquiry[] = [
  {
    id: 'enq-1',
    name: 'David Thorne',
    email: 'd.thorne@wellnesscafe.co.uk',
    subject: 'Wholesale inquiry for organic cafe in Bristol',
    message: 'Hello Big Ben Global team, we are interested in stocking your Beetroot & Hibiscus tea and Virgin Coconut Oil for our 3 cafe branches in Bristol. Could you provide trade tier pricing?',
    status: 'new',
    createdAt: '2026-11-03T16:40:00Z'
  },
  {
    id: 'enq-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    subject: 'Cold-pressed virgin coconut and peanut oil sourcing',
    message: 'Are your coconut and peanut oils processed on dedicated single-seed expellers? Thank you for clarifying.',
    status: 'reviewed',
    createdAt: '2026-11-01T11:20:00Z'
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    action: 'INVENTORY_UPDATE',
    performedBy: 'System Administrator',
    details: 'Received new packaging batch for BEETROOT AND HIBISCUS TEA (25 Tea Bags). Stock set to 84.',
    timestamp: '2026-11-03T09:12:00Z'
  },
  {
    id: 'log-2',
    action: 'PRODUCT_CATALOGUE_UPDATE',
    performedBy: 'Operations Manager',
    details: 'Updated product imagery and catalogue lines with authentic Big Ben packaging assets.',
    timestamp: '2026-11-04T08:00:00Z'
  }
];
