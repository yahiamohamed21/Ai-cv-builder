import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Define the 6 templates with their categories
const ALL_TEMPLATES = [
    {
        id: 'modern',
        titleKey: 'templates_t1_title',
        descKey: 'templates_t1_desc',
        category: 'Tech',
        badge: 'templates_badge_popular',
        image: '/images/templates/modern.png'
    },
    {
        id: 'professional',
        titleKey: 'templates_t2_title',
        descKey: 'templates_t2_desc',
        category: 'Business',
        image: '/images/templates/professional.png'
    },
    {
        id: 'creative',
        titleKey: 'templates_t3_title',
        descKey: 'templates_t3_desc',
        category: 'Creative',
        badge: 'templates_badge_new',
        badgeColor: 'bg-emerald-500',
        image: '/images/templates/creative.png'
    },
    {
        id: 'elegant',
        titleKey: 'templates_t4_title',
        descKey: 'templates_t4_desc',
        category: 'Academic',
        image: '/images/templates/elegant.png'
    },
    {
        id: 'minimalist',
        titleKey: 'Minimalist Text',
        descKey: 'Clean and whitespace focused',
        category: 'Tech',
        image: '/images/templates/minimalist.png'
    },
    {
        id: 'executive',
        titleKey: 'Premium Executive',
        descKey: 'Formal layout for senior professionals',
        category: 'Executive',
        badge: 'PREMIUM',
        badgeColor: 'bg-yellow-500',
        image: '/images/templates/executive.png'
    }
];

const CATEGORIES = ['All', 'Tech', 'Business', 'Academic', 'Executive', 'Creative'];

export default function Templates() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('popular');

    const filteredTemplates = activeCategory === 'All' 
        ? ALL_TEMPLATES 
        : ALL_TEMPLATES.filter(template => template.category === activeCategory);

    const getSortedTemplates = () => {
        const templates = [...filteredTemplates];
        if (sortBy === 'newest') {
            return templates.reverse(); 
        } else if (sortBy === 'ats') {
            return templates.sort((a, b) => {
                const priority = { modern: 1, minimalist: 2, elegant: 3, professional: 4, creative: 5, executive: 6 };
                return (priority[a.id] || 9) - (priority[b.id] || 9);
            });
        } else {
            return templates.sort((a, b) => {
                const priority = { modern: 1, creative: 2, executive: 3, professional: 4, elegant: 5, minimalist: 6 };
                return (priority[a.id] || 9) - (priority[b.id] || 9);
            });
        }
    };

    const sortedTemplates = getSortedTemplates();

    return (
        <>
            {/* Hero Section */}
            <div className="flex flex-col gap-4 mb-10 text-center md:text-left">
                <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">{t('templates_hero_title')}</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-medium opacity-80">{t('templates_hero_desc')}</p>
            </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-primary/5 dark:border-slate-800 pb-6">
                    {CATEGORIES.map(category => (
                        <button 
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-sm font-bold transition-all shadow-sm ${
                                activeCategory === category 
                                ? 'bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90' 
                                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/40 hover:text-primary dark:hover:text-primary'
                            }`}
                        >
                            {category === 'All' ? t('templates_filter_all') : category}
                        </button>
                    ))}
                    
                    <div className="ml-auto flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium mt-4 lg:mt-0">
                        <span>{t('templates_sort_by')}</span>
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-xs font-bold py-1 px-3 cursor-pointer outline-none transition-colors"
                        >
                            <option className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200" value="popular">{t('templates_sort_pop')}</option>
                            <option className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200" value="newest">{t('templates_sort_new')}</option>
                            <option className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200" value="ats">{t('templates_sort_ats')}</option>
                        </select>
                    </div>
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {sortedTemplates.map((template, index) => (
                        <div key={index} className="group flex flex-col gap-4">
                            <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 aspect-[3/4]">
                                <img alt="Resume Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={template.image} />
                                <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6">
                                    <Link to={`/builder/step1?template=${template.id}`} className="w-full py-2.5 px-3 bg-primary text-white rounded-lg font-bold shadow-xl flex items-center justify-center gap-1.5 whitespace-nowrap text-xs md:text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary/90">
                                        <span className="material-symbols-outlined text-[16px] align-middle">edit</span>
                                        <span>{t('templates_card_use')}</span>
                                    </Link>
                                </div>
                                {template.badge && (
                                    <div className={`absolute top-3 right-3 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-sm ${template.badgeColor || 'bg-primary'}`}>
                                        {t(template.badge) !== template.badge ? t(template.badge) : template.badge}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                                    {t(template.titleKey) !== template.titleKey ? t(template.titleKey) : template.titleKey}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                                    {t(template.descKey) !== template.descKey ? t(template.descKey) : template.descKey}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {filteredTemplates.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500">
                            No templates found for this category.
                        </div>
                    )}
                </div>

                {/* Recently Added Header */}
                <div className="mt-16 mb-8 flex items-center justify-between">
                    <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">{t('templates_inspire_title')}</h2>
                    <button 
                        onClick={() => {
                            setActiveCategory('All');
                            setSortBy('popular');
                            window.scrollTo({ top: 150, behavior: 'smooth' });
                        }} 
                        className="text-primary text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                        {t('templates_inspire_view_all')}
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>

                {/* Smaller Inspiration Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div 
                        onClick={() => {
                            setActiveCategory('Tech');
                            setSortBy('newest');
                            window.scrollTo({ top: 150, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">developer_mode</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{t('templates_i1_title')}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('templates_i1_desc')}</p>
                        </div>
                    </div>

                    <div 
                        onClick={() => {
                            setActiveCategory('Creative');
                            setSortBy('popular');
                            window.scrollTo({ top: 150, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">palette</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{t('templates_i2_title')}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('templates_i2_desc')}</p>
                        </div>
                    </div>

                    <div 
                        onClick={() => {
                            setActiveCategory('Tech');
                            setSortBy('ats');
                            window.scrollTo({ top: 150, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">analytics</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{t('templates_i3_title')}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('templates_i3_desc')}</p>
                        </div>
                    </div>

                    <div 
                        onClick={() => {
                            setActiveCategory('Executive');
                            setSortBy('popular');
                            window.scrollTo({ top: 150, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">rocket_launch</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{t('templates_i4_title')}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('templates_i4_desc')}</p>
                        </div>
                    </div>
                </div>
        </>
    );
}