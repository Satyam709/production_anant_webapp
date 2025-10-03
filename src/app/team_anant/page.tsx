import OfficeBearers from '@/components/team/OfficeBearers'
import Members from '@/components/team/Members'
import TeamArchive from '@/components/team/TeamArchive'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAnantTeamMembers, getAllTeamDataByYears, getAvailableTeamYears } from '@/lib/actions/AnantTeam'
import { position_options } from '@prisma/client'

// SSG - Revalidate every 30 days
export const revalidate = 60 * 60 * 24 * 30;

// Office bearer positions
const OFFICE_BEARER_POSITIONS: position_options[] = [
  position_options.President,
  position_options.VicePresident,
  position_options.Secretary,
  position_options.General_Secretary,
  position_options.Joint_Secretary,
  position_options.Coordinator,
]

export default async function TeamPage() {
  try {
    // Fetch current team members and all archive data
    const [teamMembers, allTeamData, availableYears] = await Promise.all([
      getAnantTeamMembers(),
      getAllTeamDataByYears(),
      getAvailableTeamYears()
    ]);
    
    // Filter office bearers based on position
    const officeBearers = teamMembers.filter(member => 
      member.position && OFFICE_BEARER_POSITIONS.includes(member.position)
    )
    
    // Filter executive heads (non-office bearers)
    const executiveHeads = teamMembers.filter(member => 
      !member.position || !OFFICE_BEARER_POSITIONS.includes(member.position)
    )
    
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <div className="fixed inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
        </div>
        
        <Navbar />
        
        <main className="relative z-10 container mx-auto px-4 py-20">
          {/* Current Year Team */}
          <div className="mb-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold mb-4 text-white">
                Team Anant
              </h1>
              <p className="text-xl text-gray-300 mb-2">
                Academic Year {teamMembers[0]?.year || new Date().getFullYear()}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-blue to-primary-cyan mx-auto rounded-full"></div>
            </div>
            
            <OfficeBearers members={officeBearers} />
            <Members members={executiveHeads} />
          </div>
          
          {/* Archive Section */}
          <TeamArchive 
            allTeamData={allTeamData} 
            availableYears={availableYears}
            officeBearerPositions={OFFICE_BEARER_POSITIONS}
          />
        </main>     
        
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading team page:", error)
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Navbar />
        <main className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">
              Team Anant
            </h1>
            <p className="text-xl text-red-400">
              Error loading team data. Please try again later.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
