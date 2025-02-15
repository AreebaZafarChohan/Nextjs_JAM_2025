"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../designComponents/ui/button";
import { client } from "@/sanity/lib/client";
import { FaTrash } from "react-icons/fa";

export interface Order {
  _id: string;
  orderId: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

// Function to Delete Customer
const deleteOrder = async (_id: string) => {
  try {
    await client.delete(_id);
    toast.success("Order deleted successfully!");
  } catch (error) {
    toast.error("Error deleting order");
  }
};

const UserOrders = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!userEmail) return;
    setLoading(true);
    try {
      console.log("Fetching user for email:", userEmail);
      const user = await client.fetch(`*[_type == "user" && email == $email][0]{orders}`, { email: userEmail });
      console.log("Fetched user:", user);
      
      if (!user || !user.orders) {
        setOrderData([]);
        toast.error("No orders found for this email.");
        setLoading(false);
        return;
      }
      
      console.log("Fetched orders:", user.orders);
      setOrderData(user.orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    setOrderData(orderData.filter((order) => order.orderId !== id));
  };
  

  useEffect(() => {
    let amt = 0;
    orderData.forEach((item: Order) => {
      amt += item.productPrice * item.quantity;
    });
    console.log("Total amount calculated:", amt);
    setTotalAmount(amt);
  }, [orderData]);

  return (
    <div className="my-28 font-satoshi text-darkPrimary">
      <div className="mb-6 text-center">
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={userEmail} 
          onChange={(e) => setUserEmail(e.target.value)} 
          className="p-2 border border-yellow-500 rounded-md"
        />
        <Button onClick={fetchOrders} className="bg-darkPrimary text-white hover:bg-yellow-500 px-4 py-2 ml-2 rounded-md">
          Fetch Orders
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading orders...</p>
      ) : orderData.length > 0 ? (
        <div>
          <h2 className="font-bold text-3xl border-b border-darkPrimary mt-14 mb-4 font-clash">Your Orders</h2>
          <div className="grid sm:grid-cols-6 grid-cols-4 text-sm font-medium py-2 border-b-[1px] bg-lightGray p-2 border-yellow-500">
            <p className="sm:col-span-3 justify-center uppercase">Items</p>
            <p className="hidden md:block text-center">Quantity</p>
            <p className="block md:hidden text-center">Qty.</p>
            <p className="hidden md:block text-center">Amount</p>
            <p className="block md:hidden text-center">Amt.</p>
            <p className="hidden md:block text-center">Payment</p>
            <p className="block md:hidden text-center">Pay.</p>
          </div>
          <div className="py-2 flex flex-col gap-2 mt-3">
            {orderData.map((item: Order, index: number) => (
              <div key={index} className="py-2 border-b-[1px] grid sm:grid-cols-6 grid-cols-4 items-center border-yellow-500">
                <div className="sm:col-span-3 flex items-center gap-4">
                  <Link href={{ pathname: `https://www.alwahabclothings.com/product/${item.productId}` }}
                  aria-label="View Single Product">
                    <h3 className="text-base font-semibold">{item.productName}</h3>
                  </Link>
                </div>
                <p className="text-center">{item.quantity}</p>
                <p className="text-center">£{item.productPrice * item.quantity}</p>
                <p className="text-center">COD</p>
                <Button onClick={() => handleDelete(item.orderId)} className=" border mt-2 w-5 py-1 rounded-md"><FaTrash/></Button>
              </div>
            ))}
          </div>
          <div className="py-2 mt-4 border-b-[1px] border-darkPrimary">
            <p>Shipment: <span className="font-semibold text-green-500 pl-1">£Free</span></p>
          </div>
          <p className="py-2">
            Total Payment: <span className="text-xl font-semibold">£{totalAmount.toFixed(2)}</span>
          </p>
        </div>
      ) : (
        <div className="py-14 text-center">
          <p className="text-xl font-semibold">No orders found for this email.</p>
          <Link href="/products" aria-label="Back to Products page">
            <button className="bg-darkPrimary font-bold text-white hover:text-darkPrimary py-2 px-6 rounded-md hover:bg-lightGray duration-200 mt-4">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default UserOrders;