/**
 * - Add Thread spec
 *   - should correctly display add-thread page when the icon-plus button is clicked
 *   - should display alert message when title is empty
 *   - should display alert message when body is empty
 *   - should be redirected to the home page(threads) when the thread is successfully added
*/

describe('Add Thread spec', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('button.MuiButton-outlinedPrimary').click();
    cy.get('div.MuiInputBase-root>input[name="email"]').type('kejora@gmail.com');
    cy.get('div.MuiInputBase-root>input[name="password"]').type('kejora');

    cy.get('div.input-group>button.MuiButton-containedPrimary').contains(/^Sign In$/).click();
  });

  it('should correctly display add-thread page when the icon-plus button is clicked', () => {
    cy.get('div.MuiToolbar-gutters').find('a[aria-label="add"]').should('be.visible').click();

    cy.url().should('include', '/add-thread');
    cy.get('main.MuiContainer-root').contains('h1', 'Create Discussion').should('be.visible');

    cy.get('div.MuiInputBase-root>input[name="title"]').should('be.visible');
    cy.get('div.MuiInputBase-root>textarea[name="body"]').should('be.visible');
    cy.get('div.MuiInputBase-root>input[name="category"]').should('be.visible');
    cy.get('div[aria-label="add-thread"]').contains('button.MuiButton-outlinedPrimary', 'Create Discussion').should('be.visible');
  });

  it('should display alert message when title is empty', () => {
    cy.get('div.MuiToolbar-gutters').find('a[aria-label="add"]').should('be.visible').click();

    cy.url().should('include', '/add-thread');

    cy.get('div[aria-label="add-thread"]').contains('button.MuiButton-outlinedPrimary', 'Create Discussion').click();
    cy.get('div.MuiAlert-root').contains('div.MuiAlert-message', '"title" is not allowed to be empty').should('be.visible');
  });

  it('should display alert message when body is empty', () => {
    cy.get('div.MuiToolbar-gutters').find('a[aria-label="add"]').should('be.visible').click();

    cy.url().should('include', '/add-thread');

    cy.get('div.MuiInputBase-root>input[name="title"]').type('React Redux');

    cy.get('div[aria-label="add-thread"]').contains('button.MuiButton-outlinedPrimary', 'Create Discussion').click();
    cy.get('div.MuiAlert-root').contains('div.MuiAlert-message', '"body" is not allowed to be empty').should('be.visible');
  });

  it('should be redirected to the home page(threads) when the thread is successfully added', () => {
    cy.get('div.MuiToolbar-gutters').find('a[aria-label="add"]').should('be.visible').click();

    cy.url().should('include', '/add-thread');

    cy.get('div.MuiInputBase-root>input[name="title"]').type('React Redux');
    cy.get('div.MuiInputBase-root>textarea[name="body"]').type('Learn React Fundamentals');
    cy.get('div.MuiInputBase-root>input[name="category"]').type('redux');
    cy.get('div[aria-label="add-thread"]').contains('button.MuiButton-outlinedPrimary', 'Create Discussion').click();

    cy.url().should('include', '/');
    cy.get('div.MuiCardHeader-root>div.MuiCardHeader-content').contains('span.MuiCardHeader-title', 'Kejora').should('be.visible');
    cy.get('div.MuiCardContent-root').contains('a.MuiLink-root', 'React Redux').should('be.visible');
  });
});
