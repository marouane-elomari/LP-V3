import React, { useState, useEffect } from "react";
import { 
  FileText, 
  User, 
  Shield, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Briefcase, 
  Image as ImageIcon, 
  Clock, 
  AlertCircle, 
  FileCheck,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
type AnalysisStatus = "idle" | "running" | "completed";

const documents = [
  { 
    id: 1,
    name: "Payslip_March_2024.pdf", 
    meta: "240 KB • INCOME PROOF", 
    icon: FileText, 
    color: "bg-orange-50 text-orange-600",
    status: "verified",
    confidence: 98,
    message: "Income amount verified. Employer match confirmed."
  },
  { 
    id: 2,
    name: "ID_Card_Front.jpg", 
    meta: "1.2 MB • IDENTITY DOCUMENT", 
    icon: ImageIcon, 
    color: "bg-blue-50 text-blue-600",
    status: "warning",
    confidence: 85,
    message: "Document quality is low. Expiration date approaching."
  },
  { 
    id: 3,
    name: "Employment_Reference.pdf", 
    meta: "180 KB • EMPLOYMENT", 
    icon: Briefcase, 
    color: "bg-purple-50 text-purple-600",
    status: "verified",
    confidence: 96,
    message: "Employer verified. Employment dates confirmed."
  },
];

const timelineSteps = [
  { label: "Uploaded", desc: "Documents received", icon: FileText },
  { label: "Analyzing", desc: "AI verification in progress", icon: SparklesIcon },
  { label: "Review", desc: "Results under review", icon: FileCheck },
  { label: "Completed", desc: "Analysis finalized", icon: CheckCircle2 },
];

function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

export const FraudDetection = () => {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const handleRunAnalysis = () => {
    if (status === "running") return;
    setStatus("running");
    setProgress(0);
    setActiveStep(1);

    // Simulation sequence
    const duration = 5000; // 5 seconds for full effect
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      // Update timeline steps based on progress
      if (newProgress < 25) setActiveStep(0);
      else if (newProgress < 60) setActiveStep(1);
      else if (newProgress < 90) setActiveStep(2);
      else setActiveStep(3);

      if (newProgress >= 100) {
        setStatus("completed");
        clearInterval(timer);
      }
    }, interval);
  };

  const getDocStatus = (index: number) => {
    if (status === "idle") return "idle";
    if (status === "completed") return "completed";
    
    // Distribute scanning across the progress (0-90%)
    const scanStart = index * 30;
    const scanEnd = (index + 1) * 30;
    
    if (progress < scanStart) return "pending";
    if (progress >= scanStart && progress < scanEnd) return "scanning";
    return "completed";
  };

  return (
    <section className="py-20 px-4 md:px-8 font-sans">
      <div className="max-w-[1200px] mx-auto space-y-8">
        
        {/* Main Dashboard Window */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Window Chrome */}
          <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Luuzon Trust Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
              <Shield className="w-3.5 h-3.5" />
              Secure Environment
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Document Verification</h2>
                <p className="text-gray-500 mt-1">Verify and analyze uploaded documents</p>
              </div>
              <button
                onClick={handleRunAnalysis}
                disabled={status === "running"}
                className="flex items-center gap-2 bg-[#FE9170] hover:bg-[#ff835e] text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {status === "running" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === "completed" ? (
                  <Play className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                )}
                {status === "running" ? "Analyzing..." : status === "completed" ? "Run Again" : "Run Analysis"}
              </button>
            </div>

            {/* User Profile Card */}
            <div className="bg-gray-50 rounded-xl p-6 flex items-center gap-5 border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Jean-Pierre Martin</h3>
                <p className="text-gray-500 text-sm">Application for: 42 Rue de la Paix, Paris</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column (2/3 width) */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Progress Card */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Progress</h3>
                    <span className="font-bold text-gray-900">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      className="h-full bg-[#FE9170]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] uppercase font-medium text-gray-400 tracking-wider">
                    <span className={activeStep >= 0 ? "text-[#FE9170] font-bold" : ""}>Uploaded</span>
                    <span className={activeStep >= 1 ? "text-[#FE9170] font-bold" : ""}>Analyzing</span>
                    <span className={activeStep >= 2 ? "text-[#FE9170] font-bold" : ""}>Review</span>
                    <span className={activeStep >= 3 ? "text-[#FE9170] font-bold" : ""}>Completed</span>
                  </div>
                </div>

                {/* Uploaded Documents Card */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-6">Uploaded Documents</h3>
                  <div className="space-y-4">
                    {documents.map((doc, idx) => {
                      const docStatus = getDocStatus(idx);
                      
                      return (
                        <div key={doc.id} className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                          docStatus === "scanning" 
                            ? "border-[#FE9170] bg-orange-50/10 shadow-sm scale-[1.01]" 
                            : "border-gray-100 hover:border-gray-200"
                        }`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                              docStatus === "completed" || docStatus === "scanning" ? doc.color : "bg-gray-100 text-gray-400"
                            }`}>
                              {docStatus === "scanning" ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <doc.icon className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{doc.name}</p>
                              <p className="text-xs text-gray-400 font-medium uppercase mt-0.5">{doc.meta}</p>
                            </div>
                          </div>
                          
                          <div className="min-w-[100px] flex justify-end">
                            {docStatus === "completed" ? (
                              doc.status === "verified" ? (
                                <motion.div 
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Verified
                                </motion.div>
                              ) : (
                                <motion.div 
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-xs font-bold"
                                >
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  Warning
                                </motion.div>
                              )
                            ) : docStatus === "scanning" ? (
                              <span className="text-xs font-bold text-[#FE9170] animate-pulse">Scanning...</span>
                            ) : (
                              <span className="text-xs font-medium text-gray-300">Pending</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column (1/3 width) - Timeline */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-gray-900">Timeline</h3>
                  {status === "completed" && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100"
                    >
                      Completed
                    </motion.span>
                  )}
                </div>

                <div className="relative pl-4 flex-grow">
                  {/* Vertical Line */}
                  <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-100" />
                  
                  <div className="space-y-8">
                    {timelineSteps.map((step, idx) => {
                      const isActive = activeStep >= idx;
                      
                      return (
                        <div key={idx} className="flex gap-4 relative">
                          <motion.div 
                            animate={{ 
                              backgroundColor: isActive ? "#FE9170" : "#ffffff",
                              borderColor: isActive ? "#FE9170" : "#e5e7eb",
                              color: isActive ? "#ffffff" : "#d1d5db",
                            }}
                            className={`
                              relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 shadow-sm
                            `}
                          >
                            <step.icon className="w-5 h-5" />
                          </motion.div>
                          <div className="pt-1">
                            <p className={`font-bold text-sm transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                              {step.label}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* Analysis Results Section (Only shows when completed) */}
            <AnimatePresence>
              {status === "completed" && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 pt-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Analysis Results</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">Trust Score</span>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 font-bold rounded-full border border-emerald-100 text-sm">93%</span>
                    </div>
                  </div>
                  
                  {/* Main Score Bar */}
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: "93%" }}
                      transition={{ delay: 0.2, duration: 1 }}
                    />
                  </div>

                  {/* Detailed Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {documents.map((doc, idx) => (
                      <motion.div 
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (idx * 0.1) }}
                        className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${doc.color.replace('text-', 'text-opacity-80 text-')}`}>
                            <doc.icon className="w-4 h-4" />
                          </div>
                          <p className="text-sm font-bold text-gray-900 truncate flex-1">{doc.name}</p>
                        </div>
                        
                        <div className="mb-4">
                           {doc.status === "verified" ? (
                             <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                               <CheckCircle2 className="w-3 h-3" /> Verified
                             </span>
                           ) : (
                             <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-amber-600 bg-amber-50 px-2 py-1 rounded">
                               <AlertTriangle className="w-3 h-3" /> Warning
                             </span>
                           )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400 font-medium">Confidence</span>
                            <span className="font-bold text-gray-900">{doc.confidence}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${doc.confidence > 90 ? "bg-emerald-500" : "bg-amber-500"}`} 
                              style={{ width: `${doc.confidence}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-3 leading-relaxed border-t border-gray-50 pt-3">
                            {doc.message}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Footer Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#FE9170]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3 <span className="text-sm font-normal text-gray-500">files</span></p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Documents Analyzed</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4 shadow-sm">
             <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">6 <span className="text-sm font-normal text-gray-500">sec</span></p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Analysis Time</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4 shadow-sm">
             <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1 <span className="text-sm font-normal text-gray-500">issues</span></p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Warnings Found</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
