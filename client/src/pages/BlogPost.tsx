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
      <p>
        A Terapia Comportamental Integrada para Casais (IBCT, na sigla em inglês) é um modelo de terapia de casal
        que combina intervenções focadas em mudança de comportamento com um trabalho profundo de aceitação,
        validação mútua e flexibilização emocional. Em vez de tentar “consertar” o outro, o casal passa a olhar
        para o padrão que os aprisiona e a construir novas formas de se relacionar com esse padrão.
      </p>

      <p>
        O foco não é identificar quem está certo ou errado, mas compreender como cada parceiro responde à dor,
        à frustração e ao medo de perder o vínculo, e como essas respostas acabam alimentando ciclos de afastamento,
        crítica ou defesa. A partir daí, a terapia ajuda o casal a encontrar maneiras mais cuidadosas e comprometidas
        de lidar com os mesmos temas difíceis.
      </p>

      <h2>Por que o formato online funciona bem?</h2>
      <p>
        A IBCT se adapta muito bem ao formato online porque o elemento central é a conversa guiada entre o casal,
        com intervenções específicas do terapeuta. Recursos como quadro compartilhado, exercícios enviados por escrito
        e acompanhamento entre sessões ajudam a manter o processo vivo, mesmo quando cada um está em uma cidade ou país diferentes.
      </p>

      <ul>
        <li>Facilita o acesso de casais que moram em lugares diferentes.</li>
        <li>Reduz o tempo de deslocamento e aumenta a regularidade das sessões.</li>
        <li>Permite maior continuidade mesmo em viagens ou períodos de rotina intensa.</li>
      </ul>

      <h2>Um exemplo de situação trabalhada em sessão</h2>
      <p>
        Imagine um casal em que uma pessoa se sente constantemente sozinha nas decisões do dia a dia,
        enquanto a outra se sente criticada em qualquer tentativa de participação. Em IBCT, em vez de
        focar apenas em “como dividir melhor as tarefas”, exploramos a história de cada um com responsabilidade,
        cobrança e cuidado, para que o casal possa reconhecer a vulnerabilidade por trás do ataque ou da fuga.
      </p>

      <p>
        Quando essa dor é nomeada e acolhida na relação, abre-se espaço para negociações mais honestas,
        combinados realistas e expressões de afeto que antes estavam bloqueadas pela defensividade.
      </p>

      <h2>Quando considerar buscar IBCT online</h2>
      <ul>
        <li>Quando as conversas importantes terminam sempre em briga ou silêncio tenso.</li>
        <li>Quando o casal sente que está vivendo “no automático”, mais como sócios do que como parceiros.</li>
        <li>Quando houve um evento que abalou a confiança (como uma traição ou segredo relevante).</li>
        <li>Quando vocês querem prevenir o desgaste e fortalecer o compromisso antes que a relação chegue ao limite.</li>
      </ul>

      <h2>O que você pode esperar do processo</h2>
      <p>
        Ao longo das sessões, o casal aprende a reconhecer o ciclo em que está preso, a falar de forma mais clara
        sobre o que sente e precisa e a escolher, juntos, respostas mais alinhadas com os valores que desejam
        cultivar na relação. Não se trata de prometer um relacionamento sem conflitos, e sim de construir um vínculo
        mais honesto, flexível e cuidadoso com a vida a dois.
      </p>
    `,
  },
  "ansiedade-autoestima-terapia-act": {
    title: "Ansiedade, Autoestima e Terapia ACT",
    date: "15 de setembro de 2025",
    author: "Felipe Santos",
    image: "/blog-2.jpg",
    content: `
      <h2>Quando a ansiedade começa a comandar a vida</h2>
      <p>
        A ansiedade, em si, não é um defeito. Ela é um sistema de proteção que nos ajuda a perceber riscos e a nos preparar
        para o que é importante. O problema surge quando esse sistema fica hiperativo: pensamentos catastróficos,
        antecipações negativas e autocrítica constante passam a ocupar tanto espaço que a pessoa deixa de viver
        de acordo com o que valoriza, apenas tentando evitar desconforto.
      </p>

      <p>
        Com o tempo, isso também afeta a autoestima. Em vez de se ver como alguém que enfrenta situações difíceis,
        a pessoa passa a se enxergar como fraca, incapaz ou “complicada demais”, o que alimenta ainda mais o ciclo de ansiedade.
      </p>

      <h2>Como a ACT enxerga a autoestima</h2>
      <p>
        Na Terapia de Aceitação e Compromisso (ACT), autoestima não é pensada como um “sentir-se bem consigo mesmo o tempo todo”,
        mas como a forma como nos relacionamos com nossos próprios pensamentos, emoções e histórias. Ter autoestima saudável,
        nessa perspectiva, é ser capaz de reconhecer a autocrítica sem precisar obedecê-la cegamente, escolhendo ações alinhadas
        com os valores pessoais, mesmo na presença de insegurança.
      </p>

      <h2>Seis processos centrais da ACT</h2>
      <p>
        A ACT trabalha com seis processos interligados: aceitação, desfusão de pensamentos, contato com o momento presente,
        perspectiva de self, valores e ação comprometida. Juntos, eles ajudam a pessoa a construir um espaço interno maior,
        no qual é possível sentir medo e, ainda assim, dar passos concretos na direção de uma vida significativa.
      </p>

      <ul>
        <li><strong>Aceitação:</strong> abrir espaço para emoções difíceis, em vez de gastar toda a energia lutando contra elas.</li>
        <li><strong>Desfusão:</strong> perceber pensamentos como eventos mentais, e não como verdades absolutas.</li>
        <li><strong>Valores:</strong> clarear o tipo de pessoa que se deseja ser nas diferentes áreas da vida.</li>
        <li><strong>Ação comprometida:</strong> transformar esses valores em comportamentos observáveis no cotidiano.</li>
      </ul>

      <h2>Pequenos exercícios para começar</h2>
      <p>
        Um exercício clássico é o de observar, por alguns minutos, os pensamentos ansiosos como se fossem manchetes de jornal,
        aparecendo e passando, enquanto você leva a atenção para a respiração ou para uma atividade concreta,
        como arrumar a mesa ou caminhar até o trabalho. Não se trata de “esvaziar a mente”, mas de perceber que você é maior
        do que aquilo que pensa.
      </p>

      <p>
        Outro passo importante é escrever, com calma, três valores que gostaria de honrar nos próximos meses
        (por exemplo: cuidado, coragem, honestidade) e perguntar-se, ao final do dia: “Que pequenas ações de hoje
        estiveram a serviço desses valores?”. Essa pergunta ajuda a deslocar o foco do desempenho para o compromisso.
      </p>

      <h2>Quando buscar ajuda profissional</h2>
      <p>
        Se a ansiedade tem limitado de forma consistente sua vida social, familiar ou profissional, ou se você percebe
        que está deixando de viver experiências importantes por medo de falhar, pode ser o momento de procurar acompanhamento
        psicoterapêutico. A ACT oferece um caminho para reconstruir a relação consigo mesmo com mais gentileza e direção,
        sem prometer uma vida sem medo, mas uma vida em que o medo deixa de ser o centro de todas as decisões.
      </p>
    `,
  },
  "relacionamentos-espelhos-amor-consciente": {
    title: "Relacionamentos como Espelhos do Amor Consciente",
    date: "20 de agosto de 2025",
    author: "Felipe Santos",
    image: "/blog-3.jpg",
    content: `
      <h2>O espelho que mais evitamos</h2>
      <p>
        Poucas coisas revelam tanto sobre nós quanto a forma como nos relacionamos. Em um relacionamento amoroso,
        não aparecem apenas afeto e companheirismo, mas também medos antigos, expectativas silenciosas,
        crenças sobre valor próprio e modelos de amor herdados da família e da cultura. É como se a vida a dois
        funcionasse como um espelho ampliado do que carregamos internamente.
      </p>

      <p>
        Quando esse espelho mostra algo que preferiríamos não ver – ciúme, controle, fuga, dificuldade de pedir ajuda –
        é comum culpar o parceiro ou a parceira, como se o problema estivesse apenas “no outro”. Um passo importante
        em direção ao amor consciente é reconhecer que a relação mostra, mas não cria sozinha, muitos dos nossos dilemas.
      </p>

      <h2>Padrões que se repetem</h2>
      <p>
        Talvez você perceba que sempre assume o papel de cuidador exausto, ou de pessoa que evita conflitos a qualquer custo,
        ou ainda de alguém que exige provas constantes de amor. Esses papéis, muitas vezes, fazem sentido à luz da história
        de cada um, mas podem se tornar apertados demais quando são repetidos automaticamente em todas as relações.
      </p>

      <p>
        Enxergar o relacionamento como espelho não significa aceitar qualquer coisa, e sim perguntar:
        “O que esse vínculo está me mostrando sobre a forma como eu me vejo e me trato?”.
      </p>

      <h2>Transformando o espelho em aliado</h2>
      <p>
        Quando o casal começa a falar sobre o que sente sem apontar culpados, abre-se espaço para uma investigação conjunta:
        que histórias estão em jogo aqui? Em que momentos nos afastamos de quem queremos ser um para o outro?
        Que tipo de amor desejamos cultivar, na prática, nas conversas difíceis, nas decisões financeiras,
        no cuidado com o tempo e com o corpo do outro?
      </p>

      <ul>
        <li>Nomear o que dói, sem transformar o outro em inimigo.</li>
        <li>Reconhecer as repetições que nos fazem sofrer.</li>
        <li>Escolher, juntos, pequenos gestos diários que expressem o tipo de relação que desejamos construir.</li>
      </ul>

      <h2>Amor consciente como caminho, não como estado perfeito</h2>
      <p>
        Amor consciente não é um estado estável de plena harmonia, mas um processo em que o casal se dispõe a olhar
        para o espelho com honestidade e humildade. Em vez de buscar uma relação “sem conflitos”, busca-se um vínculo
        em que os conflitos possam ser atravessados com respeito, curiosidade e responsabilidade compartilhada.
      </p>

      <p>
        Nessa perspectiva, cada crise deixa de ser apenas um sinal de fracasso e passa a ser também uma oportunidade
        de reorganizar prioridades, revisar acordos e reafirmar, na prática, o compromisso de cuidar um do outro
        sem abrir mão da verdade.
      </p>
    `,
  },
  "quando-procurar-terapia-de-casal": {
    title: "Quando procurar terapia de casal: antes, durante ou depois da crise?",
    date: "10 de julho de 2025",
    author: "Felipe Santos",
    image: "/blog-1.jpg",
    content: `
      <h2>A ideia de que terapia de casal é “último recurso”</h2>
      <p>
        Muitas pessoas procuram terapia de casal apenas quando a relação já está à beira do rompimento.
        Embora seja possível fazer um bom trabalho mesmo em momentos de crise aguda, essa visão de “último recurso”
        impede casais de buscarem ajuda em fases anteriores, quando ainda há mais espaço para curiosidade,
        disponibilidade mútua e construção preventiva.
      </p>

      <h2>Momentos em que a terapia pode ajudar</h2>
      <p>
        A terapia de casal pode ser útil em diferentes fases do relacionamento. Em períodos mais tranquilos,
        ela atua como espaço de alinhamento, revisão de acordos e aprofundamento da intimidade. Em contextos de tensão,
        ajuda a desacelerar o conflito, organizar a conversa e construir respostas menos impulsivas à dor de cada um.
      </p>

      <ul>
        <li>
          <strong>Antes da crise:</strong> quando o casal percebe pequenos sinais de afastamento, repetição de conflitos
          em torno dos mesmos temas ou dificuldade de conversar sobre assuntos importantes.
        </li>
        <li>
          <strong>Durante a crise:</strong> quando as discussões se tornam frequentes, há sensação de injustiça permanente
          ou ameaça concreta de separação.
        </li>
        <li>
          <strong>Depois da crise:</strong> quando o casal decidiu continuar junto, mas ainda carrega mágoas,
          inseguranças e dúvidas sobre como reconstruir a confiança.
        </li>
      </ul>

      <h2>Sinais de que pode ser a hora de pedir ajuda</h2>
      <ul>
        <li>Vocês evitam determinados assuntos por medo de brigar.</li>
        <li>As conversas importantes terminam em silêncio hostil ou em explosões de raiva.</li>
        <li>Um dos dois sente que está sempre cedendo para manter a paz.</li>
        <li>Há sensação de solidão, mesmo estando na mesma casa.</li>
        <li>Um evento específico abalou a confiança, e o tema volta o tempo todo, sem resolução.</li>
      </ul>

      <h2>Como se preparar para o primeiro encontro</h2>
      <p>
        Antes da primeira sessão, pode ser útil que cada um reflita, em particular, sobre três perguntas:
        “O que ainda me faz querer investir nesta relação?”, “Que tipo de parceiro(a) eu desejo ser?”
        e “Que mudanças estou disposto(a) a tentar, na prática?”. Essas reflexões não são promessas prontas,
        mas pontos de partida para uma conversa mais honesta e menos defensiva.
      </p>

      <p>
        A terapia de casal não substitui as escolhas do casal, mas oferece um espaço estruturado para que essas escolhas
        sejam feitas com mais clareza, responsabilidade e cuidado com a história que vocês estão escrevendo juntos.
      </p>
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
          <div className="text-muted-foreground">
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
