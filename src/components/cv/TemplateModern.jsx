import React from 'react';

export default function TemplateModern({ data }) {
    const { personalInfo, experiences, skills, summary, education } = data;

    // Split skills roughly into two arrays for "Skills" and "Tools" just for visual match with mockup,
    // or just render them all in one section if short. Let's just render all under SKILLS.
    
    return (
        <div className="w-full text-slate-900 shadow-2xl rounded-sm overflow-hidden flex flex-col font-sans" style={{ minHeight: '100%', aspectRatio: '210/297' }}>
            
            {/* Top Header - Dark Blue/Grey */}
            <div className="bg-[#344a5e] text-white px-10 py-10 flex flex-row items-center gap-8 shrink-0">
                {/* Photo */}
                <div className="w-36 h-36 rounded-full border-4 border-white bg-slate-300 flex items-center justify-center text-4xl font-bold text-slate-500 overflow-hidden shrink-0 shadow-lg">
                    {personalInfo?.photo ? (
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        personalInfo?.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : 'CV'
                    )}
                </div>

                {/* Name & Title & Contact */}
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold uppercase tracking-wide leading-tight mb-1 text-white">
                        {personalInfo?.fullName || 'YOUR NAME'}
                    </h1>
                    <h2 className="text-lg uppercase tracking-wider text-slate-300 font-semibold mb-4">
                        {personalInfo?.jobTitle || 'PROFESSIONAL TITLE'}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 font-medium">
                        {personalInfo?.email && <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">mail</span> {personalInfo.email}</span>}
                        {personalInfo?.phone && <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">phone</span> {personalInfo.phone}</span>}
                        {personalInfo?.linkedin && <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">link</span> {personalInfo.linkedin.replace('https://', '').replace('www.', '')}</span>}
                        {personalInfo?.location && <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">location_on</span> {personalInfo.location}</span>}
                        {personalInfo?.github && <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">code</span> {personalInfo.github.replace('https://', '').replace('www.', '')}</span>}
                    </div>
                </div>
            </div>

            {/* Main Body - 2 Columns */}
            <div className="flex flex-row flex-1 bg-white h-full">
                
                {/* Left Column (Light Grey) */}
                <div className="w-[35%] bg-[#f4f5f6] p-8 flex flex-col gap-8 border-r border-slate-200">
                    
                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-[#1f4e79] uppercase tracking-widest mb-4">Skills</h3>
                            <ul className="flex flex-col gap-2">
                                {skills.map((skill, index) => (
                                    <li key={index} className="text-slate-700 text-xs font-medium leading-relaxed">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-[#1f4e79] uppercase tracking-widest mb-4">Education</h3>
                            <div className="flex flex-col gap-4">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="text-slate-800 text-xs font-bold leading-snug">{edu.degree || 'Degree Title'}</p>
                                        <p className="text-slate-600 text-xs mt-0.5">{edu.school || 'University Name'}</p>
                                        {edu.startDate && (
                                            <p className="text-slate-500 text-[10px] mt-1 italic">
                                                {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column (White) */}
                <div className="w-[65%] bg-white p-10 flex flex-col gap-8">
                    
                    {/* Summary */}
                    {summary && (
                        <section>
                            <h3 className="text-sm font-bold text-[#1f4e79] uppercase tracking-widest mb-3">Summary</h3>
                            <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap text-justify">
                                {summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experiences && experiences.length > 0 && (
                        <section className="flex-1">
                            <h3 className="text-sm font-bold text-[#1f4e79] uppercase tracking-widest mb-5">Experience</h3>
                            <div className="flex flex-col gap-6">
                                {experiences.map((exp, index) => (
                                    <div key={index} className="flex flex-col">
                                        <h4 className="text-slate-800 font-bold text-sm leading-tight">
                                            {exp.jobTitle || 'Job Title'}
                                        </h4>
                                        <div className="flex items-baseline gap-2 mt-0.5 mb-2">
                                            <span className="text-slate-600 font-medium text-xs">
                                                {exp.company || 'Company Name'}
                                            </span>
                                            {(exp.startDate || exp.endDate) && (
                                                <span className="text-slate-400 text-[10px] border-l border-slate-300 pl-2">
                                                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
