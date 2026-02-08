'use client';

interface CategoryIntroProps {
    introduction: string;
    categoryName: string;
}

export default function CategoryIntro({ introduction, categoryName }: CategoryIntroProps) {
    return (
        <section className="mb-12">
            {/* H2: About Section */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About {categoryName}
            </h2>
            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: introduction }}
            />
        </section>
    );
}
