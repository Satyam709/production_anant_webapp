import React, {
  useState,
  useRef,
  type RefObject,
  useCallback,
  useEffect,
} from "react";
import {
  Calendar,
  Loader,
  Pencil,
  Trash2,
  Plus,
  CalendarClock,
  Clock,
  Download,
} from "lucide-react";
import GradientButton from "../ui/GradientButton";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import axios from "axios";
import { uploadServerSideFile } from "@/lib/actions/uploadthing";
import { Prisma } from "@prisma/client";
import { Events } from "@prisma/client";
import { placeholder } from "@/lib/images/placeholder";
import { deleteEvent, getAllParticipants } from "@/lib/actions/Events";
import { ConfirmModal } from "./ConfirmModal";
import { convertToCSV } from "@/helpers/convertToCsv";

type EventFormInput = Omit<Prisma.EventsCreateInput, "createdBy">;

const EventForm = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [events, setEvents] = useState<Events[]>([]);
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
        setEvents([]);
        throw new Error("Failed to fetch events");
      }
      setEvents(res.data.upcomingEvents);
    } catch (err: any) {
      setError(err.message || "Failed to fetch events");
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
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          (editingEvent ? "Failed to update event" : "Failed to create event")
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Events) => {
    setEditingEvent(event);
    setFormData({
      eventName: event.eventName,
      conductedBy: event.conductedBy,
      conductedOn: event.conductedOn,
      registration_deadline: event.registration_deadline,
      venue: event.venue,
      prize: event.prize,
      description: event.description,
    });
    setIsModalOpen(true);
  };

  const handleDownload = useCallback(async (id : string) => {
    try {
      // Fetch the attendees for the meeting
      const res = await getAllParticipants(id);
      if (!res) {
        setError("Failed to fetch participants");
      } else {
        setSuccess("Participants fetched successfully!");
      }

      if (res.length === 0) {
        setError("No participants found");
        return;
      }

      // Convert the attendees data to CSV
      const csv = convertToCSV(res);

      // Trigger the download of the CSV file
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `participants_${id}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading attendees:", error);
    }
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteEvent(id);
    if (res.error) {
      setError(res.error);
    } else {
      setSuccess("Event deleted successfully!");
    }
    refetchEvents();
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
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.event_id}
              className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
            >
              <div className="relative h-48">
                <Image
                  src={event.imageURL || placeholder}
                  alt={event.eventName}
                  className="w-full h-full object-cover"
                  fill
                  sizes="100%"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {event.eventName}
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <span className="text-gray-400">By:</span>{" "}
                    {event.conductedBy}
                  </p>
                  <p>
                    <span className="text-gray-400">Date:</span>{" "}
                    {new Date(event.conductedOn).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="text-gray-400">Venue:</span> {event.venue}
                  </p>
                  {event.prize && (
                    <p>
                      <span className="text-gray-400">Prize:</span>{" "}
                      {event.prize}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleDownload(event.event_id)}
                    className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Confirmation Modal */}
              <ConfirmModal
                isOpen={showDeleteConfirm}
                title="Delete Meeting"
                message={
                  <div className="space-y-4">
                    <p>Are you sure you want to delete this meeting?</p>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-white font-medium">
                        {event.eventName}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(event.conductedOn).toLocaleDateString()} at{" "}
                        {event.venue}
                      </p>
                    </div>
                    <p className="text-sm">This action cannot be undone.</p>
                  </div>
                }
                onConfirm={() => {
                  handleDelete(event.event_id);
                  setShowDeleteConfirm(false);
                }}
                onCancel={() => setShowDeleteConfirm(false)} // Close the modal when canceled
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No events found.</div>
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
    </div>
  );
};

export default EventForm;
