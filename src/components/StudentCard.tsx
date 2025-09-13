import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Calendar, 
  TrendingDown, 
  TrendingUp, 
  DollarSign,
  User,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Student {
  student_id: string;
  name: string;
  klass: string;
  attendance_rate_30: number;
  consec_absent: number;
  avg_score: number;
  last_score: number;
  last_payment_status: number;
  socioeconomic_flag: number;
  risk_level: "high" | "medium" | "low";
  risk_score: number;
  risk_factors: string[];
}

interface StudentCardProps {
  student: Student;
  onViewDetails: (student: Student) => void;
}

export const StudentCard = ({ student, onViewDetails }: StudentCardProps) => {
  const navigate = useNavigate();

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "risk-high";
      case "medium": return "risk-medium";
      case "low": return "risk-low";
      default: return "risk-medium";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high": return <AlertTriangle className="h-4 w-4" />;
      case "medium": return <TrendingDown className="h-4 w-4" />;
      case "low": return <TrendingUp className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleViewDetails = () => {
    onViewDetails(student);
    navigate(`/student/${student.student_id}`);
  };

  return (
    <Card className="shadow-card hover:shadow-lg transition-smooth animate-fade-in group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-muted rounded-full">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
              <p className="text-sm text-muted-foreground">Class {student.klass} • ID: {student.student_id}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`bg-${getRiskColor(student.risk_level)}/10 border-${getRiskColor(student.risk_level)} text-${getRiskColor(student.risk_level)} font-medium`}
          >
            {getRiskIcon(student.risk_level)}
            {student.risk_level.charAt(0).toUpperCase() + student.risk_level.slice(1)} Risk
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Risk Score */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium text-foreground">Dropout Risk</span>
          <span className={`text-lg font-bold text-${getRiskColor(student.risk_level)}`}>
            {(student.risk_score * 100).toFixed(1)}%
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 p-2 bg-background rounded-lg border">
            <Calendar className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Attendance</p>
              <p className="text-sm font-semibold">{(student.attendance_rate_30 * 100).toFixed(0)}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-2 bg-background rounded-lg border">
            <TrendingUp className="h-4 w-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Avg Score</p>
              <p className="text-sm font-semibold">{student.avg_score.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Risk Factors Preview */}
        {student.risk_factors.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Primary Risk Factors:</p>
            <div className="flex flex-wrap gap-1">
              {student.risk_factors.slice(0, 2).map((factor, index) => (
                <span 
                  key={index}
                  className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                >
                  {factor}
                </span>
              ))}
              {student.risk_factors.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{student.risk_factors.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button 
          onClick={handleViewDetails}
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
        >
          <Heart className="h-4 w-4" />
          View Details & Interventions
        </Button>
      </CardContent>
    </Card>
  );
};