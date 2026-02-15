const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (fileBuffer) => {
  try {
    const data = await pdfParse(fileBuffer);
    return data.text;
  } catch (error) {
    console.error("PDF is parsing error:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

module.exports = { extractTextFromPDF };