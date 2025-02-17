import React from "react";
import { AnantTeam } from "@/data/AnantTeam";
import { Linkedin, GitHub, Instagram } from "react-feather";
import Link from "next/link";

const Members = () => {
  const members = AnantTeam.reduce((acc, member) => {
    if (acc[member.Team]) {
      acc[member.Team].push(member);
    } else {
      acc[member.Team] = [member];
    }
    return acc;
  }, {} as Record<string, typeof AnantTeam>);

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(members).map(([teamName, teamMembers], idx) => (
          <div
            key={idx}
            className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          >
            <h3 className="text-xl font-semibold mb-4 text-primary-cyan">
              {teamName}
            </h3>
            <ul className="space-y-2">
              {teamMembers.map((member) => (
                <li
                  key={member.Title}
                  className="text-gray-400 flex items-center justify-between"
                >
                  <span>{member.Title}</span>
                  <div className="flex gap-2">
                    {member["Linkedin"] && (
                      <Link
                        href={member["Linkedin"]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin
                          className="text-blue-500 hover:text-blue-700"
                          size={18}
                        />
                      </Link>
                    )}
                    {member["Git Hub"] && (
                      <Link
                        href={member["Git Hub"]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHub
                          className="text-gray-300 hover:text-gray-500"
                          size={18}
                        />
                      </Link>
                    )}
                    {member["insta link"] && (
                      <Link
                        href={member["insta link"]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram
                          className="text-pink-500 hover:text-pink-700"
                          size={18}
                        />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Members;
