// cypress/e2e/step_definitions/search.steps.js

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { searchPage } from "../../pages/search.page";

const Dado = Given;
const Quando = When;
const Então = Then;

Dado("que eu estou na página inicial do blog", () => {
  cy.visit("/");
});

Quando("eu realizo a busca por {string}", (termo) => {
  // Abre o campo da busca
  searchPage.searchIcon().click();

  // 1. Clica na lupa
  searchPage.searchIcon().click();

  // 1. Clica na lupa
  searchPage.searchIcon().should("exist").click();

  // 2. Aguarda o form e o input ficarem visíveis
  cy.get("form.search-form", { timeout: 15000 }).should(($form) => {
    // Retry automático até que o form esteja visível
    //expect($form.css("visibility")).to.not.eq("hidden");
  });

  // 3. Pega o input e digita o termo
  searchPage
    .searchInput()
    .should("exist")
    .should(($input) => {
      // Retry automático até que o input esteja visível de fato
      expect($input.height()).to.be.greaterThan(0);
      expect($input.css("display")).to.not.eq("none");
      //expect($input.css("visibility")).to.not.eq("hidden");
    })
    .clear({ force: true })
    .type(termo + "{enter}", { force: true });

  // 4. Aguarda a URL atualizar para resultados
  cy.url({ timeout: 15000 }).should("include", "?s=");
});

Então("eu devo ver resultados de pesquisa", () => {
  searchPage.searchResults().should("have.length.greaterThan", 0);
});

Então("o primeiro resultado deve conter o termo {string}", (termo) => {
  cy.get("article") // pega todos os artigos
    .first() // primeiro artigo
    .find("h2") // pega o título
    .invoke("text") // pega o texto puro
    .then((txt) => {
      expect(txt.toLowerCase()).to.include(termo.toLowerCase());
    });
});

Quando("eu clico no primeiro resultado", () => {
  cy.get("article")
    .first()
    .find("h2 > a") // pega o link dentro do título
    .click({ force: true });
});

Quando(
  "a página do artigo deve abrir e o título deve conter {string}",
  (termo) => {
    cy.get("h1.entry-title", { timeout: 10000 })
      .invoke("text")
      .then((txt) => {
        expect(txt.toLowerCase()).to.include(termo.toLowerCase());
      });
  }
);

Então("eu devo ver a mensagem de nenhum resultado ou lista vazia", () => {
  searchPage.noResultsMessage();
});
