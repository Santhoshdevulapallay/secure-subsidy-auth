import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Store, 
  DollarSign, 
  Users, 
  Package,
  FileText,
  LogOut,
  Bell,
  Building,
  TrendingUp
} from "lucide-react";

const ShopPortal = () => {
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
          if (response.user.role !== 'shop') {
            // Redirect non-shop users
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
            <Store className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Shop Portal</h1>
              <p className="text-sm opacity-90">Business & Government Programs</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 cursor-pointer hover:opacity-80" />
            <span className="text-sm">Welcome, {user.shop_name || user.username}</span>
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
        {/* Business Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-primary" />
              <span>Business Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Shop Name</p>
                <p className="font-medium">{user.shop_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registration Status</p>
                <p className="font-medium text-success">Verified</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Program Status</p>
                <p className="font-medium text-primary">Active Participant</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,23,456</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beneficiaries Served</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Distributed</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,340</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Program Benefits</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,678</div>
              <p className="text-xs text-muted-foreground">Total benefits received</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Programs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Government Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="text-sm">PDS System</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Public Distribution System for essential commodities distribution.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Manage PDS
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-sm">Business Loans</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Apply for government-backed business development loans.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Apply for Loan
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm">Tax Benefits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Access tax benefit schemes for participating businesses.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Benefits
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Recent Transactions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">PDS Distribution</p>
                    <p className="text-xs text-muted-foreground">Rice & Wheat - 50 beneficiaries</p>
                  </div>
                  <span className="text-sm font-medium text-success">+₹12,500</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Healthcare Products</p>
                    <p className="text-xs text-muted-foreground">Medical supplies distribution</p>
                  </div>
                  <span className="text-sm font-medium text-success">+₹8,750</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Tax Benefit Received</p>
                    <p className="text-xs text-muted-foreground">Q1 2024 tax benefit</p>
                  </div>
                  <span className="text-sm font-medium text-success">+₹15,000</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">New Stock Allocation</p>
                  <p className="text-xs text-muted-foreground">
                    Your monthly PDS stock allocation is ready for pickup. Please collect within 3 days.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Loan Application Update</p>
                  <p className="text-xs text-muted-foreground">
                    Your business loan application is under review. Expected decision in 7 days.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Tax Benefit Approved</p>
                  <p className="text-xs text-muted-foreground">
                    Your Q1 2024 tax benefit has been approved and will be credited within 5 working days.
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

export default ShopPortal;