"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, notFound } from 'next/navigation';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchPublicCollectionBySlug, clearCurrentCollection } from '@/lib/redux/collectionSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, ArrowRight } from 'lucide-react';

interface Part {
    _id: string;
    slug: string;
    name: string;
    price: number;
    images: string[];
    description?: string | { fullDescription?: string };
}

const ProductCard: React.FC<{ part: Part }> = ({ part }) => {
    const descriptionText = typeof part.description === 'string' 
        ? part.description 
        : part.description?.fullDescription;
    
    return (
        <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-transparent transition-all duration-300 ease-in-out hover:shadow-lg hover:border-slate-200/80 h-full">
            <Link href={`/product/${part.slug}`} className="block p-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
                    <Image
                        src={part.images[0]}
                        alt={part.name}
                        fill
                        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 20vw"
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                </div>
            </Link>
            <div className="px-3 pb-3 flex flex-col flex-grow">
                <h4 className="font-semibold text-slate-800 text-sm leading-tight" title={part.name}>
                    <Link href={`/product/${part.slug}`} className="hover:text-amber-600 transition-colors line-clamp-2">
                        {part.name}
                    </Link>
                </h4>
                {descriptionText && (
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                        {descriptionText}
                    </p>
                )}
                <div className="mt-auto pt-2 flex justify-between items-center">
                    <p className="text-slate-900 font-bold text-md">
                        ${part.price.toLocaleString('en-US')}
                    </p>
                    <Link href={`/product/${part.slug}`} className="flex items-center justify-center h-8 w-8 bg-slate-100 text-slate-600 rounded-full transition-all duration-300 ease-in-out group-hover:bg-slate-900 group-hover:text-white">
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default function CollectionDetailPage() {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const slug = params.slug as string;

    const { currentCollection: collection, status } = useSelector((state: RootState) => state.collections);

    useEffect(() => {
        if (slug) {
            dispatch(fetchPublicCollectionBySlug(slug));
        }
        return () => {
            dispatch(clearCurrentCollection());
        }
    }, [dispatch, slug]);
    
    useEffect(() => {
        if (status === 'failed' && !collection) {
            notFound();
        }
    }, [status, collection]);

    if (status === 'loading' || !collection) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-white">
                <Loader2 className="w-12 h-12 animate-spin text-slate-500" />
            </div>
        );
    }
    
    return (
        <main className="bg-white">
            <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center text-center text-white">
                <Image 
                    src={collection.coverImage} 
                    alt={collection.name} 
                    fill 
                    className="object-cover" 
                    priority
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 p-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{collection.name}</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto opacity-90">{collection.description}</p>
                </div>
            </section>
            
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {collection.products && collection.products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {collection.products.map((part: Part) => (
                                <ProductCard key={part._id} part={part} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-semibold">No Products Found</h3>
                            <p className="text-slate-500 mt-2">There are currently no products in this collection.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}