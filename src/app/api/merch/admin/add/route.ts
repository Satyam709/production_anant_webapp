import { NextRequest } from "next/server";

export function GET(req:NextRequest) {
    const data = req.json();
    console.log(data);
      
}