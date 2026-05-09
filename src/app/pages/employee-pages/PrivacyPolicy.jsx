import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
   

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary to-secondary px-4 py-3 text-white">
            <h1 className="text-4xl md:text-4xl font-bold mb-2">
              Privacy Policy
            </h1>
            <p className="text-indigo-100 text-lg max-w-2xl">
              Your trust is our priority. This Privacy Policy explains how{" "}
              <span className="font-semibold">
                Technorizen Software Solution Pvt Ltd
              </span>{" "}
              collects, uses, shares, and protects your information when you use
              our Human Resource Management System (HRMS).
            </p>
          </div>

          {/* Policy Sections */}
          <div className="px-6 md:px-10 py-10 space-y-10">
            {/* 1. Introduction */}
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Technorizen Software Solution Pvt Ltd ("Company," "we," "us," or
                "our") is committed to protecting the privacy and security of
                your personal information. This Privacy Policy describes our
                practices in connection with information collected through our
                Human Resource Management System (HRMS), which is used for
                managing employee data, payroll, attendance, performance
                evaluations, recruitment, and other HR-related functions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using our HRMS, you acknowledge that you have
                read and understood this Privacy Policy. If you are an employee,
                this policy applies in conjunction with your employment contract
                and any applicable company policies.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                2. Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect the following categories of personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-xl">
                  <h3 className="font-semibold text-indigo-800 text-lg mb-2">
                    Personal Identifiers
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Full name, date of birth, gender</li>
                    <li>Home address, phone number, personal email</li>
                    <li>Government IDs (PAN, Aadhaar, passport, etc.)</li>
                    <li>Employee ID, photograph, signature</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl">
                  <h3 className="font-semibold text-indigo-800 text-lg mb-2">
                    Employment & Financial
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Job title, department, reporting manager</li>
                    <li>Salary, bank account details, tax information</li>
                    <li>Attendance records, leave balances, overtime</li>
                    <li>Performance reviews, disciplinary actions</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl">
                  <h3 className="font-semibold text-indigo-800 text-lg mb-2">
                    Technical & Usage Data
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>IP address, browser type, device information</li>
                    <li>Login timestamps, access logs, feature usage</li>
                    <li>Cookies and session data for authentication</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl">
                  <h3 className="font-semibold text-indigo-800 text-lg mb-2">
                    Sensitive Data (with consent)
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      Health information (medical certificates, insurance
                      claims)
                    </li>
                    <li>Biometric data (if used for attendance)</li>
                    <li>Criminal background checks (where permitted by law)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. How We Use Your Information */}
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  3
                </span>
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your personal data is used strictly for legitimate HR and
                business purposes, including:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start space-x-2">
                  <span className="text-indigo-600 text-lg">✓</span>
                  <span className="text-gray-700">
                    Processing payroll & tax filings
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-indigo-600 text-lg">✓</span>
                  <span className="text-gray-700">
                    Managing attendance & leave requests
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-indigo-600 text-lg">✓</span>
                  <span className="text-gray-700">
                    Performance appraisals & career development
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-indigo-600 text-lg">✓</span>
                  <span className="text-gray-700">
                    Compliance with labor laws & statutory reporting
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-indigo-600 text-lg">✓</span>
                  <span className="text-gray-700">
                    Benefits administration (insurance, reimbursements)
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-indigo-600 text-lg">✓</span>
                  <span className="text-gray-700">
                    System security audits & access control
                  </span>
                </div>
              </div>
            </section>

            {/* 4. Data Sharing & Disclosure */}
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                4. Data Sharing & Disclosure
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We do not sell your personal information. However, we may share
                your data in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>
                  <span className="font-medium">Service Providers:</span>{" "}
                  Third-party vendors who assist with payroll processing, cloud
                  hosting, IT support, and background checks (under strict
                  confidentiality agreements).
                </li>
                <li>
                  <span className="font-medium">Legal Compliance:</span> When
                  required by law, court order, or government regulations (e.g.,
                  tax authorities, labor departments).
                </li>
                <li>
                  <span className="font-medium">Corporate Transactions:</span>{" "}
                  In the event of a merger, acquisition, or asset sale, your
                  data may be transferred with notice.
                </li>
                <li>
                  <span className="font-medium">Internal Use:</span> Authorized
                  HR, IT, and management personnel who need access for
                  legitimate business functions.
                </li>
              </ul>
            </section>

            {/* 5. Data Security & Retention */}
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  5
                </span>
                5. Data Security & Retention
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We implement industry-standard security measures including
                encryption (TLS 1.3), role-based access controls, multi-factor
                authentication, regular security audits, and employee training
                to protect your data from unauthorized access, alteration, or
                destruction.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Your personal information will be retained for as long as you
                are an employee and for the duration required to comply with
                legal obligations (e.g., tax records for 7 years, employment
                contracts for 3 years post-termination) or until a valid
                deletion request is received.
              </p>
            </section>

            {/* 6. Your Privacy Rights */}
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  6
                </span>
                6. Your Privacy Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Depending on your jurisdiction (including India's DPDP Act and
                GDPR where applicable), you may have the following rights:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-indigo-800">Right to Access</h3>
                  <p className="text-sm text-gray-600">
                    Request a copy of your personal data we hold.
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-indigo-800">
                    Right to Rectification
                  </h3>
                  <p className="text-sm text-gray-600">
                    Correct inaccurate or incomplete information.
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-indigo-800">
                    Right to Erasure
                  </h3>
                  <p className="text-sm text-gray-600">
                    Request deletion of your data, subject to legal retention.
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-indigo-800">
                    Right to Restrict Processing
                  </h3>
                  <p className="text-sm text-gray-600">
                    Limit how we use your data in certain cases.
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-indigo-800">
                    Data Portability
                  </h3>
                  <p className="text-sm text-gray-600">
                    Receive your data in a structured, machine-readable format.
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-indigo-800">Right to Object</h3>
                  <p className="text-sm text-gray-600">
                    Object to processing based on legitimate interests.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                To exercise these rights, contact our Data Protection Officer at{" "}
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                  privacy@technorizen.com
                </span>
                .
              </p>
            </section>

            {/* 7. Cookies & Tracking Technologies */}
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  7
                </span>
                7. Cookies & Tracking Technologies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our HRMS uses essential cookies for authentication, session
                management, and security. We do not use tracking cookies for
                marketing purposes. You can disable cookies via browser
                settings, but this may affect system functionality. Third-party
                providers integrated into the HRMS may set their own cookies as
                per their policies.
              </p>
            </section>

            {/* 8. International Data Transfers */}
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  8
                </span>
                8. International Data Transfers
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Technorizen may store and process your data on servers located
                in India or other countries where our cloud service providers
                operate. We ensure that any cross-border data transfer complies
                with applicable data protection laws through standard
                contractual clauses or adequacy decisions.
              </p>
            </section>

            {/* 9. Children's Privacy */}
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  9
                </span>
                9. Children's Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our HRMS is strictly for employees and job applicants aged 18
                years or older. We do not knowingly collect personal information
                from minors. If we discover such data, we will delete it
                immediately.
              </p>
            </section>

            {/* 10. Changes to This Policy */}
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  10
                </span>
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this policy from time to time. Material changes
                will be communicated via email or through a prominent notice in
                the HRMS. The "Last Updated" date at the top of this page
                indicates when the policy was last revised. Continued use of the
                system constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* 11. Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  11
                </span>
                11. Contact Us
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-3">
                  If you have any questions, concerns, or complaints about this
                  Privacy Policy or our data practices, please contact our
                  Privacy Team:
                </p>
                <div className="space-y-2 text-gray-800">
                  <p>
                    <span className="font-semibold">Company:</span> Technorizen
                    Software Solution Pvt Ltd
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span> Sapphire
                    House, 402 A, B, C, Sapna Sangeeta Rd, Indore, Madhya
                    Pradesh 452001, India
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href="mailto:privacy@technorizen.com"
                      className="text-indigo-600 hover:underline"
                    >
                      privacy@technorizen.com
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> +91-78284
                    07092
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-200 pt-6">
          © {new Date().getFullYear()} Technorizen Software Solution Pvt Ltd.
          All rights reserved. This HRMS Privacy Policy is a legally binding
          document.
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
