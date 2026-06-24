import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Swal from 'sweetalert2';

export default function Settings() {
    const { t } = useTranslation();
    const { user, login } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    const handleSaveProfile = (e) => {
        e.preventDefault();
        login({ ...user, name, email });
        Swal.fire({
            title: t('settings_alert_success'),
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('settings_title')}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{t('settings_desc')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Profile Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="glass p-6 md:p-8 rounded-2xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('settings_profile_title')}</h2>
                        <form onSubmit={handleSaveProfile} className="space-y-6">
                            <Input
                                label={t('settings_profile_name')}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <Input
                                label={t('settings_profile_email')}
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <div className="pt-2">
                                <Button type="submit" variant="primary">{t('settings_profile_save')}</Button>
                            </div>
                        </form>
                    </div>

                    <div className="glass p-6 md:p-8 rounded-2xl border border-red-100 dark:border-red-900/30">
                        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">{t('settings_danger_title')}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            {t('settings_danger_desc')}
                        </p>
                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                            {t('settings_danger_btn')}
                        </Button>
                    </div>
                </div>

                {/* Preferences */}
                <div className="space-y-6">
                    <div className="glass p-6 rounded-2xl">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('settings_pref_title')}</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings_pref_theme')}</label>
                                <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
                                    <button
                                        onClick={() => theme !== 'light' && toggleTheme()}
                                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${theme === 'light' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {t('settings_pref_theme_light')}
                                    </button>
                                    <button
                                        onClick={() => theme !== 'dark' && toggleTheme()}
                                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${theme === 'dark' ? 'bg-slate-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:dark:text-gray-300'}`}
                                    >
                                        {t('settings_pref_theme_dark')}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings_pref_lang')}</label>
                                <select
                                    value={language}
                                    onChange={(e) => changeLanguage(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white text-gray-900"
                                >
                                    <option value="en">English (US)</option>
                                    <option value="ar">العربية (Arabic)</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}