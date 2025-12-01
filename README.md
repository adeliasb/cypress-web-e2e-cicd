# Automação de Testes Web com Cypress + POM + BDD

Este projeto valida o fluxo de busca do Blog do Agi usando Cypress com Page Object Model e BDD com Gherkin. O objetivo é manter o código organizado e com boa manutenção. A pipeline com GitHub Actions garante execução automática dos testes.

🛠️ Tecnologias e Ferramentas Utilizadas

Cypress

JavaScript

Node.js

GitHub Actions

Page Object Model

BDD com Cucumber (Gherkin)

Mochawesome

Electron como navegador padrão no CI

Por que Electron

Electron já vem configurado no Cypress. Ele reduz dependências extras no pipeline e evita ajustes ligados à segurança do Chrome no ambiente do GitHub Actions. Isso deixa a configuração mais simples e direta.

📁 Estrutura do Projeto
cypress/
├── e2e/
│ ├── features/
│ │ └── search.feature
│ └── step_definitions/
│ └── search.steps.js
├── pages/
│ └── search.page.js
├── support/
│ └── e2e.js
.github/
└── workflows/
└── cypress.ci.yml
cypress.config.js

👍 Boas Práticas Aplicadas

Page Object Model para isolar comportamento das páginas

Gherkin para descrever o comportamento de forma clara

Separação entre cenários, steps e páginas

Esperas inteligentes para elementos dinâmicos da interface

Relatórios com Mochawesome

Execução automática no GitHub Actions

Captura de vídeos e screenshots como artefatos do CI

▶️ Como Executar Localmente

Clone o repositório:

[git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git]
cd SEU_REPOSITORIO

Instale as dependências:

npm install

Execute os testes:

npx cypress open # Interface visual
npx cypress run # Headless

Para rodar explicitamente no Electron:

npx cypress run --browser electron

☁️ Execução no GitHub Actions

O repositório executa os testes automaticamente no Electron headless sempre que houver push ou pull request na branch main.

O workflow está em:

.github/workflows/cypress.ci.yml

O pipeline também salva vídeos e screenshots como artefatos.

👩‍💻 Desenvolvido por

Adélia dos Santos Barroso
Analista de Qualidade de Software | Senior
[LinkedIn](https://www.linkedin.com/in/abarroso)

📚 Links úteis

[Documentação do Cypress](https://docs.cypress.io)  
[Page Objects](https://docs.cypress.io/guides/references/best-practices)

[Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
