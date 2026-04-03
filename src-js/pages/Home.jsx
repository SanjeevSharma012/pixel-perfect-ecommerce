import { useState, useMemo } from 'react';
import ProductCard from '../components/shop/ProductCard.jsx';
import products, { CATEGORIES } from '../data/products.js';
import { SORT_OPTIONS } from '../utils/constants.js';

const Home = ({ search = '' }) => {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags?.some(t => t.includes(q)));
    }
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [category, sort, search]);

  return (
    <main>
      <section className="bg-hero-gradient" style={{ padding: '52px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.55)', borderRadius: 99, padding: '5px 16px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 18, backdropFilter: 'blur(8px)' }}>
            🔥 SUMMER SALE — UP TO 40% OFF
          </div>
          <h1 className="font-display font-extrabold text-ink" style={{ fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 1.1, marginBottom: 12 }}>
            Premium picks,<br />unbeatable prices
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(10,10,15,0.6)', lineHeight: 1.65 }}>
            Curated selection of top-rated products — from electronics to fashion. Free shipping on orders over $100.
          </p>
        </div>
      </section>

      <div style={{ background: 'var(--ink)', padding: '12px 20px' }}>
        <div className="flex items-center justify-center gap-8 flex-wrap" style={{ maxWidth: 1280, margin: '0 auto' }}>
          {[['🚚', 'Free Shipping over $100'], ['🔄', '30-Day Returns'], ['🔒', 'Secure Checkout'], ['⭐', '50k+ Happy Customers']].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 20px' }}>
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2" style={{ overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {CATEGORIES.map((c) => (
              <button key={c} className={`cat-pill${category === c ? ' active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm whitespace-nowrap">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: 10, border: '1.5px solid hsl(var(--border))', fontFamily: 'DM Sans, sans-serif', fontSize: 13, background: 'white', color: 'var(--ink)', outline: 'none', cursor: 'pointer' }}>
              {SORT_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 55} />)}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🔍</div>
            <h3 className="font-display font-bold text-xl mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
            <button className="btn-outline mt-6 px-6 py-3" onClick={() => setCategory('All')}>Clear filters</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
