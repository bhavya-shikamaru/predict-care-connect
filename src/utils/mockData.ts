// Mock AI prediction system and sample data

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

// Mock AI prediction function
export const predictDropoutRisk = (studentData: Omit<Student, 'risk_level' | 'risk_score' | 'risk_factors'>): {
  risk_level: "high" | "medium" | "low";
  risk_score: number;
  risk_factors: string[];
} => {
  const factors = [];
  let riskScore = 0;

  // Attendance factors
  if (studentData.attendance_rate_30 < 0.7) {
    factors.push("Low attendance (< 70%)");
    riskScore += 0.3;
  }
  if (studentData.consec_absent > 5) {
    factors.push("Extended consecutive absences");
    riskScore += 0.2;
  }

  // Academic performance factors
  if (studentData.avg_score < 50) {
    factors.push("Low average scores");
    riskScore += 0.25;
  }
  if (studentData.last_score < 40) {
    factors.push("Recent poor test performance");
    riskScore += 0.15;
  }

  // Financial factors
  if (studentData.last_payment_status === 0) {
    factors.push("Outstanding fee payments");
    riskScore += 0.2;
  }

  // Socioeconomic factors
  if (studentData.socioeconomic_flag === 1) {
    factors.push("At-risk socioeconomic background");
    riskScore += 0.15;
  }

  // Determine risk level
  let risk_level: "high" | "medium" | "low";
  if (riskScore >= 0.6) {
    risk_level = "high";
  } else if (riskScore >= 0.3) {
    risk_level = "medium";
  } else {
    risk_level = "low";
  }

  return {
    risk_level,
    risk_score: Math.min(riskScore, 0.95), // Cap at 95%
    risk_factors: factors
  };
};

// Sample student data
export const sampleStudents: Student[] = [
  {
    student_id: "STU001",
    name: "Aarav Kumar",
    klass: "10-A",
    attendance_rate_30: 0.65,
    consec_absent: 7,
    avg_score: 45.2,
    last_score: 32,
    last_payment_status: 0,
    socioeconomic_flag: 1,
    ...predictDropoutRisk({
      student_id: "STU001",
      name: "Aarav Kumar",
      klass: "10-A",
      attendance_rate_30: 0.65,
      consec_absent: 7,
      avg_score: 45.2,
      last_score: 32,
      last_payment_status: 0,
      socioeconomic_flag: 1
    })
  },
  {
    student_id: "STU002",
    name: "Priya Sharma",
    klass: "9-B",
    attendance_rate_30: 0.85,
    consec_absent: 2,
    avg_score: 72.8,
    last_score: 68,
    last_payment_status: 1,
    socioeconomic_flag: 0,
    ...predictDropoutRisk({
      student_id: "STU002",
      name: "Priya Sharma",
      klass: "9-B",
      attendance_rate_30: 0.85,
      consec_absent: 2,
      avg_score: 72.8,
      last_score: 68,
      last_payment_status: 1,
      socioeconomic_flag: 0
    })
  },
  {
    student_id: "STU003",
    name: "Rahul Mehta",
    klass: "11-C",
    attendance_rate_30: 0.75,
    consec_absent: 3,
    avg_score: 55.4,
    last_score: 48,
    last_payment_status: 0,
    socioeconomic_flag: 0,
    ...predictDropoutRisk({
      student_id: "STU003",
      name: "Rahul Mehta",
      klass: "11-C",
      attendance_rate_30: 0.75,
      consec_absent: 3,
      avg_score: 55.4,
      last_score: 48,
      last_payment_status: 0,
      socioeconomic_flag: 0
    })
  },
  {
    student_id: "STU004",
    name: "Ananya Patel",
    klass: "10-B",
    attendance_rate_30: 0.92,
    consec_absent: 1,
    avg_score: 84.6,
    last_score: 87,
    last_payment_status: 1,
    socioeconomic_flag: 0,
    ...predictDropoutRisk({
      student_id: "STU004",
      name: "Ananya Patel",
      klass: "10-B",
      attendance_rate_30: 0.92,
      consec_absent: 1,
      avg_score: 84.6,
      last_score: 87,
      last_payment_status: 1,
      socioeconomic_flag: 0
    })
  },
  {
    student_id: "STU005",
    name: "Vikram Singh",
    klass: "12-A",
    attendance_rate_30: 0.68,
    consec_absent: 8,
    avg_score: 38.2,
    last_score: 25,
    last_payment_status: 1,
    socioeconomic_flag: 1,
    ...predictDropoutRisk({
      student_id: "STU005",
      name: "Vikram Singh",
      klass: "12-A",
      attendance_rate_30: 0.68,
      consec_absent: 8,
      avg_score: 38.2,
      last_score: 25,
      last_payment_status: 1,
      socioeconomic_flag: 1
    })
  },
  {
    student_id: "STU006",
    name: "Kavya Reddy",
    klass: "9-A",
    attendance_rate_30: 0.88,
    consec_absent: 1,
    avg_score: 76.5,
    last_score: 82,
    last_payment_status: 1,
    socioeconomic_flag: 0,
    ...predictDropoutRisk({
      student_id: "STU006",
      name: "Kavya Reddy",
      klass: "9-A",
      attendance_rate_30: 0.88,
      consec_absent: 1,
      avg_score: 76.5,
      last_score: 82,
      last_payment_status: 1,
      socioeconomic_flag: 0
    })
  }
];

// Enhanced counselling recommendations with specific roles
export const getInterventionSuggestions = (risk_factors: string[]): Array<{
  type: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  icon: string;
  assignedTo: string;
  actionSteps: string[];
}> => {
  const interventions = [];

  if (risk_factors.some(f => f.includes("attendance") || f.includes("absent"))) {
    interventions.push({
      type: "attendance",
      title: "Mentor Intervention - Attendance",
      description: "Assign dedicated mentor to work closely with student on attendance patterns and underlying issues.",
      priority: "high" as const,
      icon: "📅",
      assignedTo: "Student Mentor",
      actionSteps: [
        "Schedule one-on-one meeting with student within 48 hours",
        "Identify root causes of absenteeism (transportation, health, family issues)",
        "Create personalized attendance improvement plan",
        "Set up daily check-ins for first week",
        "Coordinate with parents for home-school communication"
      ]
    });
  }

  if (risk_factors.some(f => f.includes("score") || f.includes("performance"))) {
    interventions.push({
      type: "academic",
      title: "Subject Teacher Support",
      description: "Direct intervention by subject teachers to address specific academic challenges and knowledge gaps.",
      priority: "high" as const,
      icon: "📊",
      assignedTo: "Subject Teacher",
      actionSteps: [
        "Conduct diagnostic assessment to identify specific learning gaps",
        "Develop individualized learning plan with measurable goals",
        "Arrange after-school tutoring sessions 2x per week",
        "Provide alternative learning materials and methods",
        "Weekly progress monitoring with feedback to student and parents"
      ]
    });
  }

  if (risk_factors.some(f => f.includes("payment") || f.includes("fee"))) {
    interventions.push({
      type: "financial",
      title: "Financial Counselor Support",
      description: "Connect family with financial resources and develop sustainable payment solutions.",
      priority: "medium" as const,
      icon: "💰",
      assignedTo: "Financial Counselor",
      actionSteps: [
        "Schedule confidential meeting with family within 3 days",
        "Assess family's financial situation and available resources",
        "Apply for available scholarships and financial aid programs",
        "Set up manageable payment plan with school administration",
        "Connect with community resources for additional support"
      ]
    });
  }

  if (risk_factors.some(f => f.includes("socioeconomic"))) {
    interventions.push({
      type: "support",
      title: "School Counselor - Holistic Support",
      description: "Comprehensive support addressing social, emotional, and environmental factors affecting student success.",
      priority: "medium" as const,
      icon: "🤝",
      assignedTo: "School Counselor",
      actionSteps: [
        "Complete comprehensive needs assessment",
        "Coordinate with social services if needed",
        "Establish peer support group participation",
        "Connect family with community resources (food bank, healthcare)",
        "Monitor student's social-emotional wellbeing weekly"
      ]
    });
  }

  // Additional specialized interventions
  if (risk_factors.length >= 3) {
    interventions.push({
      type: "comprehensive",
      title: "Multi-Disciplinary Team Approach",
      description: "Coordinate comprehensive intervention involving multiple specialists for high-risk students.",
      priority: "high" as const,
      icon: "👥",
      assignedTo: "Student Success Team",
      actionSteps: [
        "Convene emergency student success team meeting within 24 hours",
        "Assign case manager to coordinate all interventions",
        "Develop comprehensive intervention plan with timeline",
        "Schedule weekly team meetings to monitor progress",
        "Establish crisis intervention protocol if needed"
      ]
    });
  }

  return interventions;
};

export type { Student };