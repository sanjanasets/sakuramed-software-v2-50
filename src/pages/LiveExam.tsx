
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
import { useNavigate } from "react-router-dom";
import { Settings, Camera, Square, Circle } from "lucide-react";

const LiveExam = () => {
  const navigate = useNavigate();
  const [showCameraSettings, setShowCameraSettings] = useState(false);
  const [biopsyTaken, setBiopsyTaken] = useState(false);
  const [cameraMode, setCameraMode] = useState("standard");
  const [zoom, setZoom] = useState([1]);
  const [focus, setFocus] = useState([50]);
  const [lightIntensity, setLightIntensity] = useState([75]);
  const [colorSaturation, setColorSaturation] = useState([50]);
  const [opacity, setOpacity] = useState([50]);
  const [annotationType, setAnnotationType] = useState("cervical-polyp");
  const [selectedTool, setSelectedTool] = useState("circle");

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
    { value: "acetic-response", label: "Acetic Response Tracking View" },
    { value: "iodine", label: "Iodine View" },
    { value: "heatmap", label: "Heatmap View" }
  ];

  const patternRecognition = [
    { name: "Acetowhite", percentage: 85 },
    { name: "Mosaicism", percentage: 62 },
    { name: "Punctation", percentage: 43 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Camera View Area */}
      <div className="flex-1 p-4">
        <div className="relative bg-black rounded-lg h-full min-h-[600px] flex items-center justify-center">
          {/* Live Video Feed Placeholder */}
          <div className="text-white text-center">
            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg opacity-50">Live Camera Feed</p>
            <p className="text-sm opacity-30 mt-2">Camera Mode: {cameraModes.find(m => m.value === cameraMode)?.label}</p>
          </div>

          {/* Camera Settings Button */}
          <Button
            onClick={() => setShowCameraSettings(!showCameraSettings)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
            size="icon"
          >
            <Settings className="w-4 h-4" />
          </Button>

          {/* Camera Settings Panel */}
          {showCameraSettings && (
            <Card className="absolute top-16 right-4 w-80 bg-white/95 backdrop-blur">
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
                    min={1}
                    max={10}
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
                    max={100}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Color Saturation: {colorSaturation[0]}%</Label>
                  <Slider
                    value={colorSaturation}
                    onValueChange={setColorSaturation}
                    min={0}
                    max={100}
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
                <Input placeholder="Enter annotation label" className="mt-2" />
              </div>

              <Button className="w-full bg-pink-600 hover:bg-pink-700">
                Add Annotation
              </Button>

              <div className="border-t pt-4 mt-6">
                <h4 className="font-semibold mb-2">Recent Annotations</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Cervical Polyp - 14:32 - Dr. Smith</p>
                  <p>Acetowhite Area - 14:28 - Dr. Smith</p>
                </div>
              </div>
            </TabsContent>

            {/* Biopsy Tab */}
            <TabsContent value="biopsy" className="space-y-4 mt-6">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={biopsyTaken}
                  onCheckedChange={setBiopsyTaken}
                />
                <Label>Was a biopsy taken?</Label>
              </div>

              <div>
                <Label>Biopsy Site</Label>
                <Input 
                  placeholder="Enter biopsy site" 
                  disabled={!biopsyTaken}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Biopsy Method</Label>
                <Select disabled={!biopsyTaken}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="punch">Punch Biopsy</SelectItem>
                    <SelectItem value="cone">Cone Biopsy</SelectItem>
                    <SelectItem value="loop">Loop Electrosurgical Excision</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Hemostasis Method</Label>
                <Select disabled={!biopsyTaken}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pressure">Direct Pressure</SelectItem>
                    <SelectItem value="cautery">Electrocautery</SelectItem>
                    <SelectItem value="silver-nitrate">Silver Nitrate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                        <span>{pattern.percentage}%</span>
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
                    <SelectItem value="pending">Pending</SelectItem>
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
                    <SelectItem value="severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Follow-Up Plan</Label>
                <Textarea 
                  placeholder="Enter follow-up recommendations"
                  className="mt-2"
                  rows={4}
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
  );
};

export default LiveExam;
