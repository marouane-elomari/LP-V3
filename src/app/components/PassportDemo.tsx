import React, { useState, useEffect } from "react";
import {
  Shield,
  CheckCircle2,
  User,
  Play,
  Lock,
  Star,
  BadgeCheck,
  Eye,
  EyeOff,
  Link2,
  Copy,
  Globe,
  ShieldCheck,
  Fingerprint,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type DemoStep =
  | "idle"
  | "generating"
  | "sharing"
  | "viewing"
  | "complete";

interface PassportField {
  label: string;
  value: string;
  isPublic: boolean;
  verified: boolean;
}

export const PassportDemo = () => {
  const [demoStep, setDemoStep] = useState<DemoStep>("idle");
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [viewerMode, setViewerMode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const publicPassportUrl =
    "luuzon.app/passport/m-dubois-8f3k2x";

  const passportFields: PassportField[] = [
    {
      label: "Identity Status",
      value: "Verified ✓",
      isPublic: true,
      verified: true,
    },
    {
      label: "Full Name",
      value: "M●●●●● D●●●●●",
      isPublic: false,
      verified: true,
    },
    {
      label: "Income Bracket",
      value: "€3,000 - €4,000/month",
      isPublic: true,
      verified: true,
    },
    {
      label: "Exact Salary",
      value: "€●,●●●.●●",
      isPublic: false,
      verified: true,
    },
    {
      label: "Employment Status",
      value: "CDI (Permanent)",
      isPublic: true,
      verified: true,
    },
    {
      label: "Employer Name",
      value: "T●●● C●●●●●●",
      isPublic: false,
      verified: true,
    },
    {
      label: "Rental History",
      value: "3+ years, No Issues",
      isPublic: true,
      verified: true,
    },
    {
      label: "Previous Addresses",
      value: "●●● hidden",
      isPublic: false,
      verified: true,
    },
    {
      label: "Trust Score",
      value: "98/100",
      isPublic: true,
      verified: true,
    },
    {
      label: "AI Fraud Check",
      value: "Passed ✓",
      isPublic: true,
      verified: true,
    },
  ];

  const startDemo = () => {
    setDemoStep("generating");
    setLinkGenerated(false);
    setViewerMode(false);
    setCopiedLink(false);
  };

  useEffect(() => {
    if (demoStep !== "generating") return;
    const timer = setTimeout(() => {
      setLinkGenerated(true);
      setDemoStep("sharing");
    }, 1500);
    return () => clearTimeout(timer);
  }, [demoStep]);

  const simulateCopy = () => {
    setCopiedLink(true);
    setTimeout(() => {
      setDemoStep("viewing");
      setViewerMode(true);
    }, 800);
  };

  useEffect(() => {
    if (demoStep !== "viewing") return;
    const timer = setTimeout(() => {
      setDemoStep("complete");
    }, 2000);
    return () => clearTimeout(timer);
  }, [demoStep]);

  return (
    <section className="py-24 lg:py-32 bg-transparent border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 mb-6 border border-slate-200">
              <Fingerprint className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest font-sans">
                Live Interactive Demo
              </span>
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl text-[var(--foreground)] mb-6 leading-tight">
              Shareable.{" "}
              <span className="italic text-slate-500">
                Encrypted.
              </span>{" "}
              <br />
              Privacy-First.
            </h2>
            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-xl mx-auto font-sans">
              Generate a secure public link that agencies can
              view <strong>without an account</strong>. Only
              verified status is shown —{" "}
              <strong>never your sensitive data</strong>.
            </p>
          </motion.div>
        </div>

        {/* Demo Interface - Clean B2B Style */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl border border-[var(--border)] bg-white shadow-lg shadow-slate-100 overflow-hidden font-sans">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                </div>
                <span className="text-sm font-medium text-[var(--muted-foreground)]">
                  {viewerMode
                    ? "Agency View (No Login Required)"
                    : "Your Private Passport Dashboard"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                End-to-End Encrypted
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
              {/* Left Panel - Your Full Passport */}
              <div className="p-6 lg:p-8 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[var(--foreground)] font-sans">
                    {viewerMode
                      ? "Public Passport View"
                      : "Your Full Passport"}
                  </h3>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                      viewerMode
                        ? "bg-slate-100 text-slate-600 border-slate-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-100"
                    }`}
                  >
                    {viewerMode ? (
                      <>
                        <Globe className="w-3 h-3" />
                        Public
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        Private
                      </>
                    )}
                  </div>
                </div>

                {/* Tenant Header */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-[var(--border)] mb-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <User className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[var(--foreground)] text-lg">
                      {viewerMode
                        ? "M. D●●●●●"
                        : "Marie Dubois"}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide mt-1">
                      Verified since March 2024
                    </div>
                  </div>
                </div>

                {/* Passport Fields */}
                <div className="space-y-2">
                  {passportFields.map((field) => (
                    <div
                      key={field.label}
                      className={`flex items-center gap-3 p-3 rounded-md border transition-all ${
                        viewerMode && !field.isPublic
                          ? "bg-slate-50 border-transparent opacity-40"
                          : "bg-white border-[var(--border)] hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center ${
                          field.isPublic
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {field.isPublic ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest mb-0.5">
                          {field.label}
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            viewerMode && !field.isPublic
                              ? "text-slate-400"
                              : "text-[var(--foreground)]"
                          }`}
                        >
                          {viewerMode && !field.isPublic
                            ? "Hidden"
                            : field.value}
                        </div>
                      </div>
                      {field.verified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel - Link Generation & Sharing */}
              <div className="p-6 lg:p-8 bg-slate-50">
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-6 font-sans">
                  {viewerMode
                    ? "What Agencies See"
                    : "Share Your Passport"}
                </h3>

                {!viewerMode ? (
                  <>
                    {/* Security Explanation */}
                    <div className="p-4 rounded-lg bg-white border border-[var(--border)] mb-6 shadow-sm">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-[var(--foreground)] text-sm">
                            Privacy Protected
                          </div>
                          <div className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">
                            Your public link only shows{" "}
                            <strong className="text-slate-700">
                              verified status
                            </strong>
                            , never actual documents or
                            sensitive data.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What's Shared */}
                    <div className="space-y-4 mb-8">
                      <div>
                        <div className="text-xs font-bold text-[var(--foreground)] flex items-center gap-2 mb-2">
                          <Eye className="w-3 h-3 text-emerald-600" />
                          PUBLICLY VISIBLE
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Identity ✓",
                            "Income Range",
                            "Employment Type",
                            "Rental History",
                            "Trust Score",
                            "Fraud Check ✓",
                          ].map((item) => (
                            <span
                              key={item}
                              className="px-2 py-1 rounded bg-white text-[var(--foreground)] text-[10px] font-medium border border-[var(--border)]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-400 flex items-center gap-2 mb-2">
                          <EyeOff className="w-3 h-3" />
                          ALWAYS HIDDEN
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Full Name",
                            "Exact Salary",
                            "Employer",
                            "Addresses",
                            "Documents",
                          ].map((item) => (
                            <span
                              key={item}
                              className="px-2 py-1 rounded bg-slate-200 text-slate-500 text-[10px] font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Link Generation UI */}
                    {demoStep === "idle" && (
                      <button
                        onClick={startDemo}
                        className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-3 rounded-md text-sm font-medium hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
                      >
                        <Link2 className="w-4 h-4" />
                        Generate Shareable Link
                      </button>
                    )}

                    {demoStep === "generating" && (
                      <div className="p-4 rounded-lg bg-white border border-[var(--border)] animate-pulse">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm font-medium text-[var(--foreground)]">
                            Generating encrypted link...
                          </span>
                        </div>
                      </div>
                    )}

                    {(demoStep === "sharing" ||
                      demoStep === "viewing" ||
                      demoStep === "complete") &&
                      !viewerMode && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                          <div className="p-3 rounded-lg bg-white border border-[var(--border)] shadow-sm">
                            <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest mb-2 font-bold">
                              Your Passport Link
                            </div>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 text-sm text-[var(--foreground)] bg-slate-50 px-3 py-2 rounded border border-[var(--border)] font-mono">
                                {publicPassportUrl}
                              </code>
                              <button
                                onClick={simulateCopy}
                                disabled={copiedLink}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-bold transition-colors ${
                                  copiedLink
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-[var(--primary)] text-white hover:bg-slate-800"
                                }`}
                              >
                                {copiedLink ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    Copy
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="text-xs text-slate-400 text-center">
                            Anyone with this link can view your
                            verified status — no account needed
                          </div>
                        </div>
                      )}
                  </>
                ) : (
                  /* Agency View Summary */
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                      <div className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-emerald-800 text-sm">
                            Tenant Verified
                          </div>
                          <div className="text-xs text-emerald-700/80 mt-1 leading-relaxed">
                            This passport has been
                            cryptographically verified by Luuzon
                            AI.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white border border-[var(--border)] shadow-sm">
                      <div className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest mb-4">
                        Quick Summary
                      </div>
                      <div className="space-y-3">
                        {[
                          {
                            label: "Income",
                            value: "€3,000 - €4,000/mo",
                          },
                          {
                            label: "Employment",
                            value: "CDI (Permanent)",
                          },
                          {
                            label: "History",
                            value: "3+ years, No Issues",
                          },
                          {
                            label: "Trust Score",
                            value: "98/100",
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex justify-between text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0"
                          >
                            <span className="text-[var(--muted-foreground)]">
                              {item.label}
                            </span>
                            <span className="font-bold text-[var(--foreground)]">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-50 border border-[var(--border)]">
                      <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-[var(--foreground)] text-sm">
                            Full Details Available
                          </div>
                          <div className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">
                            Request full access through Luuzon
                            to see complete documents with
                            tenant consent.
                          </div>
                        </div>
                      </div>
                    </div>

                    {demoStep === "complete" && (
                      <button
                        onClick={startDemo}
                        className="w-full flex items-center justify-center gap-2 border border-[var(--border)] bg-white text-slate-600 py-3 rounded-md text-sm font-medium hover:border-slate-400 hover:text-slate-800 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        Restart Demo
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {[
              {
                icon: Globe,
                label: "No Account Required",
                desc: "Agencies view instantly",
              },
              {
                icon: Lock,
                label: "Zero Sensitive Data",
                desc: "Only verification status",
              },
              {
                icon: ShieldCheck,
                label: "Cryptographic Proof",
                desc: "Tamper-proof verification",
              },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-4 p-5 rounded-lg bg-white border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded bg-slate-50 flex items-center justify-center border border-slate-100">
                  <feature.icon className="w-5 h-5 text-[var(--foreground)]" />
                </div>
                <div>
                  <div className="font-bold text-[var(--foreground)] text-sm">
                    {feature.label}
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    {feature.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
