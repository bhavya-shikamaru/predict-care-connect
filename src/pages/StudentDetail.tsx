import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  User, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Heart,
  Brain,
  CheckCircle,
  Clock,
  FileText,
  Users,
  Target
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { type Student, getInterventionSuggestions } from "@/utils/mockData";

interface StudentDetailProps {
  student: Student;
}

export const StudentDetail = ({ student }: StudentDetailProps) => {
  const [interventionNotes, setInterventionNotes] = useState("");
  const [completedInterventions, setCompletedInterventions] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const interventions = getInterventionSuggestions(student.risk_factors);

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
      case "high": return <AlertTriangle className="h-5 w-5" />;
      case "medium": return <TrendingUp className="h-5 w-5" />;
      case "low": return <CheckCircle className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const markInterventionComplete = (interventionType: string) => {
    setCompletedInterventions(prev => [...prev, interventionType]);
    toast({
      title: "Intervention Recorded! 🎉",
      description: "Great work supporting this student's success.",
    });
  };

  const saveNotes = () => {
    toast({
      title: "Notes Saved ✅", 
      description: "Intervention notes have been recorded in the student's file.",
    });
  };

  // Mock historical data for trends
  const attendanceTrend = [
    { week: "Week 1", rate: 0.9 },
    { week: "Week 2", rate: 0.85 },
    { week: "Week 3", rate: 0.8 },
    { week: "Week 4", rate: student.attendance_rate_30 }
  ];

  const scoreTrend = [
    { test: "Test 1", score: student.avg_score + 10 },
    { test: "Test 2", score: student.avg_score + 5 },
    { test: "Test 3", score: student.avg_score },
    { test: "Latest", score: student.last_score }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Student Profile</h1>
              <p className="text-muted-foreground">Comprehensive risk analysis and intervention tracking</p>
            </div>
          </div>
          <Button variant="outline">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Student Overview Card */}
        <Card className="shadow-card mb-8 animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-muted rounded-full">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
                  <p className="text-muted-foreground">
                    Student ID: {student.student_id} • Class: {student.klass}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <Badge 
                    variant="outline" 
                    className={`bg-${getRiskColor(student.risk_level)}/10 border-${getRiskColor(student.risk_level)} text-${getRiskColor(student.risk_level)} text-lg px-4 py-2`}
                  >
                    {getRiskIcon(student.risk_level)}
                    {student.risk_level.charAt(0).toUpperCase() + student.risk_level.slice(1)} Risk
                  </Badge>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold text-${getRiskColor(student.risk_level)}`}>
                    {(student.risk_score * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Dropout Risk</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Risk Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            {/* AI Explanation */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  AI Risk Assessment Explanation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Why is {student.name} flagged as {student.risk_level} risk?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our AI model analyzed {student.name}'s academic and behavioral patterns across multiple factors. 
                    The algorithm identified {student.risk_factors.length} primary risk indicators that correlate 
                    with historical dropout patterns in similar student populations.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {student.risk_factors.map((factor, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full bg-${getRiskColor(student.risk_level)}/10`}>
                          <AlertTriangle className={`h-4 w-4 text-${getRiskColor(student.risk_level)}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{factor}</h4>
                          <p className="text-sm text-muted-foreground">
                            Contributing factor #{index + 1}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics Breakdown */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Attendance Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-foreground">
                      {(student.attendance_rate_30 * 100).toFixed(0)}%
                    </div>
                    <Progress 
                      value={student.attendance_rate_30 * 100} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {student.consec_absent} consecutive days absent
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Academic Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-foreground">
                      {student.avg_score.toFixed(1)}
                    </div>
                    <Progress 
                      value={student.avg_score} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Latest: {student.last_score}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Financial Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className={`text-2xl font-bold ${student.last_payment_status ? 'text-risk-low' : 'text-risk-high'}`}>
                      {student.last_payment_status ? 'Paid' : 'Unpaid'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Fee payment status
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Support Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className={`text-2xl font-bold ${student.socioeconomic_flag ? 'text-risk-medium' : 'text-risk-low'}`}>
                      {student.socioeconomic_flag ? 'High' : 'Standard'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Support needs
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Interventions Tab */}
          <TabsContent value="interventions" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-primary" />
                  Recommended Interventions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interventions.map((intervention, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-card">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl">{intervention.icon}</span>
                            <div>
                              <h4 className="font-semibold text-foreground">{intervention.title}</h4>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  intervention.priority === 'high' 
                                    ? 'border-risk-high text-risk-high' 
                                    : 'border-risk-medium text-risk-medium'
                                }`}
                              >
                                {intervention.priority} priority
                              </Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {intervention.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          {completedInterventions.includes(intervention.type) ? (
                            <Badge variant="outline" className="border-risk-low text-risk-low">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markInterventionComplete(intervention.type)}
                            >
                              <Target className="h-4 w-4" />
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Attendance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attendanceTrend.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{data.week}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={data.rate * 100} className="w-24 h-2" />
                          <span className="text-sm font-medium">{(data.rate * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Score Progression</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scoreTrend.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{data.test}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={data.score} className="w-24 h-2" />
                          <span className="text-sm font-medium">{data.score.toFixed(0)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Intervention Notes & Follow-up
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Add intervention notes or follow-up actions:
                  </label>
                  <Textarea
                    placeholder="Record interventions taken, student responses, next steps, parent contact details, etc."
                    value={interventionNotes}
                    onChange={(e) => setInterventionNotes(e.target.value)}
                    className="min-h-32"
                  />
                </div>
                <Button onClick={saveNotes} variant="hero">
                  <FileText className="h-4 w-4" />
                  Save Notes
                </Button>

                {/* Previous Notes (Mock) */}
                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-semibold text-foreground">Previous Notes:</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">Academic Support Meeting</span>
                        <span className="text-xs text-muted-foreground">3 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Met with student and math teacher. Arranged twice-weekly tutoring sessions.
                        Student showed positive engagement and commitment to improvement.
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">Parent Contact</span>
                        <span className="text-xs text-muted-foreground">1 week ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Contacted parents regarding attendance concerns. Family shared transportation 
                        challenges. Connected with school transportation support program.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};