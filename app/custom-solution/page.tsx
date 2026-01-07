"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Cpu, Wrench, Globe, CheckCircle, Mail, Car, Armchair, GaugeCircle, CircuitBoard } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    category: 'Exterior' | 'Interior' | 'Performance' | 'Electronics';
    description: string;
}

const portfolioProjects: Project[] = [
    {
        id: 1,
        title: "Mercedes Maybach W223 Interior",
        category: 'Interior',
        description: "Full luxury VIP seat conversion with multi-zone massage and refrigeration.",
    },
    {
        id: 2,
        title: "Range Rover L460 Conversion",
        category: 'Exterior',
        description: "Complete body kit transformation from an L405 model to the latest L460 design.",
    },
    {
        id: 3,
        title: "Carbon-Ceramic Brake System",
        category: 'Performance',
        description: "Aerospace-grade C/SiC rotors for a supercar, ensuring zero fade and reduced mass.",
    },
    {
        id: 4,
        title: "Rolls-Royce Starlight Headliner",
        category: 'Interior',
        description: "Bespoke starlight headliner installation with customizable fiber optic patterns.",
    },
    {
        id: 5,
        title: "BMW CarPlay & Android Auto Retrofit",
        category: 'Electronics',
        description: "Seamless integration of modern infotainment into an older BMW iDrive system.",
    },
    {
        id: 6,
        title: "Custom Forged Carbon Wheels",
        category: 'Performance',
        description: "Lightweight, performance-oriented forged carbon fiber wheels with a unique finish.",
    },
    {
        id: 7,
        title: "BMW F10 to 2021 Facelift",
        category: 'Exterior',
        description: "Full exterior conversion including headlights, taillights, and aerodynamic components.",
    },
    {
        id: 8,
        title: "Electric Side Steps Retrofit",
        category: 'Electronics',
        description: "High-quality, seamlessly installed electric side steps for a luxury SUV.",
    },
    {
        id: 9,
        title: "Full Alcantara & Carbon Interior",
        category: 'Interior',
        description: "Complete dashboard, steering wheel, and center console overhaul in premium materials.",
    }
];

const filterCategories = ['All', 'Exterior', 'Interior', 'Performance', 'Electronics'];

const categoryIcons = {
    Exterior: Car,
    Interior: Armchair,
    Performance: GaugeCircle,
    Electronics: CircuitBoard,
};

const CustomizationPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(portfolioProjects);

    useEffect(() => {
        if (activeCategory === 'All') {
            setFilteredProjects(portfolioProjects);
        } else {
            const filtered = portfolioProjects.filter(
                (project) => project.category === activeCategory
            );
            setFilteredProjects(filtered);
        }
    }, [activeCategory]);

    return (
        <main className="bg-white">
            <section className="relative py-16 sm:py-28 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="font-semibold text-amber-600 uppercase tracking-wider">Bespoke Automotive Solutions</span>
                        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Transform Your Vehicle Into a Masterpiece
                        </h1>
                        <p className="mt-6 text-lg text-slate-600">
                            We specialize in delivering bespoke customization solutions for luxury cars, SUVs, and supercars, helping you redefine performance, comfort, and aesthetics.
                        </p>
                    </div>
                </div>
            </section>

            <section id="portfolio" className="py-10 sm:py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                            Our Customization Portfolio
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                           Explore our work across different categories of automotive excellence.
                        </p>
                    </div>

                    <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-12">
                        {filterCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-colors duration-300 ${
                                    activeCategory === category
                                        ? 'bg-slate-900 text-white shadow-md'
                                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => {
                            const Icon = categoryIcons[project.category as keyof typeof categoryIcons];
                            return (
                                <div key={project.id} className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="flex-shrink-0 mb-6">
                                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">{project.category}</span>
                                        <h3 className="mt-2 text-xl font-bold text-slate-900">{project.title}</h3>
                                        <p className="mt-2 text-slate-600">{project.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 py-10 sm:py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                            Why Choose Own Silent?
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                           Our comprehensive expertise and commitment to quality set us apart.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Layers, title: "Comprehensive Expertise", desc: "Decades of experience across multiple automotive categories." },
                            { icon: Wrench, title: "In-House Manufacturing", desc: "Ensuring precision quality control and exclusivity." },
                            { icon: Globe, title: "Global Reach", desc: "Solutions for individual customers and dealers worldwide." },
                            { icon: Cpu, title: "Cutting-Edge Technology", desc: "Using aerospace-grade materials and advanced engineering." },
                        ].map((item, index) => (
                             <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200/80 text-center">
                                <div className="flex justify-center mb-5">
                                    <div className="bg-amber-100 text-amber-600 p-4 rounded-full">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                                <p className="mt-2 text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-10 sm:py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="max-w-4xl mx-auto text-center">
                        <span className="font-semibold text-amber-600 uppercase tracking-wider">Endless Possibilities</span>
                        <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                            Bespoke Design Services
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                            Every project is a collaboration. We work with you to craft a fully personalized solution based on your unique vision and requirements. Your vehicle, your rules.
                        </p>
                        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-left max-w-2xl mx-auto">
                            {[
                                "Premium leather, Alcantara, and exotic fabrics.",
                                "Carbon fiber, forged carbon, aluminum, and titanium.",
                                "Custom colors, textures, and stitching patterns.",
                                "One-of-a-kind components and personalized branding.",
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                                    <span className="text-slate-700 text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                     </div>
                </div>
            </section>
            
            <section className="bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                     <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Ready to Build Your Dream Car?</h3>
                                <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                                   Contact us today to request a custom quote for parts, interior upgrades, or complete vehicle transformations.
                                </p>
                            </div>
                            {/* <div className="flex-shrink-0">
                                <a 
                                    href="mailto:sales@ownsilent.international?subject=Customization Inquiry"
                                    className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-base font-bold text-white transition-transform duration-300 hover:bg-slate-700 hover:scale-105"
                                >
                                    <Mail className="w-5 h-5" />
                                    Request a Quote
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CustomizationPage;