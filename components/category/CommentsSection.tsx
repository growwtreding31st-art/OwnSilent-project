'use client';

import { useState } from 'react';
import { commentApi } from '@/lib/api/category.api';

interface Comment {
    _id: string;
    user: {
        name: string;
    };
    content: string;
    createdAt: string;
    helpfulCount: number;
}

interface CommentsSectionProps {
    comments: Comment[];
    categoryId: string;
    categorySlug: string;
}

export default function CommentsSection({ comments, categoryId, categorySlug }: CommentsSectionProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            await commentApi.submit({
                ...formData,
                category: categoryId,
            });
            setMessage('Comment submitted successfully! It will appear after moderation.');
            setFormData({ name: '', email: '', content: '' });
        } catch (error) {
            setMessage('Failed to submit comment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="mb-12">
            {/* H2: Comments Section */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Customer Comments
            </h2>

            {/* Comment Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Leave a Comment
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Comment *
                        </label>
                        <textarea
                            required
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            rows={4}
                            maxLength={2000}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Share your thoughts..."
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            {formData.content.length}/2000 characters
                        </p>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {submitting ? 'Submitting...' : 'Submit Comment'}
                    </button>
                    {message && (
                        <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {comment.user.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                {comment.content}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
