import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useAuth } from '../../context/AuthContext';
import CVPreview from './CVPreview';

export default function CVDetails() {
    const { id } = useParams();
    const previewRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const { user } = useAuth();

    const storageKey = user ? `saved_cvs_${user.uid}` : 'saved_cvs_guest';

    // In a real app, you would fetch the CV data using the ID.
    // Here we'll just mock it.
    const mockData = {
        template: 'modern',
        personalInfo: {
            fullName: 'John Doe',
            jobTitle: 'Senior Software Engineer',
            email: 'john.doe@example.com',
            phone: '+1 234 567 8900',
            location: 'San Francisco, CA',
            linkedin: 'linkedin.com/in/johndoe',
            github: 'github.com/johndoe'
        },
        experiences: [
            { id: '1', jobTitle: 'Senior Dev', company: 'Tech Inc', description: 'Led frontend team.' }
        ],
        skills: ['React', 'Node.js', 'Tailwind', 'JavaScript'],
        education: [
            { id: '1', degree: 'BSc Computer Science', school: 'Tech University' }
        ],
        summary: 'Passionate software engineer with 5+ years of experience building scalable web apps.'
    };

    const cvData = (() => {
        try {
            const savedCvsStr = localStorage.getItem(storageKey);
            if (savedCvsStr) {
                const savedCvs = JSON.parse(savedCvsStr);
                const found = savedCvs.find(c => c.id === id);
                if (found) return found;
            }
        } catch (e) {
            console.error("Failed to load CV in CVDetails:", e);
        }
        return mockData;
    })();

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));

    const handleExport = useReactToPrint({
        contentRef: previewRef,
        documentTitle: `CV_${id || 'Export'}`,
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-display">
            {/* Navigation / Top Bar */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-500">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold">My Resume ({cvData?.title || cvData?.personalInfo?.fullName || 'Untitled'})</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link to={`/builder/step1?id=${id}`} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Edit Flow
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
                {/* Main Preview Area */}
                <div className="flex-1 w-full flex flex-col items-center">
                    {/* Zoom Controls */}
                    <div className="flex items-center justify-center gap-4 mb-6 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                        <button onClick={handleZoomOut} className="p-1 text-slate-500 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">zoom_out</span>
                        </button>
                        <span className="text-sm font-bold min-w-[3rem] text-center">{Math.round(zoomLevel * 100)}%</span>
                        <button onClick={handleZoomIn} className="p-1 text-slate-500 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">zoom_in</span>
                        </button>
                    </div>

                    <div className="relative overflow-auto w-full max-h-[80vh] rounded-xl border border-slate-200/50 bg-slate-100 dark:bg-slate-800/50 p-4 md:p-8 flex justify-center [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <div
                            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
                            className="shadow-2xl bg-white max-w-[210mm] w-full rounded-sm transition-transform duration-200 min-h-[297mm]"
                        >
                            <div ref={previewRef} className="cv-printable-area w-full h-auto bg-white text-black min-h-[296mm]">
                                <CVPreview data={cvData} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Actions Sidebar */}
                <div className="w-full lg:w-80 flex flex-col gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm sticky top-24">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={handleExport}
                                className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined">download</span>
                                    <span>Download PDF</span>
                                </div>
                            </button>

                            <Link
                                to={`/builder/step1?id=${id}`}
                                className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined">edit_document</span>
                                    <span>Edit Content</span>
                                </div>
                            </Link>
                        </div>

                        <hr className="my-6 border-slate-200 dark:border-slate-700" />

                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-500">network_intelligence</span>
                            AI Insights
                        </h3>
                        <div className="space-y-3">
                            <button className="relative overflow-hidden group w-full flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg hover:scale-[1.02] transition-all shadow-md shadow-emerald-500/20">
                                <div className="flex items-center gap-2 relative z-10">
                                    <span className="material-symbols-outlined">auto_awesome</span>
                                    <span>AI Improve</span>
                                </div>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>

                            <button className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all group">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500">radar</span>
                                    <span>ATS Score</span>
                                </div>
                                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">85%</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
