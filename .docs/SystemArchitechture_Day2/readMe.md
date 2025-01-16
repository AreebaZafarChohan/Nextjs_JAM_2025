### Furniture Website System Architecture

#### **Overview**
This document outlines the system architecture of an e-commerce platform focused on affordable and trendy Pinterest-inspired furniture. The platform is developed using **Next.js 14** with **TypeScript** and leverages **Sanity** as the content management system (CMS). Below is a detailed breakdown of the system structure and workflows.

---

### **High-Level System Architecture**

#### **Frontend Structure**
- **Framework**: Next.js 14 with TypeScript for server-side rendering (SSR) and fast, dynamic routes.
- **Pages**:
  - **Home**: Displays trending products and featured categories.
  - **About**: Provides information about the brand.
  - **Products**: Displays a list of all products.
  - **Product Details**: Dynamic route to show details of a single product.
  - **Cart**: Displays the user's cart and checkout options.
  - **Admin Panel**: For admin-only functionalities like analytics, stock, and user management.
  - **User Pages**:
    - **Login/Sign Up**: Handles user authentication.
    - **User Portal**: Displays order and shipment details.
  - **Admin Pages**:
    - **Analytics**: Shows total revenue, sales, and trends.
    - **Dashboard, Orders, Stock, Users**: Manage site operations.

#### **Reusable Components**
- **CardComponent.tsx**: Used for showcasing product details.
- **Feature.tsx**: Highlights key features across pages.
- **HeroSection.tsx, Listing.tsx, PopularProducts.tsx**: Core components for the homepage layout.

---

### **CMS (Sanity)**
- **Sanity Studio**: Used to manage:
  - **Products**: Stores product information like names, prices, images, and stock.
  - **Users**: Manages login credentials and order history.
  - **Orders**: Tracks purchased items and shipping information.
  - **Shipments**: Integrated with the Shippo API for live tracking.
  - **Analytics**: Collects data like sales and product performance.

- **Data Management**:
  - **Schemas**: Define structures for Orders, Products, Users, Shipments, and Inventory.
  - **GROQ Queries**: Fetch real-time data for frontend rendering.

---

### **Mock APIs**
- **Purpose**: Simulate server-side logic for dynamic rendering and API calls.
- **Endpoints**:
  - `/api/products`: Fetches product data.
  - `/api/shipments`: Creates shipments and retrieves tracking numbers.
  - `/api/liveTracking`: Fetches live tracking data.

---

### **Payment Gateway (Stripe)**
- **Purpose**: Securely handle payment transactions.
- **Integration**:
  - **Stripe Elements**: Used for collecting payment details.
  - **Mock Transactions**: Simulated payments during development.

---

### **Shipment Tracking (Shippo API)**
- **Purpose**: Provides shipment details and live tracking information.
- **Endpoints**:
  - `/api/shipments`: Creates shipment orders and retrieves tracking numbers.
  - `/api/tracks/{carrier}/{trackingNumber}`: Fetches live tracking details.

---

### **Workflow Overview**

#### **User Workflow**
1. **Browse Products**:
   - Products are dynamically fetched from Sanity using mock APIs.
2. **Add to Cart**:
   - Items can be added to the cart after login or signup.
3. **Checkout**:
   - User provides shipping and payment information via `CheckoutModal.tsx`.
4. **Payment**:
   - Payment is processed securely using Stripe.
5. **Track Shipment**:
   - Shipment details are fetched from the Shippo API and displayed on the user portal.

#### **Admin Workflow**
1. **Login**:
   - Admin accesses the Admin Panel using secure login credentials.
2. **Manage Data**:
   - Inventory, orders, and user data can be managed via components like `Stock.tsx` and `Order.tsx`.
3. **Analytics**:
   - Detailed metrics are displayed in `Analytics.tsx`.

---

### **Technologies and Tools**
- **Frontend**: Next.js 14 with TypeScript
- **CMS**: Sanity
- **Payment Gateway**: Stripe
- **Shipment Tracking**: Shippo API
- **Deployment**: Vercel

---

### **Folder Structure**
/project-root
  /src
    /app
      /about
        page.tsx
      /cart
        page.tsx
      /products
        page.tsx
        [id]
          page.tsx
      /contact
        page.tsx
      /user
        page.tsx
      /admin
        page.tsx
    /sanity
      /schemaTypes
        /modelTypes
          analytics.ts
          users.ts
          orders.ts
          shipments.ts
          stock.ts
          products.ts
    /types
      componentTypes.ts
  /components
    /about
      AboutBrand.tsx
      AboutFeature.tsx
      AboutGetInTouch.tsx
      AboutSection.tsx
      AboutSignUp.tsx
    /adminPanel
      Analytics.tsx
      Dashboard.tsx
      Order.tsx
      Stock.tsx
      Users.tsx
      SideBar.tsx
    /orderSystem
      CheckoutModal.tsx
      PaymentForm.tsx
      DisplayShipmentDetails.tsx
      UserLoginAndSignUp.tsx
    /userPortal
      LoginPortal.tsx
      UserDetail.tsx
    /userCart
      CardItem.tsx
      UserCartComponent.tsx
    /reusableComponents
      ProductCard.tsx
      AboutFeatureCard.tsx
      FeatureCard.tsx
    /heroSection
      Hero.tsx
      Listing.tsx
      PopularProdcuts.tsx
      SignUp.tsx
      GetInTouch.tsx
      Features.tsx
    /product
      ProductComponent.tsx
      ProductCardDetails.tsx
    /header
      Header.tsx
    /footer
      Footer.tsx
      Footerheadings.tsx
      FooterLinks.tsx

---

### **Folder Structure**

/project-root /src /app /about page.tsx /cart page.tsx /product page.tsx /[id] page.tsx /contact page.tsx /user page.tsx /admin page.tsx /sanity /schemaTypes /modelTypes analytics.ts // Other schemas for user, order, shipment, stock, products /types componentTypes.ts /components // Folder for app components


---

### **Data Flow**
1. **Products**: Fetched from Sanity and displayed dynamically on the frontend.
2. **User Cart**: Stored in local storage until the user logs in.
3. **Orders**: Stored in Sanity, accessible by users and admins.
4. **Payments**: Handled securely via Stripe.
5. **Shipments**: Tracked using the Shippo API.

---

### **Conclusion**
This architecture ensures scalability, maintainability, and a seamless user experience. The use of Next.js with TypeScript, Sanity, Stripe, and Shippo provides a robust foundation for the platform.

**Prepared By: Areeba Zafar (Student Leader)** 