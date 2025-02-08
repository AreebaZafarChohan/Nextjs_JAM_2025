import { UserOrders } from "../../types/components";
import { client } from "../sanity/lib/client";
import { v4 as uuidv4 } from "uuid";


export const createOrder = async (order: UserOrders) => {
  try {
    // Check if the orderId already exists in Sanity
    const existingOrder = await client.fetch(
      `*[_type == "order" && orderId == $orderId][0]`,
      { orderId: order.orderId }
    );

    if (existingOrder) {
      // Order already exists, return a message or throw an error
      console.log(`Order with orderId ${order.orderId} already exists.`);
      return { message: `Order with orderId ${order.orderId} already exists.` };
    }

    // Prepare order data with product stock update
    const updatedOrderData = await Promise.all(
      order.orderData.map(async (item) => {
        // Fetch the inventory document
        const inventoryDoc = await client.fetch(
          `*[_type == "inventory" && productId._ref == $productId][0]`,
          { productId: item.productId }
        );

        if (inventoryDoc) {
          // Log the stock before the update
          console.log(`Before update, stock for ${item.productName}: ${inventoryDoc.stock}`);

          // Check if there is enough stock in the inventory
          if (inventoryDoc.stock < item.quantity) {
            throw new Error(`Not enough stock for ${item.productName}.`);
          }

          // Update the inventory stock
          const updatedStock = inventoryDoc.stock - item.quantity;
          await client.patch(inventoryDoc._id)
            .set({ stock: updatedStock })
            .commit();

          // Log the updated stock in inventory
          console.log(`After update, stock for ${item.productName}: ${updatedStock}`);


          return {
            ...item,
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            totalAmount: item.totalAmount,
            status: item.status,
            originalPrice: item.originalPrice,
          };
        } else {
          throw new Error(`Inventory document not found for ${item.productName}`);
        }
      })
    );

    // Proceed to create the order
    const newOrder = {
      _type: 'order',
      orderId: order.orderId,
      userId: order.userId,
      orderDate: order.orderDate,
      orderData: updatedOrderData.map((item) => ({
        _key: uuidv4(),
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        totalAmount: item.totalAmount,
        status: item.status,
        originalPrice: item.originalPrice,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Create the order in Sanity
    const createdOrder = await client.create(newOrder);

    console.log('Order created ✅:', createdOrder);
    return createdOrder;
  } catch (error) {
    console.error('Error creating order ❌:', error);
    throw error;
  }
};
