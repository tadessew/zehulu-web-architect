import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
}

interface UserFormProps {
  userId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const UserForm = ({ userId, onSuccess, onCancel }: UserFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(!!userId);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<UserFormData>({
    defaultValues: {
      role: 'viewer',
      status: 'active'
    }
  });

  const isEdit = !!userId;

  useEffect(() => {
    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const loadUserData = async () => {
    try {
      setIsLoadingData(true);
      const data = await api.getUser(userId!);
      reset({ ...data, password: '' }); // Don't load password
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load user",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      setIsLoading(true);
      const submitData = { ...data };
      
      // Remove password if it's empty (for edit mode)
      if (isEdit && !data.password) {
        delete submitData.password;
      }
      
      if (isEdit) {
        await api.updateUser(userId!, submitData);
        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else {
        await api.createUser(submitData);
        toast({
          title: "Success",
          description: "User created successfully",
        });
      }
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save user",
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
        <CardTitle>{isEdit ? 'Edit User' : 'Create User'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              disabled={isLoading}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              disabled={isLoading}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password {isEdit ? '(leave empty to keep current)' : '*'}
            </Label>
            <Input
              id="password"
              type="password"
              {...register('password', { 
                required: !isEdit ? 'Password is required' : false,
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              disabled={isLoading}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select onValueChange={(value) => setValue('role', value as 'admin' | 'editor' | 'viewer')} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select onValueChange={(value) => setValue('status', value as 'active' | 'inactive')} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
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
                isEdit ? 'Update User' : 'Create User'
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