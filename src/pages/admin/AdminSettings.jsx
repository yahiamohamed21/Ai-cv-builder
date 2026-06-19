import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ColorPicker from '../../components/ui/ColorPicker/ColorPicker';

export default function AdminSettings() {
    const { t } = useTranslation();
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('admin_settings_title')}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('admin_settings_desc')}</p>
                </div>
                <button className="bg-[var(--color-primary)] hover:brightness-110 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-[var(--color-primary)]/20">
                    {t('admin_settings_save')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Navigation Settings sidebar equivalent */}
                <div className="lg:col-span-1 space-y-2">
                    <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#161b22] border-2 border-[var(--color-primary)] rounded-xl shadow-sm group transition-all">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[var(--color-primary)]">settings_applications</span>
                            <span className="font-bold text-slate-900 dark:text-white">{t('admin_settings_general')}</span>
                        </div>
                        <span className="material-symbols-outlined text-[var(--color-primary)]">chevron_right</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-white dark:hover:bg-[#161b22] border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-xl group transition-all">
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">security</span>
                            <span className="font-bold">{t('admin_settings_security')}</span>
                        </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-white dark:hover:bg-[#161b22] border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-xl group transition-all">
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">api</span>
                            <span className="font-bold">{t('admin_settings_api')}</span>
                        </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-white dark:hover:bg-[#161b22] border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-xl group transition-all">
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">language</span>
                            <span className="font-bold">{t('admin_settings_localization')}</span>
                        </div>
                    </button>
                </div>

                {/* Settings Form Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Theme Customization Area */}
                    <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">{t('admin_settings_theme_title')}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('admin_settings_theme_desc')}</p>
                        <ColorPicker 
                            defaultColor={getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || "#f05a28"}
                            onChange={(color) => {
                                document.documentElement.style.setProperty('--color-primary', color);
                                // Optional logic to save the color theme to backend/localstorage
                            }} 
                        />
                    </div>

                    <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">{t('admin_settings_gen_config')}</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('admin_settings_platform_name')}</label>
                                <input 
                                    type="text" 
                                    defaultValue={t('admin_settings_cv_builder_ph')}
                                    placeholder={t('admin_settings_cv_builder_ph')}
                                    className="w-full bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('admin_settings_contact_email')}</label>
                                <input 
                                    type="email" 
                                    defaultValue="support@cvbuilder.com" 
                                    className="w-full bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('admin_settings_seo_desc')}</label>
                            <textarea 
                                rows="3"
                                defaultValue={t('admin_settings_seo_default')}
                                className="w-full bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all resize-none text-slate-900 dark:text-white"
                            ></textarea>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">{t('admin_settings_features')}</h3>
                        
                        <div className="space-y-4">
                            {[
                                { title: t('admin_settings_feat_reg'), desc: t('admin_settings_feat_reg_desc'), enabled: true },
                                { title: t('admin_settings_feat_guest'), desc: t('admin_settings_feat_guest_desc'), enabled: false },
                                { title: t('admin_settings_feat_ai'), desc: t('admin_settings_feat_ai_desc'), enabled: true },
                                { title: t('admin_settings_feat_maintenance'), desc: t('admin_settings_feat_maintenance_desc'), enabled: false },
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center justify-between py-2">
                                    <div className="pr-4">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{feature.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={feature.enabled} />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
