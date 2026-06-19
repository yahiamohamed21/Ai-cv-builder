import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/layout/Navbar';
import Swal from 'sweetalert2';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // mock login logic
        login({ email, name: 'John Doe', id: '123' });
        Swal.fire({
            title: t('login_btn_signin') + ' Successful!',
            text: 'Welcome back!',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            navigate('/dashboard');
        });
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Navbar />
            {/* Main Content Area */}
            <main className="flex-1 flex min-h-screen">
                {/* Left Side: Visual Content */}
                <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#0d101b]">
                    {/* Background Image / Gradient */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2850&auto=format&fit=crop"
                            alt="Background workspace"
                            className="w-full h-full object-cover opacity-80"
                        />
                        {/* Overlay to tint the image to primary/dark */}
                        <div className="absolute inset-0 bg-primary/95 dark:bg-[#080b1a]/95 mix-blend-multiply"></div>
                        {/* Gradient overlay for smooth contrast towards the edges */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 dark:from-[#080b1a]/90 to-transparent"></div>
                    </div>

                    {/* Ambient Glow / Blurs */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-white/20 dark:bg-primary/20 blur-[120px]"></div>
                        <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-white/20 dark:bg-primary/20 blur-[120px]"></div>
                    </div>

                    {/* Foreground Content inside Glass Card */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-center p-8 lg:p-16 xl:p-24">
                        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-10 xl:p-14 rounded-[2.5rem] shadow-2xl space-y-10 group transition-all duration-500 hover:bg-white/15 dark:hover:bg-white/10">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-white/10 text-white text-sm font-bold backdrop-blur-md border border-white/20 w-fit shadow-inner">
                                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                    {t('login_badge')}
                                </div>
                                <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-black text-white leading-[1.15]">
                                    {t('login_title')}
                                </h2>
                                <p className="text-lg xl:text-xl text-blue-50/90 dark:text-slate-300 leading-relaxed max-w-xl font-medium">
                                    {t('login_desc')}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 pt-8 mt-8 border-t border-white/20 dark:border-white/10">
                                <div className="flex -space-x-3 hover:-space-x-1 transition-all duration-300">
                                    <img src="https://i.pravatar.cc/100?img=11" className="size-12 rounded-full border-2 border-primary/50 dark:border-[#080b1a] object-cover hover:scale-110 transition-transform cursor-pointer" alt="User" />
                                    <img src="https://i.pravatar.cc/100?img=12" className="size-12 rounded-full border-2 border-primary/50 dark:border-[#080b1a] object-cover hover:scale-110 transition-transform cursor-pointer" alt="User" />
                                    <img src="https://i.pravatar.cc/100?img=43" className="size-12 rounded-full border-2 border-primary/50 dark:border-[#080b1a] object-cover hover:scale-110 transition-transform cursor-pointer" alt="User" />
                                    <div className="size-12 rounded-full border-2 border-primary/50 dark:border-[#080b1a] bg-white/20 backdrop-blur-md flex items-center justify-center text-xs font-bold text-white shadow-xl shadow-black/10 hover:scale-110 transition-transform cursor-pointer">
                                        +2k
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-white/90">{t('login_stats_text')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-20 bg-background-light dark:bg-background-dark">
                    <div className="w-full max-w-[520px] space-y-10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl dark:backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 dark:shadow-blue-900/20 border border-white dark:border-white/10">
                        {/* Welcome Header */}
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl font-black text-[#0d101b] dark:text-white tracking-tight">{t('login_heading')}</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                {t('login_new_here')}
                                <Link className="text-primary font-bold hover:underline underline-offset-4" to="/register">{t('login_create_acc')}</Link>
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-5">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500" htmlFor="email">{t('login_lbl_email')}</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-primary">mail</span>
                                        <input
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950/50 text-[#0d101b] dark:text-white focus:ring-0 focus:border-primary transition-all outline-none font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                            id="email"
                                            placeholder={t('login_ph_email')}
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Password */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500" htmlFor="password">{t('login_lbl_pass')}</label>
                                        <a className="text-xs font-bold text-primary hover:text-primary/80 transition-colors" href="#">{t('login_forgot')}</a>
                                    </div>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-primary">lock</span>
                                        <input
                                            className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950/50 text-[#0d101b] dark:text-white focus:ring-0 focus:border-primary transition-all outline-none font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                            id="password"
                                            placeholder={t('login_ph_pass')}
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input className="checkbox-custom appearance-none h-6 w-6 rounded-lg border-2 border-slate-200 dark:border-slate-800 checked:bg-primary checked:border-primary transition-all cursor-pointer" type="checkbox" />
                                </div>
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{t('login_keep_signed')}</span>
                            </label>
                            <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary/30 dark:hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 group" type="submit">
                                {t('login_btn_signin')}
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </button>
                        </form>

                        {/* Social Logins */}
                        <div className="space-y-6">
                            <div className="relative flex items-center">
                                <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                                <span className="flex-shrink mx-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{t('login_or_continue')}</span>
                                <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                            </div>
                            <div className="grid  gap-4">
                                <button className="flex items-center justify-center gap-3 px-4 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950/50 hover:border-primary/20 dark:hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"></path>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                    </svg>
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('login_google')}</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-sm">verified_user</span>
                            <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-600">{t('login_encryption')}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}