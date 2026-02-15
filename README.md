# Social Media Content Analyzer

## Live Demo

https://social-media-content-analyzer-mocha.vercel.app

---

This is a full-stack web application that allows users to upload a PDF or image file and analyze the content. The application extracts text from the uploaded file and provides simple suggestions to improve engagement.

The objective of this project was to implement file handling, text extraction, and basic content analysis using a client-server architecture.

---

## Tech Stack Used

### Frontend
- React (Vite)
- CSS

### Backend
- Node.js
- Express.js
- Multer (for handling file uploads)
- pdf-parse (for extracting text from PDFs)
- tesseract.js (for OCR on images)

---

## Features

- Upload PDF files
- Upload image files (PNG, JPG, etc.)
- Extract text from uploaded documents
- Generate rule-based engagement suggestions
- Loading state handling
- Error handling for unsupported files

---

## How the Application Works

1. The user uploads a PDF or image file from the frontend.
2. The file is sent to the backend using a POST request.
3. The backend checks the file type:
   - If it is a PDF, text is extracted using pdf-parse.
   - If it is an image, OCR is performed using tesseract.js.
4. After extracting the text, simple rule-based checks are applied:
   - Word count check
   - Hashtag detection
   - Call-to-action detection
5. Based on these checks, suggestions are generated.
6. The extracted text and suggestions are sent back to the frontend and displayed.

---

## Running the Project Locally

### Backend

Navigate to the backend folder:

```bash
cd backend
npm install
node index.js
```

The backend runs on:
http://localhost:8000

---

### Frontend

Navigate to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:
http://localhost:5173

---

## Notes

- File uploads are handled using Multer with memory storage.
- Suggestions are generated using basic rule-based logic.
- The project focuses on implementing a clean and simple full-stack workflow.
