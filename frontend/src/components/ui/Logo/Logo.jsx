import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '',  textSize = 'text-xl', hideText = false }) {
    return (
        <Link to="/" className={`flex items-center gap-3 group ${className}`}>
             {!hideText && (
                <span className={`font-black tracking-tight text-slate-900 dark:text-white ${textSize} whitespace-nowrap`}>
                    AI CV BUILDER
                </span>
            )}
        </Link>
    );
}
