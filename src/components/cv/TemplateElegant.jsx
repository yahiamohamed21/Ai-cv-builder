import React from 'react';

export default function TemplateElegant({ data }) {
    const { personalInfo, experiences, skills, summary, education } = data;

    const initials = personalInfo?.fullName
        ? personalInfo.fullName
            .split(' ')
            .map(w => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : 'CV';

    return (
        <div
            className="w-full bg-white text-slate-900 shadow-2xl rounded-sm overflow-hidden flex flex-row font-serif"
            style={{ minHeight: '100%', aspectRatio: '210/297' }}
        >
            {/* ── Left Sidebar ── */}
            <div className="w-[35%] bg-[#1f3b4d] text-white p-8 flex flex-col pt-12 shrink-0">

                {/* Profile Photo / Initials */}
                <div className="flex flex-col items-center gap-6 mb-8">
                    <div className="w-28 h-28 rounded-full bg-[#f8f9fa] flex items-center justify-center text-4xl font-bold text-[#1f3b4d] overflow-hidden shadow-md shrink-0">
                        {personalInfo?.photo ? (
                            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            initials
                        )}
                    </div>
                    <div className="text-center">
                        <h2 className="text-white font-bold text-lg leading-tight tracking-wide uppercase">
                            {personalInfo?.fullName || 'YOUR NAME'}
                        </h2>
                        <p className="text-slate-300 text-[10px] mt-2 uppercase tracking-widest font-medium">
                            {personalInfo?.jobTitle || 'PROFESSIONAL TITLE'}
                        </p>
                    </div>
                </div>

                {/* Contact */}
                <div className="mb-8">
                    <h3 className="text-[11px] uppercase tracking-widest text-white font-bold mb-3">
                        Contact:
                    </h3>
                    <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed">
                        {personalInfo?.phone && (
                            <div>{personalInfo.phone}</div>
                        )}
                        {personalInfo?.email && (
                            <div className="break-words">{personalInfo.email}</div>
                        )}
                        {personalInfo?.location && (
                            <div className="break-words">{personalInfo.location}</div>
                        )}
                        {personalInfo?.linkedin && (
                            <div className="break-words">{personalInfo.linkedin.replace('https://', '').replace('www.', '')}</div>
                        )}
                    </div>
                </div>

                {/* Areas of Expertise / Skills */}
                {skills && skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-[11px] uppercase tracking-widest text-white font-bold mb-3">
                            Areas of Expertise
                        </h3>
                        <div className="flex flex-col gap-1.5 text-[11px] text-slate-300">
                            {skills.map((skill, index) => (
                                <div key={index}>{skill}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Right Main Content ── */}
            <div className="w-[65%] p-12 pt-14 bg-[#fcfcfc] flex flex-col gap-8 h-full">

                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1f3b4d] mb-4">
                            Professional Summary
                        </h3>
                        <p className="text-slate-700 text-[11px] leading-relaxed text-justify whitespace-pre-wrap">
                            {summary}
                        </p>
                    </section>
                )}
                
                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1f3b4d] mb-4">
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className="flex items-baseline justify-between mb-0.5">
                                        <p className="text-slate-800 text-xs font-bold leading-snug">
                                            {edu.degree || 'Degree Title'}
                                        </p>
                                        <p className="text-slate-600 text-[10px]">
                                            {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}
                                        </p>
                                    </div>
                                    <p className="text-slate-700 text-[11px]">
                                        {edu.school || 'Institution'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience / Academic Appointments */}
                {experiences && experiences.length > 0 && (
                    <section className="flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1f3b4d] mb-4">
                            Professional Experience
                        </h3>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className="flex items-baseline justify-between mb-0.5">
                                        <h4 className="font-bold text-[#1f3b4d] text-xs">
                                            {exp.jobTitle || 'Job Title'}
                                        </h4>
                                    </div>
                                    <p className="text-slate-700 text-[11px] italic mb-1.5 flex items-center gap-1">
                                        {exp.company || 'Company Name'} 
                                        {(exp.startDate || exp.endDate) && (
                                            <span className="text-slate-500 font-normal">| {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                                        )}
                                    </p>
                                    <p className="text-slate-600 text-[11px] leading-relaxed whitespace-pre-wrap text-justify">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
