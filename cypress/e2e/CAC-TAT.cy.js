describe('Central de Atendimento TAT', () => {

  beforeEach(()=>{
    cy.visit('src/index.html')
  })
  it('Verifica o título da aplicação', () => {
    
    cy.title('Central de Atendimento ao Cliente TAT').should('be.equal','Central de Atendimento ao Cliente TAT')
  })
})
