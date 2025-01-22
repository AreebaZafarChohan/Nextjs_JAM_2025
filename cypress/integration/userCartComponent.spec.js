describe('UserCartComponent', () => {
    beforeEach(() => {
      // Setup: Add items to the localStorage
      const mockCart = [
        { id: 1, name: 'Sofa', price: 200, quantity: 1, image: '/images/sofa.jpg' },
        { id: 2, name: 'Table', price: 150, quantity: 2, image: '/images/table.jpg' },
      ];
      localStorage.setItem('cart', JSON.stringify(mockCart));
      cy.visit('/user-cart'); // Change this path according to your route
    });
  
    it('should render cart items from localStorage', () => {
      cy.get('.user-cart').should('be.visible');
      cy.get('.font-clash').contains('Your shopping cart');
      cy.get('.text-center').should('not.exist'); // Ensure cart is not empty
      cy.get('.product-name').contains('Sofa');
      cy.get('.product-name').contains('Table');
    });
  
    it('should remove an item from the cart', () => {
      cy.get('.remove-button').first().click(); // Assuming .remove-button is the class on remove buttons
      cy.get('.product-name').should('not.contain', 'Sofa');
    });
  
    it('should increase and decrease the quantity of an item', () => {
      cy.get('.increase-quantity-button').first().click();
      cy.get('.quantity').first().should('have.text', '2'); // Check if the quantity increased
  
      cy.get('.decrease-quantity-button').first().click();
      cy.get('.quantity').first().should('have.text', '1'); // Check if the quantity decreased
    });
  
    it('should calculate subtotal correctly', () => {
      cy.get('.subtotal-value').should('contain.text', '£500.00'); // Subtotal for 1 x £200 + 2 x £150
    });
  
    it('should display an alert if the cart is empty when trying to checkout', () => {
      localStorage.setItem('cart', JSON.stringify([])); // Empty cart
      cy.reload(); // Reload to trigger the component re-render
      cy.get('.go-to-checkout-button').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Please add items to your cart before proceeding to checkout.');
      });
    });
  
    it('should open checkout modal when there are items in the cart', () => {
      cy.get('.go-to-checkout-button').click();
      cy.get('.checkout-modal').should('be.visible'); // Assuming CheckoutModal has a class .checkout-modal
    });
  
    it('should redirect to continue shopping page', () => {
      cy.get('.continue-shopping-button').click();
      cy.url().should('include', '/products');
    });
  });