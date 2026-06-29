import React from 'react';
import TemplateModern from './TemplateModern';
import TemplateProfessional from './TemplateProfessional';
import TemplateCreative from './TemplateCreative';
import TemplateElegant from './TemplateElegant';
import TemplateMinimalist from './TemplateMinimalist';
import TemplateExecutive from './TemplateExecutive';

const TEMPLATES = {
    modern: TemplateModern,
    professional: TemplateProfessional,
    creative: TemplateCreative,
    elegant: TemplateElegant,
    minimalist: TemplateMinimalist,
    executive: TemplateExecutive
};

export default function CVPreview({ data }) {
    const selectedTemplate = data?.template || 'modern';
    const TemplateComponent = TEMPLATES[selectedTemplate] || TemplateModern;

    return <TemplateComponent data={data} />;
}
