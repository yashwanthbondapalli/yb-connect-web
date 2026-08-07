import React from 'react';

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-200 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Account & Data Deletion
          </h1>
          <p className="text-slate-400 text-lg">
            At YB Connect, we respect your privacy. You have full control over your data and can request its complete removal at any time.
          </p>
        </div>

        {/* METHOD 1: IN-APP DELETION */}
        <div className="bg-[#0f172a] rounded-2xl p-8 border border-slate-800 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex justify-center items-center text-sm mr-3">1</span>
            Instant In-App Deletion
          </h2>
          <p className="text-slate-400 mb-4">
            The fastest way to delete your account and all associated data is directly through the YB Connect mobile app. This process is instant and automated.
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
            <li>Open the YB Connect app and log in.</li>
            <li>Navigate to your <strong className="text-white">Profile Screen</strong>.</li>
            <li>Tap the <strong className="text-white">Settings</strong> icon in the top right.</li>
            <li>Scroll down to the Danger Zone and tap <strong className="text-red-400">Delete Account</strong>.</li>
          </ul>
        </div>

        {/* METHOD 2: MANUAL WEB REQUEST */}
        <div className="bg-[#0f172a] rounded-2xl p-8 border border-slate-800 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex justify-center items-center text-sm mr-3">2</span>
            Manual Deletion Request
          </h2>
          <p className="text-slate-400 mb-6">
            If you have uninstalled the app or lost access to your account, you can request account deletion by contacting our support team directly. Our team will verify your identity and process the deletion within 7-14 business days.
          </p>

          <div className="space-y-4">
            {/* EMAIL OPTION */}
            <div className="bg-[#151923] border border-slate-700 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Email Support</h3>
                <p className="text-slate-400 text-sm">Send us an email from your registered account address.</p>
              </div>
              {/* NOTE: Clicking this opens their phone/computer email app automatically */}
              <a
                href="mailto:ybconnect10@gmail.com?subject=Account Deletion Request&body=Hello YB Connect Support,%0A%0AI would like to request the deletion of my account and all associated data.%0A%0AMy Registered Phone Number:%0AMy Registered Email:"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center whitespace-nowrap"
              >
                Email Us
              </a>
            </div>

            {/* CALL OPTION */}
            <div className="bg-[#151923] border border-slate-700 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Call Customer Care</h3>
                <p className="text-slate-400 text-sm">Speak with our team to initiate your deletion request.</p>
              </div>
              {/* NOTE: Clicking this opens their phone's dialer automatically. Replace with your actual number! */}
              <a
                href="tel:+917207255542"
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center whitespace-nowrap border border-slate-600"
              >
                Call Support
              </a>
            </div>
          </div>
        </div>

        {/* POLICY DETAILS (Crucial for Google Play Compliance) */}
        <div className="space-y-8 pt-8 border-t border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">What data gets deleted?</h3>
            <p className="text-slate-400 mb-3">Upon account deletion, we permanently erase the following from our active servers:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-2">
              <li>Personal Information (Name, Email, Phone Number, Profile Image)</li>
              <li>Professional Data (Bio, Skills, Resume, Portfolio Links)</li>
              <li>Social Content (Your posts, comments, and interactions in the Idea Hub)</li>
              <li>Authentication credentials and active sessions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">What data is retained?</h3>
            <p className="text-slate-400 mb-3">For legal, security, and accounting compliance, we are required to retain a minimal footprint of specific data:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-2">
              <li><strong>Financial Records:</strong> Transaction IDs and payment histories for 1:1 mentorship sessions are securely retained for up to 7 years to comply with tax and financial reporting laws. This data is stripped of non-essential personal identifiers.</li>
              <li><strong>Anonymized Analytics:</strong> General usage data that cannot be linked back to your identity is kept to help us improve platform stability.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
