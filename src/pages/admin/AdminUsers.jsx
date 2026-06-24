import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
<<<<<<< HEAD
import Swal from 'sweetalert2';

export default function AdminUsers() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { t, i18n } = useTranslation();
    const isAr = (i18n.resolvedLanguage || i18n.language) === 'ar';

    const [usersList, setUsersList] = useState([
=======

export default function AdminUsers() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { t } = useTranslation();

    const users = [
>>>>>>> 71931db3a21ba6117839872359ac71b317899036
        { id: 1, name: 'Johnathan Doe', email: 'johnathan.doe@example.com', plan: 'PRO', joined: 'Oct 12, 2023', status: 'Active', avatar: 'JD' },
        { id: 2, name: 'Alice Spencer', email: 'alice.s@design.co', plan: 'FREE', joined: 'Oct 15, 2023', status: 'Active', avatar: 'AS' },
        { id: 3, name: 'Mike Ross', email: 'mike.ross@pearson.com', plan: 'PRO', joined: 'Sep 20, 2023', status: 'Suspended', avatar: 'MR' },
        { id: 4, name: 'Harvey Specter', email: 'harvey@law.corp', plan: 'PRO', joined: 'Aug 05, 2023', status: 'Active', avatar: 'HS' },
<<<<<<< HEAD
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [planFilter, setPlanFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [editingUser, setEditingUser] = useState(null);

    const filteredUsers = usersList.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              user.email.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesPlan = planFilter === 'All' || 
                            (planFilter === 'PRO' && user.plan === 'PRO') ||
                            (planFilter === 'FREE' && user.plan === 'FREE');
                            
        const matchesStatus = statusFilter === 'All' || 
                              (statusFilter === 'Active' && user.status === 'Active') ||
                              (statusFilter === 'Suspended' && user.status === 'Suspended');
                              
        return matchesSearch && matchesPlan && matchesStatus;
    });

    const users = filteredUsers; // Fallback mapping

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: isAr ? 'هل أنت متأكد؟' : 'Are you sure?',
            text: isAr ? 'لن تتمكن من التراجع عن حذف هذا المستخدم!' : 'You will not be able to recover this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: isAr ? 'نعم، احذفه!' : 'Yes, delete it!',
            cancelButtonText: isAr ? 'إلغاء' : 'Cancel',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#475569'
        }).then((result) => {
            if (result.isConfirmed) {
                setUsersList(prev => prev.filter(u => u.id !== id));
                Swal.fire({
                    title: isAr ? 'تم الحذف!' : 'Deleted!',
                    text: isAr ? 'تم حذف المستخدم بنجاح.' : 'User has been deleted successfully.',
                    icon: 'success',
                    confirmButtonColor: 'var(--color-primary)'
                });
            }
        });
    };

    const handleToggleStatus = (id) => {
        setUsersList(prev => prev.map(u => {
            if (u.id === id) {
                const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
                return { ...u, status: newStatus };
            }
            return u;
        }));
        
        const targetUser = usersList.find(u => u.id === id);
        const nextStatus = targetUser.status === 'Active' ? (isAr ? 'معطل' : 'Suspended') : (isAr ? 'نشط' : 'Active');
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: isAr ? `حالة المستخدم الآن: ${nextStatus}` : `User status is now: ${nextStatus}`,
            showConfirmButton: false,
            timer: 2000
        });
    };
=======
    ];
>>>>>>> 71931db3a21ba6117839872359ac71b317899036

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
<<<<<<< HEAD
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
=======
>>>>>>> 71931db3a21ba6117839872359ac71b317899036
                        placeholder={t('admin_users_search_ph')}
                        className="w-full bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] shadow-sm text-slate-900 dark:text-white"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm justify-center flex-1 sm:flex-none">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        {t('admin_users_export')}
                    </button>
<<<<<<< HEAD
                    <button 
                        onClick={() => {
                            Swal.fire({
                                title: isAr ? 'دعوة مستخدم جديد' : 'Invite New User',
                                input: 'email',
                                inputLabel: isAr ? 'البريد الإلكتروني للمستخدم' : 'User Email Address',
                                inputPlaceholder: 'user@example.com',
                                showCancelButton: true,
                                confirmButtonText: isAr ? 'إرسال الدعوة' : 'Send Invite',
                                cancelButtonText: isAr ? 'إلغاء' : 'Cancel',
                                confirmButtonColor: 'var(--color-primary)',
                                inputValidator: (value) => {
                                    if (!value) {
                                        return isAr ? 'يرجى إدخال بريد إلكتروني صالح!' : 'Please enter a valid email!';
                                    }
                                }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: isAr ? 'تم إرسال الدعوة!' : 'Invitation Sent!',
                                        text: isAr ? `تم إرسال رابط التسجيل إلى ${result.value}` : `Registration link sent successfully to ${result.value}`,
                                        confirmButtonColor: 'var(--color-primary)'
                                    });
                                }
                            });
                        }}
                        className="bg-[var(--color-primary)] hover:brightness-110 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-2 text-sm justify-center flex-1 sm:flex-none"
                    >
=======
                    <button className="bg-[var(--color-primary)] hover:brightness-110 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-2 text-sm justify-center flex-1 sm:flex-none">
>>>>>>> 71931db3a21ba6117839872359ac71b317899036
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
<<<<<<< HEAD
                        <select 
                            value={planFilter}
                            onChange={e => setPlanFilter(e.target.value)}
                            className="appearance-none bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] shadow-sm relative pr-8"
                        >
                            <option value="All">{t('admin_users_all_plans')}</option>
                            <option value="PRO">{t('admin_users_pro_only')}</option>
                            <option value="FREE">{t('admin_users_free_only')}</option>
                        </select>
                        <select 
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="appearance-none bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] shadow-sm"
                        >
                            <option value="All">{t('admin_users_all_status')}</option>
                            <option value="Active">{t('admin_users_active_status')}</option>
                            <option value="Suspended">{t('admin_users_suspended_status')}</option>
                        </select>
                        <button 
                            onClick={() => { setSearchQuery(''); setPlanFilter('All'); setStatusFilter('All'); }}
                            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors ml-1 bg-white dark:bg-[#161b22] rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm"
                        >
=======
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
>>>>>>> 71931db3a21ba6117839872359ac71b317899036
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
<<<<<<< HEAD
                                            <button 
                                                onClick={() => setEditingUser(user)}
                                                className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all" 
                                                title="Edit User"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            {user.status === 'Active' ? (
                                                <button 
                                                    onClick={() => handleToggleStatus(user.id)}
                                                    className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-all" 
                                                    title="Suspend User"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">block</span>
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => handleToggleStatus(user.id)}
                                                    className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-all" 
                                                    title="Activate User"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all" 
                                                title="Delete User"
                                            >
=======
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
>>>>>>> 71931db3a21ba6117839872359ac71b317899036
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
<<<<<<< HEAD

            {/* Edit User Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setEditingUser(null)}></div>
                    {/* Modal Card */}
                    <div className="relative w-full max-w-md bg-white dark:bg-[#161b22] border border-slate-205 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 text-slate-900 dark:text-white">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">{isAr ? 'تعديل بيانات المستخدم' : 'Edit User Details'}</h3>
                            <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setUsersList(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
                            setEditingUser(null);
                            Swal.fire({
                                icon: 'success',
                                title: isAr ? 'تم التحديث!' : 'Updated!',
                                text: isAr ? 'تم حفظ التعديلات بنجاح.' : 'User details updated successfully.',
                                confirmButtonColor: 'var(--color-primary)'
                            });
                        }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5">{isAr ? 'الاسم بالكامل' : 'Full Name'}</label>
                                <input 
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
                                <input 
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1.5">{isAr ? 'الباقة' : 'Plan'}</label>
                                    <select 
                                        value={editingUser.plan}
                                        onChange={(e) => setEditingUser({ ...editingUser, plan: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    >
                                        <option value="PRO">PRO</option>
                                        <option value="FREE">FREE</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1.5">{isAr ? 'الحالة' : 'Status'}</label>
                                    <select 
                                        value={editingUser.status}
                                        onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingUser(null)} 
                                    className="px-4 py-2 border border-slate-200 dark:border-slate-750 text-slate-500 dark:text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    {isAr ? 'إلغاء' : 'Cancel'}
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:brightness-110 shadow-md shadow-primary/20 transition-all"
                                >
                                    {isAr ? 'حفظ' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
=======
>>>>>>> 71931db3a21ba6117839872359ac71b317899036
        </div>
    );
}
