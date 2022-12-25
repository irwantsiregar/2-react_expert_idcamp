/**
 * - Logout spec
 *   - should check that the user is logged in first
 *   - should be properly logged out
*/

describe('Logout spec', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('button.MuiButton-outlinedPrimary').click();
    cy.get('div.MuiInputBase-root>input[name="email"]').type('kejora@gmail.com');
    cy.get('div.MuiInputBase-root>input[name="password"]').type('kejora');

    cy.get('div.input-group>button.MuiButton-containedPrimary').contains(/^Sign In$/).click();
  });

  it('should check that the user is logged in first', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('button.MuiIconButton-root[aria-label="Kejora"]').should('be.visible').click();
    cy.get('div.MuiPaper-root>ul.MuiList-root').contains('li.MuiButtonBase-root', 'Sign Out').should('be.visible');
  });

  it('should be properly logged out', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('button.MuiIconButton-root[aria-label="Kejora"]').click();
    cy.get('div.MuiMenu-paper>ul.MuiList-root').contains('li.MuiButtonBase-root', 'Sign Out').should('be.visible').click();

    cy.get('div.MuiInputBase-root>input[name="email"]').should('be.visible');
    cy.get('div.MuiInputBase-root>input[name="password"]').should('be.visible');
    cy.get('div.input-group>button.MuiButton-containedPrimary').contains(/^Sign In$/).should('be.visible');
  });
});
