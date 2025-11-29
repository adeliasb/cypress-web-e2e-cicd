// cypress/e2e/step_definitions/search.steps.js

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { searchPage } from "../../pages/search.page";

const Dado = Given;
const Quando = When;
const Então = Then;

// Dado que estou na página inicial
Dado("que eu estou na página inicial do blog", () => {
  cy.visit("https://blogdoagi.com.br/");
});

// Quando realizo busca
Quando("eu realizo a busca por {string}", (termo) => {
  searchPage.searchIcon().click(); // abre o input
  searchPage.searchInput().type(termo + "{enter}"); // digita e envia
});

// Então vejo resultados
Então("eu devo ver resultados de pesquisa", () => {
  searchPage.searchResults().should("have.length.greaterThan", 0);
});

// Primeiro resultado contém o termo
Então("o primeiro resultado deve conter o termo {string}", (termo) => {
  searchPage.firstResult().should("contain.text", termo);
});

// Clico no primeiro resultado
Quando("eu clico no primeiro resultado", () => {
  searchPage.firstResult().find("a").first().click();
});

// Página do artigo abre
Quando(
  "a página do artigo deve abrir e o título deve conter {string}",
  (termo) => {
    cy.get("h1").should("contain.text", termo);
  }
);

// Mensagem de nenhum resultado
Então("eu devo ver a mensagem de nenhum resultado ou lista vazia", () => {
  searchPage.noResultsMessage().should("exist");
});
