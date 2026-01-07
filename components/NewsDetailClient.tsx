"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type NewsArticle, type Car, type Part } from '@/lib/newsData';
import { ArrowLeft, Car as CarIcon, Wrench, Share2, Calendar, User, Star, ChevronDown, ArrowRight } from 'lucide-react';

export default function NewsDetailClient({ article, car, part, relatedNews, allCars }: { article: NewsArticle; car?: Car; part?: Part; relatedNews: NewsArticle[], allCars: Car[] }) {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { question: "Is this part compatible with my car model?", answer: "This specific part is designed for the model mentioned in the article. For compatibility with other models, please check the product page or contact our support team with your vehicle's VIN." },
    { question: "What is the warranty period for this part?", answer: "All our parts come with a standard 1-year manufacturer warranty against defects. Extended warranty options are available at checkout." },
    { question: "Do I need special tools for installation?", answer: "While some parts can be installed with basic tools, we recommend professional installation for optimal performance and safety. The product page may list any special tools required." },
    { question: "What is your return policy for this item?", answer: "We offer a 30-day return policy for unused and unopened parts in their original packaging. Please visit our Returns & Refunds page for more detailed information." },
  ];

  const testimonials = [
    { name: "Mark T.", rating: 5, review: "The quality of this brake kit is outstanding. Perfect fit for my BMW and the stopping power is incredible. Highly recommended!" },
    { name: "Jennifer S.", rating: 5, review: "Fast shipping and the part was exactly as described. My car feels brand new again. Will definitely shop here again." },
    { name: "David Chen", rating: 4, review: "Good value for the price. The installation was straightforward, though the instructions could have been a bit clearer. Overall, very satisfied." },
  ];

  return (
    <main className="bg-slate-50">
      
      <section className="relative h-[450px] w-full">
        <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative z-10 h-full flex flex-col justify-between text-white container mx-auto px-4 py-8">
            <nav aria-label="Breadcrumb" className="text-sm">
                <ol className="flex items-center gap-2">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><span className="text-slate-400">/</span></li>
                    <li><Link href="/news" className="hover:underline">Blog</Link></li>
                    <li><span className="text-slate-400">/</span></li>
                    <li className="font-semibold text-white truncate max-w-xs">{article.title}</li>
                </ol>
            </nav>
            <div className="max-w-4xl">
                <div className="flex items-center gap-3 text-sm font-semibold mb-3">
                    <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1.5 rounded-full flex items-center"><CarIcon className="w-4 h-4 mr-2"/>{car?.brand} {car?.model}</span>
                    <span className="bg-slate-100 text-slate-800 font-bold px-3 py-1.5 rounded-full flex items-center"><Wrench className="w-4 h-4 mr-2"/>{part?.name}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
                    {article.title}
                </h1>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-[-80px] relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl shadow-2xl shadow-slate-200/50">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-5 mb-8 text-sm text-slate-500">
              <div className="flex items-center space-x-6">
                <div className="flex items-center gap-2"><User className="w-4 h-4 text-slate-400"/> By <strong>{article.author}</strong></div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400"/> {article.date}</div>
              </div>
              <button className="flex items-center gap-2 font-semibold text-slate-600 hover:text-amber-600 transition-colors">
                <Share2 className="w-4 h-4"/>
                <span>Share</span>
              </button>
            </div>
            <div 
              className="prose prose-lg max-w-none prose-h2:font-bold prose-h2:text-slate-800 prose-p:text-slate-600 prose-a:text-amber-600 prose-strong:text-slate-800" 
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
          
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-5">Product at a Glance</h3>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex justify-between items-center"><strong className="text-slate-500">Part:</strong> <span className="font-semibold">{part?.name}</span></li>
                  <li className="flex justify-between items-center"><strong className="text-slate-500">Brand:</strong> <span className="font-semibold">{car?.brand}</span></li>
                  <li className="flex justify-between items-center"><strong className="text-slate-500">Model:</strong> <span className="font-semibold">{car?.model}</span></li>
                </ul>
                <Link href="/shop" className="mt-6 w-full text-center block py-3 px-4 rounded-lg shadow-sm font-semibold text-white bg-slate-900 hover:bg-slate-700 transition-colors">
                  Shop This Part
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <section className="bg-slate-100/70 mt-24 py-8 sm:py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex justify-between items-center text-left p-6"
                  >
                    <span className="font-semibold text-lg text-slate-800">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                    <p className="px-6 pb-6 text-slate-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Image src="/images/home/category1.png" alt="Mechanic working on a car" width={600} height={700} className="rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-lg shadow-slate-200/50">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="text-slate-600 text-lg">"{testimonial.review}"</blockquote>
                <p className="font-bold text-slate-800 mt-6">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-8 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedNews.map(item => {
              const relatedCar = allCars.find((c: Car) => c.id === item.carId);
              return (
                <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    <div className="overflow-hidden relative">
                        <Link href={`/news/${item.id}`} className="block">
                            <Image src={item.image} alt={item.title} width={400} height={225} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"/>
                        </Link>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <p className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block self-start mb-3">{relatedCar?.brand} {relatedCar?.model}</p>
                        <h3 className="font-bold text-lg text-slate-800 flex-grow">
                            <Link href={`/news/${item.id}`} className="hover:text-amber-600 transition-colors">{item.title}</Link>
                        </h3>
                        <div className="mt-auto pt-4">
                            <Link href={`/news/${item.id}`} className="inline-flex items-center gap-2 font-semibold text-sm text-amber-600">
                                Read More <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  );
}