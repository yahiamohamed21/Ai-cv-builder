import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CVPreview from '../../components/cv/CVPreview';
import Swal from 'sweetalert2';

export default function Step3() {
    const { cvData, setCvData } = useOutletContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [educationList, setEducationList] = useState(
        cvData.education && cvData.education.length > 0 ? cvData.education : [{
            id: Date.now().toString(),
            school: '',
            degree: '',
            graduationDate: ''
        }]
    );

    const [skillInput, setSkillInput] = useState('');
    const [skillsList, setSkillsList] = useState(cvData.skills || []);

    const handleEducationChange = (id, field, value) => {
        setEducationList(prev => prev.map(edu => {
            if (edu.id === id) {
                return { ...edu, [field]: value };
            }
            return edu;
        }));
    };

    const addEducation = () => {
        setEducationList(prev => [...prev, {
            id: Date.now().toString(),
            school: '',
            degree: '',
            graduationDate: ''
        }]);
    };

    const removeEducation = (id) => {
        setEducationList(prev => prev.filter(edu => edu.id !== id));
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (skillInput.trim() && !skillsList.includes(skillInput.trim())) {
            setSkillsList(prev => [...prev, skillInput.trim()]);
        }
        setSkillInput('');
    };

    const handleAddSuggestedSkill = (skill) => {
        if (!skillsList.includes(skill)) {
            setSkillsList(prev => [...prev, skill]);
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkillsList(prev => prev.filter(skill => skill !== skillToRemove));
    };

    const handleSaveAndContinue = () => {
        setCvData(prev => ({
            ...prev,
            education: educationList,
            skills: skillsList
        }));
        Swal.fire({
            title: t('builder_btn_save') + ' Successful!',
            text: 'Education and Skills saved.',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate(`/builder/step4?id=${cvData.id}`);
        });
    };

    const handleBack = () => {
        navigate(`/builder/step2?id=${cvData.id}`);
    };

    const suggestedSkills = [
        "Project Management", "Data Analysis", "Public Speaking",
        "TypeScript", "Agile", "React", "Node.js", "Python"
    ];

    return (
        <main className="max-w-[1600px] flex-1 flex flex-col items-center py-6 md:py-10 px-4 mx-auto w-full">
            <div className="flex flex-col lg:flex-row gap-8 w-full h-[calc(100vh-120px)] overflow-hidden">
                {/* Left Side: Form Inputs */}
                <div className="flex-1 lg:max-w-[55%] w-full h-full overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-10 mb-6">
                        {/* Progress Bar */}
                        <div className="flex flex-col gap-3 mb-10">
                            <div className="flex gap-6 justify-between items-end">
                                <div>
                                    <p className="text-primary text-sm font-semibold uppercase tracking-wider">{t('builder_step3_progress')}</p>
                                    <h1 className="text-slate-900 dark:text-white text-3xl font-bold mt-1">{t('builder_step3_title')}</h1>
                                </div>
                                <p className="text-slate-500 text-sm font-medium">{t('builder_step3_percent_complete')}</p>
                            </div>
                            <div className="rounded-full bg-slate-100 dark:bg-slate-800 h-2.5 w-full overflow-hidden">
                                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: '75%' }}></div>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{t('builder_step3_desc')}</p>
                        </div>

                        {/* Education Section */}
                        <section className="mb-12">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary">school</span>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('builder_step3_edu_title')}</h2>
                            </div>
                            <div className="space-y-6">
                                {educationList.map((edu, index) => (
                                    <div key={edu.id} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 line-around">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('builder_step3_lbl_school')}</label>
                                                <input
                                                    value={edu.school}
                                                    onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-205 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 dark:text-white"
                                                    placeholder={t('builder_step3_ph_school')}
                                                    type="text"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('builder_step3_lbl_degree')}</label>
                                                <input
                                                    value={edu.degree}
                                                    onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-205 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 dark:text-white"
                                                    placeholder={t('builder_step3_ph_degree')}
                                                    type="text"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('builder_step3_lbl_grad')}</label>
                                                <div className="relative">
                                                    <input
                                                        value={edu.graduationDate}
                                                        onChange={(e) => handleEducationChange(edu.id, 'graduationDate', e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-205 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 dark:text-white [&::-webkit-calendar-picker-indicator]:dark:invert"
                                                        type="month"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {educationList.length > 1 && (
                                            <div className="mt-4 flex justify-end">
                                                <button onClick={() => removeEducation(edu.id)} className="text-slate-400 hover:text-red-500 text-sm font-medium flex items-center gap-1 transition-colors">
                                                    <span className="material-symbols-outlined text-sm">delete</span> {t('builder_btn_remove')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <button onClick={addEducation} className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group">
                                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                                    {t('builder_step3_add_edu')}
                                </button>
                            </div>
                        </section>

                        {/* Skills Section */}
                        <section className="mb-10">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary">psychology</span>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('builder_step3_skills_title')}</h2>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('builder_step3_lbl_skills')}</label>
                                <div className="flex flex-wrap gap-2 p-2 min-h-[50px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-primary transition-all">
                                    {skillsList.map((skill, index) => (
                                        <div key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                            {skill}
                                            <span onClick={() => removeSkill(skill)} className="material-symbols-outlined text-xs cursor-pointer hover:text-primary/70">close</span>
                                        </div>
                                    ))}
                                    <form onSubmit={handleAddSkill} className="flex-1 min-w-[150px]">
                                        <input
                                            value={skillInput}
                                            onChange={(e) => setSkillInput(e.target.value)}
                                            className="w-full border-none focus:ring-0 bg-transparent text-sm py-1 outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                                            placeholder={t('builder_step3_ph_skills')}
                                            type="text"
                                        />
                                    </form>
                                </div>

                                <div className="pt-2">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">{t('builder_step3_suggestions')}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedSkills.map((skill, index) => (
                                            !skillsList.includes(skill) && (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAddSuggestedSkill(skill)}
                                                    className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors bg-white dark:bg-slate-800"
                                                >
                                                    {skill}
                                                </button>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Footer Buttons */}
                        <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-800">
                            <button onClick={handleBack} className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">arrow_back</span>
                                {t('builder_btn_back')}
                            </button>
                            <button onClick={handleSaveAndContinue} className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                {t('builder_btn_next_finalize')}
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="mt-8 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-4 mb-4">
                        <span className="material-symbols-outlined text-primary">lightbulb</span>
                        <div>
                            <h4 className="text-primary font-bold text-sm">{t('builder_step3_pro_tip')}</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t('builder_step3_pro_tip_desc')}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Live Preview */}
                <div className="hidden lg:flex flex-col w-[45%] h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('builder_live_resume_preview')}</h3>
                        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase">{t('builder_preview_live')}</span>
                    </div>

                    <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl p-8 overflow-y-auto shadow-inner [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full flex justify-center">
                        <div className="w-full max-w-[210mm] origin-top scale-[0.85] 2xl:scale-100 flex justify-center min-h-[297mm]">
                            <CVPreview data={{ ...cvData, education: educationList, skills: skillsList }} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
