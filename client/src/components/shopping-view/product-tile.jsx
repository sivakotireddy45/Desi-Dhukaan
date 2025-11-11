

import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const isOutOfStock = product?.totalStock === 0;
  const isLowStock = product?.totalStock < 10 && product?.totalStock > 0;
  const isOnSale = product?.salePrice > 0;

  return (
    <Card className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          {isOutOfStock ? (
            <Badge className="absolute top-2 left-2 bg-red-600 text-white">
              Out Of Stock
            </Badge>
          ) : isLowStock ? (
            <Badge className="absolute top-2 left-2 bg-yellow-400 text-black">
              Only {product?.totalStock} left
            </Badge>
          ) : isOnSale ? (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-cyan-500 to-green-500 text-white px-3 py-1 text-sm rounded-br-xl shadow-md font-semibold">
              💬 Sale!
            </div>
          ) : null}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {product?.title}
          </h2>

          <div className="flex justify-between items-center mb-2 text-gray-700 text-sm">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>

          <div className="flex justify-between items-center">
            <span
              className={`text-lg font-semibold ${
                isOnSale ? "line-through text-gray-400" : "text-gray-900"
              }`}
            >
              ${product?.price}
            </span>
            {isOnSale && (
              <span className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-green-500 bg-clip-text text-transparent">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter>
        {isOutOfStock ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() =>
              handleAddtoCart(product?._id, product?.totalStock)
            }
            className="w-full bg-gradient-to-r from-cyan-500 to-green-500 text-white hover:from-cyan-600 hover:to-green-600 transition-colors duration-300"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
