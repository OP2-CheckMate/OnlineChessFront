describe('Application', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
    cy.visit('/')
  })

  it('renders correctly', () => {
    cy.contains('Start Game').should('be.visible')
    cy.contains('Settings').should('be.visible')
  })

  it('sets player name in settings and verifies it in create game screen', () => {
    cy.contains('Settings')
      .click()
    cy.contains('Profile')
      .click()
    cy.get('input')
      .type('tester')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.r-transitionProperty-1i6wzkk > .r-flex-13awgt0').click()
    cy.get('.r-cursor-1loqt21 > .r-flexBasis-1mlwlqe > .css-accessibilityImage-9pa8cd').click()
    cy.get(':nth-child(1) > .css-text-1rynq56').click()
    cy.get('[placeholder="Enter your name"]').should('have.value', 'tester')
    /* ==== End Cypress Studio ==== */
  })

  it('creates a new game', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(1) > .css-text-1rynq56').click()
    cy.get('[placeholder="Enter your name"]').clear()
    cy.get('[placeholder="Enter your name"]').type('tester')
    cy.get(':nth-child(1) > [data-testid="custom-button-pressable"] > .css-text-1rynq56').click()
    cy.get('[style="flex: 1 1 0%; justify-content: center; align-items: center;"] > .r-borderRadius-1xfd6ze > [data-testid="custom-button-pressable"] > .css-text-1rynq56').click()
    /* ==== End Cypress Studio ==== */
  })
})