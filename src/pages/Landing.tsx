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
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Every Student Counts.
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
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
            <div className="relative max-w-4xl mx-auto">
              <img 
                src={heroImage} 
                alt="Students learning together in a supportive environment"
                className="rounded-2xl shadow-card w-full"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-soft animate-fade-in border-0">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Student Success Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system provides educators with the tools they need to support every student's journey to success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-lg transition-smooth animate-fade-in group">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-smooth">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Student Outcomes?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of educators who are already using UMEED to identify at-risk students 
              and provide timely interventions that change lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="secondary" size="lg" className="shadow-lg">
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
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