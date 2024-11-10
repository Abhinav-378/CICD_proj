// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ setTool }) => {
  return (
    <div className="fixed top-0 flex justify-center items-center w-full mt-5 z-10">
    <nav className="flex bg-gray-800 text-white py-4 rounded-full w-[70%] justify-around">
      <button onClick={() => setTool("converter")} className="hover:bg-gray-700 px-4 py-2 rounded">
        Image Converter
      </button>
      <button onClick={() => setTool("compressor")} className="hover:bg-gray-700 px-4 py-2 rounded">
        Image Compressor
      </button>
      <button onClick={() => setTool("resizer")} className="hover:bg-gray-700 px-4 py-2 rounded">
        Image Resizer
      </button>
    </nav>
    </div>
  );
};

export default Navbar;
