import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import ProductCard from '../components/shop/ProductCard';
import products, { CATEGORIES } from '../data/products';
import { SORT_OPTIONS } from '../utils/constants';
const Home = ({ search = '' }) => {
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('featured');
    const filtered = useMemo(() => {
        let list = [...products];
        if (category !== 'All')
            list = list.filter(p => p.category === category);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags?.some(t => t.includes(q)));
        }
        switch (sort) {
            case 'price-asc':
                list.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                list.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                list.sort((a, b) => b.rating - a.rating);
                break;
            default: break;
        }
        return list;
    }, [category, sort, search]);
    return (_jsxs("main", { children: [_jsx("section", { className: "bg-hero-gradient", style: { padding: '52px 20px', textAlign: 'center' }, children: _jsxs("div", { style: { maxWidth: 600, margin: '0 auto' }, children: [_jsx("div", { style: { display: 'inline-block', background: 'rgba(255,255,255,0.55)', borderRadius: 99, padding: '5px 16px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 18, backdropFilter: 'blur(8px)' }, children: "\uD83D\uDD25 SUMMER SALE \u2014 UP TO 40% OFF" }), _jsxs("h1", { className: "font-display font-extrabold text-ink", style: { fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 1.1, marginBottom: 12 }, children: ["Premium picks,", _jsx("br", {}), "unbeatable prices"] }), _jsx("p", { style: { fontSize: 16, color: 'rgba(10,10,15,0.6)', lineHeight: 1.65 }, children: "Curated selection of top-rated products \u2014 from electronics to fashion. Free shipping on orders over $100." })] }) }), _jsx("div", { style: { background: 'var(--ink)', padding: '12px 20px' }, children: _jsx("div", { className: "flex items-center justify-center gap-8 flex-wrap", style: { maxWidth: 1280, margin: '0 auto' }, children: [['🚚', 'Free Shipping over $100'], ['🔄', '30-Day Returns'], ['🔒', 'Secure Checkout'], ['⭐', '50k+ Happy Customers']].map(([icon, text]) => (_jsxs("div", { className: "flex items-center gap-2", style: { color: 'rgba(255,255,255,0.85)', fontSize: 13 }, children: [_jsx("span", { children: icon }), _jsx("span", { children: text })] }, text))) }) }), _jsxs("div", { style: { maxWidth: 1280, margin: '0 auto', padding: '36px 20px' }, children: [_jsxs("div", { className: "flex items-center justify-between gap-4 mb-6 flex-wrap", children: [_jsx("div", { className: "flex items-center gap-2", style: { overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }, children: CATEGORIES.map((c) => (_jsx("button", { className: `cat-pill${category === c ? ' active' : ''}`, onClick: () => setCategory(c), children: c }, c))) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-muted-foreground text-sm whitespace-nowrap", children: [filtered.length, " item", filtered.length !== 1 ? 's' : ''] }), _jsx("select", { value: sort, onChange: (e) => setSort(e.target.value), style: { padding: '8px 14px', borderRadius: 10, border: '1.5px solid hsl(var(--border))', fontFamily: 'DM Sans, sans-serif', fontSize: 13, background: 'white', color: 'var(--ink)', outline: 'none', cursor: 'pointer' }, children: SORT_OPTIONS.map(({ value, label }) => _jsx("option", { value: value, children: label }, value)) })] })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }, children: filtered.map((p, i) => _jsx(ProductCard, { product: p, delay: i * 55 }, p.id)) }), filtered.length === 0 && (_jsxs("div", { style: { textAlign: 'center', padding: '80px 20px' }, children: [_jsx("div", { style: { fontSize: 60, marginBottom: 16 }, children: "\uD83D\uDD0D" }), _jsx("h3", { className: "font-display font-bold text-xl mb-2", children: "No products found" }), _jsx("p", { className: "text-muted-foreground", children: "Try adjusting your search or category filter" }), _jsx("button", { className: "btn-outline mt-6 px-6 py-3", onClick: () => setCategory('All'), children: "Clear filters" })] }))] })] }));
};
export default Home;
