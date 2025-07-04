import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  tags: string;
  featuredImage: string;
}

interface BlogFormProps {
  blogId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const BlogForm = ({ blogId, onSuccess, onCancel }: BlogFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(!!blogId);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<BlogFormData>({
    defaultValues: {
      status: 'draft'
    }
  });

  const isEdit = !!blogId;

  useEffect(() => {
    if (blogId) {
      loadBlogData();
    }
  }, [blogId]);

  const loadBlogData = async () => {
    try {
      setIsLoadingData(true);
      const data = await api.getBlogPost(blogId!);
      reset(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load blog post",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      setIsLoading(true);
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      
      if (isEdit) {
        await api.updateBlogPost(blogId!, formattedData);
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      } else {
        await api.createBlogPost(formattedData);
        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
      }
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Blog Post' : 'Create Blog Post'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              disabled={isLoading}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              {...register('excerpt', { required: 'Excerpt is required' })}
              disabled={isLoading}
              rows={3}
              placeholder="Brief description of the blog post..."
            />
            {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              {...register('content', { required: 'Content is required' })}
              disabled={isLoading}
              rows={10}
              placeholder="Write your blog post content here..."
            />
            {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select onValueChange={(value) => setValue('status', value as 'draft' | 'published')} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                {...register('featuredImage')}
                disabled={isLoading}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              {...register('tags')}
              disabled={isLoading}
              placeholder="design, interior, modern (comma separated)"
            />
            <p className="text-sm text-muted-foreground">Separate tags with commas</p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEdit ? 'Update Blog Post' : 'Create Blog Post'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};