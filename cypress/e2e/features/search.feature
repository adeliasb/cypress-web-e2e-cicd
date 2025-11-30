# language: pt
Funcionalidade: Pesquisa de artigos no Blog do Agi
  Como usuário do blog
  Eu quero usar a busca para encontrar artigos relevantes
  Para acessar conteúdo por tema e verificar que os resultados aparecem corretamente

  Contexto:
    Dado que eu estou na página inicial do blog

  Cenario: Buscar por termo existente e abrir um artigo
    Quando eu realizo a busca por "consignado"
    Então eu devo ver resultados de pesquisa
    E o primeiro resultado deve conter o termo "consignado"
    Quando eu clico no primeiro resultado
    Então a página do artigo deve abrir e o título deve conter "consignado"

  Cenario: Buscar por termo inexistente exibe mensagem de sem resultados
    Quando eu realizo a busca por "1termoinexistente"
    Então eu devo ver a mensagem de nenhum resultado ou lista vazia
