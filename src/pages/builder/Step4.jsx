import React, { useState } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import CVPreview from '../../components/cv/CVPreview';
import Swal from 'sweetalert2';

<<<<<<< HEAD

=======
>>>>>>> 71931db3a21ba6117839872359ac71b317899036
export default function Step4() {
    const { cvData, previewRef } = useOutletContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [zoomLevel, setZoomLevel] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleZoom = () => {
        setZoomLevel(prev => prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1);
    };

    const handleFullscreenToggle = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleExport = useReactToPrint({
        contentRef: previewRef,
        documentTitle: `${cvData.personalInfo.fullName || 'My'}_CV`,
        onAfterPrint: () => {
            Swal.fire({
                title: t('builder_btn_finish_export') + ' Successful!',
                text: 'Your CV has been exported/printed.',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        },
    });

    return (
        <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 md:px-10 py-6 md:py-8 gap-8">
            {/* Wizard Progress */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold tracking-tight">{t('builder_step4_title')}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">{t('builder_step4_desc')}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <span className="text-primary font-bold text-sm">{t('builder_step4_progress')}</span>
                        <p className="text-xs text-slate-400 font-medium">{t('builder_step4_percent_complete')}</p>
                    </div>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-500 w-full"></div>
                </div>
            </div>

            {/* Two-Column Layout */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Left: Resume Preview */}
                <div className="w-full lg:w-1/2 sticky top-24">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">visibility</span>
                            {t('builder_live_preview_title')}
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={handleZoom}
                                title={t('builder_tooltip_zoom')}
                                className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm text-slate-600 hover:text-primary transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px]">{zoomLevel > 1 ? 'zoom_out' : 'zoom_in'}</span>
                            </button>
                            <button
                                onClick={handleFullscreenToggle}
                                title={t('builder_tooltip_fullscreen')}
                                className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm text-slate-600 hover:text-primary transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                            </button>
                            <button
                                onClick={handleExport}
                                title={t('builder_tooltip_download')}
                                className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm text-slate-600 hover:text-primary transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px]">download</span>
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-auto max-h-[calc(100vh-220px)] rounded-xl border border-slate-200/50 bg-slate-50/50 dark:bg-slate-900/30 p-2 md:p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <div
                            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
                            className="shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] bg-white w-full max-w-[210mm] mx-auto aspect-[1/1.414] rounded-sm border border-slate-200 origin-top overflow-hidden flex flex-col text-slate-800 transition-transform duration-300"
                        >
                            <div ref={previewRef} className="cv-printable-area w-full h-full bg-white text-black min-h-[297mm]">
                                <CVPreview data={cvData} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Editable Summary Sections */}
                <div className="w-full lg:w-1/2 space-y-4 h-full">
                    <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">edit_note</span>
                        {t('builder_step4_review_info')}
                    </h3>

                    {/* Section: Personal Info */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/40 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t('builder_step4_personal_details')}</h4>
                                    <p className="text-xs text-slate-500">{t('builder_step4_personal_desc')}</p>
                                </div>
                            </div>
                            <Link to="/builder/step1" className="flex items-center gap-1.5 text-primary font-bold text-sm px-3 py-1.5 hover:bg-primary/10 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-sm">edit</span>
                                {t('builder_btn_edit')}
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <div>
                                <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">{t('builder_step4_lbl_fullname')}</p>
                                <p className="text-slate-700 dark:text-slate-300 font-medium">{cvData.personalInfo.fullName || '-'}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">{t('builder_step4_lbl_email')}</p>
                                <p className="text-slate-700 dark:text-slate-300 font-medium">{cvData.personalInfo.email || '-'}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">{t('builder_step4_lbl_phone')}</p>
                                <p className="text-slate-700 dark:text-slate-300 font-medium">{cvData.personalInfo.phone || '-'}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">{t('builder_step4_lbl_location')}</p>
                                <p className="text-slate-700 dark:text-slate-300 font-medium">{cvData.personalInfo.location || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Section: Professional Experience */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/40 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">work</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t('builder_step4_exp_title')}</h4>
                                    <p className="text-xs text-slate-500">{t('builder_step4_exp_desc')}</p>
                                </div>
                            </div>
                            <Link to="/builder/step2" className="flex items-center gap-1.5 text-primary font-bold text-sm px-3 py-1.5 hover:bg-primary/10 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-sm">edit</span>
                                {t('builder_btn_edit')}
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {cvData.experiences && cvData.experiences.length > 0 ? cvData.experiences.map(exp => (
                                <div key={exp.id} className="pl-4 border-l-2 border-slate-100 dark:border-slate-800">
                                    <p className="text-slate-900 dark:text-white font-bold text-sm">{exp.jobTitle}</p>
                                    <p className="text-primary text-xs font-semibold">{exp.company}</p>
                                </div>
                            )) : (
                                <p className="text-slate-500 text-sm">{t('builder_step4_no_exp')}</p>
                            )}
                        </div>
                    </div>

                    {/* Section: Education */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/40 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">school</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t('builder_step4_edu_title')}</h4>
                                    <p className="text-xs text-slate-500">{t('builder_step4_edu_desc')}</p>
                                </div>
                            </div>
                            <Link to="/builder/step3" className="flex items-center gap-1.5 text-primary font-bold text-sm px-3 py-1.5 hover:bg-primary/10 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-sm">edit</span>
                                {t('builder_btn_edit')}
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {cvData.education && cvData.education.length > 0 ? cvData.education.map(edu => (
                                <div key={edu.id} className="pl-4 border-l-2 border-slate-100 dark:border-slate-800">
                                    <p className="text-slate-900 dark:text-white font-bold text-sm">{edu.degree}</p>
                                    <p className="text-primary text-xs font-semibold">{edu.school}</p>
                                </div>
                            )) : (
                                <p className="text-slate-500 text-sm">{t('builder_step4_no_edu')}</p>
                            )}
                        </div>
                    </div>

                    {/* Section: Skills */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/40 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">stars</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t('builder_step4_skills_title')}</h4>
                                    <p className="text-xs text-slate-500">{t('builder_step4_skills_desc')}</p>
                                </div>
                            </div>
                            <Link to="/builder/step3" className="flex items-center gap-1.5 text-primary font-bold text-sm px-3 py-1.5 hover:bg-primary/10 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-sm">edit</span>
                                {t('builder_btn_edit')}
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {cvData.skills && cvData.skills.length > 0 ? cvData.skills.map((skill, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-lg">
                                    {skill}
                                </span>
                            )) : (
                                <p className="text-slate-500 text-sm">{t('builder_step4_no_skills')}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-6 md:px-10 py-5 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <button
                        onClick={() => navigate('/builder/step3')}
                        className="flex items-center gap-2 px-5 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        {t('builder_btn_back_skills')}
                    </button>
                    <div className="flex items-center gap-3">
                        <button onClick={() => {
                            Swal.fire({
                                title: 'Draft Saved!',
                                text: 'Your CV progress has been saved.',
                                icon: 'success',
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }} className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:shadow-md transition-all">
                            <span className="material-symbols-outlined">save</span>
                            {t('builder_btn_save_draft')}
                        </button>
                        <button
                            onClick={handleExport}
                            className="group relative flex items-center justify-center gap-3 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 min-w-[200px]"
                        >
                            <span className="material-symbols-outlined">download</span>
                            {t('builder_btn_finish_export')}
                            <div className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary/20"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {/* Pad the bottom of the main content so the fixed footer doesn't overlap text */}
            <div className="h-20"></div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-start justify-center p-4 md:p-8 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <button
                        onClick={handleFullscreenToggle}
                        className="fixed top-4 right-4 md:top-8 md:right-8 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors z-[110]"
                        title={t('builder_tooltip_close_fullscreen')}
                    >
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </button>
                    <div className="w-full max-w-[210mm] bg-white aspect-[1/1.414] rounded-sm shadow-2xl overflow-hidden mt-8 mb-20 md:mb-8 text-black">
                        <CVPreview data={cvData} />
                    </div>
                </div>
            )}
        </main>
    );
}
