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
  describe('full gameplay', () => {
    it('should end the game when x wins', () => {
      cy.get('#game table button').eq(0).click();
      cy.get('#game table button').eq(3).click();
      cy.get('#game table button').eq(1).click();
      cy.get('#game table button').eq(4).click();
      cy.get('#game table button').eq(2).click();
      cy.get('#game table button').each((button) => {
        cy.wrap(button).should('be.disabled');
      });
      cy.get('#game p').should('have.text', 'Game over');
      cy.get('#game h1').should('have.text', 'x has won the game!');
    });
    it('should end the game when o wins', () => {
      cy.get('#game table button').eq(3).click();
      cy.get('#game table button').eq(0).click();
      cy.get('#game table button').eq(4).click();
      cy.get('#game table button').eq(1).click();
      cy.get('#game table button').eq(6).click();
      cy.get('#game table button').eq(2).click();

      cy.get('#game table button').each((button) => {
        cy.wrap(button).should('be.disabled');
      });
      cy.get('#game p').should('have.text', 'Game over');
      cy.get('#game h1').should('have.text', 'o has won the game!');
    });
    it("should end the game if there's a draw", () => {
      cy.get('#game table button').eq(0).click();
      cy.get('#game table button')
        .eq(0)
        .should('have.text', 'x')
        .should('be.disabled');
      cy.get('#game table button').eq(3).click();
      cy.get('#game table button')
        .eq(3)
        .should('have.text', 'o')
        .should('be.disabled');
      cy.get('#game table button').eq(1).click();
      cy.get('#game table button')
        .eq(1)
        .should('have.text', 'x')
        .should('be.disabled');
      cy.get('#game table button').eq(4).click();
      cy.get('#game table button')
        .eq(4)
        .should('have.text', 'o')
        .should('be.disabled');
      cy.get('#game table button').eq(5).click();
      cy.get('#game table button')
        .eq(5)
        .should('have.text', 'x')
        .should('be.disabled');
      cy.get('#game table button').eq(2).click();
      cy.get('#game table button')
        .eq(2)
        .should('have.text', 'o')
        .should('be.disabled');
      cy.get('#game table button').eq(7).click();
      cy.get('#game table button')
        .eq(7)
        .should('have.text', 'x')
        .should('be.disabled');
      cy.get('#game table button').eq(8).click();
      cy.get('#game table button')
        .eq(8)
        .should('have.text', 'o')
        .should('be.disabled');
      cy.get('#game table button').eq(6).click();
      cy.get('#game table button')
        .eq(6)
        .should('have.text', 'x')
        .should('be.disabled');

      cy.get('#game table button').each((button) => {
        cy.wrap(button).should('be.disabled');
      });
      cy.get('#game p').should('have.text', 'Game over');
      cy.get('#game h1').should('have.text', "It's a draw game!");
    });
  });
});
