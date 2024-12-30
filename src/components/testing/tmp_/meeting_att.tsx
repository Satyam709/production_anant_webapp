"use client";
import React, { useState } from "react";
import generateQr from "@/lib/actions/GenerateQr";
import Image from "next/image";


export default function TmpAttUi({meets}) {

  const [qrCode, setqrCode] = useState("");

  return (
    <div>
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex items-center gap-3">
          <div>
            <span>Select meeting : </span>
            <select
              name=""
              id="meetSelect"
              className="bg-black border-white border-2 rounded-md"
            >
              {meets.map((v, k) => (
                <option value={k} key={k} className=" bg-black">
                  {v.meeting_id}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="rounded-md p-3 bg-green-500 w-fit active:opacity-70"
          onClick={async () => {
            let e = document.getElementById("meetSelect");
            const opt = e.options[e.value];
            console.log("selected id -> ", opt.innerHTML);
            const qr = await generateQr(opt.innerHTML, 2);
            console.log(qr);
            if (qr) setqrCode(qr);
          }}
        >
          Take attendance
        </button>
      </div>
      {qrCode && (
        <Image
          src={qrCode}
          alt="scan for attandance"
          width={200}
          height={200}
        />
      )}
    </div>
  );
}

