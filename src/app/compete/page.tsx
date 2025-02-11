import React from 'react'
import Link from 'next/link'
import { Trophy, Users, Bell } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CompList from '@/components/compete/CompList'

export default function CompetitionsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>
      
      <Navbar />
      
      <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">Competitions</h1>
          <p className="text-gray-400 mb-8">
            Form teams, participate in competitions, and showcase your skills on the global stage!
          </p>
          
          <div className="flex justify-center gap-4">
            <Link href="/compete" className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
              <Trophy size={18} />
              <span>Active Competitions</span>
            </Link>
            <Link href="/compete/my-teams" className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
              <Users size={18} />
              <span>My Teams</span>
            </Link>
            <Link href="/compete/invitations" className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
              <Bell size={18} />
              <span>Invitations</span>
            </Link>
          </div>
        </div>

        <CompList />
      </main>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}