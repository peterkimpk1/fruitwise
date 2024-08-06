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
    it('should resize when it reaches breakpoint', () => {
        cy.viewport(1200,800)
        cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
        cy.visit('http://localhost:5173')
        cy.get('.search-bar').click().type('banana')
        cy.get('.search-btn').click()
        cy.get('.result-card').click()
        cy.url().should('contain','/details/1')
        cy.get('.detail-page').should('have.css','flex-direction','column')
    })
})