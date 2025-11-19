import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: "terapia-casal-online-ibct",
    title: "Terapia de Casal Online: Por que a IBCT é a Abordagem mais Afetiva?",
    category: "Terapia de casal · IBCT",
    date: "Outubro de 2025",
    excerpt:
      "Em um mundo cada vez mais conectado e, paradoxalmente, isolado, a terapia de casal online surgiu como uma ferramenta poderosa para nutrir relacionamentos...",
    image: "/blog-1.jpg",
  },
  {
    id: "ansiedade-autoestima-terapia-act",
    title: "Ansiedade e Autoestima: Como a ACT Ajuda a Viver com o que Importa",
    category: "Ansiedade · Autoestima · ACT",
    date: "Outubro de 2025",
    excerpt:
      "A ansiedade e a baixa autoestima andam lado a lado, muitas vezes nos paralisando e nos impedindo de viver de acordo com nossos valores mais profundos...",
    image: "/blog-2.jpg",
  },
  {
    id: "relacionamentos-espelhos-amor-consciente",
    title: "Relacionamentos são Espelhos: Use os Conflitos para Construir um Amor Consciente",
    category: "Relacionamentos · Amor consciente",
    date: "Outubro de 2025",
    excerpt:
      "Relacionamentos são, de fato, como espelhos. Não aqueles que apenas refletem a aparência, mas os que revelam, com clareza brutal, o que está escondido em nosso interior...",
    image: "/blog-3.jpg",
  },
  {
    id: "nem-tudo-que-te-incomoda-no-parceiro",
    title: "Nem tudo que te incomoda no seu parceiro é um problema a ser resolvido",
    category: "Diferenças · Convivência",
    date: "Outubro de 2025",
    excerpt:
      "Se você tem intimidade com o(a) seu parceiro(a), é bem provável que você conheça muitas coisas sobre ele(a) que você gostaria que fossem diferentes...",
    image: "/blog-1.jpg",
  },
];

export default function Blog() {
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
              <a href="/blog/" className="text-primary font-semibold">
                Blog
              </a>
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
        <section className="container mx-auto py-10 md:py-14">
          <header className="mb-8 md:mb-10">
            <p className="text-xs tracking-widest uppercase text-primary mb-2">
              Blog · Psicólogo Afetivo
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Artigos sobre relacionamentos, terapia de casal e ACT
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Textos escritos a partir da clínica, da pesquisa e da vida real, para casais e adultos
              que querem entender melhor o que está acontecendo consigo e com a relação.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="h-40 overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <p className="text-xs uppercase tracking-widest text-primary">{post.category}</p>
                  <h2 className="text-lg font-semibold leading-tight">
                    <Link href={`/blog/${post.id}`}>
                      <a className="hover:text-primary transition-colors">{post.title}</a>
                    </Link>
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Por Felipe Melo Souza Santos · {post.date}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`}>
                    <a className="text-xs font-semibold text-primary hover:gap-2 inline-flex items-center gap-1 mt-auto">
                      Ler artigo completo <ArrowRight className="h-3 w-3" />
                    </a>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
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
