
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { username: "", password: "", general: "" };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Required field";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Required field";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      setErrors({ username: "", password: "Invalid username or password", general: "" });
    }, 1000);
  };

  const handleMyChartLogin = () => {
    navigate("/patient-selection");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo Area */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/99bc8677-5d79-4940-949a-0399f0c4d4be.png" 
            alt="SakuraMed Logo" 
            className="h-16 mx-auto mb-3"
          />
          <p className="text-[#4A4A4A]/60 text-sm">Creating comfort and accessibility in gynecology</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-2xl font-bold text-[#4A4A4A]">Welcome back</CardTitle>
            <CardDescription className="text-[#4A4A4A]/70 text-base">
              Sign in to your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-[#4A4A4A]">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors({ ...errors, username: "" });
                  }}
                  className={`h-12 text-base rounded-lg border-2 transition-colors ${
                    errors.username 
                      ? "border-[#D11948] focus:border-[#D11948]" 
                      : "border-[#E0E0E0] focus:border-[#DE6886]"
                  }`}
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-[#D11948] text-xs font-medium">{errors.username}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium text-[#4A4A4A]">
                    Password
                  </Label>
                  <button
                    type="button"
                    className="text-[#D11948] hover:text-[#DE6886] text-sm font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: "" });
                    }}
                    className={`h-12 text-base rounded-lg border-2 pr-12 transition-colors ${
                      errors.password 
                        ? "border-[#D11948] focus:border-[#D11948]" 
                        : "border-[#E0E0E0] focus:border-[#DE6886]"
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]/60 hover:text-[#4A4A4A] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[#D11948] text-xs font-medium">{errors.password}</p>
                )}
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#D11948] hover:bg-[#DE6886] text-white font-semibold text-base rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <Separator className="bg-[#E0E0E0]" />
              <div className="absolute inset-0 flex justify-center">
                <span className="bg-white px-4 text-[#4A4A4A]/60 text-sm font-medium">OR</span>
              </div>
            </div>

            {/* MyChart Login */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleMyChartLogin}
                className="w-full h-12 bg-[#DEEAFF] hover:bg-[#DDDDFF] border-[#DEEAFF] hover:border-[#DDDDFF] text-[#4A4A4A] font-semibold text-base rounded-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  Sign in with MyChart
                </div>
              </Button>
              
              <p className="text-center text-[#4A4A4A]/60 text-xs">
                Secure patient login powered by MyChart
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-[#4A4A4A]/50 text-xs">
          <p>© 2024 SakuraMed. Secure clinical platform for women's health.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
