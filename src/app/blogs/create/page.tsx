"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// import { createBlog } from '@/lib/blog';
// import { Blog } from '@prisma/client';
import TiptapEditor from '@/components/blogs/editor/tiptap-editor';
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Save, Eye, Sigma } from 'lucide-react';
import { toast } from 'sonner';

interface BlogFormData {
    title: string;
    content: string;
    contentJson: any | null;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    contentJson: null,
  });
  const [activeTab, setActiveTab] = useState('edit');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContentChange = (html: string, json: any) => {
    setFormData(prev => ({
      ...prev,
      content: html,
      contentJson: json,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // if (!formData.title.trim()) {
    //   toast({
    //     title: "Title is required",
    //     description: "Please add a title for your blog post.",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    
    // if (!formData.content.trim()) {
    //   toast({
    //     title: "Content is required",
    //     description: "Please add some content to your blog post.",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    
    setIsSubmitting(true);
    
    try {
    //   const newBlog = await createB0log(formData);
    //   toast({
    //     title: "Blog created!",
    //     description: "Your blog post has been published successfully.",
    //   });
    //   router.push(`/blog/${newBlog.id}`);
        console.log("Posting");
    } catch (error) {
      console.error('Error creating blog:', error);
    //   toast({
    //     title: "Failed to create blog",
    //     description: "There was an error creating your blog post. Please try again.",
    //     variant: "destructive",
    //   });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
       
       <Navbar/>

      <main className="flex-grow container py-8">
        <div className="flex items-center mb-6 gap-4">
          <Link href="/blog">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create New Blog</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter a descriptive title for your math blog..."
              className="text-lg"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="edit" className="gap-2">
                  <span>Edit</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                  <span>Preview</span>
                </TabsTrigger>
              </TabsList>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="gap-2"
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
              <Card className="p-6">
                {!formData.title && !formData.content ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <Eye className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Your preview will appear here. Start writing to see it.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{formData.title || 'Untitled Blog'}</h1>
                    {formData.content ? (
                      <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                    ) : (
                      <p className="text-muted-foreground">No content to preview yet.</p>
                    )}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </main>

      <Footer/>
    </div>
  );
}