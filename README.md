# Pokédex React

Trabalho final da disciplina de **Frameworks Web I** (Unilavras).

## Descrição

Aplicação web de consulta de Pokémon feita com React. O usuário pode ver a lista de Pokémon em cards, pesquisar por nome ou número, filtrar por tipo, navegar entre as páginas e abrir uma página com os detalhes de cada Pokémon.

Todos os dados vêm da PokéAPI. A aplicação não tem backend próprio.

## Objetivo

Aplicar na prática o que foi estudado na disciplina: componentização, props, estados com Hooks, eventos, consumo de API externa com Axios, rotas com React Router e interface com Material UI.

## Integrante

- Luiz Otavio Faquim de Oliveira

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- Axios
- React Router DOM
- Material UI (@mui/material, @emotion/react e @emotion/styled)
- Hooks do React (useState e useEffect)

## API utilizada

**PokéAPI** - https://pokeapi.co/

É uma API pública e gratuita, não precisa de chave nem de cadastro. Os endpoints usados no projeto são:

| Endpoint | Para que serve |
| --- | --- |
| `GET /pokemon?limit=20&offset=0` | Lista paginada de Pokémon (paginação da própria API) |
| `GET /pokemon?limit=100000` | Lista com todos os nomes, usada na busca por texto |
| `GET /type` | Lista de tipos para o filtro |
| `GET /type/{tipo}` | Pokémon de um tipo (ex: `/type/fire`) |
| `GET /pokemon/{id ou nome}` | Dados completos de um Pokémon (imagem, tipos, altura, peso, habilidades e stats) |

URL base usada no projeto: `https://pokeapi.co/api/v2`

## Principais funcionalidades

- Listagem de Pokémon em cards (imagem, nome, número e tipos)
- Busca dinâmica por nome ou número, atualizada enquanto o usuário digita
- Filtro por tipo, que funciona junto com a busca
- Paginação funcional (usa `limit` e `offset` da API quando não há filtro)
- Página de detalhes na rota `/pokemon/:id` com altura, peso, habilidades e estatísticas
- Botão para voltar para a listagem
- Indicador de carregamento
- Mensagem de erro amigável com botão "Tentar novamente"
- Mensagem quando nenhum Pokémon é encontrado
- Interface responsiva (muda a quantidade de colunas conforme a tela)

## Estrutura básica do projeto

```
trabalho-final-Frameworks_Web_I/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                  (ponto de entrada, Router e tema do Material UI)
    ├── App.jsx                   (Header e rotas)
    ├── index.css
    ├── components/
    │   ├── Header.jsx
    │   ├── SearchBar.jsx
    │   ├── Filter.jsx
    │   ├── PokemonCard.jsx
    │   ├── TypeChips.jsx
    │   ├── Pagination.jsx
    │   ├── Loading.jsx
    │   └── ErrorMessage.jsx
    ├── pages/
    │   ├── Home.jsx              (lista, busca, filtro e paginação)
    │   └── PokemonDetails.jsx    (detalhes do Pokémon)
    ├── services/
    │   ├── api.js                (configuração do Axios)
    │   └── pokemonService.js     (funções que chamam a PokéAPI)
    └── utils/
        └── pokemonUtils.js       (tradução dos tipos, cores e formatações)
```

## Como instalar

Pré-requisitos:

- Node.js na versão 20.19 ou mais nova (ou 22.12+), por causa do Vite
- npm (já vem junto com o Node.js)
- Git

Para conferir as versões:

```bash
node -v
npm -v
```

Depois de clonar o projeto (veja a próxima seção), entre na pasta e instale as dependências:

```bash
npm install
```

## Como executar

```bash
npm run dev
```

O terminal vai mostrar um endereço, normalmente `http://localhost:5173`. É só abrir no navegador.

## Como executar depois de clonar do GitHub

```bash
git clone https://github.com/Kunksss/trabalho-final-Frameworks_Web_I
cd trabalho-final-Frameworks_Web_I
npm install
npm run dev
```

## Observações sobre a PokéAPI

- Não precisa de chave de acesso.
- Existe limite de uso justo, mas para este projeto não há problema. O navegador guarda em cache boa parte das respostas.
- A API devolve os nomes dos tipos em inglês (`fire`, `water`...). Por isso o projeto tem uma pequena tabela de tradução em `src/utils/pokemonUtils.js`.
- A lista completa da API inclui formas especiais de alguns Pokémon (por exemplo mega evoluções), que ficam no final da lista. Algumas delas não têm imagem, então o card mostra "Sem imagem".
- Altura vem em decímetros e peso em hectogramas, por isso o código divide por 10 para mostrar em metros e quilos.
