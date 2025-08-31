import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Store } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">SubsidyPortal</span>
          </div>
        </div>
        
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
          Choose Your Account Type
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Select the appropriate registration option for your needs
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="space-y-4">
          {/* Citizen Registration */}
          <div className="auth-card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Citizen Registration
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Register as a citizen to apply for government subsidies and benefits. 
                  Access various schemes available for individuals and families.
                </p>
                <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                  <li>• Apply for housing subsidies</li>
                  <li>• Access healthcare benefits</li>
                  <li>• Education scheme applications</li>
                  <li>• Food security programs</li>
                </ul>
                <Link to="/signup/citizen">
                  <Button variant="government" className="w-full">
                    Register as Citizen
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Shop Registration */}
          <div className="auth-card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Shop Registration
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Register your business to participate in government programs and 
                  provide services to subsidy beneficiaries.
                </p>
                <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                  <li>• Participate in PDS system</li>
                  <li>• Business loan applications</li>
                  <li>• Tax benefit schemes</li>
                  <li>• Employment generation programs</li>
                </ul>
                <Link to="/signup/shop">
                  <Button variant="government" className="w-full">
                    Register as Shop
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Login Link */}
        <div className="mt-8 text-center">
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

        {/* GDPR Notice */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="gdpr-notice text-center">
            <Shield className="inline h-3 w-3 mr-1" />
            All registrations are secured with government-grade encryption and comply 
            with data protection regulations including GDPR. Your information is processed 
            only for official government subsidy programs.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;