import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white mt-auto">
      <div className="max-w-5xl mx-auto py-3 px-4 flex flex-col items-center">

        <div className="font-bold text-lg sm:text-xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">Hero/&gt;</span>
        </div>

        <div className="flex items-center text-xs sm:text-sm mt-1">
          Created with
          <img
            className="w-4 sm:w-5 mx-2"
            src="icons/heart.png"
            alt="heart"
          />
          by Void
        </div>

      </div>
    </footer>
  );
};

export default Footer;