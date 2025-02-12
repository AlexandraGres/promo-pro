describe('Article Search Test', () => {
  before(() => {
    cy.session('loginSession', () => {
      cy.login();
      cy.createArticle();
    });
  });

  it('should search article by title', () => {
    const searchQuery = 'cypress';

    cy.visit('/');

    cy.get('[data-cy=search-input]', { timeout: 10000 }).type(searchQuery, { timeout: 10000 });
    cy.contains('Cypress Test Article').should('be.visible');
  });

  after(() => {
    cy.deleteArticle();
  });
});
