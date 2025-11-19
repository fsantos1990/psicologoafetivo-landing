import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const blogPostsData: Record<string, any> = {
  "terapia-casal-online-ibct": {
    title: "Terapia de Casal Online: IBCT",
    date: "01 de outubro de 2025",
    author: "Felipe Santos",
    image: "/blog-1.jpg",
    content: `
      <h2>O que é IBCT?</h2>
      <p>A Terapia Comportamental Integrada para Casais (IBCT) é uma abordagem terapêutica baseada em evidências que combina técnicas comportamentais com estratégias de aceitação e mindfulness.</p>
      
      <h2>Como funciona?</h2>
      <p>A IBCT trabalha ajudando os casais a entender padrões de comportamento que causam conflito e a desenvolver estratégias para lidar com essas diferenças de forma mais compassiva.</p>
      
      <h2>Benefícios</h2>
      <ul>
        <li>Melhora na comunicação</li>
        <li>Aumento de intimidade</li>
        <li>Resolução de conflitos</li>
        <li>Fortalecimento do vínculo</li>
      </ul>
    `,
  },
  "ansiedade-autoestima-terapia-act": {
    title: "Ansiedade, Autoestima e Terapia ACT",
    date: "15 de setembro de 2025",
    author: "Felipe Santos",
    image: "/blog-2.jpg",
    content: `
      <h2>Entendendo a Ansiedade</h2>
      <p>A ansiedade é uma resposta natural do corpo, mas quando se torna excessiva, pode afetar significativamente nossa qualidade de vida e autoestima.</p>
      
      <h2>O que é ACT?</h2>
      <p>A Terapia de Aceitação e Compromisso (ACT) é uma abordagem que ajuda você a aceitar pensamentos e sentimentos difíceis enquanto se move em direção aos seus valores.</p>
      
      <h2>Como ACT ajuda com ansiedade</h2>
      <p>Em vez de tentar eliminar a ansiedade, ACT ensina você a conviver com ela de forma mais saudável, focando no que realmente importa para você.</p>
    `,
  },
  "relacionamentos-espelhos-amor-consciente": {
    title: "Relacionamentos como Espelhos do Amor Consciente",
    date: "20 de agosto de 2025",
    author: "Felipe Santos",
    image: "/blog-3.jpg",
    content: `
      <h2>A Metáfora do Espelho</h2>
      <p>Nossos relacionamentos funcionam como espelhos que refletem nossas crenças, medos e desejos mais profundos sobre nós mesmos.</p>
      
      <h2>Amor Consciente</h2>
      <p>Amor consciente significa estar presente, autêntico e responsável em nossas relações, reconhecendo que cada interação é uma oportunidade de crescimento.</p>
      
      <h2>Transformando Relacionamentos</h2>
      <p>Quando compreendemos que nossos relacionamentos refletem quem somos, podemos usar essa compreensão para crescer e criar conexões mais significativas.</p>
    `,
  },
};

export default function BlogPost() {
  const params = useParams();
  const postId = params.id as string;
  const post = blogPostsData[postId];

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
          <Link href="/blog">
            <Button>Voltar ao Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 w-4 h-4" /> Voltar ao Blog
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{post.date}</span>
            <span>•</span>
            <span>Por {post.author}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full h-96 overflow-hidden bg-muted">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-12 p-8 bg-primary/10 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Quer conversar sobre isso?</h3>
          <p className="text-muted-foreground mb-6">
            Se você se identificou com este artigo, gostaria de explorar esses temas com um profissional.
          </p>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
            <Button size="lg">Agendar Consulta</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
