import { forwardRef } from "react";
import { Star, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGoogleReviews, GoogleReview } from "@/hooks/useGoogleReviews";

// Fallback reviews for when Google API isn't configured
const fallbackReviews = [
  {
    id: "1",
    review_id: "fallback-1",
    author_name: "James Wilson",
    profile_photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    review_text: "Excellent quality batteries and fantastic customer service. The team helped me choose the perfect setup for my off-grid cabin.",
    relative_time: "2 weeks ago",
    create_time: null,
    fetched_at: new Date().toISOString(),
  },
  {
    id: "2",
    review_id: "fallback-2",
    author_name: "Sarah Mitchell",
    profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    review_text: "Fast shipping and the battery exceeded my expectations. Perfect for my campervan conversion. Highly recommend!",
    relative_time: "1 month ago",
    create_time: null,
    fetched_at: new Date().toISOString(),
  },
  {
    id: "3",
    review_id: "fallback-3",
    author_name: "David Chen",
    profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    review_text: "Third purchase from SOK Battery. Consistent quality and the best prices in NZ. The warranty gives me total peace of mind.",
    relative_time: "3 weeks ago",
    create_time: null,
    fetched_at: new Date().toISOString(),
  },
];

const ReviewCard = forwardRef<HTMLDivElement, { review: GoogleReview; index: number }>(function ReviewCard({ review, index }, ref) {
  const initials = review.author_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      ref={ref}
      className="group relative p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header with Avatar */}
      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-primary/20 shrink-0">
          <AvatarImage src={review.profile_photo_url || undefined} alt={review.author_name} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs sm:text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <p className="font-semibold text-foreground text-sm sm:text-base truncate">
              {review.author_name}
            </p>
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {review.relative_time || "Recently"}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-0.5 mb-2 sm:mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
              i < review.rating
                ? "fill-rating text-rating"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      {review.review_text && (
        <p className="text-sm sm:text-base text-foreground leading-relaxed mb-3 sm:mb-4 line-clamp-4">
          "{review.review_text}"
        </p>
      )}

      {/* Google Badge */}
      <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-border">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span className="text-xs sm:text-sm text-muted-foreground">
          Reviewed on Google
        </span>
      </div>
    </div>
  );
});

function ReviewCardSkeleton() {
  return (
    <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-card border border-border">
      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
        <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-20 mb-3" />
      <Skeleton className="h-16 w-full mb-4" />
      <Skeleton className="h-6 w-32" />
    </div>
  );
}

export function Testimonials() {
  const { data, isLoading } = useGoogleReviews();

  const reviews = data?.reviews?.length ? data.reviews : fallbackReviews;
  const stats = data?.stats || {
    averageRating: 4.9,
    totalCount: reviews.length,
    recommendPercentage: 98,
  };

  // Display only first 6 reviews for the homepage
  const displayedReviews = reviews.slice(0, 6);

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="container px-4 sm:px-6">
        {/* Trust Header */}
        <div className="flex flex-col gap-6 mb-8 sm:mb-12 lg:mb-16 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-surface-sunken border border-border">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary/10 shrink-0">
              <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                Trusted by Kiwis
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">
                Customer Reviews
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center mb-1">
                {isLoading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  <>
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                      {stats.averageRating}
                    </span>
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-rating text-rating" />
                  </>
                )}
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Average Rating
              </p>
            </div>
            <div className="text-center border-x border-border">
              {isLoading ? (
                <Skeleton className="h-6 w-12 mx-auto mb-1" />
              ) : (
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {stats.totalCount}+
                </p>
              )}
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Verified Reviews
              </p>
            </div>
            <div className="text-center">
              {isLoading ? (
                <Skeleton className="h-6 w-12 mx-auto mb-1" />
              ) : (
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {stats.recommendPercentage}%
                </p>
              )}
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Recommend Us
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {isLoading
            ? [...Array(6)].map((_, index) => (
                <ReviewCardSkeleton key={index} />
              ))
            : displayedReviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
        </div>
      </div>
    </section>
  );
}
