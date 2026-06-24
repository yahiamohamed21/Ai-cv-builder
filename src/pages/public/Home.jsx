import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/layout/Navbar';
import Logo from '../../components/ui/Logo/Logo';

export default function Home() {
    const { t, i18n } = useTranslation();
    const isAr = (i18n.resolvedLanguage || i18n.language) === 'ar';
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="w-full">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute left-[50%] top-0 h-[640px] w-[640px] -translate-x-[50%] rounded-full bg-primary/5 blur-3xl"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="flex flex-col gap-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                    <span className="material-symbols-outlined text-sm">bolt</span>
                                    {t('home_hero_badge')}
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                                    {t('home_hero_title_1')} <span className="text-primary">{t('home_hero_title_accent')}</span> {t('home_hero_title_2')}
                                </h1>
                                <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                                    {t('home_hero_desc')}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/register">
                                        <button className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center gap-2 group">
                                            {t('home_create_resume')}
                                            <span className="material-symbols-outlined group-hover:rtl:-translate-x-1 group-hover:translate-x-1 transition-transform rtl:rotate-180">arrow_forward</span>
                                        </button>
                                    </Link>
                                    <Link to="/templates">
                                        <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                                            {t('home_view_templates')}
                                        </button>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="flex -space-x-3">
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden" data-alt="User profile avatar portrait">
                                            <img alt="User 1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUtIcsWjC8hibKS-W7n7ymwssL39sqBRJ3bwKmYzkrBz0AOsl6n9q0mEsL97pnlxeeDZpqpzlxy1eBV6cNFXYiL7yydX9RWswjswqocP4lhDXz2sH3zSd6m70QGa6m75YVc0jhk-mCq_XjfM7AxYTCwcaJv28KBkbsOAFLayR_nXMDpMcIO5DpVttV-l4yH7jl7ww-paLj5yo4tn6XHk0SS3wsEP1_tGso6NeF7SajSZihfPRiuLOfB6uNKrdSqgVjSMeyS5DT_ggC" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden" data-alt="User profile avatar portrait">
                                            <img alt="User 2" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeWVNtU8ho0dOPC8l23X2ByBJlIC43GU1EBK_Q8lCTsDqg9wm6JqeCEVB4N4CYc9PYmu2m874DVU6WKOZOmCZhdA6uTm5psRcEkPsKGPZ5L4BhGhgVohnVQHBJh9EHpvXjRZEURBPFYTq08NzZ_HGli1XExoiJbuQ7wjTFC-udATYgbkDzyTB1Ffv1pRp3BYKWisKDdEBkelkWRlLuBmieQy8jHkkMvw7rdE2dUC1CNC1evyugG9oz0wHjp2-lp3IRzJ_EUTA-v-2M" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden" data-alt="User profile avatar portrait">
                                            <img alt="User 3" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClKT1ImI0WvqLVW-RSGzoieYkVK77h_Vjbzw1JHom2qktxI3KkBUoPDzCT8R6eGRAs_XGWUUQfZ0q_QxFlhSRI5uAGXSHJtpdze50JrRsS8fxVL2VkYmOxMe201s9lWSoTqD3t6oHSRAuzlpA_e1McBNZAzXnETUFE2gZhhLpXTp72lTW5ipJ13GCDPGuEQWwa7FHNYtWk01w50IceJUK_0wKavNTJrDHhPjPX5XujKOg25LKF9CA2gmbkdrSuxIa_4z3chQ2lCkC3" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium">{t('home_joined_by')} <span className="font-bold text-slate-900 dark:text-white">50k+</span> {t('home_professionals')}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden aspect-[4/5] relative">
                                    {/* Resume Visualization Mock */}
                                    <div className="p-8 space-y-6">
                                        <div className="flex gap-4 items-center border-b border-slate-100 dark:border-slate-800 pb-6">
                                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-5 w-1/2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                                                <div className="h-3 w-1/3 bg-slate-50 dark:bg-slate-800/50 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-3 w-full bg-slate-50 dark:bg-slate-800/50 rounded"></div>
                                            <div className="h-3 w-full bg-slate-50 dark:bg-slate-800/50 rounded"></div>
                                            <div className="h-3 w-4/5 bg-slate-50 dark:bg-slate-800/50 rounded"></div>
                                        </div>
                                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl relative group">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-black uppercase text-primary tracking-widest">{t('home_ai_suggestion')}</span>
                                                <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                                            </div>
                                            <p className="text-xs italic text-slate-600 dark:text-slate-300">{t('home_ai_suggestion_txt')}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-20 bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div>
                                            <div className="h-20 bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div>
                                        </div>
                                    </div>
                                    {/* Floating Badge */}
                                    <div className="absolute top-1/2 -right-4 ltr:right-[-1rem] rtl:left-[-1rem] bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-primary/20 flex flex-col items-center">
                                        <span className="text-2xl font-black text-primary">98%</span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{t('home_ats_score')}</span>
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
                            <div className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-background-light dark:bg-background-dark/30 hover:border-primary/30 transition-all group">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <span className="material-symbols-outlined text-3xl">robot_2</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('home_f1_title')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t('home_f1_desc')}</p>
                            </div>
                            {/* Feature 2 */}
                            <div className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-background-light dark:bg-background-dark/30 hover:border-primary/30 transition-all group">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <span className="material-symbols-outlined text-3xl">lightbulb</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('home_f2_title')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t('home_f2_desc')}</p>
                            </div>
                            {/* Feature 3 */}
                            <div className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-background-light dark:bg-background-dark/30 hover:border-primary/30 transition-all group">
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
                                <button className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
                            {/* Template 1 */}
                            <div className="min-w-[300px] flex-shrink-0 snap-start group">
                                <div className="aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4 overflow-hidden border border-slate-100 dark:border-slate-800 relative shadow-md transition-all group-hover:shadow-xl" data-alt="Modern executive resume template layout">
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold">{t('home_t1_title')}</h4>
                                        <p className="text-xs text-slate-500">{t('home_t1_desc')}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">favorite</span>
                                </div>
                            </div>
                            {/* Template 2 */}
                            <div className="min-w-[300px] flex-shrink-0 snap-start group">
                                <div className="aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4 overflow-hidden border border-slate-100 dark:border-slate-800 relative shadow-md transition-all group-hover:shadow-xl" data-alt="Creative design portfolio style resume template">
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold">{t('home_t2_title')}</h4>
                                        <p className="text-xs text-slate-500">{t('home_t2_desc')}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">favorite</span>
                                </div>
                            </div>
                            {/* Template 3 */}
                            <div className="min-w-[300px] flex-shrink-0 snap-start group">
                                <div className="aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4 overflow-hidden border border-slate-100 dark:border-slate-800 relative shadow-md transition-all group-hover:shadow-xl" data-alt="Minimalist software engineer resume template">
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold">{t('home_t3_title')}</h4>
                                        <p className="text-xs text-slate-500">{t('home_t3_desc')}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">favorite</span>
                                </div>
                            </div>
                            {/* Template 4 */}
                            <div className="min-w-[300px] flex-shrink-0 snap-start group">
                                <div className="aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4 overflow-hidden border border-slate-100 dark:border-slate-800 relative shadow-md transition-all group-hover:shadow-xl" data-alt="Standard corporate finance resume template">
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold">{t('home_t4_title')}</h4>
                                        <p className="text-xs text-slate-500">{t('home_t4_desc')}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">favorite</span>
                                </div>
                            </div>
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
                            <p className="text-primary/20 bg-white/10 backdrop-blur-sm rounded-lg py-2 px-6 inline-block font-bold">{t('home_cta_badge')}</p>
                            <p className="text-white/80 max-w-2xl mx-auto text-lg">{t('home_cta_desc')}</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                                <Link to="/register">
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
                            <div className="flex gap-2">
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary ltr:pl-3 rtl:pr-3" placeholder={t('footer_email_placeholder')} type="email" />
                                <button className="bg-primary text-white p-2 rounded-lg hover:opacity-90">
                                    <span className="material-symbols-outlined rtl:rotate-180">send</span>
                                </button>
                            </div>
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