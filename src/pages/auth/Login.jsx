import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/layout/Navbar';
import Swal from 'sweetalert2';

export default function Login() {
    const { login, resetPassword } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password, rememberMe);
            Swal.fire({
                title: t('login_btn_signin') + ' Successful!',
                text: 'Welcome back!',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            let errorMessage = 'An error occurred during sign-in.';
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed login attempts. Please try again later.';
            }
            Swal.fire({
                title: 'Sign In Failed',
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#3b82f6'
            });
        }
    };

    const handleForgotPassword = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const isAr = t('login_forgot').includes('نسيت');

        const { value: resetEmail } = await Swal.fire({
            title: isAr ? 'إعادة تعيين كلمة المرور' : 'Reset Password',
            html: `
                <div style="text-align:${isAr ? 'right' : 'left'}; margin-bottom: 8px;">
                    <p style="color:#64748b; font-size:14px; margin-bottom:16px; line-height:1.6;">
                        ${isAr
                            ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور.'
                            : 'Enter your email and we\'ll send you a link to reset your password.'}
                    </p>
                    <div style="position:relative;">
                        <span style="position:absolute; left:14px; top:50%; transform:translateY(-50%); font-family:'Material Symbols Outlined'; font-size:20px; color:#94a3b8; pointer-events:none; font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;">mail</span>
                        <input id="swal-reset-email" type="email"
                            placeholder="${isAr ? 'example@email.com' : 'you@example.com'}"
                            style="width:100%; box-sizing:border-box; padding:13px 16px 13px 44px; border:2px solid #e2e8f0; border-radius:14px; font-size:15px; outline:none; font-family:inherit; color:#0d101b; transition:border-color .2s;"
                            onfocus="this.style.borderColor='#1132d4'"
                            onblur="this.style.borderColor='#e2e8f0'"
                        />
                    </div>
                </div>`,
            showCancelButton: true,
            confirmButtonText: isAr ? 'إرسال الرابط' : 'Send Reset Link',
            cancelButtonText: isAr ? 'إلغاء' : 'Cancel',
            confirmButtonColor: '#1132d4',
            cancelButtonColor: '#94a3b8',
            focusConfirm: false,
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn',
            },
            didOpen: () => {
                document.getElementById('swal-reset-email').focus();
            },
            preConfirm: () => {
                const val = document.getElementById('swal-reset-email').value;
                if (!val || !/\S+@\S+\.\S+/.test(val)) {
                    Swal.showValidationMessage(isAr ? '⚠️ يرجى إدخال بريد إلكتروني صالح' : '⚠️ Please enter a valid email address');
                    return false;
                }
                return val;
            }
        });

        if (resetEmail) {
            try {
                await resetPassword(resetEmail);
                Swal.fire({
                    title: isAr ? '✅ تم الإرسال!' : '✅ Email Sent!',
                    html: `<p style="color:#64748b; font-size:14px; line-height:1.7;">
                        ${isAr
                            ? `تم إرسال رابط إعادة التعيين إلى <strong style="color:#0d101b">${resetEmail}</strong>. تفقد صندوق الوارد أو مجلد Spam.`
                            : `A reset link was sent to <strong style="color:#0d101b">${resetEmail}</strong>. Check your inbox or spam folder.`}
                    </p>`,
                    icon: 'success',
                    confirmButtonColor: '#1132d4',
                    confirmButtonText: isAr ? 'حسناً' : 'Got it',
                });
            } catch (error) {
                console.error('Reset password error:', error.code, error.message);
                let errorMessage = '';
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = isAr
                            ? 'لا يوجد حساب مسجل بهذا البريد الإلكتروني.'
                            : 'No account found with this email address.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = isAr ? 'البريد الإلكتروني غير صالح.' : 'Invalid email address.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = isAr ? 'طلبات كثيرة جداً. انتظر قليلاً.' : 'Too many requests. Please wait.';
                        break;
                    case 'auth/operation-not-allowed':
                        errorMessage = isAr
                            ? 'خدمة البريد الإلكتروني غير مفعّلة في إعدادات Firebase.'
                            : 'Email auth is not enabled. Enable it in Firebase Console → Authentication → Sign-in method.';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = isAr ? 'خطأ في الشبكة. تحقق من الاتصال.' : 'Network error. Check your connection.';
                        break;
                    default:
                        errorMessage = `Error: ${error.code || error.message}`;
                }
                Swal.fire({
                    title: isAr ? 'خطأ' : 'Error',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonColor: '#1132d4'
                });
            }
        }
    };


    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Navbar />
            {/* Main Content Area */}
            <main className="flex-1 flex">
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
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-20 bg-background-light dark:bg-background-dark relative z-10">
                    <div className="w-full max-w-[520px] space-y-10 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 dark:shadow-blue-900/20 border border-slate-100 dark:border-white/10 relative z-20">
                        {/* Welcome Header */}
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl font-black text-[#0d101b] dark:text-white tracking-tight">{t('login_heading')}</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                {t('login_new_here')}
                                <Link className="text-primary font-bold hover:underline underline-offset-4" to="/register">{t('login_create_acc')}</Link>
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6" style={{isolation: 'isolate'}}>
                            <div className="space-y-5">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500" htmlFor="email">{t('login_lbl_email')}</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-primary pointer-events-none">mail</span>
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
                                        <button 
                                            type="button"
                                            onClick={handleForgotPassword}
                                            className="text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer select-none py-1 px-2"
                                        >
                                            {t('login_forgot')}
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-primary pointer-events-none">lock</span>
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
                            <label className="flex items-center gap-3 cursor-pointer group select-none" htmlFor="rememberMe">
                                {/* Custom Checkbox */}
                                <div className="relative flex-shrink-0">
                                    <input
                                        id="rememberMe"
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 peer-checked:bg-primary peer-checked:border-primary transition-all duration-200 flex items-center justify-center">
                                        {rememberMe && (
                                            <svg className="w-3 h-3 text-white" viewBox="0 0 12 10" fill="none">
                                                <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{t('login_keep_signed')}</span>
                            </label>
                            <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2" type="submit">
                                {t('login_btn_signin')}
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </form>

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