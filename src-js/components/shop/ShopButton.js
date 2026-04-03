import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { LoadingDots, Spinner } from './Loader';
const ShopButton = React.forwardRef(({ children, variant = 'primary', loading = false, success = false, size = 'md', className = '', onClick, disabled, type = 'button', style, ...props }, ref) => {
    const btnRef = useRef(null);
    const resolvedRef = ref || btnRef;
    const addRipple = (e) => {
        const btn = resolvedRef.current;
        if (!btn)
            return;
        const rect = btn.getBoundingClientRect();
        const s = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - rect.left - s / 2}px;top:${e.clientY - rect.top - s / 2}px;position:absolute;`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    };
    const handleClick = (e) => {
        addRipple(e);
        if (onClick)
            onClick(e);
    };
    const sizeClasses = { sm: 'px-4 py-2 text-xs', md: 'px-5 py-3 text-sm', lg: 'px-7 py-4 text-base' }[size];
    const variantClass = { primary: 'btn-primary', accent: 'btn-accent', outline: 'btn-outline', ghost: 'bg-transparent text-muted-foreground cursor-pointer border-0' }[variant];
    const successStyle = success ? { background: 'var(--success)' } : {};
    return (_jsx("button", { ref: resolvedRef, type: type, className: `${variantClass} ${sizeClasses} ${className} inline-flex items-center justify-center gap-2`, onClick: handleClick, disabled: disabled || loading, style: { ...successStyle, ...style, opacity: (disabled && !loading) ? 0.6 : 1 }, ...props, children: loading ? (variant === 'ghost' ? _jsx(Spinner, { size: 16, color: "#8b8b9a" }) : _jsx(LoadingDots, {})) : success ? _jsx("span", { children: "\u2713 Added!" }) : children }));
});
ShopButton.displayName = 'ShopButton';
export default ShopButton;
