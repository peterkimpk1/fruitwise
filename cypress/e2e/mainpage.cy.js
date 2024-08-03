describe('template spec', () => {
  beforeEach(() => {
    cy.fixture('sampleFruits').then((json) => {
      cy.intercept('https://justcors.com/tl_76fd7c9/https://fruityvice.com/api/fruit/all',{
        fixture: 'sampleFruits.json',
        statusCode: 200
      })
    })
  })
  it('should display all elements for desktop screen', () => {
    cy.visit('http://localhost:5173')
    cy.viewport('macbook-13')
    cy.get('nav').should('exist')
    cy.get('.main-header-wrapper > h2').should('contain.text','Eat Fruits, Be Healthy.')
    cy.get('.search-bar').should('exist')
  })
})