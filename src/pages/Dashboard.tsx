import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudentCard } from "@/components/StudentCard";
import { sampleStudents, type Student } from "@/utils/mockData";
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Plus,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
}

export const Dashboard = ({ students = sampleStudents, onStudentSelect }: DashboardProps) => {
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  const [filterRisk, setFilterRisk] = useState<"all" | "high" | "medium" | "low">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (filterRisk === "all") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(s => s.risk_level === filterRisk));
    }
  }, [students, filterRisk]);

  const riskStats = {
    total: students.length,
    high: students.filter(s => s.risk_level === "high").length,
    medium: students.filter(s => s.risk_level === "medium").length,
    low: students.filter(s => s.risk_level === "low").length,
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Risk Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor student wellbeing and identify those who need support
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
            <Link to="/upload">
              <Button variant="outline">
                <Plus className="h-4 w-4" />
                Add Students
              </Button>
            </Link>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Risk Level Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-soft animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{riskStats.total}</div>
              <p className="text-xs text-muted-foreground">Currently enrolled</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft animate-fade-in border-l-4 border-l-risk-high">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-risk-high" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-high">{riskStats.high}</div>
              <p className="text-xs text-muted-foreground">
                {((riskStats.high / riskStats.total) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft animate-fade-in border-l-4 border-l-risk-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Medium Risk</CardTitle>
              <TrendingUp className="h-4 w-4 text-risk-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-medium">{riskStats.medium}</div>
              <p className="text-xs text-muted-foreground">
                {((riskStats.medium / riskStats.total) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft animate-fade-in border-l-4 border-l-risk-low">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Low Risk</CardTitle>
              <Calendar className="h-4 w-4 text-risk-low" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-low">{riskStats.low}</div>
              <p className="text-xs text-muted-foreground">
                {((riskStats.low / riskStats.total) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-sm font-medium text-foreground flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter by Risk Level:
          </span>
          {["all", "high", "medium", "low"].map((risk) => (
            <Badge
              key={risk}
              variant={filterRisk === risk ? "default" : "outline"}
              className={`cursor-pointer transition-smooth ${
                filterRisk === risk 
                  ? risk === "high" 
                    ? "bg-risk-high text-risk-high-foreground" 
                    : risk === "medium"
                    ? "bg-risk-medium text-risk-medium-foreground"
                    : risk === "low"
                    ? "bg-risk-low text-risk-low-foreground"
                    : "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
              onClick={() => setFilterRisk(risk as typeof filterRisk)}
            >
              {risk.charAt(0).toUpperCase() + risk.slice(1)}
              {risk !== "all" && (
                <span className="ml-1">
                  ({risk === "high" ? riskStats.high : risk === "medium" ? riskStats.medium : riskStats.low})
                </span>
              )}
            </Badge>
          ))}
        </div>

        {/* Student Grid */}
        {filteredStudents.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Students Found</h3>
              <p className="text-muted-foreground mb-4">
                {filterRisk === "all" 
                  ? "No students have been added yet." 
                  : `No students found with ${filterRisk} risk level.`}
              </p>
              <Link to="/upload">
                <Button variant="hero">
                  <Plus className="h-4 w-4" />
                  Add Your First Student
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
              <div key={student.student_id} style={{ animationDelay: `${index * 100}ms` }}>
                <StudentCard
                  student={student}
                  onViewDetails={onStudentSelect}
                />
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <Card className="shadow-card bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-dashed">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Ready to help more students succeed? 🌟
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/upload">
                  <Button variant="hero">
                    <Plus className="h-4 w-4" />
                    Upload Student Data
                  </Button>
                </Link>
                <Button variant="outline">
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};