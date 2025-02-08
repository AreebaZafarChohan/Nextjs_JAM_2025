"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react"; // Clerk's user hook
import { client } from "@/sanity/lib/client";

interface OrderData {
  productId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: string;
  originalPrice: number;
}

interface Order {
  orderId: string;
  userId: string;
  orderDate: string;
  orderData: OrderData[];
}

const UserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useUser();  // Clerk's user context for authentication
  console.log("user", user)

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {  // Ensure the user is logged in and has an email
        try {
          // Fetch orders from Sanity where the userId (email) matches the logged-in user's email
          const fetchedOrders = await client.fetch(
            `*[_type == "order" && userId == $userEmail]`,
            { userEmail: user.emailAddresses }
          );
          setOrders(fetchedOrders);  // Store the orders in the state
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    // Call the function to fetch orders if the user is logged in
    fetchOrders();
  }, [user]);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="order">
            <h3>Order ID: {order.orderId}</h3>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <ul>
              {order.orderData.map((item) => (
                <li key={item.productId}>
                  <p>{item.productName} - Quantity: {item.quantity}</p>
                  <p>Total: ${item.totalAmount}</p>
                  <p>Status: {item.status}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
