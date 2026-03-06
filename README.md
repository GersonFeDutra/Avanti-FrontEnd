# Problema: Banco de Trocas de Conhecimento

## Objetivo

Desenvolver uma aplicação web funcional que permita registrar, visualizar e gerenciar
ofertas de conhecimento. A aplicação deve possibilitar o cadastro de pessoas dispostas a
compartilhar um conhecimento, a publicação das ofertas e a consulta dessas informações
de forma simples e intuitiva.

<details>

<summary>Contexto</summary>

Muitas pessoas desejam aprender novas habilidades, mas não possuem recursos
financeiros para pagar cursos, aulas particulares ou mentorias. Ao mesmo tempo, essas
mesmas pessoas possuem conhecimentos que poderiam ser compartilhados com outras.
Atualmente, essa troca acontece de forma desorganizada, por meio de redes sociais ou
grupos de mensagens, dificultando a busca e o acompanhamento das ofertas disponíveis.
Com o objetivo de tornar esse processo mais acessível e organizado, será desenvolvida
uma aplicação web que permita o cadastro e a visualização de conhecimentos oferecidos
por pessoas da comunidade, facilitando a conexão entre quem quer ensinar e quem quer
aprender.

</details>

## Instalação

Basta executar:

```bash
npm run dev
```

### Requisitos

- node
  > [!NOTE] Serão instalados:
  >
  > - Vite (React + Javascript SWC)
  >
  >   Leia a seção abaixo...

### React + Vite

<details>

<summary> This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. </summary>

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

#### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

</details>

### Variáveis de Ambiente

<details>

<summary>Exemplo de `.env`:</summary>

```env
VITE_API_URL=http://localhost:3000
```
