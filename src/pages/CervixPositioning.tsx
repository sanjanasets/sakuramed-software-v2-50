
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CervixPositioning = () => {
  const navigate = useNavigate();

  const handleUnderstand = () => {
    navigate("/live-exam");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Please ensure the full cervix is in view
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Before proceeding with the examination, make sure the cervix is clearly visible and centered in the frame. This ensures accurate imaging and proper documentation.
          </p>
        </div>

        {/* Positioning Guide Card */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Cervix Positioning Guide
            </h2>
            
            {/* Image placeholder */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
              <div className="w-full h-64 flex items-center justify-center">
                <div className="text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📷</span>
                  </div>
                  <p className="text-sm">Cervix positioning guide image</p>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Proper Positioning:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Cervix centered in frame
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Full cervix visible
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Clear focus and lighting
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Minimal reflection
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Avoid:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Partial cervix view
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Off-center positioning
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Blurry or dark images
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Excessive glare
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          <Button 
            onClick={handleUnderstand}
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg"
          >
            I Understand
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CervixPositioning;
