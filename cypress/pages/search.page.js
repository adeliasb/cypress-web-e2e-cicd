// cypress/pages/search.page.js

export class SearchPage {
  searchIcon() {
    // Ícone da lupa visível
    return cy.get(".ast-icon.icon-search:visible", { timeout: 10000 });
  }

  searchInput() {
    // Campo de busca
    return cy.get("#search-field", { timeout: 10000 });
  }

  searchResults() {
    // Resultados da pesquisa
    return cy.get("article");
  }

  firstResult() {
    // Primeiro artigo da lista
    return cy.get("article").first();
  }

  noResultsMessage() {
    // Seleciona o parágrafo que aparece quando não há resultados
    return cy
      .get("#main > section > div > p", { timeout: 15000 })
      .should("be.visible")
      .and("contain.text", "Lamentamos, mas nada foi encontrado");
  }
}
export const searchPage = new SearchPage();
