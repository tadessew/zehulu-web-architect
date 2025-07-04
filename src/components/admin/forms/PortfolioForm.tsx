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

interface PortfolioFormData {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  categoryEn: string;
  categoryAr: string;
  locationEn: string;
  locationAr: string;
  beforeImage: string;
  afterImage: string;
}

interface PortfolioFormProps {
  portfolioId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PortfolioForm = ({ portfolioId, onSuccess, onCancel }: PortfolioFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(!!portfolioId);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<PortfolioFormData>();

  const isEdit = !!portfolioId;

  useEffect(() => {
    if (portfolioId) {
      loadPortfolioData();
    }
  }, [portfolioId]);

  const loadPortfolioData = async () => {
    try {
      setIsLoadingData(true);
      const data = await api.getPortfolioItem(portfolioId!);
      reset(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load portfolio item",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const onSubmit = async (data: PortfolioFormData) => {
    try {
      setIsLoading(true);
      if (isEdit) {
        await api.updatePortfolioItem(portfolioId!, data);
        toast({
          title: "Success",
          description: "Portfolio item updated successfully",
        });
      } else {
        await api.createPortfolioItem(data);
        toast({
          title: "Success",
          description: "Portfolio item created successfully",
        });
      }
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save portfolio item",
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
        <CardTitle>{isEdit ? 'Edit Portfolio Item' : 'Create Portfolio Item'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titleEn">Title (English) *</Label>
              <Input
                id="titleEn"
                {...register('titleEn', { required: 'English title is required' })}
                disabled={isLoading}
              />
              {errors.titleEn && <p className="text-sm text-destructive">{errors.titleEn.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="titleAr">Title (Arabic)</Label>
              <Input
                id="titleAr"
                {...register('titleAr')}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="descriptionEn">Description (English) *</Label>
              <Textarea
                id="descriptionEn"
                {...register('descriptionEn', { required: 'English description is required' })}
                disabled={isLoading}
                rows={3}
              />
              {errors.descriptionEn && <p className="text-sm text-destructive">{errors.descriptionEn.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="descriptionAr">Description (Arabic)</Label>
              <Textarea
                id="descriptionAr"
                {...register('descriptionAr')}
                disabled={isLoading}
                rows={3}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoryEn">Category (English) *</Label>
              <Select onValueChange={(value) => setValue('categoryEn', value)} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kitchen">Kitchen</SelectItem>
                  <SelectItem value="Bedroom">Bedroom</SelectItem>
                  <SelectItem value="Living Room">Living Room</SelectItem>
                  <SelectItem value="Bathroom">Bathroom</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                </SelectContent>
              </Select>
              {errors.categoryEn && <p className="text-sm text-destructive">{errors.categoryEn.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryAr">Category (Arabic)</Label>
              <Input
                id="categoryAr"
                {...register('categoryAr')}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="locationEn">Location (English) *</Label>
              <Input
                id="locationEn"
                {...register('locationEn', { required: 'English location is required' })}
                disabled={isLoading}
              />
              {errors.locationEn && <p className="text-sm text-destructive">{errors.locationEn.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationAr">Location (Arabic)</Label>
              <Input
                id="locationAr"
                {...register('locationAr')}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="beforeImage">Before Image URL *</Label>
              <Input
                id="beforeImage"
                {...register('beforeImage', { required: 'Before image is required' })}
                disabled={isLoading}
                placeholder="https://example.com/before.jpg"
              />
              {errors.beforeImage && <p className="text-sm text-destructive">{errors.beforeImage.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="afterImage">After Image URL *</Label>
              <Input
                id="afterImage"
                {...register('afterImage', { required: 'After image is required' })}
                disabled={isLoading}
                placeholder="https://example.com/after.jpg"
              />
              {errors.afterImage && <p className="text-sm text-destructive">{errors.afterImage.message}</p>}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEdit ? 'Update Portfolio Item' : 'Create Portfolio Item'
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