import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Users, 
  Calendar,
  BarChart3,
  Target,
  Download,
  RefreshCw
} from "lucide-react";
import { type Student } from "@/utils/mockData";
import { Link } from "react-router-dom";
import { useState } from "react";

interface AnalyticsProps {
  students: Student[];
}

export const Analytics = ({ students }: AnalyticsProps) => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const riskStats = {
    total: students.length,
    high: students.filter(s => s.risk_level === "high").length,
    medium: students.filter(s => s.risk_level === "medium").length,
    low: students.filter(s => s.risk_level === "low").length,
  };

  const attendanceStats = {
    average: students.reduce((acc, s) => acc + s.attendance_rate_30, 0) / students.length,
    belowThreshold: students.filter(s => s.attendance_rate_30 < 0.8).length,
  };

  const academicStats = {
    average: students.reduce((acc, s) => acc + s.avg_score, 0) / students.length,
    failing: students.filter(s => s.avg_score < 50).length,
  };

  const interventionStats = {
    immediate: riskStats.high,
    monitoring: riskStats.medium,
    stable: riskStats.low,
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Advanced Analytics / उन्नत विश्लेषण
            </h1>
            <p className="text-muted-foreground">
              Deep insights and predictive analysis for student success / छात्र सफलता के लिए गहरी अंतर्दृष्टि और भविष्यसूचक विश्लेषण
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh / रीफ्रेश
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Export Report / रिपोर्ट एक्सपोर्ट करें
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm font-medium text-foreground">Time Range / समय सीमा:</span>
          {[
            { key: "week", label: "7 Days / 7 दिन" },
            { key: "month", label: "30 Days / 30 दिन" },
            { key: "quarter", label: "90 Days / 90 दिन" }
          ].map(({ key, label }) => (
            <Badge
              key={key}
              variant={timeRange === key ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTimeRange(key as typeof timeRange)}
            >
              {label}
            </Badge>
          ))}
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Total Enrolled / कुल नामांकित
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{riskStats.total}</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +5.2% from last period / पिछली अवधि से +5.2%
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Avg Attendance / औसत उपस्थिति
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {(attendanceStats.average * 100).toFixed(1)}%
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                -2.1% needs attention / -2.1% ध्यान की आवश्यकता
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Avg Performance / औसत प्रदर्शन
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {academicStats.average.toFixed(1)}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +3.4% improvement / +3.4% सुधार
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                At Risk / जोखिम में
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-high">
                {riskStats.high + riskStats.medium}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                -8.1% from last period / पिछली अवधि से -8.1%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Intervention Pipeline */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Intervention Pipeline / हस्तक्षेप पाइपलाइन
            </CardTitle>
            <CardDescription>
              Track students requiring different levels of support / विभिन्न स्तरों के समर्थन की आवश्यकता वाले छात्रों को ट्रैक करें
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Immediate Action / तत्काल कार्रवाई
                  </span>
                  <Badge variant="destructive">{interventionStats.immediate}</Badge>
                </div>
                <Progress value={(interventionStats.immediate / riskStats.total) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Requires urgent intervention within 48 hours / 48 घंटे के भीतर तत्काल हस्तक्षेप की आवश्यकता
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Close Monitoring / निकट निगरानी
                  </span>
                  <Badge variant="secondary">{interventionStats.monitoring}</Badge>
                </div>
                <Progress value={(interventionStats.monitoring / riskStats.total) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Regular check-ins and support programs / नियमित जांच और सहायता कार्यक्रम
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Stable Progress / स्थिर प्रगति
                  </span>
                  <Badge variant="outline">{interventionStats.stable}</Badge>
                </div>
                <Progress value={(interventionStats.stable / riskStats.total) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Maintain current support levels / वर्तमान सहायता स्तर बनाए रखें
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Risk Distribution Trends / जोखिम वितरण रुझान</CardTitle>
              <CardDescription>
                How risk levels have changed over time / समय के साथ जोखिम स्तर कैसे बदले हैं
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">High Risk / उच्च जोखिम</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-risk-high h-2 rounded-full" 
                        style={{ width: `${(riskStats.high / riskStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {((riskStats.high / riskStats.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Medium Risk / मध्यम जोखिम</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-risk-medium h-2 rounded-full" 
                        style={{ width: `${(riskStats.medium / riskStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {((riskStats.medium / riskStats.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Low Risk / कम जोखिम</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-risk-low h-2 rounded-full" 
                        style={{ width: `${(riskStats.low / riskStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {((riskStats.low / riskStats.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Early Warning Indicators / प्रारंभिक चेतावनी संकेतक</CardTitle>
              <CardDescription>
                Key metrics that predict student dropout risk / मुख्य मेट्रिक्स जो छात्र ड्रॉपआउट जोखिम की भविष्यवाणी करते हैं
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Low Attendance (&lt;80%) / कम उपस्थिति (&lt;80%)</span>
                  <Badge variant={attendanceStats.belowThreshold > 5 ? "destructive" : "secondary"}>
                    {attendanceStats.belowThreshold} students / छात्र
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Failing Grades (&lt;50) / असफल ग्रेड (&lt;50)</span>
                  <Badge variant={academicStats.failing > 3 ? "destructive" : "secondary"}>
                    {academicStats.failing} students / छात्र
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Financial Issues / वित्तीय समस्याएं</span>
                  <Badge variant="secondary">
                    {students.filter(s => s.last_payment_status === 0).length} students / छात्र
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Socioeconomic Risk / सामाजिक-आर्थिक जोखिम</span>
                  <Badge variant="secondary">
                    {students.filter(s => s.socioeconomic_flag === 1).length} students / छात्र
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Items */}
        <Card className="shadow-soft bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Ready to take action? / कार्रवाई करने के लिए तैयार हैं? 🎯
              </h3>
              <p className="text-muted-foreground mb-6">
                Use these insights to create targeted intervention plans / लक्षित हस्तक्षेप योजनाएं बनाने के लिए इन अंतर्दृष्टियों का उपयोग करें
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/students">
                  <Button variant="hero">
                    <Users className="h-4 w-4" />
                    View Student Details / छात्र विवरण देखें
                  </Button>
                </Link>
                <Button variant="outline">
                  <Download className="h-4 w-4" />
                  Download Full Report / पूरी रिपोर्ट डाउनलोड करें
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};