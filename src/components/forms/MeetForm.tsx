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
import generateQr from "@/lib/actions/GenerateQr";

type MeetFormInput = Omit<
  Prisma.MeetingCreateInput,
  "hostID" | "conductor" | "attendees"
>;

// Separate components for better performance
const MeetingCard = React.memo(({ 
  meeting, 
  onEdit, 
  onDelete, 
  onShowAttendees, 
  onGenerateQR,
  formatTime 
}: {
  meeting: Meeting;
  onEdit: (meeting: Meeting) => void;
  onDelete: (id: string) => void;
  onShowAttendees: (meeting: Meeting) => void;
  onGenerateQR: (meeting: Meeting) => void;
  formatTime: (date: Date) => string;
}) => (
  <div className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200">
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-blue/20 rounded-lg">
            <Users className="h-5 w-5 text-primary-cyan" />
          </div>
          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {meeting.topic_of_discussion}
          </h3>
        </div>
      </div>
      <div className="space-y-2 text-sm text-gray-300">
        <p className="flex justify-between">
          <span className="text-gray-400">Date:</span>
          <span>{new Date(meeting.starts).toLocaleDateString()}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Time:</span>
          <span>{formatTime(new Date(meeting.starts))}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Duration:</span>
          <span>{meeting.duration} minutes</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Venue:</span>
          <span className="text-right">{meeting.venue}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => onGenerateQR(meeting)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-blue to-primary-cyan hover:from-primary-blue/90 hover:to-primary-cyan/90 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-primary-blue/20 hover:scale-[1.02] group"
        >
          <QrCode className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          <span>Generate QR Code</span>
        </button>

        <button
          onClick={() => onShowAttendees(meeting)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg transition-colors duration-200"
        >
          <Eye className="h-5 w-5" />
          <span>Show Attendees</span>
        </button>

        <div className="flex justify-end space-x-2 border-t border-gray-800 pt-4">
          <button
            onClick={() => onEdit(meeting)}
            className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(meeting.meeting_id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
));

MeetingCard.displayName = 'MeetingCard';

const RenderQrCode = React.memo(({ id }: { id: string }) => {
  const [qrCode, setQrCode] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const genQr = async () => {
      if (!id || isFetching) return;
      
      setIsFetching(true);
      try {
        const qr = await generateQr(id, 10);
        if (mounted && qr) setQrCode(qr);
      } catch (error) {
        if (mounted) setError("Failed to generate QR code");
        console.error("Error generating QR code:", error);
      } finally {
        if (mounted) setIsFetching(false);
      }
    };

    genQr();

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg inline-block mx-auto">
      {isFetching ? (
        <div className="w-48 h-48 flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary-cyan" />
        </div>
      ) : qrCode ? (
        <div className="relative w-48 h-48">
          <Image
            src={qrCode}
            alt="QR Code"
            fill
            className="object-contain"
            priority
          />
        </div>
      ) : (
        <div className="w-48 h-48 flex items-center justify-center">
          <p className="text-gray-400">{error || "Failed to generate QR code."}</p>
        </div>
      )}
    </div>
  );
});

RenderQrCode.displayName = 'RenderQrCode';

const RenderAttendees = React.memo(({ id }: { id: string }) => {
  interface Attendee {
    name: string;
    id: string;
    roll_number: number;
    branch: branch_options | null;
    batch: string | null;
  }

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchAttendees = async () => {
      if (!id || isFetching) return;
      
      setIsFetching(true);
      try {
        const data = await getAttendies(id);
        if (mounted) setAttendees(data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
      } finally {
        if (mounted) setIsFetching(false);
      }
    };

    fetchAttendees();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (isFetching) {
    return (
      <div className="flex justify-center p-4">
        <Loader className="h-8 w-8 animate-spin text-primary-cyan" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
        {attendees.length > 0 ? (
          attendees.map((attendee) => (
            <div
              key={attendee.id}
              className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-primary-blue/50 transition-all duration-200"
            >
              <div className="min-w-[2.5rem] h-10 rounded-full bg-gradient-to-r from-primary-blue to-primary-cyan flex items-center justify-center text-white font-medium">
                {attendee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-white font-medium truncate">{attendee.name}</h4>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-400">{attendee.roll_number}</span>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className="text-gray-400">{attendee.branch}</span>
                  <span className="text-gray-400">{attendee.batch} year</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-4">No attendees found.</p>
        )}
      </div>
    </div>
  );
});

RenderAttendees.displayName = 'RenderAttendees';

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

  const handleDateClick = useCallback((ref: RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      if (typeof ref.current.showPicker === "function") {
        ref.current.showPicker();
      } else {
        ref.current.focus();
      }
    }
  }, []);

  const formatTime = useCallback((date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }, []);

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
        await axios.put(`/api/meetings/${editingMeeting.meeting_id}/edit`, payload);
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

  const handleEdit = useCallback((meeting: Meeting) => {
    setEditingMeeting(meeting);
    setFormData({
      venue: meeting.venue,
      starts: meeting.starts,
      duration: meeting.duration,
      topic_of_discussion: meeting.topic_of_discussion,
    });
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await axios.delete(`/api/meetings/${id}`);
      setSuccess("Meeting deleted successfully!");
      refetchMeetings();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete meeting");
    }
  }, [refetchMeetings]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === "starts") {
        return { ...prev, starts: new Date(value) };
      } else if (name === "duration") {
        return { ...prev, duration: parseInt(value) };
      } else {
        return { ...prev, [name]: value };
      }
    });
  }, []);

  const openCreateModal = useCallback(() => {
    setEditingMeeting(null);
    setFormData({
      venue: "",
      starts: new Date(),
      duration: 60,
      topic_of_discussion: "",
    });
    setIsModalOpen(true);
  }, []);

  const handleShowAttendees = useCallback((meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsAttendeesModalOpen(true);
  }, []);

  const handleGenerateQR = useCallback((meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsQRModalOpen(true);
  }, []);

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
        <div className="flex justify-center p-8">
          <Loader className="h-8 w-8 animate-spin text-primary-cyan" />
        </div>
      ) : meetings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.meeting_id}
              meeting={meeting}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShowAttendees={handleShowAttendees}
              onGenerateQR={handleGenerateQR}
              formatTime={formatTime}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8">No meetings scheduled.</div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                  value={new Date(formData.starts).toISOString().slice(0, 16)}
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

          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
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
        <Suspense 
          fallback={
            <div className="flex justify-center p-8">
              <Loader className="h-8 w-8 animate-spin text-primary-cyan" />
            </div>
          }
        >
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
          <Suspense 
            fallback={
              <div className="flex justify-center p-8">
                <Loader className="h-8 w-8 animate-spin text-primary-cyan" />
              </div>
            }
          >
            <RenderQrCode id={selectedMeeting?.meeting_id || ""} />
          </Suspense>
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

export default MeetForm;