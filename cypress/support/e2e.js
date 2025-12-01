// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("astra is not defined") ||
    err.message.includes("$scope.imagesLoaded")
  ) {
    return false; // ignora esses erros
  }
});

// // Este arquivo é carregado automaticamente antes dos testes E2E.
// // Aqui configuramos comportamentos globais do Cypress.

// // Captura erros não tratados que acontecem na aplicação durante a execução dos testes.
// Cypress.on("uncaught:exception", (err) => {
//   // Alguns sites com temas WordPress (como Astra) geram erros de JS que
//   // não interferem no fluxo do teste. Os dois abaixo são comuns:
//   // "astra is not defined" e falhas relacionadas ao imagesLoaded.
//   // Esses erros são ruídos do front e não indicam falha funcional real.

//   if (
//     err.message.includes("astra is not defined") ||
//     err.message.includes("$scope.imagesLoaded")
//   ) {
//     // Retornar false instrui o Cypress a ignorar esse erro,
//     // evitando que o teste quebre por algo externo à lógica testada.
//     return false;
//   }

//   // Outros erros não são ignorados e seguem o comportamento normal do Cypress.
// });
