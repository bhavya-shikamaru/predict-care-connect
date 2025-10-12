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
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-subtle">
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.03]"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
              Every Student Counts.
              <br />
              <span className="gradient-text">
                Predict, Prevent, Support.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Harness the power of AI to identify at-risk students early, understand the factors behind their challenges, 
              and provide targeted interventions that make a real difference in their educational journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/login">
                <Button variant="hero" size="lg" className="animate-scale-in">
                  Get Started Today
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="animate-scale-in animation-delay-200">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-slide-up animation-delay-300">
            <div className="relative max-w-5xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-hero opacity-20 blur-2xl rounded-3xl group-hover:opacity-30 transition-opacity duration-500"></div>
              <img 
                src={heroImage} 
                alt="Students learning together in a supportive environment"
                className="relative rounded-3xl shadow-elevated w-full ring-1 ring-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 bg-card/50 backdrop-blur-sm hover-lift animate-fade-in group">
                <CardContent className="pt-8 pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-primary rounded-2xl text-white shadow-primary group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Comprehensive Student Success Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our AI-powered system provides educators with the tools they need to support every student's journey to success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card/80 backdrop-blur-sm hover-lift animate-fade-in group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300"></div>
                <CardHeader className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-primary rounded-xl text-white shadow-soft group-hover:shadow-primary group-hover:scale-110 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg font-heading pt-2">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Ready to Transform Student Outcomes?
            </h2>
            <p className="text-xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of educators who are already using UMEED to identify at-risk students 
              and provide timely interventions that change lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-white text-primary hover:bg-white/95 shadow-elevated hover:shadow-glow hover:scale-105 font-semibold">
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 font-semibold">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-primary rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">EduCare AI</span>
          </div>
          <p className="text-white/70 mb-4">
            Empowering educators to support every student's success through AI-driven insights and interventions.
          </p>
          <p className="text-white/50 text-sm">
            © 2024 EduCare AI. Built with ❤️ for student success.
          </p>
        </div>
      </footer>
    </div>
  );
};