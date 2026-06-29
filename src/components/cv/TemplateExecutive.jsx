import React from 'react';

export default function TemplateExecutive({ data }) {
    const { personalInfo, experiences, skills, summary, education } = data;

    return (
        <div className="w-full bg-slate-50 text-slate-800 shadow-2xl flex font-serif overflow-hidden" style={{ minHeight: '100%', aspectRatio: '210/297' }}>
            
            {/* Left Sidebar (Dark) */}
            <div className="w-[35%] bg-slate-900 text-slate-200 px-5 py-8 flex flex-col gap-8 h-full">
                {/* Photo & Name */}
                <div className="flex flex-col items-center text-center">
                    {personalInfo.photo && (
                        <div className="w-32 h-32 rounded-full border-4 border-slate-700 overflow-hidden mb-4 bg-slate-800 shadow-xl">
                            <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h1 className="text-2xl font-bold uppercase tracking-widest text-white mb-2 leading-tight">
                        {personalInfo.fullName || 'YOUR NAME'}
                    </h1>
                    <h2 className="text-sm text-yellow-500 font-semibold tracking-widest uppercase">
                        {personalInfo.jobTitle || 'EXECUTIVE TITLE'}
                    </h2>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 text-[10px] mt-4 min-w-0">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-2 mb-4">Contact</h3>
                    {personalInfo.phone && (
                        <div className="flex items-start gap-2 min-w-0">
                            <span className="material-symbols-outlined text-[13px] text-yellow-500 shrink-0 mt-0.5">call</span>
                            <span className="break-all leading-normal min-w-0">{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.email && (
                        <div className="flex items-start gap-2 min-w-0">
                            <span className="material-symbols-outlined text-[13px] text-yellow-500 shrink-0 mt-0.5">mail</span>
                            <span className="break-all leading-normal min-w-0">{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.location && (
                        <div className="flex items-start gap-2 min-w-0">
                            <span className="material-symbols-outlined text-[13px] text-yellow-500 shrink-0 mt-0.5">location_on</span>
                            <span className="break-words leading-normal min-w-0">{personalInfo.location}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-start gap-2 mt-4 min-w-0">
                            <span className="font-bold text-yellow-500 shrink-0 text-[10px] mt-0.5">in</span>
                            <span className="break-all leading-normal min-w-0">{personalInfo.linkedin.replace('https://', '').replace('www.', '')}</span>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-2 mb-4">Expertise</h3>
                        <div className="flex flex-col gap-2">
                            {skills.map((skill, index) => (
                                <div key={index} className="text-sm font-medium text-slate-300">
                                    • {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Main Content */}
            <div className="w-[65%] p-10 flex flex-col gap-8 bg-white h-full">
                
                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-600">person</span>
                            Executive Summary
                        </h3>
                        <p className="text-slate-700 text-sm leading-relaxed text-justify">{summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experiences && experiences.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-600">work</span>
                            Professional Experience
                        </h3>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div key={index} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-end">
                                        <h4 className="font-bold text-slate-900 text-base">{exp.jobTitle || 'Job Title'}</h4>
                                        <span className="text-xs text-slate-500 font-bold tracking-wider">
                                            {exp.startDate || '2020'} - {exp.endDate || 'Present'}
                                        </span>
                                    </div>
                                    <h5 className="text-yellow-600 font-semibold text-sm mb-2">{exp.company || 'Company Name'}</h5>
                                    <p className="text-slate-700 text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-600">school</span>
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-end">
                                        <h4 className="font-bold text-slate-900 text-sm">{edu.degree || 'Degree'}</h4>
                                        <span className="text-xs text-slate-500 font-bold tracking-wider">
                                            {edu.startDate || '2016'} - {edu.endDate || '2020'}
                                        </span>
                                    </div>
                                    <h5 className="text-slate-600 font-medium text-sm">{edu.school || 'University Name'}</h5>
                                    {edu.description && <p className="text-slate-500 text-xs mt-1">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}
