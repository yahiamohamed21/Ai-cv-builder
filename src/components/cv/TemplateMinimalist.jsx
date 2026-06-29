import React from 'react';

export default function TemplateMinimalist({ data }) {
    const { personalInfo, experiences, skills, summary, education } = data;

    return (
        <div className="w-full bg-white text-slate-800 shadow-2xl overflow-hidden font-sans" style={{ minHeight: '100%', aspectRatio: '210/297' }}>
            <div className="p-12 space-y-10">
                {/* Header */}
                <div className="text-center border-b pb-8">
                    <h1 className="text-4xl font-light tracking-widest text-slate-900 mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
                    <h2 className="text-lg text-slate-500 uppercase tracking-wide mb-6">{personalInfo.jobTitle || 'PROFESSIONAL TITLE'}</h2>
                    
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                </div>

                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 text-center">Profile</h3>
                        <p className="text-slate-600 text-sm leading-relaxed text-center max-w-2xl mx-auto">{summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experiences && experiences.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 text-center">Experience</h3>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div key={index} className="grid grid-cols-12 gap-4">
                                    <div className="col-span-3 text-right">
                                        <p className="text-xs text-slate-500 font-semibold">{exp.startDate || '2020'} - {exp.endDate || 'Present'}</p>
                                    </div>
                                    <div className="col-span-9 border-l border-slate-200 pl-6 pb-2 relative before:content-[''] before:absolute before:w-2 before:h-2 before:bg-slate-300 before:rounded-full before:-left-[5px] before:top-1.5">
                                        <h4 className="font-semibold text-slate-900 text-sm">{exp.jobTitle || 'Job Title'}</h4>
                                        <p className="text-slate-500 text-xs mb-2">{exp.company || 'Company Name'}</p>
                                        <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 text-center">Education</h3>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div key={index} className="grid grid-cols-12 gap-4">
                                    <div className="col-span-3 text-right">
                                        <p className="text-xs text-slate-500 font-semibold">{edu.startDate || '2016'} - {edu.endDate || '2020'}</p>
                                    </div>
                                    <div className="col-span-9 border-l border-slate-200 pl-6 pb-2 relative before:content-[''] before:absolute before:w-2 before:h-2 before:bg-slate-300 before:rounded-full before:-left-[5px] before:top-1.5">
                                        <h4 className="font-semibold text-slate-900 text-sm">{edu.degree || 'Degree'}</h4>
                                        <p className="text-slate-500 text-xs mb-2">{edu.school || 'School Name'}</p>
                                        {edu.description && <p className="text-slate-600 text-sm leading-relaxed">{edu.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 text-center">Skills</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {skills.map((skill, index) => (
                                <span key={index} className="text-slate-600 border border-slate-200 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
