describe('Article CRUD Test', () => {
  beforeEach(() => {
    cy.session('loginSession', () => {
      cy.login();
    });
    cy.visit('/', { timeout: 10000 });
  });

  it('should validate form fields', () => {
    cy.get('[data-cy=add-article]', { timeout: 10000 }).should('be.visible').click();
    cy.contains('Add New Article', { timeout: 10000 }).should('be.visible');
    cy.get('[data-cy=publish-button]').click();
    cy.contains('Title is required').should('be.visible');
    cy.contains('Text is required').should('be.visible');
  });

  it('should create a new article', () => {
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
    cy.get('[data-cy=menu-button]', { timeout: 10000 }).should('be.visible').click();
    cy.get('[data-cy=edit-button]').should('be.visible').click();
    cy.contains('Edit Article', { timeout: 10000 }).should('be.visible');
    cy.get('input[name="title"]')
      .clear()
      .type('Updated', { delay: 100 })
      .should('have.value', 'Cypress Test ArticleUpdated');
    cy.get('button[type="submit"]').click();
    cy.contains('Cypress Test ArticleUpdated', { timeout: 10000 }).should('be.visible');
  });

  it('should delete the article', () => {
    cy.get('[data-cy=menu-button]', { timeout: 10000 }).click();
    cy.get('[data-cy=delete-button]').click();
    cy.contains('Cypress Test ArticleUpdated').should('not.exist');
  });
});
