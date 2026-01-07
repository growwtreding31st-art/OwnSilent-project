"use client"
import React from 'react'
import { Truck, MapPin, Award, PhoneCall } from 'lucide-react'

// Color Theme: #176FC0, #0F4C85, #1461A8

const features = [
    {
        icon: Truck,
        title: "Fast & Reliable Shipping",
        description: "Orders dispatched promptly to your doorstep, anywhere in the world.",
    },
    {
        icon: MapPin,
        title: "Global Partner Network",
        description: "Delivering across every corner of the globe with trusted partners.",
    },
    {
        icon: Award,
        title: "Engineering You Can Trust",
        description: "Our #1 priority is offering premium, track-proven quality.",
    },
    {
        icon: PhoneCall,
        title: "Dedicated Expert Support",
        description: "Our specialist team is here to help with your technical queries.",
    },
];

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="relative group text-center flex flex-col h-full mt-10">
    <div className="relative bg-white p-8 rounded-2xl border border-slate-200/80 transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:shadow-[#176FC0]/10 group-hover:-translate-y-2 flex-grow flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-[#176FC0] to-[#1461A8] shadow-lg shadow-blue-600/20 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-blue-600/30">
          <Icon className="w-9 h-9 text-white" />
        </div>
      </div>
      <div className="pt-10 flex-grow flex flex-col justify-center">
        <h3 className="font-bold text-lg text-slate-900">{title}</h3>
        <p className="mt-2 text-base text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default function WhyChooseUsSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            The Own Silent <span className="text-[#176FC0]">Advantage</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg leading-8 text-slate-600">
            We are committed to providing an unmatched service and the highest
            quality products, engineered for excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}