import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getBlogPost } from "@/data/blogPosts";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5571987865549";

export default function BlogPost() {
  const params = useParams();
  const postId = params.id as string;
  const post = getBlogPost(postId);

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
          <p className="text-sm text-muted-foreground mb-3">{post.date} · Por {post.author}</p>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
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
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-12 p-8 bg-primary/10 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Quer conversar sobre isso?</h3>
          <p className="text-muted-foreground mb-6">
            Se você se identificou com este artigo e gostaria de explorar esses temas com um profissional, fale comigo.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg">Falar com Felipe no WhatsApp</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
