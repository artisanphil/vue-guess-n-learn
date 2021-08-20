/* eslint-disable no-undef */
describe('Initial selection', () => {
  it('contains instructions', () => {
    cy.visit('/')

    cy.contains('Please choose a character for the computer to guess')
  })
})
