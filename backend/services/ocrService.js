const Tesseract = require("tesseract.js");

const extractTextFromImage = async (fileBuffer) => {
    try {
        const { data } = await Tesseract.recognize(
            fileBuffer,
            "eng",
            {
                logger: (m) => {
                    if(m.status === "recognizing text"){
                        console.log("OCR Progress:", Math.round(m.progress * 100) + "%");
                    }
                },
            }
        );

        return data.text;
    }catch(error){
        console.error("OCR error:", error);
        throw new Error("Failed to extract text from image");
    }
};

module.exports = { extractTextFromImage };