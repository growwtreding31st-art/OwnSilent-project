'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Product {
    _id: string;
    name: string;
    price: number;
    images?: string[];
    inStock: boolean;
}

interface AutoProductListingProps {
    products: Product[];
    categoryName: string;
}

export default function AutoProductListing({ products, categoryName }: AutoProductListingProps) {
    return (
        <section className="mb-12">
            {/* H2: Products Section */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {categoryName} Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link
                        key={product._id}
                        href={`/products/${product._id}`}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                    >
                        <div className="relative h-48 bg-gray-100">
                            {product.images && product.images.length > 0 ? (
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    No Image
                                </div>
                            )}
                            {!product.inStock && (
                                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                    Out of Stock
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                {product.name}
                            </h3>
                            <p className="text-xl font-bold text-blue-600">
                                ${product.price.toFixed(2)}
                            </p>
                            {product.inStock && (
                                <span className="inline-block mt-2 text-sm text-green-600 font-medium">
                                    In Stock
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
