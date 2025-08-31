import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Store, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="government-header text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            SubsidyPortal
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Your Gateway to Government Subsidies and Benefits
          </p>
          <p className="text-lg opacity-80 mb-12 max-w-2xl mx-auto">
            A secure, government-grade platform connecting citizens and businesses 
            with subsidy programs, streamlining applications and approvals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Shield className="mr-2 h-5 w-5" />
                Sign In to Portal
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                Create New Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Access Level
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the appropriate portal based on your role in the subsidy ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Citizen Access */}
            <div className="auth-card p-8 text-center hover:shadow-lg transition-shadow">
              <Users className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Citizen Access
              </h3>
              <p className="text-muted-foreground mb-6">
                Apply for government subsidies, track application status, 
                and manage your benefits through a secure citizen portal.
              </p>
              <ul className="text-left text-sm text-muted-foreground mb-8 space-y-2">
                <li>• Housing and infrastructure subsidies</li>
                <li>• Healthcare benefit programs</li>
                <li>• Education scholarships and grants</li>
                <li>• Food security and PDS access</li>
              </ul>
              <Link to="/signup/citizen">
                <Button variant="government" size="lg" className="w-full">
                  Register as Citizen
                </Button>
              </Link>
            </div>

            {/* Shop Access */}
            <div className="auth-card p-8 text-center hover:shadow-lg transition-shadow">
              <Store className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Business Access
              </h3>
              <p className="text-muted-foreground mb-6">
                Register your business to participate in government programs, 
                access business loans, and serve subsidy beneficiaries.
              </p>
              <ul className="text-left text-sm text-muted-foreground mb-8 space-y-2">
                <li>• Public Distribution System participation</li>
                <li>• Government-backed business loans</li>
                <li>• Tax benefit and incentive schemes</li>
                <li>• Employment generation programs</li>
              </ul>
              <Link to="/signup/shop">
                <Button variant="government" size="lg" className="w-full">
                  Register as Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Secure & GDPR Compliant
          </h2>
          <p className="text-muted-foreground mb-6">
            Your data is protected with government-grade security standards. 
            We employ end-to-end encryption, secure authentication, and comply 
            with GDPR and local data protection regulations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Encrypted Data</h4>
              <p className="text-muted-foreground">All personal and financial data encrypted at rest and in transit</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Secure Authentication</h4>
              <p className="text-muted-foreground">Multi-factor authentication with OAuth integration</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">GDPR Compliant</h4>
              <p className="text-muted-foreground">Full compliance with data protection and privacy regulations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-lg font-semibold">SubsidyPortal</span>
          </div>
          <p className="text-sm opacity-80">
            Government of India • Secure Subsidy Application Platform
          </p>
          <p className="text-xs opacity-60 mt-2">
            Protected by government-grade security • GDPR Compliant
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
