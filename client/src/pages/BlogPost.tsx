import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogArticles: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    image: string;
    content: React.ReactNode;
  }
> = {
  "terapia-casal-online-ibct": {
    title: "Terapia de Casal Online: Por que a IBCT é a Abordagem mais Afetiva?",
    category: "Terapia de casal · IBCT",
    date: "Outubro de 2025",
    image: "/blog-1.jpg",
    content: (
      <>
        <p>
          Em um mundo cada vez mais conectado e, paradoxalmente, isolado, a terapia de casal online
          surgiu como uma ferramenta poderosa para nutrir relacionamentos. Muitas vezes, casais
          esperam anos até que os padrões de sofrimento estejam profundamente enraizados antes de
          procurar ajuda. Nosso objetivo, com a Terapia Comportamental Integrativa de Casal (IBCT),
          é intervir de forma <strong>colaborativa e afetiva</strong>, focando em aceitação e
          mudança.
        </p>

        <h2>O que é a IBCT? Aceitação antes da mudança</h2>
        <p>
          A IBCT (Integrative Behavioral Couple Therapy) reconhece que conflitos são inevitáveis.
          Diferente de abordagens que focam apenas em técnicas de comunicação, a IBCT integra a
          promoção da aceitação mútua e a construção de um "banco emocional" positivo. Primeiro,
          ajudamos o casal a entender o padrão de sofrimento (onde as diferenças viram briga).
          Depois, criamos a base para uma mudança significativa, que é mais fácil de ocorrer a partir
          de um lugar de aceitação e compaixão.
        </p>

        <h2>A vantagem do formato online para casais</h2>
        <p>
          A teleconsulta oferece privacidade e conforto incomparáveis. O casal pode estar em seu
          ambiente seguro, o que muitas vezes reduz a ansiedade e permite uma abertura emocional mais
          rápida. A flexibilidade de horário também elimina a logística de deslocamento, facilitando
          a manutenção da regularidade das sessões, que é crucial para o sucesso da terapia de casal.
          O sigilo é garantido, respeitando a LGPD e o Código de Ética Profissional.
        </p>

        <p>
          Neste formato online, trabalhamos juntos para identificar os valores do relacionamento e
          convertê-los em <strong>ações concretas</strong> que reforçam o vínculo. Se você e seu
          parceiro(a) buscam mais intimidade, compromisso e uma comunicação compassiva, a IBCT online
          é um caminho eficaz e afetivo.
        </p>

        <h2>Quando considerar iniciar IBCT</h2>
        <p>Alguns sinais de que pode ser hora de buscar terapia de casal:</p>
        <ul>
          <li>As conversas terminam em briga ou afastamento na maior parte das vezes.</li>
          <li>Há amor, mas vocês se sentem exaustos de repetir o mesmo conflito.</li>
          <li>Um dos dois (ou os dois) já cogitou separação, mas não tem clareza sobre o que quer.</li>
        </ul>
        <p>
          Nessas situações, IBCT não é um espaço para decidir "quem está certo", mas para entender o
          que esse padrão de conflito diz sobre as necessidades emocionais de cada um.
        </p>
      </>
    ),
  },
  "ansiedade-autoestima-terapia-act": {
    title: "Ansiedade e Autoestima: Como a ACT Ajuda a Viver com o que Importa",
    category: "Ansiedade · Autoestima · ACT",
    date: "Outubro de 2025",
    image: "/blog-2.jpg",
    content: (
      <>
        <p>
          A ansiedade e a baixa autoestima andam lado a lado, muitas vezes nos paralisando e nos
          impedindo de viver de acordo com nossos valores mais profundos. Quando você não confia em
          si mesmo, a ansiedade encontra um terreno fértil para crescer. A Terapia de Aceitação e
          Compromisso (ACT) oferece um caminho diferente: em vez de tentar eliminar a ansiedade, ela
          nos ensina a conviver com ela enquanto vivemos uma vida significativa.
        </p>

        <h2>A relação entre ansiedade e autoestima</h2>
        <p>
          Quando temos baixa autoestima, nossa mente se torna um crítico implacável. Cada erro é
          amplificado, cada fracasso é uma "prova" de nossa incompetência. A ansiedade surge como uma
          tentativa de proteção: "se eu me preocupar o suficiente, talvez eu consiga evitar o
          desastre". Mas essa estratégia geralmente piora as coisas.
        </p>

        <h2>Como a ACT muda essa dinâmica</h2>
        <p>
          A ACT não promete eliminar pensamentos negativos ou ansiedade. Ela trabalha em três frentes:
        </p>
        <ul>
          <li>
            <strong>Aceitação:</strong> Aprender a conviver com pensamentos e emoções difíceis sem
            lutar contra eles.
          </li>
          <li>
            <strong>Clareza de valores:</strong> Identificar o que realmente importa para você além
            da ansiedade.
          </li>
          <li>
            <strong>Ação comprometida:</strong> Tomar ações alinhadas com seus valores, mesmo com
            medo.
          </li>
        </ul>

        <p>
          Quando você começa a agir de acordo com seus valores, mesmo com ansiedade presente, sua
          autoestima naturalmente melhora. Você deixa de ser vítima da ansiedade e passa a ser alguém
          que vive uma vida significativa apesar dela.
        </p>
      </>
    ),
  },
  "relacionamentos-espelhos-amor-consciente": {
    title: "Relacionamentos são Espelhos: Use os Conflitos para Construir um Amor Consciente",
    category: "Relacionamentos · Amor consciente",
    date: "Outubro de 2025",
    image: "/blog-3.jpg",
    content: (
      <>
        <p>
          Relacionamentos são, de fato, como espelhos. Não aqueles que apenas refletem a aparência,
          mas os que revelam, com clareza brutal, o que está escondido em nosso interior. Quando seu
          parceiro(a) faz algo que te irrita profundamente, muitas vezes não é apenas sobre aquela
          ação específica. É sobre o que aquela ação desperta em você.
        </p>

        <h2>O que o conflito revela</h2>
        <p>
          Cada conflito é uma oportunidade de autoconhecimento. Se você se irrita quando seu
          parceiro(a) não responde suas mensagens rapidamente, talvez isso toque em uma ferida antiga
          de abandono ou negligência. Se você fica furioso quando ele(a) não faz as coisas "do seu
          jeito", talvez você esteja lutando contra a perda de controle.
        </p>

        <p>
          O relacionamento saudável não é aquele sem conflitos. É aquele em que os conflitos se tornam
          oportunidades de crescimento mútuo.
        </p>

        <h2>Construindo amor consciente</h2>
        <p>
          Amor consciente significa estar disposto a olhar para si mesmo com honestidade enquanto
          também vê seu parceiro(a) com compaixão. Significa reconhecer que vocês dois estão fazendo
          o melhor que podem com o que aprenderam até agora.
        </p>

        <p>
          Quando você consegue dizer "eu fico assim porque...", em vez de "você me faz ficar assim",
          você abre espaço para uma conexão real. E é nesse espaço que o amor consciente floresce.
        </p>
      </>
    ),
  },
  "nem-tudo-que-te-incomoda-no-parceiro": {
    title: "Nem tudo que te incomoda no seu parceiro é um problema a ser resolvido",
    category: "Diferenças · Convivência",
    date: "Outubro de 2025",
    image: "/blog-1.jpg",
    content: (
      <>
        <p>
          Se você tem intimidade com o(a) seu parceiro(a), é bem provável que você conheça muitas
          coisas sobre ele(a) que você gostaria que fossem diferentes. Talvez ele seja desorganizado,
          ela seja muito crítica, ele não demonstre afeto da forma como você gostaria. Essas pequenas
          (ou grandes) diferenças podem se tornar o foco de conflitos repetidos.
        </p>

        <h2>A diferença entre problema e diferença</h2>
        <p>
          Um problema é algo que pode ser resolvido. Uma diferença é algo que existe porque somos
          pessoas diferentes. Muitas vezes, gastamos energia tentando resolver diferenças, quando na
          verdade o que precisamos é aprender a conviver com elas.
        </p>

        <p>
          Seu parceiro(a) pode ser naturalmente mais introvertido(a) enquanto você é extrovertido(a).
          Isso não é um problema. É uma diferença. Você pode aprender a respeitar o tempo de
          repouso dele(a) enquanto ele(a) aprende a apoiar suas necessidades sociais.
        </p>

        <h2>Aceitação não é resignação</h2>
        <p>
          Aceitar uma diferença não significa que você gosta dela ou que desiste de pedir mudanças
          quando apropriado. Significa que você para de gastar energia emocional lutando contra a
          realidade de quem seu parceiro(a) é.
        </p>

        <p>
          Quando você consegue fazer essa distinção, você libera energia para apreciar o que é bom no
          relacionamento, em vez de estar constantemente focado no que está "errado".
        </p>
      </>
    ),
  },
};

export default function BlogPost() {
  const params = useParams();
  const postId = params.id as string;
  const article = blogArticles[postId];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
          <Link href="/blog/">
            <a className="text-primary hover:underline">Voltar para o blog</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <nav className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <a className="flex items-center gap-2 cursor-pointer">
                <img src="/logo.png" alt="Psicólogo Afetivo" className="h-8" />
                <div className="font-bold text-sm tracking-wide uppercase">
                  Psicólogo <span className="text-primary">Afetivo</span>
                </div>
              </a>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/#sobre">
                <a className="hover:text-primary transition-colors">Sobre</a>
              </Link>
              <Link href="/#servicos">
                <a className="hover:text-primary transition-colors">Terapia de casal</a>
              </Link>
              <Link href="/blog/">
                <a className="hover:text-primary transition-colors">Blog</a>
              </Link>
              <Link href="/#contato">
                <a className="hover:text-primary transition-colors">Contato</a>
              </Link>
            </nav>

            <a
              href="https://api.whatsapp.com/send?phone=5571987865549"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
            >
              <button className="px-4 py-1.5 rounded-full border border-primary text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">
                Agendar sessão
              </button>
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        <article className="container mx-auto max-w-3xl py-10 md:py-14">
          <Link href="/blog/">
            <a className="text-xs text-primary font-semibold mb-4 inline-flex items-center gap-1 hover:gap-2 transition-all">
              <ArrowLeft className="h-3 w-3" /> Voltar para o blog
            </a>
          </Link>

          <header className="mb-6">
            <p className="text-xs uppercase tracking-widest text-primary mb-2">{article.category}</p>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">{article.title}</h1>
            <p className="text-xs text-muted-foreground">
              Por Felipe Melo Souza Santos (CRP 03/15591) · {article.date}
            </p>
          </header>

          <div className="mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto rounded-xl border border-border object-cover"
            />
            <p className="text-xs text-muted-foreground mt-2">Imagem ilustrativa do conteúdo.</p>
          </div>

          <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-foreground prose-a:text-primary dark:prose-invert">
            {article.content}
          </div>

          {/* CTA Section */}
          <section className="mt-10 border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">
              Quer entender, na prática, como funciona a terapia?
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Nas páginas de informações sobre IBCT e ACT eu explico passo a passo como funcionam as
              sessões, critérios de indicação e o que você pode esperar do processo.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/#servicos"
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Conhecer os serviços <ArrowRight className="h-3 w-3 ml-1" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=5571987865549"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                Falar com Felipe
              </a>
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Psicólogo Afetivo — Felipe Melo Souza Santos · CRP 03/15591
          </span>
          <a href="/info/politica.html" className="text-primary hover:underline">
            Política de Agendamento
          </a>
        </div>
      </footer>
    </div>
  );
}
