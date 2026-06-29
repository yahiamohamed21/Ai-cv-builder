import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';

// CountUp Component triggered when scrolled into view
const CountUpNumber = ({ target, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                setHasAnimated(true);
                let start = 0;
                const end = parseFloat(target.replace(/[^0-9.]/g, ''));
                const isFloat = target.includes('.');
                const steps = 60;
                const stepTime = duration / steps;
                let step = 0;

                const timer = setInterval(() => {
                    step++;
                    if (step >= steps) {
                        clearInterval(timer);
                        setCount(end);
                    } else {
                        const progress = step / steps;
                        const easedProgress = progress * (2 - progress); // easeOutQuad
                        const current = easedProgress * end;
                        setCount(isFloat ? Math.round(current * 10) / 10 : Math.round(current));
                    }
                }, stepTime);
            }
        }, { threshold: 0.1 });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return (
        <span ref={elementRef} className="tabular-nums">
            {count.toLocaleString()}
            {suffix}
        </span>
    );
};

export default function About() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [activeMilestone, setActiveMilestone] = useState(0);

    const milestones = [
        { 
            year: '2024', 
            title: isArabic ? 'التأسيس والانطلاق' : 'Foundation & Launch', 
            desc: isArabic ? 'بدأنا بفكرة بسيطة لتسهيل إنشاء السير الذاتية بالذكاء الاصطناعي وتوفير أدوات منافسة في سوق العمل.' : 'Started with a simple idea to democratize AI resume building and provide job seekers with competitive tools.' 
        },
        { 
            year: '2025', 
            title: isArabic ? 'محرك تقييم AI v2' : 'AI Scoring Engine v2', 
            desc: isArabic ? 'أطلقنا محرك تحليل الـ ATS المطور وفحص الأخطاء النحوية اللحظي والاقتراحات الذكية للوظائف.' : 'Launched our proprietary ATS scanner, real-time grading, grammar analytics, and tailwind templates.' 
        },
        { 
            year: '2026', 
            title: isArabic ? 'الوصول العالمي والشراكات' : 'Global Scale & Partnerships', 
            desc: isArabic ? 'عقدنا شراكات مع كبرى منصات التوظيف والشركات الناشئة لنساعد ملايين الباحثين عن عمل شهرياً.' : 'Forged partnerships with leading hiring agencies and expanded language support to serve over 1M candidates globally.' 
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-200 min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center w-full">
                {/* Hero Section */}
                <div className="w-full max-w-[1200px] px-6 lg:px-10 py-12 lg:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2 space-y-6 text-center lg:text-left ltr:lg:text-left rtl:lg:text-right">
                            <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                                {t('about_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{t('about_title_accent')}</span>
                            </h1>
                            <p className="text-slate-600 dark:text-slate-300 text-base lg:text-lg font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                                {t('about_desc')}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
                                <Link to="/register">
                                    <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/20">
                                        {t('about_get_started')}
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => setIsVideoOpen(true)}
                                    className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-[1.02]"
                                >
                                    <span className="material-symbols-outlined ltr:mr-2 rtl:ml-2 text-primary">play_circle</span>
                                    {t('about_watch_video')}
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full h-[350px] lg:h-[400px] bg-center bg-no-repeat bg-cover rounded-3xl shadow-2xl relative overflow-hidden group border border-slate-100 dark:border-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCa3j7OuHLA2vodzhkYzmmvkD1wPcUWhDJxzQr6-KdflvtE4lY3UxP8WpnPLQQVIMtuNEkXX3a8khQaNh9oiZtCzNu_YKKWw-19Ksi6LR4LntzVGXrd3AfTXQ0TXXtW-JxDfOP3CvyyE3Z1KTjPLF7YPbTrljXMXasokbXnutoj1bxV7CIJh5jvHPOf3hbm2iBOtp0JUiFZbGzmsyXIu8ELtyndMadttsjZBCM29w3UTfa3O-4_nSnJ6IC6wuBtTqXNGeRQVTfmnkM1')" }}>
                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Section with Dynamic Count Up */}
                <div className="w-full bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5 py-16 backdrop-blur-sm">
                    <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center space-y-2">
                            <p className="text-primary text-4xl lg:text-5xl font-black tracking-tight">
                                <CountUpNumber target="120000" suffix="+" />
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-xs lg:text-sm">{t('about_stat1_lbl')}</p>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-primary text-4xl lg:text-5xl font-black tracking-tight">
                                <CountUpNumber target="98" suffix="%" />
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-xs lg:text-sm">{t('about_stat2_lbl')}</p>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-primary text-4xl lg:text-5xl font-black tracking-tight flex items-center justify-center ltr:flex-row rtl:flex-row-reverse" dir="ltr">
                                <CountUpNumber target="4.8" />
                                <span className="text-2xl text-slate-300 dark:text-slate-700">/5</span>
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-xs lg:text-sm">{t('about_stat3_lbl')}</p>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-primary text-4xl lg:text-5xl font-black tracking-tight">
                                <CountUpNumber target="10" suffix="M+" />
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-xs lg:text-sm">{t('about_stat4_lbl')}</p>
                        </div>
                    </div>
                </div>

                {/* Our Story & Interactive Milestones */}
                <div className="w-full max-w-[1200px] px-6 py-24 space-y-20">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            <div className="h-64 bg-center bg-cover rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsh6xfQVOgZ4I_gHSRgdiluCzomqxnk6VXuY4Y2SqoHVLFLZNJreUJVkJmZeGNxTMtCWUtc2S8THdl6K3cW9PmY1T7bUP-ul7yTyC5hDcsMWogLmJ9rKgl02cGft-PbCP3wZZY9OduoiRU3yFsruB5nHZ-7o5y2bU6U1ArxUPPD0RLb9ECFzzrMQwtxSMPzoMiDHA36SeLk24gHXg3_wY85ctGHqIOwYreP8BTNnrWsY0w_5MGQWIqpWTf6kQQKw6HwKmJSOEPxymP')" }}></div>
                            <div className="h-64 bg-center bg-cover rounded-2xl shadow-lg mt-12 border border-slate-100 dark:border-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGO_mvFXJCUb2DcEj6-7qclPZOY3dF2joh3rBtOrwAlcK5wL1u3Pflt-tLGlgaE8CYe6YdKoGy5yut8co_ZysStYgGHPgacFiNlyPCHK4cPzkl5JX05zkS2osZ90YdIYK_iYNdaiANvLiOVNClen3vqfXyClxtYMMjj67A3BXSKDAulyG8iMfis_DDLxc7IC0BX4MNsjhWbOib-rYqRGQ2Cww_SmVH1PBnZcr_dqZm6wxBHjx89XDp2FFS9v8Q5L1OeniScAHuXYwG')" }}></div>
                        </div>
                        <div className="lg:w-1/2 ltr:text-left rtl:text-right">
                            <div className="flex items-center gap-2 mb-6 justify-start">
                                <span className="h-0.5 w-8 bg-primary rounded-full"></span>
                                <span className="text-primary font-bold uppercase tracking-widest text-sm">{t('about_story_badge')}</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-black mb-8 text-slate-900 dark:text-white tracking-tight">{t('about_story_title')}</h2>
                            <div className="space-y-6 text-slate-600 dark:text-slate-300 text-base lg:text-lg leading-relaxed font-medium">
                                <p>{t('about_story_p1')}</p>
                                <p>{t('about_story_p2')}</p>
                                <p>{t('about_story_p3')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Slider */}
                    <div className="glass p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-slate-200 dark:border-slate-800 pb-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                                    {isArabic ? 'رحلتنا وإنجازاتنا' : 'Our Milestones & Timeline'}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {isArabic ? 'اضغط على الأعوام لمعرفة قصة تطورنا' : 'Click on the years to navigate our key phases'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {milestones.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveMilestone(idx)}
                                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                                            activeMilestone === idx
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/45'
                                        }`}
                                    >
                                        {item.year}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="animate-in fade-in slide-in-from-left-4 duration-300 min-h-[120px] flex flex-col justify-center">
                            <h4 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
                                {milestones[activeMilestone].title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-350 leading-relaxed font-medium text-base lg:text-lg">
                                {milestones[activeMilestone].desc}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="w-full bg-slate-50 dark:bg-[#0d101b] py-24 border-y border-slate-200 dark:border-white/5">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">{t('about_why_title')}</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">{t('about_why_desc')}</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-[#161b22] p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-8">
                                    <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('about_w1_title')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{t('about_w1_desc')}</p>
                            </div>
                            <div className="bg-white dark:bg-[#161b22] p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-8">
                                    <span className="material-symbols-outlined text-primary text-3xl">person</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('about_w2_title')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{t('about_w2_desc')}</p>
                            </div>
                            <div className="bg-white dark:bg-[#161b22] p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-8">
                                    <span className="material-symbols-outlined text-primary text-3xl">trending_up</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('about_w3_title')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{t('about_w3_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Team */}
                <div className="w-full max-w-[1200px] px-6 py-24">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{t('about_team_title')}</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">{t('about_team_desc')}</p>
                    </div>

                    {/* All 5 members in one row */}
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                        {[
                            { name: 'Yahia Mohammed', color: '6366f1' },
                            { name: 'Ahmed Khamis', color: '0ea5e9' },
                            { name: 'Kerollous Yasser', color: 'a855f7' },
                            { name: 'Youssef Shebl', color: '14b8a6' },
                            { name: 'Ziad Mahmoud', color: '22c55e' },
                        ].map((member) => (
                            <div key={member.name} className="flex flex-col items-center text-center group">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${member.color}&color=fff&size=256&font-size=0.35&bold=true&rounded=true`}
                                    alt={member.name}
                                    className="size-28 lg:size-36 rounded-full mb-4 shadow-lg group-hover:-translate-y-1 transition-transform duration-300"
                                />
                                <h4 className="text-base font-bold text-slate-900 dark:text-white">{member.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="w-full max-w-[1200px] px-6 pb-24">
                    <div className="bg-primary rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 size-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 size-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t('about_cta_title')}</h2>
                            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                                {t('about_cta_desc')}
                            </p>
                            <Link to="/register">
                                <button className="bg-white text-primary px-12 py-5 rounded-2xl text-xl font-black hover:bg-slate-50 transition-all shadow-xl hover:scale-105">
                                    {t('about_cta_btn')}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Product Video Modal Popup */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="relative w-full max-w-4xl px-4 animate-in zoom-in-95 duration-300">
                        <button 
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute -top-14 right-4 text-white hover:text-red-400 transition-colors flex items-center gap-1.5 font-bold text-sm bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 cursor-pointer shadow-lg"
                        >
                            <span className="material-symbols-outlined text-lg">close</span>
                            {isArabic ? 'إغلاق' : 'Close'}
                        </button>
                        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                            <iframe 
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                                title="AI CV Builder Intro Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 py-16 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2 space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary p-2 rounded-lg">
                                    <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
                                </div>
                                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">AI CV Builder</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed font-medium">{t('footer_desc')}</p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">{t('footer_product')}</h5>
                            <ul className="space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                <li><Link className="hover:text-primary transition-colors" to="/register">{t('footer_resume_builder')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/templates">{t('footer_cv_templates')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/cover-letter">{t('footer_cover_letter')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/about">{t('footer_pricing')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">{t('footer_support')}</h5>
                            <ul className="space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                <li><Link className="hover:text-primary transition-colors" to="/help-center">{t('footer_help_center')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/contact">{t('footer_contact_us')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/terms?tab=privacy">{t('footer_privacy')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/terms?tab=terms">{t('footer_terms')}</Link></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">{t('footer_newsletter')}</h5>
                            <div className="flex gap-2">
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-primary focus:border-primary px-4 py-3 placeholder:text-slate-400 ltr:pl-4 rtl:pr-4" placeholder={t('footer_email_placeholder')} type="email" />
                                <button className="bg-primary text-white px-4 rounded-xl hover:opacity-90 flex items-center justify-center transition-opacity shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined text-xl rtl:rotate-180">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center md:flex md:justify-between items-center">
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{t('footer_copyright')}</p>
                        <div className="flex justify-center gap-6 mt-6 md:mt-0">
                            <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined text-xl">public</span></Link>
                            <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined text-xl">alternate_email</span></Link>
                            <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined text-xl">language</span></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}