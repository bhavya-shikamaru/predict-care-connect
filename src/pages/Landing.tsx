import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Shield, 
  TrendingUp, 
  Users, 
  Calendar,
  BarChart3,
  DollarSign,
  Brain,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-education.jpg";

export const Landing = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning models analyze student data to identify at-risk learners early."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Explainable AI",
      description: "Understand exactly why a student is flagged, with clear factor breakdowns and evidence."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Personalized Interventions",
      description: "Get specific, actionable recommendations tailored to each student's unique situation."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Monitor intervention effectiveness and student improvement over time."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Support",
      description: "Connect teachers, counselors, and administrators for comprehensive student care."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Data-Driven Insights",
      description: "Transform attendance, grades, and engagement data into actionable intelligence."
    }
  ];

  const stats = [
    { icon: <Users className="h-5 w-5" />, value: "85%", label: "Early Identification Rate" },
    { icon: <TrendingUp className="h-5 w-5" />, value: "67%", label: "Intervention Success" },
    { icon: <Heart className="h-5 w-5" />, value: "92%", label: "Student Satisfaction" },
    { icon: <CheckCircle className="h-5 w-5" />, value: "24/7", label: "Real-time Monitoring" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden bg-gradient-subtle">
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.03]"></div>
        <div className="absolute top-10 right-10 md:top-20 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-64 h-64 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight text-balance px-2">
              Every Student Counts.
              <br />
              <span className="gradient-text">
                Predict, Prevent, Support.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Harness the power of AI to identify at-risk students early, understand the factors behind their challenges, 
              and provide targeted interventions that make a real difference in their educational journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12 px-4">
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="hero" size="lg" className="animate-scale-in w-full sm:w-auto">
                  Get Started Today
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link to="/demo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="animate-scale-in animation-delay-200 w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-slide-up animation-delay-300">
            <div className="relative max-w-5xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-hero opacity-20 blur-xl md:blur-2xl rounded-2xl md:rounded-3xl group-hover:opacity-30 transition-opacity duration-500"></div>
              <img 
                src={heroImage} 
                alt="Students learning together in a supportive environment"
                className="relative rounded-2xl md:rounded-3xl shadow-elevated w-full ring-1 ring-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 bg-card/50 backdrop-blur-sm hover-lift animate-fade-in group">
                <CardContent className="pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-5 md:pb-6 px-2 sm:px-4">
                  <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                    <div className="p-2 sm:p-3 md:p-4 bg-gradient-primary rounded-xl md:rounded-2xl text-white shadow-primary group-hover:scale-110 transition-transform duration-300">
                      <div className="h-4 w-4 sm:h-5 sm:w-5">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">{stat.value}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-tight">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-accent/3 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative">
          <div className="text-center mb-10 sm:mb-14 md:mb-20">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 text-balance px-2">
              Comprehensive Student Success Platform
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              Our AI-powered system provides educators with the tools they need to support every student's journey to success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card/80 backdrop-blur-sm hover-lift animate-fade-in group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300"></div>
                <CardHeader className="relative p-4 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="p-2 sm:p-3 bg-gradient-primary rounded-lg sm:rounded-xl text-white shadow-soft group-hover:shadow-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <div className="h-5 w-5 sm:h-6 sm:w-6">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-heading pt-1 sm:pt-2">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-balance px-2">
              Ready to Transform Student Outcomes?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              Join thousands of educators who are already using UMEED to identify at-risk students 
              and provide timely interventions that change lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center px-4">
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" className="bg-white text-primary hover:bg-white/95 shadow-elevated hover:shadow-glow hover:scale-105 font-semibold w-full sm:w-auto">
                  Start Your Free Trial
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link to="/demo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 font-semibold w-full sm:w-auto">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8 sm:py-10 md:py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
            <div className="p-1.5 sm:p-2 bg-primary rounded-lg">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold">EduCare AI</span>
          </div>
          <p className="text-white/70 mb-3 md:mb-4 text-sm sm:text-base px-4 max-w-xl mx-auto">
            Empowering educators to support every student's success through AI-driven insights and interventions.
          </p>
          <p className="text-white/50 text-xs sm:text-sm">
            © 2024 EduCare AI. Built with ❤️ for student success.
          </p>
        </div>
      </footer>
    </div>
  );
};