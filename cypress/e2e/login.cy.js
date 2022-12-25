/**
 * - Login spec
 *   - should correctly display the login modal when the login button is clicked
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should check that the user is logged in first
 *   - should be properly logged out
*/

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should correctly display the login modal when the login button is clicked', () => {
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

  it('should display alert message when email and password are wrong', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('button.MuiButton-outlinedPrimary').click();
    cy.get('div.MuiInputBase-root>input[name="email"]').type('keroja@gmail.com');
    cy.get('div.MuiInputBase-root>input[name="password"]').type('12345');

    cy.get('div.input-group>button.MuiButton-containedPrimary').contains(/^Sign In$/).click();
    cy.get('div.MuiAlert-root').contains('div.MuiAlert-message', 'email or password is wrong');
  });

  it('should display home page(treads page) when email and password are correct', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('button.MuiButton-outlinedPrimary').click();
    cy.get('div.MuiInputBase-root>input[name="email"]').type('kejora@gmail.com');
    cy.get('div.MuiInputBase-root>input[name="password"]').type('kejora');

    cy.get('div.input-group>button.MuiButton-containedPrimary').contains(/^Sign In$/).click();

    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('button.MuiIconButton-root[aria-label="Kejora"]').should('be.visible').click();
    cy.get('div.MuiMenu-paper>ul.MuiList-root').contains('li.MuiButtonBase-root', 'Sign Out').should('be.visible');
  });
});
