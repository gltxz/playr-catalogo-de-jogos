# Playr — Catálogo de Jogos

Projeto da disciplina **Desenvolvimento WEB II** (Turma 02S) — Universidade Presbiteriana Mackenzie, Faculdade de Computação e Informática (Sistemas da Informação), sob orientação do Prof. Alan Floriano Teixeira.

Parte 1 do projeto: interface web funcional construída com **HTML5, CSS3 e JavaScript (ES6)**, sem back-end.

## Integrantes do grupo

| Nome | RA | Página(s) sob responsabilidade |
|---|---|---|
| Camilla Lazzari Simonetti | 10755884 | Home, Explorar e Detalhes do jogo; identidade visual, wireframe e planejamento |
| Matheus Bernardo | 10354275 | Home, Explorar e Detalhes do jogo (em conjunto com a Camilla) |
| Matheus Sales Cristilli | 10767150 | Contato |
| Felipe Couto Lapetina | 10757365 | Sobre Nós |
| Gustavo Henrique Vieira dos Santos | 10780509 | Biblioteca |
| Pedro Henrique Batista | 10780082 | Comunidade |

## Tema

**Catálogo de jogos** — um catálogo digital unificado com forte apelo social, voltado para jovens gamers (18–29 anos), que facilita a descoberta, o rastreamento e a avaliação de jogos, além de conectar amigos através de gostos em comum. Mais detalhes em [planejamento.pdf](planejamento.pdf).

## Como executar

Este projeto não tem back-end (Parte 1), então basta abrir os arquivos HTML em um navegador.

> ⚠️ **Importante:** as páginas `biblioteca.html` e `comunidade.html` usam **módulos ES6** (`import`/`export` em `js/validacao.js`). Navegadores bloqueiam módulos ES6 quando o arquivo é aberto diretamente do disco (`file://`). Por isso, para essas duas páginas funcionarem corretamente, rode o site por um servidor local, por exemplo:
>
> - VS Code: extensão **Live Server** → botão direito em `index.html` → "Open with Live Server"; ou
> - Terminal, na pasta do projeto: `npx serve` (Node.js) e acesse o endereço mostrado.
>
> As demais páginas (Home, Explorar, Detalhes, Sobre, Contato, Termos, Cadastro, Perfil) funcionam normalmente mesmo abrindo o `index.html` direto no navegador.

## Funcionalidades implementadas

- **Home** (`index.html`): destaques da semana e feed da comunidade.
- **Explorar** (`explorar.html`): catálogo de jogos com busca por nome e filtros (checkboxes/radio) na barra lateral.
- **Detalhes do jogo** (`detalhes.html`): página dinâmica que lê o parâmetro `?jogo=` da URL e monta a tela (capa, plataformas, gêneros, sinopse, review) a partir de um objeto JavaScript com os dados de cada jogo.
- **Biblioteca** (`biblioteca.html`): CRUD completo do catálogo pessoal de jogos — adicionar, listar, marcar como concluído, remover e limpar tudo — com validação de formulário, indicadores calculados (total de jogos, jogando, concluídos, nota média) e persistência em `localStorage`.
- **Comunidade** (`comunidade.html`): publicar posts (com validação de tamanho do texto), curtir/descurtir, apagar post, inverter ordem do feed e entrar/sair de grupos.
- **Sobre** (`sobre.html`), **Contato** (`contato.html`, com FAQ em acordeão) e **Termos de Uso** (`termos.html`): páginas institucionais.
- **Cadastro** (`cadastro.html`) e **Perfil/Login** (`perfil.html`): telas de autenticação (mock, sem back-end).

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 (Flexbox, Grid, variáveis CSS, media queries para responsividade)
- JavaScript (ES6): `let`/`const`, arrow functions, template strings, `for...of`, arrays e objetos, `localStorage`
- Módulos ES6 (`import`/`export`) em `js/validacao.js`, usado por `biblioteca.js` e `comunidade.js`
- Google Fonts: Orbitron (títulos) e Inter (texto)

## Limitações conhecidas

- Não há back-end, banco de dados ou API nesta etapa (Parte 1) — os dados da Biblioteca ficam salvos apenas no `localStorage` do navegador de quem está usando.
- Login, cadastro e os botões de "Entrar com Steam/Google/Facebook/Discord/Twitch" em `perfil.html` são apenas telas de exemplo (mock), sem autenticação real.
- Os jogos exibidos em Explorar/Detalhes vêm de uma lista fixa no próprio código (`js/detalhes.js`), não de uma base de dados.
