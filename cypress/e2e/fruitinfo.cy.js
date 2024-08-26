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
    it('should display all three sections', () => {
      cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
      cy.visit('http://localhost:5173/')
      cy.get('[href="/fruitinfo"] > li').click()
      cy.get('.fruit-info-page').should('exist')
      cy.get('.fruit-log-container > h3').should('contain.text','Select fruit(s)')
      cy.get('#fruitnames').should('exist')
      cy.get('[value="Persimmon"]').should('exist')
      cy.get('#fruit-date').should('exist')
      cy.get('.form-container > div').should('exist')
    })
    it('should be able to make a selection and populate inputs', () => {
      cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
      cy.visit('http://localhost:5173/')
      cy.get('[href="/fruitinfo"] > li').click()
      cy.get('[value="Persimmon"]').click()
      cy.get('#fruit-date').type('2024-01-01')
      cy.get('#fruit-date').should('have.value','2024-01-01')
      cy.get('#amount').type(5)
      cy.get('#amount').should('have.value',5)
    })
    it('should be able to add a fruit and see daily fruits section populate', () => {
      cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
      cy.visit('http://localhost:5173/')
      cy.get('[href="/fruitinfo"] > li').click()
      cy.get('#fruitnames').select([1])
      cy.get('#fruit-date').type('2024-01-01')
      cy.get('#amount').type(5)
      cy.get('#add-fruit-btn').click()
      cy.get('.log-date').should('be.visible')
      cy.get('.log-date').should('have.text','Log Date: Jan 1st 24')
      cy.get('.daily-fruit p').should('have.text','Strawberry')
      cy.get('.daily-fruit span').should('contain.text','5')
      cy.get('.nutrition-breakdown').should('exist')
    })
    it('should be able to add multiple fruits and have nutrition breakdown change', () => {
      cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
      cy.visit('http://localhost:5173/')
      cy.get('[href="/fruitinfo"] > li').click()
      cy.get('#fruitnames').select([1])
      cy.get('#fruit-date').type('2024-01-01')
      cy.get('#amount').type(5)
      cy.get('#add-fruit-btn').click()
      cy.get('.nutrition-breakdown .nutrition-log').first().should('have.text', 'Calories: 5.8')
      cy.get('#fruitnames').select([1])
      cy.get('#amount').type(7)
      cy.get('#add-fruit-btn').click()
      cy.get('.daily-fruit').should('have.length', 2)
      cy.get('.nutrition-breakdown .nutrition-log').first().should('have.text', 'Calories: 6.31')
    })
    it('should be able to add multiple fruits and delete fruit to have nutrition breakdown change', () => {
      cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
      cy.visit('http://localhost:5173/')
      cy.get('[href="/fruitinfo"] > li').click()
      cy.get('#fruitnames').select([1])
      cy.get('#fruit-date').type('2024-01-01')
      cy.get('#amount').type(5)
      cy.get('#add-fruit-btn').click()
      cy.get('#fruitnames').select([1])
      cy.get('#amount').type(7)
      cy.get('#add-fruit-btn').click()
      cy.get('.daily-fruit').should('have.length', 2)
      cy.get('.nutrition-breakdown .nutrition-log').first().should('have.text', 'Calories: 6.31')
      cy.get(':nth-child(2) > div > .card-btn').click()
      cy.get('.nutrition-breakdown .nutrition-log').first().should('have.text', 'Calories: 5.8')
    })
    it('should be able to add a fruit and save to the log', () => {
      cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
      cy.visit('http://localhost:5173/')
      cy.get('[href="/fruitinfo"] > li').click()
      cy.get('#fruitnames').select([1])
      cy.get('#fruit-date').type('2024-01-01')
      cy.get('#amount').type(5)
      cy.get('#add-fruit-btn').click()
      cy.get('.daily-fruit').should('have.length', 1)
      cy.get('.daily-fruit-container-open > :nth-child(3)').click()
      cy.get('.fruit-log').should('exist')
      cy.get('.fruit-log p').should('have.text','Date: Jan 1st 24')
    })
    it('should be able to edit the log even if theres multiple', () => {
      cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
      cy.visit('http://localhost:5173/')
      cy.get('[href="/fruitinfo"] > li').click()
      cy.get('#fruitnames').select([1])
      cy.get('#fruit-date').type('2024-01-01')
      cy.get('#amount').type(5)
      cy.get('#add-fruit-btn').click()
      cy.get('.daily-fruit-container-open > :nth-child(3)').click()
      cy.get('#fruitnames').select([2])
      cy.get('#fruit-date').type('2024-02-02')
      cy.get('#add-fruit-btn').click()
      cy.get('.daily-fruit-container-open > :nth-child(3)').click()
      cy.get('.fruit-log').should('have.length',2)
      cy.get('#log-edit-btn').click()
      cy.get('.log-date').should('have.text','Edit Log: Feb 2nd 24')
      cy.get('.daily-fruit p').should('have.text', 'Banana')
      cy.get('#add-fruit-btn').click()
      cy.get('.daily-fruit').should('have.length',2)
      cy.get('.daily-fruit-container-open > :nth-child(3)').click()
      cy.get('.fruit-log').should('have.length',2)
    })
    it('should be able to edit the log even if theres multiple', () => {
      cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
      cy.visit('http://localhost:5173/')
      cy.get('[href="/fruitinfo"] > li').click()
      cy.get('#fruitnames').select([1])
      cy.get('#fruit-date').type('2024-01-01')
      cy.get('#amount').type(5)
      cy.get('#add-fruit-btn').click()
      cy.get('.daily-fruit-container-open > :nth-child(3)').click()
      cy.get('#fruitnames').select([2])
      cy.get('#fruit-date').type('2024-02-02')
      cy.get('#add-fruit-btn').click()
      cy.get('.daily-fruit-container-open > :nth-child(3)').click()
      cy.get('.fruit-log').should('have.length',2)
      cy.get(':nth-child(1) > #delete-btn').click()
      cy.get('.fruit-log p').should('have.length',1)
      cy.get('.fruit-log p').should('have.text','Date: Jan 1st 24')
    })
    it('should change the layout on breakpoint', () => {
      cy.intercept('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all',data)
      cy.visit('http://localhost:5173/')
      cy.viewport(1050,800)
      cy.get('[href="/fruitinfo"] > li').click()
      cy.get('.fruit-info-page').should('have.css','flex-direction','column')
    })
  })