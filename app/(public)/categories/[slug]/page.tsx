import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoryApi } from '@/lib/api/category.api';
import CategoryIntro from '@/components/category/CategoryIntro';
import CategoryUpdates from '@/components/category/CategoryUpdates';
import AutoProductListing from '@/components/category/AutoProductListing';
import FAQSection from '@/components/category/FAQSection';
import CommentsSection from '@/components/category/CommentsSection';

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    try {
        const response = await categoryApi.getBySlug(params.slug);
        const category = response.data.category;

        return {
            title: category.seo?.metaTitle || `${category.name} | Auto Parts`,
            description: category.seo?.metaDescription || category.shortDescription,
            keywords: category.seo?.keywords || [],
            openGraph: {
                title: category.seo?.metaTitle || category.name,
                description: category.seo?.metaDescription || category.shortDescription,
                images: category.featuredImage ? [category.featuredImage] : [],
            },
        };
    } catch (error) {
        return {
            title: 'Category Not Found',
        };
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    let pageData;

    try {
        const response = await categoryApi.getBySlug(params.slug);
        pageData = response.data;
    } catch (error) {
        notFound();
    }

    const { category, updates, faqs, comments, products } = pageData;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* H1: Category Name (Permanent) */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {category.name}
                    </h1>
                    {category.shortDescription && (
                        <p className="text-lg text-gray-600">
                            {category.shortDescription}
                        </p>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* H2: About Section */}
                <CategoryIntro
                    introduction={category.introduction}
                    categoryName={category.name}
                />

                {/* H2: Latest Updates (Dynamic, Newest First) */}
                {updates && updates.length > 0 && (
                    <CategoryUpdates
                        updates={updates}
                        categorySlug={params.slug}
                    />
                )}

                {/* H2: Products (Auto-Listed) */}
                {products && products.length > 0 && (
                    <AutoProductListing
                        products={products}
                        categoryName={category.name}
                    />
                )}

                {/* H2: Frequently Asked Questions (Auto-Injected) */}
                {faqs && faqs.length > 0 && (
                    <FAQSection
                        faqs={faqs}
                        categoryName={category.name}
                    />
                )}

                {/* H2: Customer Comments */}
                <CommentsSection
                    comments={comments || []}
                    categoryId={category._id}
                    categorySlug={params.slug}
                />
            </div>
        </div>
    );
}
