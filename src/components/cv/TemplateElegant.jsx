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
            className="w-full bg-white text-slate-900 shadow-2xl rounded-sm overflow-hidden flex flex-row"
            style={{ minHeight: '100%', aspectRatio: '210/297', fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
            {/* ── Left Sidebar ── */}
            <div className="w-[35%] bg-gradient-to-b from-[#0f2b3c] to-[#163a50] text-white p-8 flex flex-col gap-8 pt-12">

                {/* Profile Photo / Initials */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-28 h-28 rounded-full border-[3px] border-[#4ecdc4]/60 bg-[#0a1f2e] flex items-center justify-center text-3xl font-bold text-[#4ecdc4] overflow-hidden shadow-lg">
                        {personalInfo?.photo ? (
                            <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                        ) : (
                            initials
                        )}
                    </div>
                    <div className="text-center">
                        <h2 className="text-white font-bold text-base leading-tight tracking-wide">
                            {personalInfo?.fullName || 'YOUR NAME'}
                        </h2>
                        <p className="text-[#4ecdc4] text-xs font-medium mt-1 uppercase tracking-widest">
                            {personalInfo?.jobTitle || 'Professional'}
                        </p>
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4ecdc4] font-bold border-b border-[#4ecdc4]/20 pb-2 mb-4">
                        Contact
                    </h3>
                    <div className="space-y-3 text-[11px] text-slate-300">
                         {personalInfo?.email && (
                            <div className="flex items-start gap-2">
                                <span className="text-[#4ecdc4] mt-0.5 text-xs">✉</span>
                                <span className="break-words leading-relaxed">{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo?.phone && (
                            <div className="flex items-start gap-2">
                                <span className="text-[#4ecdc4] mt-0.5 text-xs">☎</span>
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo?.location && (
                            <div className="flex items-start gap-2">
                                <span className="text-[#4ecdc4] mt-0.5 text-xs">📍</span>
                                <span>{personalInfo.location}</span>
                            </div>
                        )}
                        {personalInfo?.linkedin && (
                            <div className="flex items-start gap-2">
                                <span className="text-[#4ecdc4] mt-0.5 text-xs">in</span>
                                <span className="break-words leading-relaxed">{personalInfo.linkedin.replace('https://', '').replace('www.', '')}</span>
                            </div>
                        )}
                        {personalInfo?.github && (
                            <div className="flex items-start gap-2">
                                <span className="text-[#4ecdc4] mt-0.5 text-xs">⌨</span>
                                <span className="break-words leading-relaxed">{personalInfo.github.replace('https://', '').replace('www.', '')}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4ecdc4] font-bold border-b border-[#4ecdc4]/20 pb-2 mb-4">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-2.5 py-1 bg-[#4ecdc4]/10 border border-[#4ecdc4]/20 text-[#a8e6e0] text-[10px] font-medium rounded"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4ecdc4] font-bold border-b border-[#4ecdc4]/20 pb-2 mb-4">
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <p className="text-white text-xs font-semibold leading-snug">
                                        {edu.degree || 'Degree'}
                                    </p>
                                    <p className="text-[#4ecdc4]/70 text-[11px] mt-0.5">
                                        {edu.school || 'Institution'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Right Main Content ── */}
            <div className="w-[65%] p-10 pt-14 bg-white flex flex-col">

                {/* Name & Title */}
                <div className="mb-8 border-b-2 border-slate-100 pb-6">
                    <h1 className="text-3xl font-bold text-[#0f2b3c] tracking-tight leading-none uppercase">
                        {personalInfo?.fullName || 'YOUR NAME'}
                    </h1>
                    <p className="text-[#4ecdc4] text-sm font-semibold mt-2 uppercase tracking-[0.15em]">
                        {personalInfo?.jobTitle || 'Professional Title'}
                    </p>
                </div>

                {/* Summary */}
                {summary && (
                    <section className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0f2b3c] border-b-2 border-[#4ecdc4]/30 pb-2 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#4ecdc4] rounded-full inline-block"></span>
                            Professional Summary
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed text-justify whitespace-pre-wrap">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experiences && experiences.length > 0 && (
                    <section className="mb-8 flex-1">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0f2b3c] border-b-2 border-[#4ecdc4]/30 pb-2 mb-5 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#4ecdc4] rounded-full inline-block"></span>
                            Professional Experience
                        </h3>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div key={index} className="relative pl-5 border-l-2 border-slate-100">
                                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-[#4ecdc4] rounded-full"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-[#0f2b3c] text-sm">
                                            {exp.jobTitle || 'Job Title'}
                                        </h4>
                                    </div>
                                    <p className="text-[#4ecdc4] text-xs font-semibold mb-2">
                                        {exp.company || 'Company Name'}
                                    </p>
                                    <p className="text-slate-500 text-xs leading-relaxed whitespace-pre-wrap">
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
