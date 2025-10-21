'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';

import { InternshipWithUser } from '@/types/internship';

const InternshipDashboard = () => {
  const router = useRouter();
  const [internships, setInternships] = useState<InternshipWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await fetch('/api/internships/my');
      if (!response.ok) {
        throw new Error('Failed to fetch internships');
      }
      const data = await response.json();
      setInternships(data);
    } catch (err) {
      setError('Failed to load internships');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/internships?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete internship');
      }

      // Refresh the internships list
      fetchInternships();
    } catch (err) {
      console.error('Error deleting internship:', err);
      setError('Failed to delete internship');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-blue-200/80">Loading internships...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-4">
          {error}
        </div>
      )}

      {/* Internship List */}
      <div className="grid grid-cols-1 gap-4">
        {internships.map((internship) => (
          <div
            key={internship.id}
            className="bg-black/20 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-blue-100">
                  {internship.title}
                </h3>
                <p className="text-blue-200/80 mt-1">
                  {internship.company_name} • {internship.duration}
                </p>
                {internship.description && (
                  <p className="text-blue-200/60 mt-2">
                    {internship.description}
                  </p>
                )}
                <div className="mt-4">
                  <span className="text-sm text-blue-200/40">
                    Added by {internship.user.name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(internship.id)}
                className="p-2 hover:bg-red-500/10 rounded-lg group transition-colors"
              >
                <Trash2 className="h-5 w-5 text-red-400 group-hover:text-red-300" />
              </button>
            </div>

            <button
              onClick={() => router.push(`/internship/${internship.id}`)}
              className="inline-block mt-4 text-[#00E0FF] hover:text-[#00E0FF]/80 transition-colors"
            >
              View Details →
            </button>
          </div>
        ))}

        {internships.length === 0 && (
          <div className="text-center text-blue-200/60 py-8">
            No internships found
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipDashboard;
