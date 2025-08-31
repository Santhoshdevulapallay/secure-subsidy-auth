import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { useToast } from "@/hooks/use-toast";
import { authApi, type SignupShopRequest } from "@/lib/api";
import { validateShopSignupForm } from "@/lib/validation";
import { Shield, Loader2, CheckCircle, Store } from "lucide-react";

const SignupShop = () => {
  const [formData, setFormData] = useState<SignupShopRequest>({
    shop_name: "",
    email: "",
    mobile: "",
    registration_number: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof SignupShopRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const validation = validateShopSignupForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await authApi.signupShop(formData);
      
      if (response.success) {
        setIsSuccess(true);
        toast({
          title: "Shop Registration Successful",
          description: "Please check your email to verify your shop account.",
        });
      }
    } catch (error: any) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        toast({
          title: "Registration Failed",
          description: error.message || "An error occurred during shop registration",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    toast({
      title: "Google Signup",
      description: "Google OAuth integration ready for backend connection",
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="auth-card py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-success mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Shop Registration Successful!
            </h2>
            <p className="text-muted-foreground mb-6">
              We've sent a verification email to <strong>{formData.email}</strong>. 
              Please check your inbox and click the verification link to activate your shop account.
            </p>
            <Button 
              onClick={() => navigate("/login")} 
              variant="government"
              className="w-full"
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">SubsidyPortal</span>
          </div>
        </div>
        
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
          Shop Registration
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Register your shop to participate in government programs
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="auth-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormField
              label="Shop Name"
              name="shop_name"
              type="text"
              placeholder="Enter your shop/business name"
              value={formData.shop_name}
              onChange={(value) => handleInputChange("shop_name", value)}
              error={errors.shop_name}
              required
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your business email address"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              error={errors.email}
              required
            />

            <FormField
              label="Mobile Number"
              name="mobile"
              type="tel"
              placeholder="Enter your 10-digit mobile number"
              value={formData.mobile}
              onChange={(value) => handleInputChange("mobile", value)}
              error={errors.mobile}
              required
            />

            <FormField
              label="Registration Number"
              name="registration_number"
              type="text"
              placeholder="Enter your business registration number"
              value={formData.registration_number}
              onChange={(value) => handleInputChange("registration_number", value)}
              error={errors.registration_number}
              required
            />

            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              error={errors.password}
              required
            />

            <FormField
              label="Confirm Password"
              name="confirm_password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirm_password}
              onChange={(value) => handleInputChange("confirm_password", value)}
              error={errors.confirm_password}
              required
            />

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
                  Creating Shop Account...
                </>
              ) : (
                "Create Shop Account"
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
                  onClick={handleGoogleSignup}
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
                  Sign up with Google
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary-hover underline"
                >
                  Sign in here
                </Link>
              </span>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-muted-foreground">
                Are you a citizen?{" "}
                <Link
                  to="/signup/citizen"
                  className="font-medium text-primary hover:text-primary-hover underline"
                >
                  Register as Citizen
                </Link>
              </span>
            </div>
          </div>

          {/* GDPR Notice */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="gdpr-notice text-center">
              <Shield className="inline h-3 w-3 mr-1" />
              By registering, you agree to our data processing in accordance with 
              government security standards and GDPR compliance. Your business information 
              is encrypted and stored securely.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupShop;