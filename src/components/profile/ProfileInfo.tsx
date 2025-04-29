import React, { useState } from "react";
import { User, Mail, Building, Book, Calendar, Linkedin, Github, Instagram, Pencil, Save, X } from "lucide-react";
import { getUserInfoType, UpdateProfile } from "@/lib/actions/Profile";

const ProfileInfo = ({ userInfo }: { userInfo: getUserInfoType }) => {
  const [isEditing, setIsEditing] = useState({
    name: false,
    linkedIn: false,
    github: false,
    instagram: false,
    batch: false
  });

  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    linkedIn: userInfo?.linkedIn || "",
    github: userInfo?.github || "",
    instagram: userInfo?.instagram || "",
    batch: userInfo?.batch || ""
  });

  const [optimisticData, setOptimisticData] = useState({
    name: userInfo?.name || "",
    linkedIn: userInfo?.linkedIn || "",
    github: userInfo?.github || "",
    instagram: userInfo?.instagram || "",
    batch: userInfo?.batch || ""
  });

  const handleSave = async (field: 'name' | 'linkedIn' | 'github' | 'instagram' | 'batch') => {
    try {
      const result = await UpdateProfile(
        field === 'name' ? formData.name : userInfo?.name ?? undefined,
        userInfo?.branch,
        field === 'batch' ? formData.batch : userInfo?.batch ?? undefined,
        userInfo?.club_dept,
        field === 'linkedIn' ? formData.linkedIn : userInfo?.linkedIn ?? undefined,
        field === 'github' ? formData.github : userInfo?.github ?? undefined,
        field === 'instagram' ? formData.instagram : userInfo?.instagram ?? undefined
      );
      if (result) {
        // Update optimistic data on success
        setOptimisticData(prev => ({
          ...prev,
          [field]: formData[field]
        }));
        setIsEditing(prev => ({ ...prev, [field]: false }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Generate graduation year options
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 5 }, (_, i) => (currentYear + i).toString());

  if (!userInfo) return <div>No user information available</div>;

  return (
    <div className="p-4 sm:p-8 rounded-2xl bg-black/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Full Name</label>
          <div className="relative flex items-center gap-2">
            <User className="text-gray-400" />
            {isEditing.name ? (
                <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 text-white px-2 py-1 rounded flex-1 w-full text-sm"
                />
                <button
                  onClick={() => handleSave('name')}
                  className="p-1 hover:bg-green-700/50 rounded-full transition-colors"
                >
                  <Save className="w-4 h-4 text-green-400" />
                </button>
                <button
                  onClick={() => setIsEditing(prev => ({ ...prev, name: false }))}
                  className="p-1 hover:bg-red-700/50 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ) : (
              <>
                <span className="text-white">{optimisticData.name}</span>
                <button 
                  onClick={() => setIsEditing(prev => ({ ...prev, name: !prev.name }))}
                  className="p-1 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                  <Pencil className="w-4 h-4 text-gray-400" />
                </button>
              </>
            )}
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
            {isEditing.batch ? (
              <div className="flex items-center gap-2 w-full">
                <select
                  value={formData.batch}
                  onChange={(e) => setFormData(prev => ({ ...prev, batch: e.target.value }))}
                  className="bg-gray-800 text-white px-2 py-1 rounded flex-1 w-full text-sm"
                >
                  {graduationYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleSave('batch')}
                  className="p-1 hover:bg-green-700/50 rounded-full transition-colors"
                >
                  <Save className="w-4 h-4 text-green-400" />
                </button>
                <button
                  onClick={() => setIsEditing(prev => ({ ...prev, batch: false }))}
                  className="p-1 hover:bg-red-700/50 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ) : (
              <>
                <span className="text-white">{optimisticData.batch}</span>
                <button 
                  onClick={() => setIsEditing(prev => ({ ...prev, batch: !prev.batch }))}
                  className="p-1 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                  <Pencil className="w-4 h-4 text-gray-400" />
                </button>
              </>
            )}
          </div>
        </div>

        {/*LinkedIn*/}
        <div>
          <label className="block text-sm text-gray-300 mb-1">LinkedIn</label>
          <div className="relative flex items-center gap-2">
            <Linkedin className="text-gray-400" />
            {isEditing.linkedIn ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={formData.linkedIn}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedIn: e.target.value }))}
                  className="bg-gray-800 text-white px-2 py-1 rounded flex-1 w-full text-sm"
                />
                <button
                  onClick={() => handleSave('linkedIn')}
                  className="p-1 hover:bg-green-700/50 rounded-full transition-colors"
                >
                  <Save className="w-4 h-4 text-green-400" />
                </button>
                <button
                  onClick={() => setIsEditing(prev => ({ ...prev, linkedIn: false }))}
                  className="p-1 hover:bg-red-700/50 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ) : (
              <>
                <span className="text-white">{optimisticData.linkedIn || ''}</span>
                <button 
                  onClick={() => setIsEditing(prev => ({ ...prev, linkedIn: !prev.linkedIn }))}
                  className="p-1 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                  <Pencil className="w-4 h-4 text-gray-400" />
                </button>
              </>
            )}
          </div>
        </div>

        {/*GitHub*/}
        <div>
          <label className="block text-sm text-gray-300 mb-1">GitHub</label>
          <div className="relative flex items-center gap-2">
            <Github className="text-gray-400" />
            {isEditing.github ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                  className="bg-gray-800 text-white px-2 py-1 rounded flex-1 w-full text-sm"
                />
                <button
                  onClick={() => handleSave('github')}
                  className="p-1 hover:bg-green-700/50 rounded-full transition-colors"
                >
                  <Save className="w-4 h-4 text-green-400" />
                </button>
                <button
                  onClick={() => setIsEditing(prev => ({ ...prev, github: false }))}
                  className="p-1 hover:bg-red-700/50 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ) : (
              <>
                <span className="text-white">{optimisticData.github || ''}</span>
                <button 
                  onClick={() => setIsEditing(prev => ({ ...prev, github: !prev.github }))}
                  className="p-1 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                  <Pencil className="w-4 h-4 text-gray-400" />
                </button>
              </>
            )}
          </div>
        </div>

        {/*Instagram*/}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Instagram</label>
          <div className="relative flex items-center gap-2">
            <Instagram className="text-gray-400" />
            {isEditing.instagram ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  className="bg-gray-800 text-white px-2 py-1 rounded flex-1 w-full text-sm"
                />
                <button
                  onClick={() => handleSave('instagram')}
                  className="p-1 hover:bg-green-700/50 rounded-full transition-colors"
                >
                  <Save className="w-4 h-4 text-green-400" />
                </button>
                <button
                  onClick={() => setIsEditing(prev => ({ ...prev, instagram: false }))}
                  className="p-1 hover:bg-red-700/50 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ) : (
              <>
                <span className="text-white">{optimisticData.instagram || ''}</span>
                <button 
                  onClick={() => setIsEditing(prev => ({ ...prev, instagram: !prev.instagram }))}
                  className="p-1 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                  <Pencil className="w-4 h-4 text-gray-400" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
