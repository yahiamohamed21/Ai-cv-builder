const { z } = require('zod');

const resumeValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    templateId: z.string().optional(),
    personalInfo: z.object({
      fullName: z.string().optional(),
      jobTitle: z.string().optional(),
      email: z.string().email('Invalid email format').optional().or(z.literal('')),
      phone: z.string().optional(),
      location: z.string().optional(),
      linkedin: z.string().optional(),
      portfolio: z.string().optional()
    }).optional(),
    summary: z.string().optional(),
    experience: z.array(z.object({
      company: z.string().optional(),
      position: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      current: z.boolean().optional(),
      description: z.string().optional()
    })).optional(),
    education: z.array(z.object({
      institution: z.string().optional(),
      degree: z.string().optional(),
      fieldOfStudy: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      current: z.boolean().optional()
    })).optional(),
    skills: z.array(z.string()).optional(),
    projects: z.array(z.object({
      title: z.string().optional(),
      link: z.string().optional(),
      description: z.string().optional()
    })).optional()
  })
});

module.exports = {
  resumeValidationSchema
};
