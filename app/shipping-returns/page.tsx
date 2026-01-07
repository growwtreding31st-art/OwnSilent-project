"use client";
import React from "react";
import {
  Mail,
  Globe,
  Truck,
  RotateCcw,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Package,
  MapPin,
  CheckCircle,
} from "lucide-react";

const ShippingReturnsPage: React.FC = () => {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-blue-50 selection:text-blue-900">
      <div className="relative bg-slate-50 pt-32 pb-20 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-600 uppercase tracking-wider mb-6">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            Policy & Guidelines
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Shipping & Returns
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Effective Date:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-12 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-8 mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Own Silent International Limited
              </h2>
              <div className="flex items-start gap-2 text-slate-500 text-sm mt-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" />
                <p>
                  2/F, Tower 1, Tern Centre, 237 Queen’s Road Central, Sheung
                  Wan, Hong Kong
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:sales@ownsilent.international"
                className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-blue-50 px-4 py-2 rounded-xl"
              >
                <Mail className="w-4 h-4" />
                sales@ownsilent.international
              </a>
              <a
                href="https://www.ownsilent.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-blue-50 px-4 py-2 rounded-xl"
              >
                <Globe className="w-4 h-4" />
                www.ownsilent.com
              </a>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <RotateCcw className="w-4 h-4" />
                </span>
                Refund Policy
              </h3>
              <ul className="space-y-3 pl-2">
                {[
                  "Refunds accepted up to 48 hours after payment.",
                  "Funds are non-refundable after 48 hours (transfer to manufacturing).",
                  "Exchanges available for fitting issues.",
                  "Shipping charges for exchanges are borne by the customer.",
                  "Custom-made products are generally non-returnable.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </span>
                Production Lead Time
              </h3>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed">
                <p className="mb-2">
                  <strong className="text-slate-900">Standard Time:</strong> 2–15
                  weeks for custom/special orders depending on complexity.
                </p>
                <p>
                  Times may vary based on volume. Expected shipping dates provided
                  at order time.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                Compatibility & Shipping
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 text-sm">
                    Check Compatibility
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Customer responsibility to verify vehicle fitment. No returns
                    for incorrect purchases due to incompatibility.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 text-sm">
                    Worldwide Shipping
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Global delivery available. Customs, duties & taxes are{" "}
                    <strong className="text-slate-700">not included</strong> and
                    are the customer's responsibility.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                Damage & Issues
              </h3>
              <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <p className="font-bold text-red-800 mb-3 text-sm">
                  Required steps for damaged/ill-fitting products:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-red-700">
                  <li>Record high-quality unboxing video showing all packaging.</li>
                  <li>Record complete installation process clearly.</li>
                  <li>
                    Submit both to{" "}
                    <a
                      href="mailto:sales@ownsilent.international"
                      className="underline hover:text-red-900"
                    >
                      sales@ownsilent.international
                    </a>
                  </li>
                </ol>
                <p className="mt-3 text-xs text-red-600 italic">
                  *Replacement provided upon verification of defect/damage.
                </p>
              </div>
            </section>

            <div className="h-px bg-slate-100 my-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">
                  Shipping Insurance
                </h3>
                <p className="text-sm text-slate-600">
                  Optional for high-value items. We are not liable for transit
                  loss/damage without insurance.
                </p>
              </section>
              <section>
                <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">
                  Dealer Policy
                </h3>
                <p className="text-sm text-slate-600">
                  Dealers arranging own shipping take responsibility once goods
                  leave our warehouse.
                </p>
              </section>
              <section>
                <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">
                  Tracking
                </h3>
                <p className="text-sm text-slate-600">
                  Tracking ID provided post-dispatch for real-time updates via
                  courier website.
                </p>
              </section>
              <section>
                <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">
                  Packaging
                </h3>
                <p className="text-sm text-slate-600">
                  Report missing items within 48 hours. Damage requires video proof as per policy.
                </p>
              </section>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl mt-8">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                Legal Disclaimers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-300">
                <div>
                  <h4 className="font-bold text-white mb-2">Liability</h4>
                  <p className="leading-relaxed">
                    Not responsible for customs delays or force majeure. No
                    liability for indirect/consequential damages from installation
                    or use.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Warranty</h4>
                  <p className="leading-relaxed">
                    Aftermarket parts have limited warranty. Void if improperly
                    installed or modified.
                  </p>
                </div>
              </div>
              <p className="mt-6 pt-6 border-t border-slate-700 text-xs text-slate-400 text-center">
                Own Silent International Limited reserves the final right to approve
                or reject requests based on internal review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShippingReturnsPage;