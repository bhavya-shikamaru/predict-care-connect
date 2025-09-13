import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Landing } from "@/pages/Landing";
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";
import { StudentUpload } from "@/pages/StudentUpload";
import NotFound from "./pages/NotFound";
import { sampleStudents, type Student } from "@/utils/mockData";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleLogin = (userData: { name: string; role: string; email: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleStudentsAdded = (newStudents: Student[]) => {
    setStudents(prev => [...prev, ...newStudents]);
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    // Navigate to student detail view (to be implemented)
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header user={user} onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route 
                path="/dashboard" 
                element={
                  user ? (
                    <Dashboard 
                      students={students} 
                      onStudentSelect={handleStudentSelect}
                    />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                } 
              />
              <Route 
                path="/upload" 
                element={
                  user ? (
                    <StudentUpload onStudentsAdded={handleStudentsAdded} />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
