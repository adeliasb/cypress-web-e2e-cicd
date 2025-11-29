// cypress/pages/search.page.js

// Page Object da página de busca do Blog do Agi
export class SearchPage {
  searchIcon() {
    // Ícone da lupa no menu superior
    return cy.get(".header-search .search-submit");
  }

  searchInput() {
    // Campo de input que aparece ao clicar na lupa
    return cy.get(".header-search .search-field");
  }

  searchResults() {
    // Lista de resultados
    return cy.get("article");
  }

  firstResult() {
    // Primeiro resultado retornado pela pesquisa
    return cy.get("article").first();
  }

  noResultsMessage() {
    // Blog usa seção de resultados vazios com texto padrão
    return cy.contains("Nenhum resultado");
  }
}

export const searchPage = new SearchPage();
