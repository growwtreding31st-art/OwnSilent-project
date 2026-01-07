"use client"
import React from 'react';
import Link from 'next/link';
import Image from "next/image";

const brands = [
  { name: "BMW", image: "/images/Blogs/BMW.jpeg" },
  { name: "Mercedes-Benz", image: "/images/Blogs/mercedes.jpg" },
  { name: "Audi", image: "/images/Blogs/audi.webp" },
  { name: "Porsche", image: "/images/Blogs/porsche.png" },
  { name: "Lamborghini", image: "/images/Blogs/lamborghini.png" },
  { name: "Ferrari", image: "/images/Blogs/ferrari.avif" },
  { name: "Toyota", image: "/images/Blogs/toyota.png" },
  { name: "Ford", image: "/images/Blogs/ford.webp" },
  { name: "Nissan", image: "/images/Blogs/nissan.jpeg" },
  { name: "Honda", image: "/images/Blogs/honda.svg" },
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