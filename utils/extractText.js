const axios = require("axios");
const pdf = require("pdf-parse");

const extractTextFromPDF = async (pdfUrl) => {
    try {
        const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
        const data = await pdf(response.data);
        return data.text; // Extracted text from PDF
    } catch (error) {
        throw new Error("Failed to extract text from PDF");
    }
};

module.exports = extractTextFromPDF;
