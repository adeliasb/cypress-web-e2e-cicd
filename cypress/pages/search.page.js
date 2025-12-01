// cypress/pages/search.page.js

export class SearchPage {
  searchIcon() {
    // Seleciona o ícone da lupa.
    // O filtro :visible garante que o Cypress clique apenas no elemento exibido,
    // já que o tema costuma renderizar duas lupas (menu desktop e mobile).
    // O timeout aumenta a tolerância para animações do header.
    return cy.get(".ast-icon.icon-search:visible", { timeout: 10000 });
  }

  searchInput() {
    // Seleciona o campo de texto da busca.
    // O timeout evita falha quando a animação de abertura do formulário leva alguns milissegundos.
    return cy.get("#search-field", { timeout: 10000 });
  }

  searchResults() {
    // Seleciona os artigos exibidos após uma busca bem sucedida.
    // No WordPress, cada resultado aparece como uma tag article.
    return cy.get("article");
  }

  firstResult() {
    // Seleciona o primeiro artigo retornado na página de resultados.
    // Usado para validar conteúdo e navegar para a página do post.
    return cy.get("article").first();
  }

  noResultsMessage() {
    // Localiza a mensagem padrão mostrada pelo WordPress quando não há resultados.
    // O seletor aponta para o parágrafo que exibe o texto informativo.
    // A asserção garante que o texto certo aparece e está visível.
    return cy
      .get("#main > section > div > p", { timeout: 15000 })
      .should("be.visible")
      .and("contain.text", "Lamentamos, mas nada foi encontrado");
  }
}

// Instancia única da Page Object para uso nos steps
export const searchPage = new SearchPage();
