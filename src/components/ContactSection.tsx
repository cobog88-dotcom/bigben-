import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown, HelpCircle } from 'lucide-react';
import { KnowledgeItem } from '../types';

interface ContactSectionProps {
  knowledgeBase: KnowledgeItem[];
  onSubmitEnquiry: (enquiry: { name: string; email: string; subject: string; message: string }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  knowledgeBase,
  onSubmitEnquiry
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Product Question');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    onSubmitEnquiry({
      name,
      email,
      subject,
      message
    });

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setIsSubmitted(false), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs text-rose-900 font-semibold tracking-wider uppercase font-mono">
          Customer Care & Wholesale
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Get in Touch with Big Ben Global
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Have an inquiry regarding our dehydrated beetroot tea, brewing recommendations, corporate gifting, or trade distribution? Our London customer team responds within 24 business hours.
        </p>
      </div>

      {/* Grid: Contact Form & Corporate Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-xl text-slate-900 mb-2">
            Send an Official Message
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Please fill in your details and we will review your submission promptly.
          </p>

          {isSubmitted && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong>Message Dispatched to Customer Care:</strong> Thank you for reaching out. We have logged your enquiry into our admin system and a team specialist will follow up shortly.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Thorne"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. david@example.co.uk"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Topic / Subject</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none"
              >
                <option value="General Product Question">General Product & Steeping Question</option>
                <option value="Order Status & Delivery">Order Status & Delivery Inquiry</option>
                <option value="Wholesale & Cafe Distribution">Wholesale & Cafe Distribution (Trade)</option>
                <option value="Feedback & Product Suggestion">Customer Experience Feedback</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Message</label>
              <textarea
                rows={4}
                required
                placeholder="How can our tea specialists assist you?"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-800"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] bg-[#881337] hover:bg-[#9F1239] text-white py-3 rounded-xl font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>

        {/* Corporate Details Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#EFE8DC] p-6 sm:p-8 space-y-6 text-xs">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Corporate Office Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#EFE8DC] flex items-center justify-center text-rose-900 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Email Inquiries</span>
                  <a href="mailto:info@bigbenglobal.co.uk" className="text-slate-600 hover:text-rose-900">
                    info@bigbenglobal.co.uk
                  </a>
                  <p className="text-[10px] text-slate-400 mt-0.5">Response within 24h GMT</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#EFE8DC] flex items-center justify-center text-rose-900 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Telephone Support</span>
                  <span className="text-slate-600 font-mono">+44 20 7946 0991 [Placeholder]</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Monday to Friday, 9:00 - 17:00 GMT</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#EFE8DC] flex items-center justify-center text-rose-900 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">London Headquarters</span>
                  <span className="text-slate-600">
                    Big Ben Global Limited<br />
                    14 Kensington High Street, London W8 4EP [Placeholder for Approval]
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#EFE8DC] flex items-center justify-center text-rose-900 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Order Processing Hours</span>
                  <span className="text-slate-600">
                    Same-day courier dispatch cut-off: 1:00 PM GMT
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#EFE8DC] text-[11px] text-slate-500">
              <strong>Order Lookups:</strong> For existing orders, you can also use our 24/7 AI Specialist Assistant (launcher in bottom right) or log into your Customer Dashboard.
            </div>
          </div>
        </div>

      </div>

      {/* Honest FAQs Accordion */}
      <div className="bg-white rounded-2xl border border-[#EFE8DC] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs text-rose-900 font-semibold font-mono">
            <HelpCircle className="w-4 h-4" />
            <span>Honest & Verified Answers</span>
          </div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">
            Company-approved facts regarding ingredients, shipping, caffeine status, and returns.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#EFE8DC] text-xs">
          {knowledgeBase.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={faq.id} className="py-4">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left font-serif font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:text-rose-900 transition-colors py-1"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <p className="mt-2 text-slate-600 leading-relaxed text-xs pr-6">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
