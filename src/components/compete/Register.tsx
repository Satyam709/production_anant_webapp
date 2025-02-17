"use client";
import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register_Button({
  compi_id,
  isRegistrationOpen,
  isLoggedin,
}: {
  compi_id: string;
  isRegistrationOpen: boolean;
  isLoggedin: boolean;
}) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [selectedTeamName, setSelectedTeamName] = useState<string | null>(null);
  const [teamRegister, setTeamregister] = useState<null | string>(null);

  const router = useRouter();

  interface Team {
    team_id: number;
    team_name: string;
    team_members: { name: string }[];
  }

  useEffect(() => {
    async function checkRegistration(compi_id: string) {
      let searchTeam = false;
      const res = await fetch(
        `/api/competitions/${compi_id}/check-registration`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data?.team_registered) {
          setTeamregister(data.team_registered.team_name);
        }
        setIsRegistered(data.registered);
        searchTeam = !data.registered;
      }
      if (searchTeam) {
        const res = await fetch(`/api/competitions/${compi_id}/get-teams`, {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setTeams(data.valid_teams);
        }
      }
    }
    if (isRegistrationOpen) {
      checkRegistration(compi_id);
    }
  }, [isRegistered]);

  const handleRegister = async () => {
    async function registerForEvent(compi_id: string) {
      if (selectedTeam == null) {
        return;
      }
      const res = await fetch(`/api/competitions/${compi_id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team_id: selectedTeam }),
      });
      console.log(await res.json());
      if (!res.ok) {
        return { success: false, message: "Failed to register!" };
      } else {
        setIsRegistered(true);
        setTeamregister(selectedTeamName);
        router.refresh();
      }
    }
    registerForEvent(compi_id);
  };

  if (isLoggedin) {
    return (
      <>
        {/* Team Selection Section */}
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Select Your Team
            </h2>
            {teams.length == 0 &&
              isRegistrationOpen &&
              isRegistered == false && (
                <p>
                  Only a team leader can register their team. If you are
                  registered, your team leader has done so. If not, you can ask
                  your team leader or make your own team in dashboard section.
                  Happy Event!
                </p>
              )}
            <div className="space-y-4">
              {teams.length > 0 &&
                teams.map((team) => (
                  <label
                    key={team.team_id}
                    className={`flex items-center justify-between p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedTeam === team.team_id
                        ? "bg-teal-500/20 border-2 border-teal-500/50"
                        : "bg-gray-700/50 border-2 border-transparent hover:bg-gray-700/70"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="team"
                        value={team.team_id}
                        checked={selectedTeam === team.team_id}
                        onChange={() => {
                          setSelectedTeam(team.team_id);
                          setSelectedTeamName(team.team_name);
                        }}
                        className="w-4 h-4 text-teal-500 focus:ring-teal-500 border-gray-600 cursor-pointer"
                      />
                      <div>
                        <p className="font-semibold">{team.team_name}</p>
                        <p className="text-sm text-gray-400">
                          {team.team_members.length + 1} team members
                        </p>
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        selectedTeam === team.team_id
                          ? "bg-teal-500/20"
                          : "bg-gray-600/50"
                      }`}
                    >
                      <Users
                        className={`${
                          selectedTeam === team.team_id
                            ? "text-teal-400"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </label>
                ))}
            </div>
          </div>
        </div>
        {/* Register Button */}
        <div className="max-w-3xl mx-auto px-4 pb-16">
          <button
            onClick={handleRegister}
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
              selectedTeam
                ? "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedTeam}
          >
            {isRegistered
              ? `Registered with ${teamRegister}`
              : isRegistrationOpen
              ? selectedTeam
                ? "Register Now"
                : "Select a Team to Register"
              : "Registrations Closed"}
          </button>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
