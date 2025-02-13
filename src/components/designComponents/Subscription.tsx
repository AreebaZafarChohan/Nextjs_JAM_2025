"use client";
import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/designComponents/ui/alert-dialog";

interface Subscription {
  _id?: string;
  name: string;
  email: string;
  plan: "monthly" | "yearly";
  status?: string;
  startDate?: string;
  renewalDate?: string;
  billingAddress?: string;
  paymentMethod?: string;
  transactionId?: string;
  history?: { status: string; date: string }[];
}

export default function SubscriptionComponent() {
  const [subscription, setSubscription] = useState<Subscription>({
    name: "",
    email: "",
    plan: "monthly",
  });
  const [status, setStatus] = useState<string>("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [subscriptionToCancel, setSubscriptionToCancel] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [showCards, setShowCards] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  useEffect(() => {
    setSubscription({
      name: "",
      email: "",
      plan: "monthly",
    });
    setShowForm(true);
    setShowCards(false);
    setShowSuccessAlert(false);
    setError("");
  }, []);

  useEffect(() => {
    async function fetchSubscriptions() {
      setLoading(true);
      try {
        const data: Subscription[] = await client.fetch('*[_type == "subscription"]');
        setSubscriptions(data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        setError("Failed to fetch subscriptions. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchSubscriptions();
  }, []);

  const handleFormSubmit = () => {
    if (!subscription.name || !subscription.email) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(subscription.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setShowForm(false);
    setShowCards(true);
    setError("");
  };

  const handleSubscribe = async (plan: "monthly" | "yearly") => {
    setLoading(true);
    const today = new Date();
    const renewalDate = new Date();
    if (plan === "monthly") {
      renewalDate.setMonth(today.getMonth() + 1);
    } else {
      renewalDate.setFullYear(today.getFullYear() + 1);
    }
    try {
      const existingSubscription: Subscription[] = await client.fetch(
        '*[_type == "subscription" && email == $email]',
        { email: subscription.email }
      );
      if (existingSubscription.length > 0) {
        setStatus("You are already subscribed!");
        return;
      }
      const newSubscription: Subscription = {
        ...subscription,
        plan,
        status: "active",
        startDate: today.toISOString(),
        renewalDate: renewalDate.toISOString(),
        history: [{ status: "active", date: today.toISOString() }],
      };
      const createdSubscription = await client.create({
        _type: "subscription",
        ...newSubscription,
      });
      setStatus("Subscription successful!");
      setSubscriptions((prev) => [...prev, { ...newSubscription, _id: createdSubscription._id }]);
      setShowSuccessAlert(true);
      setShowCards(false);
      toast.success("Your subscription has been successfully created.", {
        description: "You can now enjoy premium perks.",
        action: {
          label: "Undo",
          onClick: () => {
            handleCancel(createdSubscription._id); 
          },
        },
      });
    } catch (error) {
      console.error("Sanity Error:", error);
      setStatus("Error subscribing. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    setLoading(true);
    try {
      await client.delete(id);
      setSubscriptions((prev) => prev.filter((sub) => sub._id !== id));
      setStatus("Subscription canceled successfully!");
      toast.success("Subscription canceled successfully!");
      closeSuccessAlert(); 
    } catch (error) {
      console.error("Error canceling subscription:", error);
      setStatus("Error canceling. Try again.");
    } finally {
      setLoading(false);
      setShowCancelModal(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const openCancelModal = (id: string) => {
    setSubscriptionToCancel(id);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setSubscriptionToCancel(null);
  };

  const closeSuccessAlert = () => {
    setShowSuccessAlert(false);
    setSubscription({ name: "", email: "", plan: "monthly" });
    setShowForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {showForm && (
        <div>
          <h1 className="text-[29px] font-clash text-darkPrimary font-extrabold mt-8 tracking-wider">
            Unlock Premium Perks
          </h1>
          <div className="mt-7">
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={subscription.name}
                onChange={(e) => setSubscription({ ...subscription, name: e.target.value })}
                type="text"
                name="floating_text"
                id="floating_text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-buttonBlue appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-satoshi"
              >
                Your Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={subscription.email}
                onChange={(e) => setSubscription({ ...subscription, email: e.target.value })}
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-buttonBlue bg-transparent border-0 border-b-[1px] border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-satoshi"
              >
                Email Address
              </label>
            </div>
            <button
              className="w-full bg-darkPrimary text-white py-2 rounded-[50px] hover:bg-gray-900 transition duration-300"
              onClick={handleFormSubmit}
            >
              Next
            </button>
            {error && (
              <p className="mt-4 p-2 border rounded bg-red-100 text-red-600">
                {error}
              </p>
            )}
          </div>
        </div>
      )}

      {showCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 font-clash text-darkPrimary tracking-wider">Monthly Plan</h3>
            <p className="text-2xl font-bold mb-2 font-satoshiBold text-darkPrimary">
              $10 <span className="text-sm text-gray-500 font-satoshi">/month</span>
            </p>
            <ul className="text-sm text-gray-600 mb-4 font-satoshi">
              <li>✅ Access to all features</li>
              <li>✅ 24/7 Support</li>
              <li>✅ Cancel anytime</li>
            </ul>
            <button
              className="w-full bg-darkPrimary text-white py-2 font-satoshi rounded-[50px] hover:bg-lightGray border border-yellow-500 hover:text-darkPrimary transition duration-300"
              onClick={() => handleSubscribe("monthly")}
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe Monthly"}
            </button>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 font-clash text-darkPrimary tracking-wide">Yearly Plan</h3>
            <p className="text-2xl font-bold mb-2 font-satoshiBold text-darkPrimary">
              $100 <span className="text-sm text-gray-500 font-satoshi">/year</span>
            </p>
            <ul className="text-sm text-gray-600 mb-4 font-satoshi">
              <li>✅ Access to all features</li>
              <li>✅ 24/7 Support</li>
              <li>✅ Save $20 compared to monthly</li>
            </ul>
            <button
              className="w-full bg-lightGray border border-yellow-500 text-darkPrimary py-2 font-satoshi rounded-[50px] hover:text-white hover:bg-darkPrimary transition duration-300"
              onClick={() => handleSubscribe("yearly")}
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe Yearly"}
            </button>
          </div>
        </div>
      )}

      <h3 className="text-lg font-bold mt-6 font-clash text-darkBlue">Your Subscriptions</h3>
      {loading ? (
        <p>Loading subscriptions...</p>
      ) : (
        <ul>
          {subscriptions.map((sub) => (
            <li
              key={sub._id}
              className="p-4 bg-gray-50 rounded mt-2 flex flex-col gap-y-[20px]"
            >
              <div>
                <p className="text-gray-600 text-sm font-satoshi">{sub.name}</p>
                <p className="text-sm text-gray-600 font-satoshi">{sub.email}</p>
                <p className="text-sm text-gray-600 font-satoshi">
                  {sub.plan === "monthly" ? "Monthly Plan" : "Yearly Plan"}
                </p>
                <p className="text-sm text-gray-600 font-satoshi">
                  Start Date:{" "}
                  {sub.startDate
                    ? new Date(sub.startDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-600 font-satoshi">
                  Renewal Date:{" "}
                  {sub.renewalDate
                    ? new Date(sub.renewalDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-600 font-satoshi">Status: {sub.status}</p>
              </div>
              <button
                className="bg-darkPrimary text-white px-3 py-1 rounded-[50px] hover:bg-gray-900 transition duration-300"
                onClick={() => sub._id && openCancelModal(sub._id)}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}

      {showCancelModal && (
        <AlertDialog open={showCancelModal} onOpenChange={setShowCancelModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this subscription?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeCancelModal}>No</AlertDialogCancel>
              <AlertDialogAction onClick={() => subscriptionToCancel && handleCancel(subscriptionToCancel)}>
                Yes, Cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}