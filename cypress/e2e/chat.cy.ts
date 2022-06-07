describe('chat.cy.ts', () => {
  it('should visit login page', () => {
    cy.visit('localhost:3000')
    cy.get('[data-cy="login-button"]').should('be.visible')
  })

  it('should login', () => {
    cy.login()
      .then(() => {
        cy.get('[data-cy="logout-button"]').should('be.visible')
      })
  })
})
