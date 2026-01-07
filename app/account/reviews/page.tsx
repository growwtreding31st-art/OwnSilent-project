"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchProductsToReview,
  fetchMyPublishedReviews,
  submitReview,
} from "@/lib/redux/reviewSlice";
import {
  Star,
  MessageSquare,
  Edit,
  X,
  Loader2,
  CheckCircle2,
  Calendar,
  Box,
} from "lucide-react";
import toast from "react-hot-toast";

const TabButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
      active
        ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`}
  >
    {children}
  </button>
);

const ReviewModal = ({
  isOpen,
  onClose,
  product,
  orderId,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  orderId: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0 || !reviewText.trim()) {
      return toast.error("Please provide a rating and a review.");
    }
    toast
      .promise(
        dispatch(
          submitReview({
            part: product._id,
            order: orderId,
            rating,
            reviewText,
          })
        ).unwrap(),
        {
          loading: "Submitting your review...",
          success: "Review submitted for approval!",
          error: (err) => err || "Failed to submit review.",
        }
      )
      .then(onClose);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden">
        <header className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Write a Review
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-white hover:text-slate-900 transition-all shadow-sm border border-transparent hover:border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </header>
        <div className="p-8">
          <div className="flex items-center gap-5 mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 overflow-hidden flex-shrink-0 relative">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                You are reviewing
              </p>
              <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                {product.name}
              </h3>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 ml-1">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-9 h-9 cursor-pointer transition-all ${
                      (hoverRating || rating) > index
                        ? "text-yellow-400 fill-yellow-400 drop-shadow-sm scale-110"
                        : "text-slate-200 fill-slate-50 scale-100 hover:scale-105"
                    }`}
                    onMouseEnter={() => setHoverRating(index + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(index + 1)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 ml-1">
                Your Review
              </label>
              <textarea
                rows={5}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us what you liked or didn't like..."
                className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
              ></textarea>
            </div>

            <footer className="pt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-slate-900 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 hover:shadow-blue-200 hover:-translate-y-0.5"
              >
                Submit Review
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MyReviewsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { productsToReview, publishedReviews, status } = useSelector(
    (state: RootState) => state.reviews
  );
  const [activeTab, setActiveTab] = useState("to_review");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewingProduct, setReviewingProduct] = useState<any>(null);

  useEffect(() => {
    if (activeTab === "to_review") {
      dispatch(fetchProductsToReview());
    } else {
      dispatch(fetchMyPublishedReviews());
    }
  }, [dispatch, activeTab]);

  const handleOpenModal = (product: any) => {
    setReviewingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {reviewingProduct && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={reviewingProduct.part}
          orderId={reviewingProduct.orderId}
        />
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Reviews
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Share your feedback on recent purchases.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 p-1.5 rounded-2xl flex flex-wrap gap-2 w-fit">
        <TabButton
          active={activeTab === "to_review"}
          onClick={() => setActiveTab("to_review")}
        >
          To Review ({productsToReview.length})
        </TabButton>
        <TabButton
          active={activeTab === "published"}
          onClick={() => setActiveTab("published")}
        >
          Published ({publishedReviews.length})
        </TabButton>
      </div>

      {status === "loading" ? (
        <div className="h-64 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-500 font-medium animate-pulse">
            Loading reviews...
          </p>
        </div>
      ) : activeTab === "to_review" ? (
        <div className="space-y-6">
          {productsToReview.length > 0 ? (
            productsToReview.map((item: any) => (
              <div
                key={item.part._id}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={item.part.images[0]}
                      alt={item.part.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1 line-clamp-1">
                      {item.part.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Purchased recently
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenModal(item)}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-slate-200 hover:shadow-blue-200 hover:-translate-y-0.5 text-sm w-full md:w-auto"
                >
                  <Edit className="w-4 h-4" /> Write Review
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                All Caught Up!
              </h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                You have reviewed all your recent purchases. Thank you for your
                feedback!
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {publishedReviews.length > 0 ? (
            publishedReviews.map((review: any) => (
              <div
                key={review._id}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-24 h-24 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex-shrink-0 relative hidden md:block">
                    <Image
                      src={review.part.images[0]}
                      alt={review.part.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <Link href={`/product/${review.part.slug}`}>
                        <h3 className="font-bold text-lg text-slate-900 hover:text-blue-600 transition-colors line-clamp-1">
                          {review.part.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 w-fit">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(review.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-slate-200 fill-slate-50"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-slate-600 text-sm leading-relaxed italic">
                        "{review.reviewText}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <MessageSquare className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                You haven't published any reviews yet. Your reviews will appear
                here once approved.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 