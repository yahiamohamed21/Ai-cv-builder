const OpenAI = require('openai');
const ApiError = require('../utils/ApiError');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This should be in .env
});

const enhanceResumeSection = async (sectionContent, jobDescription) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new ApiError('OpenAI API Key is not configured on the server', 500);
    }

    try {
        const prompt = `
            You are an expert resume writer. Please improve the following resume section.
            Tailor it towards this job description: ${jobDescription || 'N/A'}.
            Make it professional, ATS-friendly, and use strong action verbs.
            Return ONLY the improved text, no intro, no outro.
            
            Original Section:
            ${sectionContent}
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        throw new ApiError('AI Service Error: ' + error.message, 500);
    }
};

module.exports = {
    enhanceResumeSection
};