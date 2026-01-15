# Buyship 🚀

E-commerce fictício de naves espaciais e experiências orbitais, desenvolvido com foco em
qualidade de código, testes automatizados e CI/CD profissional utilizando GitHub Actions
e deploy na Vercel.

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

Cobertura mínima:
- Threshold configurado: 70% (statements, branches, functions e lines)

================================================================

## COMO RODAR LOCALMENTE

1) Instalar dependências
    - npm install

2) Rodar aplicação em desenvolvimento
    - npm run dev

3) Rodar lint
    - npm run lint

4) Rodar testes unitários e integração
    - npm run test

5) Rodar testes com cobertura
    - npm run test:coverage

6) Rodar testes E2E (Playwright)
    - npm run test:e2e 
    - OU
    - npm run test:e2e-ui  (para rodar test com ui playwright)

#### Observação:
Os testes E2E requerem variáveis de ambiente configuradas (.env.e2e).

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