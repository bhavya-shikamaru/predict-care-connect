import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StudentCard } from "@/components/StudentCard";
import { 
  Search, 
  Filter, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";
import { type Student } from "@/utils/mockData";

interface StudentsProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
}

export const Students = ({ students, onStudentSelect }: StudentsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [classFilter, setClassFilter] = useState<string>("all");

  // Get unique classes from students
  const uniqueClasses = useMemo(() => {
    const classes = [...new Set(students.map(s => s.klass))].sort();
    return classes;
  }, [students]);

  // Filter students based on search term, risk level, and class
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.klass.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRisk = riskFilter === "all" || student.risk_level === riskFilter;
      const matchesClass = classFilter === "all" || student.klass === classFilter;
      
      return matchesSearch && matchesRisk && matchesClass;
    });
  }, [students, searchTerm, riskFilter, classFilter]);

  // Statistics
  const stats = {
    total: students.length,
    high: students.filter(s => s.risk_level === "high").length,
    medium: students.filter(s => s.risk_level === "medium").length,
    low: students.filter(s => s.risk_level === "low").length,
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRiskFilter("all");
    setClassFilter("all");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Management / छात्र प्रबंधन</h1>
            <p className="text-muted-foreground">
              Comprehensive student directory with detailed search and filtering / विस्तृत खोज और फ़िल्टरिंग के साथ व्यापक छात्र निर्देशिका
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/upload">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Students / छात्र जोड़ें
            </Link>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Total Students / कुल छात्र
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-risk-high" />
                High Risk / उच्च जोखिम
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-high">{stats.high}</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-risk-medium" />
                Medium Risk / मध्यम जोखिम
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-medium">{stats.medium}</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-risk-low" />
                Low Risk / कम जोखिम
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-low">{stats.low}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Students / छात्रों को फ़िल्टर करें
            </CardTitle>
            <CardDescription>
              Search and filter students by name, risk level, or class / नाम, जोखिम स्तर या कक्षा के अनुसार छात्रों को खोजें और फ़िल्टर करें
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students... / छात्रों को खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Risk Level Filter */}
              <Select value={riskFilter} onValueChange={(value: any) => setRiskFilter(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by risk level / जोखिम स्तर के अनुसार फ़िल्टर करें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels / सभी जोखिम स्तर</SelectItem>
                  <SelectItem value="high">High Risk / उच्च जोखिम</SelectItem>
                  <SelectItem value="medium">Medium Risk / मध्यम जोखिम</SelectItem>
                  <SelectItem value="low">Low Risk / कम जोखिम</SelectItem>
                </SelectContent>
              </Select>

              {/* Class Filter */}
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by class / कक्षा के अनुसार फ़िल्टर करें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes / सभी कक्षाएं</SelectItem>
                  {uniqueClasses.map(klass => (
                    <SelectItem key={klass} value={klass}>{klass}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                onClick={clearFilters}
                disabled={searchTerm === "" && riskFilter === "all" && classFilter === "all"}
              >
                Clear Filters / फ़िल्टर साफ़ करें
              </Button>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || riskFilter !== "all" || classFilter !== "all") && (
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary">
                    Search: "{searchTerm}"
                  </Badge>
                )}
                {riskFilter !== "all" && (
                  <Badge variant="secondary">
                    Risk: {riskFilter}
                  </Badge>
                )}
                {classFilter !== "all" && (
                  <Badge variant="secondary">
                    Class: {classFilter}
                  </Badge>
                )}
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-muted"
                  onClick={clearFilters}
                >
                  Clear all ×
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students
          </p>
          {filteredStudents.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Risk distribution:</span>
              <Badge variant="outline" className="border-risk-high text-risk-high">
                {filteredStudents.filter(s => s.risk_level === "high").length} High
              </Badge>
              <Badge variant="outline" className="border-risk-medium text-risk-medium">
                {filteredStudents.filter(s => s.risk_level === "medium").length} Medium
              </Badge>
              <Badge variant="outline" className="border-risk-low text-risk-low">
                {filteredStudents.filter(s => s.risk_level === "low").length} Low
              </Badge>
            </div>
          )}
        </div>

        {/* Student Grid */}
        {filteredStudents.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Students Found</h3>
              <p className="text-muted-foreground text-center mb-6">
                {students.length === 0 
                  ? "No students have been added yet." 
                  : "No students match your current filters. Try adjusting your search criteria."}
              </p>
              {students.length === 0 ? (
                <Button asChild>
                  <Link to="/upload">Add Your First Student</Link>
                </Button>
              ) : (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.student_id}
                student={student}
                onViewDetails={onStudentSelect}
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        {filteredStudents.length > 0 && (
          <Card className="shadow-soft bg-gradient-primary text-white">
            <CardContent className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">
                Ready to help more students succeed? / अधिक छात्रों को सफल बनाने के लिए तैयार हैं? 🌟
              </h3>
              <p className="mb-4 opacity-90">
                Add more student data to get comprehensive risk assessments and personalized interventions / व्यापक जोखिम मूल्यांकन और व्यक्तिगत हस्तक्षेप प्राप्त करने के लिए अधिक छात्र डेटा जोड़ें
              </p>
              <Button variant="secondary" asChild>
                <Link to="/upload">Add More Students</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};