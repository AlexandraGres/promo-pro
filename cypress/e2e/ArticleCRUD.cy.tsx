describe('Article CRUD Test', () => {
  before(() => {
    cy.session('loginSession', () => {
      cy.login();
    });
  });

  it('should validate form fields', () => {
    cy.visit('/');
    cy.get('[data-cy=add-article]', { timeout: 10000 }).should('be.visible').click();
    cy.contains('Add New Article', { timeout: 10000 }).should('be.visible');
    cy.get('[data-cy=publish-button]').click();
    cy.contains('Title is required').should('be.visible');
    cy.contains('Text is required').should('be.visible');
  });

  it('should create a new article', () => {
    cy.visit('/');
    cy.get('[data-cy=add-article]', { timeout: 10000 }).should('be.visible').click();
    cy.contains('Add New Article', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="title"]').type('Cypress Test Article');
    cy.get('textarea[name="text"]').type('This is a test article created using Cypress.');
    cy.get('[data-cy=category]').click();
    cy.get('li').contains('Technology').click();
    cy.get('button[type="submit"]').click();

    cy.contains('Cypress Test Article', { timeout: 10000 }).should('be.visible');
  });

  it('should edit the article', () => {
    cy.visit('/');
    cy.contains('Cypress Test Article', { timeout: 10000 }).should('be.visible');
    cy.get('[data-cy=menu-button]').click();
    cy.get('[data-cy=edit-button]').click();

    cy.contains('Edit Article', { timeout: 10000 }).should('be.visible');
    cy.get('input[name="title"]').clear().type('Cypress Test Article Updated', { timeout: 10000 });
    cy.get('button[type="submit"]').click();

    cy.contains('Cypress Test Article Updated', { timeout: 10000 }).should('be.visible');
  });

  it('should delete the article', () => {
    cy.visit('/');
    cy.get('[data-cy=menu-button]', { timeout: 10000 }).click();
    cy.get('[data-cy=delete-button]').click();

    cy.contains('Cypress Test Article Updated').should('not.exist');
  });
});
