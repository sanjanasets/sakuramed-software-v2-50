import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    birthControl: "",
    menstrualCycle: "",
    menstrualCycleOther: "",
    visitTypes: [] as string[],
    visitTypesOther: "",
    allergies: [] as string[],
    allergiesOther: "",
    medications: [] as string[],
    medicationsOther: "",
    additionalNotes: "",
    homePhone: "",
    cellPhone: "",
    gender: "",
    genderOther: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleBack = () => {
    navigate("/patient-info-entry");
  };

  const handleStartExam = () => {
    navigate("/patient-overview");
  };

  const isFormValid = formData.birthControl !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <span className="ml-2 text-gray-500">Patient Info</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#D11948] text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <span className="ml-2 font-medium text-[#4A4A4A]">Medical History</span>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-[#4A4A4A] text-center">
              Medical History
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Section 1: Birth Control */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4A4A4A] border-b border-gray-200 pb-2">
                Birth Control
              </h3>
              <div className="space-y-3">
                <Label className="text-[#4A4A4A] font-medium">
                  Are you currently on birth control? <span className="text-[#D11948]">*</span>
                </Label>
                <RadioGroup value={formData.birthControl} onValueChange={(value) => handleInputChange("birthControl", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="bc-yes" />
                    <Label htmlFor="bc-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="bc-no" />
                    <Label htmlFor="bc-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="bc-prefer" />
                    <Label htmlFor="bc-prefer">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Section 2: Menstrual Cycle */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4A4A4A] border-b border-gray-200 pb-2">
                Menstrual Cycle
              </h3>
              <div className="space-y-3">
                <Label className="text-[#4A4A4A] font-medium">How would you describe your cycle?</Label>
                <Select value={formData.menstrualCycle} onValueChange={(value) => handleInputChange("menstrualCycle", value)}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select cycle description" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="irregular">Irregular</SelectItem>
                    <SelectItem value="menopausal">Menopausal</SelectItem>
                    <SelectItem value="not-applicable">Not applicable</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {formData.menstrualCycle === "other" && (
                  <Input
                    value={formData.menstrualCycleOther}
                    onChange={(e) => handleInputChange("menstrualCycleOther", e.target.value)}
                    className="h-12 text-base"
                    placeholder="Please specify"
                  />
                )}
              </div>
            </div>

            {/* Section 3: Visit Type */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4A4A4A] border-b border-gray-200 pb-2">
                Visit Type
              </h3>
              <div className="space-y-3">
                <Label className="text-[#4A4A4A] font-medium">Select all that apply:</Label>
                <div className="space-y-3">
                  {["Routine Checkup", "Emergency/Urgent", "Follow-Up Visit", "Second Opinion"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`visit-${type}`}
                        checked={formData.visitTypes.includes(type)}
                        onCheckedChange={(checked) => handleCheckboxChange("visitTypes", type, checked as boolean)}
                      />
                      <Label htmlFor={`visit-${type}`}>{type}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="visit-other"
                      checked={formData.visitTypes.includes("other")}
                      onCheckedChange={(checked) => handleCheckboxChange("visitTypes", "other", checked as boolean)}
                    />
                    <Label htmlFor="visit-other">Other:</Label>
                    <Input
                      value={formData.visitTypesOther}
                      onChange={(e) => handleInputChange("visitTypesOther", e.target.value)}
                      className="h-10 text-base ml-2 flex-1"
                      placeholder="Please specify"
                      disabled={!formData.visitTypes.includes("other")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Allergies */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4A4A4A] border-b border-gray-200 pb-2">
                Allergies
              </h3>
              <div className="space-y-3">
                <Label className="text-[#4A4A4A] font-medium">Select all that apply:</Label>
                <div className="space-y-3">
                  {["Latex", "Penicillin", "Iodine", "Adhesive", "No Known Allergies"].map((allergy) => (
                    <div key={allergy} className="flex items-center space-x-2">
                      <Checkbox
                        id={`allergy-${allergy}`}
                        checked={formData.allergies.includes(allergy)}
                        onCheckedChange={(checked) => handleCheckboxChange("allergies", allergy, checked as boolean)}
                      />
                      <Label htmlFor={`allergy-${allergy}`}>{allergy}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allergy-other"
                      checked={formData.allergies.includes("other")}
                      onCheckedChange={(checked) => handleCheckboxChange("allergies", "other", checked as boolean)}
                    />
                    <Label htmlFor="allergy-other">Other:</Label>
                    <Input
                      value={formData.allergiesOther}
                      onChange={(e) => handleInputChange("allergiesOther", e.target.value)}
                      className="h-10 text-base ml-2 flex-1"
                      placeholder="Please specify"
                      disabled={!formData.allergies.includes("other")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Medications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4A4A4A] border-b border-gray-200 pb-2">
                Current Medications
              </h3>
              <div className="space-y-3">
                <Label className="text-[#4A4A4A] font-medium">Select all that apply:</Label>
                <div className="space-y-3">
                  {["Birth Control Pills", "Hormone Replacement Therapy", "Antibiotics (UTI)", "Antifungal (yeast infections)"].map((medication) => (
                    <div key={medication} className="flex items-center space-x-2">
                      <Checkbox
                        id={`medication-${medication}`}
                        checked={formData.medications.includes(medication)}
                        onCheckedChange={(checked) => handleCheckboxChange("medications", medication, checked as boolean)}
                      />
                      <Label htmlFor={`medication-${medication}`}>{medication}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="medication-other"
                      checked={formData.medications.includes("other")}
                      onCheckedChange={(checked) => handleCheckboxChange("medications", "other", checked as boolean)}
                    />
                    <Label htmlFor="medication-other">Other:</Label>
                    <Input
                      value={formData.medicationsOther}
                      onChange={(e) => handleInputChange("medicationsOther", e.target.value)}
                      className="h-10 text-base ml-2 flex-1"
                      placeholder="Please specify other medications"
                      disabled={!formData.medications.includes("other")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4A4A4A] border-b border-gray-200 pb-2">
                Additional Information
              </h3>
              <div className="space-y-3">
                <Label htmlFor="additionalNotes" className="text-[#4A4A4A] font-medium">
                  Additional Notes or Medical History
                </Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  className="min-h-[120px] text-base"
                  placeholder="Please provide any additional medical history or notes..."
                />
              </div>
            </div>

            {/* Section 7: Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4A4A4A] border-b border-gray-200 pb-2">
                Contact Information (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="space-y-2">
                  <Label htmlFor="cellPhone" className="text-[#4A4A4A] font-medium">
                    Personal/Cell Number
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

              <div className="space-y-3 mt-6">
                <Label className="text-[#4A4A4A] font-medium">Gender</Label>
                <RadioGroup value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="gender-female" />
                    <Label htmlFor="gender-female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="gender-male" />
                    <Label htmlFor="gender-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-binary" id="gender-nb" />
                    <Label htmlFor="gender-nb">Non-binary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="gender-prefer" />
                    <Label htmlFor="gender-prefer">Prefer not to say</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="gender-other" />
                    <Label htmlFor="gender-other">Other:</Label>
                    <Input
                      value={formData.genderOther}
                      onChange={(e) => handleInputChange("genderOther", e.target.value)}
                      className="h-10 text-base ml-2 flex-1"
                      placeholder="Please specify"
                      disabled={formData.gender !== "other"}
                    />
                  </div>
                </RadioGroup>
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
                onClick={handleStartExam}
                disabled={!isFormValid}
                className="h-12 px-8 bg-[#D11948] hover:bg-[#DE6886] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalHistory;
