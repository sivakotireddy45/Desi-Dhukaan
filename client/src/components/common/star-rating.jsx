


import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star) => {
    const isActive = star <= rating;
    return (
      <Button
        key={star}
        className={`p-2 rounded-full transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-tr from-cyan-400 to-green-400 text-white shadow-md hover:shadow-lg hover:scale-110"
            : "border border-gradient-to-tr from-cyan-400 to-green-400 text-gray-400 hover:scale-110"
        }`}
        variant="outline"
        size="icon"
        onClick={handleRatingChange ? () => handleRatingChange(star) : null}
      >
        <StarIcon
          className={`w-6 h-6 ${
            isActive
              ? "fill-[url(#starGradient)]"
              : "fill-transparent stroke-cyan-400"
          }`}
        />
        {/* Gradient definition */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" /> {/* cyan-400 */}
              <stop offset="100%" stopColor="#4ade80" /> {/* green-400 */}
            </linearGradient>
          </defs>
        </svg>
      </Button>
    );
  });
}

export default StarRatingComponent;
