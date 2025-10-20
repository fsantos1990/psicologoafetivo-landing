import React, { useEffect } from 'react'

// --- DEFINIÇÕES DOS COMPONENTES AUXILIARES (Integrados para corrigir o erro) ---

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

export default function App() {
  // PALAVRAS-CHAVE FOCO: Psicólogo Online, Terapia de Casal, Relacionamentos, ACT
  const seoTitle = "Psicólogo Online Afetivo | Terapia de Casal e Individual (ACT/IBCT)";
  const seoDescription = "Felipe Santos, Psicólogo Afetivo (CRP 03/15591). Especialista em terapia de casal e individual online. Ajudo você a construir relacionamentos com sentido e decisões com coragem. Agende sua teleconsulta.";
  const seoKeywords = "psicólogo online, terapia de casal online, psicólogo afetivo, terapia para relacionamentos, Felipe Santos CRP 03/15591, terapia ACT online, IBCT";

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Psychologist",
    "name": "Felipe Santos - Psicólogo Afetivo",
    "description": "Psicólogo Clínico e Terapeuta de Casais. Atendimento especializado em Terapia de Aceitação e Compromisso (ACT) e Terapia Comportamental Integrativa de Casal (IBCT) em formato online.",
    "url": "https://www.psicologoafetivo.com.br", // Substitua pelo seu domínio real
    "image": "https://www.psicologoafetivo.com.br/maj-hero.webp",
    "sameAs": [
      "https://www.instagram.com/psicologoafetivo/", // Mantenha, pois é importante para social proof
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

  useSeoMetadata(seoTitle, seoDescription, seoKeywords, jsonLdSchema);
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/50 bg-black/70 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Otimização: Alt text mais específico no logo */}
          <a href="#home" className="flex items-center gap-3 p-2" aria-label="Felipe Santos — Psicólogo Afetivo Online">
            <img
              // src="/logo.png" // Comentei, pois a imagem não é local, mas precisa ter alt text
              src="https://placehold.co/180x36/235FAA/ffffff?text=LOGO"
              alt="Logotipo Felipe Santos Psicólogo Afetivo | Terapia Online"
              className="h-8 w-auto md:h-9"
              loading="eager"
              width="180"
              height="36"
            />
            <span className="sr-only">@psicologoafetivo</span>
          </a>

          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#sobre" className="hover:opacity-80">Sobre</a>
            <a href="#atendimento" className="hover:opacity-80">Atendimento</a>
            <a href="#abordagem" className="hover:opacity-80">Abordagem</a>
            {/* Otimização: Adicionar link para o futuro blog */}
            <a href="#blog" className="hover:opacity-80">Blog (Em Breve)</a> 
            <a href="#faq" className="hover:opacity-80">Perguntas</a>
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
                Psicoterapia para adultos e casais **online** (foco afetivo)
              </p>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
                Psicólogo Online para {' '}
                <span className="text-[#235FAA]">Relacionamentos e Afetos</span>.
              </h1>
              {/* Otimização: Parágrafo introdutório reforçando especialidade e modalidade */}
              <p className="mt-5 text-white/80 max-w-2xl">
                Sou Felipe Santos (CRP 03/15591), psicólogo clínico e **terapeuta de casais online**. Trabalho com ACT (Terapia de Aceitação e Compromisso) e IBCT (Terapia Comportamental Integrativa de Casal), em intervenções focadas em **intimidade, compromisso e valores**.
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

            {/* Foto principal (hero) */}
            <div className="justify-self-center md:justify-self-end">
              <img
                src="https://placehold.co/800x500/235FAA/ffffff?text=Felipe+Santos+Psicologo"
                // Otimização: Alt text mais descritivo com a chave principal
                alt="Felipe Santos, psicólogo especialista em terapia de casal e individual online, com foco afetivo"
                className="w-full max-w-md rounded-2xl object-cover ring-1 ring-white/20 shadow-2xl"
                loading="eager"
                width="800"
                height="500"
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
          Intervenções focadas em metas claras e valores pessoais, com plano de cuidado adaptado à sua realidade. Sem promessas de resultado — trabalho ético e colaborativo, **realizado 100% online**.
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
      
      {/* Blog Link - Adicionei uma seção para o futuro blog */}
      <section id="blog" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">Conhecimento para Cultivar Afeto</h2>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">
                Em breve, o Blog "Psicólogo Afetivo Online" terá artigos sobre comunicação, autoestima e saúde mental.
            </p>
            <a href="#blog-link" className="mt-4 inline-block text-[#235FAA] hover:underline">
                Acompanhe o Blog (Em Breve) &rarr;
            </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/70">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div><strong>Felipe Santos</strong> — Psicólogo Clínico **Online** • CRP 03/15591</div>
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
