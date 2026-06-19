import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CVPreview from '../../components/cv/CVPreview';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Swal from 'sweetalert2';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export default function Step2() {
    const { cvData, setCvData } = useOutletContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [experiences, setExperiences] = useState(
        cvData.experiences.length > 0 ? cvData.experiences : [{
            id: Date.now().toString(),
            jobTitle: '',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        }]
    );

    const [loadingExpId, setLoadingExpId] = useState(null);

    const generateAiDescription = async (expId, jobTitle) => {
        if (!jobTitle.trim()) {
            Swal.fire({
                title: t('builder_step2_lbl_job') + ' is required for AI suggestions.',
                icon: 'warning',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }

        setLoadingExpId(expId);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const prompt = `Write 4 professional resume bullet points for a person working as a "${jobTitle}".
            Make it sound professional, action-oriented, and keep it extremely concise. 
            Do NOT include any markdown formatting, asterisks, or intro/outro text. Just output the 3 bullet points separated by newlines starting with a dash (-).`;

            const result = await model.generateContent(prompt);
            const text = await result.response.text();

            setExperiences(prev => prev.map(exp => {
                if (exp.id === expId) {
                    const newDesc = exp.description
                        ? exp.description + '\n' + text.trim()
                        : text.trim();
                    return { ...exp, description: newDesc };
                }
                return exp;
            }));
        } catch (error) {
            console.error("AI Generation Error:", error);
            Swal.fire({
                title: "Error generating suggestions. Please try again.",
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        } finally {
            setLoadingExpId(null);
        }
    };

    const handleExperienceChange = (id, field, value) => {
        setExperiences(prev => prev.map(exp => {
            if (exp.id === id) {
                const updatedExp = { ...exp, [field]: value };
                if (field === 'current' && value) {
                    updatedExp.endDate = '';
                }
                return updatedExp;
            }
            return exp;
        }));
    };

    const addExperience = () => {
        setExperiences(prev => [...prev, {
            id: Date.now().toString(),
            jobTitle: '',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        }]);
    };

    const removeExperience = (id) => {
        setExperiences(prev => prev.filter(exp => exp.id !== id));
    };

    const handleSaveAndContinue = () => {
        setCvData(prev => ({
            ...prev,
            experiences: experiences
        }));
        
        // Show success alert
        Swal.fire({
            title: t('builder_btn_save') + ' Successful!',
            text: 'Experience section updated.',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/builder/step3');
        });
    };

    const handleBack = () => {
        navigate('/builder/step1');
    };

    return (
        <main className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8 h-[calc(100vh-80px)] overflow-hidden w-full">
            {/* Left Column: Form Entry */}
            <div className="w-full lg:w-[55%] flex flex-col h-full overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                {/* Progress Stepper Section */}
                <div className="mb-8 sticky top-0 bg-background-light dark:bg-background-dark z-10 pt-4 pb-2">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <span className="text-primary font-semibold text-xs uppercase tracking-wider">{t('builder_step2_progress')}</span>
                            <h1 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">{t('builder_step2_title')}</h1>
                        </div>
                        <div className="text-right">
                            <span className="text-slate-500 text-xs font-medium uppercase">{t('builder_step_progress_lbl')}</span>
                            <p className="text-lg font-bold text-primary">50%</p>
                        </div>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-1/2 rounded-full transition-all duration-500"></div>
                    </div>
                </div>

                {/* Experience Entry Container */}
                <div className="space-y-6">
                    {experiences.map((exp, index) => (
                        <section key={exp.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center size-7 rounded-full bg-primary text-white text-xs font-bold">{index + 1}</span>
                                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{t('builder_step2_role')} {index + 1}</h3>
                                </div>
                                {experiences.length > 1 && (
                                    <button
                                        onClick={() => removeExperience(exp.id)}
                                        className="text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                )}
                            </div>
                            <div className="p-6 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('builder_step2_lbl_job')}</label>
                                        <input
                                            value={exp.jobTitle}
                                            onChange={(e) => handleExperienceChange(exp.id, 'jobTitle', e.target.value)}
                                            className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-transparent py-2.5 px-3 text-sm focus:ring-primary focus:border-primary border outline-none dark:text-white"
                                            placeholder={t('builder_step2_ph_job')}
                                            type="text"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('builder_step2_lbl_company')}</label>
                                        <input
                                            value={exp.company}
                                            onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                                            className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-transparent py-2.5 px-3 text-sm focus:ring-primary focus:border-primary border outline-none dark:text-white"
                                            placeholder={t('builder_step2_ph_company')}
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('builder_step2_lbl_start')}</label>
                                            <input
                                                value={exp.startDate}
                                                onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                                                className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-transparent py-2.5 px-3 text-sm focus:ring-primary focus:border-primary border outline-none dark:text-white [&::-webkit-calendar-picker-indicator]:dark:invert"
                                                type="month"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('builder_step2_lbl_end')}</label>
                                            <input
                                                value={exp.endDate}
                                                onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                                                disabled={exp.current}
                                                className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-transparent py-2.5 px-3 text-sm focus:ring-primary focus:border-primary border outline-none dark:text-white disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:dark:invert"
                                                type="month"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center h-11">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                checked={exp.current}
                                                onChange={(e) => handleExperienceChange(exp.id, 'current', e.target.checked)}
                                                className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                                                type="checkbox"
                                            />
                                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">{t('builder_step2_lbl_current')}</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('builder_step2_lbl_desc')}</label>
                                        <button
                                            type="button"
                                            onClick={() => generateAiDescription(exp.id, exp.jobTitle)}
                                            disabled={loadingExpId === exp.id || !exp.jobTitle.trim()}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all text-[10px] font-bold border border-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loadingExpId === exp.id ? (
                                                <span className="material-symbols-outlined text-xs animate-spin">refresh</span>
                                            ) : (
                                                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                                            )}
                                            {t('builder_step2_ai_suggestion')}
                                        </button>
                                    </div>
                                    <div className="border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
                                        <div className="flex items-center gap-0.5 p-1.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700">
                                            <button type="button" className="p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">format_bold</span></button>
                                            <button type="button" className="p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">format_italic</span></button>
                                            <button type="button" className="p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">format_list_bulleted</span></button>
                                        </div>
                                        <textarea
                                            value={exp.description}
                                            onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                                            className="w-full p-3 border-none focus:ring-0 bg-transparent text-sm dark:text-white placeholder:text-slate-400 outline-none resize-none"
                                            rows="4"
                                            placeholder={t('builder_step2_ph_desc')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}

                    <button
                        onClick={addExperience}
                        className="w-full py-5 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center gap-1.5 text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group"
                    >
                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                            <span className="material-symbols-outlined text-xl">add</span>
                        </div>
                        <span className="font-bold text-sm">{t('builder_step2_add_btn')}</span>
                    </button>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-auto pt-8 pb-6 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span> {t('builder_btn_back')}
                    </button>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/builder/step3')}
                            className="px-4 py-2 font-bold text-slate-500 hover:text-slate-700 transition-colors text-sm"
                        >
                            {t('builder_btn_skip')}
                        </button>
                        <button
                            onClick={handleSaveAndContinue}
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
                        >
                            {t('builder_btn_save')} <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className="hidden lg:flex w-[45%] h-full flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{t('builder_live_preview')}</h3>
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"><span className="material-symbols-outlined text-xl">zoom_in</span></button>
                        <button className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"><span className="material-symbols-outlined text-xl">download</span></button>
                    </div>
                </div>
                <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl p-8 overflow-y-auto shadow-inner [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full flex justify-center">
                    <div className="w-full max-w-[210mm] aspect-[1/1.414] origin-top scale-[0.85] 2xl:scale-100">
                        <CVPreview data={{ ...cvData, experiences }} />
                    </div>
                </div>
            </div>
        </main>
    );
}