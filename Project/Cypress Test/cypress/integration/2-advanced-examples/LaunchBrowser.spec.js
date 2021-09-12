// LaunchBrowser.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Launch my app', ()=>{
 it('Launch browser', ()=>{

//Visit URL
  cy.visit('https://computer-database.herokuapp.com/computers ')
cy.title().should('eq', 'Computers database')

//Verify Page Navigation
cy.contains('Computer name')

//Verify Search Textboxc- No Search Found
cy.get('#searchbox')
      .type('NeverSearchedKey')
cy.get('#searchsubmit').click()
cy.contains('Nothing to display')
cy.get('#searchbox').clear()

//Verify Search Textboxc- Search Found
cy.get('#searchbox')
      .type('ABC')
cy.get('table.computers.zebra-striped:nth-child(3) thead:nth-child(1) tr:nth-child(1) th.col2.header.headerSortUp > a:nth-child(1)').should('not.exist');

//Check Count after Search
//cy.get('section:nth-child(2) div.pagination:nth-child(4) //ul:nth-child(1) li.current > a:nth- //child(1)').should('have.text', 'Displaying')



cy.get('#searchsubmit').click()

//Add Computer
cy.get('#add').click()
cy.title().should('eq', 'Computers database')
cy.contains('Add a computer')

cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > input.btn.primary:nth-child(1)').click()

cy.get('#name').should('have.css', 'border-bottom-color', 'rgb(200, 120, 114)')

cy.get('#introduced').should('have.css', 'border-bottom-color', 'rgb(204, 204, 204)')
cy.get('#name').clear()
cy.get('#name').type('ABC')
cy.get('#introduced').clear()
cy.get('#introduced').type('2021-11-01')
cy.get('#discontinued').clear()
cy.get('#discontinued').type('2021-11-11')
cy.get('#company').select('IBM')
cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > input.btn.primary:nth-child(1)').click()
cy.contains('has been created')



//One and many found
cy.get('#searchbox').clear()
cy.get('#searchbox').type('AN/FSQ-32')
cy.get('#searchsubmit').click()
cy.get('body:nth-child(2) section:nth-child(2) > h1:nth-child(1)').should('have.text','One computer found')
cy.contains('computer')

//More than One and many found
cy.get('#searchbox').clear()
cy.get('#searchbox').type('ABC')
cy.get('#searchsubmit').click()
cy.contains('computers')


})})


it('has a board', () => {

  cy
    .visit('/');

  cy
    .get('[data-cy=board-item]')
    .should('be.visible');

});

it('has a board', () => {

  cy
    .visit('/');

  cy
    .get('[data-cy=board-item]')
    .should('not.be.visible');

});


cy.get('#searchbox').type('NeverSearchedKey')
cy.get('#searchsubmit').click()
cy.contains('Nothing to display')
cy.get('#searchbox').clear()    
  });
});

describe('Search Valid Records', () => {
  it('Search for valid record', () => {
cy.get('#searchbox').type('ABC')
cy.get('table.computers.zebra-striped:nth-child(3) thead:nth-child(1) tr:nth-child(1) th.col2.header.headerSortUp > a:nth-child(1)').should('not.exist');

describe('Test 4', () => {
  it('Fourth Test', () => {
//One and many found


    
  });
});

describe('Test 5', () => {
  it('Fifth Test', () => {
 

    
  });
});



Cypress.Commands.add('SearchAddedComputer', (textToSearch) => {
            cy.get('#searchbox').type(textToSearch)
            cy.get('#searchsubmit').click()

            cy.get('body').then((body) => {
                if (body.find(cy.xpath('//thead/tr[1]/th[1]') > 0)) {
                    cy.log('Search Successful.')
                }
}
            })






