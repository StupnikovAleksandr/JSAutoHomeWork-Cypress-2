const selector = require('../fixtures/selector.json')
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.get(selector.selectorEmail).type(email);
    cy.get(selector.selectorPassword).type(password);

})

Cypress.Commands.add('happyLoginADM', () => {
    cy.visit('http://qamid.tmweb.ru/admin')
    cy.title().should('eq', 'ИдёмВКино');
    cy.login('qamid@qamid.ru' , 'qamid');
    cy.get('input[value="Авторизоваться"]').click();
    cy.contains('Управление залами').should("be.visible");
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })