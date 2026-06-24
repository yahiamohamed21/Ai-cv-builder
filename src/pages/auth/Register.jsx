import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/layout/Navbar';
import Swal from 'sweetalert2';

export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // mock register and auto login
        login({ email, name, id: '123' });
        Swal.fire({
            title: t('register_btn_create') + ' Successful!',
            text: 'Account created successfully.',
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
        <div className="bg-background-light dark:bg-[#0a0c10] min-h-screen flex flex-col font-display text-slate-900 dark:text-slate-200">
            <Navbar />

            <main className="flex-1 flex min-h-screen">
                {/* Left Side: Visual Content */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary dark:bg-primary">
                    <div className="absolute inset-0 opacity-20 pointer-events-none block dark:hidden">
                        <svg className="h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="0" cy="0" fill="white" r="50"></circle>
                            <circle cx="100" cy="100" fill="white" r="50"></circle>
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 xl:p-24 h-full">
                        <div className="space-y-4">
                            <h1 className="text-white text-4xl xl:text-5xl font-black leading-tight tracking-tight">{t('register_title_left')}</h1>
                            <p className="text-white/80 text-lg xl:text-xl max-w-md">{t('register_desc_left')}</p>
                        </div>

                        <div className="mt-auto space-y-4 pt-12">
                            <div className="flex -space-x-3">
                                <img alt="User 1" className="w-12 h-12 rounded-full border-2 border-primary object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmw_t29H2dGa1Hsspf4WXOAIPjT7kTDi_yZ59ez6up-nMNcCEJWeG6pftMJsGSwDKOqwAuI6HSiUnHZ3yRdAXEx2Czdx7_JhEiYilF9TiWhd97t9sM3kINebLO3HLTGZisWJZ-VNbALihfE752f8CtCAS7jtfT-z01KVQ45lqhfASJg4EgKqYFXKlI3xTGgr7sOg23t5gBekEfM9NrGF86x_9To_4GrDM8TOAgS0a9CVkIObTvcsD17RYnmwNt3U88p1U9UeVxxJJp" />
                                <img alt="User 2" className="w-12 h-12 rounded-full border-2 border-primary object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrKrhr0Fip-7JJFswnZV4rQZyZo8tPOdBiCexJ1JiJy06_a0aqu6ZmteXbxQ4TzOV8V17X2AeqQT2HoiQmIGvFeY-i9aliVjVRRJd-HXNfscQb8UUuuj8q2bkUr-WPO4rXX1Nyz1jd93bhIBjvS0sw-YWzWGLBkZdpJpcY1eE79mC4kevYMWzdZaVbh0UK30BH5dZngMcrgm0aw5gnClkqk8aVs7v5B_cnhFKs_tL9hbh-4DwJ9vjmn_EbPlQESPIoAX2jv6N8EYbL" />
                                <img alt="User 3" className="w-12 h-12 rounded-full border-2 border-primary object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0P0uX6duHctKarW7ZxHTEsKoivXl_WWU42iOD0VHi832hnjDTrVXVOAlBFnDCGvIVRQ-QnkiH-naQu6cXFB667gNBB5-edmth7YCMj-LIerCj2Qx8AeGw2zMYzSId0ETHW6qy1m4euIemXDYEJ3DZVFWNd0L4P-cDtWkie4LWwjvgdKYxyX2qUrJMMNZmASLd1Ap2XHvG7XEC-7tzv0e25Ico8fhCFrjQ09_dvxvKhUPGZxcRRon3h1zaeOZErWrspj6y5XvmBS2L" />
                                <div className="w-12 h-12 rounded-full border-2 border-primary bg-white/20 flex items-center justify-center text-xs text-white font-bold backdrop-blur-sm">+10k</div>
                            </div>
                            <p className="text-white/70 text-sm font-medium italic max-w-md">{t('register_testimonial')}</p>
                        </div>
                    </div>

                    {/* Abstract Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/10 rounded-full -ml-40 -mb-40 blur-[100px] pointer-events-none"></div>
                </div>

                {/* Right Side: Registration Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-20 bg-background-light dark:bg-[#0d1117]">
                    <div className="w-full max-w-[520px] space-y-8 bg-white dark:bg-[#161b22]/50 p-8 sm:p-12 rounded-[2rem] shadow-2xl shadow-primary/5 dark:shadow-none border border-slate-100 dark:border-white/5">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{t('register_heading')}</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">{t('register_subheading')}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('register_lbl_name')}</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-xl">person</span>
                                    <input
                                        className="w-full ltr:pl-12 rtl:pr-12 ltr:pr-4 rtl:pl-4 py-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161b22] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                                        placeholder={t('register_ph_name')}
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('register_lbl_email')}</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-xl">mail</span>
                                    <input
                                        className="w-full ltr:pl-12 rtl:pr-12 ltr:pr-4 rtl:pl-4 py-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161b22] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                                        placeholder={t('register_ph_email')}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('register_lbl_pass')}</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-xl">lock</span>
                                    <input
                                        className="w-full ltr:pl-12 rtl:pr-12 ltr:pr-12 rtl:pl-12 py-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161b22] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                                        placeholder={t('register_ph_pass')}
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                                <div className="flex gap-1 pt-2">
                                    <div className="h-1 flex-1 bg-primary/20 rounded-full"></div>
                                    <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                    <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                    <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">{t('register_pass_hint')}</p>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-3 pt-2">
                                <input
                                    className="mt-1 rounded bg-slate-50 border-slate-300 dark:bg-slate-800 dark:border-white/20 text-primary focus:ring-primary dark:focus:ring-offset-[#0d1117] cursor-pointer size-4"
                                    id="terms"
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    required
                                />
                                <label className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-snug" htmlFor="terms">
                                    {t('register_agree_1')}<a className="text-primary font-bold hover:underline" href="#">{t('register_terms')}</a>{t('register_agree_2')}<a className="text-primary font-bold hover:underline" href="#">{t('register_privacy')}</a>{t('register_agree_3')}
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 dark:shadow-none transition-all transform active:scale-[0.98] text-lg flex items-center justify-center gap-2" type="submit">
                                {t('register_btn_create')}
                                <span className="material-symbols-outlined text-xl ltr:rotate-0 rtl:rotate-180">arrow_right_alt</span>
                            </button>

                            {/* Divider */}
                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
                                <span className="flex-shrink mx-4 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('register_or_continue')}</span>
                                <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-1 gap-4">
                                <button className="flex items-center justify-center gap-2 py-4 border-2 border-slate-100 dark:border-white/5 rounded-xl bg-white dark:bg-[#161b22] hover:bg-slate-50 dark:hover:bg-[#1c2128] transition-colors text-slate-700 dark:text-slate-200 text-sm font-bold shadow-sm" type="button">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                                    </svg>
                                    {t('register_google')}
                                </button>
                            </div>
                        </form>

                        {/* Mobile Switch to Login */}
                        <div className="mt-8 text-center pt-4 border-t border-slate-100 dark:border-white/5">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                {t('register_already_have')}
                                <Link className="text-primary font-bold hover:underline" to="/login">{t('register_login_here')}</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}