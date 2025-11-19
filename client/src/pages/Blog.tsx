import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: "terapia-casal-online-ibct",
    title: "Terapia de Casal Online: IBCT",
    excerpt: "Entenda como a Terapia Comportamental Integrada para Casais funciona e como pode ajudar seu relacionamento.",
    image: "/blog-1.jpg",
    date: "01 de outubro de 2025",
  },
  {
    id: "ansiedade-autoestima-terapia-act",
    title: "Ansiedade, Autoestima e Terapia ACT",
    excerpt: "Descubra como a Terapia de Aceitação e Compromisso pode ajudar você a lidar com ansiedade e fortalecer sua autoestima.",
    image: "/blog-2.jpg",
    date: "15 de setembro de 2025",
  },
  {
    id: "relacionamentos-espelhos-amor-consciente",
    title: "Relacionamentos como Espelhos do Amor Consciente",
    excerpt: "Explore como nossos relacionamentos refletem nossas crenças sobre nós mesmos e como transformar isso.",
    image: "/blog-3.jpg",
    date: "20 de agosto de 2025",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog Psicólogo Afetivo</h1>
          <p className="text-lg text-muted-foreground">
            Artigos sobre relacionamentos, terapia de casal e desenvolvimento emocional
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <a className="group block h-full">
                <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      Ler mais <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
