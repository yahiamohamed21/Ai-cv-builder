import React from 'react';

export default function TemplateProfessional({ data }) {
    const { personalInfo, experiences, skills, summary } = data;

    return (
        <div className="w-full bg-white text-black shadow-2xl rounded-sm overflow-hidden border border-slate-200" style={{ minHeight: '100%', aspectRatio: '210/297', fontFamily: 'Georgia, serif' }}>

            <div className={`p-12 pb-6 border-b-2 border-black flex items-center gap-8 ${personalInfo.photo ? 'text-left' : 'text-center flex-col'}`}>
                {personalInfo.photo && (
                    <div className="shrink-0 w-24 h-24 bg-gray-100 border border-gray-300">
                        <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-full h-full object-cover grayscale" />
                    </div>
                )}

                <div className="flex-1">
                    <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
                        {personalInfo.fullName || 'YOUR NAME'}
                    </h1>

                    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 mt-4 ${personalInfo.photo ? 'justify-start' : 'justify-center'}`}>
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.location && (personalInfo.phone || personalInfo.email) && <span>•</span>}

                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.phone && personalInfo.email && <span>•</span>}

                        {personalInfo.email && <span>{personalInfo.email}</span>}

                        {(personalInfo.linkedin || personalInfo.github) && <span>•</span>}
                        {personalInfo.linkedin && <span>{personalInfo.linkedin.replace('https://www.', '')}</span>}
                        {personalInfo.linkedin && personalInfo.github && <span>•</span>}
                        {personalInfo.github && <span>{personalInfo.github.replace('https://www.', '')}</span>}
                    </div>
                </div>
            </div>

            <div className="p-12 pt-6 space-y-6">

                {/* Summary */}
                {summary && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">Professional Summary</h2>
                        <p className="text-sm leading-relaxed text-justify">{summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experiences && experiences.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-4">Professional Experience</h2>
                        <div className="space-y-5">
                            {experiences.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base">{exp.jobTitle || 'Job Title'}</h3>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="italic text-sm">{exp.company || 'Company Name'}</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 text-sm space-y-1 text-justify">
                                        {/* Simple split by newline or periods for bullet points */}
                                        {exp.description ? exp.description.split('\n').map((line, i) => (
                                            line.trim() && <li key={i}>{line}</li>
                                        )) : <li>Describe your achievements...</li>}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">Core Competencies</h2>
                        <p className="text-sm leading-relaxed">
                            {skills.join(' • ')}
                        </p>
                    </section>
                )}

            </div>
        </div>
    );
}
