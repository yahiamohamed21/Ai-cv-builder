import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/layout/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faUser, faCalendarAlt, faChevronRight, faTimes, faBookmark } from '@fortawesome/free-solid-svg-icons';

const TRANSLATIONS = {
    en: {
        title: "Career Advice & Insights",
        subtitle: "Expert tips, templates guidance, and AI hacks to accelerate your job hunt and land your dream role.",
        featured: "Featured Article",
        readMore: "Read Article",
        categoryAll: "All Articles",
        categoryResume: "Resume Tips",
        categoryInterview: "Interview Prep",
        categoryAi: "AI Tools",
        noArticles: "No articles matched your criteria.",
        share: "Share Article",
        backToBlog: "Back to Blog",
        readTime: "min read"
    },
    ar: {
        title: "نصائح وإرشادات مهنية",
        subtitle: "نصائح من خبراء التوظيف، وتوجيهات حول كتابة السيرة الذاتية واستخدام الذكاء الاصطناعي لتسريع قبولك الوظيفي.",
        featured: "المقال المميز",
        readMore: "اقرأ المقال",
        categoryAll: "جميع المقالات",
        categoryResume: "نصائح السيرة الذاتية",
        categoryInterview: "التحضير للمقابلات",
        categoryAi: "أدوات الذكاء الاصطناعي",
        noArticles: "لا توجد مقالات تطابق خيارات بحثك حالياً.",
        share: "مشاركة المقال",
        backToBlog: "العودة للمدونة",
        readTime: "دقائق قراءة"
    }
};

const ARTICLES_DATA = [
    {
        id: 1,
        featured: true,
        category: "Resume",
        tag: { en: "Resume Tips", ar: "نصائح السيرة الذاتية" },
        title: {
            en: "How to Beat the ATS (Applicant Tracking Systems) in 2026",
            ar: "كيف تتغلب على أنظمة الفرز الآلي (ATS) للسير الذاتية في عام 2026"
        },
        excerpt: {
            en: "Most companies use software to scan resumes before a human recruiter sees them. Learn the formatting rules and keyword strategies to ensure you pass the digital screen.",
            ar: "تستخدم معظم الشركات برمجيات لفحص السير الذاتية قبل أن يراها مسؤول التوظيف. تعلم قواعد التنسيق واستراتيجيات الكلمات المفتاحية لضمان اجتياز التصفية الرقمية."
        },
        body: {
            en: `Applicant Tracking Systems (ATS) are used by over 98% of Fortune 500 companies to filter job applications. If your resume isn't optimized for these systems, it may never reach a human recruiter.

Here are the key strategies to beat the ATS in 2026:

1. Use Simple Formatting: Avoid text boxes, tables, headers, footers, or complex graphics in your base resume. ATS parser systems read text linearly and these visual elements often scramble the text.
2. Integrate Relevant Keywords: Carefully read the job description and extract core skills, tool names, and qualifications. Integrate these keywords naturally into your experience bullets and skills list.
3. Choose the Right File Format: While PDFs are visually stable, make sure they are 'text-searchable'. A scanned image PDF cannot be read by an ATS. Plain text or standard Word (.docx) files are also highly parsed.
4. Quantify Your Achievements: Recruiters and algorithms love numbers. Instead of writing 'Responsible for sales', write 'Increased quarterly sales by 28% through targeted email campaigns.'

By aligning your resume structure and phrasing with these rules, you will drastically increase your call-back rate.`,
            ar: `تستخدم أكثر من 98% من شركات Fortune 500 أنظمة تتبع المتقدمين (ATS) لتصفية طلبات التوظيف. إذا لم تكن سيرتك الذاتية متوافقة مع هذه الأنظمة، فقد لا تصل أبداً إلى مسؤول التوظيف البشري.

إليك أهم الاستراتيجيات لتجاوز نظام الـ ATS في عام 2026:

1. استخدم تنسيقاً بسيطاً: تجنب مربعات النصوص، الجداول، الجداول المعقدة، والرسوم البيانية في سيرتك الذاتية الأساسية. تقرأ أنظمة ATS النصوص بشكل خطي، وغالباً ما تتسبب هذه العناصر المرئية في تشويش قراءة البيانات.
2. أدمج الكلمات المفتاحية المناسبة: اقرأ الوصف الوظيفي بعناية واستخلص المهارات الأساسية، أسماء الأدوات، والمؤهلات المطلوبة. قم بدمج هذه الكلمات بشكل طبيعي في نقاط خبراتك وقائمة مهاراتك.
3. اختر صيغة الملف الصحيحة: على الرغم من أن ملفات PDF مستقرة بصرياً، تأكد من أنها ملفات PDF قابلة للبحث النصي (ليست صورة ممسوحة ضوئياً). ملفات Word (.docx) القياسية تعتبر أيضاً ممتازة جداً للقراءة والفرز.
4. حدد إنجازاتك بالأرقام: تحب خوارزميات التوظيف الأرقام والنسب. بدلاً من كتابة 'مسؤول عن المبيعات'، اكتب 'نجحت في زيادة المبيعات الربع سنوية بنسبة 28% من خلال حملات بريدية مستهدفة'.

من خلال محاذاة هيكل سيرتك الذاتية وصياغتها مع هذه القواعد، ستزيد معدل الاتصال بك لإجراء المقابلات بشكل كبير.`
        },
        author: "Sarah Jenkins, HR Director",
        date: "June 12, 2026",
        readTime: 6,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        featured: false,
        category: "Interview",
        tag: { en: "Interview Prep", ar: "التحضير للمقابلات" },
        title: {
            en: "5 Common Job Interview Mistakes and How to Avoid Them",
            ar: "5 أخطاء شائعة في مقابلات العمل وكيفية تجنبها"
        },
        excerpt: {
            en: "Prepare effectively for your next job interview. From lack of research to poor follow-up, here is how you can stand out positively.",
            ar: "استعد بفعالية لمقابلتك القادمة. من نقص البحث عن الشركة إلى المتابعة الضعيفة بعد المقابلة، إليك كيف يمكنك إبراز نفسك بشكل إيجابي."
        },
        body: {
            en: `Landing an interview is a huge win, but translating it into an offer requires absolute polish. Many qualified candidates trip up on predictable hurdles.

Avoid these 5 common mistakes:

1. Not Researching the Company: Knowing the job description is not enough. Spend 30 minutes reading the company's recent news, product launches, culture values, and leadership profiles on LinkedIn.
2. The 'Tell Me About Yourself' Trap: Don't read your resume line-by-line. Instead, share a 2-minute elevator pitch highlighting your journey, your biggest career achievement, and why this specific role excites you.
3. Lack of Questions for the Interviewer: When they ask 'Do you have any questions for us?', saying 'No' is a major red flag. Always ask 2-3 strategic questions (e.g. 'What does success look like in the first 90 days?').
4. Weak Body Language (Even on Zoom): Maintain solid eye contact, sit up straight, and express positive energy. For remote interviews, check your lighting, camera position, and background clutter ahead of time.
5. Forgetting to Follow Up: Within 24 hours of the interview, send a brief, personalized thank-you email to every interviewer. Reiterate your enthusiasm and mention a specific topic discussed during the call.`,
            ar: `الحصول على فرصة مقابلة عمل هو نجاح كبير، ولكن تحويلها إلى عرض عمل يتطلب دقة وذكاء. يقع العديد من المرشحين المؤهلين في عقبات كان يمكن التنبؤ بها وتجنبها.

تجنب هذه الأخطاء الخمسة الشائعة:

1. عدم البحث عن الشركة: معرفة الوصف الوظيفي ليست كافية. اقضِ 30 دقيقة في قراءة أحدث أخبار الشركة، إطلاقات منتجاتها، قيمها المؤسسية، وصفحات مسؤوليها على لينكد إن.
2. فخ سؤال 'أخبرنا عن نفسك': لا تقرأ سيرتك الذاتية سطراً بسطر. بدلاً من ذلك، شارك عرضاً ترويجياً شخصياً لمدة دقيقتين يسلط الضوء على رحلتك المهنية، أكبر إنجاز حققته، ولماذا يثير هذا الدور اهتمامك.
3. عدم طرح أسئلة على مسؤول المقابلة: عندما يسألونك 'هل لديك أي أسئلة لنا؟'، فإن قول 'لا' يعتبر إشارة سلبية جداً. اطرح دائماً سؤالين أو ثلاثة أسئلة استراتيجية (مثل: 'ماذا يمثل النجاح في هذا الدور خلال أول 90 يوماً؟').
4. لغة الجسد الضعيفة (حتى عبر زووم): حافظ على التواصل البصري الجيد، واجلس بانتظام، وأظهر طاقة إيجابية. للمقابلات عن بُعد، اختبر الإضاءة، زاوية الكاميرا، والهدوء قبل المقابلة بوقت كافٍ.
5. نسيان المتابعة بعد المقابلة: في غضون 24 ساعة من المقابلة، أرسل رسالة شكر بريدية قصيرة ومخصصة لكل من أجرى معك المقابلة. أعد تأكيد حماسك وتطرق لنقطة مميزة نوقشت أثناء المكالمة.`
        },
        author: "Alex Rivera, Tech Recruiter",
        date: "June 08, 2026",
        readTime: 4,
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        featured: false,
        category: "AI",
        tag: { en: "AI Tools", ar: "أدوات الذكاء الاصطناعي" },
        title: {
            en: "Writing Perfect Prompts for AI-Generated Resume Summaries",
            ar: "كتابة الأوامر المثالية لتوليد ملخص السيرة الذاتية بالذكاء الاصطناعي"
        },
        excerpt: {
            en: "Harness Gemini to draft professional profile summaries. Discover prompt structures that extract your true values without sounding generic.",
            ar: "سخر قدرات نموذج Gemini لصياغة ملخصات مهنية جذابة. اكتشف هياكل الأوامر التي تبرز قيمتك الحقيقية دون أن تبدو مكررة أو عامة."
        },
        body: {
            en: `The summary section is the first thing a recruiter reads on your CV. If it sounds like a generic template, they'll lose interest. While AI generators can write this in seconds, the output is only as good as the prompt you feed it.

Here is how to structure a prompt to get a stellar resume summary:

1. Give the AI a Persona: Tell the AI who it is (e.g. 'You are an expert tech resume writer').
2. Provide Specific Input: Include your years of experience, core industry stack (React, Node, Cloud), and 1-2 major achievements.
3. Constrain the Output: Tell it to keep it under 3-4 sentences and avoid clichés (like 'hard-working self-starter').
4. Specify the Tone: Request a tone that matches your targets (e.g. 'Confident and action-oriented').

Example Prompt Template:
'Act as a professional resume editor. Write a 3-sentence profile summary for a Senior Product Designer with 6 years of experience in SaaS platforms. Highlight my design system leadership and focus the tone on data-driven growth. Keep it professional and ATS-optimized.'`,
            ar: `قسم الملخص المهني هو أول ما يقرأه مسؤول التوظيف في سيرتك الذاتية. إذا كان يبدو كقالب مكرر، سيفقدون الاهتمام سريعاً. على الرغم من أن مولدات الذكاء الاصطناعي يمكنها كتابته في ثوانٍ، إلا أن جودة النتيجة تعتمد كلياً على الأمر (Prompt) الذي تدخله.

إليك كيفية صياغة الأمر للحصول على ملخص سيرة ذاتية رائع:

1. امنح الذكاء الاصطناعي شخصية محددة: أخبره من هو (مثل: 'أنت خبير محترف في كتابة السير الذاتية التقنية').
2. وفر مدخلات محددة ودقيقة: أدخل عدد سنوات خبرتك، مجالك وتخصصك الأساسي (مثل: ريأكت، نود، السحابة)، وإنجازاً أو إنجازين هامين.
3. حدد قيوداً للنتيجة: اطلب منه إبقاء النص في حدود 3-4 جمل وتجنب العبارات المكررة (مثل 'مجدّ ومحب للعمل الجماعي').
4. حدد النبرة المطلوبة: اطلب نبرة تطابق أهدافك (مثل: 'واثقة وتعتمد على لغة الأرقام والأفعال القوية').

مثال على أمر كتابة الملخص:
'تصرف كخبير سير ذاتية محترف. اكتب ملخصاً مهنياً من 3 جمل لمصمم منتجات أول لديه 6 سنوات من الخبرة في منصات الـ SaaS. ركز على قيادتي لأنظمة التصميم واجعل النبرة تدل على النمو المعتمد على البيانات. اجعل الملخص متوافقاً مع أنظمة الـ ATS.'`
        },
        author: "Marcus Vance, AI Strategist",
        date: "May 29, 2026",
        readTime: 5,
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
    }
];

export default function Blog() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language] || TRANSLATIONS.en;
    const isRtl = language === 'ar';

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeArticleModal, setActiveArticleModal] = useState(null);

    const filteredArticles = ARTICLES_DATA.filter(art => {
        if (selectedCategory === 'All') return true;
        return art.category === selectedCategory;
    });

    const featuredArticle = ARTICLES_DATA.find(art => art.featured);

    return (
        <div className="flex flex-col min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            <Navbar />

            {/* Header section */}
            <section className="relative overflow-hidden pt-20 pb-16 bg-slate-50 dark:bg-slate-900/10 border-b border-slate-250/30 dark:border-slate-800/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        <FontAwesomeIcon icon={faBookOpen} />
                        Insights Hub
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight">
                        {t.title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                        {t.subtitle}
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-16">
                
                {/* 1. Featured Spotlight Card */}
                {featuredArticle && selectedCategory === 'All' && (
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden grid lg:grid-cols-12 hover:shadow-2xl transition-shadow duration-300">
                        <div className="lg:col-span-7 h-64 sm:h-96 lg:h-full relative overflow-hidden" data-alt="Office writing desk setup with computer and notebook layout">
                            <img src={featuredArticle.image} alt={featuredArticle.title[language]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg">
                                {t.featured}
                            </div>
                        </div>
                        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center space-y-6">
                            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                                <span>{featuredArticle.tag[language]}</span>
                                <span>•</span>
                                <span>{featuredArticle.readTime} {t.readTime}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                {featuredArticle.title[language]}
                            </h2>
                            <p className="text-slate-550 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                                {featuredArticle.excerpt[language]}
                            </p>
                            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                                <div className="flex items-center gap-3">
                                    <div className="size-9 rounded-full bg-slate-105 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                        <FontAwesomeIcon icon={faUser} className="text-sm" />
                                    </div>
                                    <div className="text-[12px]">
                                        <p className="font-bold text-slate-800 dark:text-white">{featuredArticle.author}</p>
                                        <p className="text-slate-450">{featuredArticle.date}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveArticleModal(featuredArticle)}
                                    className="bg-primary hover:brightness-110 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 transition-all"
                                >
                                    {t.readMore}
                                    <FontAwesomeIcon icon={faChevronRight} className="rtl:rotate-180 text-[10px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Category Filters & Cards deck */}
                <div className="space-y-8">
                    {/* Category Selection pills */}
                    <div className="flex flex-wrap justify-center gap-2.5 border-b border-slate-100 dark:border-slate-850 pb-6">
                        {[
                            { id: 'All', label: t.categoryAll },
                            { id: 'Resume', label: t.categoryResume },
                            { id: 'Interview', label: t.categoryInterview },
                            { id: 'AI', label: t.categoryAi }
                        ].map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat.id
                                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg shadow-slate-900/10'
                                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850/70'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Blog Card Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map(art => (
                                <div
                                    key={art.id}
                                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
                                >
                                    <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-950" data-alt="Laptop and notes layout visual">
                                        <img src={art.image} alt={art.title[language]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <span className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                                            {art.tag[language]}
                                        </span>
                                    </div>
                                    
                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                                <span>{art.date}</span>
                                                <span>•</span>
                                                <span>{art.readTime} {t.readTime}</span>
                                            </div>
                                            <h3 className="text-xl font-bold leading-snug text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                                                {art.title[language]}
                                            </h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                                                {art.excerpt[language]}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                                            <span className="text-xs font-semibold text-slate-450 dark:text-slate-500 italic">By {art.author.split(',')[0]}</span>
                                            <button
                                                onClick={() => setActiveArticleModal(art)}
                                                className="text-primary hover:text-primary/80 font-bold text-xs flex items-center gap-1 transition-all"
                                            >
                                                {t.readMore}
                                                <FontAwesomeIcon icon={faChevronRight} className="rtl:rotate-180 text-[9px]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                                <span className="material-symbols-outlined text-5xl text-slate-350 dark:text-slate-650 mb-2">article</span>
                                <p className="text-slate-450 dark:text-slate-500 font-medium">{t.noJobs}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Post Reading Overlay Modal */}
            {activeArticleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div onClick={() => setActiveArticleModal(null)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
                    
                    {/* Modal container */}
                    <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-205 dark:border-slate-800 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
                        {/* Close bar */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">{activeArticleModal.tag[language]}</span>
                            <button onClick={() => setActiveArticleModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800/50 flex items-center justify-center">
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700">
                            {/* Title info */}
                            <div className="space-y-4">
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white leading-tight">
                                    {activeArticleModal.title[language]}
                                </h1>
                                
                                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faUser} />{activeArticleModal.author}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faCalendarAlt} />{activeArticleModal.date}</span>
                                    <span>•</span>
                                    <span>{activeArticleModal.readTime} {t.readTime}</span>
                                </div>
                            </div>

                            {/* Big Image */}
                            <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden relative" data-alt="Cozy workplace laptop and workspace tools">
                                <img src={activeArticleModal.image} alt={activeArticleModal.title[language]} className="w-full h-full object-cover" />
                            </div>

                            {/* Rich Article Body */}
                            <div className="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed whitespace-pre-wrap font-serif antialiased pb-4">
                                {activeArticleModal.body[language]}
                            </div>
                        </div>

                        {/* Modal Action Footer */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex justify-between gap-4">
                            <button
                                onClick={() => setActiveArticleModal(null)}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold bg-white dark:bg-slate-900 text-slate-650 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                {t.backToBlog}
                            </button>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    Swal.fire({
                                        icon: 'success',
                                        title: language === 'ar' ? 'تم نسخ الرابط!' : 'Link Copied!',
                                        timer: 1500,
                                        showConfirmButton: false,
                                        confirmButtonColor: 'var(--color-primary)'
                                    });
                                }}
                                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-white hover:brightness-110 flex items-center gap-2 transition-all shadow-md shadow-primary/20"
                            >
                                <FontAwesomeIcon icon={faBookmark} />
                                {t.share}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
