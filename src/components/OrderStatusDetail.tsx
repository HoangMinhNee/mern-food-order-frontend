import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order;
};
const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Giao Hàng Đến:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Đơn Hàng Của Bạn</span>
        <ul>
          {order.cartItems.map((item) => (
            <li>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Tổng Cộng</span>
        <span>{order.totalAmount.toLocaleString("vi-VN")} đ</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
