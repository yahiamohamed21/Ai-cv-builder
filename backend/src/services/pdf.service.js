const puppeteer = require('puppeteer');
const ApiError = require('../utils/ApiError');

const generatePDF = async (htmlContent) => {
    try {
        // Use headless mode
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Important for some environments
        });

        const page = await browser.newPage();
        
        // Set content and wait for it to be fully loaded
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });

        await browser.close();

        return pdfBuffer;
    } catch (error) {
        throw new ApiError('PDF Generation Error: ' + error.message, 500);
    }
};

module.exports = {
    generatePDF
};