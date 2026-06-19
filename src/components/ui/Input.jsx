import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(inputs));

const Input = forwardRef(({ className, label, error, ...props }, ref) => {
    return (
        <div className="w-full flex flex-col space-y-1.5">
            {label && (
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={cn(
                    "w-full px-4 py-2.5 rounded-lg border bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors",
                    "border-slate-200 dark:border-slate-700",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "placeholder-slate-400 dark:placeholder-slate-500",
                    "text-slate-900 dark:text-slate-100",
                    error && "border-red-500 focus:ring-red-500",
                    className
                )}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
