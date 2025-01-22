describe('CheckoutModal', () => {
    beforeEach(() => {
      cy.visit('/'); // Adjust with the correct URL where the component is rendered
    });
  
    it('should open and close the modal', () => {
      // Assuming there is a button or event to open the modal
      cy.get('[data-cy="open-modal-button"]').click(); // Replace with the actual selector
      cy.get('[data-cy="checkout-modal"]').should('be.visible');
  
      // Close the modal
      cy.get('[data-cy="close-modal-button"]').click(); // Replace with the actual selector
      cy.get('[data-cy="checkout-modal"]').should('not.exist');
    });
  
    it('should validate required fields', () => {
      cy.get('[data-cy="open-modal-button"]').click();
  
      // Submit the form without filling any fields
      cy.get('[data-cy="submit-button"]').click();
  
      // Check for validation error messages
      cy.get('[data-cy="error-fullname"]').should('contain', 'Full Name is required');
      cy.get('[data-cy="error-email"]').should('contain', 'Email is required');
      cy.get('[data-cy="error-phoneNumber"]').should('contain', 'Phone Number is required');
      cy.get('[data-cy="error-address"]').should('contain', 'Address is required');
      cy.get('[data-cy="error-state"]').should('contain', 'State is required');
      cy.get('[data-cy="error-city"]').should('contain', 'City is required');
      cy.get('[data-cy="error-zipCode"]').should('contain', 'Zip Code is required');
      cy.get('[data-cy="error-country"]').should('contain', 'Country is required');
    });
  
    it('should show email validation error', () => {
      cy.get('[data-cy="open-modal-button"]').click();
  
      // Fill in an invalid email
      cy.get('[data-cy="email-input"]').type('invalid-email');
      cy.get('[data-cy="submit-button"]').click();
  
      // Check for email validation error
      cy.get('[data-cy="error-email"]').should('contain', 'Please enter a valid email address.');
    });
  
    it('should fill form and submit data', () => {
      cy.get('[data-cy="open-modal-button"]').click();
  
      // Fill in the form with valid data
      cy.get('[data-cy="fullname-input"]').type('John Doe');
      cy.get('[data-cy="email-input"]').type('john.doe@example.com');
      cy.get('[data-cy="phoneNumber-input"]').type('1234567890');
      cy.get('[data-cy="address-input"]').type('123 Main St');
      cy.get('[data-cy="state-input"]').type('California');
      cy.get('[data-cy="city-input"]').type('Los Angeles');
      cy.get('[data-cy="zipCode-input"]').type('90001');
      cy.get('[data-cy="country-input"]').type('USA');
  
      // Submit the form
      cy.get('[data-cy="submit-button"]').click();
  
      // Check for success message or trigger for next steps
      cy.get('[data-cy="checkout-status"]').should('contain', 'Order placed successfully!');
    });
  
    it('should handle country code selection', () => {
      cy.get('[data-cy="open-modal-button"]').click();
  
      // Check initial country code value
      cy.get('[data-cy="countryCode-select"]').should('have.value', '+92');
  
      // Change country code and check value
      cy.get('[data-cy="countryCode-select"]').select('+1');
      cy.get('[data-cy="countryCode-select"]').should('have.value', '+1');
    });
  
    it('should show loading state during checkout', () => {
      cy.get('[data-cy="open-modal-button"]').click();
  
      // Fill in the form and submit
      cy.get('[data-cy="fullname-input"]').type('John Doe');
      cy.get('[data-cy="email-input"]').type('john.doe@example.com');
      cy.get('[data-cy="phoneNumber-input"]').type('1234567890');
      cy.get('[data-cy="address-input"]').type('123 Main St');
      cy.get('[data-cy="state-input"]').type('California');
      cy.get('[data-cy="city-input"]').type('Los Angeles');
      cy.get('[data-cy="zipCode-input"]').type('90001');
      cy.get('[data-cy="country-input"]').type('USA');
  
      // Click submit and check loading state
      cy.get('[data-cy="submit-button"]').click();
      cy.get('[data-cy="loading-indicator"]').should('be.visible'); // Assuming loading state is shown
    });
  
    it('should show shipment details after successful order', () => {
      cy.get('[data-cy="open-modal-button"]').click();
  
      // Fill in the form and submit
      cy.get('[data-cy="fullname-input"]').type('John Doe');
      cy.get('[data-cy="email-input"]').type('john.doe@example.com');
      cy.get('[data-cy="phoneNumber-input"]').type('1234567890');
      cy.get('[data-cy="address-input"]').type('123 Main St');
      cy.get('[data-cy="state-input"]').type('California');
      cy.get('[data-cy="city-input"]').type('Los Angeles');
      cy.get('[data-cy="zipCode-input"]').type('90001');
      cy.get('[data-cy="country-input"]').type('USA');
  
      // Submit and check if shipment details appear
      cy.get('[data-cy="submit-button"]').click();
      cy.get('[data-cy="shipment-details"]').should('be.visible');
      cy.get('[data-cy="order-id"]').should('contain', 'ORDER');
      cy.get('[data-cy="tracking-number"]').should('not.be.empty');
    });
  
    it('should handle tracking status', () => {
      cy.get('[data-cy="open-modal-button"]').click();
  
      // Fill in the form and submit
      cy.get('[data-cy="fullname-input"]').type('John Doe');
      cy.get('[data-cy="email-input"]').type('john.doe@example.com');
      cy.get('[data-cy="phoneNumber-input"]').type('1234567890');
      cy.get('[data-cy="address-input"]').type('123 Main St');
      cy.get('[data-cy="state-input"]').type('California');
      cy.get('[data-cy="city-input"]').type('Los Angeles');
      cy.get('[data-cy="zipCode-input"]').type('90001');
      cy.get('[data-cy="country-input"]').type('USA');
  
      // Submit and enter tracking number
      cy.get('[data-cy="submit-button"]').click();
      cy.get('[data-cy="tracking-number-input"]').type('TRACK123');
      cy.get('[data-cy="track-button"]').click();
  
      // Check for tracking details
      cy.get('[data-cy="tracking-details"]').should('be.visible');
    });
  });