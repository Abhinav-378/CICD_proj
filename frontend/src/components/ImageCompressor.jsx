import React, { useState } from "react";
import axios from "axios";
import "./style.css"; // Import for additional styling if needed

const ImageCompressor = () => {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(50);
  const [compressedImage, setCompressedImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCompression = async () => {
    if (!file) return;

    setLoading(true); // Start loading animation

    const formData = new FormData();
    formData.append("image", file);
    formData.append("quality", quality);

    try {
      console.log(formData);
      
      const response = await axios.post("http://localhost:3002/compress", formData, {
        responseType: "blob",
      });

      const imageUrl = URL.createObjectURL(response.data);
      setCompressedImage(imageUrl);
    } catch (error) {
      console.error("Error compressing image:", error);
    } finally {
      setLoading(false); // End loading animation
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center gap-5">
        <h2 className="text-center my-5 text-4xl">Image Compressor</h2>

        {/* Upload image */}
        <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl w-full z-0">
          <div className="md:flex">
            <div className="w-full p-3">
              <div
                className="relative h-48 rounded-lg border-2 border-blue-500 bg-white flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                aria-label="File upload area"
              >
                <div className="absolute flex flex-col items-center">
                  <img
                    alt="File Icon"
                    className="mb-3 h-20"
                    src="https://static.vecteezy.com/system/resources/previews/014/638/927/original/drag-and-drop-to-cloud-upload-online-backup-concept-icon-in-line-style-design-isolated-on-white-background-editable-stroke-free-vector.jpg"
                  />
                  <span className="block text-gray-500 font-semibold">
                    {file ? file.name : "Drag & drop your files here"}
                  </span>
                  <span className="block text-gray-400 font-normal mt-1">
                    or click to upload
                  </span>
                </div>
                {/* Hidden file input */}
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="h-full w-full cursor-pointer opacity-0 absolute"
                  aria-label="Upload file"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Compression level input */}
        <input
          type="number"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="mt-2 mb-4 bg-gray-100 p-2 rounded-lg w-full max-w-48 text-center "
          placeholder="Quality (1-100)"
          min="1"
          max="100"
          aria-label="Compression level"
        />

        {/* Compress button */}
        <button
          onClick={handleCompression}
          className="bg-slate-900 text-white py-2 px-4 rounded"
          aria-label="Compress image"
        >
          Compress
        </button>
      </div>

      {/* Loading animation */}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-pulse h-48 w-48 bg-gray-200 rounded-lg"></div>
        </div>
      )}

      {/* Compressed image display */}
      {compressedImage && !loading && (
        <div className="mt-4 flex flex-col justify-center items-center gap-5 max-w-96 mx-auto">
          <hr className="w-[80vw] py-2" />
          <div className="flex flex-row justify-around items-center">
            <h3 className="text-xl mb-2">Compressed Image:</h3>
            <a
              href={compressedImage}
              download="compressed_image.jpg"
              className="bg-green-500 text-white py-2 px-4 rounded mx-10"
              aria-label="Download compressed image"
            >
              Download
            </a>
          </div>
          <img src={compressedImage} alt="Compressed" className="mb-2" />
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
