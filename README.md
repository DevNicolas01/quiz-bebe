# Sono Sereno — Quiz + Página de Oferta

Funil completo: quiz de 4 perguntas → diagnóstico personalizado → página de vendas.
React + TypeScript + Tailwind CSS + Vite.

## Como rodar

```bash
npm install
npm run dev
```

## Fluxo do app

1. **Quiz** (`src/components/QuizStep.tsx`) — 4 perguntas com barra de progresso e botão voltar
2. **Loading** (`src/components/DiagnosisLoading.tsx`) — simula processamento do diagnóstico (~2,5s)
3. **Resultado** (`src/components/Result.tsx`) — mostra resumo das respostas + CTA
4. **Oferta** (`src/components/Offer.tsx`) — página de vendas completa com timer, FAQ, garantia e CTA fixo no mobile

## Onde editar

- **Perguntas do quiz** → `src/data/quiz.ts`
- **Preço e checkout** → `src/components/Offer.tsx`, função `handleCheckout()` — troque a URL pela do seu checkout real (Hotmart, Kiwify, etc)
- **Depoimentos** → `src/components/Offer.tsx`, array `testimonials`
- **Perguntas frequentes** → `src/components/FAQ.tsx`, array `faqs`
- **Tempo do timer** → `src/components/Offer.tsx`, `useCountdown(15)` (em minutos)
- **Cores** → `tailwind.config.js`, paleta `lav`

## Publicar

1. Sobe no GitHub
2. Importa na Vercel ou Netlify
3. Build command: `npm run build` — Output: `dist`

## Importante antes de rodar anúncios

- Troque os depoimentos e números (ex: "milhares de mães") por dados reais ou remova
- Configure o link do checkout de verdade
- Adicione pixel do Facebook/Google Ads no `index.html` para rastrear conversões
