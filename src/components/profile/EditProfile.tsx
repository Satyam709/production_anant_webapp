// EditProfile.tsx
import React, { useState } from "react";
import { User, Mail, Building, Book, Calendar, Save } from "lucide-react";

import FormDropdown from "@/components/ui/FormDropdown";
import { branch_options, club_dept_options } from "@prisma/client";
import { UpdateProfile } from "@/lib/actions/Profile";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { useTransition } from "react";


const EditProfile = () => {
  const teams = Object.values(club_dept_options); // get from db

  const branchOptions = Object.values(branch_options);
  const graduationYears = ["2025", "2026", "2027", "2028", "2029"];

  const router = useRouter();
  const { data: session, update } = useSession();
  // console.log(
  //   getSession().then((res) => console.log("resolved seesion ", res))
  // );

  const userInfo = session?.user.info;

  // State for selected vals
  const [selectedTeam, setSelectedTeam] = useState(
    userInfo?.clubDept?.at(0) || undefined
  );

  const [selectedBranch, setSelectedBranch] = useState<
    branch_options | undefined
  >(userInfo?.branch || undefined);

  // not in db for now
  const [selectedGraduationYear, setSelectedGraduationYear] = useState(
    userInfo?.batch || undefined
  );

  const [name, setName] = useState(userInfo?.name || undefined);

  const setBranch = (option: string) => {
    if (branchOptions.includes(option as branch_options)) {
      setSelectedBranch(option as branch_options);
    }
  };

  const setTeam = (option: string) => {
    if (teams.includes(option as club_dept_options)) {
      setSelectedTeam(option as club_dept_options);
    }
  };

  const handleSave = async () => {
    try {
      const res = await UpdateProfile(
        name,
        selectedBranch,
        selectedGraduationYear,
        Array(selectedTeam as club_dept_options)
      );

      // update the user session on success
      if (res) {
        await update({
          user: {
            ...session?.user.info,
            name: name,
            branch: selectedBranch,
            batch: selectedGraduationYear,
            clubDept: [selectedTeam],
          },
        });

        // router.replace("/profile");
      }
    } catch (error) {
      console.log("Error while updating profile", error);
    }
  };

  return (
    <div className="p-8 rounded-2xl bg-black/30">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSave();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="pl-10 px-3 py-2.5 bg-black/30 border border-gray-700 rounded-lg text-white w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={`${userInfo?.rollNo}@nitkkr.ac.in`} // disabled
                disabled
                placeholder="Enter your email"
                className="pl-10 px-3 py-2.5 bg-black/30 border border-gray-700 rounded-lg text-white w-full"
              />
            </div>
          </div>

          {/* Phone Number
          <div>
            <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="pl-10 px-3 py-2.5 bg-black/30 border border-gray-700 rounded-lg text-white w-full"
              />
            </div>
          </div> */}

          {/* Team */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Team</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <FormDropdown
                label="Select Team"
                options={teams}
                value={selectedTeam}
                onSelect={setTeam}
              />
            </div>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Branch</label>
            <div className="relative">
              <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <FormDropdown
                label="Select Branch"
                options={branchOptions}
                value={selectedBranch}
                onSelect={setBranch}
              />
            </div>
          </div>

          {/* Graduation Year*/}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Graduation Year
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <FormDropdown
                label="Select Graduation Year"
                options={graduationYears}
                value={selectedGraduationYear}
                onSelect={setSelectedGraduationYear}
              />
            </div>
          </div>

          {/* Address
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                className="pl-10 px-3 py-2.5 bg-black/30 border border-gray-700 rounded-lg text-white w-full"
              />
            </div>
          </div> */}
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Save className="h-5 w-5" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
