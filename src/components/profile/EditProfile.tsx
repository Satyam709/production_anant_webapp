// EditProfile.tsx
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Book, Calendar, Save } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import FormDropdown from '@/components/ui/FormDropdown';

const EditProfile = () => {
  const teams = [
    'Tech',
    'PR & Social Media',
    'Management',
    'Education & Outreach',
    'Content',
  ];
  
  const branchOptions = ['CSE', 'MnC', 'AI & ML', 'IT', 'Other'];
  const graduationYears = ['2025', '2026', '2027', '2028', '2029'];

  // State for selected vals
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedGraduationYear, setSelectedGraduationYear] = useState('');

  return (
    <div className="p-8 rounded-2xl bg-black/30">
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
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
                placeholder="Enter your email"
                className="pl-10 px-3 py-2.5 bg-black/30 border border-gray-700 rounded-lg text-white w-full"
              />
            </div>
          </div>

          {/* Phone Number */}
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
          </div>

          {/* Team */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Team</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <FormDropdown
                label="Select Team"
                options={teams}
                value={selectedTeam}
                onSelect={setSelectedTeam}
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
                onSelect={setSelectedBranch}
              />
            </div>
          </div>

          {/* Graduation Year*/}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Graduation Year</label>
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

          {/* Address */}
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
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <GradientButton type="submit" className="px-12 py-3">
            <Save className="h-5 w-5 mr-2" />
            Save
          </GradientButton>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
