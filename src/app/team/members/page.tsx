import fs from "fs";
import path from "path";
import MembersTable from "@/components/team/TeamMembers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Member {
  [key: string]: string | number;
}

async function getMembers(): Promise<Member[]> {
  try {
    const filePath = path.join(process.cwd(), "src/data/AnantMembers.csv");
    const csv = fs.readFileSync(filePath, "utf-8");

    const rows = csv.split("\n").filter(Boolean);
    const headers = rows[0].split(",");
    return rows.slice(1).map((row) => {
      const values = row.split(",");
      return headers.reduce((obj, header, i) => {
        obj[header.trim()] = values[i]?.trim();
        return obj;
      }, {} as Record<string, string>);
    });
  } catch (error) {
    console.error('Error reading members data:', error);
    return [];
  }
}

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>
      
      <Navbar />
      
      <main className="relative z-10 container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-100">
          Anant Members
        </h1>
        <MembersTable members={members} />
      </main>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
