import React from "react";

function HeroLogo() {
  return (
    <div className="w-fit h-[160px] min-w-[350px] relative flex items-center justify-center">
      {/* Left section with Hindi text and diamond */}
      <div className="relative h-full flex flex-col justify-between items-end pb-3 text-right xl-4">
        {/* Blue diamond above text */}
        {/* <div className="w-7 h-7 bg-blue-900 absolute -top-8 left-16 transform rotate-45"></div> */}

        <span className="text-[85px] font-bold text-[#00288C] mb-[-16px]">अनंत</span>
        <h1 className="text-sm font-semibold text-purple-700">
          अनन्तस्य गणितम् विद्यते
        </h1>
      </div>

      {/* Vertical line separator */}
      <div className="block h-full w-[1px] bg-purple-700 mx-4"></div>

      {/* Right section with English text */}
      <div className="flex flex-col justify-center text-left text-blue-800">
        <div className="text-l mb-6 font-bold">
          <h2>The</h2>
          <h2>Mathematical</h2>
          <h2>Society</h2>
        </div>
        <h3 className="text-l font-medium text-purple-700 mt-2">
          NIT Kurukshetra
        </h3>
      </div>
    </div>
  );
}

export default HeroLogo;
