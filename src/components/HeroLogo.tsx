import React from "react";

export default function HeroLogo() {
  return (
    <div className="flex items-center sm:px-5 md:py-10  text-white font-sans w-fit">
      {/* Left Section */}
      <div className="text-center font-martel">
        <h1 className="text-[64px] md:text-[100px] leading-none m-0 font-bold">
          अनंत
        </h1>
        <p className="text-[10px] md:text-[26px] mt-[16px] text-right">अनंतस्य गणितम् विद्यते</p>
      </div>

      {/* Divider */}
      <div className="w-[2px] h-[100px] md:h-[160px] bg-white mx-[15px]" />

      {/* Right Section */}
      <div className="flex flex-col justify-start text-[14px] md:text-[26px] leading-[1.4]">
        <div className="leading-[1.2] flex flex-col items-start font-medium">
          <div>The</div>
          <div>Mathematical</div>
          <div>Society</div>
        </div>
        <div className="mt-[20px]">NIT Kurukshetra</div>
      </div>
    </div>
  );
}
