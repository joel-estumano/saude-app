# SaudeApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/joel-estumano/saude-app.git
```

Navegue para o Diretório do Projeto:

```bash
cd saude-app
```

Instale as Dependências:

```bash
npm i
```

### Configure o Ambiente

#### É necessário que já possua o sistema api disponível no seu local de desenvolvimento.

Dentro do diretório do projeto, navegue até src/environments/
Edite o arquivo environment.development.ts preenchendo com as informações geradas pelo sistema api.

Estará disponívem para (Password grant client)

clientId: ? \
clientSecret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Mais detalhes confira aqui https://github.com/joel-estumano/saude-api na secção 'Configure os segredos de autenticação via OAuth:'

### Execução do Projeto

Inicie o servidor de desenvolvimento

```bash
ng serve
```

Acesse a aplicação no navegador usando o endereço: http://localhost:4200/
