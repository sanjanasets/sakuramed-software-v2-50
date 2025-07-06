
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientSelection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleManualEntry = () => {
    navigate("/patient-info-entry");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      {/* Main Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">Please select a patient in MyChart</h2>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - MyChart Integration */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardDescription className="text-[#4A4A4A]/70 text-base leading-relaxed">
                MyChart integration coming soon – this section will include patient search functionality with an optional help feature.
                <br /><br />
                Clinicians will be able to search for patients directly within the app. A built-in help icon will guide users on how to use MyChart once integrated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Video Placeholder */}
              <div className="relative bg-[#E0E0E0] rounded-lg h-64 flex items-center justify-center">
                <div className="text-[#4A4A4A]/50 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#4A4A4A]/20 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#4A4A4A]/40 ml-1" />
                  </div>
                  <p className="text-sm">Instructional Video</p>
                </div>
                {/* Help Icon in Corner */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors group">
                  <HelpCircle className="w-4 h-4 text-[#D11948] group-hover:text-[#DE6886]" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Manual Entry */}
        <div>
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-[#4A4A4A] mb-3">
                Start Exam Without Selecting from MyChart
              </CardTitle>
              <CardDescription className="text-[#4A4A4A]/70 text-base leading-relaxed">
                Enter patient information manually for walk-in visits, urgent exams, or patients not listed in MyChart.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Button
                onClick={handleManualEntry}
                className="w-full h-12 bg-[#D11948] hover:bg-[#DE6886] text-white font-semibold text-base rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Enter Patient Details Manually
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientSelection;
