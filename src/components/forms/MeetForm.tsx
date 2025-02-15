import React, { useState } from 'react';
import { Users, Loader, Plus, Pencil, Trash2 } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import Modal from '../ui/Modal';

type Meeting = {
  id: string;
  venue: string;
  starts: Date;
  duration: number;
  topic_of_discussion: string;
  attendees: string[];
};

// Mock data
const mockMeetings: Meeting[] = [
  {
    id: '1',
    venue: 'Conference Room A',
    starts: new Date('2025-03-15T10:00:00'),
    duration: 60,
    topic_of_discussion: 'Project Planning Meeting',
    attendees: ['John Doe', 'Jane Smith', 'Bob Johnson'],
  },
  {
    id: '2',
    venue: 'Virtual Meeting Room',
    starts: new Date('2025-03-16T14:30:00'),
    duration: 45,
    topic_of_discussion: 'Technical Review',
    attendees: ['Alice Brown', 'Charlie Wilson'],
  },
];

const MeetForm = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [formData, setFormData] = useState<Omit<Meeting, 'id' | 'attendees'>>({
    venue: '',
    starts: new Date(),
    duration: 60,
    topic_of_discussion: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingMeeting) {
        setMeetings(meetings.map(meeting => 
          meeting.id === editingMeeting.id 
            ? { ...formData, id: meeting.id, attendees: meeting.attendees } 
            : meeting
        ));
        setSuccess('Meeting updated successfully!');
      } else {
        const newMeeting = {
          ...formData,
          id: Date.now().toString(),
          attendees: [],
        };
        setMeetings([...meetings, newMeeting]);
        setSuccess('Meeting scheduled successfully!');
      }

      setFormData({
        venue: '',
        starts: new Date(),
        duration: 60,
        topic_of_discussion: '',
      });
      setIsModalOpen(false);
      setEditingMeeting(null);
    } catch (err: any) {
      setError(editingMeeting ? 'Failed to update meeting' : 'Failed to schedule meeting');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setFormData({
      venue: meeting.venue,
      starts: meeting.starts,
      duration: meeting.duration,
      topic_of_discussion: meeting.topic_of_discussion,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMeetings(meetings.filter(meeting => meeting.id !== id));
      setSuccess('Meeting deleted successfully!');
    } catch (err) {
      setError('Failed to delete meeting');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'starts') {
      setFormData(prev => ({ ...prev, starts: new Date(value) }));
    } else if (name === 'duration') {
      setFormData(prev => ({ ...prev, duration: parseInt(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const openCreateModal = () => {
    setEditingMeeting(null);
    setFormData({
      venue: '',
      starts: new Date(),
      duration: 60,
      topic_of_discussion: '',
    });
    setIsModalOpen(true);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-primary-cyan" />
          <h2 className="text-xl font-semibold text-white">Meetings</h2>
        </div>
        <GradientButton onClick={openCreateModal} type="button">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Schedule Meeting</span>
          </div>
        </GradientButton>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-500">
          {success}
        </div>
      )}

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map(meeting => (
          <div
            key={meeting.id}
            className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-blue/20 rounded-lg">
                    <Users className="h-5 w-5 text-primary-cyan" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{meeting.topic_of_discussion}</h3>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  <span className="text-gray-400">Date:</span>{' '}
                  {meeting.starts.toLocaleDateString()}
                </p>
                <p>
                  <span className="text-gray-400">Time:</span>{' '}
                  {formatTime(meeting.starts)}
                </p>
                <p>
                  <span className="text-gray-400">Duration:</span>{' '}
                  {meeting.duration} minutes
                </p>
                <p>
                  <span className="text-gray-400">Venue:</span>{' '}
                  {meeting.venue}
                </p>
                <div>
                  <span className="text-gray-400">Attendees:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {meeting.attendees.map((attendee, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-800 rounded-full text-gray-300"
                      >
                        {attendee}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2 border-t border-gray-800 pt-4">
                <button
                  onClick={() => handleEdit(meeting)}
                  className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(meeting.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMeeting ? 'Edit Meeting' : 'Schedule Meeting'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter meeting venue"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                name="starts"
                value={formData.starts instanceof Date ? formData.starts.toISOString().slice(0, 16) : ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="15"
                step="15"
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Topic of Discussion
            </label>
            <textarea
              name="topic_of_discussion"
              value={formData.topic_of_discussion}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary- ring-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter topic of discussion"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <GradientButton disabled={loading}>
              <div className="flex items-center space-x-2">
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Users className="h-5 w-5" />
                )}
                <span>
                  {loading
                    ? editingMeeting
                      ? 'Updating...'
                      : 'Scheduling...'
                    : editingMeeting
                    ? 'Update Meeting'
                    : 'Schedule Meeting'}
                </span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MeetForm;