import React from 'react';

export default function TemplateMinimalist({ data }) {
    const { personalInfo, experiences, skills, summary, education } = data;

    return (
        <div className="w-full bg-[#f8f9fa] text-slate-900 shadow-2xl rounded-sm overflow-hidden flex flex-col font-sans p-12" style={{ minHeight: '100%', aspectRatio: '210/297' }}>
            
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-[2.5rem] font-black uppercase tracking-tighter text-slate-900 leading-none mb-2">
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>
                <h2 className="text-sm text-slate-600 font-medium">
                    {personalInfo?.jobTitle || 'Professional Title'}
                </h2>
            </div>

            {/* Grid Layout for Content */}
            <div className="flex flex-col gap-8">
                
                {/* Contact Section */}
                <div className="flex flex-row">
                    <div className="w-[30%] pr-4 shrink-0">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">mail</span>
                            Contact
                        </h3>
                    </div>
                    <div className="w-[70%] text-[11px] text-slate-700 font-medium leading-relaxed">
                        {personalInfo?.email && <div><span className="font-bold text-slate-900">Email:</span> {personalInfo.email}</div>}
                        {personalInfo?.phone && <div><span className="font-bold text-slate-900">Phone:</span> {personalInfo.phone}</div>}
                        {personalInfo?.linkedin && <div><span className="font-bold text-slate-900">LinkedIn:</span> {personalInfo.linkedin.replace('https://', '').replace('www.', '')}</div>}
                        {personalInfo?.github && <div><span className="font-bold text-slate-900">GitHub:</span> {personalInfo.github.replace('https://', '').replace('www.', '')}</div>}
                        {personalInfo?.location && <div><span className="font-bold text-slate-900">Location:</span> {personalInfo.location}</div>}
                    </div>
                </div>

                {/* Summary Section */}
                {summary && (
                    <div className="flex flex-row">
                        <div className="w-[30%] pr-4 shrink-0">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">person</span>
                                Summary
                            </h3>
                        </div>
                        <div className="w-[70%] text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap text-justify">
                            {summary}
                        </div>
                    </div>
                )}

                {/* Experience Section */}
                {experiences && experiences.length > 0 && (
                    <div className="flex flex-row">
                        <div className="w-[30%] pr-4 shrink-0">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">work</span>
                                Experience
                            </h3>
                        </div>
                        <div className="w-[70%] flex flex-col gap-5">
                            {experiences.map((exp, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-slate-900 text-[12px]">{exp.company || 'Company'}</h4>
                                        <span className="text-slate-900 font-bold text-[10px]">
                                            {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                                        </span>
                                    </div>
                                    <div className="text-slate-600 text-[11px] mb-2">{exp.jobTitle || 'Job Title'}</div>
                                    <p className="text-slate-700 text-[11px] leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-slate-300">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education Section */}
                {education && education.length > 0 && (
                    <div className="flex flex-row">
                        <div className="w-[30%] pr-4 shrink-0">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">school</span>
                                Education
                            </h3>
                        </div>
                        <div className="w-[70%] flex flex-col gap-3">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold text-slate-900 text-[12px]">{edu.school || 'University'}</h4>
                                        <span className="text-slate-900 font-bold text-[10px]">
                                            {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}
                                        </span>
                                    </div>
                                    <div className="text-slate-600 text-[11px]">{edu.degree || 'Degree'}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills Section */}
                {skills && skills.length > 0 && (
                    <div className="flex flex-row">
                        <div className="w-[30%] pr-4 shrink-0">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">build</span>
                                Skills
                            </h3>
                        </div>
                        <div className="w-[70%] text-[11px] text-slate-700 leading-relaxed font-medium">
                            {skills.join(', ')}
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    );
}
