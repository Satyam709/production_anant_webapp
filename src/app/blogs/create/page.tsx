'use client';

import { blog_cat } from '@prisma/client';
import { ArrowLeft, Eye, ImageIcon, Save } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { EditorPreview } from '@/components/blogs/BlogPreview';
import TiptapEditor from '@/components/blogs/editor/tiptap-editor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { uploadServerSideFile } from '@/lib/actions/uploadthing';

interface BlogFormData {
  title: string;
  shortDescription: string;
  coverImage?: string;
  content: string;
  contentJson: Record<string, unknown> | null;
  category: blog_cat;
}

interface UploadError extends Error {
  message: string;
}

export default function CreateBlogPage() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    shortDescription: '',
    content: '',
    contentJson: null,
    category: blog_cat.Mathematics,
  });
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/blogs/create');
    }
  }, [status, router]);

  const handleContentChange = (html: string, json: Record<string, unknown>) => {
    setFormData((prev) => ({
      ...prev,
      content: html,
      contentJson: json,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form data submitting');

    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!formData.shortDescription.trim()) {
      setError('Short description is required');
      return;
    }

    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }

    if (!file && !formData.coverImage) {
      setError('Cover image is required');
      return;
    }

    setIsSubmitting(true);

    try {
      let coverImageURL: string | undefined = formData.coverImage;

      if (file) {
        const res = await uploadServerSideFile(file);
        if (!res) {
          throw new Error('Failed to upload cover image');
        }
        coverImageURL = res.ufsUrl;
      }

      if (!session?.user?.id) {
        throw new Error('User not authenticated');
      }

      // Format payload to match Zod schema
      const payload = {
        title: formData.title,
        category: formData.category as blog_cat,
        content: formData.content,
        cover_picture: coverImageURL,
        description: formData.shortDescription,
      };

      console.log('Submitting blog with payload:', payload);

      console.log(
        'Submitting blog with payload:',
        JSON.stringify(payload, null, 2)
      );

      const response = await fetch('/api/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create blog');
      }

      setSuccess('Blog created successfully!');
      router.push('/blogs'); // Redirect to blogs list
    } catch (error: unknown) {
      console.error('Error creating blog:', error);
      const uploadError = error as UploadError;
      setError(uploadError.message || 'Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex items-center mb-6 gap-4">
          <Link href="/blog">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create New Blog</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500">
            {success}
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as BlogFormData['category'],
                  })
                }
                className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
              >
                {Object.values(blog_cat).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter a descriptive title for your math blog..."
                className="text-lg bg-[#1a1a1a] border-[#333] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
                placeholder="Enter a brief description of your blog..."
                className="w-full min-h-[100px] px-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Cover Image
              </Label>
              <input
                type="file"
                id="coverImage"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                className="w-full text-white file:bg-primary-purple file:border-none file:rounded-md file:p-2 file:text-sm file:font-bold cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-2 relative h-48 rounded-lg overflow-hidden bg-black/30">
                  <Image
                    src={imagePreview}
                    alt="Cover image preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-[#1a1a1a] border-[#333]">
                <TabsTrigger
                  value="edit"
                  className="gap-2 data-[state=active]:bg-[#252525]"
                >
                  <span>Edit</span>
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="gap-2 data-[state=active]:bg-[#252525]"
                >
                  <span>Preview</span>
                </TabsTrigger>
              </TabsList>

              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2 bg-primary-purple hover:bg-primary-purple/90"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Publishing...' : 'Publish Blog'}
              </Button>
            </div>

            <TabsContent value="edit" className="mt-0">
              <TiptapEditor
                content={formData.content}
                onChange={handleContentChange}
                placeholder="Start writing your mathematics blog..."
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <Card className="p-6 bg-[#1a1a1a] border-[#333] text-white">
                {!formData.title && !formData.content ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <Eye className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>
                      Your preview will appear here. Start writing to see it.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold">
                      {formData.title || 'Untitled Blog'}
                    </h1>
                    {formData.shortDescription && (
                      <p className="text-gray-400">
                        {formData.shortDescription}
                      </p>
                    )}
                    {imagePreview && (
                      <div className="relative h-48 rounded-lg overflow-hidden bg-black/30">
                        <Image
                          src={imagePreview}
                          alt="Cover image preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    {formData.content ? (
                      <EditorPreview content={formData.content} />
                    ) : (
                      <p className="text-muted-foreground">
                        No content to preview yet.
                      </p>
                    )}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
