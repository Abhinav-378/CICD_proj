import React, { useState } from "react";
import axios from "axios";

const ImageConverter = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("jpeg"); // Default format
  const [convertedImage, setConvertedImage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state to track the process

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true); // Start loading animation

    const formData = new FormData();
    formData.append("image", file);
    formData.append("format", format); // Send the selected format

    try {
      const response = await axios.post("http://localhost:3001/convert", formData, {
        responseType: "blob", // Important for receiving binary data
      });

      // Create a URL for the converted image
      const imageUrl = URL.createObjectURL(response.data);
      setConvertedImage(imageUrl);
    } catch (error) {
      console.error("Error converting image:", error);
    } finally {
      setLoading(false); // End loading animation
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center gap-5">
        <h2 className="text-center my-5 text-4xl">Image Converter</h2>

        {/* Upload image */}
        <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl w-full z-0 ">
          <div className="md:flex">
            <div className="w-full p-3">
              <div
                className="relative h-48 rounded-lg border-2 border-blue-500 bg-white flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
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
                />
              </div>
            </div>
          </div>
        </div>

        {/* Format selector */}
        <select
          onChange={handleFormatChange}
          value={format}
          className="mt-2 mb-4 bg-gray-100 p-2 rounded-lg"
        >
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WEBP</option>
        </select>

        {/* Convert button */}
        <button
          onClick={handleConvert}
          className="bg-slate-900 text-white py-2 px-4 rounded"
        >
          Convert
        </button>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="loader"></div>
        </div>
      )}

      {/* Converted image display */}
      {convertedImage && !loading && (
        <div className="mt-4 flex flex-col justify-center items-center gap-5 max-w-96 mx-auto">
          <hr className="w-[80vw] py-2 " />
          <div className="flex flex-row justify-around items-center">
            <h3 className="text-xl mb-2">Converted Image:</h3>
            <a
              href={convertedImage}
              download={`converted.${format}`}
              className="bg-green-500 text-white py-2 px-4 rounded mx-10"
            >
              Download
            </a>
          </div>
          <img src={convertedImage} alt="Converted" className="mb-2" />
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
