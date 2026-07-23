"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FaShieldHalved, FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';

export default function PrivacyPolicy() {
  // Animation Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#0B0D14] min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-[#FACC15] selection:text-black pb-24">
      
      {/* Cinematic Ambient Lighting */}
      <div className="absolute top-0 left-[50%] -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[150px] bg-indigo-900/10 pointer-events-none z-0"></div>

      <main className="max-w-4xl mx-auto w-full px-6 py-20 relative z-10 flex flex-col">
        
        {/* --- HEADER --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-center w-full mb-16 border-b border-white/10 pb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[12px] font-bold tracking-[0.2em] uppercase text-[#FACC15] mb-6">
            <FaShieldHalved /> LEGAL & COMPLIANCE INFRASTRUCTURE
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight text-white">
            Comprehensive Privacy Policy
          </h1>
          
          <p className="text-gray-400 text-sm tracking-wide uppercase">
            Effective Date: June 2026 | Platform: YB Connect
          </p>
        </motion.section>

        {/* --- LEGAL CONTENT --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none text-gray-300 space-y-12"
        >
          {/* SECTION 1 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">1. Introduction and Scope</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              At YB Connect, serving as the digital infrastructure for the BacktoBase mentorship community, we view data privacy not merely as a regulatory requirement, but as a foundational engineering principle. This Comprehensive Privacy Policy formally dictates the exact parameters, mechanisms, and architectural decisions governing how we collect, process, encrypt, and ultimately anonymize your Personally Identifiable Information (PII). 
            </p>
            <p className="leading-relaxed text-[15px] mb-4">
              This document applies to all interactions within the YB Connect ecosystem, encompassing our cross-platform mobile application, our backend Node.js API infrastructure, and our integrations with third-party service providers. Our data architecture is built strictly on the principle of data minimization—meaning we only request, process, and retain the absolute minimum digital footprint required to facilitate secure, high-quality professional interactions.
            </p>
            <p className="leading-relaxed text-[15px]">
              By registering an account, authenticating your external profiles, or scheduling a consultation through YB Connect, you enter into a legally binding agreement confirming your consent to these data processing practices. If our data handling methodologies do not align with your personal privacy standards, we respectfully ask that you terminate your use of the platform.
            </p>
          </div>

          {/* SECTION 2 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">2. Exhaustive Breakdown of Collected Information</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              To operate a functional, secure, and automated mentorship marketplace, we must collect specific categories of data. We categorize this into Direct Identifiers, Professional Metadata, and Third-Party API Telemetry.
            </p>
            
            <h3 className="text-lg font-bold text-gray-200 mt-6 mb-2">2.1 Direct Account Identifiers</h3>
            <p className="leading-relaxed text-[15px] mb-4">
              Upon registration, we collect your primary contact parameters: Full Legal Name, verified Email Address, and Phone Number. To secure your account, we utilize bcrypt cryptographic algorithms to hash and salt your password locally before it ever enters our database. We do not store, nor can we retrieve, your plaintext password.
            </p>

            <h3 className="text-lg font-bold text-gray-200 mt-6 mb-2">2.2 Professional Profile & Mentorship Data</h3>
            <p className="leading-relaxed text-[15px] mb-4">
              Industry experts and mentors may voluntarily construct a public-facing digital portfolio. This dataset includes your current city of residence, corporate affiliation (Company Name), job designation, a custom biographical summary, an array of technical and soft skills, spoken languages, total years of verified experience, notable achievements, and your requested hourly consultation rate. Furthermore, you may optionally link external social verifiers such as LinkedIn, X (Twitter), or personal portfolio URLs.
            </p>

            <h3 className="text-lg font-bold text-gray-200 mt-6 mb-2">2.3 Third-Party Integrations (Zoom & Razorpay)</h3>
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15]">
              <li><strong className="text-gray-200">Zoom API Telemetry:</strong> To automate virtual consultation rooms, we initiate a secure OAuth 2.0 handshake with Zoom. We collect and securely store your Zoom Access Tokens, Refresh Tokens, and Account IDs. During active consultations, we process inbound Zoom Webhooks to capture transient metadata: dynamically generated Meeting IDs, Join/Start URLs, and timestamp triggers.</li>
              <li><strong className="text-gray-200">Financial Integration:</strong> To process escrow payments and mentor payouts, we interact securely with Razorpay. When a mentor requests a withdrawal, we collect a UPI ID, contact email, and phone number specifically for that transaction. <strong>Under no circumstances does YB Connect collect, process, or store your raw credit card numbers, CVV codes, direct banking passwords, bank account numbers, or IFSC/routing codes.</strong> All raw financial data is handled exclusively by Razorpays PCI-DSS compliant infrastructure.</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-200 mt-6 mb-2">2.4 Automated System Data & Device Telemetry</h3>
            <p className="leading-relaxed text-[15px]">
              When utilizing the mobile client, we automatically collect basic operational telemetry to ensure application stability. This includes your devices operating system version, network status, and Expo Push Tokens (utilized strictly to deliver critical, time-sensitive application alerts regarding your scheduled appointments).
            </p>
          </div>

          {/* SECTION 3 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">3. Execution and Utilization of Data</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              We operate under a strict doctrine: data is solely an operational tool. We emphatically guarantee that YB Connect does not sell, rent, lease, or algorithmically trade your personal data to external marketing agencies, data brokers, or advertising networks. Your data is used exclusively to power the following internal logic engines:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15]">
              <li><strong className="text-gray-200">Automated Mentorship Routing:</strong> Executing logic to dynamically generate secure 1-on-1 virtual meeting rooms the exact moment an expert accepts a student's request, and routing those specific cryptographic URLs to the appropriate user dashboards.</li>
              <li><strong className="text-gray-200">Escrow and Session Verification:</strong> We utilize Zoom's webhook data as an automated session stopwatch. By monitoring when participants join and leave a designated room, our backend calculates the precise duration of the consultation. This mathematical verification is required to authorize the release of financial escrow payments to the mentor, ensuring fraud prevention for both parties.</li>
              <li><strong className="text-gray-200">Identity Verification & Access Control:</strong> Deploying time-sensitive One-Time Passwords (OTPs) to your verified email address to confirm identity before allowing critical account mutations, such as password resets or contact email modifications.</li>
            </ul>
          </div>

          {/* SECTION 4 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">4. Enterprise Security Protocols & Data Storage</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              The YB Connect ecosystem is fortified by modern, enterprise-grade security protocols designed to prevent unauthorized data exfiltration or interception.
            </p>
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15]">
              <li><strong className="text-gray-200">Database Isolation:</strong> Our primary data layer is hosted on managed cloud clusters (MongoDB Atlas), protected by strict Network Access Control Lists (IP Whitelisting) and Virtual Private Cloud (VPC) peering limitations.</li>
              <li><strong className="text-gray-200">Cryptographic Encryption:</strong> All sensitive external credentials, most notably Zoom OAuth keys, are encrypted at rest using advanced AES-256 cipher algorithms. Data in transit between your mobile application and our server endpoints is strictly funneled through enforced HTTPS/TLS 1.3 cryptographic tunnels.</li>
              <li><strong className="text-gray-200">Stateless Authentication:</strong> User sessions are managed via stateless JSON Web Tokens (JWT) equipped with automated expiration limits, mitigating the risk of hijacked, long-standing connections.</li>
            </ul>
          </div>

          {/* SECTION 5 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">5. Account Deletion and Cryptographic Anonymization (Google Play Data Deletion Policy)</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              We respect your ultimate authority over your digital presence. However, to maintain the structural integrity of historical financial transactions and consultation ledgers, we deploy a sophisticated hardSoft Delete data anonymization protocol when you request account termination.
            </p>
            <p className="leading-relaxed text-[15px] mb-4">
              Upon initiating the Delete Account sequence within your application settings, the following irreversible actions are immediately executed by our servers:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15]">
              <li><strong>Identity Erasure:</strong> Your exact Name, Email Address, and Phone Number are permanently overwritten in our database with randomized, cryptographic hexadecimal strings (e.g., "Deleted User").</li>
              <li><strong>Credential Destruction:</strong> Your hashed password is overwritten with a randomized string, permanently severing any future ability to authenticate. All active JWT session tokens are instantly invalidated.</li>
              <li><strong>Profile Purge:</strong> All custom profile data—including your biography, professional skills, hourly rates, social media hyperlinks, and profile imagery—is entirely wiped from the `Profile` collection schema.</li>
              <li><strong>Third-Party Disconnection:</strong> All stored Zoom OAuth credentials (access and refresh tokens) are deleted, severing our application's access to your Zoom account.</li>
            </ul>
            <p className="leading-relaxed text-[15px] mt-4">
              The only data that remains is an anonymous, disconnected ledger record of the consultation (e.g., "A meeting occurred on this date for this amount"), which is legally required for financial auditing and fraud prevention.
            </p>
          </div>

          {/* SECTION 6 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">6. Strict Video Session Privacy Protocol</h2>
            <p className="leading-relaxed text-[15px]">
              YB Connect leverages the enterprise infrastructure of Zoom to facilitate high-fidelity video consultations. We operate under an absolute policy of non-interference regarding the content of your meetings. Our integration is strictly structural. <strong>We do NOT record, capture, intercept, transcribe, or store any video streams, audio feeds, shared screens, or chat transcripts originating from your Zoom meetings.</strong> The intellectual property and private conversations exchanged during a mentorship session remain entirely confidential between the student and the industry expert.
            </p>
          </div>

          {/* SECTION 7 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    7. Data Retention and Information Lifecycle Management
  </h2>

  <p className="leading-relaxed text-[15px] mb-4">
    YB Connect follows a structured data retention framework designed to balance
    operational efficiency, user privacy, legal obligations, fraud prevention,
    and financial compliance requirements. We retain personal information only
    for as long as reasonably necessary to provide platform services, comply
    with applicable laws, resolve disputes, enforce agreements, and maintain
    system integrity.
  </p>

  <p className="leading-relaxed text-[15px] mb-4">
    User account information, including names, email addresses, contact
    information, and profile data, remains active while the account is
    operational. Once an account is deleted through the platform, personally
    identifiable information is anonymized or removed according to our deletion
    protocol.
  </p>

  <p className="leading-relaxed text-[15px]">
    Certain transaction records, payment references, consultation metadata,
    audit logs, and dispute-resolution records may be retained when required by
    applicable taxation laws, financial regulations, anti-fraud requirements,
    or contractual obligations. Such retained records are stored in a manner
    that minimizes direct user identification wherever possible.
  </p>
</div>

{/* SECTION 8 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    8. User Rights, Access Controls, and Data Ownership
  </h2>

  <p className="leading-relaxed text-[15px] mb-4">
    We believe users should maintain meaningful control over their personal
    information. Subject to applicable laws and platform requirements, users
    may exercise the following rights:
  </p>

  <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15]">
    <li>Request access to information associated with their account.</li>
    <li>Correct inaccurate or outdated profile information.</li>
    <li>Update professional credentials and public-facing details.</li>
    <li>Withdraw previously granted permissions.</li>
    <li>Disconnect third-party integrations.</li>
    <li>Request account deletion.</li>
    <li>Request clarification regarding how information is processed.</li>
  </ul>

  <p className="leading-relaxed text-[15px] mt-4">
    YB Connect recognizes that users remain the owners of the information they
    submit. Our role is limited to processing such information solely for
    platform functionality, security, payment operations, mentorship matching,
    and service delivery.
  </p>
</div>

{/* SECTION 9 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    9. Third-Party Services and External Providers
  </h2>

  <p className="leading-relaxed text-[15px] mb-4">
    To provide a reliable mentorship experience, YB Connect relies upon
    selected third-party service providers that perform specialized operational
    functions.
  </p>

  <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15]">
    <li>Zoom for virtual meeting infrastructure.</li>
    <li>Razorpay for payment processing and payouts.</li>
    <li>MongoDB Atlas for database hosting and management.</li>
    <li>Email providers for transactional communications.</li>
    <li>Push notification services for reminders and alerts.</li>
    <li>Cloud infrastructure providers for backend operations.</li>
  </ul>

  <p className="leading-relaxed text-[15px] mt-4">
    Each third-party provider operates under its own privacy practices and
    security standards. While YB Connect carefully evaluates service providers
    before integration, we do not control the independent privacy policies of
    external organizations.
  </p>
</div>

{/* SECTION 10 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    10. Cookies, Analytics, and Similar Technologies
  </h2>

  <p className="leading-relaxed text-[15px] mb-4">
    When accessing YB Connect through supported web interfaces, we may utilize
    cookies, local storage technologies, session identifiers, and similar
    mechanisms to improve security, authentication, performance, and user
    experience.
  </p>

  <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15]">
    <li>Maintaining secure login sessions.</li>
    <li>Preventing fraudulent activities.</li>
    <li>Remembering user preferences.</li>
    <li>Improving application performance.</li>
    <li>Monitoring platform reliability.</li>
    <li>Supporting security investigations.</li>
  </ul>

  <p className="leading-relaxed text-[15px] mt-4">
    We do not use cookies for selling user profiles to advertising networks or
    third-party data brokers.
  </p>
</div>

{/* SECTION 11 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    11. Children's Privacy and Age Restrictions
  </h2>

  <p className="leading-relaxed text-[15px] mb-4">
    YB Connect is intended for students, professionals, mentors, and industry
    experts who meet the minimum legal age requirements applicable within their
    jurisdiction.
  </p>

  <p className="leading-relaxed text-[15px]">
    We do not knowingly collect personal information from children under the
    age of 13 years or any higher minimum age required by local law. If we
    become aware that such information has been submitted, we will take
    reasonable steps to remove it from our systems.
  </p>
</div>

{/* SECTION 12 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    12. Security Monitoring and Incident Response
  </h2>

  <p className="leading-relaxed text-[15px] mb-4">
    Maintaining the confidentiality, integrity, and availability of user data
    remains a core operational objective.
  </p>

  <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15]">
    <li>Continuous infrastructure monitoring.</li>
    <li>Automated anomaly detection systems.</li>
    <li>Access control enforcement.</li>
    <li>Credential rotation policies.</li>
    <li>Security audits and logging.</li>
    <li>Vulnerability management processes.</li>
  </ul>

  <p className="leading-relaxed text-[15px] mt-4">
    In the event of a verified security incident affecting user information, we
    will investigate, implement remediation measures, and provide notification
    where required by law.
  </p>
</div>

{/* SECTION 13 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    13. Artificial Intelligence and Automated Processing
  </h2>

  <p className="leading-relaxed text-[15px] mb-4">
    YB Connect may utilize recommendation systems, matching algorithms, fraud
    detection mechanisms, and AI-assisted technologies to improve mentorship
    discovery, profile recommendations, scheduling workflows, and operational
    efficiency.
  </p>

  <p className="leading-relaxed text-[15px]">
    These systems are designed to support platform functionality and do not
    independently make legally binding decisions regarding users.
  </p>
</div>

{/* SECTION 14 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    14. International Data Transfers
  </h2>

  <p className="leading-relaxed text-[15px]">
    As a cloud-based platform, YB Connect may process, store, or transfer
    information across multiple geographic regions through trusted
    infrastructure providers. Appropriate safeguards are implemented to ensure
    data receives an appropriate level of protection consistent with applicable
    privacy standards.
  </p>
</div>

{/* SECTION 15 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    15. Compliance with Applicable Laws
  </h2>

  <p className="leading-relaxed text-[15px] mb-4">
    YB Connect strives to operate in accordance with applicable privacy,
    cybersecurity, consumer protection, and electronic communications
    regulations.
  </p>

  <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15]">
    <li>Digital Personal Data Protection Act (DPDP), India.</li>
    <li>Information Technology Act, India.</li>
    <li>Industry-standard security frameworks.</li>
    <li>Payment and financial compliance requirements.</li>
    <li>Relevant international privacy principles.</li>
  </ul>
</div>

{/* SECTION 16 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    16. Updates to This Privacy Policy
  </h2>

  <p className="leading-relaxed text-[15px]">
    We reserve the right to modify, update, or revise this Privacy Policy to
    reflect changes in technology, legal requirements, platform features,
    security enhancements, or operational improvements. Continued use of YB
    Connect after such updates constitutes acceptance of the revised policy.
  </p>
</div>

{/* SECTION 17 */}

<div>
  <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">
    17. Contact Information and Privacy Requests
  </h2>

  <p className="leading-relaxed text-[15px] mb-4">
    Questions, concerns, privacy requests, security reports, or data-related
    inquiries may be directed to our compliance team.
  </p>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <p className="mb-2">
      <strong>Organization:</strong> Yb Connect
    </p>
    <p className="mb-2">
      <strong>Platform:</strong> YB Connect
    </p>
    <p className="mb-2">
      <strong>Email:</strong> yashwanthbondapalli@ybconnect.in
    </p>
    <p>
      <strong>Support:</strong> yashwanthbondapalli@ybconnect.in
    </p>
  </div>
</div>


        </motion.section>

       {/* --- BOTTOM CTA CARD --- */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-24 p-8 sm:p-10 rounded-[2rem] border border-white/10 bg-[#111520]/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Decorative glow inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC15]/5 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-3 font-serif">Data Inquiry & Support</h3>
            <p className="text-[15px] text-gray-400 max-w-md leading-relaxed">
              Our backend engineering and security compliance teams are available to provide further architectural clarity regarding our encryption standards, webhook tracking, or data retention policies.
            </p>
          </div>
          
          {/* Replaced <button> with Next.js <Link> */}
          <Link 
            href="/contact" 
            className="relative z-10 whitespace-nowrap bg-transparent border border-[#FACC15] text-[#FACC15] px-8 py-4 rounded-xl font-bold hover:bg-[#FACC15] hover:text-black transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(250,204,21,0.15)] hover:shadow-[0_0_30px_rgba(250,204,21,0.3)]"
          >
            Contact Security Team <FaArrowRight />
          </Link>
        </motion.div>

      </main>
    </div>
  );
}
