"use client";
import React from "react";
import {
  Building,
  Mail,
  Globe,
  Hash,
  ShieldCheck,
  Calendar,
  FileText,
  Lock,
} from "lucide-react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-blue-50 selection:text-blue-900">
      <div className="relative bg-slate-50 pt-32 pb-20 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-600 uppercase tracking-wider mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Legal Documentation
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Last Updated: November 10, 2025
            </span>
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Effective: November 10, 2025
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-slate prose-lg max-w-none">
          <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100 mb-12">
            <p className="text-lg text-slate-700 leading-relaxed m-0">
              Welcome to <strong>Own Silent International Limited</strong> (“Own
              Silent”, “we”, “our”, or “us”). We respect your privacy and are
              committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, and safeguard your
              information when you visit our website, make a purchase, or
              interact with us in any way.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white text-sm">
                  1
                </span>
                Information We Collect
              </h2>
              <p className="text-slate-600 mb-4">
                We may collect the following types of information from you:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Personal Information
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 list-none pl-0">
                    <li>• Full Name</li>
                    <li>• Email Address</li>
                    <li>• Contact Number</li>
                    <li>• Billing and Shipping Address</li>
                    <li>• Payment Information (securely processed)</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Non-Personal Information
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 list-none pl-0">
                    <li>• Browser type & IP address</li>
                    <li>• Device identifiers & OS</li>
                    <li>• Access times & pages visited</li>
                    <li>• Cookies & analytics data</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white text-sm">
                  2
                </span>
                How We Use Your Information
              </h2>
              <p className="text-slate-600 mb-4">We use your information to:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 list-none">
                {[
                  "Process and fulfill orders and shipments",
                  "Communicate order updates and invoices",
                  "Provide customer service and technical support",
                  "Improve our website and product offerings",
                  "Send promotional offers (with consent)",
                  "Detect and prevent fraud",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-slate-600 text-sm"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white text-sm">
                  3
                </span>
                Sharing of Information
              </h2>
              <p className="text-slate-600 mb-4">
                We do not sell or rent your personal data. We may share your
                information only with:
              </p>
              <ul className="pl-5 space-y-2 text-slate-600 list-disc marker:text-slate-300">
                <li>
                  Payment service providers (for secure transaction processing)
                </li>
                <li>Shipping and logistics partners</li>
                <li>IT support and analytics providers</li>
                <li>
                  Marketing and advertising platforms (only if you have opted in)
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-500 italic">
                All third-party partners are required to comply with strict
                confidentiality and data protection obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white text-sm">
                  4
                </span>
                Data Security
              </h2>
              <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <Lock className="w-6 h-6 text-slate-400 mt-1 flex-shrink-0" />
                <p className="text-slate-600 m-0">
                  We use SSL encryption, secure servers, and strict internal
                  procedures to protect your personal information. While we take
                  every reasonable measure, please note that no online system
                  can guarantee absolute security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white text-sm">
                  5
                </span>
                Cookies & Tracking
              </h2>
              <p className="text-slate-600">
                Our website uses cookies to improve website functionality,
                remember your preferences, and analyze traffic. You can control
                cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white text-sm">
                  6
                </span>
                Your Rights
              </h2>
              <p className="text-slate-600 mb-4">
                Depending on your region, you may have the right to access,
                correct, delete, or object to the processing of your personal
                data.
              </p>
              <p className="text-slate-600">
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:privacy@ownsilent.com"
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  privacy@ownsilent.com
                </a>
                .
              </p>
            </section>

            <div className="h-px bg-slate-200 my-12"></div>

            <section className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  7. Data Retention
                </h3>
                <p className="text-slate-600 text-sm">
                  We retain your information only as long as necessary to
                  fulfill the purposes described in this policy, comply with
                  legal obligations, and resolve disputes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  8. International Data Transfers
                </h3>
                <p className="text-slate-600 text-sm">
                  As a Hong Kong–registered company, we may transfer and store
                  data in countries outside your own. We ensure all transfers
                  comply with applicable data protection laws.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  9. Third-Party Links & Children's Privacy
                </h3>
                <p className="text-slate-600 text-sm">
                  We are not responsible for privacy practices of third-party
                  websites linked from ours. We do not knowingly collect data
                  from children under 18.
                </p>
              </div>
            </section>

            <div className="mt-16 bg-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
              <h2 className="text-2xl font-bold mb-8 relative z-10">
                Contact Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                      Company
                    </h4>
                    <p className="font-bold text-lg">
                      Own Silent International Limited
                    </p>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                      <Hash className="w-4 h-4" /> Reg: 76215481
                    </div>
                  </div>
                  <div>
                    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                      Location
                    </h4>
                    <div className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-blue-400 mt-0.5" />
                      <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
                        2/F, Tower 1, Tern Centre,
                        <br />
                        237 Queen’s Road Central,
                        <br />
                        Sheung Wan, Hong Kong
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                      Get in Touch
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Email Us</p>
                          <a
                            href="mailto:sales@ownsilent.international"
                            className="text-white hover:text-blue-300 transition-colors font-medium"
                          >
                            sales@ownsilent.international
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Website</p>
                          <a
                            href="https://www.ownsilent.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-300 transition-colors font-medium"
                          >
                            www.ownsilent.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;