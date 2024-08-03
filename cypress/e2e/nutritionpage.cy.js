describe('template spec', () => {
  let data;
  beforeEach(() => {
    cy.fixture('samplefruits').then((json) => {
      data = json.fruits;
    })
    cy.viewport('macbook-13')

  })
  it('should be able to render nutrition cards based on selection', () => {
    cy.intercept('https://justcors.com/tl_76fd7c9/https://fruityvice.com/api/fruit/all',data)
    cy.visit('http://localhost:5173/')
    cy.get('[href="/nutritiousfruits"] > li').click()
    cy.get('#nutritions').select([1])
    cy.get('.card-container .card').should('have.length', 20)
    cy.get('.card-container .card h3').first().should('contain.text','Hazelnut')
  })
  it('should be able to render nutrition cards based on another', () => {
    cy.intercept('https://justcors.com/tl_76fd7c9/https://fruityvice.com/api/fruit/all',data)
    cy.visit('http://localhost:5173/')
    cy.get('[href="/nutritiousfruits"] > li').click()
    cy.get('#nutritions').select([3])
    cy.get('.card-container .card').should('have.length', 20)
    cy.get('.card-container .card h3').first().should('contain.text','Jackfruit')
  })
  it('should be able to go to detailed page based on fruit selection', () => {
    cy.intercept('https://justcors.com/tl_76fd7c9/https://fruityvice.com/api/fruit/all',data)
    cy.visit('http://localhost:5173/')
    cy.get('[href="/nutritiousfruits"] > li').click()
    cy.get('#nutritions').select([3])
    cy.get('.card-container .card button').last().click()
    cy.url().should('include','/details')
    cy.get('.detail-container h3').should('contain.text', 'Fruit Name: Pomelo')
    cy.get('.all-info-wrapper > :nth-child(1)').should('exist')
    cy.get('.all-info-wrapper > :nth-child(2)').should('exist')
  })
})