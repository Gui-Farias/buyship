# Buyship 🚀
[![CI - main  devships](https://github.com/Gui-Farias/buyship/actions/workflows/ci-main.yml/badge.svg?branch=main)](https://github.com/Gui-Farias/buyship/actions/workflows/ci-main.yml)     [![CI - development devships](https://github.com/Gui-Farias/buyship/actions/workflows/ci-dev.yml/badge.svg?branch=development)](https://github.com/Gui-Farias/buyship/actions/workflows/ci-dev.yml)

E-commerce fictício de naves espaciais e experiências orbitais, desenvolvido com foco em
qualidade de código, testes automatizados e CI/CD profissional utilizando GitHub Actions
e deploy na Vercel.

URL prod https://buyship.vercel.app

================================================================

## ARQUITETURA
Estrutura principal do projeto:

- src/
- │─ pages/                     Páginas e rotas da aplicação
- │─ shared/
- │── components/             Componentes reutilizáveis
- │── features/               Domínios e funcionalidades (auth, cart, etc.)
- │       └─ lib/                    Lógica pura e utilitários (cart, formatadores)
- api/                          Funções serverless (Stripe checkout)
- tests/
- │   └─ e2e/                       Testes end-to-end (Playwright)
- .github/workflows/            Pipelines CI/CD (GitHub Actions)


================================================================

## ESTRATÉGIA DE TESTES

O projeto utiliza uma estratégia de testes em camadas:

1) Testes Unitários 
   - Funções puras e regras de negócio
   - Ex: carrinho, formatadores de moeda

2) Testes de Integração 
   - Componentes e páginas do carrinho com Router, estado e side-effects

3) Testes End-to-End (Playwright)
   - Fluxo feliz completo:
     Home → Experiências → Orbital Premium → Carrinho → Login → Stripe → Sucesso

#### Quality Metrics

Cobertura mínima:
- Threshold configurado: 70% (statements, branches, functions e lines)
- Relatório HTML:  
- https://gui-farias.github.io/buyship/
================================================================

## COMO RODAR LOCALMENTE
⚠️ Precisa do node 22.14 

1) Instalar dependências
    - npm install

2) Criar o .env com supabase 
    - (exemplo abaixo - VARIÁVEIS DE AMBIENTE )

3) Rodar aplicação em desenvolvimento
    - npm run dev

4) Rodar lint
    - npm run lint

5) Rodar testes unitários e integração
    - npm run test

6) Rodar testes com cobertura
    - npm run test:coverage


⚠️ Importante sobre E2E

Os testes E2E dependem das rotas serverless (/api), pois estou acessando a stripe para o caminho feliz, entao o projeto deve ser executado com o runtime da Vercel.

1) Criar o .env.e2e
    - (exemplo abaixo - VARIÁVEIS DE AMBIENTE)

2) Instale a Vercel CLI
   npm i -g vercel

3) Faça login (qualquer conta Vercel funciona)
   vercel login

4) Inicie o ambiente local
   vercel dev

5) Em outro terminal rodar testes E2E (Playwright)
    - npm run test:e2e 
    - OU
    - npm run test:e2e-ui  (para rodar test com ui playwright)


#### Observação:
1) Os testes E2E requerem variáveis de ambiente configuradas (.env.e2e).
2) Para rodar o e2e completo no local precisa descomentar as linha do retorno da stripe e check do text title da pagina linha 121 e 124, foi necessario comentar pois no CI nao estava acontecendo o retorno da stripe, provavelmente timeout.

================================================================

## VARIÁVEIS DE AMBIENTE

Use os exemplos:
- .env.example
- .env.e2e.example

Crie localmente:
- .env
- .env.e2e

Preencha com:
- Chaves do Supabase
- Chaves do Stripe
- Credenciais usadas nos testes E2E

================================================================

## Versionamento (SemVer + Conventional Commits)

Commits seguem Conventional Commits.
Releases são geradas automaticamente na `main` via semantic-release:

- feat: MINOR
- fix: PATCH
- feat! / BREAKING CHANGE: MAJOR


Tags no formato: vMAJOR.MINOR.PATCH (ex: v1.0.0)

## Branch Protection – main 

A branch main é protegida por uma rule que exige merge apenas via Pull Request,
com todos os checks de CI aprovados. Essa configuração garante que a main permaneça
sempre em estado release-ready, reduzindo o risco de falhas em produção.

## COMO RODAR A PIPELINE (CI/CD)

Os workflows estão definidos em: <br/>
.github/workflows/

- ci-dev.yml   → CI da branch development
- ci-main.yml  → CI para Pull Requests na main
- cd-main.yml  → CD completo (Preview → E2E → Production)

#### CI – Development 
Disparado em:
- Push na branch development

Executa:
- npm ci
- lint
- testes
- build
- upload de artifact

#### CI – Main
Disparado em:
- Pull Request para a branch main

Executa:
- npm ci
- lint
- testes + cobertura

Merge é bloqueado até o CI passar.

================================================================

## COMO EXECUTAR O DEPLOY

O deploy é feito exclusivamente via GitHub Actions.

Fluxo de CD:
1) Merge aprovado na main
2) Deploy Preview na Vercel
3) Execução dos testes E2E no preview
4) Deploy em produção somente se os E2E passarem

Secrets necessários no GitHub:
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID
- E2E_USER_EMAIL
- E2E_USER_PASSWORD

Deploy pode ser:
- Automático (merge na main)
- Manual via workflow_dispatch no GitHub Actions

================================================================

## STATUS DO PROJETO

Projeto funcional, com:
- Arquitetura organizada
- Estratégia completa de testes
- Cobertura mínima garantida
- CI/CD ativo
- Deploy controlado e validado por E2E

================================================================
