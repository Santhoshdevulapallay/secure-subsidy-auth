import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { authApi, type LoginRequest } from "@/lib/api";
import { validateLoginForm } from "@/lib/validation";
import { Shield, Eye, Loader2 } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: "",
    remember_me: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof LoginRequest, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation for dummy admin user
    if (formData.username === 'admin' && formData.password !== 'admin') {
      setErrors({ password: 'Admin password must be "admin"' });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: Uncomment when Django backend is ready
      // const response = await authApi.login(formData);
      
      // Temporary: Simulate successful login for testing
      const mockResponse = {
        success: true,
        user: {
          id: 1,
          username: formData.username,
          email: `${formData.username}@example.com`,
          role: formData.username === 'admin' ? 'admin' : 
                formData.username.includes('shop') ? 'shop' : 'citizen',
          full_name: `Test ${formData.username}`,
        }
      };
      
      if (mockResponse.success && mockResponse.user) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${mockResponse.user.full_name || mockResponse.user.username}!`,
        });

        // Role-based redirect
        const redirectPath = getRoleBasedRedirect(mockResponse.user.role as string);
        navigate(redirectPath);
      }
      
      /* 
      // Original API call - uncomment when backend is ready
      if (response.success && response.user) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${response.user.full_name || response.user.username}!`,
        });

        // Role-based redirect
        const redirectPath = getRoleBasedRedirect(response.user.role);
        navigate(redirectPath);
      }
      */
    } catch (error: any) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        toast({
          title: "Login Failed",
          description: error.message || "An error occurred during login",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Google OAuth integration would go here
    // For now, show placeholder functionality
    toast({
      title: "Google Login",
      description: "Google OAuth integration ready for backend connection",
    });
  };

  const getRoleBasedRedirect = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin-portal';
      case 'citizen':
        return '/citizen-portal';
      case 'shop':
        return '/shop-portal';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">SubsidyPortal</span>
          </div>
        </div>
        
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Access your government subsidy applications
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="auth-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormField
              label="Username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(value) => handleInputChange("username", value)}
              error={errors.username}
              required
            />

            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              error={errors.password}
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember_me"
                  checked={formData.remember_me}
                  onCheckedChange={(checked) => 
                    handleInputChange("remember_me", !!checked)
                  }
                />
                <label
                  htmlFor="remember_me"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary-hover underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="government"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="google"
                  size="lg"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:text-primary-hover underline"
                >
                  Sign up here
                </Link>
              </span>
            </div>
          </div>

          {/* GDPR Notice */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="gdpr-notice text-center">
              <Shield className="inline h-3 w-3 mr-1" />
              Your data is protected in accordance with government security standards 
              and GDPR compliance. We use industry-standard encryption to safeguard 
              your personal information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
