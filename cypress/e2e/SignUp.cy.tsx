describe('SignUp form validation', () => {
  before(() => {
    cy.visit('/sign-up');
  });

  it('should display validation errors for invalid inputs', () => {
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="age"]').type('0');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="confirmPassword"]').type('different-password');
    cy.get('input[name="accept"]').check();
    cy.get('input[name="accept"]').uncheck();
    cy.get('input[name="confirmPassword"]').type('{enter}');

    cy.contains('age must be a positive number');
    cy.contains('Please enter a valid email');
    cy.contains('Passwords must match');
    cy.contains('You must accept the terms and conditions');
  });
});
