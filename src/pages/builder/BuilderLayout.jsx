import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useSearchParams, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faGlobe, faMicrochip, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Swal from 'sweetalert2';
import Navbar from '../../components/layout/Navbar';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export default function BuilderLayout() {
    const { t } = useTranslation();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentStep = location.pathname.split('/').pop();
    const previewRef = useRef(null);

    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();
    const { user } = useAuth();

    const storageKey = user ? `saved_cvs_${user.uid}` : 'saved_cvs_guest';

    const handleLanguageToggle = () => {
        changeLanguage(language === 'en' ? 'ar' : 'en');
    };

    const [cvData, setCvData] = useState(() => {
        const idFromUrl = searchParams.get('id');
        const templateFromUrl = searchParams.get('template') || 'modern';
        try {
            const savedCvsStr = localStorage.getItem(storageKey);
            const savedCvs = savedCvsStr ? JSON.parse(savedCvsStr) : [];
            if (idFromUrl) {
                const found = savedCvs.find(c => c.id === idFromUrl);
                if (found) return found;
            }
        } catch (error) {
            console.error("Failed to load CV draft:", error);
        }

        const TEMPLATE_IMAGES = {
            modern: '/images/templates/modern.png',
            professional: '/images/templates/professional.png',
            creative: '/images/templates/creative.png',
            elegant: '/images/templates/elegant.png',
            minimalist: '/images/templates/minimalist.png',
            executive: '/images/templates/executive.png'
        };

        const templateNameMap = {
            modern: 'Modern Tech',
            professional: 'Professional Business',
            creative: 'Creative Purple',
            elegant: 'Elegant Academic',
            minimalist: 'Minimalist Clean',
            executive: 'Premium Executive'
        };

        return {
            id: idFromUrl || Date.now().toString(),
            title: `${templateNameMap[templateFromUrl] || 'My Resume'} Draft`,
            template: templateFromUrl,
            image: TEMPLATE_IMAGES[templateFromUrl] || TEMPLATE_IMAGES.modern,
            updatedAt: 'Just now',
            score: Math.floor(Math.random() * 15) + 80, // Default good score
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
            education: [],
            skills: [],
            summary: ''
        };
    });

    // Sync search params with CV ID if missing
    useEffect(() => {
        const idFromUrl = searchParams.get('id');
        if (!idFromUrl && cvData.id) {
            const params = new URLSearchParams(searchParams);
            params.set('id', cvData.id);
            setSearchParams(params);
        }
    }, [cvData.id, searchParams, setSearchParams]);

    // Autosave CV data changes to saved_cvs list in localStorage
    useEffect(() => {
        if (!cvData || !cvData.id) return;
        try {
            const savedCvsStr = localStorage.getItem(storageKey);
            let savedCvs = savedCvsStr ? JSON.parse(savedCvsStr) : [];
            const index = savedCvs.findIndex(c => c.id === cvData.id);
            if (index !== -1) {
                savedCvs[index] = cvData;
            } else {
                savedCvs.push(cvData);
            }
            localStorage.setItem(storageKey, JSON.stringify(savedCvs));
        } catch (error) {
            console.error("Failed to autosave CV:", error);
        }
    }, [cvData, storageKey]);

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
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

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
                    <Navbar />

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