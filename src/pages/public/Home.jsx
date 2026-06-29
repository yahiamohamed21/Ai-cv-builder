import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Logo from '../../components/ui/Logo/Logo';
import Swal from 'sweetalert2';

export default function Home() {
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const isAr = (i18n.resolvedLanguage || i18n.language) === 'ar';
    
    const carouselRef = useRef(null);
    const [newsletterEmail, setNewsletterEmail] = useState('');

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const amount = 340;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -amount : amount,
                behavior: 'smooth'
            });
        }
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        
        Swal.fire({
            title: isAr ? 'تم الاشتراك بنجاح!' : 'Successfully Subscribed!',
            text: isAr ? 'شكراً لاشتراكك في نشرتنا الإخبارية.' : 'Thank you for subscribing to our newsletter.',
            icon: 'success',
            confirmButtonText: isAr ? 'رائع' : 'Great',
            confirmButtonColor: '#3b82f6'
        });
        setNewsletterEmail('');
    };

    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="w-full">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-6 pb-12 lg:pt-8 lg:pb-16">
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute left-[50%] top-0 h-[640px] w-[640px] -translate-x-[50%] rounded-full bg-primary/5 blur-3xl"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="flex flex-col gap-5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                    <span className="material-symbols-outlined text-sm">bolt</span>
                                    {t('home_hero_badge')}
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                                    {t('home_hero_title_1')} <span className="text-primary">{t('home_hero_title_accent')}</span> {t('home_hero_title_2')}
                                </h1>
                                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                                    {t('home_hero_desc')}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to={user ? "/dashboard" : "/register"}>
                                        <button className="bg-primary text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center gap-2 group">
                                            {t('home_create_resume')}
                                            <span className="material-symbols-outlined group-hover:rtl:-translate-x-1 group-hover:translate-x-1 transition-transform rtl:rotate-180">arrow_forward</span>
                                        </button>
                                    </Link>
                                    <Link to="/templates">
                                        <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-3.5 rounded-xl text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                                            {t('home_view_templates')}
                                        </button>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-4 pt-2">
                                    <div className="flex -space-x-3">
                                        <div className="w-9 h-9 rounded-full border-2 border-white bg-indigo-500 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">YM</div>
                                        <div className="w-9 h-9 rounded-full border-2 border-white bg-sky-500 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">AK</div>
                                        <div className="w-9 h-9 rounded-full border-2 border-white bg-purple-500 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">KY</div>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">{t('home_joined_by')} <span className="font-bold text-slate-900 dark:text-white">50k+</span> {t('home_professionals')}</p>
                                </div>
                            </div>
                            <div className="relative lg:mx-auto w-full max-w-[400px]">
                                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden aspect-[4/5] max-h-[500px] relative group">
                                    <img 
                                        src="/images/hero_cv.png" 
                                        alt="Futuristic CV Builder Mockup" 
                                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-transparent pointer-events-none"></div>
                                    
                                    {/* Floating Badge */}
                                    <div className="absolute bottom-8 -right-6 rtl:right-auto rtl:-left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center z-10">
                                        <span className="text-2xl font-black text-primary dark:text-blue-400">98%</span>
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{t('home_ats_score')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-24 bg-white dark:bg-slate-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                            <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">{t('home_features_title')}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{t('home_features_desc')}</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-background-light dark:bg-background-dark/30 hover:border-primary/30 transition-all group flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <span className="material-symbols-outlined text-3xl">robot_2</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('home_f1_title')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t('home_f1_desc')}</p>
                            </div>
                            {/* Feature 2 */}
                            <div className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-background-light dark:bg-background-dark/30 hover:border-primary/30 transition-all group flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <span className="material-symbols-outlined text-3xl">lightbulb</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('home_f2_title')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t('home_f2_desc')}</p>
                            </div>
                            {/* Feature 3 */}
                            <div className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-background-light dark:bg-background-dark/30 hover:border-primary/30 transition-all group flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <span className="material-symbols-outlined text-3xl">dashboard_customize</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('home_f3_title')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t('home_f3_desc')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Templates Carousel/Grid */}
                <section className="py-24 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-end mb-12">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">{t('home_templates_title')}</h2>
                                <p className="text-slate-600 dark:text-slate-400">{t('home_templates_desc')}</p>
                            </div>
                            <div className="hidden sm:flex gap-2">
                                <button onClick={() => scrollCarousel('left')} className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button onClick={() => scrollCarousel('right')} className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                        <div ref={carouselRef} className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
                            {[
                                { id: 'executive', title: t('home_t1_title'), desc: t('home_t1_desc'), img: '/images/templates/executive.png' },
                                { id: 'creative', title: t('home_t2_title'), desc: t('home_t2_desc'), img: '/images/templates/creative.png' },
                                { id: 'minimalist', title: t('home_t3_title'), desc: t('home_t3_desc'), img: '/images/templates/minimalist.png' },
                                { id: 'modern', title: t('home_t4_title'), desc: t('home_t4_desc'), img: '/images/templates/modern.png' }
                            ].map((tpl) => (
                                <Link to={user ? `/builder/step1?template=${tpl.id}` : `/register?template=${tpl.id}`} key={tpl.id} className="min-w-[300px] w-[300px] flex-shrink-0 snap-start group block">
                                    <div className="aspect-[3/4] bg-slate-150 dark:bg-slate-800 rounded-2xl mb-4 overflow-hidden border border-slate-200 dark:border-slate-800 relative shadow-md transition-all group-hover:shadow-xl group-hover:-translate-y-1 duration-300">
                                        <img src={tpl.img} alt={tpl.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-white text-primary px-4 py-2 rounded-xl font-bold shadow-md text-sm">{t('home_create_resume')}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{tpl.title}</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{tpl.desc}</p>
                                        </div>
                                        <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">favorite</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="max-w-5xl mx-auto bg-primary rounded-[2rem] p-8 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="material-symbols-outlined text-[120px]">neurology</span>
                        </div>
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-4xl lg:text-5xl font-black leading-tight">{t('home_cta_title')}</h2>
                            <p className="text-white bg-white/10 backdrop-blur-sm rounded-full py-1.5 px-5 inline-block font-semibold text-xs tracking-wider border border-white/20 uppercase">{t('home_cta_badge')}</p>
                            <p className="text-white/80 max-w-2xl mx-auto text-lg">{t('home_cta_desc')}</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                                <Link to={user ? "/dashboard" : "/register"}>
                                    <button className="bg-white text-primary px-10 py-4 rounded-xl text-lg font-black hover:scale-105 transition-all">
                                        {t('home_cta_btn1')}
                                    </button>
                                </Link>
                                <Link to="/about">
                                    <button className="bg-primary/20 border border-white/20 text-white px-10 py-4 rounded-xl text-lg font-bold backdrop-blur-sm hover:bg-white/10 transition-all">
                                        {t('home_cta_btn2')}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2 space-y-4">
                            <Logo iconSize={32} textSize="text-xl" />
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">{t('footer_desc')}</p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">{t('footer_product')}</h5>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li><Link className="hover:text-primary transition-colors" to="/register">{t('footer_resume_builder')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/templates">{t('footer_cv_templates')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/cover-letter">{t('footer_cover_letter')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/about">{t('footer_pricing')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">{t('footer_support')}</h5>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li><Link className="hover:text-primary transition-colors" to="/help-center">{t('footer_help_center')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/contact">{t('footer_contact_us')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/terms?tab=privacy">{t('footer_privacy')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/terms?tab=terms">{t('footer_terms')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/career">{isAr ? 'الوظائف' : 'Careers'}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/blog">{isAr ? 'المدونة' : 'Blog'}</Link></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h5 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">{t('footer_newsletter')}</h5>
                            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                                <input 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary ltr:pl-3 rtl:pr-3 text-slate-850 dark:text-white" 
                                    placeholder={t('footer_email_placeholder')} 
                                    type="email" 
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="bg-primary text-white p-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined rtl:rotate-180">send</span>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center md:flex md:justify-between items-center">
                        <p className="text-slate-400 text-xs">{t('footer_copyright')}</p>
                        <div className="flex justify-center gap-6 mt-4 md:mt-0">
                            <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined">public</span></Link>
                            <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined">alternate_email</span></Link>
                            <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined">language</span></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}