import React, {
  useState,
  useRef,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Suspense } from "react";
import {
  Users,
  Loader,
  Plus,
  Pencil,
  Trash2,
  CalendarClock,
  QrCode,
  Eye,
} from "lucide-react";
import GradientButton from "../ui/GradientButton";
import Modal from "../ui/Modal";
import { branch_options, Prisma } from "@prisma/client";
import { Meeting } from "@prisma/client";
import axios from "axios";
import { getAttendies } from "@/lib/actions/MeetAction";
import Image from "next/image";

type MeetFormInput = Omit<
  Prisma.MeetingCreateInput,
  "hostID" | "conductor" | "attendees"
>;

const MeetForm = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAttendeesModalOpen, setIsAttendeesModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [formData, setFormData] = useState<MeetFormInput>({
    venue: "",
    starts: new Date(),
    duration: 60,
    topic_of_discussion: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const startsDateRef = useRef<HTMLInputElement | null>(null);

  const handleDateClick = (ref: RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      if (typeof ref.current.showPicker === "function") {
        ref.current.showPicker();
      } else {
        ref.current.focus();
      }
    }
  };

  const refetchMeetings = useCallback(async () => {
    setLoadingMeetings(true);
    try {
      const res = await axios.get("/api/meetings");
      if (!res.data || !res.data.meetings) {
        setMeetings([]);
        throw new Error("Failed to fetch meetings");
      }
      setMeetings(res.data.meetings.upcoming);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch meetings");
    } finally {
      setLoadingMeetings(false);
    }
  }, []);

  useEffect(() => {
    refetchMeetings();
  }, [refetchMeetings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        starts: new Date(formData.starts).toISOString(),
        duration: parseInt(String(formData.duration)),
      };

      if (editingMeeting) {
        await axios.put(`/api/meetings/${editingMeeting.meeting_id}`, payload);
        setSuccess("Meeting updated successfully!");
      } else {
        await axios.post("/api/meetings/create", payload);
        setSuccess("Meeting scheduled successfully!");
      }

      setFormData({
        venue: "",
        starts: new Date(),
        duration: 60,
        topic_of_discussion: "",
      });
      setIsModalOpen(false);
      setEditingMeeting(null);
      refetchMeetings();
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          (editingMeeting
            ? "Failed to update meeting"
            : "Failed to schedule meeting")
      );
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
      await axios.delete(`/api/meetings/${id}`);

      setSuccess("Meeting deleted successfully!");
      refetchMeetings();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete meeting");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "starts") {
      setFormData((prev) => ({ ...prev, starts: new Date(value) }));
    } else if (name === "duration") {
      setFormData((prev) => ({ ...prev, duration: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openCreateModal = () => {
    setEditingMeeting(null);
    setFormData({
      venue: "",
      starts: new Date(),
      duration: 60,
      topic_of_discussion: "",
    });
    setIsModalOpen(true);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const handleShowAttendees = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsAttendeesModalOpen(true);
  };

  const handleGenerateQR = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsQRModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-primary-cyan" />
          <h2 className="text-xl font-semibold text-white">Meetings</h2>
        </div>
        <GradientButton onClick={openCreateModal}>
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
      {loadingMeetings ? (
        <div className="flex justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary-cyan" />
        </div>
      ) : meetings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <div
              key={meeting.meeting_id}
              className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-blue/20 rounded-lg">
                      <Users className="h-5 w-5 text-primary-cyan" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {meeting.topic_of_discussion}
                    </h3>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>
                    <span className="text-gray-400">Date:</span>{" "}
                    {new Date(meeting.starts).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="text-gray-400">Time:</span>{" "}
                    {formatTime(new Date(meeting.starts))}
                  </p>
                  <p>
                    <span className="text-gray-400">Duration:</span>{" "}
                    {meeting.duration} minutes
                  </p>
                  <p>
                    <span className="text-gray-400">Venue:</span>{" "}
                    {meeting.venue}
                  </p>
                  {/* <div>
                    <span className="text-gray-400">Attendees:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {meeting.attendees && meeting.attendees.length > 0 ? (
                        meeting.attendees.map((attendee, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-800 rounded-full text-gray-300"
                          >
                            {attendee}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No attendees yet</span>
                      )}
                    </div>
                  </div> */}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  {/* QR Code Button - Highlighted */}
                  <button
                    onClick={() => handleGenerateQR(meeting)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-blue to-primary-cyan hover:from-primary-blue/90 hover:to-primary-cyan/90 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-primary-blue/20 hover:scale-[1.02] group"
                  >
                    <QrCode className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Generate QR Code</span>
                  </button>

                  {/* Show Attendees Button */}
                  <button
                    onClick={() => handleShowAttendees(meeting)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    <Eye className="h-5 w-5" />
                    <span>Show Attendees</span>
                  </button>

                  {/* Edit and Delete */}
                  <div className="flex justify-end space-x-2 border-t border-gray-800 pt-4">
                    <button
                      onClick={() => handleEdit(meeting)}
                      className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(meeting.meeting_id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No meetings scheduled.</div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMeeting ? "Edit Meeting" : "Schedule Meeting"}
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
              <div
                className="relative cursor-pointer"
                onClick={() => handleDateClick(startsDateRef)}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarClock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  ref={startsDateRef}
                  name="starts"
                  value={
                    formData.starts instanceof Date
                      ? formData.starts.toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={handleInputChange}
                  className="w-full pl-10 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         appearance-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration || ""}
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
              value={formData.topic_of_discussion || ""}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
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
                      ? "Updating..."
                      : "Scheduling..."
                    : editingMeeting
                    ? "Update Meeting"
                    : "Schedule Meeting"}
                </span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>

      {/* Attendees Modal */}
      <Modal
        isOpen={isAttendeesModalOpen}
        onClose={() => setIsAttendeesModalOpen(false)}
        title={`Attendees - ${selectedMeeting?.topic_of_discussion}`}
      >
        
        <Suspense fallback={"Loading..."}>
        <RenderAttendees id={selectedMeeting?.meeting_id || ""} />
        </Suspense>
      </Modal>

      {/* QR Code Modal */}
      <Modal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        title="Attendance QR Code"
      >
        <div className="text-center space-y-6">
          <div className="bg-white p-8 rounded-lg inline-block mx-auto">
            <Image
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=meeting-attendance-demo"
              alt="QR Code"
              className="w-48 h-48"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white">
              {selectedMeeting?.topic_of_discussion}
            </h3>
            <p className="text-gray-400">
              Scan this QR code to mark your attendance
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setIsQRModalOpen(false)}
              className="px-6 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const RenderAttendees = async ({ id }: { id: string }) => {

  interface att  {
    name: string;
    id: string;
    roll_number: number;
    branch: branch_options | null;
    batch: string | null;
};

  const [attendees, setAttendees] = useState<att[]>([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      if (id) {
        const data = await getAttendies(id);
        setAttendees(data);
      }
    };
    fetchAttendees();
  }, [id]);

  return (
    <div className="space-y-6">
      {/* Attendees List */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {attendees.length > 0 ? (
          attendees.map((attendee) => (
            <div
              key={attendee.id}
              className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-primary-blue/50 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-blue to-primary-cyan flex items-center justify-center text-white font-medium">
                  {attendee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="text-white font-medium">{attendee.name}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">{attendee.roll_number}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{attendee.branch}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No attendees found.</p>
        )}
      </div>
    </div>
  );
};
export default MeetForm;
