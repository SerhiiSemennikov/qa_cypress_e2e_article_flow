/* eslint-disable max-len */
const { generateArticle } = require('../support/generateArticle');
describe('test conduit site', () => {
  before(() => {
    cy.visit('/');
  });

  it('should login', () => {
    cy.assertPageUrl('');
    const { title, description, body } = generateArticle();
    cy.log(title, description, body);
    cy.task('generateUser').then((user) => {
      cy.log(user.email, user.username, user.password);
      cy.login(user.email, user.username, user.password);

      cy.createArticle(title, description, body);

      cy.get('a.nav-link').contains('Sign in').click();
      cy.findByPlaceholder('Email').type(user.email);
      cy.findByPlaceholder('Password').type(user.password);
      cy.get('.btn').contains('Sign in').click();
      cy.get(':nth-child(4) > .nav-link').should('contain', user.username.toString().toLowerCase()).click();
      cy.get('h1').should('contain', title);
      cy.get('.preview-link > p').should('contain', description);
      cy.get('a.preview-link').click();
      cy.get('div > p').should('contain', body);
    });
  });
});
