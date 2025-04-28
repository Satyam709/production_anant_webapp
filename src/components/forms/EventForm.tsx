import React, {
  useState,
  useRef,
  type RefObject,
  useCallback,
  useEffect,
} from "react";
import { Calendar, Loader, Plus, CalendarClock, Clock, Pencil, Trash2 } from "lucide-react";
import GradientButton from "../ui/GradientButton";
import Modal from "@/components/ui/Modal";
import axios from "axios";
import { uploadServerSideFile } from "@/lib/actions/uploadthing";
import { Prisma, Events } from "@prisma/client";
import { deleteEvent } from "@/lib/actions/Events";
import EventCard from "@/components/events/EventCard";

type EventFormInput = Omit<Prisma.EventsCreateInput, "createdBy">;

const EventForm = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Events[]>([]);
  const [pastEvents, setPastEvents] = useState<Events[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Events | null>(null);
  const [formData, setFormData] = useState<EventFormInput>({
    eventName: "",
    conductedBy: "",
    conductedOn: new Date(),
    registration_deadline: new Date(),
    venue: "",
    prize: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const conductedOnRef = useRef<HTMLInputElement | null>(null);
  const deadlineRef = useRef<HTMLInputElement | null>(null);

  const handleDateClick = (ref: RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      if (typeof ref.current.showPicker === "function") {
        ref.current.showPicker();
      } else {
        ref.current.focus();
      }
    }
  };

  const refetchEvents = useCallback(async () => {
    setLoadingEvents(true);
    try {
      // Fetch events logic (replace with your actual API call)
      const res = await axios.get("/api/events");
      console.log(res.data);
      if (!res.data || !res.data.upcomingEvents) {
        setUpcomingEvents([]);
        setError("Failed to fetch events");
        throw new Error("Failed to fetch events");
      }
      if (!res.data || !res.data.pastEvents) {
        setPastEvents([]);
        setError("Failed to fetch events");
        throw new Error("Failed to fetch events");
      }

      setUpcomingEvents(res.data.upcomingEvents);
      setPastEvents(res.data.pastEvents);
      // setSuccess("Events fetched successfully!");
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch events");
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  useEffect(() => {
    refetchEvents();
  }, [refetchEvents]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!file && !editingEvent?.imageURL) {
        setError("Please upload an image");
        return;
      }

      let imageURL: string | undefined;

      if (file) {
        const res = await uploadServerSideFile(file);
        if (!res) {
          setError("Failed to upload image");
          return;
        }
        imageURL = res.ufsUrl;
      } else if (editingEvent?.imageURL) {
        imageURL = editingEvent.imageURL;
      }

      console.log("imageurl uplaoding ", imageURL);

      const payload = {
        ...formData,
        imageURL: imageURL,
        conductedOn: new Date(formData.conductedOn).toISOString(),
        registration_deadline: new Date(
          formData.registration_deadline
        ).toISOString(),
      };

      if (editingEvent) {
        // Update event logic (replace with your actual API call)
        await axios.put(`/api/events/${editingEvent.event_id}/edit`, payload);
        setSuccess("Event updated successfully!");
      } else {
        // Create event logic (replace with your actual API call)
        await axios.post("/api/events/create", payload);
        setSuccess("Event created successfully!");
      }

      setFormData({
        eventName: "",
        conductedBy: "",
        conductedOn: new Date(),
        registration_deadline: new Date(),
        venue: "",
        prize: "",
        description: "",
      });

      setFile(null);
      setIsModalOpen(false);
      setEditingEvent(null);
      refetchEvents();
    } catch (err: Error | unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response
      ) {
        const axiosError = err.response as { data?: { message?: string } };
        setError(
          axiosError.data?.message ||
            (editingEvent ? "Failed to update event" : "Failed to create event")
        );
      } else {
        setError(
          editingEvent ? "Failed to update event" : "Failed to create event"
        );
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "conductedOn" || name === "registration_deadline") {
      setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      eventName: "",
      conductedBy: "",
      conductedOn: new Date(),
      registration_deadline: new Date(),
      venue: "",
      prize: "",
      description: "",
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
        <GradientButton onClick={openCreateModal}>
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
      {loadingEvents ? (
        <div className="flex justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary-cyan" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Upcoming Events */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">
              Upcoming Events
            </h2>
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <div key={event.event_id} className="relative group">
                    <EventCard {...event} />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setFormData({
                            eventName: event.eventName,
                            conductedBy: event.conductedBy,
                            conductedOn: event.conductedOn,
                            registration_deadline: event.registration_deadline,
                            venue: event.venue,
                            prize: event.prize || "",
                            description: event.description,
                          });
                          setEditingEvent(event);
                          setIsModalOpen(true);
                        }}
                        className="p-2 bg-black/50 rounded-full text-white hover:text-primary-cyan transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(event.event_id)}
                        className="p-2 bg-black/50 rounded-full text-white hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-4">
                No upcoming events found.
              </div>
            )}
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Past Events</h2>
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <div key={event.event_id} className="relative group">
                    <EventCard {...event} />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setFormData({
                            eventName: event.eventName,
                            conductedBy: event.conductedBy,
                            conductedOn: event.conductedOn,
                            registration_deadline: event.registration_deadline,
                            venue: event.venue,
                            prize: event.prize || "",
                            description: event.description,
                          });
                          setEditingEvent(event);
                          setIsModalOpen(true);
                        }}
                        className="p-2 bg-black/50 rounded-full text-white hover:text-primary-cyan transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(event.event_id)}
                        className="p-2 bg-black/50 rounded-full text-white hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-4">
                No past events found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEvent ? "Edit Event" : "Create Event"}
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
              Event Image
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
              className="w-full text-white file:bg-primary-blue file:border-none file:rounded-md file:p-2 file:text-sm file:font-bold cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Event Date
              </label>
              <div
                className="relative cursor-pointer"
                onClick={() => handleDateClick(conductedOnRef)}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarClock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  ref={conductedOnRef}
                  name="conductedOn"
                  value={new Date(formData.conductedOn)
                    .toISOString()
                    .slice(0, 16)}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      conductedOn: new Date(e.target.value),
                    }))
                  }
                  className="w-full pl-10 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         appearance-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Registration Deadline
              </label>
              <div
                className="relative cursor-pointer"
                onClick={() => handleDateClick(deadlineRef)}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  ref={deadlineRef}
                  name="registration_deadline"
                  value={new Date(formData.registration_deadline)
                    .toISOString()
                    .slice(0, 16)}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      registration_deadline: new Date(e.target.value),
                    }))
                  }
                  className="w-full pl-10 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         appearance-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm"
                  required
                />
              </div>
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
                value={formData.prize || ""}
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
                      ? "Updating..."
                      : "Creating..."
                    : editingEvent
                    ? "Update Event"
                    : "Create Event"}
                </span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Delete Event</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (showDeleteConfirm) {
                    const res = await deleteEvent(showDeleteConfirm);
                    if (res.error) {
                      setError(res.error);
                    } else {
                      setSuccess("Event deleted successfully!");
                      refetchEvents();
                    }
                    setShowDeleteConfirm(null);
                  }
                }}
                className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventForm;
