
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();



  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId:  productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-10 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[75vw] backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl shadow-2xl">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="text-white space-y-6">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-green-300">
              {productDetails?.title}
            </h1>
            <p className="text-base text-black mt-2">
              {productDetails?.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-2xl">
            <p
              className={`font-semibold ${
                productDetails?.salePrice > 0
                  ? "line-through text-red-300"
                  : "text-white"
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="font-bold text-green-400">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-sm text-gray-300">
              ({averageReview.toFixed(1)})
            </span>
          </div>

          {productDetails?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed bg-gray-400">
              Out of Stock
            </Button>
          ) : (
            <Button
              className="w-full text-white bg-gradient-to-r from-cyan-400 to-green-400 hover:opacity-90 transition"
              onClick={() =>
                handleAddToCart(productDetails?._id, productDetails?.totalStock)
              }
            >
              Add to Cart
            </Button>
          )}

          <Separator className="bg-gray/30" />

          <div className="max-h-[300px] overflow-auto pr-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3 text-black">Reviews</h2>
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <Avatar className="w-10 h-10 border border-black">
                      <AvatarFallback className="font-bold bg-gray-200 text-black">
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-cyan-400">
                          {reviewItem?.userName}
                        </h3>
                      </div>
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                      <p className="font-semibold text-black mt-1">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h3 className="text-sm text-gray-400">No Reviews</h3>
              )}
            </div>

            <div className="pt-4 border-t border-white/20">
              <Label className="text-black">Write a Review</Label>
              <div className="flex gap-2 mt-2">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review..."
                className="bg-white text-black placeholder:text-gray-500 mt-2"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className="mt-2 bg-gradient-to-r from-cyan-500 to-green-400 text-white hover:opacity-90"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;




