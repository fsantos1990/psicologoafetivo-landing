import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu, X, Heart, Users, BookOpen, Award, ChevronDown } from "lucide-react";
import { APP_LOGO } from "@/const";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Detectar seção ativa ao rolar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "sobre", "servicos", "conteudo", "depoimentos", "faq", "contato"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <nav className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
              <img src={APP_LOGO} alt="Psicólogo Afetivo" className="h-8" />
              <div className="font-bold text-sm tracking-wide uppercase">
                Psicólogo <span className="text-primary">Afetivo</span>
              </div>
            </div>

            {/* Menu Desktop */}
            <ul className="hidden md:flex items-center gap-6 text-sm">
              {[
                { id: "sobre", label: "Sobre" },
                { id: "servicos", label: "Terapia de casal" },
                { id: "conteudo", label: "Conteúdos" },
                { id: "depoimentos", label: "Depoimentos" },
                { id: "faq", label: "FAQ" },
                { id: "contato", label: "Contato" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative pb-1 transition-colors hover:text-primary ${
                      activeSection === item.id ? "text-primary" : ""
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA Desktop */}
            <a
              href="https://api.whatsapp.com/send?phone=5571987865549"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
            >
              <Button variant="outline" size="sm" className="rounded-full">
                Agendar sessão
              </Button>
            </a>

            {/* Menu Mobile Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Menu Mobile */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t animate-in slide-in-from-top-2">
              <ul className="flex flex-col gap-3">
                {[
                  { id: "sobre", label: "Sobre" },
                  { id: "servicos", label: "Terapia de casal" },
                  { id: "conteudo", label: "Conteúdos" },
                  { id: "depoimentos", label: "Depoimentos" },
                  { id: "faq", label: "FAQ" },
                  { id: "contato", label: "Contato" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left px-4 py-2 hover:bg-muted rounded-md transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="px-4 pt-2">
                  <a
                    href="https://api.whatsapp.com/send?phone=5571987865549"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full rounded-full">Agendar sessão</Button>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="bg-black text-white py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-[2fr_1.3fr] gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <div className="text-xs tracking-widest uppercase text-gray-400">
                Terapia de casal online · ACT & IBCT
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Quando o vínculo começa a doer, dá pra cuidar.
                <span className="text-primary"> Sem promessas mágicas.</span>
              </h1>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl">
                Eu sou Felipe Santos, psicólogo clínico e terapeuta de casais. Ajudo casais e adultos a
                saírem do modo ataque/defesa e voltarem a construir intimidade, respeito e direção de vida.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full">
                  Terapia de Casal — IBCT
                </Button>
                <Button size="lg" variant="outline" className="rounded-full bg-transparent text-white border-gray-400 hover:bg-white/10">
                  Terapia Individual — ACT
                </Button>
              </div>
              <div className="text-sm text-gray-400">
                Atendimento 100% online · CRP 03/15591 · Casais heterossexuais monogâmicos
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                  <img
                    src="/maj-hero.webp"
                    alt="Felipe Santos — Psicólogo Afetivo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://www.psicologoafetivo.com.br/maj-avatar.webp";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE SECTION */}
      <section id="sobre" className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="text-xs tracking-widest uppercase text-primary mb-2">Sobre mim</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Psicólogo clínico, terapeuta de casais e professor
            </h2>
            <p className="text-muted-foreground">
              Trabalho com ACT e IBCT para ajudar casais a transformarem ciclos de briga, silêncio e
              afastamento em oportunidades de intimidade, compromisso e compaixão.
            </p>
          </div>

          <div className="grid md:grid-cols-[1.3fr_1.8fr] gap-8">
            <div>
              <div className="inline-block bg-muted px-4 py-1 rounded-full text-sm mb-4">
                Felipe Melo Souza Santos · CRP 03/15591
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Atendo casais e adultos que sentem que já tentaram "de tudo" e ainda vivem presos nos
                  mesmos padrões de sofrimento. A terapia não é sobre achar o culpado, mas entender o que
                  está acontecendo entre vocês e construir novas formas de se relacionar.
                </p>
                <p>
                  Minha base é contextual: olhamos para história de vida, valores, padrões de interação e
                  também para os processos internos de cada um — forma de lidar com emoções difíceis,
                  pensamentos e memórias.
                </p>
              </div>
            </div>

            <div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Mestre em Psicologia Social e Cognitiva.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Especialista em ACT e Terapias Contextuais.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Autor de capítulos de livro sobre Terapia de Casal (IBCT/TCIC).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Professor, supervisor de terapeutas e pesquisador de relações amorosas contemporâneas.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS SECTION */}
      <section id="servicos" className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="text-xs tracking-widest uppercase text-primary mb-2">Como posso ajudar</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Processos pensados para casais e adultos em crise
            </h2>
            <p className="text-muted-foreground">
              Cada atendimento é estruturado com base em evidências científicas, com linguagem acessível e
              foco na realidade de vocês.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="text-xs tracking-widest uppercase text-primary">Principal</span>
                </div>
                <CardTitle className="text-xl">Terapia de Casal Online (IBCT)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sessões online com os dois parceiros, focadas em desacelerar o ciclo ataque/defesa,
                  compreender o que dói em cada um e construir novas formas de se conectar sem perder
                  autenticidade.
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-primary">Atendimento semanal · Sessões de 50 minutos</p>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-xs tracking-widest uppercase text-primary">Individual</span>
                </div>
                <CardTitle className="text-xl">Terapia Individual 1:1 (ACT)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Para quem está em um relacionamento ou em processo de separação e precisa organizar
                  emoções, decisões e padrões afetivos à luz dos próprios valores.
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-primary">ACT para relacionamentos e vida afetiva</p>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-xs tracking-widest uppercase text-primary">Profissional</span>
                </div>
                <CardTitle className="text-xl">Supervisão e formação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Supervisão clínica e cursos voltados para terapeutas que querem aprofundar o trabalho com
                  ACT, IBCT e psicoterapia de casais baseada em processos.
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-primary">Supervisão individual e em pequenos grupos</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTEÚDOS/BLOG SECTION */}
      <section id="conteudo" className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="text-xs tracking-widest uppercase text-primary mb-2">Conteúdos</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Leituras para conversar melhor e brigar menos
            </h2>
            <p className="text-muted-foreground">
              Textos sobre terapia de casal, ACT e vida afetiva, pensados para pessoas reais em relações
              reais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Terapia de Casal Online: Por que a IBCT é a abordagem mais afetiva?",
                excerpt:
                  "Entenda como a IBCT trabalha aceitação e mudança para transformar brigas repetidas em conversas que aproximam.",
              },
              {
                title: "Nem tudo que te incomoda no seu parceiro é um problema a ser resolvido",
                excerpt:
                  "Diferenças inevitáveis fazem parte de qualquer relação. O desafio é aprender a conviver com elas sem perder o cuidado.",
              },
              {
                title: "Ansiedade e autoestima: como a ACT ajuda a viver com o que importa",
                excerpt:
                  "Quando pensamentos invasivos e dúvidas sobre si mesmo atrapalham a relação, ACT pode ajudar a reorganizar escolhas.",
              },
            ].map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={`/blog-${index + 1}.jpg`} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-base leading-tight">{article.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">Artigo · Blog Psicólogo Afetivo</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <a href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Ver todos os artigos
              <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            </a>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS SECTION */}
      <section id="depoimentos" className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mb-12 mx-auto text-center">
            <div className="text-xs tracking-widest uppercase text-primary mb-2">Depoimentos</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que dizem casais que passaram por aqui
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                text: "A terapia com o Felipe nos ajudou a entender que não precisávamos mudar quem somos, mas sim como nos relacionamos. Hoje conseguimos conversar sobre o que dói sem virar uma guerra.",
                author: "Ana e Carlos",
                context: "Casal em terapia há 6 meses",
              },
              {
                text: "Eu achava que a gente ia terminar. A IBCT nos mostrou que nossos conflitos tinham sentido e que dava pra construir intimidade mesmo com nossas diferenças.",
                author: "Mariana e Pedro",
                context: "Casal em terapia há 1 ano",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.context}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl mb-12 mx-auto text-center">
            <div className="text-xs tracking-widest uppercase text-primary mb-2">
              Perguntas Frequentes
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dúvidas comuns sobre terapia de casal</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Como funciona a terapia de casal online?",
                answer:
                  "As sessões acontecem por videochamada, com duração de 50 minutos, geralmente semanais. Trabalho com os dois parceiros juntos, criando um espaço seguro para conversas difíceis.",
              },
              {
                question: "Quanto tempo dura o processo?",
                answer:
                  "Não existe um tempo fixo. Alguns casais sentem mudanças significativas em 3-4 meses, outros precisam de mais tempo. O importante é que vocês sintam que estão avançando.",
              },
              {
                question: "E se apenas um de nós quiser fazer terapia?",
                answer:
                  "O ideal é que ambos participem, mas se apenas um está disposto no momento, podemos começar com terapia individual focada na relação. Muitas vezes isso abre caminho para o casal depois.",
              },
              {
                question: "Qual é o investimento?",
                answer:
                  "Os valores variam conforme a modalidade. Entre em contato pelo WhatsApp para receber informações atualizadas sobre valores e disponibilidade de horários.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL / CONTATO */}
      <section id="contato" className="py-16 md:py-20 bg-gradient-to-br from-muted/50 to-muted/20">
        <div className="container">
          <Card className="max-w-3xl mx-auto shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">
                Quer conversar sobre a relação de vocês?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Se vocês percebem que o amor continua, mas a forma de se relacionar ficou desgastada, a
                terapia de casal pode ser um espaço para diminuir a guerra e aumentar a compreensão. Me mande
                uma mensagem e te explico como funciona.
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=5571987865549"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full md:w-auto rounded-full">
                  Falar com Felipe no WhatsApp
                </Button>
              </a>
              <p className="text-sm text-muted-foreground">
                Atendimento online · Horários limitados · Brasil e exterior (fuso a combinar)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-4 text-sm">
            <div>© {new Date().getFullYear()} Psicólogo Afetivo — Felipe Santos · CRP 03/15591</div>
            <div>
              ACT · IBCT · Terapia de Casal e Adultos · Atendimento online ·{" "}
              <a href="/info/politica.html" className="text-primary hover:underline">
                Política de Agendamento
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
