import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setText(data.text);
      setSuggestions(data.suggestions);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Social Media Content Analyzer</h1>
        <p className="subtitle">
          Upload a PDF or image to analyze and improve engagement.
        </p>

        <div className="file-upload">
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            hidden
          />
          <label htmlFor="fileInput" className="upload-label">
            {file ? file.name : "Click to upload PDF or Image"}
          </label>
        </div>

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {error && <p className="error">{error}</p>}

        {text && (
          <>
            <div className="section">
              <h2>Extracted Text</h2>
              <div className="text-box">{text}</div>
            </div>

            <div className="section">
              <h2>Suggestions</h2>
              <ul className="suggestion-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="suggestion-item">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
