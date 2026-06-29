import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/layout/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faPaperPlane, faCopy, faPrint, faSync, faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';

function oklchToRgb(oklchString) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = oklchString;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
}

const TRANSLATIONS = {
    en: {
        title: "AI Cover Letter Generator",
        subtitle: "Create a tailored cover letter in seconds using advanced AI.",
        formTitle: "Cover Letter Details",
        lblFullName: "Full Name",
        phFullName: "e.g. John Doe",
        lblJobTitle: "Target Job Title",
        phJobTitle: "e.g. Senior Frontend Engineer",
        lblCompany: "Company Name",
        phCompany: "e.g. Google",
        lblJobDesc: "Job Description / Requirements",
        phJobDesc: "Paste the job description details here to optimize for ATS...",
        lblSkills: "Your Core Skills & Experience to Highlight",
        phSkills: "e.g. 5 years of React experience, state management, leadership...",
        lblTone: "Tone of Voice",
        toneProfessional: "Professional & Corporate",
        toneEnthusiastic: "Enthusiastic & Passionate",
        toneConfident: "Confident & Bold",
        toneCreative: "Creative & Unique",
        btnGenerate: "Generate Cover Letter",
        btnGenerating: "AI is drafting...",
        previewTitle: "Cover Letter Preview",
        phPreview: "Your AI-generated cover letter will appear here. Fill out the details on the left and click Generate!",
        btnCopy: "Copy Text",
        btnCopied: "Copied!",
        btnPrint: "Print / Save PDF",
        btnEdit: "Edit Letter",
        btnSaveEdit: "Save Changes",
        apiError: "Error generating letter. Please check your internet connection or API key.",
        letterDate: "Date: ",
        letterDear: "Dear Hiring Team at"
    },
    ar: {
        title: "منشئ خطاب التغطية بالذكاء الاصطناعي",
        subtitle: "أنشئ خطاب تغطية (Cover Letter) مخصصاً في ثوانٍ باستخدام الذكاء الاصطناعي.",
        formTitle: "تفاصيل الخطاب",
        lblFullName: "الاسم الكامل",
        phFullName: "مثال: يحيى محمد",
        lblJobTitle: "المسمى الوظيفي المستهدف",
        phJobTitle: "مثال: مهندس واجهات أمامية محترف",
        lblCompany: "اسم الشركة",
        phCompany: "مثال: جوجل",
        lblJobDesc: "الوصف الوظيفي / المتطلبات",
        phJobDesc: "قم بلصق تفاصيل الوصف الوظيفي هنا لتحسين الملاءمة مع أنظمة الفرز (ATS)...",
        lblSkills: "المهارات والخبرات الأساسية التي تود إبرازها",
        phSkills: "مثال: 5 سنوات خبرة في ريأكت، إدارة الحالات، المهارات القيادية...",
        lblTone: "نبرة الخطاب",
        toneProfessional: "مهني وشركات",
        toneEnthusiastic: "حماسي وشغوف",
        toneConfident: "واثق وجريء",
        toneCreative: "إبداعي وفريد",
        btnGenerate: "إنشاء الخطاب بالذكاء الاصطناعي",
        btnGenerating: "جاري الصياغة بالذكاء الاصطناعي...",
        previewTitle: "معاينة خطاب التغطية",
        phPreview: "سيظهر خطاب التغطية المنشأ هنا. املأ البيانات في اليسار ثم اضغط على إنشاء!",
        btnCopy: "نسخ النص",
        btnCopied: "تم النسخ!",
        btnPrint: "طباعة / حفظ PDF",
        btnEdit: "تعديل الخطاب",
        btnSaveEdit: "حفظ التعديلات",
        apiError: "حدث خطأ أثناء توليد الخطاب. يرجى التحقق من اتصالك بالإنترنت أو مفتاح API.",
        letterDate: "التاريخ: ",
        letterDear: "عزيزي فريق التوظيف في"
    }
};

export default function CoverLetter() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language] || TRANSLATIONS.en;
    const isRtl = language === 'ar';

    const [form, setForm] = useState({
        fullName: '',
        jobTitle: '',
        company: '',
        jobDesc: '',
        skills: '',
        tone: 'Professional'
    });

    const [loading, setLoading] = useState(false);
    const [letterText, setLetterText] = useState('');
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const letterRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!form.fullName || !form.jobTitle || !form.company) {
            setErrorMsg(isRtl ? 'يرجى ملء الاسم الكامل، المسمى الوظيفي واسم الشركة.' : 'Please fill out Full Name, Job Title, and Company Name.');
            return;
        }

        setLoading(true);
        setErrorMsg('');
        setLetterText('');

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                setErrorMsg(isRtl ? 'مفتاح API غير موجود. تحقق من ملف .env.local' : 'API key not found. Check your .env.local file.');
                setLoading(false);
                return;
            }
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `
                You are a professional CV and Cover Letter writer. Create a highly customized cover letter in ${language === 'ar' ? 'Arabic' : 'English'}.
                
                Applicant Info:
                - Name: ${form.fullName}
                - Target Role: ${form.jobTitle}
                - Key Skills to Highlight: ${form.skills}
                
                Company Info:
                - Target Company: ${form.company}
                - Job Description Details: ${form.jobDesc}
                
                Styling & Tone Constraints:
                - Tone: ${form.tone}
                - Format: Standard business cover letter format (salutation, hook, body paragraphs addressing alignment with job specs, and professional sign-off).
                - Length: Keep it engaging, professional, and within 250-350 words. Do NOT include placeholder tags like "[Date]" or "[Your Address]" directly in the generated text, just start writing from the greeting or keep placeholders clean.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            setLetterText(text);
        } catch (error) {
            console.error("Gemini API Cover Letter Error:", error);
            setErrorMsg(t.apiError);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!letterText) return;
        navigator.clipboard.writeText(letterText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = async () => {
        if (!letterText) return;

        Swal.fire({
            title: isRtl ? 'جارٍ إنشاء PDF...' : 'Generating PDF...',
            text: isRtl ? 'يرجى الانتظار لحظة' : 'Please wait a moment',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        try {
            const styleTags = Array.from(document.querySelectorAll('style'));
            const originalStyles = styleTags.map(tag => tag.innerHTML);
            styleTags.forEach(tag => {
                tag.innerHTML = tag.innerHTML.replace(/(?:oklch|oklab|lch|lab|color)\([^)]+\)/g, (match) => {
                    try { return oklchToRgb(match); } catch { return 'rgb(0,0,0)'; }
                });
            });

            const element = letterRef.current;
            await html2pdf().set({
                margin: 10,
                filename: `Cover_Letter_${form.fullName || 'Document'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).from(element).save();

            styleTags.forEach((tag, idx) => { tag.innerHTML = originalStyles[idx]; });

            Swal.close();
            Swal.fire({
                title: isRtl ? 'تم التنزيل!' : 'Downloaded!',
                text: isRtl ? 'تم حفظ الخطاب كـ PDF بنجاح.' : 'Cover letter saved as PDF successfully.',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        } catch (error) {
            Swal.close();
            Swal.fire({ title: 'Error', text: 'Failed to generate PDF: ' + error.message, icon: 'error' });
        }
    };

    const todayDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="flex flex-col min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            <Navbar />
            


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
                {/* Title */}
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        <FontAwesomeIcon icon={faFileAlt} />
                        AI Writer
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                        {t.title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Form Panel */}
                    <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">edit_note</span>
                                {t.formTitle}
                            </h2>
                        </div>

                        <form onSubmit={handleGenerate} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">{t.lblFullName} *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleInputChange}
                                    placeholder={t.phFullName}
                                    required
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">{t.lblJobTitle} *</label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={form.jobTitle}
                                        onChange={handleInputChange}
                                        placeholder={t.phJobTitle}
                                        required
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">{t.lblCompany} *</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={form.company}
                                        onChange={handleInputChange}
                                        placeholder={t.phCompany}
                                        required
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">{t.lblJobDesc}</label>
                                <textarea
                                    name="jobDesc"
                                    value={form.jobDesc}
                                    onChange={handleInputChange}
                                    placeholder={t.phJobDesc}
                                    rows="4"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">{t.lblSkills}</label>
                                <textarea
                                    name="skills"
                                    value={form.skills}
                                    onChange={handleInputChange}
                                    placeholder={t.phSkills}
                                    rows="3"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">{t.lblTone}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { id: 'Professional', label: t.toneProfessional },
                                        { id: 'Enthusiastic', label: t.toneEnthusiastic },
                                        { id: 'Confident', label: t.toneConfident },
                                        { id: 'Creative', label: t.toneCreative }
                                    ].map((toneOpt) => (
                                        <button
                                            key={toneOpt.id}
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, tone: toneOpt.id }))}
                                            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${form.tone === toneOpt.id
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-slate-200 dark:border-slate-700 bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850'
                                                }`}
                                        >
                                            {toneOpt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {errorMsg && (
                                <div className="text-red-500 text-xs font-semibold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                    {errorMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:brightness-110 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                                        {t.btnGenerating}
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        {t.btnGenerate}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Preview Canvas */}
                    <div className="lg:col-span-7 space-y-4">
                        {/* Control actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-md">
                            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">visibility</span>
                                {t.previewTitle}
                            </h3>
                            <div className="flex gap-2">
                                {letterText && (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-all text-slate-650 dark:text-slate-350"
                                        >
                                            <FontAwesomeIcon icon={isEditing ? faCheck : faPencilAlt} />
                                            {isEditing ? t.btnSaveEdit : t.btnEdit}
                                        </button>
                                        <button
                                            onClick={handleCopy}
                                            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 flex items-center gap-1.5 transition-all"
                                        >
                                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                            {copied ? t.btnCopied : t.btnCopy}
                                        </button>
                                        <button
                                            onClick={handleExport}
                                            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-primary hover:brightness-110 text-white flex items-center gap-1.5 shadow-md shadow-primary/20 transition-all"
                                        >
                                            <FontAwesomeIcon icon={faPrint} />
                                            {t.btnPrint}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Page Canvas Sheet */}
                        <div
                            ref={letterRef}
                            id="cover-letter-print-area"
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl min-h-[600px] p-8 sm:p-12 relative overflow-hidden transition-all duration-300"
                        >
                            {/* Decorative Top Line */}
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-orange-400 to-primary/80"></div>
                            
                            {/* Document Watermark Pattern */}
                            <div className="absolute inset-0 z-0 opacity-2 pointer-events-none flex items-center justify-center">
                                <span className="material-symbols-outlined text-[200px] text-slate-900 dark:text-white">description</span>
                            </div>

                            {/* Actual Document Content */}
                            <div className="relative z-10 space-y-8 text-slate-800 dark:text-slate-200 h-full font-serif text-[15px] leading-relaxed">
                                {letterText ? (
                                    <>
                                        {/* Header info */}
                                        <div className="border-b border-slate-100 dark:border-slate-800 pb-6 flex flex-col sm:flex-row justify-between gap-4 font-sans text-sm">
                                            <div className="space-y-1">
                                                <h4 className="text-xl font-bold text-primary tracking-tight font-display">{form.fullName || "Your Name"}</h4>
                                                <p className="text-slate-500 font-medium">{form.jobTitle || "Job Title"}</p>
                                            </div>
                                            <div className="text-slate-400 text-xs sm:text-right space-y-0.5">
                                                <p>{t.letterDate} {todayDate}</p>
                                                <p>{t.letterDear} {form.company || "Target Company"}</p>
                                            </div>
                                        </div>

                                        {/* Body content */}
                                        {isEditing ? (
                                            <textarea
                                                value={letterText}
                                                onChange={(e) => setLetterText(e.target.value)}
                                                rows="18"
                                                className="w-full bg-slate-50/50 dark:bg-slate-800/30 border border-slate-250 dark:border-slate-700 rounded-xl p-4 font-serif text-[15px] leading-relaxed focus:ring-1 focus:ring-primary outline-none"
                                            />
                                        ) : (
                                            <div className="whitespace-pre-wrap antialiased min-h-[400px]">
                                                {letterText}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    /* Placeholder state */
                                    <div className="flex flex-col items-center justify-center min-h-[450px] text-center space-y-4 px-6">
                                        <div className="size-16 rounded-full bg-slate-50 dark:bg-slate-850 text-slate-350 dark:text-slate-600 flex items-center justify-center animate-pulse">
                                            <span className="material-symbols-outlined text-4xl">auto_awesome</span>
                                        </div>
                                        <p className="text-slate-400 dark:text-slate-500 text-sm max-w-sm">
                                            {t.phPreview}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
