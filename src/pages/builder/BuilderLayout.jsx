import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useSearchParams, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faGlobe, faMicrochip, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export default function BuilderLayout() {
    const { t } = useTranslation();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const currentStep = location.pathname.split('/').pop();
    const previewRef = useRef(null);

    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();

    const handleLanguageToggle = () => {
        changeLanguage(language === 'en' ? 'ar' : 'en');
    };

    const [cvData, setCvData] = useState(() => {
        const templateFromUrl = searchParams.get('template') || 'modern';
        return {
            template: templateFromUrl,
            personalInfo: {
                fullName: '',
                jobTitle: '',
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                photo: null
            },
            experiences: [],
            skills: [],
            summary: ''
        };
    });

    // --- Inline AI Assistant Logic ---
    const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
    const [aiInput, setAiInput] = useState('');
    const aiMessagesEndRef = useRef(null);
    const [chats, setChats] = useState(() => {
        try {
            const saved = localStorage.getItem('builder_ai_sessions');
            return saved ? JSON.parse(saved) : [{
                role: 'assistant',
                content: t('chatbot_welcome')
            }];
        } catch (e) {
            return [{ role: 'assistant', content: t('chatbot_welcome') }];
        }
    });

    useEffect(() => {
        localStorage.setItem('builder_ai_sessions', JSON.stringify(chats));
    }, [chats]);

    useEffect(() => {
        if (isAiPanelOpen) {
            aiMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats, isAiPanelOpen]);

    const handleSendAI = async (e) => {
        e.preventDefault();
        if (!aiInput.trim()) return;

        const userMessage = aiInput.trim();
        setAiInput('');

        setChats(prev => [...prev, { role: 'user', content: userMessage }]);

        // Add loading placeholder
        setChats(prev => [...prev, { role: 'assistant', content: '...', isLoading: true }]);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            // Build Context string focusing on the current CV details
            const contextData = `
                I am currently building my CV. Here is my data so far:
                Target Job Title: ${cvData.personalInfo.jobTitle || 'Not specified'}
                Skills: ${cvData.skills.length ? cvData.skills.map(s => s.name).join(', ') : 'None yet'}
                Summary: ${cvData.summary || 'Not written yet'}
                ${cvData.experiences.length > 0 ? `Experiences: ${cvData.experiences.map(e => e.jobTitle + ' at ' + e.company).join(', ')}` : ''}
                
                I am on step: ${currentStep}.
                Please use this context to answer my question.
            `;

            const promptContext = `Context:\n${contextData}\n\nUser Question:\n${userMessage}`;

            const result = await model.generateContent(promptContext);
            const response = await result.response;
            const text = response.text();

            setChats(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: text };
                return updated;
            });
        } catch (error) {
            console.error("Gemini API Error:", error);
            setChats(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: "عذراً، حدث خطأ، تأكد من صحة الاتصال بالإنترنت أو مفتاح API." };
                return updated;
            });
        }
    };
    // ---------------------------------

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Top Navigation Bar */}
                    <header className="flex items-center justify-between border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-20 py-4 sticky top-0 z-50">
                        <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                                <span className="material-symbols-outlined text-2xl">description</span>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">ResumeBuilder</h2>
                        </Link>
                        <div className="flex flex-1 justify-end gap-6 items-center">
                            <nav className="hidden md:flex items-center gap-8">
                                <Link to="/dashboard" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">{t('builder_layout_my_cvs')}</Link>
                                <Link to="/templates" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">{t('builder_layout_templates')}</Link>
                            </nav>
                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
                            <div className="flex items-center gap-2 md:gap-4 ml-4 rtl:mr-4">
                                <button onClick={toggleTheme} className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
                                    <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
                                </button>
                                <button onClick={handleLanguageToggle} className="p-2 px-3 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 flex items-center gap-2 rtl:space-x-reverse">
                                    <FontAwesomeIcon icon={faGlobe} />
                                    <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
                                </button>
                                <button className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all ml-2">
                                    {t('builder_layout_save_draft')}
                                </button>
                                <div className="hidden sm:block size-10 rounded-full border-2 border-primary/20 p-0.5 ml-2">
                                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEBnRsORlf9sg4zWmuRw5wKoz6YR9KMkO-kijO0B_yRYI709ZxJHmPrcbsuSdVzkp5JUNAICXAUL97jHvnQrhWZoKWAL_VtQztgxU8AhQGHNb-zXArkOvmLTs-HdWxJHgiuaBYUb3zD8L3bdICpByqYEVurERx2QpfrWDU7UDWyv5MhRPnXrE5YDTIVxd8uUkIQuQkEVWL6uh_ipypHzspQB0oJ0wKtp1ezM0jMy7h38zx9TGD9lihUzi1ZfLTM3A6pLE2zKZYyxKJ')]"></div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Print Styles: Hide everything except the printable area to optimize print speed */}
                    <style>{`
                        @media print {
                            body > *:not(#root) {
                                display: none !important;
                            }
                            #root, .layout-container, .group\\/design-root {
                                display: block !important;
                            }
                            body header, 
                            nav, 
                            .layout-container > div:has(> main) > main > div:not(.sticky),
                            .layout-container > div:has(> main) > main > div.sticky > div:not(.cv-printable-area),
                            button,
                            a {
                                display: none !important;
                            }
                            
                            .cv-printable-area {
                                position: absolute !important;
                                left: 0 !important;
                                top: 0 !important;
                                width: 100% !important;
                                height: 100% !important;
                                max-height: none !important;
                                overflow: visible !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                border: none !important;
                                box-shadow: none !important;
                                transform: scale(1) !important;
                                -webkit-print-color-adjust: exact !important;
                                print-color-adjust: exact !important;
                            }
                            
                            /* Ensure parent containers allow full expansion */
                            .relative.overflow-auto {
                                overflow: visible !important;
                                max-height: none !important;
                                position: static !important;
                                border: none !important;
                                padding: 0 !important;
                                background: transparent !important;
                            }

                            main {
                                padding: 0 !important;
                                margin: 0 !important;
                            }

                            @page {
                                size: A4;
                                margin: 0;
                            }
                        }
                    `}</style>

                    {/* Main Content Area given to Outlet */}
                    <div className="flex-1 flex flex-col">
                        <Outlet context={{ cvData, setCvData, previewRef }} />
                    </div>

                    {/* Inline AI Assistant (Floating Sidebar + FAB) */}
                    <div className="fixed bottom-6 rtl:left-6 ltr:right-6 z-[60] flex flex-col items-end gap-4 pointer-events-none">

                        {/* Slide-over Panel */}
                        <div
                            className={`pointer-events-auto w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out origin-bottom-right ${isAiPanelOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none absolute bottom-16 ltr:right-0 rtl:left-0'}`}
                        >
                            {/* Header */}
                            <div className="bg-primary px-4 py-3 flex items-center justify-between text-white border-b border-primary/20 shrink-0">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-xl">smart_toy</span>
                                    <h3 className="font-bold text-[15px]">{t('builder_ai_assistant_title')}</h3>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setChats([{ role: 'assistant', content: t('chatbot_welcome') }])}
                                        className="p-1 hover:bg-white/20 rounded-md transition-colors text-xs flex items-center gap-1 px-2"
                                        title={t('builder_ai_assistant_new')}
                                    >
                                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                                    </button>
                                    <button
                                        onClick={() => setIsAiPanelOpen(false)}
                                        className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700">
                                {chats.map((msg, idx) => (
                                    <div key={idx} className={`flex max-w-[90%] ${msg.role === 'user' ? 'ltr:ml-auto rtl:mr-auto justify-end' : 'justify-start'}`}>
                                        <div className={`
                                            px-3 py-2.5 rounded-2xl text-[13px] leading-relaxed relative
                                            ${msg.role === 'user'
                                                ? 'bg-primary text-white rtl:rounded-tr-none ltr:rounded-tl-none'
                                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rtl:rounded-tl-none ltr:rounded-tr-none shadow-sm'
                                            }
                                            ${msg.isLoading ? 'animate-pulse' : ''}
                                        `}>
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={aiMessagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
                                <form onSubmit={handleSendAI} className="flex items-end gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus-within:border-primary/30 rounded-xl transition-all">
                                    <textarea
                                        value={aiInput}
                                        onChange={(e) => setAiInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendAI(e);
                                            }
                                        }}
                                        className="flex-1 bg-transparent border-none focus:ring-0 text-[13px] resize-none max-h-24 py-1.5 px-2 text-slate-900 dark:text-white placeholder-slate-400 outline-none"
                                        placeholder={t('builder_ai_assistant_ph')}
                                        rows="1"
                                    ></textarea>
                                    <button
                                        type="submit"
                                        disabled={!aiInput.trim()}
                                        className="size-8 shrink-0 bg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 text-white rounded-lg flex items-center justify-center transition-all"
                                    >
                                        <FontAwesomeIcon icon={faPaperPlane} className="text-sm ltr:-ml-0.5 rtl:-mr-0.5" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Floating Action Button */}
                        <button
                            onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
                            title={t('builder_ai_assistant_toggle')}
                            className="pointer-events-auto size-14 bg-primary text-white rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none animate-bounce hover:animate-none"
                        >
                            {isAiPanelOpen ? (
                                <FontAwesomeIcon icon={faTimes} className="text-xl" />
                            ) : (
                                <span className="material-symbols-outlined text-2xl">smart_toy</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}