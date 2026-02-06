"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const brands = [
  { name: "BMW", image: "/carlogos/1200px-BMW_PNG.avif" },
  { name: "Mercedes-Benz", image: "/carlogos/Mercedes-Benz-Logo.avif" },
  { name: "Audi", image: "/carlogos/Audi-logo-1999-1920x1080.avif" },
  { name: "Porsche", image: "/carlogos/Porsche_PNG.avif" },
  { name: "Lamborghini", image: "/carlogos/Lambo_PNG.avif" },
  { name: "Ferrari", image: "/images/Blogs/ferrari.avif" },
  { name: "Land Rover", image: "/carlogos/1200px-LandRover.avif" },
  { name: "Jaguar", image: "/carlogos/Jaguar_PNG.avif" },
  { name: "Rolls-Royce", image: "/carlogos/RR_PNG.avif" },
  { name: "Mini", image: "/carlogos/Mini_PNG.avif" },
  { name: "Bentley", image: "/carlogos/cd3619f9e171f176bf0774017147170d.avif" },
  { name: "Toyota", image: "/images/Blogs/toyota.png" },
  { name: "Ford", image: "/images/Blogs/ford.webp" },
  { name: "Nissan", image: "/images/Blogs/nissan.jpeg" },
  { name: "Volkswagen", image: "/images/Blogs/vw.jpeg" },
];

export default function TrustedBrandsSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Partnering with the World's Best
          </h2>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
            We collaborate with leading automotive brands to bring you
            unparalleled quality and performance.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link
              href={`/brands/${brand.name.toLowerCase().replace(/ /g, "-")}`}
              key={brand.name}
              className="group"
            >
              <div className="bg-slate-50 h-32 rounded-2xl p-6 flex items-center justify-center border border-slate-200/80 transition-all duration-300 ease-in-out hover:bg-white hover:shadow-lg hover:-translate-y-1.5 hover:border-[#176FC0]/50">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={120}
                  height={40}
                  className="w-full max-h-12 object-contain filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
