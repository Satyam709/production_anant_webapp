import React from "react";
import { User, Mail, Building, Book, Calendar, Linkedin, Github, Instagram} from "lucide-react";
import { getUserInfoType } from "@/lib/actions/Profile";

const ProfileInfo = ({ userInfo }: { userInfo: getUserInfoType }) => {
  if (!userInfo) return <div>No user information available</div>;

  return (
    <div className="p-8 rounded-2xl bg-black/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Full Name</label>
          <div className="relative flex items-center gap-2">
            <User className="text-gray-400" />
            <span className="text-white">{userInfo.name}</span>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <div className="relative flex items-center gap-2">
            <Mail className="text-gray-400" />
            <span className="text-white">{userInfo.roll_number}@nitkkr.ac.in</span>
          </div>
        </div>

        {/* Team */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Team</label>
          <div className="relative flex items-center gap-2">
            <Building className="text-gray-400" />
            <span className="text-white">{userInfo.club_dept?.join(", ")}</span>
          </div>
        </div>

        {/* Branch */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Branch</label>
          <div className="relative flex items-center gap-2">
            <Book className="text-gray-400" />
            <span className="text-white">{userInfo.branch}</span>
          </div>
        </div>

        {/* Graduation Year */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Graduation Year</label>
          <div className="relative flex items-center gap-2">
            <Calendar className="text-gray-400" />
            <span className="text-white">{userInfo.batch}</span>
          </div>
        </div>

        {/*LinkedIn*/}
        <div>
          <label className="block text-sm text-gray-300 mb-1">LinkedIn</label>
          <div className="relative flex items-center gap-2">
            <Linkedin className="text-gray-400" />
            <span className="text-white">{}</span>
          </div>
        </div>

        {/*GitHub*/}
        <div>
          <label className="block text-sm text-gray-300 mb-1">GitHub</label>
          <div className="relative flex items-center gap-2">
            <Github className="text-gray-400" />
            <span className="text-white">{}</span>
          </div>
        </div>

        {/*Instagram*/}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Instagram</label>
          <div className="relative flex items-center gap-2">
            <Instagram className="text-gray-400" />
            <span className="text-white">{}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileInfo;
