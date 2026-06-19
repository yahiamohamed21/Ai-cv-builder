import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Logo from '../../components/ui/Logo/Logo';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export default function Chatbot() {
  const { t } = useTranslation();

  const [chats, setChats] = useState(() => {
    try {
      const saved = localStorage.getItem('chatbot_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [currentChatId, setCurrentChatId] = useState(null);

  const currentChat = Object.values(chats).find(c => c.id === currentChatId);
  const messages = currentChat ? currentChat.messages : [{ role: 'assistant', content: t('chatbot_welcome') }];

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatbot_sessions', JSON.stringify(chats));
  }, [chats]);

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleSend = async (eOrText) => {
    if (eOrText?.preventDefault) eOrText.preventDefault();

    const messageText = typeof eOrText === 'string' ? eOrText : input;
    if (!messageText.trim()) return;

    const userMessage = messageText.trim();
    setInput('');

    let activeChatId = currentChatId;
    let activeChats = [...chats];

    if (!activeChatId) {
      activeChatId = Date.now().toString();
      const newChat = {
        id: activeChatId,
        title: userMessage.substring(0, 30) + (userMessage.length > 30 ? '...' : ''),
        updatedAt: new Date().toISOString(),
        messages: [
          { role: 'assistant', content: t('chatbot_welcome') },
          { role: 'user', content: userMessage }
        ]
      };
      activeChats.unshift(newChat);
      setCurrentChatId(activeChatId);
    } else {
      const chatIndex = activeChats.findIndex(c => c.id === activeChatId);
      if (chatIndex > -1) {
        const updatedChat = {
          ...activeChats[chatIndex],
          messages: [...activeChats[chatIndex].messages, { role: 'user', content: userMessage }],
          updatedAt: new Date().toISOString()
        };
        activeChats.splice(chatIndex, 1);
        activeChats.unshift(updatedChat);
      }
    }
    setChats(activeChats);

    setTimeout(() => {
      setChats(current => {
        const updated = [...current];
        const idx = updated.findIndex(c => c.id === activeChatId);
        if (idx > -1) {
          updated[idx] = {
            ...updated[idx],
            messages: [...updated[idx].messages, { role: 'assistant', content: '...', isLoading: true }]
          };
        }
        return updated;
      });
    }, 50);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const chatHistory = activeChats.find(c => c.id === activeChatId)?.messages || [];
      const historyContext = chatHistory.slice(1, -2).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const promptContext = historyContext ? `Previous context:\n${historyContext}\n\nNew query:\n${userMessage}` : userMessage;

      const result = await model.generateContent(promptContext);
      const response = await result.response;
      const text = response.text();

      setChats(current => {
        const updated = [...current];
        const idx = updated.findIndex(c => c.id === activeChatId);
        if (idx > -1) {
          const newMsgs = [...updated[idx].messages];
          newMsgs[newMsgs.length - 1] = { role: 'assistant', content: text };
          updated[idx] = {
            ...updated[idx],
            messages: newMsgs,
            updatedAt: new Date().toISOString()
          };
        }
        return updated;
      });
    } catch (error) {
      console.error("Gemini API Error:", error);
      setChats(current => {
        const updated = [...current];
        const idx = updated.findIndex(c => c.id === activeChatId);
        if (idx > -1) {
          const newMsgs = [...updated[idx].messages];
          newMsgs[newMsgs.length - 1] = { role: 'assistant', content: "عذراً، حدث خطأ أثناء الاتصال بالذكاء الاصطناعي." };
          updated[idx] = {
            ...updated[idx],
            messages: newMsgs
          };
        }
        return updated;
      });
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased h-screen flex flex-col overflow-hidden font-display">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between border-b border-primary/10 bg-white dark:bg-background-dark/50 px-6 py-3 z-20">
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center ltr:mr-2 rtl:ml-2" title="Back to Dashboard">
            <span className="material-symbols-outlined rtl:rotate-180">arrow_back</span>
          </Link>
          <Logo iconSize={28} textSize="text-lg hidden sm:block" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-primary/10 border border-primary/20 overflow-hidden flex items-center justify-center">
              <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEBnRsORlf9sg4zWmuRw5wKoz6YR9KMkO-kijO0B_yRYI709ZxJHmPrcbsuSdVzkp5JUNAICXAUL97jHvnQrhWZoKWAL_VtQztgxU8AhQGHNb-zXArkOvmLTs-HdWxJHgiuaBYUb3zD8L3bdICpByqYEVurERx2QpfrWDU7UDWyv5MhRPnXrE5YDTIVxd8uUkIQuQkEVWL6uh_ipypHzspQB0oJ0wKtp1ezM0jMy7h38zx9TGD9lihUzi1ZfLTM3A6pLE2zKZYyxKJ" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar: Chat History */}
        <aside className="hidden md:flex w-72 bg-white dark:bg-background-dark border-r border-primary/5 flex-col h-full z-10">
          <div className="p-4 space-y-4">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              {t('chatbot_btn_new')}
            </button>
            <div className="relative">
              <span className="material-symbols-outlined absolute ltr:left-3 rtl:right-3 top-2.5 text-slate-400 text-sm">search</span>
              <input className="w-full ltr:pl-9 rtl:pr-9 ltr:pr-4 rtl:pl-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-lg focus:ring-1 focus:ring-primary/50 outline-none hover:border-primary/30" placeholder={t('chatbot_ph_search')} type="text" />
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 px-3 space-y-6">
            {chats.length > 0 ? (
              <div className="space-y-1 mt-2">
                <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Recent Chats</h3>
                {chats.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => setCurrentChatId(chat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm group text-left transition-colors ${currentChatId === chat.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                  >
                    <span className="material-symbols-outlined text-lg">chat_bubble</span>
                    <span className="truncate flex-1 ltr:text-left rtl:text-right" dir="auto">{chat.title}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        // Delete logic internally avoids confirming in prompt directly 
                        const newChats = chats.filter(c => c.id !== chat.id);
                        setChats(newChats);
                        if (currentChatId === chat.id) setCurrentChatId(null);
                      }}
                      className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
                    >
                      delete
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 mt-10">
                <span className="material-symbols-outlined text-3xl mb-2 opacity-50">forum</span>
                <p className="text-xs">لا توجد محادثات</p>
              </div>
            )}
          </nav>
          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm transition-colors">
              <span className="material-symbols-outlined text-lg">settings</span>
              {t('chatbot_nav_settings')}
            </Link>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col h-full bg-white dark:bg-background-dark relative">


          {/* Scrollable Chat Content */}
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 p-4 sm:p-6 space-y-8">
            {messages.length === 1 && messages[0].role === 'assistant' ? (
              /* Welcome/Empty State */
              <div className="max-w-2xl mx-auto py-8 sm:py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="size-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl">smart_toy</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('chatbot_main_welcome')}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm mx-auto">{t('chatbot_main_desc')}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <button
                    onClick={() => { handleSend(t('chatbot_opt_1_title')); }}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 text-left transition-all group lg:rtl:text-right"
                  >
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-lg">trending_up</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{t('chatbot_opt_1_title')}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('chatbot_opt_1_desc')}</p>
                  </button>

                  <button
                    onClick={() => { handleSend(t('chatbot_opt_2_title')); }}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 text-left transition-all group lg:rtl:text-right"
                  >
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-lg">search_check</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{t('chatbot_opt_2_title')}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('chatbot_opt_2_desc')}</p>
                  </button>

                  <button
                    onClick={() => { handleSend(t('chatbot_opt_3_title')); }}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 text-left transition-all group lg:rtl:text-right"
                  >
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-lg">spellcheck</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{t('chatbot_opt_3_title')}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('chatbot_opt_3_desc')}</p>
                  </button>

                  <button
                    onClick={() => { handleSend(t('chatbot_opt_4_title')); }}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 text-left transition-all group lg:rtl:text-right"
                  >
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-lg">description</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{t('chatbot_opt_4_title')}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('chatbot_opt_4_desc')}</p>
                  </button>
                </div>
              </div>
            ) : (
              /* Message List */
              <div className="space-y-6">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex max-w-3xl w-full mx-auto ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-2 sm:gap-3'}`}>

                    {msg.role === 'assistant' && (
                      <div className="size-8 bg-primary/10 rounded-lg flex-shrink-0 flex items-center justify-center text-primary mt-1">
                        <span className="material-symbols-outlined text-lg">smart_toy</span>
                      </div>
                    )}

                    {msg.role === 'user' ? (
                      <div className="bg-primary text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-sm max-w-[85%] sm:max-w-[80%] animate-in slide-in-from-right-2 duration-300">
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-w-[90%] sm:max-w-[85%] animate-in slide-in-from-left-2 duration-300">
                        <div className={`bg-slate-50 dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 ${msg.isLoading ? 'animate-pulse' : ''}`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Area */}
          <div className="p-4 sm:p-6 border-t border-primary/5 dark:border-slate-800 bg-white/50 dark:bg-background-dark/50 backdrop-blur-sm z-10">
            <div className="max-w-3xl mx-auto relative group">

              <form onSubmit={handleSend} className="flex items-end gap-2 p-2 sm:p-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 transition-all shadow-sm">
                <button type="button" className="p-2 text-slate-400 hover:text-primary transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined">attach_file</span>
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  className="flex-1 border-none focus:ring-0 bg-transparent py-2.5 px-1 text-sm resize-none max-h-48 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 ltr:text-left rtl:text-right"
                  placeholder={t('chatbot_ph_input')}
                  rows="1"
                ></textarea>
                <button type="submit" className="size-10 shrink-0 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
