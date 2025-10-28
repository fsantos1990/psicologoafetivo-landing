import React, { useEffect, useState } from 'react'

// --- URLs centrais (muda aqui se trocar caminhos / UTMs) ---
const ACT_INFO_URL  = "/info/act.html?utm_source=site&utm_medium=cta&utm_campaign=info-act";
const IBCT_INFO_URL = "/info/ibct.html?utm_source=site&utm_medium=cta&utm_campaign=info-ibct";
const POLICY_URL    = "/info/politica.html";

// --- DEFINIÇÕES DOS COMPONENTES AUXILIARES ---

const StatCard = ({ title, text }) => (
  <div className="rounded-xl border border-white/10 p-4 text-center">
    <p className="text-2xl font-bold text-[#235FAA]">{title}</p>
    <p className="mt-1 text-white/70">{text}</p>
  </div>
);

const ServiceCard = ({ number, title, items }) => (
  <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
    <span className="text-sm font-semibold text-[#235FAA]">{number}</span>
    <h3 className="mt-2 text-xl font-semibold">{title}</h3>
    <ul className="mt-4 space-y-2 text-white/80 list-disc list-inside">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const ApproachCard = ({ title, text }) => (
  <div className="rounded-xl border border-white/10 p-5">
    <h3 className="text-lg font-semibold text-[#235FAA]">{title}</h3>
    <p className="mt-2 text-white/70">{text}</p>
  </div>
);

const Faq = ({ q, a }) => (
  <details className="group rounded-xl border border-white/10 p-4 transition-all duration-300">
    <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-white/90 group-open:text-[#235FAA]">
      {q}
      <svg className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div className="mt-3 text-white/70">
      <p>{a}</p>
    </div>
  </details>
);

// --- 2. COMPONENTE PARA EXIBIÇÃO DE ARTIGOS (inalterado) ---
const ArticleDisplay = ({ article, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  useSeoMetadata(
    article.title,
    article.content[0]?.text || '',
    `ansiedade, autoestima, terapia ACT, ${article.slug}`,
    jsonLdSchemaArticle(article)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      <a
        href="/blog/"
        className="text-[#235FAA] hover:underline flex items-center mb-10 text-sm font-medium"
      >
        &larr; Voltar para o Blog
      </a>

      <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
        {article.title}
      </h1>
      <p className="mt-4 text-white/70 text-lg">
        Por {article.author} | Publicado em {article.date}
      </p>

      {/* Imagem de Destaque */}
      <div className="mt-8 mb-12">
        <img
          src={article.featuredImage}
          alt={`Imagem de destaque para o artigo: ${article.title}`}
          className="w-full h-auto rounded-xl object-cover ring-1 ring-white/10"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x450/1c3d5e/ffffff?text=Imagem+do+Artigo"; }}
        />
        <p className="text-xs text-white/50 mt-2">
          Fonte: Imagem de uso livre (URL: {article.featuredImage})
        </p>
      </div>

      {/* Conteúdo do Artigo */}
      <div className="space-y-8 prose prose-invert prose-lg max-w-none text-white/90">
        {article.content.map((block, index) => {
          if (block.type === 'paragraph') {
            return <p key={index} dangerouslySetInnerHTML={{ __html: block.text }} />;
          }
          if (block.type === 'heading') {
            return <h2 key={index} className="text-2xl font-semibold mt-8 mb-4 text-[#235FAA]">{block.text}</h2>;
          }
          return null;
        })}
      </div>

      {/* CTA Final — leva para as páginas explicativas */}
      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <h3 className="text-xl font-semibold">Este conteúdo foi útil? Entenda como funciona e, se fizer sentido, agende.</h3>
        <p className="mt-2 text-white/80">
          Primeiro, leia os detalhes das modalidades. No fim da página há o botão para falar no WhatsApp.
        </p>

        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <a
            href={IBCT_INFO_URL + "&utm_content=blog-article-cta"}
            className="inline-flex justify-center rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110"
          >
            Terapia de Casal — IBCT (como funciona)
          </a>
          <a
            href={ACT_INFO_URL + "&utm_content=blog-article-cta"}
            className="inline-flex justify-center rounded-xl border border-white/10 px-5 py-3 font-medium hover:brightness-110"
          >
            Terapia Individual — ACT (como funciona)
          </a>
        </div>
      </div>
    </div>
  );
};

// --- LISTA DO BLOG (inalterado) ---
const BlogHome = ({ articles }) => {
  useSeoMetadata(
    "Blog Psicólogo Afetivo Online | Artigos sobre Casais, Ansiedade e ACT",
    "Leia artigos de blog sobre terapia de casal online (IBCT), ansiedade, autoestima e ACT.",
    "blog psicólogo afetivo, artigos terapia casal, ansiedade online, terapia ACT",
    jsonLdSchemaBlogList
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Psicólogo Afetivo Online</h1>
      <p className="text-white/70 text-lg max-w-3xl mb-12">Artigos sobre Terapia de Casal, Relacionamentos, ACT e bem-estar afetivo, focados no atendimento online.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <div key={article.slug} className="rounded-2xl border border-white/10 p-6 bg-white/5 transition duration-300 hover:border-[#235FAA]">
            <p className="text-sm text-[#235FAA] font-medium">{article.date}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white/95">{article.title}</h2>
            <p className="mt-3 text-white/70 line-clamp-3">
              {article.content[0].text}
            </p>
            <a
              href={`/blog/${article.slug}.html`}
              className="mt-4 inline-flex items-center text-sm font-medium text-[#235FAA] hover:underline"
            >
              Continuar lendo &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 1. SEO HELPER (inalterado) ---
const useSeoMetadata = (title, description, keywords, schema) => {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    let scriptSchema = document.getElementById('schema-json-ld');
    if (!scriptSchema) {
      scriptSchema = document.createElement('script');
      scriptSchema.setAttribute('type', 'application/ld+json');
      scriptSchema.setAttribute('id', 'schema-json-ld');
      document.head.appendChild(scriptSchema);
    }
    scriptSchema.textContent = JSON.stringify(schema, null, 2);
  }, [title, description, keywords, schema]);
};

// --- 4. SCHEMA MARKUP (inalterado) ---
const jsonLdSchemaBase = {
  "@context": "https://schema.org",
  "@type": "Psychologist",
  "name": "Felipe Santos - Psicólogo Afetivo Online",
  "url": "https://www.psicologoafetivo.com.br",
  "image": "https://www.psicologoafetivo.com.br/maj-hero.webp",
  "sameAs": [
    "https://www.instagram.com/psicologoafetivo/",
    "https://api.whatsapp.com/send?phone=5571987865549"
  ],
  "hasCredential": { "@type": "MedicalSpecialty", "name": "Psicologia Clínica, CRP 03/15591" },
  "areaServed": { "@type": "Country", "name": "Brasil" },
  "serviceType": ["Telepsicologia", "Terapia de Casal Online", "Terapia Individual Online"]
};

const jsonLdSchemaHome = {
  ...jsonLdSchemaBase,
  "description": "Felipe Santos, Psicólogo Afetivo (CRP 03/15591). Especialista em terapia de casal e individual online. Agende sua teleconsulta."
};

const jsonLdSchemaBlogList = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "mainEntityOfPage": "https://www.psicologoafetivo.com.br/blog",
  "name": "Blog Psicólogo Afetivo Online",
  "description": "Artigos sobre Terapia de Casal, Relacionamentos, ACT e bem-estar afetivo, focados no atendimento online.",
  "publisher": jsonLdSchemaBase
};

const jsonLdSchemaArticle = (article) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": article.title,
  "image": article.featuredImage,
  "datePublished": article.date,
  "dateModified": new Date().toISOString(),
  "author": { "@type": "Person", "name": article.author },
  "publisher": jsonLdSchemaBase,
  "description": article.content[0]?.text || ''
});

// --- 3. CONTEÚDO DOS ARTIGOS (inalterado) ---
const articleData1 = {
  slug: 'terapia-casal-online-ibct',
  title: 'Terapia de Casal Online: Por que a IBCT é a Abordagem mais Afetiva?',
  author: 'Felipe Santos, Psicólogo Afetivo (CRP 03/15591)',
  date: 'Outubro de 2025',
  featuredImage: '/terapia-de-casal.jpg',
  content: [
    { type: 'paragraph', text: 'Em um mundo cada vez mais conectado e, paradoxalmente, isolado, a terapia de casal online surgiu como uma ferramenta poderosa para nutrir relacionamentos. Muitas vezes, casais esperam anos até que os padrões de sofrimento estejam profundamente enraizados antes de procurar ajuda. Nosso objetivo, com a Terapia Comportamental Integrativa de Casal (IBCT), é intervir de forma <strong>colaborativa e afetiva</strong>, focando em aceitação e mudança.' },
    { type: 'heading', text: 'O Que É a IBCT? Aceitação Antes da Mudança' },
    { type: 'paragraph', text: 'A IBCT (Integrative Behavioral Couple Therapy) reconhece que conflitos são inevitáveis. Diferente de abordagens que focam apenas em técnicas de comunicação, a IBCT integra a promoção da aceitação mútua e a construção de um "banco emocional" positivo. Primeiro, ajudamos o casal a entender o padrão de sofrimento (onde as diferenças viram briga). Depois, criamos a base para uma mudança significativa, que é mais fácil de ocorrer a partir de um lugar de aceitação e compaixão.' },
    { type: 'heading', text: 'A Vantagem do Formato Online para Casais' },
    { type: 'paragraph', text: 'A teleconsulta oferece privacidade e conforto incomparáveis. O casal pode estar em seu ambiente seguro, o que muitas vezes reduz a ansiedade e permite uma abertura emocional mais rápida. A flexibilidade de horário também elimina a logística de deslocamento, facilitando a manutenção da regularidade das sessões, crucial para o sucesso da terapia de casal. O sigilo é garantido, respeitando a LGPD.' },
    { type: 'paragraph', text: 'Neste formato online, trabalhamos juntos para identificar os valores do relacionamento e convertê-los em <strong>ações concretas</strong> que reforçam o vínculo. Se você e seu parceiro(a) buscam mais intimidade, compromisso e uma comunicação compassiva, a IBCT online é um caminho eficaz e afetivo.' }
  ]
};

const articleData2 = {
  slug: 'ansiedade-autoestima-terapia-act',
  title: 'Ansiedade e Autoestima: Como a Terapia ACT Online Ajuda a Viver com o que Importa',
  author: 'Felipe Santos, Psicólogo Afetivo (CRP 03/15591)',
  date: 'Outubro de 2025',
  featuredImage: '/ansiedade.jpg',
  content: [
    { type: 'paragraph', text: 'A ansiedade e a baixa autoestima andam lado a lado, muitas vezes nos paralisando e nos impedindo de viver de acordo com nossos <strong>valores mais profundos</strong>. A Terapia de Aceitação e Compromisso (ACT) oferece um caminho diferente: em vez de lutar contra os pensamentos e sentimentos desconfortáveis, aprendemos a aceitá-los e, mesmo assim, agir em direção ao que realmente importa em nossa vida afetiva e profissional.' },
    { type: 'heading', text: 'O Loop da Ansiedade e da Autoestima' },
    { type: 'paragraph', text: 'Quando a autoestima está baixa, a mente costuma disparar pensamentos autocríticos ("Eu não sou bom o suficiente", "Vou falhar"). A reação natural é tentar controlar ou evitar esses sentimentos (a famosa esquiva experiencial), o que, ironicamente, aumenta a ansiedade e o ciclo de sofrimento. A ACT nos convida a notar esses pensamentos sem nos fundirmos a eles (defusão cognitiva).' },
    { type: 'heading', text: 'Compromisso com Seus Valores Afetivos Online' },
    { type: 'paragraph', text: 'A terapia ACT online foca em identificar seus valores (ex: ser um parceiro amoroso, ser um profissional dedicado). Em seguida, trabalhamos para criar <strong>ações comprometidas</strong>, que são passos pequenos e concretos em direção a esses valores, mesmo que a ansiedade esteja presente. A sessão online, realizada no seu ambiente, é um espaço seguro e flexível para praticar a atenção plena (mindfulness) e desenvolver a flexibilidade psicológica.' },
    { type: 'paragraph', text: 'O objetivo não é eliminar a ansiedade, mas sim mudar o relacionamento que você tem com ela, permitindo que você retome o controle da sua direção de vida. Se você sente que a autocrítica e a ansiedade estão dominando suas escolhas, a ACT online é uma excelente ferramenta para encontrar mais coragem e sentido.' }
  ]
};

const articleData3 = {
  slug: 'relacionamentos-espelhos-amor-consciente',
  title: 'Relacionamentos são Espelhos: Use os Conflitos para Construir um Amor Consciente e Afetivo Online',
  author: 'Felipe Santos, Psicólogo Afetivo (CRP 03/15591)',
  date: 'Outubro de 2025',
  featuredImage: '/casal-espelho.jpg',
  content: [
    { type: 'paragraph', text: 'Relacionamentos são, de fato, como espelhos. Não aqueles que apenas refletem a aparência, mas os que revelam, com clareza brutal, o que está escondido em nosso interior. É fácil parecer equilibrado quando estamos sozinhos, mas é na convivência diária com o outro que nossas feridas mais antigas se manifestam: a pressa em julgar, a defensividade, o medo paralisante de ser rejeitado, a dificuldade de confiar e a falta de regulação emocional.' },
    { type: 'heading', text: 'O Convite da Fragilidade: Por que Nossos Defeitos Aparecem no Relacionamento' },
    { type: 'paragraph', text: 'É crucial entender que esses sinais não significam fracasso no relacionamento, mas sim <strong>convites</strong> para o autoconhecimento e o amadurecimento. Quando seu parceiro(a) aciona uma dor sua, ele está apontando, sem querer, para aquilo que ainda precisa de cuidado dentro de você. Encarar essa fragilidade com compaixão e sem autocrítica é o primeiro passo para o crescimento individual e a saúde do casal.' },
    { type: 'heading', text: 'De Conflito para Crescimento: A Abordagem Afetiva' },
    { type: 'paragraph', text: 'Um relacionamento saudável não é definido pela ausência de conflitos, mas sim pela capacidade de transformar esses conflitos em oportunidades de aprendizado e intimidade. É no calor da discussão que aprendemos a regular emoções intensas, a colocar limites com clareza e sem perder a ternura, e a sermos resilientes diante das diferenças. Isso é o que chamamos de <strong>Amor Consciente</strong>.' },
    { type: 'paragraph', text: 'Quando olhamos para esse espelho mágico com o apoio profissional, temos a chance de encarar a imagem que ele mostra com <strong>coragem</strong>. E é nessa coragem, cultivada na terapia, que mora a possibilidade real de transformação afetiva. A Terapia de Casal Online pode ser o espaço seguro para você aprender a se relacionar de um jeito novo, rompendo padrões de sofrimento.' }
  ]
};

const articleData4 = {
  slug: 'nem-tudo-que-te-incomoda-no-parceiro',
  title: 'Nem tudo que te incomoda no seu parceiro é um problema a ser resolvido',
  author: 'Felipe Santos, Psicólogo Afetivo (CRP 03/15591)',
  date: 'Outubro de 2025',
  featuredImage: '/diferencas-parceiros.jpg',
  content: [
    { type: 'paragraph', text: 'Se você tem intimidade com o(a) seu parceiro(a), é bem provável que você conheça muitas coisas sobre ele(a) que você gostaria que fossem diferentes. Pode ser uma soma de algumas coisas "bem chatinhas", ou "aquilo" que você considera insuportável, e que você gostaria muito que fosse diferente. Você consegue identificar o que é?' },
    { type: 'paragraph', text: 'Pode ser uma forma de falar. Pode ser o modo dela(e) lidar com o mundo quando está estressada(o), ou simplesmente o modo como ele lida com os problemas quando eles ocorrem: Ele levanta de imediato para tentar resolver, "de qualquer jeito"? Ela para pra pensar "demais" antes de agir? É um hobby? O que é? Pense um pouco a respeito.' },
    { type: 'paragraph', text: 'Nesse momento, eu te convido para olhar para o seu parceiro e observar tudo o que sua mente te diz sobre esse comportamento, essa ação, esse modo de lidar, essa coisa que você acha ser insuportável. Apenas observe. Pegue um caderninho e comece a anotar todas as vezes que esse pensamento surge. E apenas observe. Só isso!' },
    { type: 'paragraph', text: 'Quando você tiver isso em mente, você talvez consiga perceber o quanto que esse incômodo pode vir justamente porque você está "num polo oposto". E o quanto que você tem buscado formas de trazer o seu parceiro ou parceira para ser mais parecido com você nesse aspecto. E talvez sua mente esteja te dizendo que a relação ficará melhor QUANDO isso acontecer.' },
    { type: 'paragraph', text: 'Mas é pouco provável que isso aconteça. Tem duas verdades escondidas aí dentro de você: 1) você se interessou por seu(a) parceiro(a) porque ele age de algumas formas diferente de você, de modo complementar e 2) talvez o seu modo de lidar também seja incômodo pelo seu parceiro. Você gostaria de abrir mão do seu jeito de ser para ser mais parecido com o seu parceiro?' },
    { type: 'paragraph', text: 'Um relacionamento sólido é aquele no qual as diferenças se complementam. Gentilmente, aprenda a apreciar aquilo que o seu parceiro tem e que você não tem, e vice-versa. Nem sempre vai funcionar... E tá tudo bem. Gentilmente, traga sua atenção de volta ao que te mantém nessa relação.' }
  ]
};

// --- LISTA COMPLETA (este array pode alimentar uma seção de "Últimos do Blog" com links estáticos) ---
const articles = [articleData1, articleData2, articleData3, articleData4];

export default function App() {
  const [currentPage] = useState('HOME'); // SPA não controla mais /blog

  useSeoMetadata(
    // OTIMIZAÇÃO CRÍTICA: Título com autoridade (Mestre) e as duas abordagens
    "Felipe Santos (Mestre e CRP 03/15591) - Terapia de Casal (IBCT) e Individual (ACT) Online",
    
    // OTIMIZAÇÃO CRÍTICA: Descrição mais específica (Mestre, padrões, flexibilidade)
    "Felipe Santos, Mestre e Psicólogo (CRP 03/15591). Especialista em ACT e IBCT para casais e adultos. Foco em padrões, valores e flexibilidade psicológica.",
    
    "psicólogo online, terapia de casal online, psicólogo afetivo, terapia para relacionamentos, Felipe Santos CRP 03/15591, terapia ACT online, IBCT, ansiedade, autoestima, amor consciente, Mestre",
    jsonLdSchemaHome
  );

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/50 bg-black/70 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 p-2" aria-label="Felipe Santos — Psicólogo Afetivo Online">
            <img
              src="/logo.png"
              alt="Logotipo Felipe Santos Psicólogo Afetivo | Terapia Online"
              className="h-8 w-auto md:h-9"
              loading="eager"
              width="180"
              height="36"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/180x36/235FAA/ffffff?text=LOGO"; }}
            />
            <span className="sr-only">@psicologoafetivo</span>
          </a>

          {/* NAV: linka diretamente para o blog estático */}
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#sobre" onClick={(e) => handleNavLinkClick(e, 'home')} className="hover:opacity-80">Sobre</a>
            <a href="#atendimento" onClick={(e) => handleNavLinkClick(e, 'atendimento')} className="hover:opacity-80">Atendimento</a>
            <a href="#abordagem" onClick={(e) => handleNavLinkClick(e, 'abordagem')} className="hover:opacity-80">Abordagem</a>
            <a href="/blog/" className="hover:opacity-80 font-bold">Blog</a>
            <a href={ACT_INFO_URL + "&utm_content=nav-act"} className="hover:opacity-80">ACT (Individual)</a>
            <a href={IBCT_INFO_URL + "&utm_content=nav-ibct"} className="hover:opacity-80">IBCT (Casal)</a>
          </nav>

          {/* Botão destacado → página explicativa (ACT) */}
          <a
            href={ACT_INFO_URL + "&utm_content=nav-cta"}
            className="inline-flex items-center rounded-xl bg-[#235FAA] px-4 py-2 text-sm font-medium hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#235FAA]"
          >
            Como Funciona
          </a>
        </div>
      </header>

      {/* Conteúdo principal da Home */}
      <main>
        {/* Hero */}
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,#235FAA_0%,transparent_60%)]" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:py-28">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              {/* Texto */}
              <div className="max-w-3xl">
                <p className="text-xs tracking-widest uppercase text-white/70">
                  Psicoterapia para adultos e casais <strong>online</strong> (foco afetivo)
                </p>
                
                                <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
                  Terapia com <span className="text-[#235FAA]">Psicólogo Online:</span> Casal (IBCT) e Individual (ACT) Focado em Afeto.
                </h1>
                <p className="mt-5 text-white/80 max-w-2xl">
                  Sou **Felipe Melo Souza Santos** (CRP 03/15591), Mestre e **terapeuta de casais online**. Trabalho com ACT e IBCT, em intervenções focadas em **intimidade, compromisso e valores**.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={ACT_INFO_URL + "&utm_content=home-hero"}
                    className="inline-flex items-center justify-center rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110"
                  >
                    Terapia Individual — ACT (como funciona)
                  </a>
                  <a
                    href={IBCT_INFO_URL + "&utm_content=home-hero"}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 font-medium hover:brightness-110"
                  >
                    Terapia de Casal — IBCT (como funciona)
                  </a>
                </div>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-white/60">
                  <div className="rounded-xl border border-white/10 p-3 font-bold text-white">Atendimento 100% Online</div>
                  <div className="rounded-xl border border-white/10 p-3">Casais &amp; Adultos</div>
                  <div className="rounded-xl border border-white/10 p-3">ACT e IBCT</div>
                  <div className="rounded-xl border border-white/10 p-3">Confidencialidade (LGPD)</div>
                </div>
              </div>

              {/* Imagem */}
              <div className="justify-self-center md:justify-self-end">
                <img
                  src="/maj-hero.webp"
                  alt="Felipe Melo Souza Santos, psicólogo especialista em terapia de casal e individual online, com foco afetivo"
                  className="w-full max-w-md rounded-2xl object-cover ring-1 ring-white/20 shadow-2xl"
                  loading="eager"
                  width="800"
                  height="500"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x500/235FAA/ffffff?text=Felipe+Santos+Psicologo"; }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="border-y border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Abordagens" text="ACT · IBCT · Processos" />
            <StatCard title="Foco" text="Compromisso · Intimidade · Compaixão" />
            <StatCard title="Formato" text="Teleconsulta segura e online" />
          </div>
        </section>

        {/* Atendimento */}
        <section id="atendimento" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Serviços de Terapia Online e Abordagens Afetivas</h2>
          <p className="mt-3 text-white/80 max-w-3xl">
            Intervenções focadas em metas claras e valores pessoais, com plano de cuidado adaptado à sua realidade. Sem promessas — trabalho ético e colaborativo, **100% online**.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <ServiceCard
              number="01"
              title="Terapia Individual para Adultos Online (ACT)"
              items={[
                'Ansiedade, regulação emocional, propósito e valores',
                'Padrões relacionais: autocrítica, evitação, dependência',
                'Construção de rotina e decisões alinhadas (Terapia ACT)'
              ]}
            />
            <ServiceCard
              number="02"
              title="Terapia de Casal Online (Método IBCT)"
              items={[
                'Comunicação e reconciliação de diferenças (IBCT)',
                'Mapeamento de padrões ("modo sobrevivência", banco emocional)',
                'Reforço do compromisso, intimidade e compaixão'
              ]}
            />
          </div>
        </section>

        {/* Abordagem */}
        <section id="abordagem" className="bg-white/5">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-semibold">Minha Abordagem (ACT e IBCT)</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <ApproachCard
                title="Processos, não rótulos"
                text="Olho para padrões que mantêm sofrimento e afastam você do que importa (flexibilidade psicológica)."
              />
              <ApproachCard
                title="Valores na prática (Terapia ACT)"
                text="Convertendo clareza de valores em pequenas ações viáveis no dia a dia, para uma vida mais plena."
              />
              <ApproachCard
                title="Cuidado ético e digital"
                text="Sem promessas, sem sensacionalismo. Confidencialidade, respeito à sua história e segurança na teleconsulta."
              />
            </div>
          </div>
        </section>

        {/* CTA intermediário */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-2xl border border-white/10 p-8 md:p-10 bg-gradient-to-br from-[#235FAA]/20 to-transparent">
            <h3 className="text-xl md:text-2xl font-semibold">Comece pelo começo: entenda como funciona</h3>
            <p className="mt-2 text-white/80">
              Leia a modalidade e, no final da página, clique em Agendar no WhatsApp (com a confirmação de leitura da Política).
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={ACT_INFO_URL + "&utm_content=home-cta"} className="inline-flex justify-center rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110">
                ACT — Terapia Individual (como funciona)
              </a>
              <a href={IBCT_INFO_URL + "&utm_content=home-cta"} className="inline-flex justify-center rounded-xl border border-white/10 px-5 py-3 font-medium hover:brightness-110">
                IBCT — Terapia de Casal (como funciona)
              </a>
            </div>
          </div>
        </section>

        {/* Blog Link */}
        <section id="blog" className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">Conhecimento para Cultivar Afeto</h2>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">
              Leia os artigos e entenda como ACT e IBCT ajudam na vida real.
            </p>
            <a href="/blog/" className="mt-4 inline-block text-[#235FAA] hover:underline font-medium text-lg">
              Ir para o Blog &rarr;
            </a>
          </div>
        </section>

        {/* (Opcional) Cards de últimos posts dentro da Home com links estáticos (inalterado) */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <div key={article.slug} className="rounded-2xl border border-white/10 p-6 bg-white/5 transition duration-300 hover:border-[#235FAA]">
                <p className="text-sm text-[#235FAA] font-medium">{article.date}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white/95">{article.title}</h3>
                <p className="mt-3 text-white/70 line-clamp-3">{article.content[0].text}</p>
                <a href={`/blog/${article.slug}.html`} className="mt-4 inline-flex items-center text-sm font-medium text-[#235FAA] hover:underline">
                  Continuar lendo &rarr;
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/70">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
              <strong>Felipe Melo Souza Santos</strong> — Psicólogo Clínico <strong>Online</strong> • Mestre • CRP 03/15591.
            </div>
            <div className="flex gap-4">
              <a href={POLICY_URL} className="hover:opacity-80">Política de Agendamento</a>
              <a href="#" className="hover:opacity-80" onClick={(e)=>{e.preventDefault(); alert('Termos de Uso: em breve.');}}>Termos de Uso</a>
            </div>
          </div>
          <div className="mt-4">© {new Date().getFullYear()} Psicólogo Afetivo. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
