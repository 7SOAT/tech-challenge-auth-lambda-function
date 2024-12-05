<h1 align="center"> Lambda Function ☁️</h1>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="quality-gate"> 🧪 Quality Gate </h2>

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=7SOAT_tech-challenge-payments&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=7SOAT_tech-challenge-payments)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=7SOAT_tech-challenge-payments&metric=coverage)](https://sonarcloud.io/summary/new_code?id=7SOAT_tech-challenge-payments)

<h2 id="requisitos"> 📃 Dependências</h2>

<p align="justify">
  Para rodar o projeto localmente, primeiro você precisa se certificas que possui essas ferramentas insaladas:
</p>

* [NodeJS e NPM](https://nodejs.org/en)
* [Terraform](https://www.terraform.io/)
* [AWS SDK](https://aws.amazon.com/pt/sdk-for-javascript/)

```
src
├── aws
|   ├── utils 
|   ├── calculcate-hash-secret.ts
|   ├── cognito-service.ts
├── config
|   ├── aws
|   ├── environments
├── jwt
|   ├── generateToken.ts
└── main.ts
```
![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h3>Instalar bibliotecas</h3>
<p>Para instalar as bibliotecas, abra o terminal na raiz do projeto e execute o seguinte comando:</p>

``` npm install ```

<h3>Executar o projeto</h3>
<p>Para executar o projeto de autenticação utilizando Lambda na AWS, abra o terminal na raiz do projeto e execute os seguintes comandos:</p>

``` npm run deploy ```

<p>A partir disto o Actions irá prosseguir com a execução.</p>

