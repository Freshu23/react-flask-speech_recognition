import "./App.css";
import { useState } from "react";
import { CONVERT_AUDIO } from "./service/endpoints";
import axios from "axios";
import { checkFileType } from "./utils/checkFIleType";
import { Loader } from "@mantine/core";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const handleFileUpload = (event) => {
    event.preventDefault();
    setLoading(true);
    if (checkFileType(file)) {
      const data = new FormData();

      data.append("file", file);
      data.append("filename", file.name);
      axios
        .post("http://127.0.0.1:5000" + CONVERT_AUDIO, data)
        .then((res) => {
          setTranscript(res.data.text);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Zły format pliku");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Wgraj plik audio w formacie .wav</h1>
      <form onSubmit={handleFileUpload} encType="multipart/form-data">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          name="file"
          type="file"
        />
        <button type="submit">Konwertuj</button>
        {loading && (
          <>
            <p>Ładowanie...</p> <Loader />
          </>
        )}
        {transcript && <p>{transcript}</p>}
      </form>
    </div>
  );
}

export default App;
