/* eslint-disable no-undef */
describe('Play Game', () => {
  it('Returns expected elements', () => {

    cy.visit('')

    selectLanguage();

    selectCharacter();

    computerGuess();

    selectAttribute();

    askQuestion();

    cy.get('body').should('include.text', 'Continue');
  })
})

function selectLanguage()
{
  cy.get('#en_uk')
    .click();
}

function selectCharacter()
{
  cy.intercept('/api/index').as('getObjects')

  cy.wait('@getObjects').then((interception) => {

    cy.get('body').should('include.text', 'Please choose a character for Lingua to guess');

    cy.get('#Liam').click();

    cy.get('.swal2-popup').should('include.text', 'You have chosen');
    cy.get('#swal2-html-container').find('img').should('have.attr', 'src').should('include','Liam.png');
  });
}

function computerGuess()
{
  cy.get('.swal2-confirm').contains('OK').click();

  cy.intercept('GET', '/api/computer-guess', { fixture: 'computer-guess1.json' }).as('getComputerGuess')

  cy.wait('@getComputerGuess').then((interception) => {
    cy.get('.swal2-popup').should('include.text', 'Computer Guess');
    cy.get('.swal2-popup').should('include.text', 'Does the person wear glasses?');

    cy.get('.swal2-confirm').contains('Yes').click();
  });
}

function selectAttribute()
{
  cy.intercept('/api/remaining-attributes').as('getAttributes')

  cy.wait('@getAttributes').then((interception) => {
    //test that it's using British spelling
    cy.get('body').should('include.text', 'moustache');
    cy.get('.attributeText').contains('brown eyes').click();
  });
}

function askQuestion()
{
    cy.request('POST', 'http://localhost/api/computer-select', { selection: 'Tim' })

    cy.get('.mchoice-item').not(':contains("brown eyes")').eq(0).click();
    cy.get('.mchoice-item').not(':contains("brown eyes")').eq(0).should('have.class', 'border-red-400');

    cy.get('.mchoice-item').contains('brown eyes').click();

    cy.get('.swal2-popup').should('include.text', 'You asked');
    cy.get('.swal2-popup').should('include.text', 'Does the person have brown eyes?');
    cy.get('.swal2-popup').should('include.text', 'Answer: Yes');

    cy.get('.swal2-confirm').contains('OK').click();
}
