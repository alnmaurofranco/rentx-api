<p align="center">
<a href="http://localhost:3333/api-docs" target="_blank">
<img src=".github/assets/logo@rentx-logo.png" width="460px;" alt="API RENTX - logotipo" />
</a>
</p>

<h3 align="center">
⚡ RentxAPI - Aluguel de automóveis 🚗
</h3>

</br>

<p align="center">
<img src=".github/screens/demo@screen.png" alt="demostração" />
</p>

## 📖**Sobre**
O projeto consiste em uma API para alugueis de automôveis, ela vem
para solucionar os problemas que muitos estacionamentos enfrentam sem uma aplicação no dia a dia para fazer o gerenciamento dos seus serviços de alugueis, ou seja, a solução visa vem a ajudar tanto o usuário final como os donos de estacionamento, por que o usuário final tem mais práticidade para acertar seu alugel.

## 📕 **Documentação**
A nossa documentação está disponível para ser consultada em <a href="http://localhost:3333/api-docs" target="_blank">http://localhost:3333/api-docs</a>


## 🚀 **Tecnologias**
Esse projeto foi desenvolvido com as seguintes tecnologias:
* [TypeScript](https://typescriptlang.org) - TypeScript extends JavaScript by adding types to the language.
* [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [ExpressJS](http://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [TypeORM](https://typeorm.io) - TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
* [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
* [Jest](https://jestjs.io) - Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase.
* [Docker](https://www.docker.com/) - Developers Love Docker. Businesses Trust It.
* [BABEL](https://babeljs.io/) - BABEL The compiler for next generation JavaScript
* [ESLint](https://eslint.org/) - ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code.
* [Prettier](https://prettier.io/) - Prettier is an opinionated code formatter with support for JavaScript, TypeScript, JSON, GraphQL...
* [AWS](https://aws.amazon.com) - Amazon Web Services (AWS) is a subsidiary of Amazon providing on-demand cloud computing platforms and APIs to individuals, companies, and governments,
<p>
<img src="https://cdn.svgporn.com/logos/typescript-icon.svg" alt="typescript" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" alt="nodejs" width="45" height="45" style="margin-left: 5px;"/>
<img src=".github/assets/typeorm.svg" alt="typeorm" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/postgresql.svg" alt="postgresql" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/jest.svg" alt="jest" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/docker-icon.svg" alt="docker" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/eslint.svg" alt="eslint" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/prettier.svg" alt="prettier" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/aws-s3.svg" alt="s3" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/aws-ses.svg" alt="ses" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/yarn.svg" alt="yarn" width="45" height="45" style="margin-left: 5px;"/>
</p>

## 🎉 **Funcionalidades**
As funcionalidades desta API são
* Cadastro do usuário ✅
* Autenticação do usuário ✅
* Perfil de usuário ✅
* Alterar imagem do perfil ✅
* Recuperação de senha do usuário ✅
* Cadastrar carro ✅
* Listar carros disponíveis ✅
* Cadastrar especificação do carro ✅
* Alterar imagens do carro ✅
* Cadastrar especificação ✅
* Listar todas as especificações ✅
* Importar categorias por planilha (.csv) ✅
* Cadastrar categoria ✅
* Listar todas as categorias ✅
* Consultar uma categoria ✅
* Alterar uma categoria ✅
* Excluir uma categoria ✅
* Cadastrar um aluguel ✅
* Devolver um carro alugado ✅
* Listar alugueis do usuário ✅

## 💻 **Como executar**
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.
### 📋 *Pré-requisitos*
Para rodar este projeto é necessário ter [Node.js](https://nodejs.org/) instalado em sua maquina. Caso não tenha ainda basta acessar o site do [Node.js](https://nodejs.org/) e instalar para continuar.

### 🔧 *Instalação*

- Clone este repositório com comando
```bash
git clone https://github.com/alnmaurofranco/rentx-api
```
- Acesse a pasta do projeto
```bash
cd rentx-api
```
#### 🔥 ***Sem Docker***
- Instale as dependências do projeto com (yarn ou npm) nesse exemplo estou usando **yarn**
```bash
yarn install
```
- Após a instalação das dependências você deve renomear os arquivos `.env.example` para `.env` e `.env.production.example` para `.env.production` que se encontram na raiz do projeto.
- Caso você ainda não tenha criado a base de dados, basta executar esse comando no seu SGDB:
````sql
CREATE DATABASE rentxdb;
````
- Dentro do arquivo `.env` você coloca as informações do seu banco de dados.
```bash
# Exemplo
DB_USERNAME="user" # nome de usuário do banco de dados
DB_PASSWORD="password" # senha de usuário do banco de dados
DB_NAME="rentxdb" # mantenha esse nome caso tenha executado o primeiro comando, caso contrario altere pelo nome escolhido.
```
- Feito as modificações anteriores, vamos agora executar o comando que roda as nossas migrations.
```
yarn db:migrate
```
- Em **produção** você vai precisar alterar o arquivo `.env.production`, coloque suas informações e após você deve executar o comando para iniciar API em **modo de produção**.
```bash
yarn start:prod
```

- Iniciar a API em modo de desenvolvimento:
```bash
yarn start:dev
```

**Pronto agora API estará rodando e pode ser acessado em [`http://localhost:3333/api`](http://localhost:3333/api)**

#### ***🐳 Com Docker***
- Instale as dependências do projeto com (yarn ou npm) nesse exemplo estou usando **yarn**
```bash
yarn install
```
- Após a instalação das dependências você deve renomear os arquivos `.env.example` para `.env` e `.env.production.example` para `.env.production` que se encontram na raiz do projeto.
- Copie as informações abaixo para o arquivo `.env`.
```bash
DB_USERNAME="docker"
DB_PASSWORD="docker"
DB_NAME="rentxdb"
```
- Agora vamos subir o container do projeto utilizando o comando abaixo:
```bash
docker-compose up -d
```
- Após subir o container você pode observar os logs da aplicação:
```bash
docker logs api-rentx -f
```
**Pronto agora API estará rodando com Docker e já pode ser acessado em [`http://localhost:3333/api`](http://localhost:3333/api)**

### ⚙️ Executando os testes

- Primeiramente para você conseguir rodar os testes sem problemas, você deve criar um banco de dados para realizar os teste
````sql
CREATE DATABASE rentxdb_test;
````
- Em seguida você vai precisar configurar com as suas informações o arquivo de ambiente de testes `.env.test`
- Tendo feito tudo agora vamos rodar os testes da aplicação e pronto você já tem os seus testes configurado.
````
yarn test
````

## 🤔 **Como contribuir**
A contribuição para projetos open-sources são sempre bem-vindas!
- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m '✨ feat(minha-feature): Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📄 **Licença**

Este projeto está sob a licença (sua licença) - veja o arquivo [LICENSE.md](LICENSE) para detalhes.

---
Feito com 💚 by [Alan Mauro Franco](https://github.com/alnmaurofranco)
