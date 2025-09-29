import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  onLogout?: () => void;
  user?: { name: string; role: string } | null;
}

export const Header = ({ onLogout, user }: HeaderProps) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft dark:bg-card/90">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-2 bg-gradient-hero rounded-lg shadow-soft group-hover:shadow-primary transition-smooth">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">UMEED</h1>
            <p className="text-xs text-muted-foreground">Student Success Platform / छात्र सफलता मंच</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {!isLanding && user && (
            <>
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Dashboard / डैशबोर्ड
              </Link>
              <Link
                to="/students"
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  location.pathname === "/students" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Students / छात्र
              </Link>
              <Link
                to="/upload"
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  location.pathname === "/upload" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Data Upload / डेटा अपलोड
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user ? (
            <>
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{user.name}</span>
                <span className="text-muted-foreground">({user.role})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout / लॉगआउट
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm">
                Login / लॉगिन
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};