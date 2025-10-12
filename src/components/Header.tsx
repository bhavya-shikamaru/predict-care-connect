import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  onLogout?: () => void;
  user?: { name: string; role: string } | null;
}

export const Header = ({ onLogout, user }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft dark:bg-card/90">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 md:p-2 bg-gradient-hero rounded-lg shadow-soft group-hover:shadow-primary transition-smooth">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-base md:text-lg text-foreground">UMEED</h1>
              <p className="text-[10px] md:text-xs text-muted-foreground">Student Success Platform / छात्र सफलता मंच</p>
            </div>
            <div className="sm:hidden">
              <h1 className="font-bold text-base text-foreground">UMEED</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            
            {user ? (
              <>
                <div className="hidden lg:flex items-center space-x-2 text-sm">
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
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">Logout / लॉगआउट</span>
                  <span className="lg:hidden">Logout</span>
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  <span className="hidden lg:inline">Login / लॉगिन</span>
                  <span className="lg:hidden">Login</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in border-t border-border pt-4">
            {!isLanding && user && (
              <>
                <Link
                  to="/dashboard"
                  className={`block text-sm font-medium py-2 transition-smooth hover:text-primary ${
                    location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard / डैशबोर्ड
                </Link>
                <Link
                  to="/students"
                  className={`block text-sm font-medium py-2 transition-smooth hover:text-primary ${
                    location.pathname === "/students" ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Students / छात्र
                </Link>
                <Link
                  to="/upload"
                  className={`block text-sm font-medium py-2 transition-smooth hover:text-primary ${
                    location.pathname === "/upload" ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Data Upload / डेटा अपलोड
                </Link>
              </>
            )}
            
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-sm py-2 border-t border-border pt-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{user.name}</span>
                  <span className="text-muted-foreground text-xs">({user.role})</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onLogout?.();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout / लॉगआउट
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" size="sm" className="w-full">
                  Login / लॉगिन
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};