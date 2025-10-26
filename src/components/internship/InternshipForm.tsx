'use client';

import { InternshipClass,InternshipDepartment } from '@prisma/client';
import { useState } from 'react';

interface InternshipFormData {
  title: string;
  company_name: string;
  duration: string;
  description?: string;
  link?: string;
  department: InternshipDepartment;
  class: InternshipClass;
  email?: string;
}

const InternshipForm = () => {
  const [formData, setFormData] = useState<InternshipFormData>({
    title: '',
    company_name: '',
    duration: '',
    description: '',
    link: '',
    department: InternshipDepartment.Mathematics,
    class: InternshipClass.MSc,
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create internship');
      }

      // Show success message and reset form
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000); // Hide success message after 3 seconds
      setFormData({
        title: '',
        company_name: '',
        duration: '',
        description: '',
        link: '',
        department: InternshipDepartment.Mathematics,
        class: InternshipClass.MSc,
        email: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-black/20 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-blue-100">Basic Information</h3>

          <div>
            <label htmlFor="title" className="block text-blue-200/80 mb-2">
              Internship Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => {
                setError('');
                setFormData({ ...formData, title: e.target.value });
              }}
              required
              className="w-full bg-black/40 border border-blue-900/50 rounded-lg p-3 text-blue-100 focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF] transition-colors"
              placeholder="e.g., Data Science Intern"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-blue-200/80 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              value={formData.company_name}
              onChange={(e) =>
                setFormData({ ...formData, company_name: e.target.value })
              }
              required
              className="w-full bg-black/40 border border-blue-900/50 rounded-lg p-3 text-blue-100 focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF] transition-colors"
              placeholder="e.g., Google"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-blue-200/80 mb-2">
              Duration *
            </label>
            <input
              type="text"
              id="duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
              className="w-full bg-black/40 border border-blue-900/50 rounded-lg p-3 text-blue-100 focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF] transition-colors"
              placeholder="e.g., 3 months"
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-black/20 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-blue-100">
            Additional Details
          </h3>

          <div>
            <label
              htmlFor="description"
              className="block text-blue-200/80 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full bg-black/40 border border-blue-900/50 rounded-lg p-3 text-blue-100 focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF] transition-colors"
              placeholder="Describe your internship experience..."
            />
          </div>

          <div>
            <label htmlFor="link" className="block text-blue-200/80 mb-2">
              LinkedIn/Website Link
            </label>
            <input
              type="url"
              id="link"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="w-full bg-black/40 border border-blue-900/50 rounded-lg p-3 text-blue-100 focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF] transition-colors"
              placeholder="https://"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-blue-200/80 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-black/40 border border-blue-900/50 rounded-lg p-3 text-blue-100 focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF] transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Department & Class Selection */}
        <div className="bg-black/20 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-blue-100">Category</h3>

          <div>
            <label htmlFor="department" className="block text-blue-200/80 mb-2">
              Department *
            </label>
            <select
              id="department"
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value as InternshipDepartment,
                })
              }
              required
              className="w-full bg-black/40 border border-blue-900/50 rounded-lg p-3 text-blue-100 focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF] transition-colors"
            >
              {Object.values(InternshipDepartment).map((dept) => (
                <option key={dept} value={dept}>
                  {dept.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="class" className="block text-blue-200/80 mb-2">
              Class *
            </label>
            <select
              id="class"
              value={formData.class}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  class: e.target.value as InternshipClass,
                })
              }
              required
              className="w-full bg-black/40 border border-blue-900/50 rounded-lg p-3 text-blue-100 focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF] transition-colors"
            >
              {Object.values(InternshipClass).map((cls) => (
                <option key={cls} value={cls}>
                  {cls.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Success/Error Message */}
        {success ? (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 rounded-lg p-4">
            Internship added successfully!
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-4">
            {error}
          </div>
        ) : null}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all ${
            loading
              ? 'bg-blue-900/50 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Adding Internship...' : 'Add Internship'}
        </button>
      </form>
    </div>
  );
};

export default InternshipForm;
