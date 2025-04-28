import React, { useEffect, useState } from 'react';
import NewsletterList from '../newsletter/NewsLetterList';
import AddNewsletterModal from '../newsletter/AddNewsLetter';
import { NewsLetter } from '@prisma/client';
import StatusModal from '../ui/StatusModal';
import { Plus } from 'lucide-react';


interface StatusMessage {
    type: 'success' | 'error' | 'confirm';
    title: string;
    message: string;
}

const HomePage: React.FC = () => {
    
  const [newsletters, setNewsletters] = useState<NewsLetter[]>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState<StatusMessage | null>(null);  
  const [NewsLetterToDelete, setNewsLetterToDelete] = useState<{id:string} | null>(null);

  const handleDelete = (id: string) => {
    setStatusModal({
        type: 'confirm',
        title: 'Delete NewsLetter',
        message: 'Are you sure you want to delete this newsletter? This action cannot be undone.',
    });
    setNewsLetterToDelete({ id });
    setShowModal(true);
  };

  const confirmDelete = () => {

    if(!NewsLetterToDelete) return;

    const { id } = NewsLetterToDelete;

    const deleteNL = async () => {
      try {
        const response = await fetch(`/api/newsletter/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setNewsletters(newsletters?.filter(nl => nl.id !== id));
          setStatusModal({
            type: 'success',
            title: 'NewsLetter Deleted',
            message: 'The newsletter has been successfully deleted.',
          });
        } else {
          setStatusModal({
            type: 'error',
            title: 'Error Deleting NewsLetter',
            message: 'There was an error deleting the blog. Please try again later.',
          });
        }
      }
      catch (error) {
        console.error('Error deleting newsletter:', error);
        setStatusModal({
            type: 'error',
            title: 'Error Deleting NewsLetter',
            message: 'There was an error deleting the newsletter. Please try again later.',
          });
      }
    }

    deleteNL();
    setNewsLetterToDelete(null);
  };

  const handleAddNewsletter = (title: string, file: File | null, category: string, volume: string) => {

    const uploadFile = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('file', file!);
            formData.append('category', category);
            formData.append('volume', volume);
            console.log(category);
            console.log(volume);

            const response = await fetch('/api/newsletter/create', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            const newNewsletter = data.newsletter; 

            setNewsletters(prev => (prev ? [...prev, newNewsletter] : [newNewsletter]));

            setShowModal(true);
            setStatusModal({
                type: 'success',
                title: 'Newsletter Added',
                message: 'The newsletter was successfully uploaded.',
            });
        } catch (error: any) {
            setShowModal(true);
            setStatusModal({
                type: 'error',
                title: 'Upload Failed',
                message: error.message || 'An error occurred while uploading.',
            });
        }
    };

    
    if(!title || title == ""){
        setShowModal(true);
        setStatusModal(({
            type: 'error',
            title: 'Invalid Title',
            message: 'Title Cannot Be Empty',
        }));
        return;
    }

    if(!file){
        setShowModal(true);
        setStatusModal(({
            type: 'error',
            title: 'File Missing',
            message: 'File is necessary',
        }))
        return;
    }

    uploadFile();
    }

  useEffect(()=>{
    const fetchNewsLetter = async () => {
        try{
            const response = await fetch('/api/newsletter');
            if(response.ok){
                const data = await response.json();
                setNewsletters(data.newsletters);
            }

        }
        catch(error){
            console.log("Error fetching newsletter", error);
        }
    }

    fetchNewsLetter();
  },[]);

  return (
    <div>
      <div className="flex-1 py-10 px-6 sm:px-8">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">All Newsletter</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Newsletter
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {newsletters && (
          <NewsletterList 
            newsletters={newsletters}
            onDelete={handleDelete}
            deleteOpt={true}
          />
        )}
      </div>
    </div>


        <AddNewsletterModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddNewsletter}
      />

      {/* Status Modal */}
      <StatusModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={statusModal?.title || ''}
        message={statusModal?.message || ''}
        type={statusModal?.type || 'success'}
        onConfirm = {statusModal?.type === 'confirm' ? confirmDelete : undefined}
      />
    </div>
  );
};

export default HomePage;