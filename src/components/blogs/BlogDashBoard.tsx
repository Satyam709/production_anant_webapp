import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import { Plus, Newspaper} from 'lucide-react';
import BlogList from './BlogList'
import {Blog} from "@prisma/client";
import GradientButton from '../ui/GradientButton';
import StatusModal from '../ui/StatusModal';

interface StatusMessage {
    type: 'success' | 'error' | 'confirm';
    title: string;
    message: string;
}

const BlogsDashboard: React.FC = () => {

  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>();
  const [drafts, setDrafts] = useState<Blog[]>();
  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState<StatusMessage | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<{ id: string } | null>(null);

  const handleCreateBlog = () => {
    router.push('/create');
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setStatusModal({
        type: 'confirm',
        title: 'Delete Blog',
        message: 'Are you sure you want to delete this blog? This action cannot be undone.',
    });
    setBlogToDelete({ id });
    setShowModal(true);
  };

  const confirmDelete = () => {
    if(!blogToDelete) return;
    const { id } = blogToDelete;
    const deleteBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setBlogs(blogs?.filter(blog => blog.id !== id));
          setDrafts(drafts?.filter(draft => draft.id !== id));
          setStatusModal({
            type: 'success',
            title: 'Blog Deleted',
            message: 'The blog has been successfully deleted.',
          });
        } else {
          setStatusModal({
            type: 'error',
            title: 'Error Deleting Blog',
            message: 'There was an error deleting the blog. Please try again later.',
          });
        }
      }
      catch (error) {
        console.error('Error deleting blog:', error);
        setStatusModal({
          type: 'error',
          title: 'Error Deleting Blog',
          message: 'There was an error deleting the blog. Please try again later.',
        });
      }
    }

    deleteBlog();
    setBlogToDelete(null);
  };

  const handleAccept = (id: string) => {
    if(!drafts) return;
    const draftToAccept = drafts.find(draft => draft.id === id);
    
    const approveBlog = async (body: {blogId: string}) => {
      try{
        console.log('Approving blog:', body);
        const response = await fetch(`/api/blogs/pending`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if(response.status === 200){ 
          setStatusModal({
            type: 'success',
            title: 'Blog Accepted',
            message: 'The blog has been successfully accepted.',
          });
          setShowModal(true);
          return true;
        }
        else {
          setStatusModal({
            type: 'error',
            title: 'Error Accepting Blog',
            message: 'There was an error accepting the blog. Please try again later.',
          });
          setShowModal(true);
        }
      }
      catch(error){
        console.error('Error accepting blog:', error);
        setStatusModal({
          type: 'error',
          title: 'Error Accepting Blog',
          message: 'There was an error accepting the blog. Please try again later.',
        });
        setShowModal(true);
      }
    }

    if (draftToAccept) {
      
      const approved = approveBlog({
        blogId: draftToAccept.id,
      });

      if(!approved) return;
      setDrafts(drafts.filter(draft => draft.id !== id));
    }
  };

  useEffect(() => {

    const fetchMyBlogs = async () => {
      try {
        const response = await fetch('/api/blogs/my');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    const fetchDraftBlogs = async () => {
      try {
        const response = await fetch('/api/blogs/pending');
        if (response.ok) {
          const data = await response.json();
          setDrafts(data.blogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchMyBlogs();
    fetchDraftBlogs();
  }
  , []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Newspaper className="h-6 w-6 text-primary-cyan" />
          <h2 className="text-xl font-semibold text-white">Blogs</h2>
        </div>
        <GradientButton>
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Write A Blog!</span>
          </div>
        </GradientButton>
      </div>

      <div className="space-y-8">
        {blogs && <BlogList
          title="Your Blogs"
          blogs={blogs}
          onEdit={handleEdit}
          onDelete={(id) => handleDelete(id)}
        />}

        {drafts && <BlogList
          title="Draft Blogs"
          blogs={drafts}
          onDelete={(id) => handleDelete(id)}
          onAccept={handleAccept}
        />}
        
      </div>

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

export default BlogsDashboard;