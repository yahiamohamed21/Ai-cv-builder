import React from 'react';

export default function TemplateSelector({ selectedTemplate, onTemplateChange }) {
    const templates = [
        {
            id: 'modern',
            name: 'Modern Clean',
            description: 'Sleek & minimalist design'
        },
        {
            id: 'professional',
            name: 'Corporate Pro',
            description: 'Traditional & ATS-friendly'
        },
        {
            id: 'creative',
            name: 'Creative Portfolio',
            description: 'Bold & colorful layout'
        }
    ];

    return (
        <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                CV Template
                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal ml-2">
                    (You can change this anytime)
                </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onTemplateChange(template.id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                            selectedTemplate === template.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                                    {template.name}
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                    {template.description}
                                </p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 ml-3 flex-shrink-0 ${
                                selectedTemplate === template.id
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-slate-300 dark:border-slate-600'
                            }`}>
                                {selectedTemplate === template.id && (
                                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
