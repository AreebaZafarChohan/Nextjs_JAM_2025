describe("Product Card Details Page", () => {
    const productId = "id1"; // Replace with an actual product ID from your Sanity database
    const productUrl = `/product/${productId}`; // Adjust the route according to your application structure
  
    beforeEach(() => {
      // Visit the product details page before each test
      cy.visit(productUrl);
    });
  
    it("should display product details", () => {
      // Verify product name is displayed
      cy.get("h3").should("exist").and("not.be.empty");
  
      // Verify product price is displayed
      cy.get("h4").should("contain.text", "£");
  
      // Verify product description
      cy.get("p").contains("Product description").should("exist");
    });
  
    it("should display product image", () => {
      cy.get("img.detail-img").should("be.visible").and("have.attr", "src");
    });
  
    it("should adjust quantity", () => {
      // Default quantity should be 1
      cy.get(".quantity-btn").contains("1");
  
      // Increase quantity
      cy.get(".quantity-btn button").last().click();
      cy.get(".quantity-btn").contains("2");
  
      // Decrease quantity
      cy.get(".quantity-btn button").first().click();
      cy.get(".quantity-btn").contains("1");
    });
  
    it("should add the product to the cart", () => {
      // Add to cart
      cy.get(".add-to-cart").click();
  
      // Verify modal opens
      cy.get(".fixed").should("contain.text", "Product added to cart!");
  
      // Close the modal
      cy.get(".fixed button").click();
      cy.get(".fixed").should("not.exist");
    });
  
    it("should navigate to the product list on 'See Less' click", () => {
      // Click "See Less"
      cy.get(".see-less").click();
  
      // Verify navigation
      cy.url().should("include", "/products");
    });
  
    it("should display related products", () => {
      // Verify related products are visible
      cy.get(".detail-product-card").within(() => {
        cy.get(".ProductCard").should("have.length.at.least", 1);
      });
    });
  });