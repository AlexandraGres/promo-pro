describe('Article Search Test', () => {
  before(() => {
    cy.session('loginSession', () => {
      cy.login();
      cy.createArticle();
    });
  });

  it('should search article by title', () => {
    cy.visit('/');

    cy.get('#show-button', { timeout: 10000 }).click();
    cy.get('li').contains('Media').click();
    cy.contains('Cypress Test Article').should('be.visible');
  });

  after(() => {
    cy.deleteArticle();
  });
});
