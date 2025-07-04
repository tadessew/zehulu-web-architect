
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Image, 
  FileText, 
  Eye,
  TrendingUp,
  Calendar,
  Loader2
} from 'lucide-react';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const AdminDashboard = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await api.getDashboardStats();
      setStats([
        {
          title: 'Total Portfolio Items',
          value: data.portfolioCount?.toString() || '0',
          change: data.portfolioChange || '+0%',
          icon: Image,
          trend: 'up'
        },
        {
          title: 'Total Users',
          value: data.userCount?.toString() || '0',
          change: data.userChange || '+0%',
          icon: Users,
          trend: 'up'
        },
        {
          title: 'Blog Posts',
          value: data.blogCount?.toString() || '0',
          change: data.blogChange || '+0%',
          icon: FileText,
          trend: 'up'
        },
        {
          title: 'Page Views',
          value: data.pageViews?.toString() || '0',
          change: data.viewsChange || '+0%',
          icon: Eye,
          trend: 'up'
        }
      ]);
      setRecentActivity(data.recentActivity || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load dashboard data",
        variant: "destructive",
      });
      // Fallback to empty data
      setStats([
        { title: 'Total Portfolio Items', value: '0', change: '+0%', icon: Image, trend: 'up' },
        { title: 'Total Users', value: '0', change: '+0%', icon: Users, trend: 'up' },
        { title: 'Blog Posts', value: '0', change: '+0%', icon: FileText, trend: 'up' },
        { title: 'Page Views', value: '0', change: '+0%', icon: Eye, trend: 'up' }
      ]);
      setRecentActivity([]);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span className="text-green-600">{stat.change}</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{activity.action}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-4 text-center">
                  <Image className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Add Portfolio</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">New Post</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Manage Users</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-4 text-center">
                  <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">View Site</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
