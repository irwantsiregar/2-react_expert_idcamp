/**
 * - LeaderBoards spec
 *   - should display leaderboards page correctly
 */

describe('LeaderBoards spec', () => {
  it('should display leaderboards page correctly', () => {
    cy.visit('/');
    cy.get('div.MuiToolbar-gutters').find('button[aria-label="leaderboards"]>a').click();

    cy.get('div.MuiContainer-root').contains('h5', 'Active User Standings');
    cy.get('div.MuiTableContainer-root').find('table').should('be.visible');
  });
});
