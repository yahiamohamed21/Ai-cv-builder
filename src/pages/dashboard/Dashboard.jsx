import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/ui/Logo/Logo';
import Swal from 'sweetalert2';

export default function Dashboard() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { isSidebarOpen, setIsSidebarOpen } = useOutletContext();

    const [cvs, setCvs] = useState(() => {
        try {
            const initialKey = user ? `saved_cvs_${user.uid}` : 'saved_cvs_guest';
            const savedCvsStr = localStorage.getItem(initialKey);
            if (savedCvsStr) {
                return JSON.parse(savedCvsStr);
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    });

    const [applications, setApplications] = useState(() => {
        try {
            const initialKey = user ? `applications_${user.uid}` : 'applications_guest';
            const savedAppsStr = localStorage.getItem(initialKey);
            if (savedAppsStr) {
                return JSON.parse(savedAppsStr);
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    });

    // Synchronize states when user logs in/out or changes
    useEffect(() => {
        const userCvsKey = user ? `saved_cvs_${user.uid}` : 'saved_cvs_guest';
        const userAppsKey = user ? `applications_${user.uid}` : 'applications_guest';

        try {
            const savedCvsStr = localStorage.getItem(userCvsKey);
            setCvs(savedCvsStr ? JSON.parse(savedCvsStr) : []);
        } catch (e) {
            setCvs([]);
        }

        try {
            const savedAppsStr = localStorage.getItem(userAppsKey);
            setApplications(savedAppsStr ? JSON.parse(savedAppsStr) : []);
        } catch (e) {
            setApplications([]);
        }
    }, [user]);

    const handleDeleteCv = (id, title) => {
        Swal.fire({
            title: t('dashboard_card_delete_confirm_title') || 'Are you sure?',
            text: `${t('dashboard_card_delete_confirm_text') || 'You will delete'} "${title}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: t('dashboard_card_delete_confirm_btn') || 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updated = cvs.filter(c => c.id !== id);
                setCvs(updated);
                const userCvsKey = user ? `saved_cvs_${user.uid}` : 'saved_cvs_guest';
                localStorage.setItem(userCvsKey, JSON.stringify(updated));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your CV has been deleted.',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    };

    const [isAddingApp, setIsAddingApp] = useState(false);
    const [editingAppId, setEditingAppId] = useState(null);
    const [newApp, setNewApp] = useState({ company: '', position: '', date: '', status: 'Submitted', resumeUsed: '' });

    const handleOpenAddForm = () => {
        setIsAddingApp(!isAddingApp);
        setEditingAppId(null);
        setNewApp({ company: '', position: '', date: '', status: 'Submitted', resumeUsed: '' });
    };

    const handleEditApplication = (app) => {
        setIsAddingApp(true);
        setEditingAppId(app.id);
        setNewApp(app);
        // Scroll to the form
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const handleSaveApplication = (e) => {
        e.preventDefault();
        if (!newApp.company || !newApp.position) return;

        const userAppsKey = user ? `applications_${user.uid}` : 'applications_guest';
        let updated;

        if (editingAppId) {
            // Update existing
            updated = applications.map(app => app.id === editingAppId ? { ...newApp } : app);
        } else {
            // Add new
            const app = {
                ...newApp,
                id: Date.now(),
                date: newApp.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
            };
            updated = [app, ...applications];
        }

        setApplications(updated);
        localStorage.setItem(userAppsKey, JSON.stringify(updated));

        setIsAddingApp(false);
        setEditingAppId(null);
        setNewApp({ company: '', position: '', date: '', status: 'Submitted', resumeUsed: '' });
    };

    const handleDeleteApplication = (id) => {
        const updated = applications.filter(app => app.id !== id);
        setApplications(updated);
        const userAppsKey = user ? `applications_${user.uid}` : 'applications_guest';
        localStorage.setItem(userAppsKey, JSON.stringify(updated));
        if (editingAppId === id) {
            setIsAddingApp(false);
            setEditingAppId(null);
        }
    };

    const avgScore = cvs.length > 0 
        ? Math.round(cvs.reduce((sum, cv) => sum + (cv.score || 0), 0) / cvs.length) 
        : 0;

    const totalViews = cvs.length > 0
        ? cvs.reduce((sum, cv) => sum + (cv.views || 0), 0)
        : 0;

    return (
        <div className="flex flex-col min-h-screen w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <button
                        className="lg:hidden flex size-10 items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div>
                        <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">{t('dashboard_my_resumes')}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">{t('dashboard_my_resumes_desc')}</p>
                    </div>
                </div>
                <Link to="/builder/step1" className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    <span>{t('dashboard_create_cv')}</span>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">description</span>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{t('dashboard_stat_resumes')}</p>
                        <p className="text-slate-900 dark:text-white text-xl font-bold leading-none mt-1">{cvs.length}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">check_circle</span>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{t('dashboard_stat_apps')}</p>
                        <p className="text-slate-900 dark:text-white text-xl font-bold leading-none mt-1">{applications.length}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">trending_up</span>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{t('dashboard_stat_score')}</p>
                        <p className="text-slate-900 dark:text-white text-xl font-bold leading-none mt-1">{avgScore}%</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">visibility</span>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{t('dashboard_stat_views')}</p>
                        <p className="text-slate-900 dark:text-white text-xl font-bold leading-none mt-1">{totalViews}</p>
                    </div>
                </div>
            </div>

                    {/* Resume Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                        {cvs.map((cv) => (
                            <div key={cv.id} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                                <div className="relative w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                                        style={{ backgroundImage: `url(${cv.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFOskc57hwqZBG35rBM3C6nIG8lk5J6bqsmBl3xT9dM7MFvDFAmejSsdI-WH4-Pb7SE8k59oTb4FRUWFEKk6ZjU4FxFLE3k9TVptutnYnRWUX85l8KjvgVNUpXR8JQzURTk8AncZADB4gyG4co4Dsebw232grjX4RWAx2XcnQkrd5yrcMJPpTyRh3zod0ParbhuM5eIrbeWZoUHpr456JlADFOywoFoKG3kdgOLKC9WghbKcqtH4ceNIpTfqpyM-17T6EdeBmIZ-yh'})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <Link to={`/cv/${cv.id}`} className="w-full py-2 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors text-center">{t('dashboard_card_quick_view')}</Link>
                                    </div>
                                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
                                        <span className="material-symbols-outlined text-primary text-[16px] filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">{cv.score || 85}% {t('dashboard_card_ai_score')}</span>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-slate-900 dark:text-white font-bold text-base truncate">{cv.title || 'My Resume'}</h3>
                                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                        </button>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1.5 mb-6">
                                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                        {t('dashboard_card_edited')} {cv.updatedAt || 'Recently'}
                                    </p>
                                    <div className="mt-auto flex items-center gap-2">
                                        <Link to={`/builder/step1?id=${cv.id}`} className="h-8 flex-1 flex items-center justify-center gap-1 bg-primary/15 dark:bg-primary/20 text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5">
                                            <span className="material-symbols-outlined text-[16px] align-middle mr-1 ltr:mr-1 rtl:ml-1">edit</span>
                                            <span>{t('dashboard_card_edit')}</span>
                                        </Link>
                                        <Link to={`/cv/${cv.id}`} className="h-8 flex-1 flex items-center justify-center gap-1 bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5">
                                            <span className="material-symbols-outlined text-[16px] align-middle mr-1 ltr:mr-1 rtl:ml-1">download</span>
                                            <span>{t('dashboard_card_pdf')}</span>
                                        </Link>
                                        <button onClick={() => handleDeleteCv(cv.id, cv.title)} className="h-8 w-8 shrink-0 flex items-center justify-center bg-rose-500/15 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5" title={t('dashboard_card_delete')}>
                                            <span className="material-symbols-outlined text-[16px] align-middle">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Application Tracker */}
                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold">{t('dashboard_app_tracker')}</h2>
                            <button
                                onClick={handleOpenAddForm}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">{isAddingApp ? 'close' : 'add'}</span>
                                {isAddingApp ? t('dashboard_app_cancel') : t('dashboard_app_add')}
                            </button>
                        </div>

                        {isAddingApp && (
                            <form onSubmit={handleSaveApplication} className="mb-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-4 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <div className="flex flex-col gap-1.5 lg:col-span-1">
                                        <label className="text-xs font-bold text-slate-500">{t('dashboard_app_company_label')}</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder={t('dashboard_app_company_placeholder')}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                            value={newApp.company}
                                            onChange={e => setNewApp({ ...newApp, company: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5 lg:col-span-1">
                                        <label className="text-xs font-bold text-slate-500">{t('dashboard_app_position_label')}</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder={t('dashboard_app_position_placeholder')}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                            value={newApp.position}
                                            onChange={e => setNewApp({ ...newApp, position: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5 lg:col-span-1">
                                        <label className="text-xs font-bold text-slate-500">{t('dashboard_app_status_label')}</label>
                                        <select
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:bg-slate-900"
                                            value={newApp.status}
                                            onChange={e => setNewApp({ ...newApp, status: e.target.value })}
                                        >
                                            <option value="Preparing" className="dark:bg-slate-900">{t('dashboard_app_status_preparing')}</option>
                                            <option value="Submitted" className="dark:bg-slate-900">{t('dashboard_app_status_submitted')}</option>
                                            <option value="Interviewing" className="dark:bg-slate-900">{t('dashboard_app_status_interviewing')}</option>
                                            <option value="Offer" className="dark:bg-slate-900">{t('dashboard_app_status_offer')}</option>
                                            <option value="Rejected" className="dark:bg-slate-900">{t('dashboard_app_status_rejected')}</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5 lg:col-span-1">
                                        <label className="text-xs font-bold text-slate-500">{t('dashboard_app_resume_label')}</label>
                                        <input
                                            type="text"
                                            placeholder={t('dashboard_app_resume_placeholder')}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                            value={newApp.resumeUsed}
                                            onChange={e => setNewApp({ ...newApp, resumeUsed: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex items-end lg:col-span-1">
                                        <button type="submit" className="w-full py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-md hover:bg-primary/90 transition-colors">
                                            {editingAppId ? t('dashboard_app_update_btn') : t('dashboard_app_save_btn')}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden overflow-x-auto">
                            <table className="w-full text-left min-w-[750px]">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('dashboard_table_company')}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('dashboard_table_position')}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('dashboard_table_date')}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('dashboard_table_status')}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase max-w-[150px]">{t('dashboard_table_resume')}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">{t('dashboard_table_actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {applications.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                                                {t('dashboard_table_empty')}
                                            </td>
                                        </tr>
                                    ) : (
                                        applications.map((app) => (
                                            <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                                            <span className="material-symbols-outlined text-[18px]">business</span>
                                                        </div>
                                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{app.company}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{app.position}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-500">{app.date}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase
                                                        ${app.status === 'Interviewing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                            app.status === 'Offer' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                                app.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                                    app.status === 'Preparing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                                                        'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
                                                    >
                                                        {t('dashboard_app_status_' + app.status.toLowerCase())}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs text-slate-500 italic block truncate max-w-[150px]" title={app.resumeUsed}>{app.resumeUsed || '-'}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleEditApplication(app)}
                                                            className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800 transition-colors"
                                                            title={t('dashboard_app_edit_title')}
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteApplication(app.id)}
                                                            className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-colors"
                                                            title={t('dashboard_app_delete_title')}
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
        </div>
    );
}