import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AdminUsers() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { t } = useTranslation();

    const users = [
        { id: 1, name: 'Johnathan Doe', email: 'johnathan.doe@example.com', plan: 'PRO', joined: 'Oct 12, 2023', status: 'Active', avatar: 'JD' },
        { id: 2, name: 'Alice Spencer', email: 'alice.s@design.co', plan: 'FREE', joined: 'Oct 15, 2023', status: 'Active', avatar: 'AS' },
        { id: 3, name: 'Mike Ross', email: 'mike.ross@pearson.com', plan: 'PRO', joined: 'Sep 20, 2023', status: 'Suspended', avatar: 'MR' },
        { id: 4, name: 'Harvey Specter', email: 'harvey@law.corp', plan: 'PRO', joined: 'Aug 05, 2023', status: 'Active', avatar: 'HS' },
    ];

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(users.map(u => u.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const toggleSelectUser = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter(userId => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    return (
        <div className="space-y-6">
            {/* Topbar Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 relative max-w-md">
                    <span className="material-symbols-outlined absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                    <input 
                        type="text"
                        placeholder={t('admin_users_search_ph')}
                        className="w-full bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] shadow-sm text-slate-900 dark:text-white"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm justify-center flex-1 sm:flex-none">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        {t('admin_users_export')}
                    </button>
                    <button className="bg-[var(--color-primary)] hover:brightness-110 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-2 text-sm justify-center flex-1 sm:flex-none">
                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                        {t('admin_users_invite')}
                    </button>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                {/* Filters */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 dark:bg-[#0f1115]">
                    <div className="text-sm font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span> {t('admin_users_filters_active')}
                    </div>
                    <div className="flex items-center gap-2 lg:gap-4 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
                        <select className="appearance-none bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] shadow-sm relative pr-8">
                            <option>{t('admin_users_all_plans')}</option>
                            <option>{t('admin_users_pro_only')}</option>
                            <option>{t('admin_users_free_only')}</option>
                        </select>
                        <select className="appearance-none bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] shadow-sm">
                            <option>{t('admin_users_all_status')}</option>
                            <option>{t('admin_users_active_status')}</option>
                            <option>{t('admin_users_suspended_status')}</option>
                        </select>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors ml-1 bg-white dark:bg-[#161b22] rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">filter_alt_off</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b22]">
                            <tr>
                                <th className="px-6 py-4 w-12 text-center">
                                    <input 
                                        type="checkbox" 
                                        onChange={toggleSelectAll}
                                        checked={selectedUsers.length === users.length && users.length > 0}
                                        className="rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] size-4 cursor-pointer"
                                    />
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">{t('admin_users_th_name')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">{t('admin_users_th_email')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">{t('admin_users_th_plan')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">{t('admin_users_th_joined')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">{t('admin_users_th_status')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right whitespace-nowrap">{t('admin_users_th_actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                                    <td className="px-6 py-4 text-center">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => toggleSelectUser(user.id)}
                                            className="rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] size-4 cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-[var(--color-primary)]/20">
                                                {user.avatar}
                                            </div>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[var(--color-primary)] transition-colors cursor-pointer">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{user.email}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-widest ${
                                            user.plan === 'PRO' ? 'bg-[var(--color-primary)] text-white shadow-sm shadow-[var(--color-primary)]/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                                        }`}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{user.joined}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`size-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                            <span className={`text-xs font-bold ${user.status === 'Active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all" title="Edit User">
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            {user.status === 'Active' ? (
                                                <button className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-all" title="Suspend User">
                                                    <span className="material-symbols-outlined text-[18px]">block</span>
                                                </button>
                                            ) : (
                                                <button className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-all" title="Activate User">
                                                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                </button>
                                            )}
                                            <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all" title="Delete User">
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0f1115]/50">
                    <p className="text-xs font-bold text-slate-400">{t('admin_users_showing')} <span className="text-slate-700 dark:text-slate-200">1-10</span> {t('admin_users_of')} <span className="text-slate-700 dark:text-slate-200">1,248</span> {t('admin_users_users')}</p>
                    <div className="flex items-center gap-1">
                        <button className="size-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-not-allowed opacity-50"><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
                        <button className="size-7 rounded-lg flex items-center justify-center text-white bg-[var(--color-primary)] font-bold text-xs shadow-sm shadow-[var(--color-primary)]/20">1</button>
                        <button className="size-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">2</button>
                        <button className="size-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">3</button>
                        <span className="text-slate-400 text-xs px-1">...</span>
                        <button className="size-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">125</button>
                        <button className="size-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
                    </div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#161b22] px-6 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 group">
                    <div className="size-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">trending_up</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('admin_users_growth_rate')}</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-1">
                            +12.5% <span className="text-xs font-bold text-slate-400">{t('admin_users_this_month')}</span>
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#161b22] px-6 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 group">
                    <div className="size-12 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">workspace_premium</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('admin_users_active_pro')}</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-1">
                            428 <span className="text-xs font-bold text-slate-400">{t('admin_users_out_of')}</span>
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#161b22] px-6 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 group">
                    <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">confirmation_number</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('admin_users_open_tickets')}</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-1">
                            14 <span className="text-xs font-bold text-slate-400">{t('admin_users_require_attention')}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
