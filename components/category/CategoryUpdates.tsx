'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Update {
    _id: string;
    title: string;
    slug: string;
    date: string;
    shortDescription: string;
    longDescription: string;
    images?: string[];
}

interface CategoryUpdatesProps {
    updates: Update[];
    categorySlug: string;
}

export default function CategoryUpdates({ updates, categorySlug }: CategoryUpdatesProps) {
    return (
        <section className="mb-12">
            {/* H2: Updates Section */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Latest Updates
            </h2>
            <div className="space-y-8">
                {updates.map((update) => (
                    <article key={update._id} className="bg-white rounded-lg shadow-md p-6">
                        {/* H3: Update Title */}
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                            {update.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            {new Date(update.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>

                        {update.images && update.images.length > 0 && (
                            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {update.images.slice(0, 2).map((image, index) => (
                                    <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                                        <Image
                                            src={image}
                                            alt={`${update.title} - Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <p className="text-gray-700 mb-4">
                            {update.shortDescription}
                        </p>

                        {/* Long description with H3 support */}
                        <div
                            className="prose prose-lg max-w-none mb-4"
                            dangerouslySetInnerHTML={{ __html: update.longDescription }}
                        />

                        <Link
                            href={`/categories/${categorySlug}/updates/${update.slug}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Read more →
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
