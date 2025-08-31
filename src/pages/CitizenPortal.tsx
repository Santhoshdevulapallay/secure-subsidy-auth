import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Home, 
  Heart, 
  GraduationCap, 
  Utensils,
  FileText,
  LogOut,
  Bell,
  User
} from "lucide-react";

const CitizenPortal = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get current user info on component mount
    const getCurrentUser = async () => {
      try {
        const response = await authApi.getCurrentUser();
        if (response.user) {
          setUser(response.user);
          if (response.user.role !== 'citizen') {
            // Redirect non-citizen users
            navigate('/');
            return;
          }
        }
      } catch (error) {
        navigate('/login');
      }
    };

    getCurrentUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "An error occurred during logout.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="loading-spinner h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="government-header bg-primary text-primary-foreground px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Citizen Portal</h1>
              <p className="text-sm opacity-90">Government Subsidy Applications</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 cursor-pointer hover:opacity-80" />
            <span className="text-sm">Welcome, {user.full_name || user.username}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* User Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Profile Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{user.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <p className="font-medium text-success">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Schemes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Subsidy Schemes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="h-5 w-5 text-primary" />
                  <span className="text-sm">Housing Subsidy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Financial assistance for home construction and improvement.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="text-sm">Healthcare Benefits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Medical insurance and healthcare cost assistance.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="text-sm">Education Scheme</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Scholarships and educational support for students.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5 text-primary" />
                  <span className="text-sm">Food Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Public Distribution System and food assistance programs.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Application Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>My Applications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Housing Subsidy Application</p>
                    <p className="text-xs text-muted-foreground">Applied on March 15, 2024</p>
                  </div>
                  <span className="text-xs bg-warning text-warning-foreground px-2 py-1 rounded">
                    Under Review
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Healthcare Benefits</p>
                    <p className="text-xs text-muted-foreground">Applied on March 10, 2024</p>
                  </div>
                  <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">
                    Approved
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Education Scheme</p>
                    <p className="text-xs text-muted-foreground">Applied on March 5, 2024</p>
                  </div>
                  <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">
                    Documents Needed
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Applications
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Recent Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Application Update</p>
                  <p className="text-xs text-muted-foreground">
                    Your housing subsidy application is now under review. Expected processing time: 15 days.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Document Submission Required</p>
                  <p className="text-xs text-muted-foreground">
                    Please submit income certificate for your education scheme application.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Benefits Approved</p>
                  <p className="text-xs text-muted-foreground">
                    Your healthcare benefits application has been approved. Benefits will be active within 3 days.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CitizenPortal;