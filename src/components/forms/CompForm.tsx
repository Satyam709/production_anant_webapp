import React, {
  useEffect,
  useState,
  useRef,
  type RefObject,
  useCallback,
} from "react";
import {
  Trophy,
  Loader,
  Pencil,
  Trash2,
  Plus,
  CalendarClock,
  Clock,
  Download,
} from "lucide-react";
import GradientButton from "../ui/GradientButton";
import Modal from "../ui/Modal";
import { Competitions, Prisma } from "@prisma/client";
import Image from "next/image";
import { placeholder } from "@/lib/images/placeholder";
import axios from "axios";
import { uploadServerSideFile } from "@/lib/actions/uploadthing";
import { deleteCompetition, getCompetitionParticipants } from "@/lib/actions/Competitions";
import { ConfirmModal } from "./ConfirmModal";
import { convertToCSV } from "@/helpers/convertToCsv";
import { toLocalDatetimeString } from "@/helpers/toLocalDTString";


type CompetitionFormInput = Omit<Prisma.CompetitionsCreateInput, "createdBy">;

async function fetchActiveCompetitions(): Promise<Competitions[]> {
  try {
    const response = await fetch(`/api/competitions`);

    if (!response.ok) {
      console.error("Failed to fetch competitions:", response.status);
      return [];
    }

    const data = await response.json();

    console.log(data);

    if (!data || (!data.upcoming_comp && !data.past_comp)) {
      return [];
    }

    let activeCompetitions: Competitions[] = [];

    if (data.upcoming_comp) {
      activeCompetitions = data.upcoming_comp;
    }

    return activeCompetitions;
  } catch (error) {
    console.error("Error parsing competitions data:", error);
    return [];
  }
}


const CompForm = () => {
  const [competitions, setCompetitions] = useState<Competitions[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompetition, setEditingCompetition] =
    useState<Competitions | null>(null);
  const [formData, setFormData] = useState<CompetitionFormInput>({
    competitionName: "",
    conductedBy: "",
    conductedOn: new Date(),
    registration_deadline: new Date(),
    venue: "",
    prize: "",
    description: "",
    min_team_size: 1,
    max_team_size: 4,
    imageURL: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingCompetitions, setLoadingCompetitions] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const conductedOnRef = useRef<HTMLInputElement | null>(null);
  const deadlineRef = useRef<HTMLInputElement | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  

  const handleDateClick = (ref: RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      if (typeof ref.current.showPicker === "function") {
        ref.current.showPicker();
      } else {
        ref.current.focus();
      }
    }
  };

  const refetchCompetitions = useCallback(async () => {
    setLoadingCompetitions(true);
    try {
      const data = await fetchActiveCompetitions();
      setCompetitions(data);
    } catch (error) {
      console.error("Error refetching competitions:", error);
      setError("Failed to refetch competitions.");
    } finally {
      setLoadingCompetitions(false);
    }
  }, []);

  useEffect(() => {
    refetchCompetitions();
  }, [refetchCompetitions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!file && !editingCompetition?.imageURL) {
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
      } else if (editingCompetition?.imageURL) {
        imageURL = editingCompetition.imageURL;
      }

      const payload = {
        ...formData,
        imageURL: imageURL,
        conductedOn: new Date(formData.conductedOn ).toISOString(),
        registration_deadline: new Date(
          formData.registration_deadline
        ).toISOString(),
        min_team_size: parseInt(String(formData.min_team_size)),
        max_team_size: parseInt(String(formData.max_team_size)),
      };

      if (editingCompetition) {
        await axios.put(
          `/api/competitions/${editingCompetition.competition_id}/edit`,
          payload
        );
        setSuccess("Competition updated successfully!");
      } else {
        await axios.post("/api/competitions/create", payload);
        setSuccess("Competition created successfully!");
      }

      setFormData({
        competitionName: "",
        conductedBy: "",
        conductedOn: new Date(),
        registration_deadline: new Date(),
        venue: "",
        prize: "",
        description: "",
        min_team_size: 1,
        max_team_size: 4,
        imageURL: "",
      });
      setFile(null);
      setIsModalOpen(false);
      setEditingCompetition(null);
      refetchCompetitions();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          (editingCompetition
            ? "Failed to update competition"
            : "Failed to create competition")
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (competition: Competitions) => {
    setEditingCompetition(competition);
    setFormData(competition);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
     const res = await deleteCompetition(id);
      if (res.error) {
        throw new Error(res.error);
      }
      setCompetitions(
        competitions?.filter((comp) => comp.competition_id !== id) || []
      );
      setSuccess("Competition deleted successfully!");
      refetchCompetitions();
    } catch (err) {
      setError("Failed to delete competition");
    }
  };

    const handleDownload = useCallback(async (id : string) => {
      try {
        // Fetch the attendees for the meeting
        const res = await getCompetitionParticipants(id);
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
          link.setAttribute("download", `competition_participants_${id}.csv`);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.error("Error downloading attendees:", error);
      }
    }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name === "min_team_size" || name === "max_team_size") {
      if(value == "")value="0";
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openCreateModal = () => {
    setEditingCompetition(null);
    setFormData({
      competitionName: "",
      conductedBy: "",
      conductedOn: new Date(),
      registration_deadline: new Date(),
      venue: "",
      prize: "",
      description: "",
      min_team_size: 1,
      max_team_size: 4,
      imageURL: "",
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Trophy className="h-6 w-6 text-primary-cyan" />
          <h2 className="text-xl font-semibold text-white">Competitions</h2>
        </div>
        <GradientButton onClick={openCreateModal}>
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create Competition</span>
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

      {/* Competitions Grid */}
      {loadingCompetitions ? (
        <div className="flex justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary-cyan" />
        </div>
      ) : competitions && competitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((competition) => (
            <div
              key={competition.competition_id}
              className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
            >
              <div className="relative h-48">
                <Image
                  src={competition?.imageURL || placeholder}
                  alt={competition.competitionName}
                  className="w-full h-full object-cover"
                  fill
                  sizes="100%"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {competition.competitionName}
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <span className="text-gray-400">Date:</span>{" "}
                    {new Date(competition.conductedOn).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="text-gray-400">Venue:</span>{" "}
                    {competition.venue}
                  </p>
                  <p>
                    <span className="text-gray-400">Team Size:</span>{" "}
                    {competition.min_team_size} - {competition.max_team_size}{" "}
                    members
                  </p>
                  {competition.prize && (
                    <p>
                      <span className="text-gray-400">Prize:</span>{" "}
                      {competition.prize}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleDownload(competition.competition_id)}
                    className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(competition)}
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
                        {competition.competitionName}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(competition.conductedOn).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm">This action cannot be undone.</p>
                  </div>
                }
                onConfirm={() => {
                  handleDelete(competition.competition_id); // Call the delete function
                  setShowDeleteConfirm(false); // Close the modal after confirmation
                }}
                onCancel={() => setShowDeleteConfirm(false)} // Close the modal when canceled
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">
          {competitions === null
            ? "Failed to load competitions."
            : "No competitions found."}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCompetition ? "Edit Competition" : "Create Competition"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Competition Name
              </label>
              <input
                type="text"
                name="competitionName"
                value={formData.competitionName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter competition name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Competition Image
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
                Competition Date
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
                  value={toLocalDatetimeString(new Date(formData.conductedOn))}
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
                  value={toLocalDatetimeString(new Date(formData.registration_deadline))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Minimum Team Size
              </label>
              <input
                type="number"
                name="min_team_size"
                value={formData.min_team_size}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Maximum Team Size
              </label>
              <input
                type="number"
                name="max_team_size"
                value={formData.max_team_size}
                onChange={handleInputChange}
                min={formData.min_team_size}
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                required
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
              placeholder="Enter competition description"
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
                  <Trophy className="h-5 w-5" />
                )}
                <span>
                  {loading
                    ? editingCompetition
                      ? "Updating..."
                      : "Creating..."
                    : editingCompetition
                    ? "Update Competition"
                    : "Create Competition"}
                </span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CompForm;
