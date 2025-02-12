import { ReactNode } from "react";
import { TypedObject } from "@portabletext/types";

export interface CardProps {
    id?: string;
    image: string;
    name: string;
    description?: string;
    price?: number;
    color?: string, 
    material?: string,
    dimensions?: {
        length: number,
        width: number,
        height: number,
        weight: number,
        mass_unit: string,
        distance_unit: string
    }, 
    stock?: number , 
    added_on?: string,
    imageUrl?: string,
    rating?: number,
    rating_counts?: number, 
    category?: number,
    comments?: {
        user: string,
        comment: string,
    }
}


export interface FeatureProprs {
    image: string;
    heading: string;
    para: string;
}

export interface CartItem {
    name: string;
    id: string;
    image: string;
    quantity: number;
    price: string | number;
}

export interface Order {
    orderId: string;
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
  }
  
  export interface UserData {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    address: string;
    country: string;
    zipCode: string;
    state: string;
    city: string;
    order: Order[];
  }

 export interface ShipmentData {
    orderId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    countryCode: string;
    shippingAddress: string;
    trackingNumber: string;
    shipmentDate: string;
    deliveryDate: string;
    carrier: string;
  }

  interface OrderData {
    productId: string;
    productName: string;
    quantity: number;
    totalAmount: number;
    status: string;
    originalPrice: number;
  }
  
  export interface UserOrders {
    orderId: string;
    userId: string;
    orderDate: string;
    orderData: OrderData[];
  }


export interface ReviewCardPropsTypes {
  _id: string;
  name: string;
  comment: string;
  date: string;
  rating: string;
  description: string;
  correct: string;
  onEdit: () => void;
  onRemove: (id: string) => Promise<void>;
}

export interface HappyCustomerCardPropsTypes {
  id: string;
  rating: string;
  title: string;
  correctImg: string;
  des: string;
}

export interface AddToCartItemPropsTypes {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  offer: string;
  discount: string;
  rating: string;
  product:
    | {
        id: string;
        image: string;
        title: string;
        price: number;
        rating: string;
      }
    | {};
  isStock: boolean;
}


export interface CartProviderProps {
  children: ReactNode;
}
export interface CasualCardsPropsTypes {
  id: string;
  image: string;
  title: string;
  rating: string;
  ratingReview: string;
  price: number;
  offer?: string;
  discount?: number | string;
}
export interface NextArrowsProps {
  onClick: () => void;
}
export interface PrevArrowsProps {
  onClick: () => void;
}


export interface GridProps {
  products: {
    _id: string;
    name: string;
    price: number;
    discountPercent: number | null;
    offer?: boolean | undefined;
    imageUrl: string;
    ratingReviews?: number; 
  }[];
  addToCompare: (product: {
    _id: string;
    name: string;
    price: number;
    discountPercent: number | null;
    offer?: boolean | undefined;
    imageUrl: string;
    ratingReviews?: number; 
  }) => void;
}
export interface GridsProps {
  products: CardProps[]; 
  addToCompare: (product: CardProps) => void;
}


export interface CustomerCommnetsProps {
  name: string,
  comment: string,
  date: string
}
// export interface ModalProps {
//   onClose: () => void;
//   onSubmit: (review: {
//     name: string;
//     description: string;
//     date: string;
//     _id?: string;
//   }) => void;
//   currentReview: {
//     _id?: string;
//     name: string;
//     description: string;
//     date: string;
//   } | null;
// }
export interface NavProduct {
  id: string;
  title: string;
  price: number;
}
// export interface SearchbarTypes {
//   _id: string;
//   name: string;
//   route: any;
// }
export interface NewArrivalProduct {
  ratingReviews?: number;
  sizes?: string[];
  colors?: string[];
  offer?: number;
  name: string;
  _id: string;
  imageUrl: string;
  discountPercent?: number;
  category: string;
  description: string;
  price: number;
}
export interface RangeSliderProps {
  category: string;
  setFilteredProducts: (products: any[]) => void;
  setTotalPages: (totalPages: number) => void;
  currentPage: number;            // Add currentPage to props
  setCurrentPage: (page: number) => void; // Add setCurrentPage to props
}

export interface ModalProps {
  onClose: () => void;
  onSubmit: (review: ReviewCardPropsTypes) => Promise<void>; 
  currentReview: ReviewCardPropsTypes | null;
}
export interface ReviewSubmissionType {
  name: string;
  description: string;
  date: string;
  _id?: string;
}
export interface SearchbarTypes {
  _id: string;
  name: string;
  _type: string;
}
export interface ContactFormData {
  name: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}
export interface FAQ {
  question: string;
  answer: string;
}
export interface FAQSectionProps {
  faqs: FAQ[];
  query: string;
}
export interface FAQSearchBarProps {
  onSearch: (query: string) => void;
}
export interface Message {
  user: "User" | "Bot";
  text: string;
}
export interface Guide {
  title: string;
  content: TypedObject[]; // Change from string[] to TypedObject[]
  slug: { current: string };
}

export interface GuideDetailsProps {
  guide: Guide;
  onBack: () => void; 
}
export interface UserPageGuide {
  _id: string;
  title: string;
  content: TypedObject[];
  slug: { current: string };
}

export interface GuideList {
  slug: { current: string };
  title: string;
}
export interface UserGuideListProps {
  guides: GuideList[]; 
  onGuideClick: (guide: GuideList) => void;
}
export interface WishlistItems {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  discountPercent?: number;
}
export interface SideBarProps {
  handleCategoryChange: (category: string, index: number) => void;
  activeColor: number | null;
  setFilteredProducts: (products: any[]) => void;
  setTotalPages: (totalPages: number) => void;
}
export interface ProductSuggestion {
  _id: string;
  name: string;
  imageUrl: string;
  _type: string;
}
export interface Translations {
  signupMessage: string;
  signupNow: string;
  // ... add other translation keys for all your components
  heading?: string;  // Example for Banner component
  bannerSubtitle?: string; // Example for Banner component
  // ... more translations
}
export interface TopHeaderProps {
  translations: Translations;
  language: string;      
  onChangeLanguage: (lang: string) => void;
}
