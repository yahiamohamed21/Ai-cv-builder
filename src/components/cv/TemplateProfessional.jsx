import React from 'react';

export default function TemplateProfessional({ data }) {
    const { personalInfo, experiences, skills, summary, education } = data;

    return (
        <div className="w-full bg-white text-slate-900 shadow-2xl rounded-sm overflow-hidden flex flex-col font-sans px-12 py-12" style={{ minHeight: '100%', aspectRatio: '210/297' }}>
            
            {/* Header: Photo left, Info right */}
            <div className="flex flex-row items-center gap-6 mb-6">
                {personalInfo?.photo && (
                    <div className="w-24 h-24 shrink-0 bg-slate-200 overflow-hidden shadow-sm">
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900 mb-1">
                        {personalInfo?.fullName || 'YOUR NAME'}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-700 font-medium mb-1">
                        {personalInfo?.phone && <span>Phone: {personalInfo.phone} |</span>}
                        {personalInfo?.email && <span>Email: {personalInfo.email} |</span>}
                        {personalInfo?.linkedin && <span>LinkedIn: {personalInfo.linkedin.replace('https://', '').replace('www.', '')} |</span>}
                        {personalInfo?.location && <span>Location: {personalInfo.location}</span>}
                    </div>
                    <h2 className="text-sm uppercase tracking-widest text-slate-800 font-bold mt-1">
                        {personalInfo?.jobTitle || 'PROFESSIONAL TITLE'}
                    </h2>
                </div>
            </div>

            {/* Separator */}
            <div className="w-full h-[2px] bg-slate-900 mb-4"></div>

            {/* Summary */}
            {summary && (
                <div className="mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-2">Professional Summary</h3>
                    <div className="w-full h-[1px] bg-slate-400 mb-3"></div>
                    <p className="text-xs text-slate-700 leading-relaxed text-justify">
                        {summary}
                    </p>
                </div>
            )}

            {/* Experience */}
            {experiences && experiences.length > 0 && (
                <div className="mb-4 flex-1">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mt-6 mb-2">Work Experience</h3>
                    <div className="w-full h-[1px] bg-slate-400 mb-4"></div>
                    <div className="flex flex-col gap-5">
                        {experiences.map((exp, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="text-slate-900 font-bold text-xs">{exp.jobTitle || 'Job Title'}</h4>
                                    <span className="text-slate-700 font-medium text-[10px]">
                                        {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-slate-700 text-[11px] font-semibold">{exp.company || 'Company Name'}</span>
                                    {/* Usually location goes here on right, but we don't have it mapped, so empty or omitted */}
                                </div>
                                <p className="text-slate-600 text-[11px] leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-slate-200">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills (Rendered in 3 columns) */}
            {skills && skills.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mt-4 mb-2">Core Competencies & Skills</h3>
                    <div className="w-full h-[1px] bg-slate-400 mb-4"></div>
                    <ul className="grid grid-cols-3 gap-x-4 gap-y-2 text-[11px] text-slate-700 font-medium list-disc list-inside">
                        {skills.map((skill, index) => (
                            <li key={index} className="truncate">{skill}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mt-6 mb-2">Education</h3>
                    <div className="w-full h-[1px] bg-slate-400 mb-4"></div>
                    <div className="flex flex-col gap-3">
                        {education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h4 className="text-slate-900 font-bold text-xs">{edu.school || 'University Name'}</h4>
                                    <p className="text-slate-700 text-[11px] mt-0.5">{edu.degree || 'Degree Title'}</p>
                                </div>
                                <span className="text-slate-700 font-medium text-[10px]">
                                    {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Bottom border to cap it cleanly like the mockup's footer */}
            <div className="w-full h-[1px] bg-slate-400 mt-auto"></div>
        </div>
    );
}
