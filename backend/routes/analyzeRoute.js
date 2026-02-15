const express = require("express");
const multer = require("multer");

const { extractTextFromPDF } = require("../services/pdfService");
const { generateSuggestions } = require("../services/suggestionService");
const { extractTextFromImage } = require("../services/ocrService");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileType = req.file.mimetype;
    let extractedText = "";

    if (fileType === "application/pdf") {
      extractedText = await extractTextFromPDF(req.file.buffer);
    } else if (fileType.startsWith("image/")) {
      extractedText = await extractTextFromImage(req.file.buffer);
    } else {
      return res.status(400).json({
        message: "Unsupported file type. Please upload PDF or image.",
      });
    }

    const suggestions = generateSuggestions(extractedText);

    return res.json({
      message: "File uploaded successfully",
      text: extractedText,
      suggestions: suggestions,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
