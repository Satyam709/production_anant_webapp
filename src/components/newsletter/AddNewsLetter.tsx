import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';

interface AddNewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, file: File | null) => void;
}

const AddNewsLetter: React.FC<AddNewsletterModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(title, file);
    setTitle('');
    setFile(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Newsletter">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Newsletter Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
            PDF File
          </label>
          <input
            type="file"
            id="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition-colors"
          >
            Add Newsletter
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddNewsLetter;