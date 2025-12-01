const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://blogdoagi.com.br",
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
