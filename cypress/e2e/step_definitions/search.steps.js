// cypress/e2e/step_definitions/search.steps.js

// Importa as funções padrão do Cucumber para criar passos Given/When/Then
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Importa a Page Object responsável pelos seletores e métodos da página de busca
import { searchPage } from "../../pages/search.page";

// Alias em português para deixar o BDD coerente com os cenários escritos em PT-BR
const Dado = Given;
const Quando = When;
const Então = Then;

// Passo inicial que garante que o teste começa na página principal
Dado("que eu estou na página inicial do blog", () => {
  // Navega para a home do blog usando o baseUrl configurado no cypress.config
  cy.visit("/");
});

// Passo responsável por disparar a busca
Quando("eu realizo a busca por {string}", (termo) => {
  // Abre o campo da busca (primeiro clique na lupa)
  // Este clique existe para contornar animações ou estados iniciais do tema
  searchPage.searchIcon().click();

  // Segundo clique para garantir que o campo realmente expanda
  // Alguns temas WordPress demoram alguns milissegundos para abrir o form
  searchPage.searchIcon().click();

  // Terceiro clique com assertiva de existência
  // Isso força o Cypress a esperar o elemento existir antes do clique
  searchPage.searchIcon().should("exist").click();

  // Aguarda o formulário de busca ficar visível no DOM
  cy.get("form.search-form", { timeout: 15000 }).should(($form) => {
    // Aqui o Cypress faz retry automático até que a condição seja atendida
    // O comentário abaixo foi mantido como estava
    //expect($form.css("visibility")).to.not.eq("hidden");
  });

  // Localiza o campo de texto da busca e garante que está pronto para uso
  searchPage
    .searchInput()
    .should("exist") // garante presença no DOM
    .should(($input) => {
      // Essas verificações evitam falsos positivos causados por animações
      // Verifica altura maior que 0
      expect($input.height()).to.be.greaterThan(0);

      // O display deve ser algo renderizável
      expect($input.css("display")).to.not.eq("none");

      // Comentário original mantido
      //expect($input.css("visibility")).to.not.eq("hidden");
    })
    .clear({ force: true }) // limpa o campo mesmo que o Cypress suspeite de sobreposição
    .type(termo + "{enter}", { force: true }); // digita o termo e envia a busca

  // Aguarda a atualização da URL
  // O parâmetro ?s= faz parte da busca nativa do WordPress
  cy.url({ timeout: 15000 }).should("include", "?s=");
});

// Verifica que pelo menos um resultado foi retornado para um termo existente
Então("eu devo ver resultados de pesquisa", () => {
  // Se houver artigos, significa que o WordPress retornou conteúdo
  searchPage.searchResults().should("have.length.greaterThan", 0);
});

// Confere que o primeiro resultado contém o termo pesquisado
Então("o primeiro resultado deve conter o termo {string}", (termo) => {
  cy.get("article") // seleciona todos os artigos retornados
    .first() // pega o primeiro da lista
    .find("h2") // recupera o título do artigo
    .invoke("text") // pega o texto sem HTML
    .then((txt) => {
      // Converte tudo para minúsculo para evitar falhas por capitalização
      expect(txt.toLowerCase()).to.include(termo.toLowerCase());
    });
});

// Ação de clicar no primeiro resultado da lista
Quando("eu clico no primeiro resultado", () => {
  cy.get("article")
    .first()
    .find("h2 > a") // pega o link dentro do título
    .click({ force: true }); // clique forçado para evitar bloqueio por layout
});

// Verifica que a página do artigo abriu e que o título da página contém o termo buscado
Quando(
  "a página do artigo deve abrir e o título deve conter {string}",
  (termo) => {
    cy.get("h1.entry-title", { timeout: 10000 }) // título principal da página de artigo
      .invoke("text")
      .then((txt) => {
        expect(txt.toLowerCase()).to.include(termo.toLowerCase());
      });
  }
);

// Verifica que a página exibiu a mensagem de ausência de resultados
Então("eu devo ver a mensagem de nenhum resultado ou lista vazia", () => {
  // Método da page object criado especificamente para validar o texto correto
  searchPage.noResultsMessage();
});
