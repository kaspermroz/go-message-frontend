/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
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
//

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<any>
    }
  }
}

Cypress.Commands.add('login', () => {
  Cypress.log({
    name: 'loginViaAuth0',
  });
  cy.clearLocalStorage();

  const username = Cypress.env('auth_username');
  const password = Cypress.env('auth_password');
  const client_id = Cypress.env('auth_client_id');
  const client_secret = Cypress.env('auth_client_secret');
  const audience = Cypress.env('auth_audience');
  const scope = 'openid profile email';

  const options = {
    method: 'POST',
    url: Cypress.env('auth_url'),
    body: {
      grant_type: 'password',
      username,
      password,
      audience,
      scope,
      client_id,
      client_secret,
    },
  };
  return cy.request(options)
    .then(({ body: { access_token, expires_in, id_token, token_type } }) => {
      cy.window().then((win) => {
        win.localStorage.setItem(
          `@@auth0spajs@@::${client_id}::${audience}::${scope}`,
          JSON.stringify({
            body: {
              client_id,
              access_token,
              id_token,
              scope,
              expires_in,
              token_type,
              decodedToken: {
                user: JSON.parse(
                  Buffer.from(id_token.split('.')[1], 'base64').toString('ascii'),
                ),
              },
              audience,
            },
            expiresAt: Math.floor(Date.now() / 1000) + expires_in,
          }),
        );
        cy.reload();
      });
    });
});
export {}