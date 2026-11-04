export interface Product {
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

export interface OrderItem {
  productId: string;
  productName: string;
  packSize: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderRef: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: Address;
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

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  addresses: Address[];
}

export interface KnowledgeItem {
  id: string;
  category: 'product' | 'preparation' | 'shipping' | 'returns' | 'compliance';
  question: string;
  answer: string;
  lastUpdated: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  details: string;
  timestamp: string;
}

export interface UnresolvedQuestion {
  id: string;
  query: string;
  count: number;
  firstAsked: string;
  status: 'pending' | 'resolved';
}

export interface AdminMetrics {
  totalSales: number;
  totalOrders: number;
  pendingOrders: number;
  lowStockCount: number;
}
