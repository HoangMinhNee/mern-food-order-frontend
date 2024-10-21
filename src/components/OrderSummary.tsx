import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFormCart: (cartItem: CartItem) => void;
};
const OrderSummary = ({ restaurant, cartItems, removeFormCart }: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItems) => total + cartItems.price * cartItems.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return totalWithDelivery.toLocaleString("vi-VN");
  };
  return (
    <>
      <CardHeader className="px-5">
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Đơn Hàng Của Bạn</span>
          <span>{getTotalCost()} đ</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                onClick={() => removeFormCart(item)}
                className="cursor-pointer"
                color="red"
                size={20}
              />
              {(item.price * item.quantity).toLocaleString("vi-VN")} đ
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>{restaurant.deliveryPrice.toLocaleString("vi-VN")} đ</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
