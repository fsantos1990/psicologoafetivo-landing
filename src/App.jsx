import React, { useEffect, useState } from 'react'

// --- URLs centrais (muda aqui se trocar caminhos / UTMs) ---
const ACT_INFO_URL  = "/info/act.html?utm_source=site&utm_medium=cta&utm_campaign=info-act";
const IBCT_INFO_URL = "/info/ibct.html?utm_source=site&utm_medium=cta&utm_campaign=info-ibct";
const POLICY_URL    = "/info/politica.html";

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

// --- 2. COMPONENTE PARA EXIBIÇÃO DE ARTIGOS ---
const ArticleDisplay = ({ article, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  useSeoMetadata(
    article.title,
    article.content[0].text,
    `ansiedade, autoestima, terapia ACT, ${article.slug}`,
    jsonLdSchemaArticle(article)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      <button
        onClick={onBack}
        className="text-[#235FAA] hover:underline flex items-center mb-10 text-sm font-medium"
      >
        &larr; Voltar para a Lista de Artigos
      </button>

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

// --- LISTA DO BLOG ---
const BlogHome = ({ articles, navigateToArticle, navigateToHome }) => {
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
            <button
              onClick={() => navigateToArticle(article.slug)}
              className="mt-4 inline-flex items-center text-sm font-medium text-[#235FAA] hover:underline"
            >
              Continuar lendo &rarr;
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center border-t border-white/10 pt-12">
        <h3 className="text-2xl font-semibold">Pronto para começar?</h3>
        <p className="mt-2 text-white/80 max-w-2xl mx-auto">
          Vá até a página da modalidade, leia como funciona e agende pelo botão no final.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <a href={ACT_INFO_URL + "&utm_content=blog-list-cta"} className="inline-flex justify-center rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110">ACT (Individual)</a>
          <a href={IBCT_INFO_URL + "&utm_content=blog-list-cta"} className="inline-flex justify-center rounded-xl border border-white/10 px-5 py-3 font-medium hover:brightness-110">IBCT (Casal)</a>
        </div>
        <button onClick={navigateToHome} className="mt-6 inline-flex justify-center rounded-xl px-5 py-3 font-medium hover:brightness-110 border border-white/10">
          Ir para a Página Inicial
        </button>
      </div>
    </div>
  );
}

// --- 1. SEO HELPER ---
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

// --- 4. SCHEMA MARKUP ---
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
  "description": "Artigos sobre Terapia de Casal, Ansiedade, Autoestima e ACT no formato online.",
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
  "description": article.content[0].text
});

// --- 3. CONTEÚDO DOS ARTIGOS ---
// --- NOVO ARTIGO (acolhedor para quem quer ajuda com “vício”/uso compulsivo de conteúdo adulto) ---
const articleData5 = {
  slug: 'conteudo-adulto-intimidade-terapia-online',
  title: 'Quando o “conteúdo adulto” vira fuga: como reconstruir a intimidade (e por onde começar)',
  author: 'Felipe Santos, Psicólogo Afetivo (CRP 03/15591)',
  date: 'Outubro de 2025',
  featuredImage: 'https://www.psicologoafetivo.com.br/intimidade-vicio.jpg',
  content: [
    {
      type: 'paragraph',
      text:
        'Se você está lendo isto porque sente que perdeu o controle sobre o consumo de <strong>conteúdo adulto</strong>, antes de qualquer coisa, <strong>bem-vindo</strong>. Aqui não tem moralismo nem julgamento. Tem acolhimento, clareza e um caminho possível. Meu trabalho é ajudar você a <strong>recuperar a presença</strong> na sua vida afetiva e a <strong>reconstruir a intimidade</strong> com quem você ama — e consigo mesmo.'
    },
    { type: 'heading', text: 'Você não é o problema — o padrão é que ficou maior do que você' },
    {
      type: 'paragraph',
      text:
        'Quando o hábito vira <em>saída rápida</em> para tédio, ansiedade, solidão ou estresse, ele começa a ocupar espaços que eram da sua vida: sono, energia, foco, desejo, conexão. Sem perceber, a atenção vai sendo “treinada” para roteiros de performance e comparação, enquanto a intimidade real — aquela de olhar, toque, carinho, tempo — fica para depois. Essa história é comum, e <strong>tem saída</strong>.'
    },
    { type: 'heading', text: 'Sinais de que está pesando (sem rótulos, com honestidade)' },
    {
      type: 'paragraph',
      text:
        '<ul>' +
        '<li>Você promete que vai reduzir, mas na hora H não consegue.</li>' +
        '<li>Começa “só um pouco” e vai além do que planejou.</li>' +
        '<li>Percebe queda de desejo/responsividade com o(a) parceiro(a).</li>' +
        '<li>Se sente culpado depois, e usa de novo para aliviar a culpa.</li>' +
        '<li>Está guardando segredo, evitando conversas ou se afastando.</li>' +
        '</ul>' +
        'Se você se reconhece em alguns desses pontos, vale buscar ajuda. <strong>Não é fraqueza</strong>. É um padrão bem reforçado, que a gente aprende a desmontar com método.'
    },
    { type: 'heading', text: 'Meu jeito de trabalhar (ACT/IBCT): processo, não culpa' },
    {
      type: 'paragraph',
      text:
        'Eu uso uma abordagem baseada em processos. Traduzindo: em vez de rotular você, nós mapeamos o <strong>funcionamento do padrão</strong> (o que mantém, o que dispara, o que custa) e treinamos competências para você <strong>escolher</strong> de novo — mesmo quando a urgência aparece. Em casal, fazemos acordos transparentes e restauramos o repertório de intimidade (respeito, ternura, jogo erótico responsivo).'
    },
    { type: 'heading', text: 'O plano em 4 passos (simples, direto e humano)' },
    {
      type: 'paragraph',
      text:
        '<strong>1) Tirar da moral e colocar na função.</strong> Pergunta central: “O que esse hábito está fazendo com a minha atenção, meu desejo e meu vínculo?”. Identificamos gatilhos (hora, humor, dispositivo) e custos reais (sono, foco, disponibilidade).'
    },
    {
      type: 'paragraph',
      text:
        '<strong>2) Contrato de valores.</strong> Definimos como você quer viver sua vida amorosa (3 valores práticos, ex.: presença, cuidado, curiosidade) e limites operacionais que <em>servem</em> a esses valores: dispositivos fora do quarto, horários de tela, regras de transparência.'
    },
    {
      type: 'paragraph',
      text:
        '<strong>3) Treino processual.</strong> Desfusão (“minha mente pede descarga, mas eu posso esperar 60s”), aceitação da urgência (sensação ≠ ação), atenção aplicada ao encontro (micropráticas de 2–5 minutos) e exposição guiada por valores (substituir <em>gatilho → alívio privado</em> por <em>micro-gesto de vínculo</em>).'
    },
    {
      type: 'paragraph',
      text:
        '<strong>4) Monitoramento gentil.</strong> Metas semanais pequenas, acompanhadas com honestidade e sem chicote. Se houver perda de controle com prejuízo, tratamos como compulsão: protocolo estruturado e, quando necessário, co-manejo com psiquiatria.'
    },
    { type: 'heading', text: 'Começar hoje: 3 exercícios simples' },
    {
      type: 'paragraph',
      text:
        '<strong>Roda de custo–benefício (5 min).</strong> O que eu ganho e perco com o hábito <em>hoje</em> e em <em>6 meses</em>? O que ganho e perco investindo na intimidade <em>hoje</em> e em <em>6 meses</em>? Escolha 1 ação mínima para esta semana.<br/><br/>' +
        '<strong>Plano se/então.</strong> Se surgir vontade + oportunidade, <em>então</em>: 60s de respiração; 1 mensagem de carinho; partir para o ritual acordado (banho juntos, massagem, conversa de desejo).<br/><br/>' +
        '<strong>Check-in 3×semana (10 min).</strong> 1) Como posso ser mais presente pra você? 2) O que estamos evitando conversar? 3) Qual micro-gesto de carinho/erotismo até sexta?'
    },
    { type: 'heading', text: 'Perguntas que eu escuto com frequência' },
    {
      type: 'paragraph',
      text:
        '<strong>“Isso me define?”</strong> Não. É um padrão comportamental — e padrões mudam com treino.<br/>' +
        '<strong>“Uso em conjunto resolve?”</strong> Transparência ajuda, mas não apaga roteiros já cristalizados. Se há comparação e queda de responsividade, a gente ajusta.<br/>' +
        '<strong>“Preciso acabar de vez?”</strong> A direção é <em>servir seus valores</em>. Às vezes, redução estruturada já devolve presença e vínculo; às vezes, é melhor abstinência. Decidimos juntos, caso a caso.'
    },
    { type: 'heading', text: 'Se você está cansado de prometer e não conseguir: eu posso te ajudar' },
    {
      type: 'paragraph',
      text:
        'Eu atendo <strong>online</strong>, com sigilo, método e respeito à sua história. A primeira sessão é um espaço seguro para entender sua realidade e traçar um plano. Não precisa chegar “perfeito”. Chegue como está — e a gente caminha daí.'
    },
    {
      type: 'paragraph',
      text:
        '<em>Valores:</em> Atendimento particular. Sessões de 50 minutos. Emissão de nota fiscal. Leia como funciona (ACT ou IBCT) e, no fim da página, use o botão de agendamento pelo WhatsApp. Quando você estiver pronto, eu estarei aqui.'
    }
  ]
};

// --- LISTA COMPLETA (novo artigo vai primeiro) ---
const articles = [articleData5, articleData4, articleData1, articleData2, articleData3];

export default function App() {
  const [currentPage, setCurrentPage] = useState('HOME');
  const [currentArticle, setCurrentArticle] = useState(null);

  const seoTitleHome = "Psicólogo Online Afetivo | Terapia de Casal e Individual (ACT/IBCT)";
  const seoDescriptionHome = "Felipe Santos, Psicólogo Afetivo (CRP 03/15591). Especialista em terapia de casal e individual online. Agende sua teleconsulta.";
  const seoKeywords = "psicólogo online, terapia de casal online, psicólogo afetivo, terapia para relacionamentos, Felipe Santos CRP 03/15591, terapia ACT online, IBCT, ansiedade, autoestima, amor consciente";

  const currentSchema = currentPage === 'HOME' ? jsonLdSchemaHome : (currentPage === 'BLOG_LIST' ? jsonLdSchemaBlogList : jsonLdSchemaArticle(currentArticle));
  const currentTitle = currentPage === 'ARTICLE' ? currentArticle.title : seoTitleHome;
  const currentDescription = currentPage === 'ARTICLE' ? currentArticle.content[0].text : seoDescriptionHome;

  useSeoMetadata(currentTitle, currentDescription, seoKeywords, currentSchema);

  // Navegação
  const navigateToHome = () => { setCurrentPage('HOME'); setCurrentArticle(null); window.scrollTo(0, 0); };
  const navigateToBlogList = () => { setCurrentPage('BLOG_LIST'); setCurrentArticle(null); window.scrollTo(0, 0); };
  const navigateToArticle = (slug) => {
    const article = articles.find(a => a.slug === slug);
    if (article) { setCurrentArticle(article); setCurrentPage('ARTICLE'); window.scrollTo(0, 0); }
  };
  const handleNavLinkClick = (e, targetPage) => {
    e.preventDefault();
    if (targetPage === 'HOME') navigateToHome();
    else if (targetPage === 'BLOG_LIST') navigateToBlogList();
  };

  const renderContent = () => {
    if (currentPage === 'HOME') {
      return (
        <>
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
                    Psicólogo Online para{' '}
                    <span className="text-[#235FAA]">Relacionamentos e Afetos</span>.
                  </h1>
                  <p className="mt-5 text-white/80 max-w-2xl">
                    Sou Felipe Santos (CRP 03/15591), psicólogo clínico e <strong>terapeuta de casais online</strong>. Trabalho com ACT e IBCT, em intervenções focadas em <strong>intimidade, compromisso e valores</strong>.
                  </p>

                  {/* CTAs: levam para ACT/IBCT (como funciona) */}
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

                {/* Imagem hero */}
                <div className="justify-self-center md:justify-self-end">
                  <img
                    src="/maj-hero.webp"
                    alt="Felipe Santos, psicólogo especialista em terapia de casal e individual online, com foco afetivo"
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
              Intervenções focadas em metas claras e valores pessoais, com plano de cuidado adaptado à sua realidade. Sem promessas — trabalho ético e colaborativo, <strong>100% online</strong>.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <ServiceCard
                number="01"
                title="Terapia Individual para Adultos Online"
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

          {/* CTA intermediário — leva para ACT/IBCT */}
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

          {/* FAQ */}
          <section id="faq" className="bg-white/5">
            <div className="mx-auto max-w-6xl px-4 py-16">
              <h2 className="text-2xl md:text-3xl font-semibold">Perguntas Frequentes sobre Terapia Online</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Faq q="Como funcionam as sessões online de psicoterapia?" a="Usamos plataforma segura (link enviado no agendamento). Duração média de 50 minutos. Você só precisa de um local com privacidade e boa conexão." />
                <Faq q="Você atende convênio ou emite recibo para reembolso?" a="Atendo particular e emito nota fiscal/recibo quando aplicável. Para valores, leia a página da modalidade e finalize pelo botão no fim da página." />
                <Faq q="A Terapia de Casal Online funciona para problemas de intimidade?" a="Sim. Trabalhamos com IBCT para mapear e transformar padrões de interação, reforçando compromisso e intimidade do casal." />
                <Faq q="Como marcar a primeira sessão?" a="Acesse a página da modalidade (ACT ou IBCT), leia como funciona e clique em Agendar no WhatsApp ao final." />
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
              <button onClick={navigateToBlogList} className="mt-4 inline-block text-[#235FAA] hover:underline font-medium text-lg">
                Ir para o Blog &rarr;
              </button>
            </div>
          </section>
        </>
      );
    } else if (currentPage === 'BLOG_LIST') {
      return <BlogHome articles={articles} navigateToArticle={navigateToArticle} navigateToHome={navigateToHome} />;
    } else if (currentPage === 'ARTICLE') {
      return <ArticleDisplay article={currentArticle} onBack={navigateToBlogList} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/50 bg-black/70 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={navigateToHome} className="flex items-center gap-3 p-2" aria-label="Felipe Santos — Psicólogo Afetivo Online">
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

          {/* NAV atualizado: manda para ACT/IBCT em vez de Whats direto */}
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#sobre" onClick={(e) => handleNavLinkClick(e, 'HOME')} className="hover:opacity-80">Sobre</a>
            <a href="#atendimento" onClick={(e) => handleNavLinkClick(e, 'HOME')} className="hover:opacity-80">Atendimento</a>
            <a href="#abordagem" onClick={(e) => handleNavLinkClick(e, 'HOME')} className="hover:opacity-80">Abordagem</a>
            <a href="#" onClick={navigateToBlogList} className={`hover:opacity-80 font-bold ${currentPage === 'BLOG_LIST' || currentPage === 'ARTICLE' ? 'text-[#235FAA]' : 'text-white'}`}>Blog</a>
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

      {renderContent()}

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/70">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div><strong>Felipe Santos</strong> — Psicólogo Clínico <strong>Online</strong> • CRP 03/15591</div>
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
