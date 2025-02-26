import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const SHIPPO_API_KEY = "shippo_test_1892a121a35f0cb83796c297b5f150ef4ccfc753"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { trackingNumber, carrier} = req.body;


    try {
        // 2. Fetch Live Tracking Details using trackingNumber
        const trackingDetails = await axios.get(`https://api.goshippo.com/tracks/${carrier}/${trackingNumber}`, {
          headers: {
            "Authorization": `ShippoToken ${SHIPPO_API_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
  
        // Combine all details in response
        const combinedData = {
          trackingDetails: trackingDetails.data,
        };
  
        // Send back all details
        res.status(200).json(combinedData);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    res.status(400).json({ message: "Failed to fetch data", error: error.message });
    }
  }else {
   res.status(405).json({ message: "Method Not Allowed" });
 }
}
