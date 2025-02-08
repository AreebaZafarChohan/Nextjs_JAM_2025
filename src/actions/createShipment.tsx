import { ShipmentData } from "../../types/components";
import { client } from "../sanity/lib/client";


export const createShipment = async (shipmentData: ShipmentData) => {
  try {
    const newShipment = {
      _type: "shipment",
      orderId: shipmentData.orderId,
      userName: shipmentData.userName,
      userEmail: shipmentData.userEmail,
      userPhone: shipmentData.userPhone,
      countryCode: shipmentData.countryCode,
      shippingAddress: shipmentData.shippingAddress,
      status: "Transit",
      trackingNumber: shipmentData.trackingNumber,
      shipmentDate: shipmentData.shipmentDate,
      deliveryDate: shipmentData.deliveryDate,
      carrier: shipmentData.carrier,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Create the shipment in Sanity
    const createdShipment = await client.create(newShipment);

    console.log("Shipment created ✅:", createdShipment);
    return createdShipment;
  } catch (error) {
    console.error("Error creating shipment ❌:", error);
    throw error;
  }
};
