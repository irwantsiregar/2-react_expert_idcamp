/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert message when the password is missing at least 6 characters
 *   - should display alert message when email is already taken
 *   - should display alert message registration successful when name, email and password are correct
*/

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display register page correctly', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('a.MuiLink-root>button.MuiButton-containedPrimary').click();

    cy.url().should('include', '/register');

    cy.get('main.MuiContainer-root').contains('h1', 'Sign Up').should('be.visible');
    cy.get('div.MuiGrid-container').find('div.MuiGrid-item').should('be.visible');

    cy.get('div.MuiInputBase-root>input[name="firstName"]').should('be.visible');
    cy.get('div.MuiInputBase-root>input[name="lastName"]').should('be.visible');
    cy.get('div.MuiInputBase-root>input[name="email"]').should('be.visible');
    cy.get('div.MuiInputBase-root>input[name="password"]').should('be.visible');

    cy.get('div[aria-label="sign-up"]').contains('button.MuiButton-containedPrimary', /^Sign Up$/).should('be.visible');
  });

  it('should display alert message when name is empty', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('a.MuiLink-root>button.MuiButton-containedPrimary').click();
    cy.url().should('include', '/register');

    cy.get('div[aria-label="sign-up"]').contains('button.MuiButton-containedPrimary', /^Sign Up$/).click();

    cy.get('div.MuiAlert-root').contains('div.MuiAlert-message', '"name" is not allowed to be empty').should('be.visible');
  });

  it('should display alert message when email is empty', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('a.MuiLink-root>button.MuiButton-containedPrimary').click();
    cy.url().should('include', '/register');

    cy.get('div.MuiInputBase-root>input[name="firstName"]').type('Sayna');
    cy.get('div[aria-label="sign-up"]').contains('button.MuiButton-containedPrimary', /^Sign Up$/).click();

    cy.get('div.MuiAlert-root').contains('div.MuiAlert-message', '"email" is not allowed to be empty').should('be.visible');
  });

  it('should display alert message when password is empty', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('a.MuiLink-root>button.MuiButton-containedPrimary').click();
    cy.url().should('include', '/register');

    cy.get('div.MuiInputBase-root>input[name="firstName"]').type('Sayna');
    cy.get('div.MuiInputBase-root>input[name="email"]').type('sayna@gmail.com');
    cy.get('div[aria-label="sign-up"]').contains('button.MuiButton-containedPrimary', /^Sign Up$/).click();

    cy.get('div.MuiAlert-root').contains('div.MuiAlert-message', '"password" is not allowed to be empty').should('be.visible');
  });

  it('should display alert message when the password is missing at least 6 characters', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('a.MuiLink-root>button.MuiButton-containedPrimary').click();
    cy.url().should('include', '/register');

    cy.get('div.MuiInputBase-root>input[name="firstName"]').type('Sayna');
    cy.get('div.MuiInputBase-root>input[name="lastName"]').type('Daniera');
    cy.get('div.MuiInputBase-root>input[name="email"]').type('saynadaniera@gmail.com');
    cy.get('div.MuiInputBase-root>input[name="password"]').type('say');
    cy.get('div[aria-label="sign-up"]').contains('button.MuiButton-containedPrimary', /^Sign Up$/).click();

    cy.get('div.MuiAlert-root').contains('div.MuiAlert-message', 'password must be at least 6 characters long').should('be.visible');
  });

  it('should display alert message when email is already taken', () => {
    cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('a.MuiLink-root>button.MuiButton-containedPrimary').click();
    cy.url().should('include', '/register');

    cy.get('div.MuiInputBase-root>input[name="firstName"]').type('Sayna');
    cy.get('div.MuiInputBase-root>input[name="email"]').type('sayna@gmail.com');
    cy.get('div.MuiInputBase-root>input[name="password"]').type('saynadaniera');
    cy.get('div[aria-label="sign-up"]').contains('button.MuiButton-containedPrimary', /^Sign Up$/).click();

    cy.get('div.MuiAlert-root').contains('div.MuiAlert-message', 'email is already taken').should('be.visible');
  });

  // it('should display alert message registration successful when name, email and password are correct', () => {
  //   cy.get('header.MuiAppBar-root>div.MuiContainer-root').find('a.MuiLink-root>button.MuiButton-containedPrimary').click();
  //   cy.url().should('include', '/register');

  //   cy.get('div.MuiInputBase-root>input[name="firstName"]').type('Sayna');
  //   cy.get('div.MuiInputBase-root>input[name="lastName"]').type('Daniera');
  //   cy.get('div.MuiInputBase-root>input[name="email"]').type('saynadaniera@gmail.com');
  //   cy.get('div.MuiInputBase-root>input[name="password"]').type('saynadaniera');
  //   cy.get('div[aria-label="sign-up"]').contains('button.MuiButton-containedPrimary', /^Sign Up$/).click();

  //   cy.get('div.MuiAlert-root').find('div.MuiAlert-message').should('be.visible');
  //   cy.get('div.MuiAlert-message').contains('strong', 'successful').should('be.visible');
  // });
});
