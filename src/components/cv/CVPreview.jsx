import React from 'react';
import TemplateModern from './TemplateModern';
import TemplateProfessional from './TemplateProfessional';
import TemplateCreative from './TemplateCreative';

const TEMPLATES = {
    modern: TemplateModern,
    professional: TemplateProfessional,
    creative: TemplateCreative
};

export default function CVPreview({ data }) {
    const selectedTemplate = data?.template || 'modern';
    const TemplateComponent = TEMPLATES[selectedTemplate] || TemplateModern;

    return <TemplateComponent data={data} />;
}
