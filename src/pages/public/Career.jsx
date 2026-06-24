import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/layout/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faMapMarkerAlt, faClock, faHeart, faLaptopHouse, faGraduationCap, faUmbrellaBeach, faRocket, faArrowRight, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const TRANSLATIONS = {
    en: {
        title: "Build the Future of Career Tech",
        subtitle: "Join our remote-first team of engineers, designers, and creators building the next generation of AI career tools.",
        viewOpenings: "View Open Positions",
        cultureTitle: "Why You'll Love Working Here",
        cultureSubtitle: "We believe in high autonomy, continuous growth, and building products that actually help people.",
        perk1Title: "Remote First",
        perk1Desc: "Work from anywhere in the world. We offer home office stipends to make your setup perfect.",
        perk2Title: "Learning Budget",
        perk2Desc: "$1,500/year learning stipend for courses, books, conferences, or tutorials.",
        perk3Title: "Unlimited Vacation",
        perk3Desc: "Take the time you need to recharge. We recommend a minimum of 4 weeks per year.",
        perk4Title: "Equity & Growth",
        perk4Desc: "Everyone is an owner. We offer stock options and competitive salaries for all roles.",
        jobsTitle: "Open Positions",
        allDepts: "All Departments",
        deptEng: "Engineering",
        deptDesign: "Design & UX",
        deptMarketing: "Marketing & Growth",
        searchPh: "Search positions...",
        noJobs: "No positions matched your search criteria.",
        btnApply: "Apply Now",
        locRemote: "Remote",
        typeFull: "Full-Time",
        typePart: "Part-Time",
        modalTitle: "Apply for",
        lblFullName: "Full Name",
        phFullName: "John Doe",
        lblEmail: "Email Address",
        phEmail: "john@example.com",
        lblResume: "Upload Resume / CV",
        phResume: "Choose PDF or Word document",
        lblCoverLetter: "Why are you a good fit?",
        phCoverLetter: "Tell us about your achievements and why you want to join us...",
        btnSubmit: "Submit Application",
        btnSubmitting: "Sending application...",
        appSuccessTitle: "Application Submitted!",
        appSuccessTxt: "Thank you for applying. Our recruiting team will review your application and contact you soon.",
        requiredErr: "Please fill out all required fields."
    },
    ar: {
        title: "شاركنا بناء مستقبل تقنيات التوظيف",
        subtitle: "انضم إلى فريقنا الذي يعمل عن بُعد بالكامل من مهندسين، مصممين، ومبدعين لتطوير الجيل القادم من أدوات السير الذاتية بالذكاء الاصطناعي.",
        viewOpenings: "عرض الوظائف الشاغرة",
        cultureTitle: "لماذا ستحب العمل معنا؟",
        cultureSubtitle: "نحن نؤمن بالاستقلالية العالية، والتطوير المستمر، وبناء منتجات تساعد الناس بشكل حقيقي.",
        perk1Title: "العمل عن بُعد بالكامل",
        perk1Desc: "اعمل من أي مكان في العالم. نوفر لك بدلاً مالياً لتجهيز مكتبك المنزلي المثالي.",
        perk2Title: "ميزانية التعليم والتطوير",
        perk2Desc: "1,500 دولار سنوياً للمشاركة في الكورسات، الكتب، المؤتمرات، أو الدروس التعليمية.",
        perk3Title: "إجازات غير محدودة",
        perk3Desc: "خذ الوقت الكافي لإعادة شحن طاقتك. نوصي بحد أدنى 4 أسابيع من الإجازة سنوياً.",
        perk4Title: "الأسهم والنمو المهني",
        perk4Desc: "الجميع شريك في النجاح. نقدم خيارات أسهم في الشركة بالإضافة لرواتب تنافسية.",
        jobsTitle: "الوظائف المتاحة حالياً",
        allDepts: "جميع الأقسام",
        deptEng: "الهندسة والبرمجة",
        deptDesign: "التصميم وتجربة المستخدم",
        deptMarketing: "التسويق والنمو",
        searchPh: "ابحث عن وظيفة...",
        noJobs: "لم نجد وظائف تطابق معايير بحثك حالياً.",
        btnApply: "تقدم الآن",
        locRemote: "عن بُعد",
        typeFull: "دوام كامل",
        typePart: "دوام جزئي",
        modalTitle: "التقديم لوظيفة",
        lblFullName: "الاسم الكامل",
        phFullName: "مثال: يحيى محمد",
        lblEmail: "البريد الإلكتروني",
        phEmail: "yahia@example.com",
        lblResume: "تحميل السيرة الذاتية",
        phResume: "اختر ملف PDF أو Word",
        lblCoverLetter: "لماذا أنت مناسب لهذا الدور؟",
        phCoverLetter: "أخبرنا باختصار عن إنجازاتك ولماذا ترغب بالانضمام إلينا...",
        btnSubmit: "إرسال طلب التقديم",
        btnSubmitting: "جاري إرسال الطلب...",
        appSuccessTitle: "تم تقديم الطلب بنجاح!",
        appSuccessTxt: "شكراً لتقديمك. سيقوم فريق التوظيف بمراجعة ملفك والتواصل معك قريباً جداً.",
        requiredErr: "يرجى ملء جميع الحقول المطلوبة."
    }
};

const JOBS_DATA = [
    {
        id: 1,
        title: { en: "Senior Frontend Engineer (React)", ar: "مهندس واجهات أمامية أول (ريأكت)" },
        department: "Engineering",
        location: "Remote",
        type: "Full-Time",
        description: {
            en: "We are looking for a Senior React Developer to lead the development of our interactive CV editor and live layout render engines.",
            ar: "نبحث عن مطور ريأكت محترف لقيادة وتطوير محرر السيرة الذاتية التفاعلي ومحركات رندر التصاميم المباشرة."
        }
    },
    {
        id: 2,
        title: { en: "AI Integration Specialist", ar: "أخصائي دمج نماذج الذكاء الاصطناعي" },
        department: "Engineering",
        location: "Remote",
        type: "Full-Time",
        description: {
            en: "Help us design and implement high-efficiency prompt chains and integrate Gemini LLM systems directly into our user assistants.",
            ar: "ساعدنا في تصميم وتطبيق سلاسل الأوامر الذكية عالية الكفاءة ودمج أنظمة Gemini مباشرة في مساعد المستخدم."
        }
    },
    {
        id: 3,
        title: { en: "Lead Product Designer (UI/UX)", ar: "رئيس مصممي المنتجات (تفاعلية وواجهات)" },
        department: "Design",
        location: "Remote",
        type: "Full-Time",
        description: {
            en: "Lead our product design vision, create stunning printable layouts, and deliver high-fidelity interactive user interfaces.",
            ar: "قد الرؤية التصميمية للمنتج، وصمم قوالب سيرة ذاتية رائعة قابلة للطباعة، وواجهات مستخدم تفاعلية راقية."
        }
    },
    {
        id: 4,
        title: { en: "Performance Marketing Manager", ar: "مدير تسويق رقمي وأداء" },
        department: "Marketing",
        location: "Remote",
        type: "Full-Time",
        description: {
            en: "Scale our user acquisition channels, run campaigns, and manage SEO strategies to grow AI CV Builder globally.",
            ar: "قم بزيادة قنوات جذب المستخدمين، وإدارة الحملات الإعلانية واستراتيجيات الـ SEO لتوسيع انتشار المنصة عالمياً."
        }
    }
];

export default function Career() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language] || TRANSLATIONS.en;
    const isRtl = language === 'ar';

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');
    const [activeJobModal, setActiveJobModal] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        resume: null,
        coverLetter: ''
    });

    const filteredJobs = JOBS_DATA.filter(job => {
        const matchesSearch = job.title[language].toLowerCase().includes(searchQuery.toLowerCase()) || 
                              job.description[language].toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = selectedDept === 'All' || 
                            (selectedDept === 'Engineering' && job.department === 'Engineering') ||
                            (selectedDept === 'Design' && job.department === 'Design') ||
                            (selectedDept === 'Marketing' && job.department === 'Marketing');
        return matchesSearch && matchesDept;
    });

    const handleApplyClick = (job) => {
        setActiveJobModal(job);
        setForm({ name: '', email: '', resume: null, coverLetter: '' });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email) {
            Swal.fire({
                icon: 'error',
                title: isRtl ? 'خطأ' : 'Error',
                text: t.requiredErr,
                confirmButtonColor: 'var(--color-primary)'
            });
            return;
        }

        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setActiveJobModal(null);
            Swal.fire({
                icon: 'success',
                title: t.appSuccessTitle,
                text: t.appSuccessTxt,
                confirmButtonColor: 'var(--color-primary)'
            });
        }, 1500);
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            <Navbar />

            {/* Hero Header */}
            <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32 bg-slate-50 dark:bg-slate-900/20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse"></div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        <FontAwesomeIcon icon={faBriefcase} />
                        Careers Page
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto text-slate-950 dark:text-white">
                        {t.title}
                    </h1>
                    <p className="text-slate-650 dark:text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                        {t.subtitle}
                    </p>
                    <div className="pt-4">
                        <a href="#openings" className="bg-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all inline-flex items-center gap-2 hover:-translate-y-0.5">
                            {t.viewOpenings}
                            <FontAwesomeIcon icon={faArrowRight} className="rtl:rotate-180 text-sm" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Culture / Perks Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.cultureTitle}</h2>
                    <p className="text-slate-500 dark:text-slate-400">{t.cultureSubtitle}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: faLaptopHouse, title: t.perk1Title, desc: t.perk1Desc, color: 'text-blue-500 bg-blue-500/10' },
                        { icon: faGraduationCap, title: t.perk2Title, desc: t.perk2Desc, color: 'text-amber-500 bg-amber-500/10' },
                        { icon: faUmbrellaBeach, title: t.perk3Title, desc: t.perk3Desc, color: 'text-emerald-500 bg-emerald-500/10' },
                        { icon: faRocket, title: t.perk4Title, desc: t.perk4Desc, color: 'text-rose-500 bg-rose-500/10' }
                    ].map((perk, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center space-y-4 hover:border-primary/20 hover:shadow-md transition-all group">
                            <div className={`size-14 rounded-2xl flex items-center justify-center text-2xl ${perk.color} group-hover:scale-110 transition-transform`}>
                                <FontAwesomeIcon icon={perk.icon} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-850 dark:text-white">{perk.title}</h3>
                            <p className="text-slate-550 dark:text-slate-400 text-sm leading-relaxed">{perk.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Jobs Board Section */}
            <section id="openings" className="py-20 bg-slate-50/50 dark:bg-slate-900/10 border-t border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.jobsTitle}</h2>
                    </div>

                    {/* Filter and search bar */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.searchPh}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                            />
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-450 dark:text-slate-500 pointer-events-none text-[20px]">search</span>
                        </div>

                        {/* Department Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'All', label: t.allDepts },
                                { id: 'Engineering', label: t.deptEng },
                                { id: 'Design', label: t.deptDesign },
                                { id: 'Marketing', label: t.deptMarketing }
                            ].map(dept => (
                                <button
                                    key={dept.id}
                                    onClick={() => setSelectedDept(dept.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedDept === dept.id
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850'
                                        }`}
                                >
                                    {dept.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Job Cards */}
                    <div className="space-y-4">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map(job => (
                                <div key={job.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/20 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                    <div className="space-y-3 max-w-2xl">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-xl font-bold text-slate-905 dark:text-white">{job.title[language]}</h3>
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider">{job.department}</span>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                            {job.description[language]}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                                            <span className="flex items-center gap-1"><FontAwesomeIcon icon={faMapMarkerAlt} />{t.locRemote}</span>
                                            <span className="flex items-center gap-1"><FontAwesomeIcon icon={faClock} />{job.type === 'Full-Time' ? t.typeFull : t.typePart}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleApplyClick(job)}
                                        className="bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-850 dark:hover:bg-white text-white font-bold py-2.5 px-5 rounded-xl text-sm transition-all sm:self-center self-start"
                                    >
                                        {t.btnApply}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                <span className="material-symbols-outlined text-5xl text-slate-350 dark:text-slate-600 mb-2">work_off</span>
                                <p className="text-slate-450 dark:text-slate-500 font-medium">{t.noJobs}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Application Drawer / Modal */}
            {activeJobModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div onClick={() => setActiveJobModal(null)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
                    
                    {/* Modal container */}
                    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-205 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
                        {/* Close button */}
                        <button onClick={() => setActiveJobModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2">
                            <FontAwesomeIcon icon={faTimes} size="lg" />
                        </button>

                        <div className="mb-6 space-y-1 pr-6">
                            <span className="text-[10px] font-black uppercase text-primary tracking-widest">{t.modalTitle}</span>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                                {activeJobModal.title[language]}
                            </h3>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-350">{t.lblFullName} *</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder={t.phFullName}
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-350">{t.lblEmail} *</label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder={t.phEmail}
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-350">{t.lblResume} *</label>
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center bg-slate-50/50 dark:bg-slate-800/20 hover:border-primary/40 transition-colors relative cursor-pointer">
                                    <input
                                        type="file"
                                        required
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setForm(prev => ({ ...prev, resume: e.target.files[0] }))}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <span className="material-symbols-outlined text-slate-400 text-3xl mb-1">upload_file</span>
                                    <p className="text-xs font-semibold text-slate-500">{form.resume ? form.resume.name : t.phResume}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-350">{t.lblCoverLetter}</label>
                                <textarea
                                    value={form.coverLetter}
                                    onChange={(e) => setForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                                    placeholder={t.phCoverLetter}
                                    rows="4"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-primary hover:brightness-110 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                                        {t.btnSubmitting}
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        {t.btnSubmit}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
