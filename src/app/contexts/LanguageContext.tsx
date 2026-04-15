import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // SEO Meta Tags
    'seo.keywords': 'tenant screening, rental fraud detection, AI document verification, property management, rental application, tenant verification, fraud prevention, real estate technology, proptech',
    'page.title.home': 'Luuzon - AI-Powered Tenant Screening & Fraud Detection',
    'page.description.home': 'Luuzon uses AI to verify tenant documents in under 30 seconds with 99.7% fraud detection accuracy. Protect your rental properties from fraudulent applications and save 1h45 per screening.',
    'page.title.manifesto': 'Manifesto - Luuzon: Building Trust in Rental Markets',
    'page.description.manifesto': 'Discover why Luuzon exists and our mission to rebuild trust in rental markets through transparent AI-powered tenant verification.',
    'page.title.privacy': 'Privacy Policy - Luuzon',
    'page.description.privacy': 'Learn how Luuzon protects your personal data with end-to-end encryption and GDPR-compliant privacy practices.',
    'page.title.legal': 'Legal Notice - Luuzon',
    'page.description.legal': 'Legal information and terms of service for Luuzon\'s tenant screening platform.',
    'page.title.notFound': '404 - Page Not Found | Luuzon',
    'page.description.notFound': 'The page you are looking for doesn\'t exist or has been moved.',
    
    // Page Title (kept for backward compatibility)
    'page.title': 'Luuzon - AI-Powered Tenant Screening',
    
    // Hero Section
    'hero.badge': 'Private Beta Live',
    'hero.title1': 'Trust in rentals,',
    'hero.title2': 'restored.',
    'hero.subtitle': 'Your agency spends 45 minutes per application doing what our AI does in 30 seconds.',
    'hero.subtitleSecondary': 'Luuzon is the verification infrastructure that replaces manual document review permanently. Detect fraud, score applicants, and close leases faster than any human process ever could.',
    'hero.cta': 'Book a demo',
    'hero.topBanner': 'We are transforming the rental market.',
    'hero.topBannerButton': 'Join Beta',
    
    // Navigation
    'nav.manifesto': 'Read Manifesto',
    'nav.product': 'Product',
    'nav.whyNow': 'Why Now',
    'nav.howItWorks': 'How it works',
    'nav.backToHome': 'Back to Home',
    
    // 404 Not Found
    'notFound.title': '404 - Page Not Found',
    'notFound.heading': 'Page Not Found',
    'notFound.description': 'The page you\'re looking for doesn\'t exist or has been moved. Let\'s get you back on track.',
    'notFound.backHome': 'Back to Home',
    'notFound.goBack': 'Go Back',
    'notFound.helpfulLinks': 'Helpful Links:',
    
    // Our Promise
    'promise.badge': 'Why Luuzon',
    'promise.title1': 'One application.',
    'promise.title2': 'Infinite possibilities.',
    'promise.intro': 'In a time when every lease feels like a gamble, when agencies drown in paperwork and tenants fear for their deposits, we have lost the trust that makes a home.',
    'promise.subtitle': 'We believe renting should be transparent, fair, and frictionless. Your verified profile travels with you—apply once, rent anywhere.',
    'promise.market.broken': 'The market is broken. Agencies are overwhelmed by manual checks and fraud risks. Honest tenants struggle with opaque processes.',
    'promise.bridge': 'Luuzon is the bridge. An intelligent CRM for professionals, and a verified passport for tenants.',
    
    // New Section 1 - The Problem
    'problem.title': 'The rental process is broken and everyone knows it.',
    'problem.text1': 'Your team reads payslips by hand. Cross-checks tax forms. Calls employers to confirm what\'s already on paper. Then does it again for the next file. And the next.',
    'problem.text2': 'Meanwhile, 1 in 4 documents submitted to French agencies is manipulated. The fraud is getting smarter. Your process isn\'t.',
    'problem.text3': 'This isn\'t a workflow problem. It\'s a structural one. And no spreadsheet or email tool is going to fix it.',
    
    // New Section 2 - The Solution
    'solution.title': 'We built the verification infrastructure the rental market should have had 10 years ago.',
    'solution.text1': 'Luuzon replaces your manual review process with an AI engine that reads, verifies, and scores every tenant application in under 30 seconds.',
    'solution.text2': 'No more PDF chains. No more fraud slipping through. No more hours lost to paperwork that a machine handles better than any human.',
    
    'promise.feature1.title': 'AI-Powered Verification',
    'promise.feature1.desc': 'Instant document analysis detects fraud and validates authenticity in seconds, not days.',
    'promise.feature2.title': 'Portable Trust Score',
    'promise.feature2.desc': 'Build your rental reputation once. Carry it everywhere. Never start from scratch again.',
    'promise.feature3.title': 'Privacy First',
    'promise.feature3.desc': 'Your data stays encrypted and under your control. Share only what is needed, when it is needed.',
    
    // Alumni
    'alumni.title': 'Built by alumni of',
    
    // Fraud Detection Demo
    'fraud.badge': 'Live Demo',
    'fraud.title1': 'Watch AI Detect Fraud',
    'fraud.title2': 'In Real-Time',
    'fraud.subtitle': 'See how our AI analyzes a sample tenant application, detecting manipulated documents and scoring applicant risk.',
    'fraud.runButton': 'Run Analysis',
    'fraud.analyzing': 'Analyzing...',
    'fraud.analysisComplete': 'Analysis Complete',
    'fraud.trustScore': 'Trust Score',
    'fraud.documentVerification': 'Document Verification',
    'fraud.flagsDetected': 'flags detected',
    'fraud.allVerified': 'All verified',
    'fraud.verified': 'Verified',
    'fraud.flagged': 'Flagged',
    'fraud.warning': 'Warning',
    'fraud.scanning': 'Scanning',
    'fraud.pending': 'Pending',
    'fraud.riskAssessment': 'Risk Assessment',
    'fraud.riskLevel': 'Risk Level',
    'fraud.low': 'Low',
    'fraud.medium': 'Medium',
    'fraud.high': 'High',
    'fraud.recommendation': 'Recommendation',
    'fraud.recommendApprove': 'Approve with confidence',
    'fraud.recommendReview': 'Manual review recommended',
    'fraud.recommendReject': 'High risk - additional verification required',
    'fraud.income': 'Income',
    'fraud.identity': 'Identity',
    'fraud.employment': 'Employment',
    'fraud.ok': 'OK',
    'fraud.flag': 'Flag',
    'fraud.reject': 'Reject',
    'fraud.confidence': 'Confidence',
    'fraud.documentsAnalyzed': 'Documents Analyzed',
    'fraud.analysisTime': 'Analysis Time',
    'fraud.warningsFound': 'Warnings Found',
    'fraud.progress': 'Progress',
    'fraud.timeline': 'Timeline',
    'fraud.uploadedDocuments': 'Uploaded Documents',
    'fraud.applicant': 'Applicant',
    'fraud.analysisResults': 'Analysis Results',
    'fraud.upload': 'Upload',
    'fraud.analyze': 'Analyze',
    'fraud.review': 'Review',
    'fraud.done': 'Done',
    'fraud.uploaded': 'Uploaded',
    'fraud.analyzing2': 'Analyzing',
    'fraud.review2': 'Review',
    'fraud.completed': 'Completed',
    'fraud.documentsReceived': 'Documents received',
    'fraud.aiVerificationInProgress': 'AI verification in progress',
    'fraud.resultsUnderReview': 'Results under review',
    'fraud.analysisFinalized': 'Analysis finalized',
    'fraud.scan': 'Scan',
    
    // Fraud Demo - File names and details
    'fraud.file.payslip': 'Payslip_March_2024.pdf',
    'fraud.file.idCard': 'ID_Card_Front.jpg',
    'fraud.file.employment': 'Employment_Reference.pdf',
    'fraud.meta.incomeProof': 'INCOME PROOF',
    'fraud.meta.identityDoc': 'IDENTITY DOCUMENT',
    'fraud.meta.employment': 'EMPLOYMENT',
    'fraud.result.income.ok.title': 'Income',
    'fraud.result.identity.flag.title': 'Identity',
    'fraud.result.employment.ok.title': 'Employment',
    'fraud.result.ok': 'OK',
    'fraud.result.flag': 'Flag',
    'fraud.message.income.verified': 'Employer match confirmed. Income amount consistent with market rate.',
    'fraud.message.identity.warning': 'Microprint strip blurred — possible photocopy. Request original.',
    'fraud.message.employment.verified': 'Employer verified against business registry. Contract terms consistent.',
    'fraud.summary.verified': 'verified',
    'fraud.summary.flagged': 'flagged',
    
    // How It Works
    'howItWorks.badge': 'Comment ça marche',
    'howItWorks.title1': 'From application to approval',
    'howItWorks.title2': 'in seconds.',
    'howItWorks.subtitle': 'Automate the heavy lifting. We handle the data, verification, and scoring so you can focus on the decision.',
    'howItWorks.step1.title': 'Upload Documents',
    'howItWorks.step1.desc': 'Tenants upload their ID, payslips, and tax forms in seconds. No more email chains or lost PDFs.',
    'howItWorks.step2.title': 'AI Analysis',
    'howItWorks.step2.desc': 'Our engine reads, verifies, and cross-checks data against fraud patterns instantly.',
    'howItWorks.step3.title': 'Get Results',
    'howItWorks.step3.desc': 'Receive a complete risk score, red flags, and verified tenant profile ready for decision.',
    'howItWorks.stat1.value': '< 30s',
    'howItWorks.stat1.label': 'Analysis Time',
    'howItWorks.stat2.value': '99.7%',
    'howItWorks.stat2.label': 'Fraud Detection',
    'howItWorks.stat3.value': '1h45min',
    'howItWorks.stat3.label': 'Time Saved',
    'howItWorks.stat4.value': 'zero',
    'howItWorks.stat4.label': 'Manual PDF Reading',
    
    // Testimonial
    'testimonial.quote': 'The window to get ahead of this is right now',
    'testimonial.subtext': 'Rental fraud is accelerating. AI has made document forgery accessible to anyone, and the files agencies review today are more manipulated than ever.\\n\\nAt the same time, the EU AI Act now requires transparency for automated decisions affecting individuals.\\n\\nLuuzon was built by people who understand financial risk and document fraud.',
    
    // Passport Demo
    'passport.badge': 'Live Interactive Demo',
    'passport.title1': 'Partageable.',
    'passport.title2': 'Crypté.',
    'passport.title3': 'Confidentialité d\'abord.',
    'passport.subtitle': 'Générez un lien public sécurisé que les agences peuvent consulter sans compte. Seul le statut vérifié est affiché — jamais vos données sensibles.',
    'passport.headerPrivate': 'Votre Tableau de Bord Passeport Privé',
    'passport.headerPublic': 'Vue Agence (Aucune Connexion Requise)',
    'passport.encrypted': 'Cryptage de Bout en Bout',
    'passport.fullPassport': 'Votre Passeport Complet',
    'passport.publicView': 'Vue Publique du Passeport',
    'passport.private': 'Privé',
    'passport.public': 'Public',
    'passport.verifiedSince': 'Vérifié depuis Mars 2024',
    'passport.identityStatus': 'Statut d\'Identité',
    'passport.verified': 'Vérifié ✓',
    'passport.fullName': 'Nom Complet',
    'passport.incomeBracket': 'Tranche de Revenus',
    'passport.exactSalary': 'Salaire Exact',
    'passport.employmentStatus': 'Statut d\'Emploi',
    'passport.employmentCDI': 'CDI (Permanent)',
    'passport.employerName': 'Nom de l\'Employeur',
    'passport.rentalHistory': 'Historique Locatif',
    'passport.rentalHistoryValue': '3+ ans, Aucun Problème',
    'passport.previousAddresses': 'Adresses Précédentes',
    'passport.trustScore': 'Score de Confiance',
    'passport.trustScoreValue': '98/100',
    'passport.fraudCheck': 'Vérification Fraude IA',
    'passport.fraudCheckPassed': 'Validé ✓',
    'passport.hidden': 'Masqué',
    'passport.shareTitle': 'Partagez Votre Passeport',
    'passport.whatAgenciesSee': 'Ce Que Voient les Agences',
    'passport.privacyProtected': 'Confidentialité Protégée',
    'passport.privacyDesc': 'Votre lien public n\'affiche que le statut vérifié, jamais les documents réels ou les données sensibles.',
    'passport.publiclyVisible': 'VISIBLE PUBLIQUEMENT',
    'passport.alwaysHidden': 'TOUJOURS MASQUÉ',
    'passport.publicItem1': 'Identité ✓',
    'passport.publicItem2': 'Tranche de Revenus',
    'passport.publicItem3': 'Type d\'Emploi',
    'passport.publicItem4': 'Historique Locatif',
    'passport.publicItem5': 'Score de Confiance',
    'passport.publicItem6': 'Vérification Fraude ✓',
    'passport.hiddenItem1': 'Nom Complet',
    'passport.hiddenItem2': 'Salaire Exact',
    'passport.hiddenItem3': 'Employeur',
    'passport.hiddenItem4': 'Adresses',
    'passport.hiddenItem5': 'Documents',
    'passport.generateLink': 'Générer un Lien Partageable',
    'passport.generating': 'Génération du lien crypté...',
    'passport.yourLink': 'Votre Lien Passeport',
    'passport.copy': 'Copier',
    'passport.copied': 'Copié',
    'passport.linkDescription': 'Toute personne avec ce lien peut voir votre statut vérifié — aucun compte nécessaire',
    'passport.tenantVerified': 'Locataire Vérifié',
    'passport.cryptoVerified': 'Ce passeport a été cryptographiquement vérifié par Luuzon IA.',
    'passport.quickSummary': 'Résumé Rapide',
    'passport.income': 'Revenus',
    'passport.employment': 'Emploi',
    'passport.history': 'Historique',
    'passport.fullDetailsAvailable': 'Détails Complets Disponibles',
    'passport.fullDetailsDesc': 'Demandez un accès complet via Luuzon pour voir les documents complets avec le consentement du locataire.',
    'passport.restartDemo': 'Redémarrer la Démo',
    'passport.feature1': 'Aucun Compte Requis',
    'passport.feature1Desc': 'Les agences consultent instantanément',
    'passport.feature2': 'Zéro Données Sensibles',
    'passport.feature2Desc': 'Seulement le statut de vérification',
    'passport.feature3': 'Preuve Cryptographique',
    'passport.feature3Desc': 'Vérification infalsifiable',
    
    // FAQ
    'faq.badge': 'FAQ',
    'faq.title': 'Questions? We have answers.',
    'faq.q1': 'How does AI detect fraud?',
    'faq.a1': 'Our AI analyzes documents for inconsistencies, metadata anomalies, font irregularities, and cross-references data points against known fraud patterns. It\'s trained on millions of verified and fraudulent documents.',
    'faq.q2': 'Is my data secure?',
    'faq.a2': 'Absolutely. We use bank-grade encryption, zero-knowledge architecture, and comply with GDPR. You control what data is shared and with whom. We never sell your information.',
    'faq.q3': 'How long does verification take?',
    'faq.a3': 'Most verifications complete in under 30 seconds. Complex cases requiring manual review may take up to 24 hours, but this represents less than 2% of applications.',
    'faq.q4': 'Can I use this across multiple agencies?',
    'faq.a4': 'Yes! That\'s the entire point. Build your verified profile once, then apply to any agency or property on our network with a single click. Your trust score travels with you.',
    'faq.q5': 'What happens if a document is flagged?',
    'faq.a5': 'Flagged documents enter manual review by our verification team. You\'ll be notified and given the opportunity to submit corrected documents. False positives are rare but handled with care.',
    'faq.subtitle': 'For Agencies & Tenants',
    'faq.heading': 'Frequently Asked Questions',
    'faq.question1': 'How does Luuzon protect my personal data?',
    'faq.answer1': 'We use bank-grade encryption (AES-256) and strictly adhere to GDPR. Your data is encrypted at rest and in transit. Crucially, agencies only see your verified status unless you explicitly grant full access.',
    'faq.question2': 'What happens if there is a data breach?',
    'faq.answer2': 'Our decentralized architecture ensures that even in the unlikely event of a breach, attackers would only find fragmented, encrypted shards that are useless without your private key.',
    'faq.question3': 'How much does Luuzon cost for agencies?',
    'faq.answer3': 'We offer flexible pricing tiers starting with a free usage tier. Enterprise plans include API access and bulk verification discounts.',
    'faq.question4': 'Is Luuzon free for tenants?',
    'faq.answer4': 'Yes! Tenants can create a Verified Passport for free. We believe proving your trustworthiness shouldn\'t cost you money.',
    'faq.question5': 'How does the AI verification process work?',
    'faq.answer5': 'Our proprietary AI analyzes document metadata, cross-references income with bank statements, and checks global fraud databases instantly.',
    'faq.question6': 'How long does verification take?',
    'faq.answer6': 'Typically under 30 seconds. In rare complex cases, a manual review might take up to 2 hours.',
    'faq.question7': 'What if the AI flags my documents incorrectly?',
    'faq.answer7': 'You can request a manual review immediately. Our human compliance team will re-evaluate your documents within 24 hours.',
    'faq.question8': 'Can agencies see my full documents?',
    'faq.answer8': 'By default, no. They see a \'Verified\' status. You can choose to share the actual files if required for the final lease signing.',
    'faq.moreQuestions': 'More questions?',
    'faq.contactUs': 'Contact Us',
    
    // Footer
    'footer.title': 'You don\'t have to do this alone',
    'footer.support': 'Support',
    'footer.manifesto': 'Read our Manifesto',
    'footer.contact': 'Contact a founder',
    'footer.privacy': 'Privacy Policy',
    'footer.legal': 'Legal Notice',
    'footer.copyright': '© Luuzon 2026',
    
    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.lastUpdated': 'Last updated: January 15, 2026',
    'privacy.content': `Luuzon SAS ("we", "us", or "our") operates the Luuzon platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information in accordance with the General Data Protection Regulation (GDPR) and applicable French law.

1. Data Controller
Luuzon SAS - Email: contact@luuzon.com

2. Information We Collect
• Identity documents (ID cards, passports)
• Financial documents (payslips, tax returns, bank statements)
• Employment information
• Rental history
• Contact information (email, phone)
• Technical data (IP address, browser type)

3. How We Use Your Data
• Tenant verification and fraud detection
• Creating and managing your Luuzon Passport
• Communicating about our services
• Improving our AI algorithms
• Legal compliance

4. Data Sharing
We share your data only with property agencies you authorize, third-party verification services, when required by law, or with service providers under strict confidentiality. We never sell your data.

5. Data Security
• End-to-end encryption for all documents
• Secure cloud storage with regular backups
• Access controls and authentication
• Regular security audits

6. Your Rights (GDPR)
You have the right to access, rectify, delete, restrict processing, data portability, and withdraw consent. Contact: contact@luuzon.com

7. Data Retention
Active accounts: Duration of service + 3 years. Verification records: 5 years (legal compliance).

8. International Transfers
Data is stored in the EU. Transfers outside EU use Standard Contractual Clauses.

9. Contact
Send a mail to : contact@luuzon.com`,

    // Legal Notice
    'legal.title': 'Legal Notice',
    'legal.lastUpdated': 'Last updated: January 15, 2026',
    'legal.content': `In accordance with Article 6 of Law No. 2004-575 of June 21, 2004, for confidence in the digital economy:

1. Site Publisher
Company: Luuzon SAS
Legal Form: Société par Actions Simplifiée
Email: contact@luuzon.com

2. Intellectual Property
All content (text, images, graphics, logos, software) is the exclusive property of Luuzon SAS and protected by French and international intellectual property laws. Unauthorized use is prohibited.

3. Terms of Use
By accessing this website, you accept these terms. Luuzon SAS reserves the right to modify these terms at any time.

4. Disclaimer
Luuzon SAS strives to provide accurate information but cannot guarantee completeness. We are not responsible for direct or indirect damages from site use, viruses, or third-party content.

5. Applicable Law
These notices are governed by French law. Disputes are subject to French court jurisdiction.

6. Personal Data
See our Privacy Policy for data processing information.

7. Credits
Design & Development: Luuzon SAS | Icons: Lucide Icons | Fonts: Google Fonts

Contact: contact@luuzon.com`,
    
    // Cookies
    'cookies.title': 'We value your privacy',
    'cookies.description': 'We use cookies to enhance your browsing experience and analyze our traffic. You can choose which types of cookies you allow.',
    'cookies.essential': 'Essential',
    'cookies.essentialDesc': 'Required for the website to function',
    'cookies.analytics': 'Analytics',
    'cookies.analyticsDesc': 'Help us improve our service',
    'cookies.marketing': 'Marketing',
    'cookies.marketingDesc': 'Used for targeted advertising',
    'cookies.acceptAll': 'Accept All',
    'cookies.rejectAll': 'Reject All',
    'cookies.configure': 'Configure',
    'cookies.savePreferences': 'Save Preferences',
    'cookies.backToMain': 'Back',
    
    // New Manifesto 2026
    'manifesto2026.publicManifesto': 'Public Manifesto',
    'manifesto2026.year': '2026',
    'manifesto2026.title1': 'Trust in rentals,',
    'manifesto2026.title2': 'restored.',
    'manifesto2026.intro': 'We built Luuzon because the rental market stopped working — for agencies and for tenants. And no one was fixing it. So we did.',
    
    'manifesto2026.section1.number': 'I — The Broken System',
    'manifesto2026.section1.title1': 'Your agency is doing work',
    'manifesto2026.section1.title2': 'a machine should do.',
    'manifesto2026.section1.p1': 'Right now, somewhere in France, a letting agent is reading a payslip by hand. Calling an employer to confirm what is already on paper. Cross-referencing a tax return against an ID that may or may not be real. Then doing it again for the next file. And the next.',
    'manifesto2026.section1.p2': 'It takes 1h45 minutes per application. It has always taken 1h45 minutes. And it will keep taking 1h45 minutes — until something changes.',
    'manifesto2026.section1.pull': '1 in 4 documents submitted to rental agencies has been manipulated. The fraud is getting smarter. The process is not.',
    'manifesto2026.section1.p3': 'This is not a workflow problem. It is not a software problem. It is a structural failure — and no CRM, no email tool, no spreadsheet is going to fix it.',
    
    'manifesto2026.section2.number': 'II — The Historical Shift',
    'manifesto2026.section2.title1': 'This is not the first time',
    'manifesto2026.section2.title2': 'an industry automated its decisions.',
    'manifesto2026.section2.p1': 'In 1900, we automated physical labour. Factories ran on machines, not muscle.',
    'manifesto2026.section2.p2': 'In 2000, we automated information. Computers replaced filing cabinets and manual records.',
    'manifesto2026.section2.p3': 'In 2025, we automate decisions.',
    'manifesto2026.section2.p4': 'Every industry that still makes decisions by hand is about to change. The rental market is one of them — and it is long overdue.',
    
    'manifesto2026.section3.number': 'III — What We Built',
    'manifesto2026.section3.title1': 'The verification infrastructure',
    'manifesto2026.section3.title2': 'the rental market should have had 10 years ago.',
    'manifesto2026.section3.p1': 'Luuzon replaces the manual document review process — permanently. Our AI reads, verifies, and scores every tenant application in under 30 seconds. It detects manipulation. It cross-checks identity. It scores risk. It gives your team a complete, decision-ready file before a human has opened a single PDF.',
    'manifesto2026.section3.stat1': '< 30s',
    'manifesto2026.section3.stat1Label': 'Full application analysis',
    'manifesto2026.section3.stat2': '99.7%',
    'manifesto2026.section3.stat2Label': 'Fraud detection rate',
    'manifesto2026.section3.stat3': '1h45min',
    'manifesto2026.section3.stat3Label': 'Saved per application',
    'manifesto2026.section3.p2': 'But we did not stop at verification. Every tenant who goes through Luuzon earns a trust passport — a portable, encrypted proof of identity, income, and rental history. Verified once. Valid everywhere. When a pre-verified tenant applies to your property, their file is already done. You review, you decide, you sign.',
    
    'manifesto2026.section4.number': 'IV — What This Means for You',
    'manifesto2026.section4.title1': 'The agencies that move now',
    'manifesto2026.section4.title2': 'will outcompete every agency that does not.',
    'manifesto2026.section4.p1': 'We are not here to protect the way things have always been done. We are here to replace what is broken inside the industry — and give the professionals who adapt a structural advantage over those who do not.',
    'manifesto2026.section4.declaration1': 'The agencies running on Luuzon will close files faster than any manual process allows.',
    'manifesto2026.section4.declaration2': 'They will detect fraud their competitors miss.',
    'manifesto2026.section4.declaration3': 'They will attract better tenants — pre-verified, ready to sign.',
    'manifesto2026.section4.declaration4': 'They will operate at margins their competitors cannot match.',
    'manifesto2026.section4.declaration5': 'The ones who wait will catch up eventually. Or they will not.',
    'manifesto2026.section4.p2': 'This is not a warning. It is an invitation. The window to get ahead of this is open right now — and the EU AI Act, accelerating fraud, and rising tenant expectations mean it will not stay open forever.',
    
    'manifesto2026.section5.number': 'V — Where This Goes',
    'manifesto2026.section5.title1': 'We are building the infrastructure',
    'manifesto2026.section5.title2': 'beneath residential life.',
    'manifesto2026.section5.p1': 'Verification is where we start. It is not where we stop.',
    'manifesto2026.section5.phase1Title': 'AI Risk & Verification Engine',
    'manifesto2026.section5.phase1Desc': 'Automate screening. Eliminate fraud. Give agencies decision-ready files in seconds.',
    'manifesto2026.section5.phase2Title': 'Autonomous Rental Matching',
    'manifesto2026.section5.phase2Desc': 'Tenants and properties live permanently in Luuzon. AI matches continuously. One day, tenants will not search for rentals — rentals will search for tenants.',
    'manifesto2026.section5.phase3Title': 'Residential Operating System',
    'manifesto2026.section5.phase3Desc': 'Agencies operate on fully automated infrastructure. Decisions, maintenance, lifecycle — frictionless.',
    'manifesto2026.section5.phase4Title': 'Smart Habitat Infrastructure',
    'manifesto2026.section5.phase4Desc': 'Homes connected to Luuzon\'s intelligence. Energy, access, maintenance, security — Living-as-a-Service.',
    'manifesto2026.section5.p2': 'Every application processed, every rejection logged, every lease signed makes Luuzon smarter. Rejected applicants are not failures — they are data. The intelligence compounds with every interaction.',
    'manifesto2026.section5.pull': '"What\'s your Luuzon Score?" will be as normal as a credit check. We are making that happen.',
    
    'manifesto2026.closing.title1': 'The rental market runs on trust.',
    'manifesto2026.closing.title2': 'We restored it.',
    'manifesto2026.closing.p1': 'We are not anti-human. We are anti-waste. We are not removing people from the rental process. We are removing the 45 minutes of manual work that no human should be doing in 2026.',
    'manifesto2026.closing.p2': 'The agencies that understand this will lead the market. We are looking for the ones who are ready.',
    'manifesto2026.closing.cta': 'Book a demo',
    'manifesto2026.footer.site': 'LUUZON.COM',
    'manifesto2026.footer.tagline': 'Trust in Rentals, Restored — 2026',
    
    // CMS & Blog - English
    'cms.auth.signInTitle': 'Sign In',
    'cms.auth.signInSubtitle': 'Access your admin dashboard',
    'cms.auth.signUpTitle': 'Create Account',
    'cms.auth.signUpSubtitle': 'Join the Luuzon CMS team',
    'cms.auth.email': 'Email',
    'cms.auth.password': 'Password',
    'cms.auth.fullName': 'Full Name',
    'cms.auth.emailPlaceholder': 'your@email.com',
    'cms.auth.passwordPlaceholder': 'Enter your password',
    'cms.auth.fullNamePlaceholder': 'Your name',
    'cms.auth.signInButton': 'Sign In',
    'cms.auth.signUpButton': 'Create Account',
    'cms.auth.loading': 'Loading...',
    'cms.auth.haveAccount': 'Already have an account? Sign in',
    'cms.auth.noAccount': 'No account? Sign up',
    'cms.auth.signUpSuccess': 'Account created! Check your email.',
    'cms.auth.error': 'An error occurred',
    'cms.auth.forgotPassword': 'Forgot password?',
    'cms.auth.resetPassword': 'Reset Password',
    'cms.auth.resetPasswordSubtitle': 'Enter your email to receive a reset link',
    'cms.auth.sendResetLink': 'Send Reset Link',
    'cms.auth.backToSignIn': 'Back to Sign In',
    'cms.auth.resetEmailSent': 'Reset link sent! Check your email.',
    
    'cms.admin.title': 'CMS Dashboard',
    'cms.admin.welcome': 'Welcome',
    'cms.admin.accessDenied': 'Access denied',
    'cms.admin.profileError': 'Error: User profile could not be loaded. Please check your Supabase configuration (RLS policies). See SUPABASE_FIX_RLS.md for help.',
    'cms.admin.newBlog': 'New Post',
    'cms.admin.aiConfig': 'AI Config',
    'cms.admin.signOut': 'Sign Out',
    'cms.admin.filter.all': 'All',
    'cms.admin.filter.published': 'Published',
    'cms.admin.filter.draft': 'Drafts',
    'cms.admin.noBlogsTitle': 'No posts yet',
    'cms.admin.noBlogsText': 'Create your first blog post',
    'cms.admin.createFirst': 'Create my first post',
    'cms.admin.view': 'View',
    'cms.admin.edit': 'Edit',
    'cms.admin.delete': 'Delete',
    'cms.admin.confirmDelete': 'Are you sure you want to delete this post?',
    'cms.admin.deleteError': 'Error deleting post',
    
    'cms.editor.back': 'Back',
    'cms.editor.preview': 'Preview',
    'cms.editor.saveDraft': 'Save Draft',
    'cms.editor.publish': 'Publish',
    'cms.editor.editTitle': 'Edit Post',
    'cms.editor.newTitle': 'New Post',
    'cms.editor.title': 'Title',
    'cms.editor.slug': 'URL Slug',
    'cms.editor.excerpt': 'Excerpt',
    'cms.editor.content': 'Content',
    'cms.editor.featuredImage': 'Featured Image',
    'cms.editor.seoSection': 'SEO Optimization',
    'cms.editor.metaTitle': 'Meta Title',
    'cms.editor.metaDescription': 'Meta Description',
    'cms.editor.metaKeywords': 'Keywords',
    'cms.editor.titlePlaceholder': 'Your post title',
    'cms.editor.slugPlaceholder': 'your-post-url',
    'cms.editor.excerptPlaceholder': 'A brief summary of your post',
    'cms.editor.contentPlaceholder': 'Write your content here...',
    'cms.editor.metaTitlePlaceholder': 'Title for search engines',
    'cms.editor.metaDescriptionPlaceholder': 'Description for search engines',
    'cms.editor.metaKeywordsPlaceholder': 'keyword1, keyword2, keyword3',
    'cms.editor.markdownSupport': 'Markdown support available',
    'cms.editor.fillRequired': 'Please fill all required fields',
    'cms.editor.saveSuccess': 'Post saved successfully!',
    'cms.editor.saveError': 'Error saving post',
    'cms.editor.loadError': 'Error loading post',
    
    'cms.mistral.title': 'Mistral AI Configuration',
    'cms.mistral.subtitle': 'Automate content creation',
    'cms.mistral.back': 'Back',
    'cms.mistral.testConnection': 'Test',
    'cms.mistral.testing': 'Testing...',
    'cms.mistral.save': 'Save',
    'cms.mistral.saving': 'Saving...',
    'cms.mistral.apiKey': 'Mistral API Key',
    'cms.mistral.apiKeyHelp': 'Get your key from console.mistral.ai',
    'cms.mistral.topics': 'Article Topics',
    'cms.mistral.topicsPlaceholder': 'Real Estate, PropTech, Rental, Fraud...',
    'cms.mistral.topicsHelp': 'Separate topics with commas',
    'cms.mistral.autoPublish': 'Auto-publish',
    'cms.mistral.frequency': 'Publishing Frequency',
    'cms.mistral.frequencyManual': 'Manual',
    'cms.mistral.frequencyDaily': 'Daily',
    'cms.mistral.frequencyWeekly': 'Weekly',
    'cms.mistral.generateNow': 'Generate Post Now',
    'cms.mistral.generating': 'Generating...',
    'cms.mistral.generateHelp': 'AI will create a post based on your topics',
    'cms.mistral.enterApiKey': 'Please enter your API key',
    'cms.mistral.enterTopics': 'Please enter at least one topic',
    'cms.mistral.testSuccess': 'Connection successful!',
    'cms.mistral.testError': 'Connection error',
    'cms.mistral.saveSuccess': 'Configuration saved!',
    'cms.mistral.saveError': 'Error saving configuration',
    'cms.mistral.confirmGenerate': 'Generate a new post with AI?',
    'cms.mistral.generateSuccess': 'Post generated successfully!',
    'cms.mistral.generateError': 'Error generating post',
    'cms.mistral.infoTitle': 'About Automation',
    'cms.mistral.infoText': 'Mistral AI generates high-quality posts based on your topics. Posts are created as drafts or published automatically based on your settings.',
    
    'cms.blog.pageTitle': 'Blog - Luuzon',
    'cms.blog.pageDescription': 'Discover the latest news and articles about real estate technology',
    'cms.blog.title': 'Our Blog',
    'cms.blog.subtitle': 'News, insights and innovations in real estate',
    'cms.blog.searchPlaceholder': 'Search for a post...',
    'cms.blog.noPosts': 'No posts available',
    'cms.blog.readMore': 'Read more',
    'cms.blog.backToList': 'Back to posts',
    'cms.blog.share': 'Share',
    'cms.blog.linkCopied': 'Link copied!',
    'cms.blog.lang': 'en',
  },
  fr: {
    // SEO Meta Tags
    'seo.keywords': 'évaluation des locataires, détection de fraude locative, vérification documentaire alimentée par l\'IA, gestion immobilière, candidature locative, vérification des locataires, prévention de la fraude, technologie immobilière, proptech',
    'page.title.home': 'Luuzon - Évaluation des Locataires et Détection de Fraude Alimentée par l\'IA',
    'page.description.home': 'Luuzon utilise l\'IA pour vérifier les documents des locataires en moins de 30 secondes avec une précision de détection de fraude de 99,7%. Protégez vos propriétés de location des candidatures frauduleuses et économisez 1h45 par évaluation.',
    'page.title.manifesto': 'Manifeste - Luuzon: Reconstituer la Confiance dans les Marchés Locatifs',
    'page.description.manifesto': 'Découvrez pourquoi Luuzon existe et notre mission de reconstruire la confiance dans les marchés locatifs grâce à une vérification transparente des locataires alimentée par l\'IA.',
    'page.title.privacy': 'Politique de Confidentialité - Luuzon',
    'page.description.privacy': 'Apprenez comment Luuzon protège vos données personnelles avec un cryptage de bout en bout et des pratiques de confidentialité conformes au RGPD.',
    'page.title.legal': 'Mentions Légales - Luuzon',
    'page.description.legal': 'Informations légales et conditions d\'utilisation pour la plateforme d\'évaluation des locataires de Luuzon.',
    'page.title.notFound': '404 - Page Non Trouvée | Luuzon',
    'page.description.notFound': 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    
    // Page Title (kept for backward compatibility)
    'page.title': 'Luuzon - Évaluation des Locataires Alimentée par l\'IA',
    
    // Hero Section
    'hero.badge': 'Bêta Privée en Cours',
    'hero.title1': 'La confiance en location,',
    'hero.title2': 'restaurée.',
    'hero.subtitle': 'Votre agence passe 45 minutes par candidature à faire ce que notre IA fait en 30 secondes.',
    'hero.subtitleSecondary': 'Luuzon est l\'infrastructure de vérification qui remplace la revue manuelle des documents de manière permanente. Détectez la fraude, évaluez les candidats et concluez des baux plus rapidement que tout processus humain.',
    'hero.cta': 'Réserver une démo',
    'hero.topBanner': 'Nous transformons le marché locatif.',
    'hero.topBannerButton': 'Rejoindre la Bêta',
    
    // Navigation
    'nav.manifesto': 'Lire le Manifeste',
    'nav.product': 'Produit',
    'nav.whyNow': 'Pourquoi Maintenant',
    'nav.howItWorks': 'Comment ça marche',
    'nav.backToHome': 'Retour à l\'accueil',
    
    // 404 Not Found
    'notFound.title': '404 - Page Non Trouvée',
    'notFound.heading': 'Page Non Trouvée',
    'notFound.description': 'La page que vous recherchez n\'existe pas ou a été déplacée. Retournons sur la bonne voie.',
    'notFound.backHome': 'Retour à l\'accueil',
    'notFound.goBack': 'Retour',
    'notFound.helpfulLinks': 'Liens utiles :',
    
    // Our Promise
    'promise.badge': 'Pourquoi Luuzon',
    'promise.title1': 'Une seule candidature.',
    'promise.title2': 'Possibilités infinies.',
    'promise.intro': 'À une époque où chaque bail ressemble à un pari, où les agences se noient dans la paperasse et où les locataires craignent pour leur dépôt, nous avons perdu la confiance qui fait un foyer.',
    'promise.subtitle': 'Nous croyons que la location devrait être transparente, équitable et sans friction. Votre profil vérifié vous suit partout—postulez une fois, louez n\'importe où.',
    'promise.market.broken': 'Le marché est brisé. Les agences sont submergées par des contrôles manuels et des risques de fraude. Les locataires honnêtes luttent contre des processus opaques.',
    'promise.bridge': 'Luuzon est le pont. Un CRM intelligent pour les professionnels, et un passeport vérifié pour les locataires.',
    
    // New Section 1 - The Problem
    'problem.title': 'Le processus de location est brisé et tout le monde le sait.',
    'problem.text1': 'Votre équipe lit les fiches de paie à la main. Vérifie les formulaires fiscaux. Appelle les employeurs pour confirmer ce qui est déjà sur papier. Puis recommence pour le prochain dossier. Et le suivant.',
    'problem.text2': 'Pendant ce temps, 1 document sur 4 soumis aux agences françaises est manipulé. La fraude devient plus intelligente. Pas votre processus.',
    'problem.text3': 'Ce n\'est pas un problème de workflow. C\'est un problème structurel. Et aucun tableur ou outil email ne va le résoudre.',
    
    // New Section 2 - The Solution
    'solution.title': 'Nous avons construit l\'infrastructure de vérification que le marché locatif aurait dû avoir il y a 10 ans.',
    'solution.text1': 'Luuzon remplace votre processus de revue manuelle par un moteur IA qui lit, vérifie et note chaque candidature de locataire en moins de 30 secondes.',
    'solution.text2': 'Plus de chaînes de PDF. Plus de fraude qui passe à travers. Plus d\'heures perdues sur de la paperasse qu\'une machine gère mieux que n\'importe quel humain.',
    
    'promise.feature1.title': 'Vérification alimentée par l\'IA',
    'promise.feature1.desc': 'L\'analyse instantanée des documents détecte la fraude et valide l\'authenticité en quelques secondes, pas en jours.',
    'promise.feature2.title': 'Score de Confiance Portable',
    'promise.feature2.desc': 'Construisez votre réputation locative une fois. Emportez-la partout. Ne recommencez jamais à zéro.',
    'promise.feature3.title': 'Confidentialité d\'Abord',
    'promise.feature3.desc': 'Vos données restent cryptées et sous votre contrôle. Partagez uniquement ce qui est nécessaire, quand c\'est nécessaire.',
    
    // Alumni
    'alumni.title': 'Créé par des anciens de',
    
    // Fraud Detection Demo
    'fraud.badge': 'Démo en Direct',
    'fraud.title1': 'Regardez l\'IA Détecter la Fraude',
    'fraud.title2': 'En Temps Réel',
    'fraud.subtitle': 'Voyez comment notre IA analyse un exemple de candidature locataire, détectant les documents manipulés et évaluant le risque du candidat.',
    'fraud.runButton': 'Lancer l\'Analyse',
    'fraud.analyzing': 'Analyse en cours...',
    'fraud.analysisComplete': 'Analyse Terminée',
    'fraud.trustScore': 'Score de Confiance',
    'fraud.documentVerification': 'Vérification des Documents',
    'fraud.flagsDetected': 'alertes détectées',
    'fraud.allVerified': 'Tous vérifiés',
    'fraud.verified': 'Vérifié',
    'fraud.flagged': 'Signalé',
    'fraud.warning': 'Attention',
    'fraud.scanning': 'Analyse',
    'fraud.pending': 'En attente',
    'fraud.riskAssessment': 'Évaluation du Risque',
    'fraud.riskLevel': 'Niveau de Risque',
    'fraud.low': 'Faible',
    'fraud.medium': 'Moyen',
    'fraud.high': 'Élevé',
    'fraud.recommendation': 'Recommandation',
    'fraud.recommendApprove': 'Approuver en toute confiance',
    'fraud.recommendReview': 'Examen manuel recommandé',
    'fraud.recommendReject': 'Risque élevé - vérification supplémentaire requise',
    'fraud.income': 'Revenus',
    'fraud.identity': 'Identité',
    'fraud.employment': 'Emploi',
    'fraud.ok': 'OK',
    'fraud.flag': 'Signal',
    'fraud.reject': 'Rejeter',
    'fraud.confidence': 'Confiance',
    'fraud.documentsAnalyzed': 'Documents Analyzés',
    'fraud.analysisTime': 'Temps d\'Analyse',
    'fraud.warningsFound': 'Alertes Trouvées',
    'fraud.progress': 'Progression',
    'fraud.timeline': 'Chronologie',
    'fraud.uploadedDocuments': 'Documents Téléchargés',
    'fraud.applicant': 'Candidat',
    'fraud.analysisResults': 'Résultats de l\'Analyse',
    'fraud.upload': 'Télécharger',
    'fraud.analyze': 'Analyser',
    'fraud.review': 'Examiner',
    'fraud.done': 'Terminé',
    'fraud.uploaded': 'Téléchargé',
    'fraud.analyzing2': 'Analyse en cours',
    'fraud.review2': 'Examen',
    'fraud.completed': 'Complété',
    'fraud.documentsReceived': 'Documents reçus',
    'fraud.aiVerificationInProgress': 'Vérification IA en cours',
    'fraud.resultsUnderReview': 'Résultats en examen',
    'fraud.analysisFinalized': 'Analyse finalisée',
    'fraud.scan': 'Analyser',
    
    // Fraud Demo - File names and details
    'fraud.file.payslip': 'Fiche_Paie_Mars_2024.pdf',
    'fraud.file.idCard': 'Carte_Identite_Recto.jpg',
    'fraud.file.employment': 'Attestation_Employeur.pdf',
    'fraud.meta.incomeProof': 'JUSTIFICATIF DE REVENUS',
    'fraud.meta.identityDoc': 'DOCUMENT D\'IDENTITÉ',
    'fraud.meta.employment': 'EMPLOI',
    'fraud.result.income.ok.title': 'Revenus',
    'fraud.result.identity.flag.title': 'Identité',
    'fraud.result.employment.ok.title': 'Emploi',
    'fraud.result.ok': 'OK',
    'fraud.result.flag': 'Signal',
    'fraud.message.income.verified': 'Employeur confirmé. Montant des revenus cohérent avec le taux du marché.',
    'fraud.message.identity.warning': 'Bande de micro-impression floue — possible photocopie. Demander l\'original.',
    'fraud.message.employment.verified': 'Employeur vérifié dans le registre des entreprises. Conditions du contrat cohérentes.',
    'fraud.summary.verified': 'vérifié',
    'fraud.summary.flagged': 'signalé',
    
    // How It Works
    'howItWorks.badge': 'Comment ça marche',
    'howItWorks.title1': 'De la candidature à l\'approbation',
    'howItWorks.title2': 'en quelques secondes.',
    'howItWorks.subtitle': 'Automatisez le travail lourd. Nous gérons les données, la vérification et le scoring pour que vous puissiez vous concentrer sur la décision.',
    'howItWorks.step1.title': 'Télécharger les Documents',
    'howItWorks.step1.desc': 'Les locataires téléchargent leur pièce d\'identité, bulletins de salaire et déclarations fiscales en quelques secondes. Fini les chaînes d\'emails ou PDFs perdus.',
    'howItWorks.step2.title': 'Analyse IA',
    'howItWorks.step2.desc': 'Notre moteur lit, vérifie et recoupe les données contre les modèles de fraude instantanément.',
    'howItWorks.step3.title': 'Obtenir les Résultats',
    'howItWorks.step3.desc': 'Recevez un score de risque complet, les alertes et le profil locataire vérifié prêt pour la décision.',
    'howItWorks.stat1.value': '< 30s',
    'howItWorks.stat1.label': 'Temps d\'Analyse',
    'howItWorks.stat2.value': '99.7%',
    'howItWorks.stat2.label': 'Détection de Fraude',
    'howItWorks.stat3.value': '1h45min',
    'howItWorks.stat3.label': 'Temps Économisé',
    'howItWorks.stat4.value': 'zero',
    'howItWorks.stat4.label': 'Lecture Manuelle de PDF',
    
    // Testimonial
    'testimonial.quote': 'Le moment de prendre de l\'avance, c\'est maintenant',
    'testimonial.subtext': 'La fraude locative s\'accélère. L\'IA a rendu la falsification de documents accessible à tous, et les dossiers que les agences examinent aujourd\'hui sont plus manipulés que jamais.\n\nDans le même temps, l\'AI Act européen exige désormais la transparence pour les décisions automatisées affectant les individus.\n\nLuuzon a été créé par des personnes qui comprennent le risque financier et la fraude documentaire.',
    
    // Passport Demo
    'passport.badge': 'Démo Interactive en Direct',
    'passport.title1': 'Partageable.',
    'passport.title2': 'Crypté.',
    'passport.title3': 'Confidentialité d\'abord.',
    'passport.subtitle': 'Générez un lien public sécurisé que les agences peuvent consulter sans compte. Seul le statut vérifié est affiché — jamais vos données sensibles.',
    'passport.headerPrivate': 'Votre Tableau de Bord Passeport Privé',
    'passport.headerPublic': 'Vue Agence (Aucune Connexion Requise)',
    'passport.encrypted': 'Cryptage de Bout en Bout',
    'passport.fullPassport': 'Votre Passeport Complet',
    'passport.publicView': 'Vue Publique du Passeport',
    'passport.private': 'Privé',
    'passport.public': 'Public',
    'passport.verifiedSince': 'Vérifié depuis Mars 2024',
    'passport.identityStatus': 'Statut d\'Identité',
    'passport.verified': 'Vérifié ✓',
    'passport.fullName': 'Nom Complet',
    'passport.incomeBracket': 'Tranche de Revenus',
    'passport.exactSalary': 'Salaire Exact',
    'passport.employmentStatus': 'Statut d\'Emploi',
    'passport.employmentCDI': 'CDI (Permanent)',
    'passport.employerName': 'Nom de l\'Employeur',
    'passport.rentalHistory': 'Historique Locatif',
    'passport.rentalHistoryValue': '3+ ans, Aucun Problème',
    'passport.previousAddresses': 'Adresses Précédentes',
    'passport.trustScore': 'Score de Confiance',
    'passport.trustScoreValue': '98/100',
    'passport.fraudCheck': 'Vérification Fraude IA',
    'passport.fraudCheckPassed': 'Validé ✓',
    'passport.hidden': 'Masqué',
    'passport.shareTitle': 'Partagez Votre Passeport',
    'passport.whatAgenciesSee': 'Ce Que Voient les Agences',
    'passport.privacyProtected': 'Confidentialité Protégée',
    'passport.privacyDesc': 'Votre lien public n\'affiche que le statut vérifié, jamais les documents réels ou les données sensibles.',
    'passport.publiclyVisible': 'VISIBLE PUBLIQUEMENT',
    'passport.alwaysHidden': 'TOUJOURS MASQUÉ',
    'passport.publicItem1': 'Identité ✓',
    'passport.publicItem2': 'Tranche de Revenus',
    'passport.publicItem3': 'Type d\'Emploi',
    'passport.publicItem4': 'Historique Locatif',
    'passport.publicItem5': 'Score de Confiance',
    'passport.publicItem6': 'Vérification Fraude ✓',
    'passport.hiddenItem1': 'Nom Complet',
    'passport.hiddenItem2': 'Salaire Exact',
    'passport.hiddenItem3': 'Employeur',
    'passport.hiddenItem4': 'Adresses',
    'passport.hiddenItem5': 'Documents',
    'passport.generateLink': 'Générer un Lien Partageable',
    'passport.generating': 'Génération du lien crypté...',
    'passport.yourLink': 'Votre Lien Passeport',
    'passport.copy': 'Copier',
    'passport.copied': 'Copié',
    'passport.linkDescription': 'Toute personne avec ce lien peut voir votre statut vérifié — aucun compte nécessaire',
    'passport.tenantVerified': 'Locataire Vérifié',
    'passport.cryptoVerified': 'Ce passeport a été cryptographiquement vérifié par Luuzon IA.',
    'passport.quickSummary': 'Résumé Rapide',
    'passport.income': 'Revenus',
    'passport.employment': 'Emploi',
    'passport.history': 'Historique',
    'passport.fullDetailsAvailable': 'Détails Complets Disponibles',
    'passport.fullDetailsDesc': 'Demandez un accès complet via Luuzon pour voir les documents complets avec le consentement du locataire.',
    'passport.restartDemo': 'Redémarrer la Démo',
    'passport.feature1': 'Aucun Compte Requis',
    'passport.feature1Desc': 'Les agences consultent instantanément',
    'passport.feature2': 'Zéro Données Sensibles',
    'passport.feature2Desc': 'Seulement le statut de vérification',
    'passport.feature3': 'Preuve Cryptographique',
    'passport.feature3Desc': 'Vérification infalsifiable',
    
    // FAQ
    'faq.badge': 'FAQ',
    'faq.title': 'Des questions ? Nous avons les réponses.',
    'faq.q1': 'Comment l\'IA détecte-t-elle la fraude ?',
    'faq.a1': 'Notre IA analyse les documents pour détecter les incohérences, les anomalies de métadonnées, les irrégularités de police et fait des recoupements avec des modèles de fraude connus. Elle est formée sur des millions de documents vérifiés et frauduleux.',
    'faq.q2': 'Mes données sont-elles sécurisées ?',
    'faq.a2': 'Absolument. Nous utilisons un cryptage de niveau bancaire, une architecture à connaissance zéro et sommes conformes au RGPD. Vous contrôlez quelles données sont partagées et avec qui. Nous ne vendons jamais vos informations.',
    'faq.q3': 'Combien de temps prend la vérification ?',
    'faq.a3': 'La plupart des vérifications sont complétées en moins de 30 secondes. Les cas complexes nécessitant un examen manuel peuvent prendre jusqu\'à 24 heures, mais cela représente moins de 2% des candidatures.',
    'faq.q4': 'Puis-je l\'utiliser avec plusieurs agences ?',
    'faq.a4': 'Oui ! C\'est tout l\'intérêt. Construisez votre profil vérifié une fois, puis postulez auprès de n\'importe quelle agence ou propriété sur notre réseau en un seul clic. Votre score de confiance vous suit partout.',
    'faq.q5': 'Que se passe-t-il si un document est signalé ?',
    'faq.a5': 'Les documents signalés entrent en examen manuel par notre équipe de vérification. Vous serez informé et aurez l\'opportunité de soumettre des documents corrigés. Les faux positifs sont rares mais traités avec soin.',
    'faq.subtitle': 'Pour les Agences & Locataires',
    'faq.heading': 'Questions Fréquemment Posées',
    'faq.question1': 'Comment Luuzon protège-t-il mes données personnelles ?',
    'faq.answer1': 'Nous utilisons un cryptage de niveau bancaire (AES-256) et nous respectons strictement le RGPD. Vos données sont cryptées au repos et en transit. Crucialement, les agences ne voient que votre statut vérifié sauf si vous leur accordez explicitement un accès complet.',
    'faq.question2': 'Que se passe-t-il en cas de fuite de données ?',
    'faq.answer2': 'Notre architecture décentralisée garantit que même dans l\'improbable cas d\'une fuite, les attaquants ne trouveraient que des fragments cryptés qui seraient inutiles sans votre clé privée.',
    'faq.question3': 'Combien coûte Luuzon pour les agences ?',
    'faq.answer3': 'Nous proposons des tarifs flexibles commençant par une tier gratuite d\'utilisation. Les plans d\'entreprise incluent un accès à l\'API et des remises pour les vérifications en masse.',
    'faq.question4': 'Luuzon est-il gratuit pour les locataires ?',
    'faq.answer4': 'Oui ! Les locataires peuvent créer un Passeport Vérifié gratuitement. Nous croyons que prouver votre crédibilité ne devrait pas vous coûter d\'argent.',
    'faq.question5': 'Comment fonctionne le processus de vérification par IA ?',
    'faq.answer5': 'Notre IA propriétaire analyse les métadonnées des documents, fait des recoupements des revenus avec les relevés bancaires et vérifie les bases de données de fraude globales instantanément.',
    'faq.question6': 'Combien de temps prend la vérification ?',
    'faq.answer6': 'Typiquement moins de 30 secondes. Dans des cas complexes rares, une revue manuelle peut prendre jusqu\'à 2 heures.',
    'faq.question7': 'Que se passe-t-il si l\'IA signale incorrectement mes documents ?',
    'faq.answer7': 'Vous pouvez demander une revue manuelle immédiatement. Notre équipe de conformité humaine réévaluera vos documents dans les 24 heures.',
    'faq.question8': 'Les agences peuvent-elles voir mes documents complets ?',
    'faq.answer8': 'Par défaut, non. Elles voient un statut \'Vérifié\'. Vous pouvez choisir de partager les fichiers réels si nécessaire pour la signature finale du bail.',
    'faq.moreQuestions': 'Plus de questions ?',
    'faq.contactUs': 'Contactez-nous',
    
    // Footer
    'footer.title': 'Vous n\'avez pas à faire ça seul',
    'footer.support': 'Support',
    'footer.manifesto': 'Lire notre Manifeste',
    'footer.contact': 'Contacter un fondateur',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.legal': 'Mentions Légales',
    'footer.copyright': '© Luuzon 2026',
    
    // Privacy Policy
    'privacy.title': 'Politique de Confidentialité',
    'privacy.lastUpdated': 'Dernière mise à jour : 15 janvier 2026',
    'privacy.content': `Luuzon SAS (« nous », « notre ») exploite la plateforme Luuzon. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et au droit français applicable.

1. Responsable du traitement
Luuzon SAS - Email : contact@luuzon.com

2. Informations collectées
• Documents d'identité (cartes d'identité, passeports)
• Documents financiers (bulletins de salaire, déclarations fiscales, relevés bancaires)
• Informations professionnelles
• Historique locatif
• Coordonnées (email, téléphone)
• Données techniques (adresse IP, type de navigateur)

3. Utilisation de vos données
• Vérification des locataires et détection de fraude
• Création et gestion de votre Passeport Luuzon
• Communication sur nos services
• Amélioration de nos algorithmes IA
• Conformité légale

4. Partage des données
Nous partageons vos données uniquement avec les agences immobilières que vous autorisez, les services de vérification tiers, si requis par la loi, ou avec des prestataires sous strict accord de confidentialité. Nous ne vendons jamais vos données.

5. Sécurité des données
• Chiffrement de bout en bout pour tous les documents
• Stockage cloud sécurisé avec sauvegardes régulières
• Contrôles d'accès et authentification
• Audits de sécurité réguliers

6. Vos droits (RGPD)
Vous avez le droit d'accéder, rectifier, supprimer, restreindre le traitement, à la portabilité des données et de retirer votre consentement. Contact : contact@luuzon.com

7. Conservation des données
Comptes actifs : Durée d'utilisation + 3 ans. Enregistrements de vérification : 5 ans (conformité légale).

8. Transferts internationaux
Les données sont stockées dans l'UE. Les transferts hors UE utilisent les Clauses Contractuelles Types.

9. Contact
Envoyer un email à : contact@luuzon.com `,

    // Legal Notice
    'legal.title': 'Mentions Légales',
    'legal.lastUpdated': 'Dernière mise à jour : 15 janvier 2026',
    'legal.content': `Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique :

1. Éditeur du site
Société : Luuzon SAS
Forme juridique : Société par Actions Simplifiée
Email : contact@luuzon.com

2. Propriété intellectuelle
Tous les contenus (textes, images, graphiques, logos, logiciels) sont la propriété exclusive de Luuzon SAS et protégés par les lois françaises et internationales sur la propriété intellectuelle. Toute utilisation non autorisée est interdite.

3. Conditions d'utilisation
En accédant à ce site, vous acceptez ces conditions. Luuzon SAS se réserve le droit de modifier ces conditions à tout moment.

4. Responsabilité
Luuzon SAS s'efforce de fournir des informations exactes mais ne peut garantir leur exhaustivité. Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'utilisation du site, des virus ou du contenu de tiers.

5. Droit applicable
Ces mentions sont régies par le droit français. Les litiges relèvent de la compétence des tribunaux français.

6. Données personnelles
Consultez notre Politique de Confidentialité pour les informations sur le traitement des données.

7. Crédits
Design & Développement : Luuzon SAS | Icônes : Lucide Icons | Polices : Google Fonts

Contact : contact@luuzon.com`,
    
    // Cookies
    'cookies.title': 'Nous respectons votre vie privée',
    'cookies.description': 'Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser notre trafic. Vous pouvez choisir quels types de cookies vous autorisez.',
    'cookies.essential': 'Essentiels',
    'cookies.essentialDesc': 'Requis pour le fonctionnement du site',
    'cookies.analytics': 'Analytiques',
    'cookies.analyticsDesc': 'Nous aident à améliorer notre service',
    'cookies.marketing': 'Marketing',
    'cookies.marketingDesc': 'Utilisés pour la publicité ciblée',
    'cookies.acceptAll': 'Tout Accepter',
    'cookies.rejectAll': 'Tout Refuser',
    'cookies.configure': 'Configurer',
    'cookies.savePreferences': 'Enregistrer les Préférences',
    'cookies.backToMain': 'Retour',
    
    // Manifesto
    'manifesto.badge': 'Manifeste',
    'manifesto.hero.title1': 'Logement, Automatisé.',
    'manifesto.hero.title2': 'Vie, Simplifiée.',
    'manifesto.section1.number': '01 — Notre Philosophie',
    'manifesto.section1.title': 'La confiance est le fondement de chaque foyer',
    'manifesto.section1.p1': 'Le marché locatif est brisé. C\'est un enchevêtrement d\'inefficacités, de méfiance et de processus obsolètes qui frustrent les locataires et accablent les agences.',
    'manifesto.section1.p2': 'Nous croyons en un monde où la location est transparente, digne et sans friction. Où votre réputation vous suit. Où la confiance n\'est pas supposée—elle est vérifiée.',
    'manifesto.section1.p3': 'Il ne s\'agit pas seulement de technologie ; il s\'agit de restaurer l\'humanité dans le logement. Il s\'agit de construire des systèmes qui respectent à la fois les propriétaires et les locataires, créant un marché où l\'honnêteté est récompensée et la fraude est impossible.',
    'manifesto.section2.number': '02 — Pourquoi Maintenant',
    'manifesto.section2.title': 'Le moment du changement est arrivé',
    'manifesto.section2.p1': 'La fraude augmente. Les agences sont submergées. Les locataires passent des semaines à prouver leur crédibilité avec des montagnes de paperasse. Le système actuel gaspille temps, argent et confiance.',
    'manifesto.section2.p2': 'Pendant ce temps, l\'IA a atteint un point d\'inflexion. Ce qui nécessitait autrefois des armées d\'analystes peut maintenant être fait instantanément, avec précision et à grande échelle. Les outils existent. Le besoin est urgent. L\'opportunité est maintenant.',
    'manifesto.section2.p3': 'Nous sommes à l\'intersection de la crise et de la capacité—et c\'est là que la transformation se produit.',
    'manifesto.section3.number': '03 — Notre Solution',
    'manifesto.section3.title': 'Un écosystème intelligent pour une vie vérifiée',
    'manifesto.section3.p1': 'Nous construisons la norme institutionnelle pour la vérification de bail—une plateforme B2B2C neutre qui connecte des agences vérifiées avec des locataires honnêtes via une infrastructure de confiance alimentée par l\'IA.',
    'manifesto.section3.p2': 'Notre système vérifie instantanément les documents, détecte la fraude et construit des réputations locatives portables. Une candidature. Un profil. Possibilités infinies.',
    'manifesto.section3.p3': 'Les agences économisent du temps et réduisent les risques. Les locataires postulent plus rapidement et louent en toute confiance. Les propriétaires accueillent des résidents vérifiés. Tout le monde gagne quand le système fonctionne.',
    'manifesto.section4.number': '04 — Notre Vision',
    'manifesto.section4.title': 'Votre historique locatif comme passeport',
    'manifesto.section4.p1': 'Imaginez un monde où postuler pour un logement est aussi simple qu\'un seul clic. Où votre historique vérifié ouvre des portes au lieu de vous forcer à vous prouver encore et encore.',
    'manifesto.section4.p2': 'Nous envisageons un avenir où le logement est accessible, équitable et transparent. Où les données donnent du pouvoir plutôt qu\'elles n\'exploitent. Où la confidentialité et la vérification coexistent.',
    'manifesto.section4.p3': 'Nous ne construisons pas simplement un logiciel—nous repensons les fondations de notre façon de vivre. Rejoignez-nous pour faire fonctionner la location pour tous.',
    'manifesto.closing': 'Bienvenue dans le futur de la location',
    
    // New Manifesto 2026
    'manifesto2026.publicManifesto': 'Manifeste Public',
    'manifesto2026.year': '2026',
    'manifesto2026.title1': 'La confiance en location,',
    'manifesto2026.title2': 'restaurée.',
    'manifesto2026.intro': 'Nous avons construit Luuzon parce que le marché locatif a cessé de fonctionner — pour les agences et pour les locataires. Et personne ne le réparait. Alors nous l\'avons fait.',
    
    'manifesto2026.section1.number': 'I — Le Système Brisé',
    'manifesto2026.section1.title1': 'Votre agence fait un travail',
    'manifesto2026.section1.title2': 'qu\'une machine devrait faire.',
    'manifesto2026.section1.p1': 'En ce moment, quelque part en France, un agent immobilier lit une fiche de paie à la main. Appelle un employeur pour confirmer ce qui est déjà sur papier. Croise une déclaration fiscale avec une pièce d\'identité qui peut être réelle ou non. Puis recommence pour le prochain dossier. Et le suivant.',
    'manifesto2026.section1.p2': 'Cela prend 45 minutes par candidature. Cela a toujours pris 45 minutes. Et cela continuera à prendre 45 minutes — jusqu\'à ce que quelque chose change.',
    'manifesto2026.section1.pull': '1 document sur 4 soumis aux agences immobilières a été manipulé. La fraude devient plus intelligente. Le processus, non.',
    'manifesto2026.section1.p3': 'Ce n\'est pas un problème de workflow. Ce n\'est pas un problème logiciel. C\'est un échec structurel — et aucun CRM, aucun outil email, aucun tableur ne va le résoudre.',
    
    'manifesto2026.section2.number': 'II — Le Tournant Historique',
    'manifesto2026.section2.title1': 'Ce n\'est pas la première fois',
    'manifesto2026.section2.title2': 'qu\'une industrie automatise ses décisions.',
    'manifesto2026.section2.p1': 'En 1900, nous avons automatisé le travail physique. Les usines fonctionnaient avec des machines, pas des muscles.',
    'manifesto2026.section2.p2': 'En 2000, nous avons automatisé l\'information. Les ordinateurs ont remplacé les classeurs et les dossiers manuels.',
    'manifesto2026.section2.p3': 'En 2025, nous automatisons les décisions.',
    'manifesto2026.section2.p4': 'Chaque industrie qui prend encore des décisions manuellement est sur le point de changer. Le marché locatif en fait partie — et le changement est attendu depuis longtemps.',
    
    'manifesto2026.section3.number': 'III — Ce Que Nous Avons Construit',
    'manifesto2026.section3.title1': 'L\'infrastructure de vérification',
    'manifesto2026.section3.title2': 'que le marché locatif aurait dû avoir il y a 10 ans.',
    'manifesto2026.section3.p1': 'Luuzon remplace le processus de revue manuelle des documents — définitivement. Notre IA lit, vérifie et note chaque candidature locataire en moins de 30 secondes. Elle détecte la manipulation. Elle vérifie l\'identité. Elle évalue le risque. Elle fournit à votre équipe un dossier complet, prêt pour la décision, avant qu\'un humain n\'ait ouvert un seul PDF.',
    'manifesto2026.section3.stat1': '< 30s',
    'manifesto2026.section3.stat1Label': 'Analyse complète de candidature',
    'manifesto2026.section3.stat2': '99.7%',
    'manifesto2026.section3.stat2Label': 'Taux de détection de fraude',
    'manifesto2026.section3.stat3': '45min',
    'manifesto2026.section3.stat3Label': 'Économisées par candidature',
    'manifesto2026.section3.p2': 'Mais nous ne nous sommes pas arrêtés à la vérification. Chaque locataire qui passe par Luuzon obtient un passeport de confiance — une preuve portable et cryptée d\'identité, de revenus et d\'historique locatif. Vérifié une fois. Valable partout. Quand un locataire pré-vérifié postule pour votre bien, son dossier est déjà prêt. Vous examinez, vous décidez, vous signez.',
    
    'manifesto2026.section4.number': 'IV — Ce Que Cela Signifie Pour Vous',
    'manifesto2026.section4.title1': 'Les agences qui bougent maintenant',
    'manifesto2026.section4.title2': 'surpasseront toutes celles qui ne le font pas.',
    'manifesto2026.section4.p1': 'Nous ne sommes pas là pour protéger la façon dont les choses ont toujours été faites. Nous sommes là pour remplacer ce qui est cassé dans l\'industrie — et donner aux professionnels qui s\'adaptent un avantage structurel sur ceux qui ne le font pas.',
    'manifesto2026.section4.declaration1': 'Les agences qui utilisent Luuzon clôtureront des dossiers plus rapidement que tout processus manuel ne le permet.',
    'manifesto2026.section4.declaration2': 'Elles détecteront la fraude que leurs concurrents manquent.',
    'manifesto2026.section4.declaration3': 'Elles attireront de meilleurs locataires — pré-vérifiés, prêts à signer.',
    'manifesto2026.section4.declaration4': 'Elles opéreront avec des marges que leurs concurrents ne peuvent égaler.',
    'manifesto2026.section4.declaration5': 'Ceux qui attendent rattraperont éventuellement. Ou pas.',
    'manifesto2026.section4.p2': 'Ce n\'est pas un avertissement. C\'est une invitation. La fenêtre pour prendre de l\'avance est ouverte maintenant — et l\'AI Act européen, l\'accélération de la fraude et les attentes croissantes des locataires signifient qu\'elle ne restera pas ouverte éternellement.',
    
    'manifesto2026.section5.number': 'V — Où Nous Allons',
    'manifesto2026.section5.title1': 'Nous construisons l\'infrastructure',
    'manifesto2026.section5.title2': 'sous la vie résidentielle.',
    'manifesto2026.section5.p1': 'La vérification est notre point de départ. Ce n\'est pas notre point d\'arrivée.',
    'manifesto2026.section5.phase1Title': 'Moteur de Risque & Vérification IA',
    'manifesto2026.section5.phase1Desc': 'Automatisez le filtrage. Éliminez la fraude. Donnez aux agences des dossiers prêts pour la décision en secondes.',
    'manifesto2026.section5.phase2Title': 'Matching Locatif Autonome',
    'manifesto2026.section5.phase2Desc': 'Les locataires et les biens vivent en permanence dans Luuzon. L\'IA fait correspondre en continu. Un jour, les locataires ne chercheront plus de locations — les locations chercheront les locataires.',
    'manifesto2026.section5.phase3Title': 'Système d\'Exploitation Résidentiel',
    'manifesto2026.section5.phase3Desc': 'Les agences opèrent sur une infrastructure entièrement automatisée. Décisions, maintenance, cycle de vie — sans friction.',
    'manifesto2026.section5.phase4Title': 'Infrastructure d\'Habitat Intelligent',
    'manifesto2026.section5.phase4Desc': 'Les logements connectés à l\'intelligence de Luuzon. Énergie, accès, maintenance, sécurité — l\'Habitat-en-tant-que-Service.',
    'manifesto2026.section5.p2': 'Chaque candidature traitée, chaque rejet enregistré, chaque bail signé rend Luuzon plus intelligent. Les candidats rejetés ne sont pas des échecs — ce sont des données. L\'intelligence se compose à chaque interaction.',
    'manifesto2026.section5.pull': '« Quel est votre score Luuzon ? » sera aussi normal qu\'une vérification de crédit. Nous le réalisons.',
    
    'manifesto2026.closing.title1': 'Le marché locatif repose sur la confiance.',
    'manifesto2026.closing.title2': 'Nous l\'avons restaurée.',
    'manifesto2026.closing.p1': 'Nous ne sommes pas anti-humains. Nous sommes anti-gaspillage. Nous ne retirons pas les gens du processus locatif. Nous retirons les 45 minutes de travail manuel qu\'aucun humain ne devrait faire en 2026.',
    'manifesto2026.closing.p2': 'Les agences qui comprennent cela dirigeront le marché. Nous cherchons celles qui sont prêtes.',
    'manifesto2026.closing.cta': 'Réserver une démo',
    'manifesto2026.footer.site': 'LUUZON.COM',
    'manifesto2026.footer.tagline': 'La Confiance en Location, Restaurée — 2026',
    
    // CMS & Blog - French
    'cms.auth.signInTitle': 'Se connecter',
    'cms.auth.signInSubtitle': 'Accédez au tableau de bord admin',
    'cms.auth.signUpTitle': 'Créer un compte',
    'cms.auth.signUpSubtitle': 'Rejoignez l\'équipe Luuzon CMS',
    'cms.auth.email': 'Email',
    'cms.auth.password': 'Mot de passe',
    'cms.auth.fullName': 'Nom complet',
    'cms.auth.emailPlaceholder': 'votre@email.com',
    'cms.auth.passwordPlaceholder': 'Entrez votre mot de passe',
    'cms.auth.fullNamePlaceholder': 'Votre nom',
    'cms.auth.signInButton': 'Se connecter',
    'cms.auth.signUpButton': 'Créer un compte',
    'cms.auth.loading': 'Chargement...',
    'cms.auth.haveAccount': 'Déjà un compte ? Se connecter',
    'cms.auth.noAccount': 'Pas de compte ? S\'inscrire',
    'cms.auth.signUpSuccess': 'Compte créé ! Vérifiez vos emails.',
    'cms.auth.error': 'Une erreur est survenue',
    'cms.auth.forgotPassword': 'Mot de passe oublié ?',
    'cms.auth.resetPassword': 'Réinitialiser le mot de passe',
    'cms.auth.resetPasswordSubtitle': 'Entrez votre email pour recevoir un lien de réinitialisation',
    'cms.auth.sendResetLink': 'Envoyer le lien',
    'cms.auth.backToSignIn': 'Retour à la connexion',
    'cms.auth.resetEmailSent': 'Lien envoyé ! Vérifiez vos emails.',
    
    'cms.admin.title': 'Tableau de Bord CMS',
    'cms.admin.welcome': 'Bienvenue',
    'cms.admin.accessDenied': 'Accès refusé',
    'cms.admin.profileError': 'Erreur : Le profil utilisateur n\'a pas pu être chargé. Vérifiez votre configuration Supabase (politiques RLS). Consultez SUPABASE_FIX_RLS.md pour de l\'aide.',
    'cms.admin.newBlog': 'Nouvel Article',
    'cms.admin.aiConfig': 'Config IA',
    'cms.admin.signOut': 'Déconnexion',
    'cms.admin.filter.all': 'Tous',
    'cms.admin.filter.published': 'Publiés',
    'cms.admin.filter.draft': 'Brouillons',
    'cms.admin.noBlogsTitle': 'Aucun article',
    'cms.admin.noBlogsText': 'Créez votre premier article de blog',
    'cms.admin.createFirst': 'Créer mon premier article',
    'cms.admin.view': 'Voir',
    'cms.admin.edit': 'Modifier',
    'cms.admin.delete': 'Supprimer',
    'cms.admin.confirmDelete': 'Êtes-vous sûr de vouloir supprimer cet article ?',
    'cms.admin.deleteError': 'Erreur lors de la suppression',
    
    'cms.editor.back': 'Retour',
    'cms.editor.preview': 'Aperçu',
    'cms.editor.saveDraft': 'Sauvegarder',
    'cms.editor.publish': 'Publier',
    'cms.editor.editTitle': 'Modifier l\'article',
    'cms.editor.newTitle': 'Nouvel article',
    'cms.editor.title': 'Titre',
    'cms.editor.slug': 'URL (slug)',
    'cms.editor.excerpt': 'Extrait',
    'cms.editor.content': 'Contenu',
    'cms.editor.featuredImage': 'Image à la une',
    'cms.editor.seoSection': 'Optimisation SEO',
    'cms.editor.metaTitle': 'Meta Title',
    'cms.editor.metaDescription': 'Meta Description',
    'cms.editor.metaKeywords': 'Mots-clés',
    'cms.editor.titlePlaceholder': 'Le titre de votre article',
    'cms.editor.slugPlaceholder': 'url-de-votre-article',
    'cms.editor.excerptPlaceholder': 'Un court résumé de votre article',
    'cms.editor.contentPlaceholder': 'Écrivez votre contenu ici...',
    'cms.editor.metaTitlePlaceholder': 'Titre pour les moteurs de recherche',
    'cms.editor.metaDescriptionPlaceholder': 'Description pour les moteurs de recherche',
    'cms.editor.metaKeywordsPlaceholder': 'mot-clé1, mot-clé2, mot-clé3',
    'cms.editor.markdownSupport': 'Support Markdown disponible',
    'cms.editor.fillRequired': 'Veuillez remplir tous les champs requis',
    'cms.editor.saveSuccess': 'Article sauvegardé avec succès !',
    'cms.editor.saveError': 'Erreur lors de la sauvegarde',
    'cms.editor.loadError': 'Erreur lors du chargement de l\'article',
    
    'cms.mistral.title': 'Configuration Mistral AI',
    'cms.mistral.subtitle': 'Automatisez la création de contenu',
    'cms.mistral.back': 'Retour',
    'cms.mistral.testConnection': 'Tester',
    'cms.mistral.testing': 'Test...',
    'cms.mistral.save': 'Sauvegarder',
    'cms.mistral.saving': 'Sauvegarde...',
    'cms.mistral.apiKey': 'Clé API Mistral',
    'cms.mistral.apiKeyHelp': 'Obtenez votre clé sur console.mistral.ai',
    'cms.mistral.topics': 'Sujets d\'articles',
    'cms.mistral.topicsPlaceholder': 'Immobilier, PropTech, Location, Fraude...',
    'cms.mistral.topicsHelp': 'Séparez les sujets par des virgules',
    'cms.mistral.autoPublish': 'Publication automatique',
    'cms.mistral.frequency': 'Fréquence de publication',
    'cms.mistral.frequencyManual': 'Manuel',
    'cms.mistral.frequencyDaily': 'Quotidien',
    'cms.mistral.frequencyWeekly': 'Hebdomadaire',
    'cms.mistral.generateNow': 'Générer un article maintenant',
    'cms.mistral.generating': 'Génération en cours...',
    'cms.mistral.generateHelp': 'L\'IA créera un article basé sur vos sujets',
    'cms.mistral.enterApiKey': 'Veuillez entrer votre clé API',
    'cms.mistral.enterTopics': 'Veuillez entrer au moins un sujet',
    'cms.mistral.testSuccess': 'Connexion réussie !',
    'cms.mistral.testError': 'Erreur de connexion',
    'cms.mistral.saveSuccess': 'Configuration sauvegardée !',
    'cms.mistral.saveError': 'Erreur lors de la sauvegarde',
    'cms.mistral.confirmGenerate': 'Générer un nouvel article avec l\'IA ?',
    'cms.mistral.generateSuccess': 'Article généré avec succès !',
    'cms.mistral.generateError': 'Erreur lors de la génération',
    'cms.mistral.infoTitle': 'À propos de l\'automatisation',
    'cms.mistral.infoText': 'Mistral AI génère des articles de qualité basés sur vos sujets. Les articles sont créés en brouillon ou publiés automatiquement selon votre configuration.',
    
    'cms.blog.pageTitle': 'Blog - Luuzon',
    'cms.blog.pageDescription': 'Découvrez les dernières actualités et articles sur la technologie immobilière',
    'cms.blog.title': 'Notre Blog',
    'cms.blog.subtitle': 'Actualités, insights et innovations dans l\'immobilier',
    'cms.blog.searchPlaceholder': 'Rechercher un article...',
    'cms.blog.noPosts': 'Aucun article disponible',
    'cms.blog.readMore': 'Lire la suite',
    'cms.blog.backToList': 'Retour aux articles',
    'cms.blog.share': 'Partager',
    'cms.blog.linkCopied': 'Lien copié !',
    'cms.blog.lang': 'fr',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const params = useParams();
  const navigate = useNavigate();
  const language = (params.lang as Language) || 'en';

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    if (language === 'fr' || language === 'en') {
      localStorage.setItem('preferredLanguage', language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    const currentPath = window.location.pathname;
    // Replace the language part of the URL
    const newPath = currentPath.replace(/^\/(en|fr)/, `/${lang}`);
    navigate(newPath);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, lang: language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default context instead of throwing error during hot-reload
    return {
      language: 'fr' as Language,
      lang: 'fr' as Language,
      setLanguage: () => {},
      t: (key: string) => key
    };
  }
  return context;
}