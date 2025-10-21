'use client';

import { Pending_requests, Team, User } from '@prisma/client';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

type InvitationWithDetails = Pending_requests & {
  team: Team & {
    team_leader: User;
  };
  user: User;
};

interface TeamInvitationsListProps {
  invitations: InvitationWithDetails[];
  onAccept: (requestId: string) => Promise<void>;
  onReject: (requestId: string) => Promise<void>;
}

const TeamInvitationsList: React.FC<TeamInvitationsListProps> = ({
  invitations,
  onAccept,
  onReject,
}) => {
  const [actionLoading, setActionLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAccept = async (requestId: string) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: true }));
    try {
      await onAccept(requestId);
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  const handleReject = async (requestId: string) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: true }));
    try {
      await onReject(requestId);
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  if (invitations.length === 0) {
    return (
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800 text-center">
        <p className="text-gray-400">No pending team invitations</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invitations.map((invitation) => (
        <div
          key={invitation.request_id}
          className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {invitation.team.team_name}
              </h3>
              <p className="text-sm text-gray-400">
                Team Leader: {invitation.team.team_leader.name}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(invitation.request_id)}
                disabled={actionLoading[invitation.request_id]}
                className="p-2 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => handleReject(invitation.request_id)}
                disabled={actionLoading[invitation.request_id]}
                className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamInvitationsList;
