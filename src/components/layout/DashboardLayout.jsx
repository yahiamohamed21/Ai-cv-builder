import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';

export default function DashboardLayout() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const isActive = (path) => location.pathname === path;

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Standard Unified Navbar */}
            <Navbar />

            <div className="layout-container flex h-full grow flex-col lg:flex-row relative">
                {/* Sidebar Navigation */}
                <aside
                    className={`border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-40 lg:overflow-visible ${
                        isSidebarOpen ? 'w-full lg:w-64 translate-x-0' : 'w-0 lg:w-[84px] -translate-x-full lg:translate-x-0 max-lg:overflow-hidden px-2'
                    } absolute lg:relative h-full flex flex-col group/sidebar shadow-sm lg:shadow-none`}
                >
                    {/* Toggle Button Inside Sidebar (Visible on Desktop) */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`hidden lg:flex absolute -right-3.5 top-8 size-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:scale-110 hover:shadow-md transition-all z-50 cursor-pointer ${
                            !isSidebarOpen && 'opacity-0 group-hover/sidebar:opacity-100'
                        }`}
                        title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`}>
                            chevron_left
                        </span>
                    </button>

                    <div className="flex flex-col gap-2 h-full">
                        {/* My Resumes Link */}
                        <Link
                            to="/dashboard"
                            className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0 mx-2'} py-3 rounded-xl transition-all duration-300 group ${
                                isActive('/dashboard')
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                            title={t('dashboard_my_resumes')}
                        >
                            <span className={`material-symbols-outlined shrink-0 ${isActive('/dashboard') ? 'filled-icon' : ''}`} style={isActive('/dashboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>description</span>
                            {isSidebarOpen && <p className="text-sm whitespace-nowrap overflow-hidden animate-in fade-in duration-300">{t('dashboard_my_resumes')}</p>}
                        </Link>

                        {/* Templates Link */}
                        <Link
                            to="/templates"
                            className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0 mx-2'} py-3 rounded-xl transition-all duration-300 group ${
                                isActive('/templates')
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                            title={t('dashboard_templates')}
                        >
                            <span className={`material-symbols-outlined shrink-0 ${isActive('/templates') ? 'filled-icon' : ''}`} style={isActive('/templates') ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard_customize</span>
                            {isSidebarOpen && <p className="text-sm whitespace-nowrap overflow-hidden animate-in fade-in duration-300">{t('dashboard_templates')}</p>}
                        </Link>

                        {/* Settings Link */}
                        <Link
                            to="/settings"
                            className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0 mx-2'} py-3 rounded-xl transition-all duration-300 group ${
                                isActive('/settings')
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                            title={t('settings_title') || 'Settings'}
                        >
                            <span className={`material-symbols-outlined shrink-0 ${isActive('/settings') ? 'filled-icon' : ''}`} style={isActive('/settings') ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
                            {isSidebarOpen && <p className="text-sm whitespace-nowrap overflow-hidden animate-in fade-in duration-300">{t('settings_title') || 'Settings'}</p>}
                        </Link>

                        {/* Pro Upgrade Card */}
                        {isSidebarOpen ? (
                            <div className="mt-auto rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-5 text-white shadow-lg shadow-primary/20">
                                <p className="text-sm font-bold mb-2">{t('dashboard_upgrade_title')}</p>
                                <p className="text-xs opacity-80 mb-4">{t('dashboard_upgrade_desc')}</p>
                                <button className="w-full bg-white text-primary text-xs font-bold py-2 rounded-lg hover:bg-opacity-90 transition-all">
                                    {t('dashboard_upgrade_btn')}
                                </button>
                            </div>
                        ) : (
                            <div className="mt-auto flex justify-center pb-4">
                                <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white shadow-lg shadow-primary/20 group cursor-pointer" title={t('dashboard_upgrade_title')}>
                                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">workspace_premium</span>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-background-light dark:bg-background-dark">
                    <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
                </main>
            </div>
        </div>
    );
}
