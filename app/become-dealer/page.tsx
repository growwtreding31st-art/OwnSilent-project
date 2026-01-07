"use client";
import React from "react";
import {
  ShieldCheck,
  Package,
  Globe,
  DollarSign,
  Send,
  ClipboardCheck,
  PartyPopper,
  CheckCircle,
  Mail,
  ArrowRight,
  Briefcase,
} from "lucide-react";

const BecomeDealerPage: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Premium Products & Expertise",
      description:
        "Access our exclusive range of custom-made parts, manufactured to OEM-level standards and strict quality certifications.",
    },
    {
      icon: Package,
      title: "Extensive Product Range",
      description:
        "Offer everything from carbon-ceramic brakes and forged wheels to luxury VIP interiors and advanced electronic retrofits.",
    },
    {
      icon: Globe,
      title: "Worldwide Shipping & Support",
      description:
        "We ship to dealers and distributors globally, providing dedicated support for custom orders, bulk shipments, and logistics.",
    },
    {
      icon: DollarSign,
      title: "Competitive Dealer Pricing",
      description:
        "Gain access to preferential pricing and bulk order discounts, allowing you to increase margins and grow your business.",
    },
  ];

  const productCategories = [
    "Carbon-Ceramic Brakes",
    "Forged & Carbon Wheels",
    "Luxury Interior Conversions",
    "Carbon Fiber Steering Wheels",
    "Exterior Conversion Body Kits",
    "Headlight & Taillight Upgrades",
    "Electronic Retrofit Kits",
    "Genuine & Used OEM Parts",
  ];

  const applicationSteps = [
    {
      icon: Send,
      title: "Step 1: Contact Us",
      description:
        "Email us your business details, client base, and distribution capacity to start the application process.",
    },
    {
      icon: ClipboardCheck,
      title: "Step 2: Application Review",
      description:
        "Our dedicated team will review your application and respond within 3-5 business days.",
    },
    {
      icon: PartyPopper,
      title: "Step 3: Get Approved",
      description:
        "Once approved, you will receive our exclusive dealer pricing, catalogues, and full product access.",
    },
  ];

  const dealerRequirements = [
    "A valid business license or registered dealership.",
    "Commitment to professional product representation.",
    "Ability to provide excellent customer service.",
    "Capacity to handle custom orders and logistics.",
  ];

  return (
    <main className="bg-white font-sans selection:bg-blue-50 selection:text-blue-900">
      <section className="relative pt-32 pb-24 border-b border-slate-200 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-600 uppercase tracking-wider mb-6">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            Partnership Program
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Become an Official
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Own Silent Dealer
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Join our global network and partner with a leader in
            high-performance automotive parts, custom luxury interiors, and
            innovative vehicle upgrades.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Why Partner With Own Silent?
            </h2>
            <p className="text-lg text-slate-500">
              Gain a competitive edge with our premium products, expert support,
              and global reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200 transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Our Premier Product Categories
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Offer your clients an unparalleled selection of high-demand
              automotive solutions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {productCategories.map((category) => (
              <div
                key={category}
                className="bg-white/10 backdrop-blur-md border border-white/10 py-3 px-6 rounded-full text-white font-medium hover:bg-white hover:text-slate-900 transition-all duration-300 cursor-default"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              A Simple Path to Partnership
            </h2>
            <p className="text-lg text-slate-500">
              Becoming a dealer is a straightforward process. Follow these three
              easy steps to get started.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-200"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
              {applicationSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center relative group">
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-100 flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all z-10">
                    <step.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-16">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6">
                  What We Look For
                </h2>
                <p className="text-lg text-slate-500 mb-8">
                  To maintain our standard of excellence, we seek partners who are
                  committed to quality and customer service.
                </p>
                <ul className="space-y-5">
                  {dealerRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 p-10 lg:p-16 flex flex-col justify-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    Let's start the conversation and explore how we can grow
                    together. Contact our team today.
                  </p>
                  <a
                    href="mailto:sales@ownsilent.international?subject=Dealer Application Inquiry"
                    className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all group"
                  >
                    <Mail className="w-5 h-5" />
                    Request Access
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BecomeDealerPage;