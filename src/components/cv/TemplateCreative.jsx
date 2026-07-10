import React from 'react';

export default function TemplateCreative({ data }) {
    const { personalInfo, experiences, skills, summary, education } = data;

    return (
        <div className="w-full bg-white text-slate-900 shadow-2xl rounded-sm overflow-hidden flex flex-row font-sans" style={{ minHeight: '100%', aspectRatio: '210/297' }}>

            {/* Left Sidebar - Deep Purple */}
            <div className="w-[35%] bg-[#483354] text-white p-8 flex flex-col pt-12 shrink-0">
                {/* Photo */}
                <div className="w-32 h-32 rounded-full border-[3px] border-[#6b4c7a] bg-[#3a2845] mx-auto mb-8 flex items-center justify-center text-4xl font-black text-[#855f98] overflow-hidden shadow-lg">
                    {personalInfo?.photo ? (
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        personalInfo?.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : 'C'
                    )}
                </div>

                {/* Name & Title */}
                <div className="text-center md:text-left mb-8">
                    <h1 className="text-3xl font-bold uppercase tracking-wide leading-none mb-2 text-white break-words">
                        {personalInfo?.fullName || 'YOUR NAME'}
                    </h1>
                    <h2 className="text-xs uppercase tracking-[0.15em] text-[#d4b5e6] font-semibold">
                        {personalInfo?.jobTitle || 'PROFESSIONAL TITLE'}
                    </h2>
                </div>

                {/* Contact */}
                <div className="space-y-3 text-[11px] text-[#e0cbed] mb-10">
                    {personalInfo?.location && (
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                            <span className="break-words">{personalInfo.location}</span>
                        </div>
                    )}
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[14px]">phone</span>
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo?.email && (
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[14px]">mail</span>
                            <span className="break-words">{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.linkedin && (
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[14px]">public</span>
                            <span className="break-words">{personalInfo.linkedin.replace('https://', '').replace('www.', '')}</span>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Skills</h3>
                        <div className="flex flex-col gap-2">
                            {skills.map((skill, index) => (
                                <div key={index} className="text-[11px] font-medium text-[#e0cbed]">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Main Content */}
            <div className="w-[65%] p-10 pt-12 bg-white flex flex-col gap-8 h-full">

                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#483354] mb-3">Summary</h3>
                        <p className="text-slate-600 text-xs leading-relaxed text-justify whitespace-pre-wrap">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experiences && experiences.length > 0 && (
                    <section className="flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#483354] mb-4">Work Experience</h3>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div key={index} className="flex flex-col">
                                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">{exp.jobTitle || 'Position Title'}</h4>
                                    <div className="text-slate-600 font-medium text-xs mb-1">{exp.company || 'Company Name'}</div>
                                    {(exp.startDate || exp.endDate) && (
                                        <div className="text-slate-500 text-[10px] mb-2 italic">
                                            {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                                        </div>
                                    )}
                                    <div className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-[#483354]/20">
                                        {exp.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#483354] mb-4">Education</h3>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <h4 className="font-bold text-slate-800 text-sm">{edu.degree || 'Degree'}</h4>
                                    <div className="text-slate-600 text-xs mt-1">
                                        {edu.school || 'Institution'} 
                                        {(edu.startDate || edu.endDate) && ` | ${edu.startDate} - ${edu.endDate || 'Present'}`}
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
