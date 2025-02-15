import React, { useState } from 'react';
import { Calendar, Loader, Upload, Pencil, Trash2, Plus } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import Modal from '../ui/Modal';

type Event = {
  id: string;
  eventName: string;
  conductedBy: string;
  conductedOn: Date;
  registration_deadline: Date;
  venue: string;
  prize: string;
  description: string;
  banner_image: string;
};

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    eventName: 'Tech Summit 2025',
    conductedBy: 'Engineering Department',
    conductedOn: new Date('2025-04-15'),
    registration_deadline: new Date('2025-04-01'),
    venue: 'Main Auditorium',
    prize: '$1000 in prizes',
    description: 'Annual technology summit featuring industry experts',
    banner_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    eventName: 'Hackathon Spring 2025',
    conductedBy: 'Computer Science Club',
    conductedOn: new Date('2025-05-20'),
    registration_deadline: new Date('2025-05-10'),
    venue: 'Innovation Lab',
    prize: '$500 for winners',
    description: '24-hour coding challenge',
    banner_image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
  },
];

const EventForm = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    eventName: '',
    conductedBy: '',
    conductedOn: new Date(),
    registration_deadline: new Date(),
    venue: '',
    prize: '',
    description: '',
    banner_image: '',
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
      
      if (editingEvent) {
        setEvents(events.map(event => 
          event.id === editingEvent.id 
            ? { ...formData, id: event.id } 
            : event
        ));
        setSuccess('Event updated successfully!');
      } else {
        const newEvent = {
          ...formData,
          id: Date.now().toString(),
        };
        setEvents([...events, newEvent]);
        setSuccess('Event created successfully!');
      }

      setFormData({
        eventName: '',
        conductedBy: '',
        conductedOn: new Date(),
        registration_deadline: new Date(),
        venue: '',
        prize: '',
        description: '',
        banner_image: '',
      });
      setIsModalOpen(false);
      setEditingEvent(null);
    } catch (err: any) {
      setError(editingEvent ? 'Failed to update event' : 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setEvents(events.filter(event => event.id !== id));
      setSuccess('Event deleted successfully!');
    } catch (err) {
      setError('Failed to delete event');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'conductedOn' || name === 'registration_deadline') {
      setFormData(prev => ({ ...prev, [name]: new Date(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      eventName: '',
      conductedBy: '',
      conductedOn: new Date(),
      registration_deadline: new Date(),
      venue: '',
      prize: '',
      description: '',
      banner_image: '',
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-primary-cyan" />
          <h2 className="text-xl font-semibold text-white">Events</h2>
        </div>
        <GradientButton onClick={openCreateModal} type="button">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create Event</span>
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div
            key={event.id}
            className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
          >
            <div className="relative h-48">
              <img
                src={event.banner_image}
                alt={event.eventName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{event.eventName}</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="text-gray-400">By:</span> {event.conductedBy}</p>
                <p><span className="text-gray-400">Date:</span> {event.conductedOn.toLocaleDateString()}</p>
                <p><span className="text-gray-400">Venue:</span> {event.venue}</p>
                {event.prize && (
                  <p><span className="text-gray-400">Prize:</span> {event.prize}</p>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
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
        title={editingEvent ? 'Edit Event' : 'Create Event'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Event Name
              </label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter event name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Conducted By
              </label>
              <input
                type="text"
                name="conductedBy"
                value={formData.conductedBy}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter conducting organization"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Event Banner Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="url"
                name="banner_image"
                value={formData.banner_image}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter banner image URL"
              />
              <button
                type="button"
                className="px-4 py-2.5 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
              >
                <Upload className="h-5 w-5" />
              </button>
            </div>
            {formData.banner_image && (
              <div className="mt-2 relative rounded-lg overflow-hidden h-40">
                <img
                  src={formData.banner_image}
                  alt="Event banner preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Event Date
              </label>
              <input
                type="datetime-local"
                name="conductedOn"
                value={formData.conductedOn instanceof Date ? formData.conductedOn.toISOString().slice(0, 16) : ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Registration Deadline
              </label>
              <input
                type="datetime-local"
                name="registration_deadline"
                value={formData.registration_deadline instanceof Date ? formData.registration_deadline.toISOString().slice(0, 16) : ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="Enter venue"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Prize Details
              </label>
              <input
                type="text"
                name="prize"
                value={formData.prize}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter prize details"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter event description"
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
                  <Calendar className="h-5 w-5" />
                )}
                <span>
                  {loading
                    ? editingEvent
                      ? 'Updating...'
                      : 'Creating...'
                    : editingEvent
                    ? 'Update Event'
                    : 'Create Event'}
                </span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventForm;