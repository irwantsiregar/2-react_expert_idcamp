/**
 * - Threads spec (root page)
 *   - should display threads(root) page correctly
 *   - should try liking the thread when not logged in
 *   - should try disliking the thread when not logged in
 */

describe('Threads spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display threads(root) page correctly', () => {
    cy.get('div.MuiCard-root').first().find('a.MuiLink-root').should('be.visible')
      .click();
    cy.url().should('match', /thread\/.+$/);
    cy.get('div.MuiCard-root').find('h6').should('be.visible');
  });

  it('should try liking the thread when not logged in', () => {
    cy.get('div.MuiCard-root>.MuiCardActions-root').first().find('p[aria-label="liked thread"]').click();
    cy.get('div.MuiModal-root').contains('h2#modal-modal-title', 'Uppss !!').should('be.visible');
    cy.get('p#button-close>svg[data-testid="CloseIcon"]').click();
  });

  it('should try disliking the thread when not logged in', () => {
    cy.get('div.MuiCard-root>.MuiCardActions-root').first().find('button[aria-label="disliked thread"]').click();
    cy.get('div.MuiModal-root').contains('h2#modal-modal-title', 'Uppss !!');
    cy.get('p#button-close>svg[data-testid="CloseIcon"]').click();
  });
});
