describe('template spec', () => {
  let data;
  let url;
  beforeEach(() => {
    cy.fixture('samplefruits').then((json) => {
      data = json.fruits;
    })
    cy.fixture('cors').then(json => {
      url = json.url
    })
    cy.viewport('macbook-13')

  })
  it('should be able to render nutrition cards based on selection', () => {
    cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
    cy.visit('http://localhost:5173/')
    cy.get('#nutritious-fruits-nav').click()
    cy.get('#nutritions').select([1])
    cy.get('.card-container .card').should('have.length', 20)
    cy.get('.card-container .card h3').first().should('contain.text','Hazelnut')
  })
  it('should be able to render nutrition cards based on another', () => {
    cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
    cy.visit('http://localhost:5173/')
    cy.get('#nutritious-fruits-nav').click()
    cy.get('#nutritions').select([3])
    cy.get('.card-container .card').should('have.length', 20)
    cy.get('.card-container .card h3').first().should('contain.text','Jackfruit')
  })
  it('should be able to go to detailed page based on fruit selection', () => {
    cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
    cy.visit('http://localhost:5173/')
    cy.get('#nutritious-fruits-nav').click()
    cy.get('#nutritions').select([3])
    cy.get('.card-container .card button').last().click()
    cy.url().should('include','/details')
    cy.get('.detail-name').should('contain.text', 'Pomelo')
    cy.get('.all-info-wrapper > :nth-child(1)').should('exist')
    cy.get('.all-info-wrapper > :nth-child(2)').should('exist')
  })
  it('should go to 3 columns when it reaches first breakpoint', () => {
    cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
    cy.visit('http://localhost:5173/')
    cy.get('#nutritious-fruits-nav').click()
    cy.get('#nutritions').select([3])
    cy.viewport(1368,800)
    cy.get('.card-container').should('have.css','grid-template-columns','336px 336px 336px')
  })
  it('should go to 2 columns when it reaches second breakpoint', () => {
    cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
    cy.visit('http://localhost:5173/')
    cy.get('#nutritious-fruits-nav').click()
    cy.get('#nutritions').select([3])
    cy.viewport(1020,800)
    cy.get('.card-container').should('have.css','grid-template-columns','336px 336px')
  })
  it('should go to 1 column when it reaches third breakpoint', () => {
    cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
    cy.visit('http://localhost:5173/')
    cy.get('#nutritious-fruits-nav').click()
    cy.get('#nutritions').select([3])
    cy.viewport(688,800)
    cy.get('.card-container').should('have.css','grid-template-columns','336px')
  })
})