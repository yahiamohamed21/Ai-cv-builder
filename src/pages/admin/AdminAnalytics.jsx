import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AdminAnalytics() {
    const { t } = useTranslation();
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('admin_an_title')}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('admin_an_desc')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-4 text-sm font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] shadow-sm">
                        <option>{t('admin_an_last_7')}</option>
                        <option>{t('admin_an_last_30')}</option>
                        <option>{t('admin_an_this_year')}</option>
                        <option>{t('admin_an_all_time')}</option>
                    </select>
                    <button className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2 px-4 rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm justify-center">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        {t('admin_an_export')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: t('admin_an_total_visits'), value: '124.5k', change: '+14.2%', trend: 'up', icon: 'visibility' },
                    { label: t('admin_an_cvs_exported'), value: '45.2k', change: '+8.1%', trend: 'up', icon: 'download' },
                    { label: t('admin_an_avg_session'), value: '4m 12s', change: '-2.4%', trend: 'down', icon: 'timer' },
                    { label: t('admin_an_bounce_rate'), value: '32.1%', change: '-5.2%', trend: 'down', icon: 'bounce_right' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="size-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[var(--color-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">{stat.icon}</span>
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10'}`}>
                                {stat.trend === 'up' ? <span className="material-symbols-outlined text-[14px]">trending_up</span> : <span className="material-symbols-outlined text-[14px]">trending_down</span>}
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t('admin_an_traffic_src')}</h3>
                    <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-[#0f1115] rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">pie_chart</span>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">{t('admin_an_traffic_ph')}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t('admin_an_retention')}</h3>
                    <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-[#0f1115] rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">show_chart</span>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">{t('admin_an_retention_ph')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
