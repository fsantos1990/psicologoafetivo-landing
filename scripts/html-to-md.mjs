// scripts/html-to-md.mjs
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, basename, dirname } from 'path';
import fse from 'fs-extra';
import cheerio from 'cheerio';
import TurndownService from 'turndown';
import slugify from 'slugify';

const ROOT = process.cwd();
const SRC_DIR = join(ROOT, 'public', 'blog');       // onde estão os HTML antigos
const OUT_DIR = join(ROOT, 'content', 'blog');      // para onde vão os .md

await fse.ensureDir(OUT_DIR);

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_'
});

// util: limpa texto
const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

const files = (await readdir(SRC_DIR, { withFileTypes: true }))
  .filter(d => d.isFile() && d.name.endsWith('.html'))
  .map(d => d.name);

// Se seus artigos estão em subpastas (ex.: /blog/slug/index.html), trate também:
const subdirs = (await readdir(SRC_DIR, { withFileTypes: true }))
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const htmlFile of files) {
  await convertOne(join(SRC_DIR, htmlFile), basename(htmlFile, '.html'));
}
for (const dir of subdirs) {
  const indexPath = join(SRC_DIR, dir, 'index.html');
  try {
    await fse.access(indexPath);
    await convertOne(indexPath, dir);
  } catch {}
}

console.log('✔ Conversão finalizada.');

async function convertOne(fullPath, fallbackSlug) {
  const raw = await readFile(fullPath, 'utf8');
  const $ = cheerio.load(raw);

  // Título
  let title = $('meta[property="og:title"]').attr('content')
          || $('title').first().text()
          || $('.article-header h1').first().text()
          || $('h1').first().text();
  title = clean(title);

  // Descrição
  let description = $('meta[name="description"]').attr('content')
                  || $('meta[property="og:description"]').attr('content')
                  || $('.lead').first().text()
                  || $('p').first().text();
  description = clean(description).slice(0, 240);

  // Data (tente metas, senão texto da página)
  let dateISO = $('time[datetime]').attr('datetime') || '';
  if (!dateISO) {
    // tenta achar “Outubro de 2025” etc
    const metaText = $('.meta').first().text() || $('p.meta').first().text() || '';
    const guessYear = (metaText.match(/\b(20\d{2})\b/) || [])[1];
    const guessMonth = '01';
    dateISO = guessYear ? `${guessYear}-${guessMonth}-01` : new Date().toISOString().slice(0,10);
  }

  // Imagem
  const featuredImage = $('meta[property="og:image"]').attr('content')
                      || $('.featured img').attr('src')
                      || $('img').first().attr('src')
                      || '';

  // Corpo: prioriza container principal
  let $content = $('.prose').first();
  if (!$content.length) $content = $('article').first();
  if (!$content.length) $content = $('main').first();
  if (!$content.length) $content = $('body');

  // remove elementos indesejados
  $content.find('header, footer, nav, script, style, .cta, .cards').remove();

  const htmlContent = $content.html() || '';
  const markdown = turndown.turndown(htmlContent);

  const slugBase = title || fallbackSlug || 'artigo';
  const slug = slugify(slugBase, { lower: true, strict: true });

  const fm = [
    '---',
    `title: "${escapeYaml(title || slugBase)}"`,
    `date: "${dateISO.slice(0,10)}"`,
    featuredImage ? `featuredImage: "${featuredImage}"` : '',
    description ? `description: "${escapeYaml(description)}"` : '',
    'category: "Artigos"',
    '---',
    ''
  ].filter(Boolean).join('\n');

  const mdOut = fm + markdown.trim() + '\n';

  await writeFile(join(OUT_DIR, `${slug}.md`), mdOut, 'utf8');
  console.log(`→ ${basename(fullPath)}  ⇒  content/blog/${slug}.md`);
}

function escapeYaml(s) {
  return String(s).replace(/"/g, '\\"');
}
