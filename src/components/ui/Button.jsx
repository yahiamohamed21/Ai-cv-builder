import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(inputs));

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-[var(--color-primary)] text-white hover:brightness-110 shadow-lg shadow-[var(--color-primary)]/30 focus:ring-[var(--color-primary)]",
        secondary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 focus:ring-emerald-500",
        glass: "glass text-gray-800 dark:text-gray-100 hover:bg-white/90 dark:hover:bg-gray-800/90 shadow-xl",
        outline: "border-2 border-slate-200 dark:border-slate-700 hover:border-[var(--color-primary)] dark:hover:border-[var(--color-primary)] text-slate-700 dark:text-slate-200 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)]",
        ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)]"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-8 py-3 text-lg"
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
