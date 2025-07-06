
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Calendar, User, AlertTriangle, CheckCircle } from "lucide-react";

const ExamSummary = () => {
  const navigate = useNavigate();

  const patientInfo = {
    name: "Sarah Johnson",
    dob: "March 15, 1985",
    examDate: "January 6, 2025"
  };

  const detectedAbnormalities = [
    { type: "Cervical Polyp", severity: "low", location: "Posterior lip" },
    { type: "Acetowhite Area", severity: "moderate", location: "6 o'clock position" }
  ];

  const patternRecognition = [
    { name: "Acetowhite", percentage: 85 },
    { name: "Mosaicism", percentage: 62 },
    { name: "Punctation", percentage: 43 }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "moderate":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "severe":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "severe":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">
            Exam Summary
          </h1>
          <p className="text-gray-600">
            Complete examination report and findings
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-pink-600" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{patientInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date of Birth:</span>
                <span>{patientInfo.dob}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Exam Date:</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {patientInfo.examDate}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Detected Abnormalities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Detected Abnormalities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {detectedAbnormalities.length > 0 ? (
                <div className="space-y-3">
                  {detectedAbnormalities.map((abnormality, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(abnormality.severity)}
                        <div>
                          <p className="font-medium">{abnormality.type}</p>
                          <p className="text-sm text-gray-600">{abnormality.location}</p>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(abnormality.severity)}>
                        {abnormality.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No abnormalities detected</p>
              )}
            </CardContent>
          </Card>

          {/* Pattern Recognition */}
          <Card>
            <CardHeader>
              <CardTitle>Pattern Recognition Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patternRecognition.map((pattern) => (
                  <div key={pattern.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{pattern.name}</span>
                      <span className="font-semibold">{pattern.percentage}%</span>
                    </div>
                    <Progress value={pattern.percentage} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exam Details */}
          <Card>
            <CardHeader>
              <CardTitle>Exam Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">HPV Status:</span>
                <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Severity Level:</span>
                <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Biopsy Taken:</span>
                <span>No</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Annotations:</span>
                <span>2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Follow-up Plan */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Follow-Up Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Recommend follow-up colposcopy in 6 months to monitor acetowhite area progression. 
                Consider HPV testing if not already completed. Patient education provided regarding 
                findings and importance of regular screening.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Button 
            variant="outline"
            onClick={() => navigate("/live-exam")}
          >
            Back to Exam
          </Button>
          <Button 
            onClick={() => navigate("/patient-overview")}
            className="bg-pink-600 hover:bg-pink-700"
          >
            Save & Continue
          </Button>
          <Button variant="outline">
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamSummary;
