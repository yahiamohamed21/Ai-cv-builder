import React from 'react';

export default function TemplateModern({ data }) {
    const { personalInfo, experiences, skills, summary } = data;

    return (
        <div className="w-full bg-white text-slate-900 shadow-2xl rounded-sm overflow-hidden border border-slate-200" style={{ minHeight: '100%', aspectRatio: '210/297' }}>
            {/* Header / Personal Info */}
            <div className="bg-slate-800 text-white p-8 flex items-center gap-6">
                {personalInfo.photo && (
                    <div className="shrink-0 w-28 h-28 rounded-full border-4 border-slate-600 overflow-hidden bg-slate-700">
                        <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
                        {personalInfo.fullName || 'YOUR NAME'}
                    </h1>
                    <h2 className="text-xl text-blue-400 font-medium mb-4">
                        {personalInfo.jobTitle || 'Profession'}
                    </h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-300">
                        {personalInfo.email && <span className="flex items-center gap-1">✉ {personalInfo.email}</span>}
                        {personalInfo.phone && <span className="flex items-center gap-1">☎ {personalInfo.phone}</span>}
                        {personalInfo.location && <span className="flex items-center gap-1">📍 {personalInfo.location}</span>}
                        {personalInfo.linkedin && <span className="flex items-center gap-1">in/ {personalInfo.linkedin.replace('https://', '').replace('www.', '')}</span>}
                        {personalInfo.github && <span className="flex items-center gap-1">git/ {personalInfo.github.replace('https://', '').replace('www.', '')}</span>}
                    </div>
                </div>
            </div>

            <div className="p-8 space-y-8">
                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className="text-lg font-bold uppercase border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">Professional Summary</h3>
                        <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">{summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experiences && experiences.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">Experience</h3>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-semibold text-slate-800">{exp.jobTitle || 'Job Title'}</h4>
                                        <span className="text-emerald-600 font-medium text-sm">{exp.company || 'Company'}</span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap mt-2">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">
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
