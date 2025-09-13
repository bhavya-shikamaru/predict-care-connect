import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  User,
  Calendar,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { predictDropoutRisk, type Student } from "@/utils/mockData";

interface StudentUploadProps {
  onStudentsAdded: (students: Student[]) => void;
}

export const StudentUpload = ({ onStudentsAdded }: StudentUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parseResults, setParseResults] = useState<{
    success: Student[];
    errors: Array<{ row: number; error: string }>;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Manual entry form
  const [manualStudent, setManualStudent] = useState({
    student_id: "",
    name: "",
    klass: "",
    attendance_rate_30: "",
    consec_absent: "",
    avg_score: "",
    last_score: "",
    last_payment_status: "",
    socioeconomic_flag: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const csvTemplate = `student_id,name,klass,attendance_rate_30,consec_absent,avg_score,last_score,last_payment_status,socioeconomic_flag
STU001,John Doe,10-A,0.85,2,75.5,78,1,0
STU002,Jane Smith,9-B,0.65,5,45.2,38,0,1
STU003,Mike Johnson,11-C,0.92,1,88.4,91,1,0`;

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_data_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Template Downloaded! 📋",
      description: "Fill in your student data and upload the completed CSV file.",
    });
  };

  const parseCSV = (csvText: string): { success: Student[]; errors: Array<{ row: number; error: string }> } => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const requiredHeaders = [
      'student_id', 'name', 'klass', 'attendance_rate_30', 
      'consec_absent', 'avg_score', 'last_score', 
      'last_payment_status', 'socioeconomic_flag'
    ];
    
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      return {
        success: [],
        errors: [{ row: 0, error: `Missing required columns: ${missingHeaders.join(', ')}` }]
      };
    }

    const success: Student[] = [];
    const errors: Array<{ row: number; error: string }> = [];

    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(',').map(v => v.trim());
        const studentData: any = {};
        
        headers.forEach((header, index) => {
          studentData[header] = values[index];
        });

        // Convert numeric fields
        const numericStudent = {
          student_id: studentData.student_id,
          name: studentData.name,
          klass: studentData.klass,
          attendance_rate_30: parseFloat(studentData.attendance_rate_30),
          consec_absent: parseInt(studentData.consec_absent),
          avg_score: parseFloat(studentData.avg_score),
          last_score: parseFloat(studentData.last_score),
          last_payment_status: parseInt(studentData.last_payment_status),
          socioeconomic_flag: parseInt(studentData.socioeconomic_flag)
        };

        // Validate data
        if (!numericStudent.student_id || !numericStudent.name) {
          errors.push({ row: i + 1, error: "Missing student ID or name" });
          continue;
        }

        if (isNaN(numericStudent.attendance_rate_30) || 
            isNaN(numericStudent.consec_absent) || 
            isNaN(numericStudent.avg_score) || 
            isNaN(numericStudent.last_score)) {
          errors.push({ row: i + 1, error: "Invalid numeric values" });
          continue;
        }

        // Generate AI predictions
        const predictions = predictDropoutRisk(numericStudent);
        
        const fullStudent: Student = {
          ...numericStudent,
          ...predictions
        };

        success.push(fullStudent);
      } catch (error) {
        errors.push({ row: i + 1, error: "Failed to parse row data" });
      }
    }

    return { success, errors };
  };

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setUploadedFile(file);

    try {
      const text = await file.text();
      const results = parseCSV(text);
      setParseResults(results);

      if (results.success.length > 0) {
        toast({
          title: "File Processed Successfully! 🎉",
          description: `${results.success.length} students ready to import. ${results.errors.length} errors found.`,
        });
      } else {
        toast({
          title: "Processing Failed",
          description: "No valid student records found. Please check your file format.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to read the CSV file. Please check the file format.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      handleFileUpload(file);
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const studentData = {
        student_id: manualStudent.student_id,
        name: manualStudent.name,
        klass: manualStudent.klass,
        attendance_rate_30: parseFloat(manualStudent.attendance_rate_30),
        consec_absent: parseInt(manualStudent.consec_absent),
        avg_score: parseFloat(manualStudent.avg_score),
        last_score: parseFloat(manualStudent.last_score),
        last_payment_status: parseInt(manualStudent.last_payment_status),
        socioeconomic_flag: parseInt(manualStudent.socioeconomic_flag)
      };

      const predictions = predictDropoutRisk(studentData);
      const fullStudent: Student = { ...studentData, ...predictions };

      onStudentsAdded([fullStudent]);
      
      // Reset form
      setManualStudent({
        student_id: "",
        name: "",
        klass: "",
        attendance_rate_30: "",
        consec_absent: "",
        avg_score: "",
        last_score: "",
        last_payment_status: "",
        socioeconomic_flag: ""
      });

      toast({
        title: "Student Added Successfully! 🎉",
        description: `${fullStudent.name} has been added with ${fullStudent.risk_level} risk level.`,
      });
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Please check all fields and ensure numeric values are valid.",
        variant: "destructive",
      });
    }
  };

  const confirmImport = () => {
    if (parseResults?.success) {
      onStudentsAdded(parseResults.success);
      setParseResults(null);
      setUploadedFile(null);
      
      toast({
        title: "Students Imported! 🚀",
        description: `${parseResults.success.length} students added to the system successfully.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Add Student Data</h1>
            <p className="text-muted-foreground text-lg">
              Upload student data via CSV or add individual students manually
            </p>
          </div>

          <Tabs defaultValue="csv" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="csv" className="text-base">Bulk CSV Upload</TabsTrigger>
              <TabsTrigger value="manual" className="text-base">Manual Entry</TabsTrigger>
            </TabsList>

            {/* CSV Upload Tab */}
            <TabsContent value="csv" className="space-y-6">
              {/* Template Download */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="h-5 w-5 mr-2 text-primary" />
                    Download Template
                  </CardTitle>
                  <CardDescription>
                    Get the CSV template with required columns and sample data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={downloadTemplate} variant="outline" className="w-full md:w-auto">
                    <FileText className="h-4 w-4" />
                    Download CSV Template
                  </Button>
                </CardContent>
              </Card>

              {/* File Upload */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-primary" />
                    Upload Student Data
                  </CardTitle>
                  <CardDescription>
                    Upload your completed CSV file with student information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Drop your CSV file here
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      or click to browse and select a file
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Select File"}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Parse Results */}
              {parseResults && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-risk-low" />
                      Import Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-risk-low/10 rounded-lg">
                        <h3 className="text-2xl font-bold text-risk-low">{parseResults.success.length}</h3>
                        <p className="text-sm text-muted-foreground">Students Ready</p>
                      </div>
                      <div className="text-center p-4 bg-risk-high/10 rounded-lg">
                        <h3 className="text-2xl font-bold text-risk-high">{parseResults.errors.length}</h3>
                        <p className="text-sm text-muted-foreground">Errors Found</p>
                      </div>
                    </div>

                    {parseResults.errors.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-risk-high" />
                          Errors to Fix:
                        </h4>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {parseResults.errors.map((error, index) => (
                            <p key={index} className="text-sm text-risk-high bg-risk-high/10 p-2 rounded">
                              Row {error.row}: {error.error}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button 
                        onClick={confirmImport}
                        variant="hero"
                        disabled={parseResults.success.length === 0}
                        className="flex-1"
                      >
                        Import {parseResults.success.length} Students
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setParseResults(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Manual Entry Tab */}
            <TabsContent value="manual">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    Add Individual Student
                  </CardTitle>
                  <CardDescription>
                    Enter student information manually to calculate risk assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleManualSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="student_id">Student ID *</Label>
                        <Input
                          id="student_id"
                          value={manualStudent.student_id}
                          onChange={(e) => setManualStudent({...manualStudent, student_id: e.target.value})}
                          placeholder="e.g., STU001"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={manualStudent.name}
                          onChange={(e) => setManualStudent({...manualStudent, name: e.target.value})}
                          placeholder="e.g., John Doe"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="klass">Class *</Label>
                        <Input
                          id="klass"
                          value={manualStudent.klass}
                          onChange={(e) => setManualStudent({...manualStudent, klass: e.target.value})}
                          placeholder="e.g., 10-A"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="attendance_rate_30">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Attendance Rate (30 days) *
                        </Label>
                        <Input
                          id="attendance_rate_30"
                          type="number"
                          step="0.01"
                          min="0"
                          max="1"
                          value={manualStudent.attendance_rate_30}
                          onChange={(e) => setManualStudent({...manualStudent, attendance_rate_30: e.target.value})}
                          placeholder="0.85 (85%)"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="consec_absent">Consecutive Days Absent *</Label>
                        <Input
                          id="consec_absent"
                          type="number"
                          min="0"
                          value={manualStudent.consec_absent}
                          onChange={(e) => setManualStudent({...manualStudent, consec_absent: e.target.value})}
                          placeholder="2"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="avg_score">
                          <TrendingUp className="h-4 w-4 inline mr-1" />
                          Average Score *
                        </Label>
                        <Input
                          id="avg_score"
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={manualStudent.avg_score}
                          onChange={(e) => setManualStudent({...manualStudent, avg_score: e.target.value})}
                          placeholder="75.5"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="last_score">Last Test Score *</Label>
                        <Input
                          id="last_score"
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={manualStudent.last_score}
                          onChange={(e) => setManualStudent({...manualStudent, last_score: e.target.value})}
                          placeholder="78"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="last_payment_status">
                          <DollarSign className="h-4 w-4 inline mr-1" />
                          Fee Payment Status *
                        </Label>
                        <Select 
                          value={manualStudent.last_payment_status} 
                          onValueChange={(value) => setManualStudent({...manualStudent, last_payment_status: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Paid</SelectItem>
                            <SelectItem value="0">Unpaid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="socioeconomic_flag">Socioeconomic Risk *</Label>
                        <Select 
                          value={manualStudent.socioeconomic_flag} 
                          onValueChange={(value) => setManualStudent({...manualStudent, socioeconomic_flag: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select socioeconomic status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Not at risk</SelectItem>
                            <SelectItem value="1">At-risk background</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" variant="hero" className="w-full">
                      <User className="h-4 w-4" />
                      Add Student & Calculate Risk
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};