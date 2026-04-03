import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ShopFooter = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-foreground text-primary-foreground mt-16">
      {/* Newsletter Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold">Stay in the loop</h3>
            <p className="text-sm text-white/60 mt-1">Subscribe for exclusive deals, new arrivals & more.</p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
            className="flex w-full max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-xl bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-r-xl bg-accent text-white font-semibold text-sm flex items-center gap-1.5 hover:brightness-110 transition-all"
              style={{ background: 'hsl(var(--accent))' }}
            >
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1280px] mx-auto px-5 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="font-display font-bold text-xl mb-4">
            Shop<span style={{ color: 'hsl(var(--accent))' }}>Smart</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed mb-5">
            Your one-stop destination for premium products at unbeatable prices. Quality guaranteed.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Twitter, label: 'Twitter' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Youtube, label: 'YouTube' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">Shop</h4>
          <ul className="space-y-2.5">
            {['New Arrivals', 'Best Sellers', 'Sale', 'Collections', 'Gift Cards'].map((l) => (
              <li key={l}>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">Company</h4>
          <ul className="space-y-2.5">
            {['About Us', 'Careers', 'Blog', 'Press', 'Sustainability'].map((l) => (
              <li key={l}>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-sm text-white/50">
              <MapPin size={15} className="mt-0.5 shrink-0 text-white/40" />
              <span>123 Commerce St, Mumbai, India 400001</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/50">
              <Phone size={15} className="shrink-0 text-white/40" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/50">
              <Mail size={15} className="shrink-0 text-white/40" />
              <span>support@shopsmart.in</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} ShopSmart. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((l) => (
              <Link key={l} to="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-white/40">We accept:</span>
            {['💳', '🏦', '📱', '🔒'].map((e) => <span key={e} className="text-base">{e}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
