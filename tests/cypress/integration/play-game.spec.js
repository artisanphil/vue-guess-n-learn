/* eslint-disable no-undef */
describe('Play Game', () => {
  it('Returns expected elements', () => {

    cy.visit('/')

    cy.get('body').should('include.text', 'Please choose a character for the computer to guess');

    cy.contains('Liam').click();

    cy.get('.swal2-popup').should('include.text', 'You have selected Liam');

    cy.intercept('GET', '/api/computer-guess', { fixture: 'computer-guess1.json' })

    cy.get('.swal2-confirm').contains('OK').click();

    cy.get('.swal2-popup').should('include.text', 'Computer Guess');
    cy.get('.swal2-popup').should('include.text', 'Does the person wear glasses?');

    cy.get('.swal2-confirm').contains('Yes').click();

    cy.get('#attributes').contains('brown eyes').click();

    cy.intercept('GET', '/api/user-guess?choice=brown eyes', { fixture: 'mchoice-brown-eyes.json' })

    cy.get('.mchoice-item').eq(0).click();

    cy.get('.mchoice-item').should('have.class', 'border-red-400').eq(0);

    cy.get('.mchoice-item').eq(1).click();

    cy.get('.swal2-popup').should('include.text', 'You asked');
    cy.get('.swal2-popup').should('include.text', 'Does the person have brown eyes?');
  })
})
