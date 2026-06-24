import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AdminSubscriptions() {
    const { t } = useTranslation();
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('admin_sub_title')}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('admin_sub_desc')}</p>
                </div>
                <button className="bg-[var(--color-primary)] hover:brightness-110 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-2 text-sm justify-center">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    {t('admin_sub_create_plan')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: t('admin_sub_mrr'), value: '$12,450', change: '+15.3%', trend: 'up', icon: 'payments' },
                    { label: t('admin_sub_active_subs'), value: '1,248', change: '+5.2%', trend: 'up', icon: 'group' },
                    { label: t('admin_sub_churn_rate'), value: '2.4%', change: '-0.5%', trend: 'down', icon: 'person_remove' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#161b22] px-6 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
                        <div className="size-12 rounded-full bg-slate-50 dark:bg-slate-800/50 text-[var(--color-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">{stat.icon}</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-2">
                                {stat.value} 
                                <span className={`text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-emerald-500'}`}>{stat.change}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('admin_sub_recent_txn')}</h3>
                    <button className="text-sm font-bold text-[var(--color-primary)] hover:brightness-110 transition-colors">{t('admin_sub_view_all')}</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead className="bg-slate-50 dark:bg-[#0f1115] border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('admin_sub_th_txn_id')}</th>
                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('admin_sub_th_user')}</th>
                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('admin_sub_th_amount')}</th>
                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('admin_sub_th_date')}</th>
                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('admin_sub_th_status')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {[
                                { id: 'TXN-98234', user: 'alex.doe@example.com', amount: '$15.00', date: 'Today, 10:42 AM', status: 'Success' },
                                { id: 'TXN-98233', user: 'sarah.j@design.co', amount: '$15.00', date: 'Yesterday, 04:15 PM', status: 'Success' },
                                { id: 'TXN-98232', user: 'mike.ross@pearson.com', amount: '$15.00', date: 'Yesterday, 02:30 PM', status: 'Failed' },
                                { id: 'TXN-98231', user: 'harvey@law.corp', amount: '$15.00', date: 'Oct 12, 11:20 AM', status: 'Success' },
                            ].map((txn) => (
                                <tr key={txn.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-700 dark:text-slate-300">{txn.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{txn.user}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">{txn.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{txn.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                                            txn.status === 'Success' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                                        }`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
