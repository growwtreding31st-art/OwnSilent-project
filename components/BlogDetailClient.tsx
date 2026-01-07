"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { type Post } from '@/lib/blogData';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Copy, ArrowLeft } from 'lucide-react';
import InstagramFeedSection from './InstagramFeedSection';

export default function BlogDetailClient({ post }: { post: Post }) {
  const router = useRouter();
  const relatedPosts = require('@/lib/blogData').blogData.filter((p: Post) => p.id !== post.id).slice(0, 3);

  return (
    <main className="bg-white py-12 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="text-sm text-gray-500 hidden sm:block">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-slate-900">Blog</Link>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <article className="lg:col-span-2">
            <div className="mb-8">
              <p className="text-base font-semibold text-slate-900 uppercase tracking-wide">{post.category}</p>
              <h1 className="mt-2 block text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-6 flex items-center">
                <div className="text-sm text-gray-500">
                  <span>By {post.author}</span>
                  <span className="mx-2">·</span>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </div>
            </div>
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={post.image}
                alt={post.title}
                width={800}
                height={450}
                className="w-full object-cover"
                priority
              />
            </div>
            <div 
              className="prose prose-lg max-w-none prose-h3:font-bold prose-h3:text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
          
          <aside className="mt-16 lg:mt-0">
            <div className="sticky top-28 space-y-10">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-4 border-b pb-2">Share this post</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-slate-900 transition-colors"><Facebook /></a>
                  <a href="#" className="text-gray-500 hover:text-slate-900 transition-colors"><Twitter /></a>
                  <a href="#" className="text-gray-500 hover:text-slate-900 transition-colors"><Linkedin /></a>
                  <button className="text-gray-500 hover:text-gray-800 transition-colors"><Copy /></button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-4 border-b pb-2">Related Posts</h3>
                <ul className="space-y-5">
                  {relatedPosts.map((related: Post) => (
                    <li key={related.id}>
                      <Link href={`/blog/${related.id}`} className="group flex space-x-4">
                        <Image 
                          src={related.image}
                          alt={related.title}
                          width={100}
                          height={75}
                          className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-medium text-gray-700 leading-tight group-hover:text-blue-700 transition-colors">{related.title}</h4>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <section className="mt-24">
        <div className="container mx-auto px-4">
          <div className="relative bg-gray-100 rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="px-8 py-12 sm:px-12 lg:px-16 flex flex-col justify-center">
                <div>
                  <span className="text-sm font-semibold bg-blue-100 text-slate-900 px-3 py-1 rounded-full">Need Help?</span>
                  <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Find the Right Part, Right Now.
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Our extensive catalog has everything you need. If you're unsure, our experts are here to help you make the perfect choice for your vehicle.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/shop" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-600 shadow-lg transition-transform hover:scale-105">
                      Explore Products
                    </Link>
                    <Link href="/contact-us" className="px-6 py-3 bg-white text-gray-800 font-bold rounded-lg border border-gray-300 hover:bg-gray-200 shadow-lg transition-transform hover:scale-105">
                      Talk to an Expert
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="/images/home/about1.png"
                  alt="A modern car"
                  fill
                  className="object-contain object-right-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <InstagramFeedSection/>
    </main>
  );
}