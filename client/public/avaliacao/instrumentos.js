/* Instrumentos de avaliação de casal (IBCT) — itens PT/EN e correção.
   Usado pelo formulário (/avaliacao/) e pelo painel (/avaliacao/painel/).
   As respostas brutas ficam no banco; os escores são sempre recalculados aqui. */
(function (g) {
  "use strict";

  var TRUE6 = [
    { v: 0, pt: "De jeito nenhum é verdade", en: "Not at all true" },
    { v: 1, pt: "Bem pouco é verdade", en: "A little true" },
    { v: 2, pt: "De alguma maneira é verdade", en: "Somewhat true" },
    { v: 3, pt: "Na maioria das vezes é verdade", en: "Mostly true" },
    { v: 4, pt: "Quase sempre é verdade", en: "Almost completely true" },
    { v: 5, pt: "Totalmente verdadeiro", en: "Completely true" }
  ];

  // ---------- 1. Satisfação Conjugal (CSI-16, Funk & Rogge, 2007) ----------
  var CSI = {
    id: "csi",
    titulo: { pt: "Satisfação no relacionamento", en: "Relationship satisfaction" },
    fonte: "Couple Satisfaction Index (CSI-16), Funk & Rogge (2007)",
    instrucao: {
      pt: "Responda pensando no seu relacionamento como um todo.",
      en: "Answer thinking about your relationship as a whole."
    },
    itens: [
      { id: "csi1", tipo: "escala",
        pt: "Por favor, indique o grau de felicidade, considerando todas as questões do seu relacionamento.",
        en: "Please indicate the degree of happiness, all things considered, of your relationship.",
        opcoes: [
          { v: 0, pt: "Extremamente infeliz", en: "Extremely unhappy" },
          { v: 1, pt: "Bastante infeliz", en: "Fairly unhappy" },
          { v: 2, pt: "Um pouco infeliz", en: "A little unhappy" },
          { v: 3, pt: "Feliz", en: "Happy" },
          { v: 4, pt: "Muito feliz", en: "Very happy" },
          { v: 5, pt: "Extremamente feliz", en: "Extremely happy" },
          { v: 6, pt: "Perfeito", en: "Perfect" }
        ] },
      { id: "csi2", tipo: "escala",
        pt: "Em geral, com que frequência você acha que as coisas estão indo bem entre você e seu parceiro(a)?",
        en: "In general, how often do you think that things between you and your partner are going well?",
        opcoes: [
          { v: 5, pt: "O tempo todo", en: "All the time" },
          { v: 4, pt: "A maior parte do tempo", en: "Most of the time" },
          { v: 3, pt: "Mais vezes sim do que não", en: "More often than not" },
          { v: 2, pt: "Ocasionalmente", en: "Occasionally" },
          { v: 1, pt: "Raramente", en: "Rarely" },
          { v: 0, pt: "Nunca", en: "Never" }
        ] },
      { id: "csi3", tipo: "escala", opcoes: TRUE6, pt: "Nossa relação é sólida.", en: "Our relationship is strong." },
      { id: "csi4", tipo: "escala", opcoes: TRUE6, pt: "Nossa relação me faz feliz.", en: "My relationship with my partner makes me happy." },
      { id: "csi5", tipo: "escala", opcoes: TRUE6, pt: "Tenho uma relação calorosa e confortável com meu parceiro(a).", en: "I have a warm and comfortable relationship with my partner." },
      { id: "csi6", tipo: "escala", opcoes: TRUE6, pt: "Eu realmente sinto que somos parceiros.", en: "I really feel like part of a team with my partner." },
      { id: "csi7", tipo: "escala", opcoes: TRUE6, pt: "Nosso relacionamento é gratificante.", en: "Our relationship is rewarding." },
      { id: "csi8", tipo: "escala", opcoes: TRUE6, pt: "Meu parceiro(a) atende bem às minhas necessidades.", en: "My partner meets my needs well." },
      { id: "csi9", tipo: "escala", opcoes: TRUE6, pt: "Nosso relacionamento correspondeu às minhas expectativas originais.", en: "Our relationship has met my original expectations." },
      { id: "csi10", tipo: "escala", opcoes: TRUE6, pt: "Em geral, estou satisfeito(a) com nosso relacionamento.", en: "In general, I am satisfied with our relationship." }
    ],
    // Itens 11–16: diferencial semântico, 5 (polo positivo) a 0 (polo negativo)
    pares: {
      instrucao: {
        pt: "Para cada par de palavras, marque o ponto que melhor descreve como você se sente com o seu relacionamento. Responda pela primeira impressão.",
        en: "For each pair of words, mark the point that best describes how you feel about your relationship. Go with your first impression."
      },
      itens: [
        { id: "csi11", pos: { pt: "Estimulante", en: "Interesting" }, neg: { pt: "Chato", en: "Boring" } },
        { id: "csi12", pos: { pt: "Bom", en: "Good" }, neg: { pt: "Ruim", en: "Bad" } },
        { id: "csi13", pos: { pt: "Pleno", en: "Full" }, neg: { pt: "Esvaziado", en: "Empty" } },
        { id: "csi14", pos: { pt: "Sólido", en: "Sturdy" }, neg: { pt: "Frágil", en: "Fragile" } },
        { id: "csi15", pos: { pt: "Com esperança", en: "Hopeful" }, neg: { pt: "Desanimador", en: "Discouraging" } },
        { id: "csi16", pos: { pt: "Prazeroso", en: "Enjoyable" }, neg: { pt: "Infeliz", en: "Miserable" } }
      ]
    }
  };

  // ---------- 2. Frequência e Aceitabilidade (FAPBI, Christensen & Jacobson) ----------
  function fb(n, pt, en, aceitPt, aceitEn, extra) {
    var o = { id: "fa" + n, n: n, pt: pt, en: en, aceitPt: aceitPt, aceitEn: aceitEn };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }
  var FA = {
    id: "fa",
    titulo: { pt: "Comportamentos do parceiro(a) no último mês", en: "Your partner's behaviors in the last month" },
    fonte: "Frequency and Acceptability of Partner Behavior Inventory, Christensen & Jacobson",
    instrucao: {
      pt: "Para cada comportamento: (A) diga quantas vezes ele aconteceu no último mês e escolha se a contagem é por dia, semana ou mês. Exemplo: duas vezes por semana = 2 por semana. (B) Depois, marque o quanto essa frequência foi aceitável para você, de 0 (totalmente inaceitável) a 9 (totalmente aceitável). Se não aconteceu, marque 0 vezes e avalie o quanto foi aceitável que não tenha acontecido.",
      en: "For each behavior: (A) say how many times it happened in the last month and choose whether you are counting per day, week or month. Example: twice a week = 2 per week. (B) Then rate how acceptable that frequency was for you, from 0 (totally unacceptable) to 9 (totally acceptable). If it did not happen, enter 0 times and rate how acceptable it was that it did not happen."
    },
    positivos: [
      fb(1, "Meu parceiro(a) foi fisicamente afetuoso(a) (segurou minha mão, me beijou, me abraçou, retribuiu quando demonstrei afeto).",
        "My partner was physically affectionate (held my hand, kissed me, hugged me, responded when I showed affection).",
        "fisicamente afetuoso(a)", "physically affectionate"),
      fb(2, "Meu parceiro(a) foi verbalmente afetuoso(a) (me elogiou, disse que me ama, disse coisas boas).",
        "My partner was verbally affectionate (complimented me, said they love me, said nice things).",
        "verbalmente afetuoso(a)", "verbally affectionate"),
      fb(3, "Meu parceiro(a) fez trabalho doméstico, por iniciativa própria ou quando eu pedi (cozinhou, lavou pratos, limpou a casa, lavou roupa, fez compras, levou o lixo).",
        "My partner did household chores, on their own initiative or when I asked (cooked, washed dishes, cleaned, did laundry, groceries, took out the trash).",
        "fazendo trabalho doméstico", "doing household chores"),
      fb(4, "Meu parceiro(a) cuidou da(s) criança(s) (cuidou, ajudou na lição de casa, brincou, disciplinou).",
        "My partner took care of the child(ren) (looked after them, helped with homework, played with them, disciplined them).",
        "cuidando da(s) criança(s)", "taking care of the child(ren)", { opcionalSemFilhos: true }),
      fb(5, "Meu parceiro(a) me confidenciou algo (compartilhou o que sentia, seus sucessos e fracassos).",
        "My partner confided in me (shared what they felt, their successes and failures).",
        "confidenciando algo a você", "confiding in you"),
      fb(6, "Meu parceiro(a) se envolveu sexualmente comigo (relação sexual ou outra atividade sexual significativa, iniciada por qualquer um de nós).",
        "My partner engaged in sexual activity with me (intercourse or any other meaningful sexual activity, initiated by either of us).",
        "envolvendo-se sexualmente com você", "engaging sexually with you"),
      fb(7, "Meu parceiro(a) me deu apoio quando tive problemas (escutou, foi compreensivo(a), me ajudou).",
        "My partner supported me when I had problems (listened, was understanding, helped me).",
        "dando apoio a você", "supporting you"),
      fb(8, "Meu parceiro(a) participou de atividades sociais ou de lazer comigo (cinema, jantar, shows, caminhadas), por iniciativa de qualquer pessoa.",
        "My partner joined social or leisure activities with me (movies, dinner, concerts, walks), whoever suggested them.",
        "participando de atividades sociais com você", "joining social activities with you"),
      fb(9, "Meu parceiro(a) passou tempo com minha família ou meus amigos (visitou, interagiu, foi junto em passeios).",
        "My partner spent time with my family or friends (visited, interacted, came along on outings).",
        "passando tempo com sua família ou amigos", "spending time with your family or friends"),
      fb(10, "Meu parceiro(a) conversou comigo sobre nosso relacionamento e tentou resolver os problemas de forma construtiva.",
        "My partner talked with me about our relationship and tried to solve problems constructively.",
        "conversando sobre o relacionamento", "talking about the relationship"),
      fb(11, "Meu parceiro(a) participou das responsabilidades financeiras da família (decisões, pagamento de contas, me consultou antes de grandes compras).",
        "My partner shared the family's financial responsibilities (decisions, paying bills, consulting me before big purchases).",
        "participando das finanças", "sharing financial responsibilities"),
      fb(12, "Outro comportamento positivo, não listado acima, que foi importante para você no último mês.",
        "Another positive behavior, not listed above, that was important to you in the last month.",
        "tendo esse comportamento", "doing this", { livre: true, opcional: true })
    ],
    negativos: [
      fb(13, "Meu parceiro(a) foi crítico(a) comigo (me culpou pelos problemas, desqualificou o que fiz, fez acusações).",
        "My partner was critical of me (blamed me for problems, put down what I did, made accusations).",
        "crítico(a) com você", "critical of you"),
      fb(14, "Meu parceiro(a) foi desonesto(a) comigo (mentiu, omitiu coisas que eu precisava saber, distorceu fatos).",
        "My partner was dishonest with me (lied, withheld things I needed to know, twisted facts).",
        "desonesto(a) com você", "dishonest with you"),
      fb(15, "Meu parceiro(a) se comportou de forma inadequada com outras pessoas (por exemplo, encontros secretos).",
        "My partner behaved inappropriately with other people (for example, secret meetings).",
        "inadequado(a) com outras pessoas", "inappropriate with other people"),
      fb(16, "Meu parceiro(a) não cumpriu o que foi combinado (não fez o que disse que faria, voltou atrás na palavra).",
        "My partner did not follow through on agreements (did not do what they said, went back on their word).",
        "descumprindo combinados", "breaking agreements"),
      fb(17, "Meu parceiro(a) foi verbalmente agressivo(a) comigo (gritou, xingou, berrou).",
        "My partner was verbally abusive toward me (yelled, cursed, screamed).",
        "verbalmente agressivo(a)", "verbally abusive"),
      fb(18, "Meu parceiro(a) foi fisicamente agressivo(a) comigo (chutou, bateu, atirou coisas em mim).",
        "My partner was physically abusive toward me (kicked, hit, threw things at me).",
        "fisicamente agressivo(a)", "physically abusive", { alerta: true }),
      fb(19, "Meu parceiro(a) foi controlador(a) e mandão(ona) (fez coisas sem me consultar, insistiu no jeito dele(a), não me ouviu, manipulou para conseguir o que queria).",
        "My partner was controlling and bossy (did things without consulting me, insisted on their way, did not listen, manipulated to get what they wanted).",
        "controlador(a)", "controlling"),
      fb(20, "Meu parceiro(a) invadiu minha privacidade (por exemplo, mexeu no meu celular).",
        "My partner invaded my privacy (for example, went through my phone).",
        "invadindo sua privacidade", "invading your privacy"),
      fb(21, "Meu parceiro(a) teve comportamentos aditivos que me incomodaram (cigarro, drogas, álcool). Informe qual.",
        "My partner had addictive behaviors that bothered me (smoking, drugs, alcohol). Please say which.",
        "tendo esse comportamento", "doing this", { descricao: true }),
      fb(22, "Outro comportamento negativo, não listado acima, que foi importante para você no último mês.",
        "Another negative behavior, not listed above, that was important to you in the last month.",
        "tendo esse comportamento", "doing this", { livre: true, opcional: true })
    ],
    unidades: [
      { v: "dia", pt: "por dia", en: "per day", fator: 30 },
      { v: "semana", pt: "por semana", en: "per week", fator: 4.33 },
      { v: "mes", pt: "por mês", en: "per month", fator: 1 }
    ]
  };

  // ---------- 3. Compromisso (Christensen, 2009) ----------
  var COMP = {
    id: "comp",
    titulo: { pt: "Compromisso com o relacionamento", en: "Commitment to the relationship" },
    fonte: "Questionário de Compromisso com o Relacionamento, Christensen (2009)",
    instrucao: {
      pt: "Classifique o seu compromisso com este relacionamento, de 0 (nada) a 5 (totalmente).",
      en: "Rate your commitment to this relationship, from 0 (not at all) to 5 (completely)."
    },
    itens: [
      { id: "comp1", pt: "Quero que minha relação seja bem-sucedida.", en: "I want my relationship to succeed." },
      { id: "comp2", pt: "Farei tudo o que puder para torná-la bem-sucedida.", en: "I will do all I can to make it succeed." }
    ]
  };

  // ---------- 4. Áreas problemáticas (Heavey, Christensen & Malamuth, 1995) ----------
  var AREAS = {
    id: "areas",
    titulo: { pt: "Áreas de desacordo", en: "Areas of disagreement" },
    fonte: "Questionário de Áreas Problemáticas, Heavey, Christensen & Malamuth (1995)",
    instrucao: {
      pt: "Estas são áreas em que casais muitas vezes ficam insatisfeitos ou discordam do comportamento um do outro. Marque o quanto cada área é um problema no seu relacionamento, de 1 (não é problema) a 6 (é um problema grave).",
      en: "These are areas where couples often feel dissatisfied or disagree about each other's behavior. Rate how much each area is a problem in your relationship, from 1 (not a problem) to 6 (a severe problem)."
    },
    escala: { min: 1, max: 6,
      minRot: { pt: "Não é problema", en: "Not a problem" },
      maxRot: { pt: "Problema grave", en: "Severe problem" } },
    itens: [
      { id: "ar1", pt: "Finanças da família", en: "Handling family finances" },
      { id: "ar2", pt: "Filhos ou parentalidade", en: "Children or parenting" },
      { id: "ar3", pt: "Demonstrações de afeto", en: "Showing affection" },
      { id: "ar4", pt: "Relações sexuais", en: "Sexual relations" },
      { id: "ar5", pt: "Carreira e decisões de emprego", en: "Career and job decisions" },
      { id: "ar6", pt: "Tarefas domésticas", en: "Household chores" },
      { id: "ar7", pt: "Confiança ou ciúme", en: "Trust or jealousy" },
      { id: "ar8", pt: "Sogros, pais e parentes", en: "In-laws, parents and relatives" },
      { id: "ar9", pt: "Tempo de lazer juntos", en: "Leisure time together" },
      { id: "ar10", pt: "Drogas ou álcool", en: "Drugs or alcohol" },
      { id: "ar11", pt: "Religião", en: "Religion" },
      { id: "ar12", pt: "Mau humor, temperamento, emocionalidade", en: "Moodiness, temper, emotionality" },
      { id: "ar13", pt: "Objetivos, prioridades e grandes decisões de vida", en: "Goals, priorities and major life decisions" },
      { id: "ar14", pt: "Comportamento ou aparência apropriada", en: "Appropriate behavior or appearance" },
      { id: "ar15", pt: "Outra área", en: "Other", livre: true, opcional: true }
    ]
  };

  // ---------- 5. Violência conjugal + interações típicas (Christensen, 2009) ----------
  var VIOL = {
    id: "viol",
    titulo: { pt: "Segurança e interações recentes", en: "Safety and recent interactions" },
    fonte: "Questionário de Violência Conjugal, Christensen (2009)",
    instrucao: {
      pt: "Muitas pessoas, em algum momento, agridem o parceiro(a) quando estão com raiva: ameaçam, apertam, empurram, dão tapas ou batem. Indique quantas vezes cada situação aconteceu no último ano. O terapeuta vai ler suas respostas individualmente e conversar com você sobre o que for relevante.",
      en: "Many people, at one time or another, become aggressive toward their partner when angry: threatening, grabbing, pushing, slapping or hitting. Indicate how many times each situation happened in the last year. The therapist will read your answers individually and discuss with you whatever is relevant."
    },
    freq: [
      { v: 0, pt: "Nunca", en: "Never" },
      { v: 1, pt: "1 vez", en: "Once" },
      { v: 2, pt: "2 a 5 vezes", en: "2 to 5 times" },
      { v: 3, pt: "6 a 10 vezes", en: "6 to 10 times" },
      { v: 4, pt: "Mais de 10 vezes", en: "More than 10 times" }
    ],
    itens: [
      { id: "vA", pt: "Durante uma discussão ou briga, eu cometi um ato de agressão física contra meu parceiro(a) (empurrar, bater, dar tapas, morder ou outro).",
        en: "During an argument or fight, I committed an act of physical aggression against my partner (pushing, hitting, slapping, biting or other)." },
      { id: "vB", pt: "Durante uma discussão ou briga, meu parceiro(a) cometeu um ato de agressão física contra mim (empurrar, bater, dar tapas, morder ou outro).",
        en: "During an argument or fight, my partner committed an act of physical aggression against me (pushing, hitting, slapping, biting or other)." }
    ],
    medo: { id: "vC",
      pt: "Considerando tudo, às vezes sinto que não posso expressar minha opinião sem medo de represália física do meu parceiro(a) (por exemplo, de ser punido(a) pelo que disser).",
      en: "All things considered, I sometimes feel I cannot express my opinion without fear of physical retaliation from my partner (for example, being punished for what I say).",
      opcoes: [
        { v: 0, pt: "Não", en: "No" },
        { v: 1, pt: "Às vezes", en: "Sometimes" },
        { v: 2, pt: "Sim", en: "Yes" }
      ] },
    abertas: [
      { id: "vNeg", pt: "Descreva uma interação recente entre você e seu parceiro(a) que seja típica dos problemas que trouxeram vocês à terapia.",
        en: "Describe a recent interaction between you and your partner that is typical of the problems that brought you to therapy." },
      { id: "vPos", pt: "Descreva uma interação recente entre você e seu parceiro(a) que seja típica das qualidades positivas que ainda fazem parte do relacionamento.",
        en: "Describe a recent interaction between you and your partner that is typical of the positive qualities still present in your relationship." }
    ]
  };

  var INSTRUMENTOS = [CSI, FA, COMP, AREAS, VIOL];

  // ---------------- Correção ----------------
  function num(x) { var n = Number(x); return isFinite(n) ? n : null; }

  function corrigir(r) {
    r = r || {};
    var out = { alertas: [] };

    // CSI-16
    var ids = [];
    for (var i = 1; i <= 16; i++) ids.push("csi" + i);
    var soma = 0, resp = 0;
    ids.forEach(function (id) { var v = num(r[id]); if (v !== null && r[id] !== "" && r[id] != null) { soma += v; resp++; } });
    var zona = null;
    if (resp === 16) zona = soma > 68 ? "verde" : soma >= 52 ? "amarela" : "vermelha";
    out.csi = { total: soma, respondidos: resp, max: 81, zona: zona };
    if (zona === "vermelha") out.alertas.push({ nivel: "atencao", pt: "Satisfação na zona vermelha (CSI < 52)", en: "Satisfaction in red zone (CSI < 52)" });

    // FAPBI
    var fat = {}; FA.unidades.forEach(function (u) { fat[u.v] = u.fator; });
    function linha(it, grupo) {
      var vezes = num(r[it.id + "_f"]), un = r[it.id + "_u"] || "mes", ac = num(r[it.id + "_a"]);
      if (r[it.id + "_a"] === "" || r[it.id + "_a"] == null) ac = null;
      if (r[it.id + "_na"]) return null;
      if (vezes === null && ac === null) return null;
      var mes = vezes === null ? null : Math.round(vezes * (fat[un] || 1) * 10) / 10;
      return { n: it.n, id: it.id, grupo: grupo, vezes: vezes, unidade: un, porMes: mes, aceit: ac,
        texto: it.livre || it.descricao ? (r[it.id + "_t"] || "") : "" };
    }
    var linhas = [];
    FA.positivos.forEach(function (it) { var l = linha(it, "pos"); if (l) linhas.push(l); });
    FA.negativos.forEach(function (it) { var l = linha(it, "neg"); if (l) linhas.push(l); });
    function media(g) {
      var a = linhas.filter(function (l) { return l.grupo === g && l.aceit !== null; });
      if (!a.length) return null;
      return Math.round(a.reduce(function (s, l) { return s + l.aceit; }, 0) / a.length * 10) / 10;
    }
    var baixa = linhas.filter(function (l) { return l.aceit !== null && l.aceit <= 3; })
      .sort(function (a, b) { return a.aceit - b.aceit; });
    var top = [];
    for (var t = 1; t <= 5; t++) { var x = r["fa_top" + t]; if (x) top.push(Number(x)); }
    out.fa = { linhas: linhas, mediaPos: media("pos"), mediaNeg: media("neg"), baixaAceit: baixa, top5: top };
    linhas.forEach(function (l) {
      if (l.n === 18 && l.vezes > 0) out.alertas.push({ nivel: "grave", pt: "Relata agressão física do parceiro(a) no último mês (item 18)", en: "Reports partner physical aggression in last month (item 18)" });
    });

    // Compromisso
    var c1 = num(r.comp1), c2 = num(r.comp2);
    out.comp = { quer: r.comp1 === undefined || r.comp1 === "" ? null : c1, fara: r.comp2 === undefined || r.comp2 === "" ? null : c2 };
    if ((out.comp.quer !== null && out.comp.quer <= 2) || (out.comp.fara !== null && out.comp.fara <= 2))
      out.alertas.push({ nivel: "atencao", pt: "Compromisso baixo (≤ 2 em algum item)", en: "Low commitment (≤ 2 on an item)" });

    // Áreas
    var areas = AREAS.itens.map(function (it) {
      var v = r[it.id] === "" || r[it.id] == null ? null : num(r[it.id]);
      return { id: it.id, v: v, texto: it.livre ? (r[it.id + "_t"] || "") : "" };
    }).filter(function (a) { return a.v !== null; });
    var mediaA = areas.length ? Math.round(areas.reduce(function (s, a) { return s + a.v; }, 0) / areas.length * 10) / 10 : null;
    var top3 = [];
    for (var k = 1; k <= 3; k++) if (r["ar_top" + k]) top3.push(r["ar_top" + k]);
    out.areas = { itens: areas, media: mediaA, graves: areas.filter(function (a) { return a.v >= 5; }).map(function (a) { return a.id; }), top3: top3 };

    // Violência
    var vA = num(r.vA), vB = num(r.vB), vC = num(r.vC);
    out.viol = { eu: r.vA == null || r.vA === "" ? null : vA, parceiro: r.vB == null || r.vB === "" ? null : vB, medo: r.vC == null || r.vC === "" ? null : vC };
    if (out.viol.eu > 0) out.alertas.push({ nivel: "grave", pt: "Relata ter cometido agressão física no último ano", en: "Reports committing physical aggression in last year" });
    if (out.viol.parceiro > 0) out.alertas.push({ nivel: "grave", pt: "Relata ter sofrido agressão física no último ano", en: "Reports receiving physical aggression in last year" });
    if (out.viol.medo > 0) out.alertas.push({ nivel: "grave", pt: "Relata medo de represália física ao expressar opinião", en: "Reports fear of physical retaliation" });

    return out;
  }

  // Rótulo curto de um item, para relatórios
  function rotulo(id, lang) {
    lang = lang || "pt";
    var all = [];
    CSI.itens.forEach(function (i) { all.push(i); });
    FA.positivos.concat(FA.negativos).forEach(function (i) { all.push(i); });
    AREAS.itens.forEach(function (i) { all.push(i); });
    for (var j = 0; j < all.length; j++) if (all[j].id === id) return all[j][lang];
    return id;
  }

  g.Avaliacao = { INSTRUMENTOS: INSTRUMENTOS, CSI: CSI, FA: FA, COMP: COMP, AREAS: AREAS, VIOL: VIOL, corrigir: corrigir, rotulo: rotulo, VERSAO: 1 };
})(typeof window !== "undefined" ? window : globalThis);
