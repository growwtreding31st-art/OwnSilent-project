'use client';

import { useState } from 'react';
import { faqApi } from '@/lib/api/category.api';

interface FAQ {
    _id: string;
    question: string;
    answer: string;
    helpfulCount: number;
    notHelpfulCount: number;
}

interface FAQSectionProps {
    faqs: FAQ[];
    categoryName: string;
}

export default function FAQSection({ faqs, categoryName }: FAQSectionProps) {
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [helpfulClicks, setHelpfulClicks] = useState<Record<string, boolean>>({});

    const toggleFaq = (id: string) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    const handleHelpful = async (id: string, isHelpful: boolean) => {
        if (helpfulClicks[id]) return; // Prevent multiple clicks

        try {
            if (isHelpful) {
                await faqApi.markHelpful(id);
            } else {
                await faqApi.markNotHelpful(id);
            }
            setHelpfulClicks(prev => ({ ...prev, [id]: true }));
        } catch (error) {
            console.error('Error marking FAQ:', error);
        }
    };

    return (
        <section className="mb-12">
            {/* H2: FAQ Section */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
            </h2>
            <div className="space-y-4">
                {faqs.map((faq) => (
                    <div key={faq._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                            onClick={() => toggleFaq(faq._id)}
                            className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                                {faq.question}
                                <span className="text-2xl text-gray-400">
                                    {expandedFaq === faq._id ? '−' : '+'}
                                </span>
                            </h3>
                        </button>
                        {expandedFaq === faq._id && (
                            <div className="px-6 pb-6">
                                <div
                                    className="prose prose-lg max-w-none mb-4"
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>Was this helpful?</span>
                                    <button
                                        onClick={() => handleHelpful(faq._id, true)}
                                        disabled={helpfulClicks[faq._id]}
                                        className={`px-3 py-1 rounded ${helpfulClicks[faq._id]
                                                ? 'bg-gray-200 cursor-not-allowed'
                                                : 'bg-green-100 hover:bg-green-200'
                                            }`}
                                    >
                                        👍 Yes ({faq.helpfulCount})
                                    </button>
                                    <button
                                        onClick={() => handleHelpful(faq._id, false)}
                                        disabled={helpfulClicks[faq._id]}
                                        className={`px-3 py-1 rounded ${helpfulClicks[faq._id]
                                                ? 'bg-gray-200 cursor-not-allowed'
                                                : 'bg-red-100 hover:bg-red-200'
                                            }`}
                                    >
                                        👎 No ({faq.notHelpfulCount})
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
