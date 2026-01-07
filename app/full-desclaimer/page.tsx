"use client";
import React from "react";
import {
  Building,
  Mail,
  Globe,
  Hash,
  ShieldAlert,
  AlertTriangle,
  Scale,
  Copyright,
  Gavel,
  CheckCircle2,
  Info,
} from "lucide-react";

const FullDisclaimerPage: React.FC = () => {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-blue-50 selection:text-blue-900">
      <div className="relative bg-slate-50 pt-32 pb-20 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-600 uppercase tracking-wider mb-6">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            Legal Notice
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Full Disclaimer
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Please read the following terms and conditions carefully regarding
            our products, affiliations, and liabilities.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="bg-slate-900 p-8 sm:p-10 text-white">
            <h2 className="text-2xl font-bold mb-6">Entity Declaration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                    Company Name
                  </p>
                  <p className="font-semibold text-lg">
                    Own Silent International Limited
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                    Registration No.
                  </p>
                  <p className="font-mono flex items-center gap-2">
                    <Hash className="w-4 h-4" /> 76215481
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-blue-400 mt-0.5" />
                  <p className="text-slate-300 leading-relaxed">
                    2/F, Tower 1, Tern Centre, 237 Queen’s Road Central, Sheung
                    Wan, Hong Kong
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a
                    href="mailto:sales@ownsilent.international"
                    className="text-white hover:text-blue-300 transition-colors"
                  >
                    sales@ownsilent.international
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <a
                    href="https://www.ownsilent.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300 transition-colors"
                  >
                    www.ownsilent.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 text-sm font-bold">
                  1
                </span>
                Brand & Trademark References
              </h3>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mb-6">
                <p className="text-slate-700 font-medium mb-4">
                  Own Silent International Limited is{" "}
                  <span className="text-red-600">NOT</span> affiliated,
                  authorized, endorsed, or officially connected with any of the
                  following automobile manufacturers. All references are for
                  identification purposes only.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-slate-600">
                  {[
                    "Ferrari N.V.",
                    "Rolls-Royce",
                    "Lamborghini",
                    "McLaren",
                    "Bentley Motors",
                    "Audi AG",
                    "BMW AG",
                    "Mercedes-Benz",
                    "Porsche AG",
                    "Honda Motor Co.",
                    "General Motors",
                    "Ford Motor Co.",
                    "Toyota",
                    "Nissan",
                  ].map((brand) => (
                    <div key={brand} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-500 italic">
                Use of any brand, logo, or product reference does not imply
                sponsorship or endorsement by the respective manufacturer.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 text-sm font-bold">
                  2
                </span>
                Product Nature & Scope
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" /> Identification
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Any reference to manufacturer names, symbols, or part
                    numbers is intended solely for identification and
                    compatibility purposes. Our products are not OEM unless
                    explicitly stated.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />{" "}
                    Offerings
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Aftermarket & Custom Parts</li>
                    <li>• Carbon Fiber & Forged Components</li>
                    <li>• Performance Brake Systems</li>
                    <li>• Genuine OEM Parts (Traded)</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Limitation of Liability & Risk
              </h3>
              <p className="text-red-800 text-sm leading-relaxed mb-4">
                Own Silent International Limited assumes{" "}
                <strong>no responsibility</strong> for damages, injury, or loss
                resulting from the use, installation, or modification of any
                product. Vehicle modifications can affect safety, handling,
                stability, and warranty coverage.
              </p>
              <p className="text-red-700 text-sm font-bold uppercase tracking-wide">
                Customers accept full responsibility for all risks associated
                with installation and use.
              </p>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-slate-400" /> Legal Compliance
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Customers are responsible for ensuring compliance with local,
                  state, and national laws. Some products may be for off-road or
                  track use only. Please verify legality in your jurisdiction
                  before purchase.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Copyright className="w-5 h-5 text-slate-400" />{" "}
                  Intellectual Property
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Third-party content is used for reference only. Unauthorized
                  use of intellectual property belonging to Own Silent or third
                  parties is strictly prohibited.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Gavel className="w-6 h-6 text-slate-700" />
                Governing Law
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All transactions, disputes, or claims arising from the use of
                this website or the purchase of our products are governed by{" "}
                <strong>Hong Kong law</strong>, and the courts of Hong Kong
                shall have exclusive jurisdiction. If any provision of this
                disclaimer is found invalid, the remaining provisions shall
                remain in full force.
              </p>
            </section>

            <div className="pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm">
                By using this website, you acknowledge that you have read,
                understood, and agreed to this disclaimer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FullDisclaimerPage;