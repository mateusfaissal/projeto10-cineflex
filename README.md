# Cineflex

Cineflex é uma aplicação React desenvolvida para facilitar a reserva de assentos para filmes em cinemas. A interface permite que os usuários visualizem filmes disponíveis, escolham uma sessão e selecionem seus assentos. Este projeto utiliza styled-components para a estilização e a biblioteca axios para realizar as requisições HTTP.

## Link do deploy
    https://projeto10-cineflex-sandy-five.vercel.app/

## Funcionalidades

- **Visualizar filmes disponíveis:** Os usuários podem ver uma lista de filmes para os quais podem reservar ingressos.
- **Escolher uma sessão:** Após selecionar um filme, os usuários podem escolher a data e o horário da sessão que desejam assistir.
- **Selecionar assentos:** Os usuários podem escolher seus assentos na sala de cinema.
- **Reserva de assentos:** Os usuários podem reservar seus assentos fornecendo seu nome e CPF.

## Tecnologias Utilizadas

- React
- Styled-components
- Axios

## API

A aplicação consome dados de uma API para listar filmes, sessões e assentos disponíveis, além de permitir a reserva de assentos. As requisições para a API são as seguintes:

### Obter lista de filmes

```http
GET https://mock-api.driven.com.br/api/v8/cineflex/movies
```

### Obter lista de sessões de um filme
#### Substitua ID_DO_FILME pelo id do filme desejado
```http
GET https://mock-api.driven.com.br/api/v8/cineflex/movies/ID_DO_FILME/showtimes
```

### Obter lista de assentos de uma sessão
#### Substitua ID_DA_SESSAO pelo id da sessão desejada
```http
GET https://mock-api.driven.com.br/api/v8/cineflex/showtimes/ID_DA_SESSAO/seats

```

### Obter lista de filmes

```http
GET https://mock-api.driven.com.br/api/v8/cineflex/movies
```

### Reservar assentos

```http
POST https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many
```

## Como rodar o projeto

1. Clone o repositório
   ```sh
   git clone https://github.com/mateusfaissal/projeto10-cineflex.git
2. Entre no diretório do projeto
   ```sh
   cd projeto10-cineflex
3. Instale as dependências do projeto
   ```sh
   npm install
4. Inicie o servidor de desenvolvimento
   ```sh
   npm run dev