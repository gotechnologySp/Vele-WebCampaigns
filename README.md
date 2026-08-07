# web-vele-campaigns

Central de landing pages e sites promocionais temporários da Vele, publicada em `campanhas.vele.com.br`. O projeto usa Next.js App Router, React, TypeScript estrito e Tailwind CSS, com uma rota e metadados próprios para cada campanha.

## Requisitos

- Node.js 24 LTS
- npm 11+
- Docker (opcional)

## Instalação e execução

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`. A página inicial lista automaticamente as campanhas ativas; cada campanha também pode ser acessada diretamente, como em `http://localhost:3000/movimento-tecnologico`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. IDs e números nunca devem ser colocados diretamente no código.

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | Portal do formulário HubSpot |
| `NEXT_PUBLIC_HUBSPOT_FORM_ID` | ID do formulário HubSpot |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número internacional, somente dígitos |
| `NEXT_PUBLIC_SITE_URL` | URL canônica das campanhas |
| `NEXT_PUBLIC_OFFICIAL_SITE_URL` | Site institucional |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics opcional |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel opcional |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Perfil oficial no Instagram |
| `NEXT_PUBLIC_LINKEDIN_URL` | Perfil oficial no LinkedIn |
| `NEXT_PUBLIC_YOUTUBE_URL` | Canal oficial no YouTube |
| `NEXT_PUBLIC_FACEBOOK_URL` | Perfil oficial no Facebook |

Variáveis `NEXT_PUBLIC_*` são públicas. Não use tokens, chaves privadas ou segredos nelas. Sem IDs do HubSpot, o endpoint simula sucesso apenas em desenvolvimento e responde de forma controlada em produção. Analytics e botão de WhatsApp não são renderizados sem configuração.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

## Adicionar uma campanha

1. Adicione os dados e o status em `src/config/campaigns.ts`.
2. Crie `src/app/<slug>/layout.tsx` para metadata e redirecionamento.
3. Crie `src/app/<slug>/page.tsx` compondo os blocos existentes ou novos componentes em `src/components/campaigns`.
4. Inclua a campanha no sitemap (a configuração atual inclui automaticamente campanhas ativas).
5. Adicione testes para regras e componentes específicos.

Conteúdo compartilhado fica em `components/ui`, `components/layout` e `components/forms`. Conteúdo e ordem específicos de campanha ficam em `config`, evitando duplicar a página inteira.

## Expirar e redirecionar

No registro da campanha, altere `status` para `expired` e informe `redirectUrl`. O layout redirecionará ao serviço correspondente no site oficial e o sitemap deixará de listar a rota. O tipo `Campaign` já exige um dos estados válidos.

## Docker

```bash
docker compose up --build
```

A imagem usa build multi-stage, saída standalone e usuário sem privilégios. Em produção, forneça as variáveis no ambiente da plataforma, sem incorporar `.env.local` à imagem.

## Publicação

O projeto pode ser publicado em qualquer plataforma compatível com Node.js ou pela imagem Docker. Configure as variáveis, valide `npm run build`, aponte o domínio `campanhas.vele.com.br` para a plataforma e habilite HTTPS. A configuração DNS exata depende do provedor de hospedagem escolhido.

## Branches

- `main`: produção
- `develop`: homologação
- `feature/*`: desenvolvimento isolado via pull request para `develop`

A CI executa instalação limpa, lint, tipos, testes e build em pull requests e pushes para `main` ou `develop`.

## Substituições pendentes

- Confirmar a autorização de uso definitivo das cinco prévias capturadas dos projetos externos ou substituí-las por assets próprios aprovados.
- Criar a imagem social final; o SVG atual é um placeholder funcional em 1200×630.
- Informar Portal ID e Form ID reais do HubSpot e conferir os nomes internos dos campos no formulário de destino.
- Informar o número de WhatsApp no formato internacional.
- Informar IDs de Google Analytics e Meta Pixel, se aprovados pelo jurídico e pela política de consentimento da empresa.
- Informar as URLs oficiais de Instagram, LinkedIn, Facebook e YouTube. Até lá, os itens aparecem desabilitados para não criar links falsos.
- Confirmar as URLs reais das páginas de política de privacidade e do site institucional.

## Segurança e operação

O formulário valida no navegador e no servidor, sanitiza texto, limita uma tentativa por IP a cada 30 segundos e usa timeout na integração. A limitação em memória é uma proteção básica; para múltiplas instâncias ou tráfego relevante, use rate limiting distribuído no provedor. Cabeçalhos defensivos estão em `next.config.ts`. Uma CSP rígida deve ser finalizada depois que domínios reais de analytics e HubSpot forem definidos.
