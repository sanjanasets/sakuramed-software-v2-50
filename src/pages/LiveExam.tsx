
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Settings, Camera, Square, Circle, HelpCircle, User, Calendar, Stethoscope } from "lucide-react";

const LiveExam = () => {
  const navigate = useNavigate();
  const [showPositioningModal, setShowPositioningModal] = useState(true);
  const [showCameraSettings, setShowCameraSettings] = useState(false);
  const [biopsyTaken, setBiopsyTaken] = useState(false);
  const [biopsyCount, setBiopsyCount] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState(false);
  const [cameraMode, setCameraMode] = useState("standard");
  const [zoom, setZoom] = useState([1]);
  const [focus, setFocus] = useState([50]);
  const [lightIntensity, setLightIntensity] = useState([75]);
  const [colorSaturation, setColorSaturation] = useState([50]);
  const [opacity, setOpacity] = useState([50]);
  const [annotationType, setAnnotationType] = useState("cervical-polyp");
  const [selectedTool, setSelectedTool] = useState("circle");
  const [annotationLabel, setAnnotationLabel] = useState("");

  const patientInfo = {
    name: "Sarah Johnson",
    dob: "March 15, 1985",
    mrn: "MRN12345",
    reasonForVisit: "Annual Pap Screening",
    allergies: "NKDA"
  };

  const annotationTypes = [
    "Lesion",
    "Acetowhite Area", 
    "Mosaicism",
    "Punctation",
    "Friable Tissue",
    "Cervical Polyp",
    "Erosion",
    "Vaginal Discharge",
    "Suspicious Vessels",
    "Nodule"
  ];

  const cameraModes = [
    { value: "standard", label: "Standard" },
    { value: "high-saturation", label: "High Saturation" },
    { value: "low-saturation", label: "Low Saturation (Grayscale)" },
    { value: "enhanced-vascular", label: "Enhanced Vascular View (Green Filter)" },
    { value: "contrast-enhanced", label: "Contrast-Enhanced View" },
    { value: "acetic-response", label: "Acetic Response Tracking" },
    { value: "iodine", label: "Iodine View" },
    { value: "heatmap", label: "Heatmap View" }
  ];

  const biopsySites = [
    "Anterior lip",
    "Posterior lip", 
    "Lateral wall",
    "Posterior fornix",
    "Anterior fornix",
    "Cervical canal"
  ];

  const biopsyMethods = [
    "Forceps",
    "Curettage",
    "Brush",
    "Punch biopsy"
  ];

  const hemostasisMethods = [
    "Silver nitrate",
    "Direct pressure",
    "Monsel's solution",
    "Electrocautery"
  ];

  const patternRecognition = [
    { name: "Acetowhite", percentage: 85 },
    { name: "Mosaicism", percentage: 62 },
    { name: "Punctation", percentage: 43 }
  ];

  const annotations = [
    { type: "Cervical Polyp", timestamp: "14:32", author: "Dr. Smith" },
    { type: "Acetowhite Area", timestamp: "14:28", author: "Dr. Smith" }
  ];

  const handleAddBiopsy = () => {
    if (biopsyTaken) {
      setBiopsyCount(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Patient Info Panel - Top */}
      <div className="bg-white border-b p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-pink-600" />
              <span className="font-semibold">{patientInfo.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">DOB: {patientInfo.dob}</span>
            </div>
            <div className="text-sm text-gray-600">MRN: {patientInfo.mrn}</div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{patientInfo.reasonForVisit}</span>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200">
              {patientInfo.allergies}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Main Camera View Area */}
        <div className="flex-1 p-4">
          <div className="relative bg-black rounded-lg h-full min-h-[600px] flex items-center justify-center">
            {/* Live Video Feed with Cervix Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div 
                className="bg-pink-100 rounded-full w-96 h-96 flex items-center justify-center"
                style={{ 
                  transform: `scale(${zoom[0]})`,
                  filter: `
                    brightness(${lightIntensity[0]}%) 
                    saturate(${colorSaturation[0]}%) 
                    ${cameraMode === 'low-saturation' ? 'grayscale(100%)' : ''}
                    ${cameraMode === 'enhanced-vascular' ? 'hue-rotate(120deg)' : ''}
                    ${cameraMode === 'high-saturation' ? 'saturate(150%)' : ''}
                  `
                }}
              >
                <div className="text-pink-600 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-pink-200 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🔬</span>
                  </div>
                  <p className="text-lg">Live Cervix View</p>
                  <p className="text-sm opacity-70 mt-2">Mode: {cameraModes.find(m => m.value === cameraMode)?.label}</p>
                </div>
              </div>
            </div>

            {/* Camera Settings Button */}
            <Button
              onClick={() => setShowCameraSettings(!showCameraSettings)}
              className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white"
              size="icon"
            >
              <Settings className="w-4 h-4" />
            </Button>

            {/* Help Button for Positioning Guide */}
            <Button
              onClick={() => setShowPositioningModal(true)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
              size="icon"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>

            {/* Camera Settings Panel */}
            {showCameraSettings && (
              <Card className="absolute top-16 left-4 w-80 bg-white/95 backdrop-blur">
                <CardHeader>
                  <CardTitle>Camera Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Camera Mode</Label>
                    <Select value={cameraMode} onValueChange={setCameraMode}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cameraModes.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Zoom Level: {zoom[0]}x</Label>
                    <Slider
                      value={zoom}
                      onValueChange={setZoom}
                      min={0.5}
                      max={3}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Focus: {focus[0]}%</Label>
                    <Slider
                      value={focus}
                      onValueChange={setFocus}
                      min={0}
                      max={100}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Light Intensity: {lightIntensity[0]}%</Label>
                    <Slider
                      value={lightIntensity}
                      onValueChange={setLightIntensity}
                      min={0}
                      max={150}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Color Saturation: {colorSaturation[0]}%</Label>
                    <Slider
                      value={colorSaturation}
                      onValueChange={setColorSaturation}
                      min={0}
                      max={200}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="w-96 bg-white border-l">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Exam</h2>
            
            <Tabs defaultValue="annotate" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="annotate">Annotate</TabsTrigger>
                <TabsTrigger value="biopsy">Biopsy</TabsTrigger>
                <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
              </TabsList>

              {/* Annotate Tab */}
              <TabsContent value="annotate" className="space-y-4 mt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    checked={aiSuggestions}
                    onCheckedChange={setAiSuggestions}
                  />
                  <Label>AI Suggestions</Label>
                </div>

                <div>
                  <Label>Annotation Type</Label>
                  <Select value={annotationType} onValueChange={setAnnotationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {annotationTypes.map((type) => (
                        <SelectItem key={type.toLowerCase().replace(/\s+/g, '-')} value={type.toLowerCase().replace(/\s+/g, '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Shape Tools</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant={selectedTool === "circle" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTool("circle")}
                    >
                      <Circle className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={selectedTool === "square" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTool("square")}
                    >
                      <Square className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={selectedTool === "freehand" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTool("freehand")}
                    >
                      Freehand
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Opacity: {opacity[0]}%</Label>
                  <Slider
                    value={opacity}
                    onValueChange={setOpacity}
                    min={0}
                    max={100}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Annotation Label</Label>
                  <Input 
                    placeholder="Enter annotation label" 
                    className="mt-2"
                    value={annotationLabel}
                    onChange={(e) => setAnnotationLabel(e.target.value)}
                  />
                </div>

                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  Add Annotation
                </Button>

                <div className="border-t pt-4 mt-6">
                  <h4 className="font-semibold mb-3">Recent Annotations</h4>
                  <div className="space-y-2">
                    {annotations.map((annotation, index) => (
                      <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                        <div className="font-medium">{annotation.type}</div>
                        <div className="text-gray-600">{annotation.timestamp} - {annotation.author}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Biopsy Tab */}
              <TabsContent value="biopsy" className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={biopsyTaken}
                      onCheckedChange={setBiopsyTaken}
                    />
                    <Label>Was a biopsy taken?</Label>
                  </div>
                  {biopsyCount > 0 && (
                    <Badge variant="outline">
                      {biopsyCount} biops{biopsyCount === 1 ? 'y' : 'ies'} taken
                    </Badge>
                  )}
                </div>

                {biopsyTaken && (
                  <>
                    <div>
                      <Label>Biopsy Site *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select biopsy site" />
                        </SelectTrigger>
                        <SelectContent>
                          {biopsySites.map((site) => (
                            <SelectItem key={site.toLowerCase().replace(/\s+/g, '-')} value={site.toLowerCase().replace(/\s+/g, '-')}>
                              {site}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Biopsy Method *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {biopsyMethods.map((method) => (
                            <SelectItem key={method.toLowerCase().replace(/\s+/g, '-')} value={method.toLowerCase().replace(/\s+/g, '-')}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Hemostasis Method *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {hemostasisMethods.map((method) => (
                            <SelectItem key={method.toLowerCase().replace(/\s+/g, '-')} value={method.toLowerCase().replace(/\s+/g, '-')}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Observations</Label>
                      <Textarea 
                        placeholder="Enter observations"
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    <Button 
                      onClick={handleAddBiopsy}
                      className="w-full bg-pink-600 hover:bg-pink-700"
                    >
                      Record Biopsy
                    </Button>
                  </>
                )}
              </TabsContent>

              {/* Diagnosis Tab */}
              <TabsContent value="diagnosis" className="space-y-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-3">Pattern Recognition</h4>
                  <div className="space-y-3">
                    {patternRecognition.map((pattern) => (
                      <div key={pattern.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{pattern.name}</span>
                          <span className="font-semibold">{pattern.percentage}%</span>
                        </div>
                        <Progress value={pattern.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>HPV Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select HPV status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Severity Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Follow-Up Plan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select follow-up" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="repeat-pap-1yr">Repeat Pap in 1 year</SelectItem>
                      <SelectItem value="colposcopy">Colposcopy</SelectItem>
                      <SelectItem value="biopsy">Biopsy</SelectItem>
                      <SelectItem value="routine-screening">Routine screening</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Additional Notes</Label>
                  <Textarea 
                    placeholder="Enter additional notes"
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 pt-4 border-t">
              <Button 
                onClick={() => navigate("/exam-summary")}
                className="w-full bg-pink-600 hover:bg-pink-700"
              >
                Complete Exam
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cervix Positioning Modal */}
      <Dialog open={showPositioningModal} onOpenChange={setShowPositioningModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600 text-center">
              Please ensure the full cervix is in view
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <p className="text-gray-700 text-center leading-relaxed">
              Before proceeding with the examination, make sure the cervix is clearly visible and centered in the frame. This ensures accurate imaging and proper documentation.
            </p>

            {/* Image placeholder */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="w-full h-48 flex items-center justify-center">
                <div className="text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium">Cervix positioning guide image</p>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">✅ Proper Positioning:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">✓</span>
                    Cervix centered in frame
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">✓</span>
                    Full cervix visible
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">✓</span>
                    Clear focus and lighting
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">❌ Avoid:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">✗</span>
                    Partial cervix view
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">✗</span>
                    Off-center positioning
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">✗</span>
                    Blurry or dark images
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => setShowPositioningModal(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold"
              >
                I Understand
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveExam;
