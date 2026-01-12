describe('Central de Atendimento TAT', () => {

  beforeEach(()=>{
    cy.visit('src/index.html')
  })
  it('Verifica o título da aplicação', () => {
    
    cy.title('Central de Atendimento ao Cliente TAT').should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário',()=>{
    const text = Cypress._.repeat('irei usar o comando delay, pois estou aprendendo cypress, ',10)
    cy.get('#firstName').type('João')
    cy.get('input[name="lastName"]').type('Paranhos')
    cy.get('#email').type('joao@teste.com')
    cy.get('#open-text-area').as('feedback')
    .type(text,{delay: 0})
    
    cy.get('@feedback').should('have.value',text)
    
    cy.contains('.button','Enviar').click()

    cy.contains('strong','Mensagem enviada com sucesso.').should('be.visible')

  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',()=>{
    cy.get('#firstName').type('João')
    cy.get('input[name="lastName"]').type('Paranhos')
    cy.get('#email').type('joaoteste.com')
    cy.contains('.button','Enviar').click()

    cy.contains('.error','Valide os campos obrigatórios!').should('be.visible')

  })
  
  it('valida que o campo telefone não aceita letras',()=>{
    cy.get('#firstName').type('João')
    cy.get('input[name="lastName"]').type('Paranhos')
    cy.get('#email').type('joao@teste.com')
    cy.get('input[type="number"]').as('telefone').type('abc')
    cy.get('@telefone').should('have.value','')
    
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',()=>{
    cy.get('#firstName').type('João')
    cy.get('input[name="lastName"]').type('Paranhos')
    cy.get('#email').type('joao@teste.com')
    cy.get('#phone-checkbox').check()
    cy.contains('.button','Enviar').click()
    cy.contains('.error','Valide os campos obrigatórios!').should('be.visible')
})

  it('preenche e limpa os campos nome, sobrenome, email e telefone',()=>{

    cy.get('#firstName').as('Nome').type('João')
    cy.get('@Nome').should('have.value','João')
    cy.get('@Nome').clear().should('have.value','')
    cy.get('input[name="lastName"]').as('sobrenome').type('Paranhos')
    cy.get('@sobrenome').should('have.value','Paranhos')
    cy.get('@sobrenome').clear().should('have.value','')
    cy.get('#email').as('email').type('joao@teste.com')
    cy.get('@email').should('have.value','joao@teste.com')
    cy.get('@email').clear().should('have.value','')
    cy.get('#phone').as('telefone').type('11945687452')
    cy.get('@telefone').should('have.value','11945687452')
    cy.get('@telefone').clear().should('have.value','')

  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{

    cy.contains('.button','Enviar').click()
    cy.contains('.error','Valide os campos obrigatórios!').should('be.visible')

  })
  
  it('envia o formulário com sucesso usando um comando customizado',()=>{
    cy.fillMandatoryFieldsAndSubmit()

  })
   it('envia o formulário com sucesso usando um comando customizado recebendo um objeto',()=>{
    const objeto = {
        nome: "joão",
        sobrenome: "Paranhos",
        email: "joao@teste.com",
        feedback: "Feedback teste"}
              
    cy.fillMandatoryFieldsAndSubmitUsingAnObject(objeto)
})

it('Envia o formulário com sucesso usando um comando customizado recebendo valores padrões do comando customizando',()=>{

  cy.fillMandatoryFieldsAndSubmitWithDefaults()

})
})
