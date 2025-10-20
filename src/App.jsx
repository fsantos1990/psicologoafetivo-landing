import React, { useEffect, useState } from 'react'

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
    // Scrolla para o topo da página ao carregar o artigo
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [article]);

    // Otimização de SEO: Define o título da página para o título do artigo
    useSeoMetadata(article.title, article.content[0].text, `ansiedade, autoestima, terapia ACT, ${article.slug}`, jsonLdSchemaArticle(article));

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

            {/* Imagem de Destaque (Creative Commons) */}
            <div className="mt-8 mb-12">
                <img 
                    src={article.featuredImage}
                    alt={`Imagem de destaque para o artigo: ${article.title}`}
                    className="w-full h-auto rounded-xl object-cover ring-1 ring-white/10"
                    // Adiciona fallback para placeholder caso o arquivo não seja encontrado
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x450/1c3d5e/ffffff?text=Imagem+do+Artigo" }}
                />
                 <p className="text-xs text-white/50 mt-2">
                    {/* Remove a nota de placeholder, já que você forneceu a URL */}
                    Fonte: Imagem Creative Commons (URL: {article.featuredImage})
                 </p>
            </div>
            
            {/* Conteúdo do Artigo Formatado */}
            <div className="space-y-8 prose prose-invert prose-lg max-w-none text-white/90">
                {article.content.map((block, index) => {
                    if (block.type === 'paragraph') {
                        // CORREÇÃO: Usando dangerouslySetInnerHTML para renderizar o <strong>
                        return <p key={index} dangerouslySetInnerHTML={{ __html: block.text }} />;
                    }
                    if (block.type === 'heading') {
                        return <h2 key={index} className="text-2xl font-semibold mt-8 mb-4 text-[#235FAA]">{block.text}</h2>;
                    }
                    return null;
                })}
            </div>
            
            {/* CTA Final do Artigo */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
                 <h3 className="text-xl font-semibold">Este conteúdo foi útil? Agende sua sessão online.</h3>
                 <p className="mt-2 text-white/80">
                    O conhecimento é o primeiro passo. Clique abaixo para dar o segundo, agendando sua Terapia de Casal Online (IBCT) ou Terapia Individual.
                 </p>
                 <a
                    href="https://wa.me/5571987865549"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110 mt-4"
                 >
                    Falar no WhatsApp e Agendar
                 </a>
            </div>
        </div>
    );
};

// --- NOVO: COMPONENTE DE LISTAGEM DE BLOG (Blog Home) ---
const BlogHome = ({ articles, navigateToArticle, navigateToHome }) => {
    // Otimização de SEO: Título específico para a página de lista do blog
    useSeoMetadata(
      "Blog Psicólogo Afetivo Online | Artigos sobre Casais, Ansiedade e ACT",
      "Leia artigos de blog sobre terapia de casal online (IBCT), ansiedade, autoestima e a eficácia da Terapia de Aceitação e Compromisso (ACT) no formato virtual.",
      "blog psicólogo afetivo, artigos terapia casal, ansiedade online, terapia ACT",
      jsonLdSchemaBlogList
    );

    return (
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Psicólogo Afetivo Online</h1>
            <p className="text-white/70 text-lg max-w-3xl mb-12">Artigos sobre Terapia de Casal, Relacionamentos, ACT e bem-estar afetivo, focados no atendimento online.</p>

            {/* Lista de Artigos */}
            <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article) => (
                    <div key={article.slug} className="rounded-2xl border border-white/10 p-6 bg-white/5 transition duration-300 hover:border-[#235FAA]">
                        <p className="text-sm text-[#235FAA] font-medium">{article.date}</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white/95">{article.title}</h2>
                        <p className="mt-3 text-white/70 line-clamp-3">
                            {article.content[0].text} 
                            {/* Mostra um snippet do primeiro parágrafo */}
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

            {/* Fallback para a Home/CTA, como você solicitou */}
            <div className="mt-20 text-center border-t border-white/10 pt-12">
                <h3 className="text-2xl font-semibold">Pronto para a Terapia?</h3>
                <p className="mt-2 text-white/80 max-w-2xl mx-auto">
                    Se você não quer apenas ler, mas sim começar a transformar seu relacionamento ou vida individual, use o link abaixo para ir direto à nossa página de agendamento.
                </p>
                 <button onClick={navigateToHome} className="mt-4 inline-flex justify-center rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110">
                    Ir para a Página Inicial e Agendar
                 </button>
            </div>
        </div>
    );
}

// --- 1. FUNÇÃO DE INJEÇÃO DE METADADOS (SIMULAÇÃO DE HELMET) ---
const useSeoMetadata = (title, description, keywords, schema) => {
  useEffect(() => {
    // Definindo o Title
    document.title = title;

    // Injetando a Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Injetando Keywords (menos importante hoje, mas ainda útil)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Injetando Schema Markup (JSON-LD) para Rich Snippets
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

// --- 4. CONFIGURAÇÕES DE SCHEMA MARKUP (JSON-LD) ---

const jsonLdSchemaBase = {
    "@context": "https://schema.org",
    "@type": "Psychologist",
    "name": "Felipe Santos - Psicólogo Afetivo Online",
    "url": "https://www.psicologoafetivo.com.br", // Substitua pelo seu domínio real
    "image": "https://www.psicologoafetivo.com.br/maj-hero.webp",
    "sameAs": [
      "https://www.instagram.com/psicologoafetivo/", 
      "https://wa.me/5571987865549" 
    ],
    "hasCredential": {
        "@type": "MedicalSpecialty",
        "name": "Psicologia Clínica, CRP 03/15591"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    },
    "serviceType": ["Telepsicologia", "Terapia de Casal Online", "Terapia Individual Online"]
};

// Schema para a página principal (Home)
const jsonLdSchemaHome = {
    ...jsonLdSchemaBase,
    "description": "Felipe Santos, Psicólogo Afetivo (CRP 03/15591). Especialista em terapia de casal e individual online. Agende sua teleconsulta.",
};

// Schema para a lista de artigos (Blog Home)
const jsonLdSchemaBlogList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "mainEntityOfPage": "https://www.psicologoafetivo.com.br/blog", // URL do seu blog
    "name": "Blog Psicólogo Afetivo Online",
    "description": "Artigos sobre Terapia de Casal, Ansiedade, Autoestima e a eficácia da Terapia ACT e IBCT no formato online.",
    "publisher": jsonLdSchemaBase, // Referencia o psicólogo como publisher
};


// Schema dinâmico para cada artigo (usado no ArticleDisplay)
const jsonLdSchemaArticle = (article) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    // NOVO: Usa a imagem de destaque do artigo no Schema
    "image": article.featuredImage, 
    "datePublished": article.date,
    "dateModified": new Date().toISOString(),
    "author": {
        "@type": "Person",
        "name": article.author,
    },
    "publisher": jsonLdSchemaBase,
    "description": article.content[0].text,
});

// --- 3. CONTEÚDO DOS ARTIGOS (COM IMAGENS DE DESTAQUE) ---
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
        { type: 'paragraph', text: 'Neste formato online, trabalhamos juntos para identificar os valores do relacionamento e convertê-los em <strong>ações concretas</strong> que reforçam o vínculo. Se você e seu parceiro(a) buscam mais intimidade, compromisso e uma comunicação compassiva, a IBCT online é um caminho eficaz e afetivo.' },
    ],
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
        { type: 'paragraph', text: 'O objetivo não é eliminar a ansiedade, mas sim mudar o relacionamento que você tem com ela, permitindo que você retome o controle da sua direção de vida. Se você sente que a autocrítica e a ansiedade estão dominando suas escolhas, a ACT online é uma excelente ferramenta para encontrar mais coragem e sentido.' },
    ],
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
        { type: 'paragraph', text: 'Quando olhamos para esse espelho mágico com o apoio profissional, temos a chance de encarar a imagem que ele mostra com <strong>coragem</strong>. E é nessa coragem, cultivada na terapia, que mora a possibilidade real de transformação afetiva. A Terapia de Casal Online pode ser o espaço seguro para você aprender a se relacionar de um jeito novo, rompendo padrões de sofrimento.' },
    ],
};


// --- LISTA DE TODOS OS ARTIGOS (simulação de um CMS) ---
// CORREÇÃO: Certificando-se de que articleData3 está incluído
const articles = [articleData1, articleData2, articleData3]; 

export default function App() {
  const [currentPage, setCurrentPage] = useState('HOME');
  const [currentArticle, setCurrentArticle] = useState(null);

  // PALAVRAS-CHAVE FOCO: Psicólogo Online, Terapia de Casal, Relacionamentos, ACT
  const seoTitleHome = "Psicólogo Online Afetivo | Terapia de Casal e Individual (ACT/IBCT)";
  const seoDescriptionHome = "Felipe Santos, Psicólogo Afetivo (CRP 03/15591). Especialista em terapia de casal e individual online. Ajudo você a construir relacionamentos com sentido e decisões com coragem. Agende sua teleconsulta.";
  const seoKeywords = "psicólogo online, terapia de casal online, psicólogo afetivo, terapia para relacionamentos, Felipe Santos CRP 03/15591, terapia ACT online, IBCT, ansiedade, autoestima, amor consciente";

  // SEO para a página atual
  // Se estiver na Home, usa o Schema Home. Se estiver no Blog, usa o Schema BlogList.
  const currentSchema = currentPage === 'HOME' ? jsonLdSchemaHome : (currentPage === 'BLOG_LIST' ? jsonLdSchemaBlogList : jsonLdSchemaArticle(currentArticle));
  const currentTitle = currentPage === 'ARTICLE' ? currentArticle.title : seoTitleHome;
  const currentDescription = currentPage === 'ARTICLE' ? currentArticle.content[0].text : seoDescriptionHome;

  // Atualiza metadados dinamicamente
  useSeoMetadata(currentTitle, currentDescription, seoKeywords, currentSchema);
  
  // Funções de navegação
  const navigateToHome = () => {
      setCurrentPage('HOME');
      setCurrentArticle(null);
      window.scrollTo(0, 0);
  };

  const navigateToBlogList = () => {
      setCurrentPage('BLOG_LIST');
      setCurrentArticle(null);
      window.scrollTo(0, 0);
  };
  
  const navigateToArticle = (slug) => {
      const article = articles.find(a => a.slug === slug);
      if (article) {
          setCurrentArticle(article);
          setCurrentPage('ARTICLE');
          window.scrollTo(0, 0);
      }
  };

  // Funções auxiliares para navegação dentro do Menu
  const handleNavLinkClick = (e, targetPage) => {
    e.preventDefault();
    if (targetPage === 'HOME') {
        navigateToHome();
    } else if (targetPage === 'BLOG_LIST') {
        navigateToBlogList();
    } else if (currentPage === 'HOME') {
        // Se já está na Home, faz a rolagem normal para a seção
        window.location.href = e.currentTarget.href; 
    } else {
        // Se estiver fora da Home, volta para a Home antes de rolar
        navigateToHome();
        // Adiciona um pequeno delay para garantir que a navegação volte antes de rolar
        setTimeout(() => {
            window.location.href = e.currentTarget.href;
        }, 100);
    }
  };

  // Renderiza o conteúdo principal com base na página atual
  const renderContent = () => {
    if (currentPage === 'HOME') {
      return (
        <>
          {/* Hero */}
          <section id="home" className="relative overflow-hidden">
              {/* overlay visual sem capturar clique */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,#235FAA_0%,transparent_60%)]" />
              <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:py-28">
              <div className="grid gap-10 md:grid-cols-2 items-center">
                  {/* Texto */}
                  <div className="max-w-3xl">
                  {/* Otimização: Uso do H1 com a palavra-chave principal */}
                  <p className="text-xs tracking-widest uppercase text-white/70">
                      Psicoterapia para adultos e casais <strong>online</strong> (foco afetivo)
                  </p>
                  <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
                      Psicólogo Online para {' '}
                      <span className="text-[#235FAA]">Relacionamentos e Afetos</span>.
                  </h1>
                  {/* Otimização: Parágrafo introdutório reforçando especialidade e modalidade */}
                  <p className="mt-5 text-white/80 max-w-2xl">
                      Sou Felipe Santos (CRP 03/15591), psicólogo clínico e <strong>terapeuta de casais online</strong>. Trabalho com ACT (Terapia de Aceitação e Compromisso) e IBCT (Terapia Comportamental Integrativa de Casal), em intervenções focadas em <strong>intimidade, compromisso e valores</strong>.
                  </p>
                  <div className="mt-8">
                      <a
                      href="https://wa.me/5571987865549"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110"
                      >
                      Agendar Sessão Online pelo WhatsApp
                      </a>
                  </div>
                  <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-white/60">
                      {/* Otimização: Reforçar o "online" nas tags */}
                      <div className="rounded-xl border border-white/10 p-3 font-bold text-white">Atendimento 100% Online</div>
                      <div className="rounded-xl border border-white/10 p-3">Casais &amp; Adultos</div>
                      <div className="rounded-xl border border-white/10 p-3">ACT e IBCT</div>
                      <div className="rounded-xl border border-white/10 p-3">Confidencialidade (LGPD)</div>
                  </div>
                  </div>

                  {/* Foto principal (hero) - CAMINHO RESTAURADO */}
                  <div className="justify-self-center md:justify-self-end">
                  <img
                      src="/maj-hero.webp"
                      // Otimização: Alt text mais descritivo com a chave principal
                      alt="Felipe Santos, psicólogo especialista em terapia de casal e individual online, com foco afetivo"
                      className="w-full max-w-md rounded-2xl object-cover ring-1 ring-white/20 shadow-2xl"
                      loading="eager"
                      width="800"
                      height="500"
                      // fallback para placeholder caso a imagem real não carregue
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x500/235FAA/ffffff?text=Felipe+Santos+Psicologo" }}
                  />
                  </div>
              </div>
              </div>
          </section>

          {/* Social proof leve */}
          <section className="border-y border-white/10">
              <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Abordagens" text="ACT · IBCT · Processos" />
              <StatCard title="Foco" text="Compromisso · Intimidade · Compaixão" />
              {/* Otimização: Reforçar a modalidade na estatística */}
              <StatCard title="Formato" text="Teleconsulta segura e online" /> 
              </div>
          </section>

          {/* Atendimento */}
          <section id="atendimento" className="mx-auto max-w-6xl px-4 py-16">
              {/* Otimização: Usar H2 para SEO em títulos de seção */}
              <h2 className="text-2xl md:text-3xl font-semibold">Serviços de Terapia Online e Abordagens Afetivas</h2>
              <p className="mt-3 text-white/80 max-w-3xl">
              Intervenções focadas em metas claras e valores pessoais, com plano de cuidado adaptado à sua realidade. Sem promessas de resultado — trabalho ético e colaborativo, <strong>realizado 100% online</strong>.
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
              {/* Otimização: Inclusão de chaves nos títulos dos cards */}
              <ServiceCard
                  number="01"
                  title="Terapia Individual para Adultos Online" // Chave: Terapia Individual Online
                  items={[
                  'Ansiedade, regulação emocional, propósito e valores',
                  'Padrões relacionais: autocrítica, evitação, dependência',
                  'Construção de rotina e decisões alinhadas (Terapia ACT)',
                  ]}
              />
              <ServiceCard
                  number="02"
                  title="Terapia de Casal Online (Método IBCT)" // Chave: Terapia de Casal Online, IBCT
                  items={[
                  'Comunicação e reconciliação de diferenças (IBCT)',
                  'Mapeamento de padrões ("modo sobrevivência", banco emocional)',
                  'Reforço do compromisso, intimidade e compaixão',
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

          {/* CTA intermediário (WhatsApp) */}
          <section className="mx-auto max-w-6xl px-4 py-16">
              <div className="rounded-2xl border border-white/10 p-8 md:p-10 bg-gradient-to-br from-[#235FAA]/20 to-transparent">
              <h3 className="text-xl md:text-2xl font-semibold">Pronto para começar sua Terapia Online?</h3>
              <p className="mt-2 text-white/80">
                  Me chame no WhatsApp e envio horários disponíveis e próximos passos para agendar sua primeira sessão.
              </p>
              <div className="mt-6">
                  <a
                  href="https://wa.me/5571987865549"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110"
                  >
                  Falar no WhatsApp e Agendar
                  </a>
              </div>
              </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="bg-white/5">
              <div className="mx-auto max-w-6xl px-4 py-16">
              <h2 className="text-2xl md:text-3xl font-semibold">Perguntas Frequentes sobre Terapia Online</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {/* Otimização: Reforçar o "online" nas perguntas e respostas */}
                  <Faq q="Como funcionam as sessões online de psicoterapia?" a="Usamos plataforma segura (link enviado no agendamento). Duração média de 50 minutos. Você só precisa de um local com privacidade e boa conexão." />
                  <Faq q="Qual o valor da sessão online e você atende convênio?" a="Atendo particular. Posso emitir recibo para reembolso quando aplicável. Para valores, clique em 'Falar no WhatsApp' e peça a tabela de investimento." />
                  <Faq q="A Terapia de Casal Online funciona para problemas de intimidade?" a="Sim. O formato online é muito eficaz. Trabalhamos com o modelo IBCT para mapear e transformar padrões de interação, reforçando o compromisso e a intimidade do casal." />
                  <Faq q="Como marcar a primeira sessão?" a="Clique em 'Falar no WhatsApp' e combinamos os horários por lá. O pagamento é feito antes da sessão via Pix ou transferência." />
              </div>
              </div>
          </section>
          
          {/* Blog Link - Agora redireciona para a lista do Blog */}
          <section id="blog" className="mx-auto max-w-6xl px-4 py-16">
              <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-semibold">Conhecimento para Cultivar Afeto</h2>
                  <p className="mt-3 text-white/70 max-w-2xl mx-auto">
                      Leia nossos artigos e entenda como a Terapia ACT e IBCT podem transformar seu relacionamento e sua vida individual.
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
          {/* Otimização: Alt text mais específico no logo */}
          <a href="#" onClick={navigateToHome} className="flex items-center gap-3 p-2" aria-label="Felipe Santos — Psicólogo Afetivo Online">
            <img
              // CAMINHO RESTAURADO
              src="/logo.png"
              alt="Logotipo Felipe Santos Psicólogo Afetivo | Terapia Online"
              className="h-8 w-auto md:h-9"
              loading="eager"
              width="180"
              height="36"
              // fallback para placeholder caso a imagem real não carregue
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/180x36/235FAA/ffffff?text=LOGO" }}
            />
            <span className="sr-only">@psicologoafetivo</span>
          </a>

          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#sobre" onClick={(e) => handleNavLinkClick(e, 'HOME')} className="hover:opacity-80">Sobre</a>
            <a href="#atendimento" onClick={(e) => handleNavLinkClick(e, 'HOME')} className="hover:opacity-80">Atendimento</a>
            <a href="#abordagem" onClick={(e) => handleNavLinkClick(e, 'HOME')} className="hover:opacity-80">Abordagem</a>
            {/* NOVO: Link para a nova página BLOG_LIST */}
            <a href="#" onClick={navigateToBlogList} className={`hover:opacity-80 font-bold ${currentPage === 'BLOG_LIST' || currentPage === 'ARTICLE' ? 'text-[#235FAA]' : 'text-white'}`}>Blog</a> 
            <a href="#faq" onClick={(e) => handleNavLinkClick(e, 'HOME')} className="hover:opacity-80">Perguntas</a>
            <a
              href="https://wa.me/5571987865549"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              Agendar
            </a>
          </nav>

          <a
            href="https://wa.me/5571987865549"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-[#235FAA] px-4 py-2 text-sm font-medium hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#235FAA]"
          >
            Falar no WhatsApp
          </a>
        </div>
      </header>

      {renderContent()}

      {/* Footer (Sempre visível) */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/70">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div><strong>Felipe Santos</strong> — Psicólogo Clínico <strong>Online</strong> • CRP 03/15591</div>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80">Política de Privacidade</a>
              <a href="#" className="hover:opacity-80">Termos de Uso</a>
            </div>
          </div>
          <div className="mt-4">© {new Date().getFullYear()} Psicólogo Afetivo. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
