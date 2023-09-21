describe('Browser Page for Tic Tac Toe', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should have a title', () => {
    cy.get('h1').should('have.text', 'Tic Tac Toe');
  });
  it('should have game board', () => {
    cy.get('#game table button')
      .should('have.length', 9)
      .each((button) => {
        cy.wrap(button).should('have.text', '\u00a0');
      });
  });
  describe('game board buttons', () => {
    it('should change label to represent who claimed it', () => {
      let firstButton = cy.get('#game table button').first();
      firstButton.click();
      firstButton = cy.get('#game table button').first();
      firstButton.should('have.text', 'x');
      firstButton.should('be.disabled');
    });
  });
  it('should have a player turn indicator', () => {
    cy.get('#game p').should('have.text', 'x turn');
  });
  describe('player turn indicator', () => {
    it('should change after players take turns', () => {
      cy.get('#game p').should('have.text', 'x turn');
      cy.get('#game table button').first().click();
      cy.get('#game p').should('have.text', 'o turn');
      cy.get('#game table button').eq(1).click();
      cy.get('#game p').should('have.text', 'x turn');
    });
  });
  it('should have reset button', () => {
    cy.get('#reset').should('have.text', 'Reset');
  });
  describe('reset button', () => {
    it('should clear the board', () => {
      let firstButton = cy.get('#game table button').first();
      firstButton.should('have.text', '\u00a0');
      firstButton.click();
      firstButton = cy.get('#game table button').first();
      firstButton.should('have.text', 'x');
      firstButton.should('be.disabled');
      cy.get('#reset').click();
      firstButton = cy.get('#game table button').first();
      firstButton.should('have.text', '\u00a0');
      firstButton.should('not.be.disabled');
    });
  });
});
