describe('Login page test', () => {
  before(() => {
    cy.visit('/login');
    cy.contains('Welcome back').should('be.visible');
  });

  it('should successfully log in with valid inputs', () => {
    cy.intercept('POST', '**/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword**').as(
      'firebaseLogin',
    );

    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.wait('@firebaseLogin').its('response.statusCode').should('eq', 200);

    cy.contains('John Doe', { timeout: 10000 }).should('be.visible');
    cy.contains('Articles Dashboard').should('be.visible');
  });
});
