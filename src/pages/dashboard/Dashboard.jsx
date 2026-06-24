import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/ui/Logo/Logo';

export default function Dashboard() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Application Tracker State
    const [applications, setApplications] = useState([
        {
            id: 1,
            company: 'Google',
            position: 'Senior UX Designer',
            date: 'Oct 12, 2024',
            status: 'Interviewing',
            resumeUsed: 'Product Designer CV'
        },
        {
            id: 2,
            company: 'Stripe',
            position: 'Software Engineer',
            date: 'Oct 05, 2024',
            status: 'Submitted',
            resumeUsed: 'Software Engineer 2024'
        }
    ]);
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

        if (editingAppId) {
            // Update existing
            setApplications(applications.map(app => app.id === editingAppId ? { ...newApp } : app));
        } else {
            // Add new
            const app = {
                ...newApp,
                id: Date.now(),
                date: newApp.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
            };
            setApplications([app, ...applications]);
        }

        setIsAddingApp(false);
        setEditingAppId(null);
        setNewApp({ company: '', position: '', date: '', status: 'Submitted', resumeUsed: '' });
    };

    const handleDeleteApplication = (id) => {
        setApplications(applications.filter(app => app.id !== id));
        if (editingAppId === id) {
            setIsAddingApp(false);
            setEditingAppId(null);
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <button
                        className="lg:hidden flex size-10 items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <Logo iconSize={32} textSize="text-lg hidden sm:block" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <Link to="/settings" className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                        </Link>
                    </div>
                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user?.name || 'Alex Johnson'}</p>
                            <p className="text-[10px] text-primary font-medium uppercase tracking-wider">Pro Plan</p>
                        </div>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                            title="User profile avatar"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSgZhBW4oaW0Ub4cgrE7EhcnXer_NfcBrbxMVAzlfr9q5oZNzyosfj2lxlFffyx6_YwpejpPLJ2ZX95PobNWOJ0Klk61EaZ6JfpbzQJBv7ntO16rHfdk5VzDl6PIpWsD-MMrcue7FsvUWAsDoApKpDu-4bI1a9zSqTFsRmp2W_SesdvIqPI_IQJWNSAR42kU5lFw6aUIqkxaxwvZYwVKqSL-BSN8h4R2P0K-fxzQK2-1vQMKJOKsQMFT9URDwqOQHaQsbdxvhu6H3N")' }}
                        ></div>
                    </div>
                </div>
            </header>

            <div className="layout-container flex h-full grow flex-col lg:flex-row relative">
                {/* Sidebar Navigation */}
                <aside
                    className={`border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-40 ${isSidebarOpen ? 'w-full lg:w-64 translate-x-0' : 'w-0 lg:w-[84px] -translate-x-full lg:translate-x-0 overflow-hidden px-2'
                        } absolute lg:relative h-full flex flex-col group/sidebar shadow-sm lg:shadow-none`}
                >
                    {/* Toggle Button Inside Sidebar (Visible on Desktop) */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`hidden lg:flex absolute -right-3.5 top-8 size-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:scale-110 hover:shadow-md transition-all z-50 cursor-pointer ${!isSidebarOpen && 'opacity-0 group-hover/sidebar:opacity-100'
                            }`}
                        title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`}>
                            chevron_left
                        </span>
                    </button>

                    <div className="flex flex-col gap-2 h-full">
                        <div className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0 mx-2'} py-3 rounded-xl bg-primary/10 text-primary transition-all duration-300`}>
                            <span className="material-symbols-outlined filled-icon shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                            {isSidebarOpen && <p className="text-sm font-semibold whitespace-nowrap overflow-hidden animate-in fade-in duration-300">{t('dashboard_my_resumes')}</p>}
                        </div>
                        <Link to="/templates" className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0 mx-2'} py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer group`} title={t('dashboard_templates')}>
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors shrink-0">dashboard_customize</span>
                            {isSidebarOpen && <p className="text-sm font-medium whitespace-nowrap overflow-hidden group-hover:text-primary transition-colors animate-in fade-in duration-300">{t('dashboard_templates')}</p>}
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

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-background-light dark:bg-background-dark">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                        <div>
                            <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">{t('dashboard_my_resumes')}</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">{t('dashboard_my_resumes_desc')}</p>
                        </div>
                        <Link to="/builder" className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
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
                                <p className="text-slate-900 dark:text-white text-xl font-bold leading-none mt-1">3</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{t('dashboard_stat_apps')}</p>
                                <p className="text-slate-900 dark:text-white text-xl font-bold leading-none mt-1">12</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">trending_up</span>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{t('dashboard_stat_score')}</p>
                                <p className="text-slate-900 dark:text-white text-xl font-bold leading-none mt-1">85%</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">visibility</span>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{t('dashboard_stat_views')}</p>
                                <p className="text-slate-900 dark:text-white text-xl font-bold leading-none mt-1">42</p>
                            </div>
                        </div>
                    </div>

                    {/* Resume Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                        {/* Resume Card 1 */}
                        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                            <div className="relative w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBFOskc57hwqZBG35rBM3C6nIG8lk5J6bqsmBl3xT9dM7MFvDFAmejSsdI-WH4-Pb7SE8k59oTb4FRUWFEKk6ZjU4FxFLE3k9TVptutnYnRWUX85l8KjvgVNUpXR8JQzURTk8AncZADB4gyG4co4Dsebw232grjX4RWAx2XcnQkrd5yrcMJPpTyRh3zod0ParbhuM5eIrbeWZoUHpr456JlADFOywoFoKG3kdgOLKC9WghbKcqtH4ceNIpTfqpyM-17T6EdeBmIZ-yh")' }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <button className="w-full py-2 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">{t('dashboard_card_quick_view')}</button>
                                </div>
                                <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-[16px] filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">85% {t('dashboard_card_ai_score')}</span>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-slate-900 dark:text-white font-bold text-base truncate">Software Engineer 2024</h3>
                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                    </button>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1.5 mb-6">
                                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                    {t('dashboard_card_edited')} 2 days ago
                                </p>
                                <div className="mt-auto grid grid-cols-3 gap-2">
                                    <Link to="/builder?id=1" className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors group/btn">
                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                        <span>{t('dashboard_card_edit')}</span>
                                    </Link>
                                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors group/btn">
                                        <span className="material-symbols-outlined text-[16px]">download</span>
                                        <span>{t('dashboard_card_pdf')}</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors group/btn">
                                        <span className="material-symbols-outlined text-[16px]">delete</span>
                                        <span>{t('dashboard_card_delete')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Resume Card 2 */}
                        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                            <div className="relative w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBt6Z6C5DKqm1DGEfoIVoObuEKBMzlU_u-oaoFZv4XpcZXFrfIRawOTCMbfQPwRMENuE3RxGqdIHdXiOZ5S2QawNbCaG_ynY2VNfKEe5CElS1SzGqmEAjh9ch0Jf5fZZkFy0Px2I8VnF_DIFH6_3u9qVPm0qAMrVbFbGerJyeUKMu0Q89DFeA95d9m9wYw5nddiwbjZwv3fu2oqob0epSSFfCr8uc17_i8sT4R1GSJ6krq70NsNIP5CnfKfP5sU3De4mp8vaGiVhkeH")' }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <button className="w-full py-2 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">{t('dashboard_card_quick_view')}</button>
                                </div>
                                <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-[16px] filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">92% {t('dashboard_card_ai_score')}</span>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-slate-900 dark:text-white font-bold text-base truncate">Product Designer CV</h3>
                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                    </button>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1.5 mb-6">
                                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                    {t('dashboard_card_edited')} 1 week ago
                                </p>
                                <div className="mt-auto grid grid-cols-3 gap-2">
                                    <Link to="/builder?id=2" className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors group/btn">
                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                        <span>{t('dashboard_card_edit')}</span>
                                    </Link>
                                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors group/btn">
                                        <span className="material-symbols-outlined text-[16px]">download</span>
                                        <span>{t('dashboard_card_pdf')}</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors group/btn">
                                        <span className="material-symbols-outlined text-[16px]">delete</span>
                                        <span>{t('dashboard_card_delete')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Resume Card 3 */}
                        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                            <div className="relative w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC2k6zW6sZKtn5ECq7-q6vm1dUn_m4Fo_zXtwtW1kq95WDBVC3gDDU7NATjX_L-F_VIzOWw43nDgB13y9SWUQ1Lk0HyVy6m3LsOC6D0ESNWSD-bMjNBEN8eMCjfxtch-G2jhxi9VUypS4TN2zziIPhbDGCSI0fDG_Jfo_OKtw_6sFBXUtJ1qHOnMCNLqQW_yw5lsffYj-zb3kqw6IHKaaTTBVYX48pYrtxqiggOvSDuJLro7QRoZfO6Sj8L3YUwKEOVwjGN_IIszDy-")' }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <button className="w-full py-2 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">{t('dashboard_card_quick_view')}</button>
                                </div>
                                <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-[16px] filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">78% {t('dashboard_card_ai_score')}</span>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-slate-900 dark:text-white font-bold text-base truncate">Marketing Lead</h3>
                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                    </button>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1.5 mb-6">
                                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                    {t('dashboard_card_edited')} 1 month ago
                                </p>
                                <div className="mt-auto grid grid-cols-3 gap-2">
                                    <Link to="/builder?id=3" className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors group/btn">
                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                        <span>{t('dashboard_card_edit')}</span>
                                    </Link>
                                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors group/btn">
                                        <span className="material-symbols-outlined text-[16px]">download</span>
                                        <span>{t('dashboard_card_pdf')}</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors group/btn">
                                        <span className="material-symbols-outlined text-[16px]">delete</span>
                                        <span>{t('dashboard_card_delete')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
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
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
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
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                            value={newApp.position}
                                            onChange={e => setNewApp({ ...newApp, position: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5 lg:col-span-1">
                                        <label className="text-xs font-bold text-slate-500">{t('dashboard_app_status_label')}</label>
                                        <select
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none"
                                            value={newApp.status}
                                            onChange={e => setNewApp({ ...newApp, status: e.target.value })}
                                        >
                                            <option value="Preparing">{t('dashboard_app_status_preparing')}</option>
                                            <option value="Submitted">{t('dashboard_app_status_submitted')}</option>
                                            <option value="Interviewing">{t('dashboard_app_status_interviewing')}</option>
                                            <option value="Offer">{t('dashboard_app_status_offer')}</option>
                                            <option value="Rejected">{t('dashboard_app_status_rejected')}</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5 lg:col-span-1">
                                        <label className="text-xs font-bold text-slate-500">{t('dashboard_app_resume_label')}</label>
                                        <input
                                            type="text"
                                            placeholder={t('dashboard_app_resume_placeholder')}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
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
                </main>
            </div>
        </div>
    );
}