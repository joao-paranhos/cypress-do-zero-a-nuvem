describe('Central de Atendimento TAT', () => {

  beforeEach(() => {
    cy.visit('src/index.html')
  })
  it('Verifica o título da aplicação', () => {

    cy.title('Central de Atendimento ao Cliente TAT').should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const text = Cypress._.repeat('irei usar o comando delay, pois estou aprendendo cypress, ', 10)
    cy.get('#firstName').type('João')
    cy.get('input[name="lastName"]').type('Paranhos')
    cy.get('#email').type('joao@teste.com')
    cy.get('#open-text-area').as('feedback')
      .type(text, { delay: 0 })

    cy.get('@feedback').should('have.value', text)

    cy.contains('.button', 'Enviar').click()

    cy.contains('strong', 'Mensagem enviada com sucesso.').should('be.visible')

  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('João')
    cy.get('input[name="lastName"]').type('Paranhos')
    cy.get('#email').type('joaoteste.com')
    cy.contains('.button', 'Enviar').click()

    cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible')

  })

  it('valida que o campo telefone não aceita letras', () => {
    cy.get('#firstName').type('João')
    cy.get('input[name="lastName"]').type('Paranhos')
    cy.get('#email').type('joao@teste.com')
    cy.get('input[type="number"]').as('telefone').type('abc')
    cy.get('@telefone').should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('input[name="lastName"]').type('Paranhos')
    cy.get('#email').type('joao@teste.com')
    cy.get('#phone-checkbox').check()
    cy.contains('.button', 'Enviar').click()

    cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName').as('Nome').type('João')
    cy.get('@Nome').should('have.value', 'João')
    cy.get('@Nome').clear().should('have.value', '')
    cy.get('input[name="lastName"]').as('sobrenome').type('Paranhos')
    cy.get('@sobrenome').should('have.value', 'Paranhos')
    cy.get('@sobrenome').clear().should('have.value', '')
    cy.get('#email').as('email').type('joao@teste.com')
    cy.get('@email').should('have.value', 'joao@teste.com')
    cy.get('@email').clear().should('have.value', '')
    cy.get('#phone').as('telefone').type('11945687452')
    cy.get('@telefone').should('have.value', '11945687452')
    cy.get('@telefone').clear().should('have.value', '')

  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.contains('.button', 'Enviar').click()

    cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible')

  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible')


  })
  it('envia o formulário com sucesso usando um comando customizado recebendo um objeto', () => {
    const objeto = {
      nome: "joão",
      sobrenome: "Paranhos",
      email: "joao@teste.com",
      feedback: "Feedback teste"
    }

    cy.fillMandatoryFieldsAndSubmitUsingAnObject(objeto)

    cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible')

  })

  it('Envia o formulário com sucesso usando um comando customizado recebendo valores padrões do comando customizando', () => {
    const objeto = {
      nome: "John",
      sobrenome: "Paranhos",
      email: "John@teste.com",
      feedback: "teste"
    }

    cy.fillMandatoryFieldsAndSubmitWithDefaults()

    cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible')


  })
  it('seleciona um produto (YouTube) por seu texto', () => {

    cy.get('#product').select('YouTube')
    cy.get('#product').should('have.value', 'youtube')


  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {

    cy.get('#product').select('mentoria')
    cy.get('#product').should('have.value', 'mentoria')

  })

  it('seleciona um produto (Blog) por seu índice', () => {

    cy.get('#product').select(1)
    cy.get('#product').should('have.value', 'blog')

  })

  it('marca o tipo de atendimento "Feedback"', () => {

    cy.get('input[value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {

    cy.get('input[type="radio"').each((radio) => {
      cy.wrap(radio)
        .check()
        .should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {

    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('be.not.checked')
  })


  it('seleciona um arquivo da pasta fixtures', () => {

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {

        expect(input[0].files[0].name).to.eq('example.json')


      })
    
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {

      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(input => {

          expect(input[0].files[0].name).to.eq('example.json')
        

    }) })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',()=>{
      
      cy.fixture('example.json').as('sampleFile')
      cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {

        expect(input[0].files[0].name).to.eq('example.json')


  
    })



  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{

      cy.get('a[href="privacy.html"]').should('have.attr','target','_blank').and('have.attr','href','privacy.html')
    
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{

    cy.get('a[href="privacy.html"]').invoke('removeAttr','target',).click()
    cy.location('pathname').should('eq', '/src/privacy.html');

  })
})



