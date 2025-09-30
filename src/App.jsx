import React from 'react'
import { StatCard, ServiceCard, ApproachCard, Faq } from './components.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/50 bg-black/70 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-wide">@psicologoafetivo</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#sobre" className="hover:opacity-80">Sobre</a>
            <a href="#atendimento" className="hover:opacity-80">Atendimento</a>
            <a href="#abordagem" className="hover:opacity-80">Abordagem</a>
            <a href="#faq" className="hover:opacity-80">Perguntas</a>
            <a href="#contato" className="hover:opacity-80">Agendar</a>
          </nav>
          <a
            href="#contato"
            className="inline-flex items-center rounded-xl bg-[#235FAA] px-4 py-2 text-sm font-medium hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#235FAA]"
          >
            Agendar sessão
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,#235FAA_0%,transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            {/* Texto */}
            <div className="max-w-3xl">
              <p className="text-xs tracking-widest uppercase text-white/70">
                Psicoterapia para adultos e casais (online)
              </p>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
                Relacionamentos com sentido, decisões com coragem,{' '}
                <span className="text-[#235FAA]">vida com direção</span>.
              </h1>
              <p className="mt-5 text-white/80 max-w-2xl">
                Sou Felipe Santos (CRP 03/15591), psicólogo clínico e terapeuta de casais. Trabalho com ACT (Terapia de Aceitação e Compromisso) e IBCT (Terapia Comportamental Integrativa de Casal), em intervenções baseadas em processos e valores.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://api.whatsapp.com/send?phone=5571987865549"
                  className="inline-flex items-center justify-center rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110"
                >
                  Falar no WhatsApp
                </a>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 font-medium hover:bg-white/5"
                >
                  Ver disponibilidade
                </a>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-white/60">
                <div className="rounded-xl border border-white/10 p-3">Atendimento online</div>
                <div className="rounded-xl border border-white/10 p-3">Casais &amp; Adultos</div>
                <div className="rounded-xl border border-white/10 p-3">Baseado em evidências</div>
                <div className="rounded-xl border border-white/10 p-3">Confidencialidade (LGPD)</div>
              </div>
            </div>

            {/* Foto principal (hero) */}
            <div className="justify-self-center md:justify-self-end">
              <img
                src="/maj-hero.webp"
                alt="Felipe Santos — Psicólogo Afetivo"
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
          <StatCard title="Formato" text="Teleconsulta segura" />
        </div>
      </section>

      {/* Atendimento */}
      <section id="atendimento" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Como posso ajudar</h2>
        <p className="mt-3 text-white/80 max-w-3xl">
          Intervenções focadas em metas claras e valores pessoais, com plano de cuidado adaptado à sua realidade. Sem promessas de resultado — trabalho ético e colaborativo.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ServiceCard
            number="01"
            title="Terapia Individual (adultos)"
            items={[
              'Ansiedade, regulação emocional, propósito e valores',
              'Padrões relacionais: autocrítica, evitação, dependência',
              'Construção de rotina e decisões alinhadas',
            ]}
          />
          <ServiceCard
            number="02"
            title="Terapia de Casal"
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
          <h2 className="text-2xl md:text-3xl font-semibold">Minha abordagem</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <ApproachCard
              title="Processos, não rótulos"
              text="Olho para padrões que mantêm sofrimento e afastam você do que importa (flexibilidade psicológica)."
            />
            <ApproachCard
              title="Valores na prática"
              text="Convertendo clareza de valores em pequenas ações viáveis no dia a dia."
            />
            <ApproachCard
              title="Cuidado ético"
              text="Sem promessas, sem sensacionalismo. Confidencialidade e respeito à sua história."
            />
          </div>
        </div>
      </section>

      {/* CTA intermédio */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-white/10 p-8 md:p-10 bg-gradient-to-br from-[#235FAA]/20 to-transparent">
          <h3 className="text-xl md:text-2xl font-semibold">Pronto para começar uma conversa?</h3>
          <p className="mt-2 text-white/80">Envie uma mensagem e retornarei com horários e próximos passos.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=5571987865549"
              className="inline-flex justify-center rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110"
            >
              WhatsApp
            </a>
            <a
              href="#contato"
              className="inline-flex justify-center rounded-xl border border-white/20 px-5 py-3 font-medium hover:bg-white/5"
            >
              Formulário de contato
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Perguntas frequentes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Faq q="Como funcionam as sessões online?" a="Usamos plataforma segura (link enviado no agendamento). Duração média de 50 minutos." />
            <Faq q="Você atende convênio?" a="Atendo particular. Posso emitir recibo para reembolso quando aplicável." />
            <Faq q="Atende casais de culturas diferentes?" a="Sim. Experiência com casais multiculturais e atendimento bilíngue (PT/EN) quando necessário." />
            <Faq q="Como marcar?" a="Clique em ‘Agendar sessão’ ou envie mensagem no WhatsApp. Retorno com horários e instruções." />
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Contato</h2>
        <form className="mt-6 grid gap-4 max-w-xl" onSubmit={(e) => e.preventDefault()}>
          <input className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3" placeholder="Seu nome" />
          <input className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3" placeholder="Seu email" type="email" />
          <textarea className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3" placeholder="Como posso ajudar?" rows="4" />
          <button className="rounded-xl bg-[#235FAA] px-5 py-3 font-medium hover:brightness-110" type="button">Enviar</button>
          <p className="text-xs text-white/60">Ao enviar, você concorda com o tratamento dos dados conforme a LGPD. Sem spam.</p>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/70">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div><strong>Felipe Santos</strong> — Psicólogo Clínico • CRP 03/15591</div>
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
