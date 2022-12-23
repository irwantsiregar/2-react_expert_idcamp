/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
*/

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display login page correctly', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('button.MuiButton-outlinedPrimary').click();

    cy.get('div.MuiInputBase-root>input[name="email"]').should('be.visible');
    cy.get('div.MuiInputBase-root>input[name="password"]').should('be.visible');

    cy.get('div.input-group>button.MuiButton-containedPrimary').contains(/^Sign In$/).should('be.visible');
  });

  it('should display alert message when email is empty', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('button.MuiButton-outlinedPrimary').click();
    cy.get('div.input-group>button.MuiButton-containedPrimary').contains(/^Sign In$/).click();
    cy.get('div.MuiAlert-root').contains('div.MuiAlert-message', '"email" is not allowed to be empty');
  });

  it('should display alert message when password is empty', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('button.MuiButton-outlinedPrimary').click();
    cy.get('div.MuiInputBase-root>input[name="email"]').type('kejora@gmail.com');

    cy.get('div.input-group>button.MuiButton-containedPrimary').contains(/^Sign In$/).click();
    cy.get('div.MuiAlert-root').contains('div.MuiAlert-message', '"password" is not allowed to be empty');
  });
});
