import React from 'react';

export default function TemplateExecutive({ data }) {
    const { personalInfo, experiences, skills, summary, education } = data;

    return (
        <div
            className="w-full bg-white text-slate-900 shadow-2xl rounded-sm overflow-hidden flex flex-row font-serif"
            style={{ minHeight: '100%', aspectRatio: '210/297' }}
        >
            {/* ── Left Sidebar ── */}
            <div className="w-[38%] bg-[#2a303c] text-white p-8 flex flex-col pt-12 shrink-0">

                {/* Profile Photo */}
                {personalInfo?.photo && (
                    <div className="w-32 h-32 bg-[#1d222b] mb-6 overflow-hidden shadow-xl border border-[#3e4654]">
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Name & Title */}
                <div className="mb-6">
                    <h1 className="text-[#c5a365] text-2xl font-bold uppercase tracking-widest leading-tight mb-2">
                        {personalInfo?.fullName || 'YOUR NAME'}
                    </h1>
                    <h2 className="text-[#c5a365] text-[10px] uppercase tracking-[0.2em] font-medium">
                        {personalInfo?.jobTitle || 'PROFESSIONAL TITLE'}
                    </h2>
                </div>

                {/* Contact */}
                <div className="space-y-3 text-[10px] text-slate-300 mb-8 font-sans">
                    {personalInfo?.email && (
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#c5a365] text-[14px]">mail</span>
                            <span className="break-words">{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#c5a365] text-[14px]">phone</span>
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo?.linkedin && (
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#c5a365] text-[14px]">public</span>
                            <span className="break-words">{personalInfo.linkedin.replace('https://', '').replace('www.', '')}</span>
                        </div>
                    )}
                    {personalInfo?.location && (
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#c5a365] text-[14px]">location_on</span>
                            <span className="break-words">{personalInfo.location}</span>
                        </div>
                    )}
                </div>

                {/* Executive Profile (Summary) */}
                {summary && (
                    <div className="mb-8">
                        <h3 className="text-[#c5a365] text-[11px] uppercase tracking-widest font-bold mb-3 border-b border-[#3e4654] pb-2">
                            Executive Profile
                        </h3>
                        <p className="text-slate-300 text-[10px] leading-relaxed text-justify whitespace-pre-wrap font-sans">
                            {summary}
                        </p>
                    </div>
                )}

                {/* Core Competencies (Skills) */}
                {skills && skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-[#c5a365] text-[11px] uppercase tracking-widest font-bold mb-3 border-b border-[#3e4654] pb-2">
                            Core Competencies
                        </h3>
                        <ul className="flex flex-col gap-2 text-[10px] text-slate-300 font-sans">
                            {skills.map((skill, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-[#c5a365] mt-0.5 text-xs">•</span>
                                    <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <div>
                        <h3 className="text-[#c5a365] text-[11px] uppercase tracking-widest font-bold mb-3 border-b border-[#3e4654] pb-2">
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className="font-sans">
                                    <p className="text-white text-[11px] font-bold leading-snug">
                                        {edu.degree || 'Degree'}
                                    </p>
                                    <p className="text-slate-400 text-[10px] mt-0.5">
                                        {edu.school || 'Institution'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Right Main Content ── */}
            <div className="w-[62%] p-10 pt-12 bg-white flex flex-col h-full font-serif">

                {/* Experience */}
                {experiences && experiences.length > 0 && (
                    <section className="flex-1">
                        <h3 className="text-[#c5a365] text-xl font-bold uppercase tracking-widest mb-6 border-b border-slate-100 pb-3">
                            Experience
                        </h3>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className="mb-2">
                                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                                            {exp.jobTitle || 'JOB TITLE'} {exp.company && <span className="text-slate-400 font-normal">| {exp.company}</span>}
                                        </h4>
                                        {(exp.startDate || exp.endDate) && (
                                            <div className="text-slate-500 text-[11px] mt-0.5 font-sans">
                                                {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-slate-700 text-[11px] leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-[#c5a365]/30 font-sans">
                                        {exp.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
