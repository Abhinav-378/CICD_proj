// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ImageConverter from "./components/ImageConverter";
import ImageCompressor from "./components/ImageCompressor";
import ImageResizer from "./components/ImageResizer";

const App = () => {
  const [tool, setTool] = useState("converter");

  return (
    <div className="min-h-screen  text-gray-800">
      <Navbar setTool={setTool} />
      <div className="mt-20 p-6">
        {tool === "converter" && <ImageConverter />}
        {tool === "compressor" && <ImageCompressor />}
        {tool === "resizer" && <ImageResizer />}
      </div>
    </div>
  );
};

export default App;
