"use client"
import React from 'react';
import { ChevronRight } from 'lucide-react';

const brands = [
  'Alfa Romeo', 'Aston Martin', 'Bentley', 'BMW',
  'Bugatti', 'Ferrari', 'Lamborghini', 'Maserati', 
  'McLaren', 'Porsche', 'Rolls-Royce'
];

export default function BrandsSection({ currentBrand, onBrandSelect }) {
  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Our <span className="text-orange-500">Brands</span>
        </h2>
        <div className="relative">
          <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto pb-4 -mb-4">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => onBrandSelect(brand)}
                className={`flex-shrink-0 whitespace-nowrap text-base font-medium transition-all duration-200 ease-in-out ${
                    currentBrand === brand
                      ? 'bg-orange-500 text-white rounded-lg px-4 py-2 relative'
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
              >
                {brand}
                {currentBrand === brand && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-white/60 rounded-full" />
                )}
              </button>
            ))}
            <div className="flex-shrink-0">
              <ChevronRight className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}