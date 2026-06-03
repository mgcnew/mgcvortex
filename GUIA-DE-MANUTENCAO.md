# 🛠️ Guia de Manutenção — Site MGC Vortex

Documento prático para editar o site **sem ser programador**. Cada seção diz
**o que mexer** e **em qual arquivo**.

> 💡 Depois de qualquer alteração, salve o arquivo e o site atualiza sozinho
> (se o servidor de desenvolvimento estiver rodando). Veja "Como rodar" no fim.

---

## 📁 Estrutura do projeto (o que importa)

```
mgctech/
├─ app/
│  ├─ layout.tsx          → título da aba, descrição (SEO), fontes
│  ├─ page.tsx            → ordem das seções da página principal
│  ├─ globals.css         → CORES do site (tema claro/escuro) e animações
│  └─ demos/              → os 3 projetos "ao vivo" do portfólio
│     ├─ layout.tsx       → barra "Voltar ao site / Demo · MGC Vortex"
│     ├─ dashboard/       → demo do Dashboard "Órbita"
│     ├─ loja/            → demo da Loja (e-commerce)
│     └─ crm/             → demo do CRM
├─ components/
│  ├─ Navbar.tsx          → menu do topo + logo
│  ├─ Hero.tsx            → primeira dobra (título, frase, cards bento)
│  ├─ Services.tsx        → seção "Serviços"
│  ├─ Portfolio.tsx       → cards dos projetos
│  ├─ Stats.tsx           → faixa verde com números
│  ├─ Contact.tsx         → formulário + WhatsApp + contatos
│  ├─ Footer.tsx          → rodapé (links, redes sociais, contatos)
│  ├─ Logo.tsx            → componente que troca o logo entre claro/escuro
│  └─ portfolio-mockups.tsx → telas-conceito (não usadas hoje, reserva)
├─ public/                → imagens estáticas (LOGO fica aqui)
│  ├─ logo-dark.png       → logo de texto CLARO  (modo escuro 🌙)
│  └─ logo-light.png      → logo de texto ESCURO (modo claro ☀️)
└─ scripts/               → utilitários (recorte/otimização de logo)
```

---

## ✏️ Como alterar cada coisa

### 1. Nome da empresa
Está como **"MGC Vortex"**. Para trocar, procure por `MGC Vortex` nestes arquivos:
`Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `Contact.tsx`, `app/layout.tsx`,
`app/demos/layout.tsx`, `Portfolio.tsx`.

### 2. Telefone / WhatsApp / E-mail
Arquivo: **`components/Contact.tsx`**
- **Telefone exibido:** procure `(11) 93084-1390`
- **E-mail:** procure `contato@mgcvortex.com.br`
- **WhatsApp:** procure `wa.me/5511930841390`
  (formato: `55` + DDD + número, tudo junto, sem espaços/símbolos)

O mesmo telefone/e-mail também aparece no **`components/Footer.tsx`** (lista "Contato").

### 3. Logo
Arquivos na pasta **`public/`**:
- `logo-dark.png` → versão de **texto claro** (aparece no modo escuro)
- `logo-light.png` → versão de **texto escuro** (aparece no modo claro)

Para trocar o logo: substitua os arquivos **mantendo exatamente esses nomes**.
- Use **fundo transparente** (PNG ou SVG).
- Se o novo logo tiver muita margem em volta, rode o otimizador (veja "Scripts").
- Tamanho de exibição: ajuste a classe `h-...` em `Navbar.tsx` (`<Logo className="h-9 sm:h-11 ...">`) e em `Footer.tsx` (`<Logo className="h-12 ...">`).

### 4. Cores do site (tema)
Arquivo: **`app/globals.css`**
- Bloco `:root { ... }` → cores do **modo claro** (creme/preto)
- Bloco `.dark { ... }` → cores do **modo escuro** (quase-preto)
- A cor de destaque (verde lime) é a `--accent-lime` em cada bloco.
  Os botões/destaques usam classes `lime-300` / `lime-400` — para trocar o tom
  da marca, faça um "localizar e substituir" de `lime-300` e `lime-400`.

### 5. Serviços (cards)
Arquivo: **`components/Services.tsx`** — edite a lista `services` no topo:
```ts
{ icon: Globe, title: "Desenvolvimento Web", description: "...", span: "" }
```
- `title` e `description`: textos do card.
- `icon`: ícone (nomes em https://lucide.dev — importe no topo do arquivo).
- `span: "sm:col-span-2"` deixa o card maior (destaque).

### 6. Portfólio (projetos)
Arquivo: **`components/Portfolio.tsx`** — edite a lista `projects`:
```ts
{ title: "Dashboard Analytics", type: "Sistema Web",
  tags: ["Next.js", "TypeScript", "Charts"], mock: "dashboard", href: "/demos/dashboard" }
```
- `title`/`type`/`tags`: textos do card.
- `href`: link do botão "Ver projeto" (deixe de fora para virar card sem link).
- `mock`: qual mini-tela aparece no card (opções em `portfolio-mockups.tsx`:
  `dashboard`, `ecommerce`, `crm`, `delivery`, `realestate`, `finance`).

> Para adicionar os **apps reais** futuros: crie uma pasta nova em `app/demos/`
> (ex.: `app/demos/meuapp/page.tsx`) e adicione um item em `projects` com
> `href: "/demos/meuapp"`.

### 7. Números da faixa verde (Stats)
Arquivo: **`components/Stats.tsx`** — lista `stats`:
```ts
{ value: 50, suffix: "+", label: "Projetos entregues" }
```

### 8. Textos do Hero (primeira dobra)
Arquivo: **`components/Hero.tsx`**
- Título grande: variável `words` / o `<h1>` ("Seu negócio rodando em algo que vende.")
- Frase de apoio: o parágrafo logo abaixo.
- Cards bento (código, gráfico, +50, 99%): no mesmo arquivo, fáceis de achar pelo texto.

### 9. Rodapé (links e redes sociais)
Arquivo: **`components/Footer.tsx`**
- `socials`: links das redes (GitHub, Instagram, LinkedIn, X).
- `footerLinks`: as colunas de links.

---

## 🎨 As 3 demos do portfólio

Cada uma é uma página real em `app/demos/`:
- **dashboard** → `app/demos/dashboard/page.tsx` (dados no topo, em `DATA`)
- **loja** → `app/demos/loja/page.tsx` (produtos na lista `products`)
- **crm** → `app/demos/crm/page.tsx` (leads na lista `initial`)

São dados de demonstração (mock), sem banco de dados. Para mudar os números/itens,
edite essas listas no topo de cada arquivo.

---

## ▶️ Como rodar o site no seu PC

Abra o terminal **dentro da pasta do projeto** (`C:\dev\mgctech`) e use:

| O que quer fazer | Comando |
|------------------|---------|
| Rodar em modo desenvolvimento (ver no navegador) | `npm run dev` → abre em http://localhost:3000 |
| Verificar se está tudo certo (build de produção) | `npm run build` |
| Instalar dependências (1ª vez ou após baixar o projeto) | `npm install` |

Enquanto `npm run dev` está rodando, qualquer alteração salva aparece na hora no navegador.

---

## 🚀 Publicar o site na internet (deploy)

A forma mais simples e **gratuita** é pela **Vercel** (feita pelos criadores do Next.js):
1. Suba o projeto para um repositório no GitHub.
2. Entre em https://vercel.com com a conta do GitHub.
3. Clique em **Import Project** e selecione o repositório.
4. A Vercel detecta Next.js sozinha — é só clicar em **Deploy**.
5. Pronto: você recebe um link público (e pode ligar seu domínio depois).

As 3 demos (`/demos/...`) sobem junto automaticamente.

---

## 🧰 Scripts utilitários

Pasta `scripts/`:
- **`trim_logo.py`** — recorta o espaço vazio em volta do logo e otimiza o tamanho.
  Uso (precisa de Python + Pillow → `pip install Pillow`):
  ```
  python scripts/trim_logo.py
  ```
  (ele lê `public/logo-*.orig.png` — coloque o original com esse nome antes de rodar)
- **`inspect_logo.py`** — mostra dimensões/transparência de uma imagem (diagnóstico).

---

## 📌 Pendências / observações

- **Logo:** conferir se a tagline está escrita **"WEB"** (já houve uma versão com "WED").
- **Domínio/e-mail:** `mgcvortex.com.br` está como exemplo — ajuste quando o domínio real estiver definido.
- **Redes sociais:** os links no rodapé usam `@mgcvortex` como exemplo.
- **Formulário de contato:** hoje ele apenas simula o envio (mostra "Mensagem enviada").
  Para receber os e-mails de verdade, é preciso integrar um serviço de envio
  (ex.: Formspree, Resend, ou um endpoint próprio) — me avise quando quiser fazer isso.

---

*Documento gerado para facilitar a manutenção do site MGC Vortex.*
*Stack: Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion.*
