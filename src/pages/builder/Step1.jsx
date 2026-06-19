import React, { useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

export default function Step1() {
    const { cvData, setCvData } = useOutletContext();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCvData(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [name]: value
            }
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCvData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, photo: reader.result }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setCvData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, photo: null }
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        Swal.fire({
            title: t('builder_btn_save') + ' Successful!',
            text: 'Personal Information saved.',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/builder/step2');
        });
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    return (
        <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8 w-full">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
                {/* Progress Section */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-primary text-xs font-bold uppercase tracking-wider">{t('builder_step1_progress')}</span>
                                <h1 className="text-slate-900 dark:text-white text-2xl font-extrabold tracking-tight">{t('builder_step1_title')}</h1>
                            </div>
                            <div className="text-right">
                                <span className="text-slate-900 dark:text-white text-lg font-bold">25%</span>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">{t('builder_progress_complete')}</p>
                            </div>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            <div className="text-[10px] font-bold text-primary uppercase text-center">{t('builder_nav_contact')}</div>
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase text-center">{t('builder_nav_experience')}</div>
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase text-center">{t('builder_nav_education')}</div>
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase text-center">{t('builder_nav_skills')}</div>
                        </div>
                    </div>
                </div>

                {/* Form Content Section */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {/* Profile Image Section */}
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">account_circle</span>
                            {t('builder_step1_photo_title')}
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <div className="relative group">
                                <div className="size-32 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50 relative">
                                    {cvData.personalInfo.photo ? (
                                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cvData.personalInfo.photo})` }}></div>
                                    ) : (
                                        <span className="material-symbols-outlined text-4xl text-slate-400 dark:text-slate-600 group-hover:text-primary transition-colors">add_a_photo</span>
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-primary text-white size-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 pointer-events-none">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 text-center sm:text-left">
                                <div>
                                    <p className="text-slate-900 dark:text-white font-semibold">{t('builder_step1_photo_upload')}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{t('builder_step1_photo_desc')}</p>
                                </div>
                                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                                    <label className="cursor-pointer px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/jpeg, image/png"
                                            onChange={handlePhotoChange}
                                            ref={fileInputRef}
                                        />
                                        <span className="material-symbols-outlined text-sm">upload</span>
                                        {t('builder_step1_photo_choose')}
                                    </label>
                                    {cvData.personalInfo.photo && (
                                        <button
                                            onClick={removePhoto}
                                            type="button"
                                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            {t('builder_step1_photo_remove')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fields Grid */}
                    <div className="p-8">
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">badge</span>
                            {t('builder_step1_basic_title')}
                        </h2>
                        <form onSubmit={handleNext} className="grid grid-cols-1 md:grid-cols-2 gap-6" id="step1-form">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="fullName">{t('builder_step1_lbl_name')}</label>
                                <input
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    id="fullName"
                                    name="fullName"
                                    placeholder={t('builder_step1_ph_name')}
                                    type="text"
                                    value={cvData.personalInfo.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="jobTitle">{t('builder_step1_lbl_title')}</label>
                                <input
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    id="jobTitle"
                                    name="jobTitle"
                                    placeholder={t('builder_step1_ph_title')}
                                    type="text"
                                    value={cvData.personalInfo.jobTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">{t('builder_step1_lbl_email')}</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                                    <input
                                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        id="email"
                                        name="email"
                                        placeholder={t('builder_step1_ph_email')}
                                        type="email"
                                        value={cvData.personalInfo.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="phone">{t('builder_step1_lbl_phone')}</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">call</span>
                                    <input
                                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        id="phone"
                                        name="phone"
                                        placeholder={t('builder_step1_ph_phone')}
                                        type="tel"
                                        value={cvData.personalInfo.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="location">{t('builder_step1_lbl_location')}</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">location_on</span>
                                    <input
                                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        id="location"
                                        name="location"
                                        placeholder={t('builder_step1_ph_location')}
                                        type="text"
                                        value={cvData.personalInfo.location}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full sm:w-auto px-6 py-3 text-slate-600 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">close</span>
                            {t('builder_btn_cancel')}
                        </button>
                        <div className="flex w-full sm:w-auto gap-4">
                            <button
                                type="submit"
                                form="step1-form"
                                className="flex-1 sm:flex-none px-10 py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                                {t('builder_btn_next_experience')}
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}