describe('Terms', () => {
  it('should visit the page and check for a title', () => {
    cy.visit('/terms');
    cy.contains('Privacy Policy');
  });
});
