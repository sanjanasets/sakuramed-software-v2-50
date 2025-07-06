
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PatientSelection from "./pages/PatientSelection";
import PatientInfoEntry from "./pages/PatientInfoEntry";
import MedicalHistory from "./pages/MedicalHistory";
import PatientOverview from "./pages/PatientOverview";
import CervixPositioning from "./pages/CervixPositioning";
import LiveExam from "./pages/LiveExam";
import ExamSummary from "./pages/ExamSummary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/patient-selection" element={<PatientSelection />} />
          <Route path="/patient-info-entry" element={<PatientInfoEntry />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/patient-overview" element={<PatientOverview />} />
          <Route path="/cervix-positioning" element={<CervixPositioning />} />
          <Route path="/live-exam" element={<LiveExam />} />
          <Route path="/exam-summary" element={<ExamSummary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
