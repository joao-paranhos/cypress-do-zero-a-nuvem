Cypress.Commands.add('fillMandatoryFieldsAndSubmit',()=>{
    
    cy.get('#firstName').type('João')
    cy.get('input[name="lastName"]').type('Paranhos')
    cy.get('#email').type('joao@teste.com')
    cy.get('#open-text-area').as('feedback').type('Feedback teste')
    cy.get('@feedback').should('have.value','Feedback teste')
    cy.contains('.button','Enviar').click()
    cy.contains('strong','Mensagem enviada com sucesso.').should('be.visible')
})
Cypress.Commands.add('fillMandatoryFieldsAndSubmitUsingAnObject',objeto=>{
    
    cy.get('#firstName').type(objeto.nome)
    cy.get('input[name="lastName"]').type(objeto.sobrenome)
    cy.get('#email').type(objeto.email)
    cy.get('#open-text-area').as('feedback').type(objeto.feedback)
    cy.get('@feedback').should('have.value',objeto.feedback)
    cy.contains('.button','Enviar').click()
    cy.contains('strong','Mensagem enviada com sucesso.').should('be.visible')
})



Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithDefaults',
  (
    {
      nome = 'joão',
      sobrenome = 'Paranhos',
      email = 'joao@teste.com',
      feedback = 'Feedback teste'
    } = {}
  ) => {
    cy.get('#firstName').type(nome)
    cy.get('input[name="lastName"]').type(sobrenome)
    cy.get('#email').type(email)
    cy.get('#open-text-area').as('feedback').type(feedback)
    cy.get('@feedback').should('have.value', feedback)
    cy.contains('.button', 'Enviar').click()
    cy.contains('strong', 'Mensagem enviada com sucesso.').should('be.visible')
  }
)
