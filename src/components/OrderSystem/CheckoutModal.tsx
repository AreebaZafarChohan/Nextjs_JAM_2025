"use client";
import { useState } from "react";

const CheckoutModal = ({
  isOpen,
  closeModal,
  onSubmit,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (formData: any) => void;
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+92", // Default country code for Pakistan
    address: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shipmentDetails, setShipmentDetails] = useState<any | null>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const countries = [
    { code: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "+1", name: "USA", flag: "🇺🇸" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      countryCode: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields check
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData].trim()) {
        newErrors[key] =
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = { ...formData };

      // Store user data in localStorage (or use another storage mechanism)
      localStorage.setItem("userData", JSON.stringify(userData));

      // Trigger the checkout process
      handleCheckout(userData);
    }
  };

  function generateOrderId(): string {
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit number
    return `ORDER${randomDigits}`;
  }

  const orderId = generateOrderId();

  // Shipment API
  const handleCheckout = async (userData: any) => {
    setIsLoading(true); // Set loading to true while waiting for response
    const addressFrom = {
      name: "E-commerce Store",
      street1: "123 Store Lane",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "US",
    };

    const addressTo = {
      name: userData.fullName,
      street1: userData.address,
      city: userData.city,
      state: userData.state,
      zip: userData.zipCode,
      country: userData.country, // Dynamic country from form
    };

    const parcels = [
      {
        length: "10",
        width: "10",
        height: "10",
        distance_unit: "in",
        weight: "5",
        mass_unit: "lb",
      },
    ];

    try {
      const response = await fetch("/api/shippoOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressFrom,
          addressTo,
          parcels,
          orderId: orderId,
          totalAmount: 100, // Example price, use actual cart items price
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShipmentDetails({
          orderId: data.orderId,
          totalAmount: data.totalAmount,
          eta: data.eta,
          trackingNumber: data.trackingNumber,
        });
        setCheckoutStatus("Order placed successfully!");
      } else {
        setCheckoutStatus("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      setCheckoutStatus("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading after API call finishes
    }
  };

  const handleTrackShipment = async () => {
    if (!trackingNumber) {
      alert("Please enter a tracking number");
      return;
    }

    setIsTracking(true);
    try {
      const carrier = "shippo";
      const orderId = shipmentDetails?.orderId;
      const response = await fetch("/api/liveTracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber, carrier, orderId }),
      });

      const data = await response.json();
      if (response.ok && data?.trackingDetails) {
        setTrackingData(data);
      } else {
        setTrackingData(null);
      }
    } catch (error) {
      console.log("Error fetching tracking status:", error);
      setTrackingData(null);
    } finally {
      setIsTracking(false);
    }
  };

  /* const sendConfirmationEmail = async (email: string, data: any) => {
    try {
      await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Your Order Confirmation",
          text: 
            `Order ID: ${data.orderId}
            Total Amount: ${data.totalAmount}
            ETA: ${data.eta}
            Tracking Number: ${data.trackingNumber}`
          ,
        }),
      });
    } catch (error) {
      console.error("Email Error:", error);
    }
  };
 */

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {!shipmentDetails ? (
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName} // Ensure the value is correctly linked
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2 text-black"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone Number */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="countryCode" className="block font-medium">
                      Country Code
                    </label>
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleCountryCodeChange}
                      className="w-1/4 p-2 border border-gray-300 rounded-l-lg"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="phoneNumber" className="block font-medium">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2"
                      placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Address */}
                <div>
                  <label htmlFor="address" className="block font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded-lg w-full p-2"
                    placeholder="Enter your address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>

                {/* Row 4: State, City, and Zip Code */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="state" className="block font-medium">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2"
                      placeholder="Enter your state"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="city" className="block font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2"
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block font-medium">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2"
                      placeholder="Enter your zip code"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm">{errors.zipCode}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block font-medium">
                      Country Name
                    </label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter your country name"
                      className="border rounded-lg w-full p-2"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-darkPrimary text-white rounded-md hover:bg-navbarColor disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 max-h-[90vh] overflow-y-auto">
              {/* Show shipment details */}
              {checkoutStatus && (
                <p className="text-blue-600 mt-4">{checkoutStatus}</p>
              )}
              {isLoading && <p className="text-gray-500">Loading...</p>}

              {/* Shipment Details */}
              {shipmentDetails && (
                <div className="mt-8 bg-green-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Shipment Details</h3>
                  <p>Order ID: {shipmentDetails.orderId}</p>
                  <p>Total Amount: ${shipmentDetails.totalAmount}</p>
                  <p>ETA: {shipmentDetails.eta}</p>
                  <p>
                    Tracking Number:{" "}
                    {shipmentDetails.trackingNumber ||
                      "Tracking information is not available yet."}
                  </p>
                </div>
              )}

              {/* Track Shipment Card */}
              <div className="mt-6 bg-white p-6 rounded-lg  shadow-lg shadow-gray-600">
                <h1 className="text-2xl font-bold mb-4">Track Your Shipment</h1>
                <p className="p-2">
                  Write (SHIPPO_TRANSIT) in input field to track history
                </p>
                <div className="flex space-x-4 mb-6">
                  <input
                    type="text"
                    placeholder="Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="p-2 border rounded-md w-full"
                  />
                  <button
                    onClick={handleTrackShipment}
                    className="bg-blue-500 text-white p-2 rounded-md"
                  >
                    Track
                  </button>
                </div>

                {isTracking && <p className="text-gray-500">Loading...</p>}
                {trackingData && trackingData.trackingDetails && (
                  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-4">
                      Shipment Tracking Details
                    </h2>
                    <p>
                      <strong>Tracking Number:</strong>{" "}
                      {trackingData.trackingDetails.tracking_number}
                    </p>
                    <p>
                      <strong>Carrier:</strong>{" "}
                      {trackingData.trackingDetails.carrier}
                    </p>
                    <p>
                      <strong>ETA:</strong>{" "}
                      {trackingData.trackingDetails.eta || "N/A"}
                    </p>
                    <p>
                      <strong>Origin:</strong>{" "}
                      {`${trackingData.trackingDetails.address_from.city}, ${trackingData.trackingDetails.address_from.state}, ${trackingData.trackingDetails.address_from.country}`}
                    </p>
                    <p>
                      <strong>Destination:</strong>{" "}
                      {`${trackingData.trackingDetails.address_to.city}, ${trackingData.trackingDetails.address_to.state}, ${trackingData.trackingDetails.address_to.country}`}
                    </p>
                    <h3 className="text-lg font-bold mt-4">Tracking History</h3>
                    {trackingData.trackingDetails.tracking_history?.filter(
                      (historyItem: any) => historyItem.status === "TRANSIT"
                    ).length > 0 ? (
                      <ul className="list-disc ml-6">
                        {trackingData.trackingDetails.tracking_history
                          .filter(
                            (historyItem: any) =>
                              historyItem.status === "TRANSIT"
                          )
                          .map((historyItem: any, index: number) => (
                            <li key={index}>
                              <p>
                                <strong>Date:</strong>{" "}
                                {new Date(
                                  historyItem.status_date
                                ).toLocaleString()}
                              </p>
                              <p>
                                <strong>Location:</strong>{" "}
                                {`${historyItem.location?.city || "N/A"}, ${historyItem.location?.state || "N/A"}, ${historyItem.location?.country || "N/A"}`}
                              </p>
                              <p>
                                <strong>Status:</strong> {historyItem.status}
                              </p>
                              <p>
                                <strong>Details:</strong>{" "}
                                {historyItem.status_details || "N/A"}
                              </p>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p>No tracking history with status 'TRANSIT'.</p>
                    )}
                  </div>
                )}
                {!trackingData && !isTracking && (
                  <p className="text-gray-500">
                    Enter a tracking number to see shipment details.
                  </p>
                )}
              </div>

              <div className="flex justify-end mt-6 mb-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 bg-darkPrimary text-white rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CheckoutModal;
