/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): Chainable<any>;
    createArticle(): Chainable<any>;
    deleteArticle(): Chainable<any>;
  }
}

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('input[name="email"]').type('john.doe@example.com');
  cy.get('input[name="password"]').type('password');
  cy.get('button[type="submit"]').click();
  cy.contains('Articles Dashboard', { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('createArticle', () => {
  cy.get('[data-cy=add-article]', { timeout: 10000 }).should('be.visible').click();
  cy.contains('Add New Article', { timeout: 10000 }).should('be.visible');
  cy.get('input[name="title"]').type('Cypress Test Article');
  cy.get('textarea[name="text"]').type('This is a test article created using Cypress.');
  cy.get('[data-cy=category]').click();
  cy.get('li').contains('Media').click();
  cy.get('button[type="submit"]').click();
  cy.contains('Cypress Test Article', { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('deleteArticle', () => {
  cy.visit('/');
  cy.get('[data-cy=menu-button]', { timeout: 10000 }).click();
  cy.get('[data-cy=delete-button]').click();
  cy.contains('Cypress Test Article').should('not.exist');
});
