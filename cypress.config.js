// cypress.config.js
// Configuração principal do Cypress com integração do preprocessor cucumber
const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://lojaebac.ebaconline.art.br",
    specPattern: "cypress/e2e/features/*.feature",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      return config;
    },
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
});

module.exports = defineConfig({
  e2e: {
    // baseUrl facilita usar cy.visit('/').
    baseUrl: "https://blogdoagi.com.br",
    // padrão das features
    specPattern: "cypress/e2e/features/*.feature",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      // integra o preprocessor do cucumber
      on("file:preprocessor", cucumber());
      return config;
    },
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
});
