import React, { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../ui/Logo/Logo';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const { language, changeLanguage } = useLanguage();
    const currentLanguage = i18n.resolvedLanguage || language || 'en';
    const isArabic = currentLanguage === 'ar';

    const handleLanguageToggle = async () => {
        await changeLanguage(isArabic ? 'en' : 'ar');
    };

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('/admin/users')) return { title: t('admin_users'), desc: t('admin_users_desc') };
        if (path.includes('/admin/templates')) return { title: t('admin_templates'), desc: t('admin_templates_desc') };
        if (path.includes('/admin/analytics')) return { title: t('admin_analytics'), desc: t('admin_analytics_desc') };
        if (path.includes('/admin/subscriptions')) return { title: t('admin_subscriptions'), desc: t('admin_subscriptions_desc') };
        if (path.includes('/admin/settings')) return { title: t('admin_settings'), desc: t('admin_settings_page_desc') };
        return { title: t('admin_dashboard_title'), desc: t('admin_dashboard_desc') };
    };

    const headerContext = getPageTitle();

    const navItems = [
        { path: '/admin', icon: 'dashboard', label: t('admin_overview'), exact: true },
        { path: '/admin/users', icon: 'group', label: t('admin_users') },
        { path: '/admin/templates', icon: 'article', label: t('admin_templates') },
        { path: '/admin/settings', icon: 'settings', label: t('admin_settings') },
    ];

    return (
        <div
            dir={isArabic ? 'rtl' : 'ltr'}
            lang={currentLanguage}
            className="min-h-screen bg-slate-50 dark:bg-[#0f1115] font-display flex overflow-hidden text-slate-900 dark:text-slate-100"
        >
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 ltr:left-0 rtl:right-0 z-50 w-64 bg-white dark:bg-[#161b22] border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:relative`}>
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-[var(--color-primary)] text-white p-2 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined font-bold">auto_awesome</span>
                        </div>
                        <div>
                            <h2 className="font-black text-lg leading-tight tracking-tight text-slate-900 dark:text-white">AI CV Builder</h2>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-primary)]">{t('admin_portal')}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${isActive
                                    ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/20'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'}`}
                            >
                                <span className={`material-symbols-outlined text-xl ${isActive ? 'filled-icon' : ''}`} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <Link to="/" className="flex items-center justify-center gap-2 w-full py-3 mb-4 rounded-xl font-bold text-sm bg-blue-50 text-[var(--color-primary)] dark:bg-[var(--color-primary)]/10 dark:text-[var(--color-primary)] hover:bg-blue-100 dark:hover:bg-[var(--color-primary)]/20 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        {t('admin_view_live_site')}
                    </Link>
                    <div className="flex items-center gap-3 px-2">
                        <div className="size-10 rounded-full bg-slate-200 border border-slate-300 dark:border-slate-700 overflow-hidden text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">
                            AD
                        </div>
                        <div className="flex-1 truncate">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{t('admin_user_name')}</p>
                            <p className="text-[10px] text-slate-500 truncate">admin@aicv.com</p>
                        </div>
                        <button className="text-slate-400 hover:text-[var(--color-primary)] transition-colors"><span className="material-symbols-outlined">logout</span></button>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Topbar */}
                <header className="flex-shrink-0 bg-white dark:bg-background-dark/50 lg:bg-transparent border-b border-slate-200 dark:border-slate-800 lg:border-transparent p-4 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="hidden sm:block">
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{headerContext.title}</h1>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{headerContext.desc}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64 max-w-sm">
                            <span className="material-symbols-outlined absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                            <input
                                type="text"
                                placeholder={t('admin_search_ph')}
                                className="w-full bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-full py-2.5 ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm font-medium dark:text-white"
                            />
                        </div>
                        <button
                            onClick={handleLanguageToggle}
                            className="size-10 rounded-full bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all shrink-0 shadow-sm font-bold text-sm"
                            aria-label={t('admin_toggle_language')}
                            title={t('admin_toggle_language')}
                        >
                            {isArabic ? 'EN' : 'AR'}
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="hidden sm:block lg:hidden px-4 pb-2">
                    <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{headerContext.title}</h1>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{headerContext.desc}</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 lg:p-8 pt-0 lg:pt-0 pb-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
