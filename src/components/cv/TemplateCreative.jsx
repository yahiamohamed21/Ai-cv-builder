import React from 'react';

export default function TemplateCreative({ data }) {
    const { personalInfo, experiences, skills, summary } = data;

    return (
        <div className="w-full bg-slate-50 text-slate-900 shadow-2xl rounded-sm overflow-hidden flex flex-row" style={{ minHeight: '100%', aspectRatio: '210/297' }}>

            {/* Left Sidebar - Deep Purple */}
            <div className="w-1/3 bg-purple-900 text-white p-8 flex flex-col pt-12">
                <div className="w-32 h-32 rounded-full border-4 border-purple-400 bg-purple-800 mx-auto mb-6 flex items-center justify-center text-4xl font-black text-purple-300 overflow-hidden shadow-xl">
                    {personalInfo.photo ? (
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : 'C'
                    )}
                </div>

                <div className="space-y-4 text-sm text-purple-200 mt-6">
                    <h3 className="text-white font-bold uppercase tracking-widest border-b border-purple-700 pb-2 mb-4">Contact</h3>
                    {personalInfo.email && <div className="break-words">✉ {personalInfo.email}</div>}
                    {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
                    {personalInfo.location && <div>📍 {personalInfo.location}</div>}
                    {personalInfo.linkedin && <div className="break-words">in/ {personalInfo.linkedin.replace('https://', '')}</div>}
                    {personalInfo.github && <div className="break-words">git/ {personalInfo.github.replace('https://', '')}</div>}
                </div>

                <div className="mt-10">
                    <h3 className="text-white font-bold uppercase tracking-widest border-b border-purple-700 pb-2 mb-4">Skills</h3>
                    <div className="flex flex-col gap-3">
                        {skills && skills.length > 0 ? skills.map((skill, index) => (
                            <div key={index}>
                                <div className="text-sm font-medium text-purple-100">{skill}</div>
                                <div className="w-full bg-purple-950 h-1.5 rounded-full mt-1">
                                    <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-purple-300/50 text-sm italic">Add skills to see them here</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Main Content */}
            <div className="w-2/3 p-10 pt-16 bg-white flex flex-col">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none mb-2">
                    {personalInfo.fullName || 'YOUR NAME'}
                </h1>
                <h2 className="text-xl font-medium text-purple-600 mb-8 uppercase tracking-widest">
                    {personalInfo.jobTitle || 'Creative Professional'}
                </h2>

                {summary && (
                    <div className="mb-8 relative">
                        <div className="absolute -left-4 top-0 w-1 h-full bg-purple-500 rounded-full"></div>
                        <p className="text-slate-600 text-sm leading-relaxed italic">{summary}</p>
                    </div>
                )}

                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <span className="text-purple-500">❖</span> Experience
                    </h3>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-1.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {experiences && experiences.length > 0 ? experiences.map((exp, index) => (
                            <div key={index} className="relative pl-6">
                                <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-0 top-1.5 shadow-[0_0_0_4px_white]"></div>
                                <h4 className="font-bold text-slate-800 text-lg">{exp.jobTitle || 'Position Title'}</h4>
                                <div className="text-purple-600 font-semibold text-sm mb-3">{exp.company || 'Company Name'}</div>
                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                            </div>
                        )) : (
                            <div className="text-slate-400 italic text-sm pl-6">Add your work experience</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
