import { UserData } from "../../types/components";
import { client } from "../sanity/lib/client";
import { v4 as uuidv4 } from "uuid";

export const createOrUpdateUser = async (userData: UserData) => {
  try {
    // Check if the user already exists
    const existingUser = await client.fetch(
      `*[_type == "user" && (userId == $userId || name == $name)][0]`,
      { userId: userData.userId, name: userData.name }
    );

    if (!existingUser) {
      // User does not exist, create a new user
      const newUser = {
        _type: "user",
        userId: userData.userId,
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        countryCode: userData.countryCode,
        address: userData.address,
        country: userData.country,
        zipCode: userData.zipCode,
        state: userData.state,
        city: userData.city,
        orders: userData.order.map((order) => ({
         _key: uuidv4(),
          orderId: order.orderId,
          productId: order.productId,
          productName: order.productName,
          productPrice: order.productPrice,
          quantity: order.quantity,
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const createdUser = await client.create(newUser);
      console.log("New user created ✅:", createdUser);
      return createdUser;
    } else if (existingUser.orders && existingUser.orders.length > 0) {
      // User exists and already has orders, update their orders
      const updatedOrders = [
        ...existingUser.orders,
        ...userData.order.map((order) => ({
          _key: uuidv4(),
          orderId: order.orderId,
          productId: order.productId,
          productName: order.productName,
          productPrice: order.productPrice,
          quantity: order.quantity,
        })),
      ];

      const updatedUser = await client
        .patch(existingUser._id)
        .set({
          orders: updatedOrders,
          updatedAt: new Date().toISOString(),
        })
        .commit();

      console.log("User orders updated 🔄:", updatedUser);
      return updatedUser;
    } else {
      // User exists but has no orders, update createdAt and updatedAt
      const updatedUser = await client
        .patch(existingUser._id)
        .set({
          orders: userData.order.map((order) => ({
            _key: uuidv4(),
            orderId: order.orderId,
            productId: order.productId,
            productName: order.productName,
            productPrice: order.productPrice,
            quantity: order.quantity,
          })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .commit();

      console.log("User with no orders updated 🔄:", updatedUser);
      return updatedUser;
    }
  } catch (error) {
    console.error("Error in create or Update User ❌:", error);
    throw error;
  }
};
