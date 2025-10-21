'use client';

import { Pending_requests, Team, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import TeamInvitationsList from '@/components/compete/TeamInvitationsList';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

type InvitationWithDetails = Pending_requests & {
  team: Team & {
    team_leader: User;
  };
  user: User;
};

export default function TeamInvitationsPage() {
  const [invitations, setInvitations] = useState<InvitationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await fetch('/api/invite-to-team');
        if (!response.ok) throw new Error('Failed to fetch invitations');
        const data = await response.json();
        setInvitations(data);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  const handleAcceptInvitation = async (requestId: string) => {
    try {
      const response = await fetch('/api/join-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_id: requestId }),
      });

      if (!response.ok) throw new Error('Failed to accept invitation');

      // Remove the accepted invitation from the list
      setInvitations((prev) =>
        prev.filter((inv) => inv.request_id !== requestId)
      );

      // Optionally redirect to the team page
      const data = await response.json();
      if (data.team_id) {
        router.push(`/team/${data.team_id}`);
      }
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };

  const handleRejectInvitation = async (requestId: string) => {
    try {
      const response = await fetch('/api/join-team/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_id: requestId }),
      });

      if (!response.ok) throw new Error('Failed to reject invitation');

      // Remove the rejected invitation from the list
      setInvitations((prev) =>
        prev.filter((inv) => inv.request_id !== requestId)
      );
    } catch (error) {
      console.error('Error rejecting invitation:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
            </div>
          ) : (
            <TeamInvitationsList
              invitations={invitations}
              onAccept={handleAcceptInvitation}
              onReject={handleRejectInvitation}
            />
          )}
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
