"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <div className="p-4 border-t border-gray-800">
      <button
        onClick={()=>signOut({callbackUrl: '/'})}
        className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </div>
  );
}
