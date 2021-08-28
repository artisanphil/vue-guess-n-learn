/* eslint-disable no-undef */
describe('Play Game', () => {
  it('Returns expected elements', () => {

    cy.visit('')

    selectCharacter();

    computerGuess();

    selectAttribute();

    askQuestion();

    cy.get('body').should('include.text', 'Continue');
  })
})

function selectCharacter()
{
  cy.get('body').should('include.text', 'Please choose a character for the computer to guess');

  cy.contains('Liam').click();

  cy.get('.swal2-popup').should('include.text', 'You have selected Liam');
}

function computerGuess()
{
  cy.intercept('GET', '/api/computer-guess', { fixture: 'computer-guess1.json' })

  cy.get('.swal2-confirm').contains('OK').click();

  cy.get('.swal2-popup').should('include.text', 'Computer Guess');
  cy.get('.swal2-popup').should('include.text', 'Does the person wear glasses?');

  cy.get('.swal2-confirm').contains('Yes').click();
}

function selectAttribute()
{
  cy.get('#attributes').contains('brown eyes').click();
}

function askQuestion()
{
    cy.request('POST', 'http://localhost:8000/api/computer-select', { selection: 'Tim' })

    cy.get('.mchoice-item').not(':contains("brown eyes")').eq(0).click();
    cy.get('.mchoice-item').not(':contains("brown eyes")').eq(0).should('have.class', 'border-red-400');

    cy.get('.mchoice-item').contains('brown eyes').click();

    cy.get('.swal2-popup').should('include.text', 'You asked');
    cy.get('.swal2-popup').should('include.text', 'Does the person have brown eyes?');
    cy.get('.swal2-popup').should('include.text', 'Answer: Yes');

    cy.get('.swal2-confirm').contains('OK').click();
}
