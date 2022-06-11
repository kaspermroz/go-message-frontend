describe('chat.cy.ts', () => {
  afterEach(() => {
    // timeout for presentation
    cy.wait(1000)
  })

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

  it('should select first chat', () => {
    const firstChat = cy.get('[data-cy="user-chat-0"]')
    firstChat.should('be.visible')
    firstChat.click().then(() => {
      const chatTitle = cy.get('[data-cy="chat-title"]')
      chatTitle.should('be.visible')
      chatTitle.should('have.text', 'E2E Test Chat')
    })
  })

  it('should send message to the selected chat', () => {
    const messageText = `test message ${Date.now()}`
    const input = cy.get('[data-cy="chat-input"]')
    input.should('be.visible')
    input.type(messageText)

    cy.get('[data-cy="chat-send-button"]').click().then(() => {
      const lastMessage = cy.get('[data-cy="chat-messages"]').children().last()
      lastMessage.should('be.visible')
      lastMessage.should('have.text', messageText)
    })
  })

  it('should logout', () => {
    cy.get('[data-cy="logout-button"]').click()
    cy.get('[data-cy="login-button"]').should('be.visible')
  })
})
