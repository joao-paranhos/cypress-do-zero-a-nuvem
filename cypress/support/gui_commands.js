Cypress.Commands.add('fillMandatoryFieldsAndSubmit',()=>{
    
    cy.get('#firstName').type('João')
    cy.get('input[name="lastName"]').type('Paranhos')
    cy.get('#email').type('joao@teste.com')
    cy.get('#open-text-area').as('feedback').type('Feedback teste')
    cy.get('@feedback').should('have.value','Feedback teste')
    cy.contains('.button','Enviar').click()
})
Cypress.Commands.add('fillMandatoryFieldsAndSubmitUsingAnObject',objeto=>{
    
    cy.get('#firstName').type(objeto.nome)
    cy.get('input[name="lastName"]').type(objeto.sobrenome)
    cy.get('#email').type(objeto.email)
    cy.get('#open-text-area').as('feedback').type(objeto.feedback)
    cy.get('@feedback').should('have.value',objeto.feedback)
    cy.contains('.button','Enviar').click()
})



Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithDefaults', (data = {
        nome: "joão",
        sobrenome: "Paranhos",
        email: "joao@teste.com",
        feedback: "Feedback teste"
}) => {
    cy.get('#firstName').type(data.nome)
    cy.get('input[name="lastName"]').type(data.sobrenome)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').as('feedback').type(data.feedback)
    cy.contains('.button', 'Enviar').click()
  }
)
