import { useState, useEffect, useRef } from "react";
import {
  FileText,
  User,
  Shield,
  Play,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  FileImage,
  Clock,
  AlertCircle,
  FileCheck,
  Loader2,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

/* ─────────────────────────────────────────
   RANDOMISATION ENGINE
───────────────────────────────────────── */
const DOC_TEMPLATES = [
  {
    id: 1,
    name: "Payslip_March_2024.pdf",
    meta: "240 KB • INCOME PROOF",
    icon: FileText,
    color: "bg-orange-50 text-orange-600",
    outcomes: [
      { status: "verified", confidence: 97, message: "Employer match confirmed. Income amount consistent with market rate." },
      { status: "verified", confidence: 94, message: "Income verified. Minor formatting anomaly detected — likely benign." },
      { status: "verified", confidence: 91, message: "Payslip authentic. Employer NIF cross-referenced successfully." },
      { status: "warning",  confidence: 71, message: "Salary figure inconsistent with declared employer size. Manual review advised." },
      { status: "warning",  confidence: 63, message: "Possible document tampering — font metrics inconsistent on salary field." },
      { status: "rejected", confidence: 22, message: "Metadata shows file was edited 3 days after stated issue date. High risk." },
    ],
  },
  {
    id: 2,
    name: "ID_Card_Front.jpg",
    meta: "1.2 MB • IDENTITY DOCUMENT",
    icon: FileImage,
    color: "bg-blue-50 text-blue-600",
    outcomes: [
      { status: "verified", confidence: 99, message: "MRZ code valid. Portrait biometrics pass liveness check." },
      { status: "verified", confidence: 93, message: "Identity confirmed. Document expiry within acceptable range." },
      { status: "warning",  confidence: 74, message: "Low resolution scan. Expiry date approaching in 6 weeks." },
      { status: "warning",  confidence: 61, message: "Microprint strip blurred — possible photocopy. Request original." },
      { status: "warning",  confidence: 58, message: "Face crop inconsistency detected. Lighting artifacts around portrait edge." },
      { status: "rejected", confidence: 18, message: "Document security features absent. High probability of forgery." },
    ],
  },
  {
    id: 3,
    name: "Employment_Reference.pdf",
    meta: "180 KB • EMPLOYMENT",
    icon: Briefcase,
    color: "bg-purple-50 text-purple-600",
    outcomes: [
      { status: "verified", confidence: 98, message: "Employment dates confirmed. Digital signature cryptographically valid." },
      { status: "verified", confidence: 95, message: "Employer verified against business registry. Contract terms consistent." },
      { status: "verified", confidence: 88, message: "Reference letter authentic. Employer contact details verified." },
      { status: "warning",  confidence: 69, message: "Signatory not found in company directory. Possible third-party issuer." },
      { status: "warning",  confidence: 55, message: "Employment gap of 4 months unaddressed. Start date discrepancy vs. CV." },
      { status: "rejected", confidence: 11, message: "Company registration number does not exist in national registry. Fraudulent." },
    ],
  },
];

const SCENARIOS = [
  // All clean
  [0, 0, 0], [1, 2, 1], [2, 1, 2], [0, 1, 0],
  // One warning
  [0, 3, 1], [3, 0, 2], [1, 2, 3], [2, 4, 0], [0, 0, 4],
  // Two warnings
  [3, 4, 2], [4, 3, 1], [3, 3, 0], [1, 4, 3],
  // One reject
  [5, 0, 1], [0, 5, 2], [1, 2, 5],
  // One reject + warning
  [5, 3, 1], [4, 5, 0], [3, 1, 5],
  // Heavy fraud
  [5, 5, 2], [4, 5, 5], [5, 4, 5],
];

function generateRun() {
  const scenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
  const documents = DOC_TEMPLATES.map((tmpl, i) => ({
    ...tmpl,
    ...tmpl.outcomes[scenario[i]],
  }));

  // Weighted average (Income 40%, Identity 35%, Employment 25%)
  const weights = [0.40, 0.35, 0.25];
  const weightedAvg = documents.reduce((sum, d, i) => sum + d.confidence * weights[i], 0);
  const flagCount   = documents.filter(d => d.status === "warning").length;
  const rejectCount = documents.filter(d => d.status === "rejected").length;
  const trustScore  = Math.max(5, Math.round(weightedAvg - flagCount * 8 - rejectCount * 22));

  let trustLabel;
  if      (trustScore >= 88) trustLabel = "Excellent";
  else if (trustScore >= 72) trustLabel = "Good";
  else if (trustScore >= 55) trustLabel = "Moderate";
  else if (trustScore >= 35) trustLabel = "Poor";
  else                        trustLabel = "High Risk";

  const v = documents.filter(d => d.status === "verified").length;
  const w = documents.filter(d => d.status === "warning").length;
  const r = documents.filter(d => d.status === "rejected").length;
  const parts = [];
  if (v) parts.push(`${v} verified`);
  if (w) parts.push(`${w} flagged`);
  if (r) parts.push(`${r} rejected`);

  const analysisTime = (4 + Math.floor(Math.random() * 5)).toString();

  return { documents, trustScore, trustLabel, summary: parts.join(" · "), analysisTime };
}

/* ─────────────────────────────────────────
   ANIMATION HELPERS  (native CSS, no framer)
─────────────────────────────────────── */
function AnimatedBar({ width, colorClass, delay = 0, resetKey }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(0);
    const t = setTimeout(() => setW(width), delay + 20);
    return () => clearTimeout(t);
  }, [width, delay, resetKey]);
  return (
    <div className="h-full overflow-hidden rounded-full" style={{ background: "rgba(0,0,0,0.07)" }}>
      <div
        className={`h-full rounded-full ${colorClass}`}
        style={{ width: `${w}%`, transition: "width 1s ease" }}
      />
    </div>
  );
}

function FadeIn({ show, delay = 0, children, resetKey }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [show, delay, resetKey]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────── */
function getStatusCfg(status) {
  return {
    verified: {
      label: "Verified",
      icon: CheckCircle2,
      badgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      barClass: "bg-emerald-500",
    },
    warning: {
      label: "Warning",
      icon: AlertTriangle,
      badgeClass: "bg-amber-50 text-amber-600 border border-amber-100",
      barClass: "bg-amber-500",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      badgeClass: "bg-red-50 text-red-600 border border-red-100",
      barClass: "bg-red-500",
    },
  }[status];
}

const timelineSteps = [
  { label: "Uploaded",  desc: "Documents received",         icon: FileText    },
  { label: "Analyzing", desc: "AI verification in progress", icon: Sparkles   },
  { label: "Review",    desc: "Results under review",        icon: FileCheck  },
  { label: "Completed", desc: "Analysis finalized",          icon: CheckCircle2 },
];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function FraudDetection() {
  const { t } = useLanguage();
  const [status,   setStatus]   = useState("idle");
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [runKey,   setRunKey]   = useState(0);
  const [scenario, setScenario] = useState(null);
  const timerRef = useRef(null);

  const handleRunAnalysis = () => {
    if (status === "running") return;
    clearInterval(timerRef.current);

    const fresh = generateRun();
    setScenario(fresh);
    setStatus("running");
    setProgress(0);
    setActiveStep(1);
    setRunKey(k => k + 1);

    const duration = 5000 + Math.random() * 1200;
    const interval = 50;
    const steps = duration / interval;
    let current = 0;

    timerRef.current = setInterval(() => {
      current++;
      const newProgress = Math.min((current / steps) * 100, 100);
      setProgress(newProgress);

      if      (newProgress < 25) setActiveStep(0);
      else if (newProgress < 60) setActiveStep(1);
      else if (newProgress < 90) setActiveStep(2);
      else                        setActiveStep(3);

      if (newProgress >= 100) {
        setStatus("completed");
        clearInterval(timerRef.current);
      }
    }, interval);
  };

  const getDocStatus = (index) => {
    if (status === "idle")      return "idle";
    if (status === "completed") return "completed";
    const scanStart = index * 30;
    const scanEnd   = (index + 1) * 30;
    if (progress < scanStart) return "pending";
    if (progress < scanEnd)   return "scanning";
    return "completed";
  };

  const documents = scenario ? scenario.documents : DOC_TEMPLATES.map(t => ({ ...t, ...t.outcomes[0] }));

  // Trust score colour
  const ts = scenario ? scenario.trustScore : 0;
  const trustColorClass =
    ts >= 88 ? "text-emerald-600 bg-emerald-50 border-emerald-100" :
    ts >= 72 ? "text-emerald-600 bg-emerald-50 border-emerald-100" :
    ts >= 55 ? "text-amber-600 bg-amber-50 border-amber-100"       :
               "text-red-600 bg-red-50 border-red-100";
  const trustBarClass =
    ts >= 55 ? "bg-emerald-500" : ts >= 35 ? "bg-amber-500" : "bg-red-500";

  const flagCount = documents.filter(d => d.status !== "verified").length;

  return (
    <section id="fraud-detection" className="py-12 md:py-20 px-4 md:px-8 font-sans min-h-screen">

      {/* ── SECTION HEADER ── */}
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border"
          style={{ backgroundColor: "rgba(207,60,126,0.1)", color: "#cf3c7e", borderColor: "rgba(207,60,126,0.2)" }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium uppercase tracking-wide">{t('fraud.badge')}</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 md:mb-6 leading-tight font-bold px-4" style={{ fontFamily: 'Instrument Serif, serif' }}>
            {t('fraud.title1')}
        <br />
            <span className="italic" style={{ color: "#cf3c7e", fontFamily: 'Instrument Serif, serif' }}>{t('fraud.title2')}</span>
        </h2>
        <p className="leading-[1.6] text-[var(--muted-foreground)] text-[14px] sm:text-[16px] md:text-[17px] text-center max-w-[580px] mx-auto">
          {t('fraud.subtitle')}
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">

        {/* ── MAIN DASHBOARD WINDOW ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Window chrome */}
          <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#cf3c7e' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#B8A8FE' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#C9E4FF' }} />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                trust-analysis.luuzon
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-400">
                <path d="M6 1L8 4H4L6 1Z" fill="currentColor"/>
                <rect x="3" y="4" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none"/>
                <line x1="3" y1="6" x2="9" y2="6" stroke="currentColor" strokeWidth="1"/>
              </svg>
              <span className="text-[9px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                Secure
              </span>
            </div>
          </div>

          <div className="p-8 space-y-12 bg-gradient-to-br from-white via-gray-50/30 to-purple-50/20">

            {/* ── ACTION BAR ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="text-[9px] uppercase tracking-widest mb-2 text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                  Document Analysis
                </div>
                <h2 className="text-4xl text-gray-900" style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>
                  Verification Pipeline
                </h2>
              </div>
              <button
                onClick={handleRunAnalysis}
                disabled={status === "running"}
                className="px-6 py-2.5 rounded-full text-white text-[10px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md cursor-pointer"
                style={{ 
                  fontFamily: 'DM Mono, monospace',
                  background: status === "running" ? '#9ca3af' : '#cf3c7e'
                }}
              >
                {status === "running" ? t("fraud.analyzing") : status === "completed" ? t("fraud.runButton") : t("fraud.runButton")}
              </button>
            </div>

            {/* ── APPLICANT CARD ── */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-5 shadow-sm">
              <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="text-gray-700">
                  <rect x="0" y="0" width="24" height="32" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <line x1="4" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1"/>
                  <line x1="4" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="1"/>
                  <line x1="4" y1="26" x2="14" y2="26" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest mb-1 text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                  Applicant
                </div>
                <h3 className="text-lg text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
                  Jean-Pierre Martin
                </h3>
                <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'DM Mono, monospace' }}>
                  10 rue d'Arsonval, Paris
                </p>
              </div>
            </div>

            {/* ── TWO-COL GRID ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* LEFT (2/3) */}
              <div className="lg:col-span-2 space-y-8">

                {/* Progress card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex justify-between items-baseline mb-3">
                    <div className="text-[9px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                      {t('fraud.progress')}
                    </div>
                    <span className="text-3xl text-gray-900" style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>
                      {Math.round(progress)}
                    </span>
                  </div>
                  
                  {/* Minimalist horizontal bar */}
                  <div className="mb-4">
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-[8px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {[t('fraud.upload'), t('fraud.analyze'), t('fraud.review'), t('fraud.done')].map((label, i) => (
                      <span
                        key={label}
                        style={{
                          color: activeStep >= i ? '#000000' : '#9ca3af',
                          fontWeight: activeStep >= i ? '600' : '400',
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Documents card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="text-[9px] uppercase tracking-widest mb-6 text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {t('fraud.uploadedDocuments')}
                  </div>
                  <div className="space-y-3">
                    {documents.map((doc, idx) => {
                      const docStatus = getDocStatus(idx);
                      const cfg = getStatusCfg(doc.status);

                      // Custom SVG icons based on document type
                      let IconSVG;
                      let iconGradient;
                      if (doc.id === 1) {
                        iconGradient = 'from-orange-500 to-orange-400';
                        // Receipt icon for income
                        IconSVG = (
                          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="text-orange-600">
                            <rect x="0" y="0" width="20" height="22" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <path d="M0 22L2 24L4 22L6 24L8 22L10 24L12 22L14 24L16 22L18 24L20 22V0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <line x1="4" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1"/>
                            <line x1="4" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1"/>
                            <line x1="4" y1="13" x2="12" y2="13" stroke="currentColor" strokeWidth="1"/>
                            <line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        );
                      } else if (doc.id === 2) {
                        iconGradient = 'from-blue-500 to-blue-400';
                        // Passport icon for identity
                        IconSVG = (
                          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="text-blue-600">
                            <rect x="0" y="0" width="20" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <circle cx="10" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <line x1="4" y1="17" x2="16" y2="17" stroke="currentColor" strokeWidth="1"/>
                            <line x1="4" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="1"/>
                          </svg>
                        );
                      } else {
                        iconGradient = 'from-purple-500 to-purple-400';
                        // Briefcase icon for employment
                        IconSVG = (
                          <svg width="24" height="20" viewBox="0 0 24 20" fill="none" className="text-purple-600">
                            <rect x="0" y="5" width="24" height="15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <rect x="7" y="0" width="10" height="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <circle cx="12" cy="12" r="2" fill="currentColor"/>
                          </svg>
                        );
                      }

                      return (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 rounded-lg border transition-all"
                          style={{
                            borderColor: docStatus === "scanning" ? '#cf3c7e' : '#f3f4f6',
                            backgroundColor: docStatus === "scanning" ? 'rgba(207,60,126,0.03)' : 'white',
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center bg-gradient-to-br ${
                              docStatus === "completed" || docStatus === "scanning"
                                ? iconGradient
                                : 'from-gray-50 to-gray-100'
                            }`}>
                              {docStatus === "scanning" ? (
                                <Loader2 className="w-5 h-5 animate-spin text-white" />
                              ) : (
                                <div className={docStatus === "completed" ? "text-white" : "text-gray-400"}>
                                  {IconSVG}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm text-gray-900 break-all" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
                                {doc.name}
                              </p>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5" style={{ fontFamily: 'DM Mono, monospace' }}>
                                {doc.meta}
                              </p>
                            </div>
                          </div>

                          <div className="min-w-[60px] flex justify-end">
                            {docStatus === "completed" ? (
                              <FadeIn show={true} delay={idx * 80} resetKey={runKey}>
                                <span 
                                  className="text-[9px] uppercase tracking-widest font-semibold"
                                  style={{ 
                                    fontFamily: 'DM Mono, monospace',
                                    color: doc.status === "verified" ? '#10b981' : doc.status === "warning" ? '#f59e0b' : '#ef4444'
                                  }}
                                >
                                  {doc.status === "verified" ? "OK" : doc.status === "warning" ? "Flag" : "Reject"}
                                </span>
                              </FadeIn>
                            ) : docStatus === "scanning" ? (
                              <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ fontFamily: 'DM Mono, monospace', color: '#cf3c7e' }}>
                                Scan
                              </span>
                            ) : (
                              <span className="text-[9px] uppercase tracking-widest text-gray-300" style={{ fontFamily: 'DM Mono, monospace' }}>
                                —
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RIGHT — Timeline */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-[9px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {t('fraud.timeline')}
                  </div>
                  {status === "completed" && (
                    <FadeIn show={true} resetKey={runKey}>
                      <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ fontFamily: 'DM Mono, monospace', color: '#000000' }}>
                        {t('fraud.done')}
                      </span>
                    </FadeIn>
                  )}
                </div>

                <div className="relative flex-grow">
                  {/* Vertical line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />
                  
                  <div className="space-y-8">
                    {[
                      { label: t('fraud.uploaded'), desc: t('fraud.documentsReceived') },
                      { label: t('fraud.analyzing2'), desc: t('fraud.aiVerificationInProgress') },
                      { label: t('fraud.review2'), desc: t('fraud.resultsUnderReview') },
                      { label: t('fraud.completed'), desc: t('fraud.analysisFinalized') }
                    ].map((step, idx) => {
                      const isActive = activeStep >= idx;
                      return (
                        <div key={idx} className="flex gap-4 relative">
                          {/* Dot node */}
                          <div
                            className="relative z-10 w-4 h-4 rounded-full border-2 transition-all"
                            style={{
                              background: isActive ? '#000000' : '#ffffff',
                              borderColor: isActive ? '#000000' : '#e5e7eb',
                            }}
                          />
                          <div className="pt-0">
                            <p
                              className="text-[9px] uppercase tracking-widest mb-1 font-semibold"
                              style={{ 
                                fontFamily: 'DM Mono, monospace',
                                color: isActive ? '#000000' : '#9ca3af',
                              }}
                            >
                              {step.label}
                            </p>
                            <p className="text-xs text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* ── RESULTS ── */}
            {status === "completed" && scenario && (
              <FadeIn show={true} delay={100} resetKey={runKey}>
                <div className="space-y-6 pt-4">

                  {/* Trust score row */}
                  <div className="flex items-baseline justify-between">
                    <div className="text-[9px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                      Analysis Results
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                        Trust Score
                      </span>
                      <span 
                        className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-500 bg-clip-text text-transparent" 
                        style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}
                      >
                        {scenario.trustScore}
                      </span>
                    </div>
                  </div>

                  {/* Master bar */}
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${scenario.trustScore}%`,
                        background: 'linear-gradient(90deg, #cf3c7e 0%, #B8A8FE 100%)'
                      }}
                    />
                  </div>

                  {/* Summary line */}
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {scenario.summary}
                  </p>

                  {/* Doc detail cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {documents.map((doc, idx) => {
                      const cfg = getStatusCfg(doc.status);
                      
                      // Status icon
                      const StatusIcon = doc.status === "verified" ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-emerald-500">
                          <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                      ) : doc.status === "warning" ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-amber-500">
                          <path d="M6 0L11 12L1 12Z" fill="currentColor"/>
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-red-500">
                          <path d="M6 0L11 12L1 12Z" fill="currentColor"/>
                        </svg>
                      );

                      return (
                        <FadeIn key={`${doc.id}-${runKey}`} show={true} delay={300 + idx * 100} resetKey={runKey}>
                          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-[9px] uppercase tracking-widest mb-3 text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                              {doc.id === 1 ? "Income" : doc.id === 2 ? "Identity" : "Employment"}
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                              {StatusIcon}
                              <span 
                                className="text-[9px] uppercase tracking-widest font-semibold" 
                                style={{ 
                                  fontFamily: 'DM Mono, monospace',
                                  color: doc.status === "verified" ? '#10b981' : doc.status === "warning" ? '#f59e0b' : '#ef4444'
                                }}
                              >
                                {doc.status === "verified" ? "OK" : doc.status === "warning" ? "Flag" : "Reject"}
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between items-baseline ml-[0px] mr-[10px] mt-[0px] mb-[12px]">
                                <span className="text-[8px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                                  Confidence
                                </span>
                                <span 
                                  className="text-2xl bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mx-[10px] my-[0px]" 
                                  style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}
                                >
                                  {doc.confidence}
                                </span>
                              </div>
                              
                              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{ 
                                    width: `${doc.confidence}%`,
                                    background: doc.status === "verified" 
                                      ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                                      : doc.status === "warning"
                                      ? 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
                                      : 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
                                    transitionDelay: `${400 + idx * 100}ms`,
                                  }}
                                />
                              </div>
                              
                              <p className="text-[10px] text-gray-600 leading-relaxed pt-2 border-t border-gray-100" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                                {doc.message}
                              </p>
                            </div>
                          </div>
                        </FadeIn>
                      );
                    })}
                  </div>

                </div>
              </FadeIn>
            )}

          </div>
        </div>

        {/* ── FOOTER STATS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="text-[9px] uppercase tracking-widest mb-2 text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
              {t('fraud.documentsAnalyzed')}
            </div>
            <p className="text-4xl text-black" style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>
              3
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="text-[9px] uppercase tracking-widest mb-2 text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
              {t('fraud.analysisTime')}
            </div>
            <p className="text-4xl text-black" style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>
              {scenario ? scenario.analysisTime : "—"}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="text-[9px] uppercase tracking-widest mb-2 text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
              {t('fraud.warningsFound')}
            </div>
            <p className="text-4xl text-black" style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>
              {scenario ? flagCount : "—"}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}