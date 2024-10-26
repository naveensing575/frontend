import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import api from "../services/api";

interface Upload {
  id: number;
  filePath: string;
  status: string;
  createdAt: string;
}

const DataUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await api.get("/uploads");
        setUploads(response.data);
      } catch (error) {
        console.error("Failed to fetch uploads:", error);
      }
    };
    fetchUploads();
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setUploadStatus(null); // Reset upload status when a new file is selected
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] }, // Accept only CSV files
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploadStatus("Uploading...");
    setIsUploading(true);

    try {
      const response = await api.post("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("Upload successful!");
      setIsUploading(false);
      setUploads((prevUploads) => [...prevUploads, response.data.upload]);
      setFile(null); // Clear file after successful upload
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      setIsUploading(false);
      console.error("Upload error:", error);
    }
  };

  const cancelFile = () => {
    setFile(null);
    setUploadStatus(null); // Clear upload status if file is canceled
  };

  const getStatusClass = () => {
    switch (uploadStatus) {
      case "Uploading...":
        return "status-uploading";
      case "Upload successful!":
        return "status-success";
      case "Upload failed. Please try again.":
        return "status-failed";
      default:
        return "";
    }
  };

  return (
    <div>
      <h2>Upload New Dataset</h2>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #888",
          padding: "20px",
          marginBottom: "10px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {file ? (
          <p>Selected file: {file.name}</p>
        ) : (
          <p>Drag & drop a CSV file here, or click to select a file</p>
        )}
      </div>

      {file && (
        <button onClick={cancelFile} style={{ marginRight: "10px" }}>
          Cancel Selected File
        </button>
      )}

      <button onClick={handleUpload} disabled={!file || isUploading}>
        Upload
        {isUploading && <span className="spinner"></span>}
      </button>

      {uploadStatus && <p className={getStatusClass()}>{uploadStatus}</p>}

      <h3>Your Upload History</h3>
      {uploads.length > 0 ? (
        <ul>
          {uploads.map((upload) => (
            <li key={upload.id}>
              <strong>Status:</strong> {upload.status} -{" "}
              <strong>Uploaded at:</strong>{" "}
              {new Date(upload.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not uploaded any datasets yet.</p>
      )}
    </div>
  );
};

export default DataUpload;
