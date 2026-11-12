/* Definições dos dois instrumentos para pacientes, usadas por /checkin/, /valores/ e /pacientes/ (painel).
   Mudou uma pergunta? Mude aqui. Os ids (primeira coluna) não devem ser trocados: é por eles que as respostas ficam gravadas. */
window.Instrumentos = (function () {
  "use strict";

  var CHECKIN = {
    versao: 1,
    // escalas de 0 a 10
    escalas: [
      { id: "geral",     pt: "De modo geral, como foi a sua semana?",            min: "Muito ruim",  max: "Muito boa",  curto: "Semana",    bomAlto: true },
      { id: "ansiedade", pt: "Ansiedade ou preocupação",                          min: "Nenhuma",     max: "Extrema",    curto: "Ansiedade", bomAlto: false },
      { id: "tristeza",  pt: "Tristeza ou desânimo",                              min: "Nenhuma",     max: "Extrema",    curto: "Tristeza",  bomAlto: false },
      { id: "irritacao", pt: "Irritação ou raiva",                                min: "Nenhuma",     max: "Extrema",    curto: "Irritação", bomAlto: false },
      { id: "energia",   pt: "Energia e disposição",                              min: "Nenhuma",     max: "Muita",      curto: "Energia",   bomAlto: true },
      { id: "sono",      pt: "Qualidade do sono",                                 min: "Péssima",     max: "Ótima",      curto: "Sono",      bomAlto: true },
      { id: "conexao",   pt: "Proximidade com as pessoas importantes para você",  min: "Distante",    max: "Muito perto", curto: "Conexão",  bomAlto: true }
    ],
    emocoes: [
      { grupo: "Agradáveis", itens: ["Alegria", "Calma", "Gratidão", "Esperança", "Orgulho", "Carinho", "Entusiasmo", "Alívio"] },
      { grupo: "Difíceis",   itens: ["Tristeza", "Ansiedade", "Medo", "Raiva", "Irritação", "Culpa", "Vergonha", "Solidão", "Frustração", "Cansaço", "Desânimo", "Ciúme", "Vazio", "Confusão"] }
    ],
    textos: [
      { id: "dificil", pt: "Qual foi o momento mais difícil da semana?" },
      { id: "bom",     pt: "O que foi bom, ou o que você fez bem?" },
      { id: "sessao",  pt: "O que você gostaria de levar para a próxima sessão?" }
    ]
  };

  var VALORES = {
    versao: 1,
    areas: [
      { id: "amor",       pt: "Relacionamento amoroso",          curto: "Amor",        dica: "Que tipo de parceiro ou parceira você quer ser? Como quer tratar e ser tratado(a)?" },
      { id: "familia",    pt: "Família",                         curto: "Família",     dica: "Que tipo de filho(a), irmão ou irmã, parente você quer ser?" },
      { id: "filhos",     pt: "Criação dos filhos",              curto: "Filhos",      dica: "Que tipo de pai ou mãe você quer ser? Se não tem filhos, deixe a importância em 0 ou responda pensando no futuro." },
      { id: "amigos",     pt: "Amizades e vida social",          curto: "Amizades",    dica: "Que tipo de amigo(a) você quer ser? O que quer cultivar nas suas amizades?" },
      { id: "trabalho",   pt: "Trabalho e carreira",             curto: "Trabalho",    dica: "O que você quer que o seu trabalho represente? Como quer ser como profissional e colega?" },
      { id: "estudo",     pt: "Aprendizado e crescimento",       curto: "Crescimento", dica: "O que você quer aprender? Em que direção quer crescer como pessoa?" },
      { id: "lazer",      pt: "Lazer e diversão",                curto: "Lazer",       dica: "Como você quer descansar, brincar e se divertir? O que te dá prazer de verdade?" },
      { id: "espirito",   pt: "Espiritualidade e sentido",       curto: "Sentido",     dica: "O que dá sentido à sua vida? Pode ser fé, natureza, arte, ou outra coisa que seja maior que você." },
      { id: "comunidade", pt: "Comunidade e cidadania",          curto: "Comunidade",  dica: "Como você quer contribuir com o lugar e as pessoas à sua volta?" },
      { id: "saude",      pt: "Saúde e cuidado com você",        curto: "Saúde",       dica: "Como você quer cuidar do seu corpo e da sua mente? Sono, alimentação, movimento, descanso." }
    ],
    // campos de cada área; a chave gravada é "<area>_<campo>", ex.: amor_imp
    campos: {
      txt:   "O que importa para você nessa área",
      imp:   "Importância",
      acao:  "O quanto tem vivido isso",
      passo: "Um passo pequeno"
    }
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function num(v) { var n = Number(v); return v === "" || v == null || isNaN(n) ? null : n; }

  /* Mapa de valores: uma linha por área, com um ponto para a importância e outro para o quanto a pessoa
     tem vivido aquilo; a barra entre os dois é a distância. Devolve HTML (svg + tabela). */
  function mapaHTML(dados) {
    var areas = VALORES.areas.map(function (a) {
      return { a: a, imp: num(dados[a.id + "_imp"]), acao: num(dados[a.id + "_acao"]) };
    }).filter(function (x) { return x.imp != null || x.acao != null; });
    if (!areas.length) return '<p class="muted">O mapa aparece aqui quando você der as primeiras notas.</p>';
    var W = 560, L = 118, R = 20, rowH = 30, top = 26, H = top + areas.length * rowH + 8, pw = W - L - R;
    function x(v) { return L + (v / 10) * pw; }
    var s = '<svg class="mapa" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Importância e vivência por área, de 0 a 10">';
    [0, 5, 10].forEach(function (t) {
      s += '<line x1="' + x(t) + '" x2="' + x(t) + '" y1="' + (top - 4) + '" y2="' + (H - 6) + '" class="grid"/>' +
           '<text x="' + x(t) + '" y="14" text-anchor="middle" class="tick">' + t + '</text>';
    });
    areas.forEach(function (r, i) {
      var y = top + i * rowH + rowH / 2;
      s += '<g class="row"><title>' + esc(r.a.pt) + ': importância ' + (r.imp == null ? "–" : r.imp) + ', vivência ' + (r.acao == null ? "–" : r.acao) + '</title>' +
           '<rect x="0" y="' + (y - rowH / 2) + '" width="' + W + '" height="' + rowH + '" class="hit"/>' +
           '<text x="' + (L - 12) + '" y="' + (y + 4) + '" text-anchor="end" class="lab">' + esc(r.a.curto) + '</text>';
      if (r.imp != null && r.acao != null && r.imp !== r.acao)
        s += '<line x1="' + x(r.imp) + '" x2="' + x(r.acao) + '" y1="' + y + '" y2="' + y + '" class="gap"/>';
      if (r.acao != null) s += '<rect x="' + (x(r.acao) - 6) + '" y="' + (y - 6) + '" width="12" height="12" rx="2" class="p-acao"/>';
      if (r.imp != null)  s += '<circle cx="' + x(r.imp) + '" cy="' + y + '" r="6.5" class="p-imp"/>';
      s += '</g>';
    });
    s += '</svg>';
    var leg = '<div class="legenda"><span><i class="k-imp"></i>Importância</span><span><i class="k-acao"></i>O quanto tem vivido</span></div>';
    var tab = '<details class="tabela"><summary>Ver em tabela</summary><table><tr><th>Área</th><th class="n">Importância</th><th class="n">Vivência</th><th class="n">Distância</th></tr>' +
      areas.map(function (r) {
        var d = r.imp != null && r.acao != null ? r.imp - r.acao : null;
        return '<tr><td>' + esc(r.a.pt) + '</td><td class="n">' + (r.imp == null ? "–" : r.imp) + '</td><td class="n">' + (r.acao == null ? "–" : r.acao) + '</td><td class="n">' + (d == null ? "–" : d) + '</td></tr>';
      }).join("") + '</table></details>';
    return leg + s + tab;
  }

  // áreas importantes (≥ 7) em que a vivência está 3 pontos ou mais abaixo
  function distancias(dados) {
    return VALORES.areas.map(function (a) {
      var i = num(dados[a.id + "_imp"]), v = num(dados[a.id + "_acao"]);
      return { a: a, imp: i, acao: v, d: i != null && v != null ? i - v : null };
    }).filter(function (x) { return x.d != null && x.imp >= 7 && x.d >= 3; })
      .sort(function (p, q) { return q.d - p.d; });
  }

  // nome legível de uma chave gravada, ex.: "amor_imp" -> "Relacionamento amoroso · Importância"
  function nomeCampo(k) {
    var p = String(k).split("_"), a = VALORES.areas.filter(function (x) { return x.id === p[0]; })[0];
    return a && VALORES.campos[p[1]] ? a.pt + " · " + VALORES.campos[p[1]] : k;
  }

  return { CHECKIN: CHECKIN, VALORES: VALORES, esc: esc, num: num, mapaHTML: mapaHTML, distancias: distancias, nomeCampo: nomeCampo };
})();
