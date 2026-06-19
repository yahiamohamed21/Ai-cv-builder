import React, { useState, useEffect } from 'react';

const SplashScreen = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation shortly after mount
        const visibilityTimer = setTimeout(() => setIsVisible(true), 100);

        // Animate progress smoothly over ~2.4 seconds to reach 100% just before unmount
        const duration = 2400;
        const interval = 30; // Update every 30ms
        const step = 100 / (duration / interval);

        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return prev + step;
            });
        }, interval);

        return () => {
            clearTimeout(visibilityTimer);
            clearInterval(progressTimer);
        };
    }, []);

    const displayProgress = Math.min(Math.round(progress), 100);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden min-h-screen">
            {/* Splash Screen Wrapper */}
            <div className="relative flex h-screen w-full flex-col justify-center items-center overflow-hidden">
                {/* Subtle Mesh Gradient Background */}
                <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/30 blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Main Content with Entrance Animation */}
                <div
                    className={`relative z-10 flex flex-col items-center max-w-[480px] w-full px-6 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}
                >
                    {/* Logo Section */}
                    <div className="mb-12 flex flex-col items-center">
                        <div className="relative flex items-center justify-center h-32 w-32 rounded-3xl bg-primary/10 mb-6 border border-primary/20 group">
                            <span
                                className="material-symbols-outlined text-primary text-6xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
                                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}
                            >
                                psychology
                            </span>
                            <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-xl shadow-[0_0_15px_rgba(236,91,19,0.5)] border-4 border-background-light dark:border-background-dark animate-bounce">
                                <span className="material-symbols-outlined text-white text-2xl">
                                    description
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            AI <span className="text-primary">CV</span> Builder
                        </h1>
                    </div>

                    {/* Loading Info Section */}
                    <div className="w-full space-y-8">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-200">
                                Crafting your professional future...
                            </h2>
                        </div>

                        {/* Progress Component */}
                        <div className="flex flex-col gap-4 p-6 bg-white/50 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-primary/10 shadow-xl transition-all duration-500 hover:border-primary/30 hover:shadow-primary/5">
                            <div className="flex gap-6 justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm animate-spin-slow" style={{ animationDuration: '3s' }}>auto_awesome</span>
                                    <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal">
                                        Powering up your career with AI...
                                    </p>
                                </div>
                                <p className="text-primary text-sm font-bold leading-normal">{displayProgress}%</p>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-primary/10 overflow-hidden relative">
                                <div
                                    className="h-full rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)] opacity-80 transition-all duration-75 ease-linear relative overflow-hidden"
                                    style={{ width: `${displayProgress}%` }}
                                >
                                    {/* Shimmer effect inside progress bar */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">Loading your workspace</p>
                                <div className="flex gap-1 animate-pulse">
                                    <div className={`w-1.5 h-1.5 rounded-full bg-primary transition-opacity ${progress % 3 === 0 ? 'opacity-100' : 'opacity-40'}`}></div>
                                    <div className={`w-1.5 h-1.5 rounded-full bg-primary transition-opacity ${progress % 3 === 1 ? 'opacity-100' : 'opacity-40'}`}></div>
                                    <div className={`w-1.5 h-1.5 rounded-full bg-primary transition-opacity ${progress % 3 === 2 ? 'opacity-100' : 'opacity-40'}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Version Tagline */}
                    <div className="mt-16 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                        <p className="text-slate-500 dark:text-slate-400 text-xs tracking-[0.2em] font-bold uppercase transition-all hover:tracking-[0.25em]">Enterprise Version</p>
                        <p className="text-primary/80 text-xs font-medium">AI CV Builder v3.2.0</p>
                    </div>
                </div>

                {/* Decorative Hero Image */}
                <div className="absolute bottom-0 left-0 right-0 h-[40vh] w-full z-[-1] opacity-5 pointer-events-none transition-transform duration-1000 ease-out transform translate-y-4">
                    <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover"
                        data-alt="Abstract blue and white digital connection web pattern"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAp3T1vOz3K7zo_0QpXfz16QzGOXMyTSUEBGH3OzVUHljQJvuav-50z_dc2VNdvSMECmvBmJLG1L3X7Lo3AU3Etcp6gJTGQafvtV6uNYrMpDvgW1vA-fSoYsEJQf4zMo2CMqnQYDmUozajU6Wss0NpGYU7sP_0ZQS8r39_jK_tl-WwkvSKzNsvyp5q9ZhJ-2Sl3s2LVrtf8eypXjmcgd5IPHsPxF5KB5FmHSZ4KoRQzMqob0RTZLowjgnErWPIfXvXSuO0ephuiEJ-L")' }}
                    >
                    </div>
                </div>
            </div>
            {/* Custom animations style injected for shimmer/spin-slow */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
            `}} />
        </div>
    );
};

export default SplashScreen;
