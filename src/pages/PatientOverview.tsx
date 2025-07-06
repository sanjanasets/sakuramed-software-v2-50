
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, Phone, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - in a real app, this would come from the previous forms or API
const mockPatientData = {
  firstName: "Sarah",
  lastName: "Johnson", 
  dateOfBirth: "1985-03-15",
  age: 39,
  homePhone: "(555) 123-4567",
  cellPhone: "(555) 987-6543",
  reasonForVisit: "Well Woman (40–49)",
  birthControl: "Yes",
  menstrualCycle: "Regular",
  visitTypes: ["Routine Checkup"],
  allergies: ["Latex", "Penicillin"],
  medications: ["Birth Control Pills"],
  additionalNotes: "Patient reports no unusual symptoms. Regular menstrual cycle.",
  gender: "Female"
};

const PatientOverview = () => {
  const navigate = useNavigate();
  const [selectedExamTypes, setSelectedExamTypes] = useState<string[]>([]);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  const examTypes = [
    "GYN Pelvic and Abdominal Exam",
    "GYN Focused Exam", 
    "GYN Breast Exam",
    "GYN Counseling"
  ];

  const handleExamTypeChange = (examType: string, checked: boolean) => {
    if (checked) {
      setSelectedExamTypes(prev => [...prev, examType]);
    } else {
      setSelectedExamTypes(prev => prev.filter(type => type !== examType));
    }
  };

  const handleStartExam = () => {
    if (selectedExamTypes.length > 0) {
      console.log("Starting exam with types:", selectedExamTypes);
      // Navigate to exam workflow (not implemented yet)
      setIsExamModalOpen(false);
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold text-[#4A4A4A] flex items-center gap-2">
                  <User className="h-8 w-8 text-[#D11948]" />
                  {mockPatientData.firstName} {mockPatientData.lastName}
                </CardTitle>
                <div className="flex items-center gap-4 text-lg text-[#4A4A4A]">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-[#D11948]" />
                    <span>DOB: {mockPatientData.dateOfBirth}</span>
                    <Badge variant="secondary" className="bg-[#DEEAFf] text-[#4A4A4A] font-semibold">
                      Age {calculateAge(mockPatientData.dateOfBirth)}
                    </Badge>
                  </div>
                </div>
              </div>

              <Dialog open={isExamModalOpen} onOpenChange={setIsExamModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="h-14 px-8 bg-[#D11948] hover:bg-[#DE6886] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Activity className="mr-2 h-5 w-5" />
                    Start New Exam
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-[#4A4A4A]">
                      Select Type of Exam
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {examTypes.map((examType) => (
                      <div key={examType} className="flex items-center space-x-3">
                        <Checkbox
                          id={examType}
                          checked={selectedExamTypes.includes(examType)}
                          onCheckedChange={(checked) => handleExamTypeChange(examType, checked as boolean)}
                        />
                        <label htmlFor={examType} className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {examType}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsExamModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleStartExam}
                      disabled={selectedExamTypes.length === 0}
                      className="bg-[#D11948] hover:bg-[#DE6886] text-white"
                    >
                      Start Exam
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        {/* Patient Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#4A4A4A] flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#D11948]" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium text-[#4A4A4A]">Home Phone:</span>
                <span className="ml-2 text-gray-600">{mockPatientData.homePhone || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium text-[#4A4A4A]">Cell Phone:</span>
                <span className="ml-2 text-gray-600">{mockPatientData.cellPhone || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium text-[#4A4A4A]">Gender:</span>
                <span className="ml-2 text-gray-600">{mockPatientData.gender}</span>
              </div>
              <div>
                <span className="font-medium text-[#4A4A4A]">Reason for Visit:</span>
                <span className="ml-2 text-gray-600">{mockPatientData.reasonForVisit}</span>
              </div>
            </CardContent>
          </Card>

          {/* Medical History */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#4A4A4A]">
                Medical History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="font-medium text-[#4A4A4A]">Birth Control:</span>
                <Badge className="ml-2 bg-[#DEEAFf] text-[#4A4A4A]">
                  {mockPatientData.birthControl}
                </Badge>
              </div>
              <div>
                <span className="font-medium text-[#4A4A4A]">Menstrual Cycle:</span>
                <Badge className="ml-2 bg-[#DEEAFf] text-[#4A4A4A]">
                  {mockPatientData.menstrualCycle}
                </Badge>
              </div>
              <div>
                <span className="font-medium text-[#4A4A4A]">Visit Type:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mockPatientData.visitTypes.map((type, index) => (
                    <Badge key={index} className="bg-[#DEEAFf] text-[#4A4A4A]">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allergies */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#4A4A4A]">
                Allergies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockPatientData.allergies.length > 0 ? (
                  mockPatientData.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                      {allergy}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-600">No known allergies</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Current Medications */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#4A4A4A]">
                Current Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockPatientData.medications.length > 0 ? (
                  mockPatientData.medications.map((medication, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                      {medication}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-600">No current medications</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Visits */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#4A4A4A]">
              Recent Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-[#4A4A4A]">Annual Checkup</span>
                <span className="text-gray-600">2024-02-15</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-[#4A4A4A]">Follow-up Visit</span>
                <span className="text-gray-600">2023-11-22</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Past Patient Imaging */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#4A4A4A]">
              Past Patient Imaging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((imageNum) => (
                <div 
                  key={imageNum}
                  className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => console.log(`Viewing Image ${imageNum}`)}
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-600">Image {imageNum}</div>
                    <div className="text-sm text-gray-500 mt-1">Click to view</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        {mockPatientData.additionalNotes && (
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#4A4A4A]">
                Additional Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {mockPatientData.additionalNotes}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PatientOverview;
