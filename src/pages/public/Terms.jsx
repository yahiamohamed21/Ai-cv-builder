import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/layout/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileShield, faUserShield, faCookie, faHandshake } from '@fortawesome/free-solid-svg-icons';

const TRANSLATIONS = {
    en: {
        title: "Legal Terms & Policies",
        subtitle: "Please read these terms and policies carefully to understand how we operate and handle your data.",
        lastUpdated: "Last Updated: June 2026",
        tabTerms: "Terms of Service",
        tabPrivacy: "Privacy Policy",
        tabCookies: "Cookie Policy",
        tabAcceptable: "Acceptable Use",
        introTitle: "Introduction",
        introBody: "Welcome to AI CV Builder. These legal documents govern your use of our website, AI builders, editors, and related services. By accessing our platform, you agree to comply with and be bound by these policies.",
        termsSec1: "1. Account Registration",
        termsSec1Body: "To use certain features of the platform, you must register for an account. You agree to provide accurate and complete information. You are solely responsible for safeguarding your password and account details.",
        termsSec2: "2. Subscription & Payments",
        termsSec2Body: "We offer both Free and Premium subscription tiers. Subscriptions are billed in advance on a recurring monthly or annual basis. You can cancel your subscription at any time. Refunds are processed according to our 7-day money-back guarantee policy.",
        termsSec3: "3. AI Content Generation",
        termsSec3Body: "Our platform uses AI models to assist you in drafting resume points and cover letters. While we strive to provide highly accurate suggestions, you are solely responsible for reviewing and verifying the truthfulness and accuracy of all content exported from this platform.",
        privacySec1: "1. Information We Collect",
        privacySec1Body: "We collect information you provide directly to us (e.g., name, email, resume data) and information collected automatically (e.g., cookies, usage patterns, device parameters).",
        privacySec2: "2. How We Use Data",
        privacySec2Body: "We use your data to power the CV builder features, authenticate accounts, process payments, and improve our AI recommendation algorithms. We do NOT sell your personal resume data to third-party advertisers.",
        privacySec3: "3. Data Security & Storage",
        privacySec3Body: "Your data is stored using industry-standard AES-256 encryption. We implement strict firewalls and access controls to ensure your sensitive professional files remain completely secure.",
        cookiesSec1: "1. What are Cookies?",
        cookiesSec1Body: "Cookies are small text files placed on your browser to help store your layout preferences, keep you logged in, and analyze site performance.",
        cookiesSec2: "2. Managing Cookies",
        cookiesSec2Body: "You can disable cookies in your browser settings at any time, but please note that some interactive features of our CV editor may fail to work properly if cookies are fully blocked.",
        acceptableSec1: "1. Prohibited Activities",
        acceptableSec1Body: "You agree not to use our platform to generate fraudulent resume details, impersonate others, build scraping bots, or overload our AI systems with malicious requests.",
        acceptableSec2: "2. Enforcement",
        acceptableSec2Body: "We reserve the right to temporarily suspend or permanently terminate accounts that violate our acceptable use guidelines without prior warning."
    },
    ar: {
        title: "الشروط والسياسات القانونية",
        subtitle: "يرجى قراءة هذه الشروط والسياسات بعناية لفهم كيفية تشغيل خدماتنا والتعامل مع بياناتك.",
        lastUpdated: "آخر تحديث: يونيو 2026",
        tabTerms: "شروط الخدمة",
        tabPrivacy: "سياسة الخصوصية",
        tabCookies: "سياسة ملفات الارتباط",
        tabAcceptable: "الاستخدام المقبول",
        introTitle: "مقدمة وتوضيح",
        introBody: "مرحباً بك في منصة AI CV Builder. تحكم هذه الوثائق القانونية استخدامك لموقعنا الإلكتروني، ومنشئ السير الذاتية بالذكاء الاصطناعي، والمحرر، والخدمات المرتبطة به. بدخولك للمنصة، فإنك توافق على الالتزام بهذه السياسات.",
        termsSec1: "1. تسجيل الحساب",
        termsSec1Body: "لاستخدام ميزات معينة في المنصة، يجب عليك تسجيل حساب لدينا. وتوافق على تقديم معلومات صحيحة ودقيقة بالكامل. كما تتحمل وحدك مسؤولية حماية تفاصيل حسابك وكلمة المرور الخاصة بك.",
        termsSec2: "2. الاشتراكات والمدفوعات",
        termsSec2Body: "نحن نقدم باقات مجانية ومدفوعة (Premium). يتم فوترة الاشتراكات مقدماً على أساس شهري أو سنوي متكرر. يمكنك إلغاء اشتراكك في أي وقت. وتخضع عمليات الاسترداد لسياسة ضمان استرداد الأموال لمدة 7 أيام.",
        termsSec3: "3. المحتوى المولد بالذكاء الاصطناعي",
        termsSec3Body: "تستخدم منصتنا نماذج الذكاء الاصطناعي لمساعدتك في صياغة السيرة الذاتية وخطابات التغطية. ومع سعينا الدائم لتقديم أفضل الاقتراحات، فإنك تظل المسؤول الوحيد عن مراجعة ودقة وصحة كافة النصوص التي تقوم بتصديرها.",
        privacySec1: "1. البيانات التي نجمعها",
        privacySec1Body: "نحن نجمع البيانات التي تزودنا بها مباشرة (مثل الاسم، البريد الإلكتروني، وبيانات السيرة الذاتية) بالإضافة إلى المعلومات التي يتم جمعها تلقائياً (مثل ملفات الكوكيز، إحصائيات الاستخدام، ومعطيات المتصفح).",
        privacySec2: "2. كيف نستخدم بياناتك",
        privacySec2Body: "نحن نستخدم بياناتك لتشغيل ميزات المنشئ، والمصادقة على الحسابات، ومعالجة المدفوعات، وتحسين خوارزميات الاقتراحات لدينا. نحن لا نبيع بياناتك الشخصية للمعلنين الخارجيين مطلقاً.",
        privacySec3: "3. أمان وحفظ البيانات",
        privacySec3Body: "يتم تخزين وتشفير بياناتك باستخدام معايير تشفير AES-256 المتوافقة مع معايير الصناعة. ونطبق أنظمة حماية وجدران نارية صارمة لضمان أمان ملفاتك المهنية والخاصة بالكامل.",
        cookiesSec1: "1. ما هي ملفات تعريف الارتباط؟",
        cookiesSec1Body: "ملفات تعريف الارتباط (الكوكيز) هي ملفات نصية صغيرة يتم وضعها على متصفحك لمساعدتنا في حفظ تفضيلات التصميم الخاصة بك، وإبقائك متصلاً بالحساب، وتحليل أداء الموقع.",
        cookiesSec2: "2. التحكم بملفات الارتباط",
        cookiesSec2Body: "يمكنك تعطيل ملفات تعريف الارتباط من خلال إعدادات متصفحك في أي وقت، ولكن يرجى ملاحظة أن بعض الميزات التفاعلية في محرر السيرة الذاتية قد لا تعمل بشكل صحيح إذا تم حظرها بالكامل.",
        acceptableSec1: "1. الأنشطة المحظورة",
        acceptableSec1Body: "أنت توافق على عدم استخدام منصتنا لتوليد سير ذاتية احتيالية أو منتحلة لشخصيات أخرى، أو بناء أدوات كشط البيانات (Scraping)، أو إجهاد أنظمة الذكاء الاصطناعي بطلبات خبيثة.",
        acceptableSec2: "2. إنفاذ السياسات",
        acceptableSec2Body: "نحتفظ بالحق في تعليق الحسابات أو إغلاقها نهائياً إذا تبين لنا انتهاكها لإرشادات الاستخدام المقبول دون أي إشعار مسبق."
    }
};

export default function Terms() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language] || TRANSLATIONS.en;
    const isRtl = language === 'ar';
    const [activeTab, setActiveTab] = useState('terms');

    return (
        <div className="flex flex-col min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            <Navbar />

            {/* Title Header */}
            <section className="relative overflow-hidden pt-16 pb-16 bg-slate-50 dark:bg-slate-900/10 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white">
                        {t.title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                    <p className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-block">
                        {t.lastUpdated}
                    </p>
                </div>
            </section>

            {/* Document Content and Sidebar layout */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Sidebar Menu */}
                    <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm sticky top-24 space-y-1">
                        {[
                            { id: 'terms', label: t.tabTerms, icon: faHandshake, color: 'text-primary' },
                            { id: 'privacy', label: t.tabPrivacy, icon: faFileShield, color: 'text-blue-500' },
                            { id: 'cookies', label: t.tabCookies, icon: faCookie, color: 'text-amber-500' },
                            { id: 'acceptable', label: t.tabAcceptable, icon: faUserShield, color: 'text-emerald-500' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14px] text-left rtl:text-right transition-all hover:bg-slate-50 dark:hover:bg-slate-850/50 ${activeTab === tab.id
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-l-4 rtl:border-l-0 rtl:border-r-4 border-primary'
                                    : 'text-slate-500 dark:text-slate-400'
                                    }`}
                            >
                                <FontAwesomeIcon icon={tab.icon} className={`${tab.color} text-base shrink-0`} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right Policy Content Area */}
                    <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl min-h-[500px]">
                        
                        {/* 1. Terms of Service content */}
                        {activeTab === 'terms' && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">{t.tabTerms}</h2>
                                
                                <div className="space-y-4 text-slate-650 dark:text-slate-350 text-sm leading-relaxed antialiased">
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base">{t.introTitle}</h3>
                                    <p>{t.introBody}</p>
                                    
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base pt-2">{t.termsSec1}</h3>
                                    <p>{t.termsSec1Body}</p>
                                    
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base pt-2">{t.termsSec2}</h3>
                                    <p>{t.termsSec2Body}</p>
                                    
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base pt-2">{t.termsSec3}</h3>
                                    <p>{t.termsSec3Body}</p>
                                </div>
                            </div>
                        )}

                        {/* 2. Privacy Policy content */}
                        {activeTab === 'privacy' && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">{t.tabPrivacy}</h2>
                                
                                <div className="space-y-4 text-slate-650 dark:text-slate-350 text-sm leading-relaxed antialiased">
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base">{t.introTitle}</h3>
                                    <p>We take your privacy seriously. This policy describes how we collect, use, store, and safeguard the information you provide when using AI CV Builder.</p>
                                    
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base pt-2">{t.privacySec1}</h3>
                                    <p>{t.privacySec1Body}</p>
                                    
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base pt-2">{t.privacySec2}</h3>
                                    <p>{t.privacySec2Body}</p>
                                    
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base pt-2">{t.privacySec3}</h3>
                                    <p>{t.privacySec3Body}</p>
                                </div>
                            </div>
                        )}

                        {/* 3. Cookie Policy content */}
                        {activeTab === 'cookies' && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">{t.tabCookies}</h2>
                                
                                <div className="space-y-4 text-slate-650 dark:text-slate-350 text-sm leading-relaxed antialiased">
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base pt-2">{t.cookiesSec1}</h3>
                                    <p>{t.cookiesSec1Body}</p>
                                    
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base pt-2">{t.cookiesSec2}</h3>
                                    <p>{t.cookiesSec2Body}</p>
                                </div>
                            </div>
                        )}

                        {/* 4. Acceptable Use Policy content */}
                        {activeTab === 'acceptable' && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">{t.tabAcceptable}</h2>
                                
                                <div className="space-y-4 text-slate-650 dark:text-slate-350 text-sm leading-relaxed antialiased">
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base pt-2">{t.acceptableSec1}</h3>
                                    <p>{t.acceptableSec1Body}</p>
                                    
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base pt-2">{t.acceptableSec2}</h3>
                                    <p>{t.acceptableSec2Body}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
