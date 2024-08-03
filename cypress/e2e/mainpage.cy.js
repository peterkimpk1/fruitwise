describe('template spec', () => {
  let data;
  beforeEach(() => {
    cy.fixture('samplefruits').then((json) => {
      data = json.fruits;
    })
    cy.intercept('https://justcors.com/tl_76fd7c9/https://fruityvice.com/api/fruit/all',data)
    cy.viewport('macbook-13')
    cy.visit('http://localhost:5173')
  })
  it('should display all elements for desktop screen', () => {
    cy.get('nav').should('exist')
    cy.get('.main-header-wrapper > h2').should('contain.text','Eat Fruits, Be Healthy.')
    cy.get('.search-bar').should('exist')
    cy.get('.season-fruit-container .season-card').should('have.length', 12)
    cy.get('.main-header').should('contain.text','Why fruits?')
    cy.get('.reason-card').should('have.length', 3)
  })
  it('should be able to input in search', () => {
    cy.get('.search-bar').type('berry')
    cy.get('.search-bar').should('have.value','berry')
  })
  it('should be able to hit search and get results back', () => {
    cy.get('.search-bar').type('berry')
    cy.get('.search-btn').click()
    cy.get('.search-container-submitted').should('exist')
    cy.get('[href="/details/3"] > .result-card > .fruit-img').should('exist')
    cy.get('[href="/details/3"] > .result-card > .fruit-info > :nth-child(1)').should('contain.text','Name: Strawberry')
    cy.get('[href="/details/3"] > .result-card > .fruit-info > :nth-child(2)').should('contain.text','Family: Rosaceae')
    cy.get('[href="/details/3"] > .result-card > .fruit-info > :nth-child(3)').should('contain.text','Genus: Fragaria')
  })
  it('should be able to go to detailed page from results', () => {
    cy.get('.search-bar').type('berry')
    cy.get('.search-btn').click()
    cy.get('.result-card').first().click()
    cy.url().should('include','/details')
    cy.get('.detail-container').should('exist')
    cy.get('.all-info-wrapper > :nth-child(1)').should('exist')
    cy.get('.all-info-wrapper > :nth-child(2)').should('exist')
  })
  it('should be able to click More Info from season-card to go to detailed page', () => {
    cy.get('.season-card button').first().click()
    cy.url().should('include','/details')
    cy.get('.detail-container h3').should('contain.text', 'Fruit Name: Blackberry')
    cy.get('.all-info-wrapper > :nth-child(1)').should('exist')
    cy.get('.all-info-wrapper > :nth-child(2)').should('exist')
  })
  it('should be able to click More Info from any season-card to go to detailed page', () => {
    cy.get('.season-card button').last().click()
    cy.url().should('include','/details')
    cy.get('.detail-container h3').should('contain.text', 'Fruit Name: GreenApple')
    cy.get('.all-info-wrapper > :nth-child(1)').should('exist')
    cy.get('.all-info-wrapper > :nth-child(2)').should('exist')
  })
  it('should show a message if the route does not exist', () => {
    cy.visit('http://localhost:5173/go')
    cy.get('h2').should('contain.text','Error 404: Route does not exist.')
  })
  it('should be able to go to a different page and come back to main', () => {
    cy.get('[href="/nutritiousfruits"] > li').click()
    cy.url().should('include','/nutritiousfruits')
    cy.go('back')
    cy.url().should('not.include','/nutritiousfruits')
  })
})