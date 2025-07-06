
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectGroup, SelectSeparator } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const PatientInfoEntry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: undefined as Date | undefined,
    dateOfBirthText: "",
    gender: "",
    homePhone: "",
    cellPhone: "",
    reasonForVisit: "",
    otherReason: ""
  });

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      dateOfBirth: date,
      dateOfBirthText: date ? format(date, "yyyy-MM-dd") : ""
    }));
  };

  const handleDateTextChange = (value: string) => {
    setFormData(prev => ({ ...prev, dateOfBirthText: value }));
    
    // Try to parse the date if it's in the correct format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(value)) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        setFormData(prev => ({ ...prev, dateOfBirth: parsedDate }));
      }
    }
  };

  const handleBack = () => {
    navigate("/patient-selection");
  };

  const handleContinue = () => {
    navigate("/medical-history");
  };

  const isFormValid = formData.firstName.trim() !== "" && formData.lastName.trim() !== "" && (formData.dateOfBirth !== undefined || formData.dateOfBirthText.trim() !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#D11948] text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <span className="ml-2 font-medium text-[#4A4A4A]">Patient Info</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <span className="ml-2 text-gray-500">Medical History</span>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-[#4A4A4A] text-center">
              Patient Information
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#4A4A4A] border-b border-gray-200 pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#4A4A4A] font-medium">
                    First Name <span className="text-[#D11948]">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="h-12 text-base"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#4A4A4A] font-medium">
                    Last Name <span className="text-[#D11948]">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="h-12 text-base"
                    placeholder="Enter last name"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#4A4A4A] font-medium">
                    Date of Birth <span className="text-[#D11948]">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.dateOfBirthText}
                      onChange={(e) => handleDateTextChange(e.target.value)}
                      className="h-12 text-base flex-1"
                      placeholder="YYYY-MM-DD"
                      type="text"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-12 w-12 p-0 shrink-0"
                        >
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfBirth}
                          onSelect={handleDateChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#4A4A4A] font-medium">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="homePhone" className="text-[#4A4A4A] font-medium">
                    Home Phone Number
                  </Label>
                  <Input
                    id="homePhone"
                    value={formData.homePhone}
                    onChange={(e) => handleInputChange("homePhone", e.target.value)}
                    className="h-12 text-base"
                    placeholder="(555) 123-4567"
                    type="tel"
                  />
                </div>

                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="cellPhone" className="text-[#4A4A4A] font-medium">
                    Personal Cell Number
                  </Label>
                  <Input
                    id="cellPhone"
                    value={formData.cellPhone}
                    onChange={(e) => handleInputChange("cellPhone", e.target.value)}
                    className="h-12 text-base"
                    placeholder="(555) 123-4567"
                    type="tel"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Reason for Visit */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#4A4A4A] border-b border-gray-200 pb-2">
                Reason for Visit
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#4A4A4A] font-medium">Reason for Visit</Label>
                  <Select value={formData.reasonForVisit} onValueChange={(value) => handleInputChange("reasonForVisit", value)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select reason for visit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-[#4A4A4A] font-semibold bg-gray-50">Top Complaints</SelectLabel>
                        <SelectItem value="cosmetic" className="pl-6">Cosmetic</SelectItem>
                        <SelectItem value="well-woman-40-49" className="pl-6">Well Woman (40–49)</SelectItem>
                        <SelectItem value="gyn-pregnancy-counseling" className="pl-6">GYN (Pregnancy Counseling)</SelectItem>
                        <SelectItem value="vaginal-discharge" className="pl-6">Vaginal Discharge</SelectItem>
                        <SelectItem value="postmenopausal-bleeding" className="pl-6">Postmenopausal Bleeding</SelectItem>
                        <SelectItem value="prepregnancy-counseling" className="pl-6">Prepregnancy Counseling</SelectItem>
                        <SelectItem value="incidental-finding" className="pl-6">Incidental Finding</SelectItem>
                      </SelectGroup>
                      
                      <SelectSeparator />
                      
                      <SelectGroup>
                        <SelectLabel className="text-[#4A4A4A] font-semibold bg-gray-50">Other Complaints</SelectLabel>
                        <SelectItem value="sti-check" className="pl-6">STI Check</SelectItem>
                        <SelectItem value="pap-smear-follow-up" className="pl-6">Pap Smear Follow-Up</SelectItem>
                        <SelectItem value="irregular-bleeding" className="pl-6">Irregular Bleeding</SelectItem>
                        <SelectItem value="pelvic-pain" className="pl-6">Pelvic Pain</SelectItem>
                        <SelectItem value="unusual-discharge" className="pl-6">Unusual Discharge</SelectItem>
                        <SelectItem value="other" className="pl-6">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {formData.reasonForVisit === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="otherReason" className="text-[#4A4A4A] font-medium">
                      Please specify
                    </Label>
                    <Input
                      id="otherReason"
                      value={formData.otherReason}
                      onChange={(e) => handleInputChange("otherReason", e.target.value)}
                      className="h-12 text-base"
                      placeholder="Please describe your reason for visit"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                onClick={handleBack}
                variant="outline"
                className="h-12 px-6 text-base font-semibold border-[#4A4A4A] text-[#4A4A4A] hover:bg-gray-50"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={handleContinue}
                disabled={!isFormValid}
                className="h-12 px-8 bg-[#D11948] hover:bg-[#DE6886] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Continue to Medical History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientInfoEntry;
