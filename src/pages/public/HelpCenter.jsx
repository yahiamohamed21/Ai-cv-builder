import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/layout/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faFileSignature, faRobot, faDownload, faChevronDown, faChevronUp, faQuestionCircle, faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const TRANSLATIONS = {
    en: {
        title: "How can we help you?",
        subtitle: "Search our knowledge base or browse categories below to find answers to your questions.",
        searchPh: "Search for answers (e.g. PDF export, refund, template...)",
        cat1Title: "Account & Billing",
        cat1Desc: "Manage subscriptions, update payment info, or delete account.",
        cat2Title: "Resume Editor",
        cat2Desc: "Learn how to use templates, format text, and add sections.",
        cat3Title: "AI Assistant",
        cat3Desc: "Tips for using Gemini prompts and tailoring bullet points.",
        cat4Title: "Downloads & ATS",
        cat4Desc: "Resolving PDF export issues and optimizing for parser systems.",
        stillNeedHelp: "Still need help?",
        stillNeedHelpSub: "Can't find the answer you're looking for? Drop us a line and our support team will get back to you.",
        lblFullName: "Your Name",
        phFullName: "John Doe",
        lblEmail: "Email Address",
        phEmail: "john@example.com",
        lblMessage: "Your Message",
        phMessage: "Describe your issue in detail...",
        btnSubmit: "Send Ticket",
        btnSubmitting: "Sending ticket...",
        ticketSuccessTitle: "Ticket Received!",
        ticketSuccessTxt: "We have received your support ticket. Our team will contact you at your email address within 2-4 business hours.",
        faqTitle: "Frequently Asked Questions",
        requiredErr: "Please fill out all required fields."
    },
    ar: {
        title: "كيف يمكننا مساعدتك اليوم؟",
        subtitle: "ابحث في قاعدة المعرفة الخاصة بنا أو تصفح الأقسام أدناه للعثور على إجابات لأسئلتك.",
        searchPh: "ابحث عن إجابات (مثل: تصدير PDF، استرداد الأموال، القوالب...)",
        cat1Title: "الحساب والاشتراكات",
        cat1Desc: "إدارة اشتراكك، تحديث بيانات الدفع، أو حذف الحساب.",
        cat2Title: "محرر السيرة الذاتية",
        cat2Desc: "تعلم كيفية استخدام القوالب، وتنسيق النصوص، وإضافة الأقسام.",
        cat3Title: "المساعد الذكي (AI)",
        cat3Desc: "نصائح وإرشادات حول استخدام أوامر الذكاء الاصطناعي وصياغة المهارات.",
        cat4Title: "التحميل وأنظمة الـ ATS",
        cat4Desc: "حل مشكلات تصدير ملفات PDF وتحسين ملفك لتجاوز الفرز الآلي.",
        stillNeedHelp: "لم تجد ما تبحث عنه؟",
        stillNeedHelpSub: "إذا لم تعثر على الإجابة المناسبة، أرسل لنا رسالة وسيقوم فريق الدعم بالرد عليك في أقرب وقت.",
        lblFullName: "الاسم الكامل",
        phFullName: "مثال: يحيى محمد",
        lblEmail: "البريد الإلكتروني",
        phEmail: "yahia@example.com",
        lblMessage: "تفاصيل الرسالة / المشكلة",
        phMessage: "يرجى وصف المشكلة بالتفصيل لمساعدتك بشكل أسرع...",
        btnSubmit: "إرسال تذكرة الدعم",
        btnSubmitting: "جاري الإرسال...",
        ticketSuccessTitle: "تم استلام رسالتك!",
        ticketSuccessTxt: "تلقينا تذكرة الدعم الخاصة بك. سيقوم فريقنا بالتواصل معك عبر بريدك الإلكتروني خلال 2-4 ساعات عمل.",
        faqTitle: "الأسئلة الشائعة",
        requiredErr: "يرجى ملء جميع الحقول المطلوبة."
    }
};

const FAQ_DATA = [
    {
        id: 1,
        category: "Billing",
        question: {
            en: "Can I cancel my Premium subscription at any time?",
            ar: "هل يمكنني إلغاء اشتراكي المتميز في أي وقت؟"
        },
        answer: {
            en: "Yes, absolutely. You can cancel your subscription at any time from your Account Settings. You will retain access to Pro features until the end of your billing cycle.",
            ar: "نعم، بالتأكيد. يمكنك إلغاء اشتراكك في أي وقت من إعدادات الحساب. وستظل ميزات Pro متاحة لك حتى نهاية دورة الفوترة الحالية."
        }
    },
    {
        id: 2,
        category: "Editor",
        question: {
            en: "How do I change the language or template of my CV?",
            ar: "كيف أقوم بتغيير لغة السيرة الذاتية أو القالب الخاص بها؟"
        },
        answer: {
            en: "In the CV Builder, you can switch templates anytime in the 'Templates' tab. To change the language, use the global language switcher in the header to change the UI, and input your details in your preferred language.",
            ar: "في منشئ السيرة الذاتية، يمكنك تبديل القالب في أي وقت من خلال تبويب 'القوالب'. ولتغيير لغة الواجهة، استخدم مفتاح تبديل اللغة الموجود في الهيدر، ثم قم بكتابة تفاصيل سيرتك الذاتية باللغة التي تفضلها."
        }
    },
    {
        id: 3,
        category: "AI",
        question: {
            en: "How does the AI Resume Assistant work?",
            ar: "كيف يعمل المساعد الذكي للسيرة الذاتية بالذكاء الاصطناعي؟"
        },
        answer: {
            en: "Our assistant utilizes Google's Gemini models. It analyzes your job title and descriptions to offer contextual suggestions, improve vocabulary, and tailor your CV for specific job postings.",
            ar: "يعتمد مساعدنا على نماذج Google Gemini. حيث يقوم بتحليل المسمى الوظيفي والوصف الوظيفي لتقديم اقتراحات سياقية، وتحسين المفردات، وتخصيص سيرتك الذاتية لتناسب عروض وظائف معينة."
        }
    },
    {
        id: 4,
        category: "Downloads",
        question: {
            en: "Why is the PDF download layout looking different from the preview?",
            ar: "لماذا يختلف تنسيق ملف PDF الذي تم تحميله عن المعاينة المباشرة؟"
        },
        answer: {
            en: "We optimize PDF downloads for printing. Make sure that when the print dialog opens, you set the margins to 'None' or 'Default' and enable 'Background Graphics' in your browser settings to ensure a pixel-perfect match.",
            ar: "لقد قمنا بتحسين تحميلات PDF لتناسب الطباعة. تأكد عند فتح نافذة الطباعة في المتصفح من ضبط الهوامش على 'بلا هامش' (None) وتفعيل خيار 'الرسومات الخلفية' (Background Graphics) لضمان تطابق تام."
        }
    },
    {
        id: 5,
        category: "Billing",
        question: {
            en: "Do you offer refunds?",
            ar: "هل تقدمون خيار استرداد الأموال؟"
        },
        answer: {
            en: "Yes, we offer a 7-day money-back guarantee. If you are not satisfied with AI CV Builder, contact support within 7 days of purchase and we will issue a full refund.",
            ar: "نعم، نحن نقدم ضمان استرداد الأموال لمدة 7 أيام. إذا لم تكن راضياً عن المنصة، تواصل مع الدعم الفني في غضون 7 أيام من الشراء وسنعيد لك المبلغ كاملاً."
        }
    }
];

export default function HelpCenter() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language] || TRANSLATIONS.en;
    const isRtl = language === 'ar';

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const toggleFaq = (id) => {
        setExpandedFaq(prev => (prev === id ? null : id));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
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
            setForm({ name: '', email: '', message: '' });
            Swal.fire({
                icon: 'success',
                title: t.ticketSuccessTitle,
                text: t.ticketSuccessTxt,
                confirmButtonColor: 'var(--color-primary)'
            });
        }, 1500);
    };

    const filteredFaqs = FAQ_DATA.filter(faq => {
        const matchesSearch = faq.question[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                              faq.answer[language].toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = selectedCategory === 'All' || 
                           (selectedCategory === 'Billing' && faq.category === 'Billing') ||
                           (selectedCategory === 'Editor' && faq.category === 'Editor') ||
                           (selectedCategory === 'AI' && faq.category === 'AI') ||
                           (selectedCategory === 'Downloads' && faq.category === 'Downloads');
        return matchesSearch && matchesCat;
    });

    return (
        <div className="flex flex-col min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            <Navbar />

            {/* Help Search Hero */}
            <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/20 dark:to-transparent border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-[20%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        <FontAwesomeIcon icon={faQuestionCircle} />
                        Support Center
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight">
                        {t.title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>

                    {/* Big Search Input */}
                    <div className="relative max-w-xl mx-auto pt-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.searchPh}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 ltr:pl-12 rtl:pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-lg transition-all"
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                    </div>
                </div>
            </section>

            {/* Category Grid */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { id: 'Billing', title: t.cat1Title, desc: t.cat1Desc, icon: faUser, color: 'text-blue-500 bg-blue-500/10' },
                        { id: 'Editor', title: t.cat2Title, desc: t.cat2Desc, icon: faFileSignature, color: 'text-emerald-500 bg-emerald-500/10' },
                        { id: 'AI', title: t.cat3Title, desc: t.cat3Desc, icon: faRobot, color: 'text-purple-500 bg-purple-500/10' },
                        { id: 'Downloads', title: t.cat4Title, desc: t.cat4Desc, icon: faDownload, color: 'text-rose-500 bg-rose-500/10' }
                    ].map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(prev => prev === cat.id ? 'All' : cat.id)}
                            className={`p-6 rounded-2xl border text-left rtl:text-right transition-all flex flex-col space-y-4 hover:shadow-md group ${selectedCategory === cat.id
                                ? 'border-primary bg-primary/5 shadow-sm'
                                : 'border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900'
                                }`}
                        >
                            <div className={`size-12 rounded-xl flex items-center justify-center text-xl ${cat.color} group-hover:scale-105 transition-transform`}>
                                <FontAwesomeIcon icon={cat.icon} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white text-[17px] mb-1">{cat.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{cat.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Accordion FAQ list */}
            <section className="py-12 bg-slate-50/50 dark:bg-slate-900/10 border-t border-slate-200/50 dark:border-slate-800/50 w-full">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-8">{t.faqTitle}</h2>

                    <div className="space-y-4">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq) => {
                                const isOpen = expandedFaq === faq.id;
                                return (
                                    <div
                                        key={faq.id}
                                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                                    >
                                        <button
                                            onClick={() => toggleFaq(faq.id)}
                                            className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left rtl:text-right font-bold text-slate-850 dark:text-white hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors"
                                        >
                                            <span className="text-[15px] sm:text-base leading-snug">{faq.question[language]}</span>
                                            <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="text-slate-400 text-sm shrink-0" />
                                        </button>
                                        
                                        <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[300px] pb-5 border-t border-slate-100 dark:border-slate-800 pt-4' : 'max-h-0'}`}>
                                            <p className="text-slate-600 dark:text-slate-400 text-[14px] leading-relaxed antialiased">
                                                {faq.answer[language]}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-4xl text-slate-350 dark:text-slate-650 mb-2">find_in_page</span>
                                <p className="text-slate-450 dark:text-slate-500 font-medium">No results found matching your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Ticket Submission Form */}
            <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl p-6 sm:p-10 grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-5 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t.stillNeedHelp}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t.stillNeedHelpSub}</p>
                        </div>
                        
                        <div className="space-y-4 pt-2 font-medium text-xs text-slate-500">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <span>support@aicvbuilder.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <span>+1 (800) 555-0199</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                </div>
                                <span>San Francisco, CA HQ</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 border-t md:border-t-0 md:border-l rtl:md:border-l-0 rtl:md:border-r border-slate-100 dark:border-slate-800 pt-6 md:pt-0 md:pl-8 rtl:md:pl-0 rtl:md:pr-8">
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">{t.lblFullName} *</label>
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
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">{t.lblEmail} *</label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder={t.phEmail}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">{t.lblMessage} *</label>
                                <textarea
                                    required
                                    value={form.message}
                                    onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                                    placeholder={t.phMessage}
                                    rows="4"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 dark:shadow-none"
                            >
                                {submitting ? (
                                    <>
                                        <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                                        {t.btnSubmitting}
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                        {t.btnSubmit}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
