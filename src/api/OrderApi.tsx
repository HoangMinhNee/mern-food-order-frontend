import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Không nhận được đơn hàng");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    {
      refetchInterval: 5000,
    }
  );
  return { orders, isLoading };
};

type CreateOrderRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createOrderRequest = async (createOrderRequest: CreateOrderRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/order/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createOrderRequest),
    });

    if (!response.ok) {
      throw new Error("Không thể tạo đơn hàng");
    }

    return response.json();
  };

  const {
    mutateAsync: createOrder,
    isLoading,
    error,
    reset,
  } = useMutation(createOrderRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createOrder,
    isLoading,
  };
};
