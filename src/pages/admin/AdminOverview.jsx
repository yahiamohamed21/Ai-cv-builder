import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AdminOverview() {
    const { t } = useTranslation();
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#161b22] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="size-10 rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-500/10 flex items-center justify-center">
                            <span className="material-symbols-outlined">group</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> +5.2%
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t('admin_stat_users_title')}</p>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">12,450</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#161b22] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="size-10 rounded-xl bg-purple-50 text-purple-500 dark:bg-purple-500/10 flex items-center justify-center">
                            <span className="material-symbols-outlined">description</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> +12.4%
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t('admin_stat_resumes_title')}</p>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">45,200</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#161b22] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="size-10 rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10 flex items-center justify-center">
                            <span className="material-symbols-outlined">stars</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> +3.1%
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t('admin_stat_subs_title')}</p>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">1,200</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#161b22] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="size-10 rounded-xl bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 flex items-center justify-center">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> +8.7%
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t('admin_stat_rev_title')}</p>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">$24,500</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Area */}
                <div className="lg:col-span-2 bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">{t('admin_chart_title')}</h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">{t('admin_chart_desc')}</p>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 cursor-pointer">
                            {t('admin_last_30_days')} <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </div>
                    </div>
                    
                    {/* Placeholder for Chart */}
                    <div className="h-64 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f1115] relative flex flex-col justify-end overflow-hidden pb-4 px-4 pt-10">
                        {/* Mock Chart Gradient Background */}
                        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[var(--color-primary)]/20 to-transparent"></div>
                        {/* Mock Chart SVG Path */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <path d="M0,80 Q20,70 30,80 T60,30 T85,90 T100,50 L100,100 L0,100 Z" fill="url(#grad)" opacity="0.3"></path>
                            <path d="M0,80 Q20,70 30,80 T60,30 T85,90 T100,50" fill="none" stroke="var(--color-primary)" strokeWidth="2"></path>
                            <defs>
                                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="1" />
                                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                        
                        <div className="relative z-10 flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider border-t border-slate-200 dark:border-slate-800 pt-2 mt-auto">
                            <span>{t('admin_week_1')}</span>
                            <span>{t('admin_week_2')}</span>
                            <span>{t('admin_week_3')}</span>
                            <span>{t('admin_week_4')}</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight mb-6">{t('admin_recent_activity')}</h3>
                    
                    <div className="space-y-6 flex-1">
                        <div className="flex gap-4 items-start relative before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-slate-100 dark:before:bg-slate-800 last:before:hidden">
                            <img src="https://i.pravatar.cc/150?u=1" className="size-10 rounded-full border-2 border-slate-100 dark:border-slate-800 relative z-10 bg-white" alt="User" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-bold text-slate-900 dark:text-white">Sarah Johnson</span> {t('admin_activity_created')}</p>
                                <p className="text-xs text-slate-400 mt-0.5">2 {t('admin_activity_min_ago')}</p>
                            </div>
                            <div className="size-6 rounded-full bg-blue-50 text-blue-500 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[14px]">description</span>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start relative before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-slate-100 dark:before:bg-slate-800 last:before:hidden">
                            <img src="https://i.pravatar.cc/150?u=2" className="size-10 rounded-full border-2 border-slate-100 dark:border-slate-800 relative z-10 bg-white" alt="User" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-bold text-slate-900 dark:text-white">Michael Chen</span> {t('admin_activity_upgraded')}</p>
                                <p className="text-xs text-slate-400 mt-0.5">15 {t('admin_activity_min_ago')}</p>
                            </div>
                            <div className="size-6 rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start relative before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-slate-100 dark:before:bg-slate-800 last:before:hidden">
                            <img src="https://i.pravatar.cc/150?u=3" className="size-10 rounded-full border-2 border-slate-100 dark:border-slate-800 relative z-10 bg-white" alt="User" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-bold text-slate-900 dark:text-white">Emily Davis</span> {t('admin_activity_signed')}</p>
                                <p className="text-xs text-slate-400 mt-0.5">45 {t('admin_activity_min_ago')}</p>
                            </div>
                            <div className="size-6 rounded-full bg-purple-50 text-purple-500 dark:bg-purple-500/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[14px]">person_add</span>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start relative before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-slate-100 dark:before:bg-slate-800 last:before:hidden">
                            <img src="https://i.pravatar.cc/150?u=4" className="size-10 rounded-full border-2 border-slate-100 dark:border-slate-800 relative z-10 bg-white" alt="User" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-bold text-slate-900 dark:text-white">Robert Wilson</span> {t('admin_activity_exported')}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{t('admin_activity_hour_ago')}</p>
                            </div>
                            <div className="size-6 rounded-full bg-orange-50 text-orange-500 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[14px]">download</span>
                            </div>
                        </div>
                    </div>
                    
                    <button className="w-full py-2.5 mt-4 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-xl transition-colors">
                        {t('admin_view_all_activity')}
                    </button>
                </div>
            </div>

            {/* Top Templates Table */}
            <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">{t('admin_top_templates')}</h3>
                    <div className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-xs font-bold text-blue-600 dark:text-blue-400">
                        {t('admin_last_7_days')}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-[#0f1115] border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('admin_th_template_name')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('admin_th_category')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('admin_th_usage')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('admin_th_success')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">{t('admin_th_status')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Executive Professional</td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Corporate</td>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">12,450</td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">98.2%</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">{t('admin_status_trending')}</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Creative Tech</td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Startup</td>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">8,920</td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">94.5%</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">{t('admin_status_active')}</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Minimalist Clean</td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">General</td>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">7,540</td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">96.8%</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">{t('admin_status_active')}</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Modern Gradient</td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Design</td>
                                <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">2,100</td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">91.0%</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">{t('admin_status_new')}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
