"use client";

import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, User, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
  size?: string;
  fit?: "small" | "true" | "large";
  images?: string[];
}

interface ProductReviewsProps {
  productId: string;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
  ratingDistribution?: { [key: number]: number };
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Priya S.",
    rating: 5,
    title: "Absolutely love this piece!",
    content:
      "The quality is amazing and it fits perfectly. The fabric is soft and breathable. I've received so many compliments! Definitely ordering more colors.",
    date: "2024-12-05",
    helpful: 24,
    notHelpful: 2,
    verified: true,
    size: "M",
    fit: "true",
  },
  {
    id: "2",
    author: "Ananya R.",
    rating: 4,
    title: "Great quality, runs slightly large",
    content:
      "Beautiful design and excellent craftsmanship. I'd recommend sizing down if you're between sizes. The color is exactly as pictured.",
    date: "2024-12-01",
    helpful: 18,
    notHelpful: 1,
    verified: true,
    size: "L",
    fit: "large",
  },
  {
    id: "3",
    author: "Kavya M.",
    rating: 5,
    title: "Perfect for any occasion",
    content:
      "This is now my go-to piece for both casual and dressy occasions. The versatility is incredible. Washes well too!",
    date: "2024-11-28",
    helpful: 12,
    notHelpful: 0,
    verified: true,
    size: "S",
    fit: "true",
  },
];

const defaultDistribution = { 5: 65, 4: 20, 3: 10, 2: 3, 1: 2 };

export function ProductReviews({
  productId,
  reviews = mockReviews,
  averageRating = 4.7,
  totalReviews = 156,
  ratingDistribution = defaultDistribution,
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState("helpful");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, title: "", content: "", name: "" });
  const [helpfulClicks, setHelpfulClicks] = useState<Record<string, "up" | "down" | null>>({});
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleHelpful = (reviewId: string, type: "up" | "down") => {
    setHelpfulClicks((prev) => ({
      ...prev,
      [reviewId]: prev[reviewId] === type ? null : type,
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting review:", newReview);
    setShowWriteReview(false);
    setNewReview({ rating: 0, title: "", content: "", name: "" });
  };

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3);

  const StarRating = ({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={cn(
            "transition-colors",
            interactive && "hover:scale-110 cursor-pointer"
          )}
        >
          <Star
            className={cn(
              "h-5 w-5",
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            )}
          />
        </button>
      ))}
    </div>
  );

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
              <StarRating rating={Math.round(averageRating)} />
              <p className="text-sm text-muted-foreground mt-2">
                Based on {totalReviews} reviews
              </p>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const percentage = ratingDistribution[stars] || 0;
                return (
                  <button
                    key={stars}
                    onClick={() => setFilterRating(filterRating === stars ? null : stars)}
                    className={cn(
                      "flex items-center gap-2 w-full p-1 rounded transition-colors",
                      filterRating === stars ? "bg-primary/10" : "hover:bg-muted"
                    )}
                  >
                    <span className="text-sm w-3">{stars}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Progress value={percentage} className="flex-1 h-2" />
                    <span className="text-sm text-muted-foreground w-8">{percentage}%</span>
                  </button>
                );
              })}
            </div>

            <Separator className="my-6" />

            <Button
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="w-full"
            >
              Write a Review
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          {/* Write Review Form */}
          {showWriteReview && (
            <form onSubmit={handleSubmitReview} className="bg-muted/30 rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Write Your Review</h3>
              
              <div className="space-y-4">
                <div>
                  <Label>Your Rating *</Label>
                  <div className="mt-1">
                    <StarRating
                      rating={newReview.rating}
                      interactive
                      onChange={(r) => setNewReview({ ...newReview, rating: r })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="review-name">Your Name *</Label>
                  <Input
                    id="review-name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="review-title">Review Title *</Label>
                  <Input
                    id="review-title"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    placeholder="Summarize your experience"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="review-content">Your Review *</Label>
                  <Textarea
                    id="review-content"
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    placeholder="Tell others about your experience with this product"
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={!newReview.rating || !newReview.title || !newReview.content}>
                    Submit Review
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowWriteReview(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Sort & Filter */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {filterRating && (
                <Badge variant="secondary" className="gap-1">
                  {filterRating} stars
                  <button onClick={() => setFilterRating(null)} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              )}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="helpful">Most Helpful</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {displayedReviews.map((review) => (
              <div key={review.id} className="border rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.author}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs gap-1">
                            <Check className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                        {review.size && <span>• Size: {review.size}</span>}
                        {review.fit && (
                          <span>
                            • Fit:{" "}
                            {review.fit === "small"
                              ? "Runs small"
                              : review.fit === "large"
                              ? "Runs large"
                              : "True to size"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>

                <h4 className="font-semibold mb-2">{review.title}</h4>
                <p className="text-muted-foreground mb-4">{review.content}</p>

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Was this helpful?</span>
                  <button
                    onClick={() => handleHelpful(review.id, "up")}
                    className={cn(
                      "flex items-center gap-1 transition-colors",
                      helpfulClicks[review.id] === "up"
                        ? "text-green-600"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.helpful + (helpfulClicks[review.id] === "up" ? 1 : 0)}</span>
                  </button>
                  <button
                    onClick={() => handleHelpful(review.id, "down")}
                    className={cn(
                      "flex items-center gap-1 transition-colors",
                      helpfulClicks[review.id] === "down"
                        ? "text-red-600"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{review.notHelpful + (helpfulClicks[review.id] === "down" ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredReviews.length > 3 && !showAllReviews && (
            <Button
              variant="outline"
              onClick={() => setShowAllReviews(true)}
              className="w-full mt-6"
            >
              <ChevronDown className="h-4 w-4 mr-2" />
              Show All {filteredReviews.length} Reviews
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductReviews;
