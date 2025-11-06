// scripts/html-to-md.mjs
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, basename } from 'path';
import fse from 'fs-extra';
import { load } from 'cheerio';              // ← aqui: sem default export
import TurndownService from 'turndown';
import slugify from 'slugify';

const ROOT = process.cwd();
const SRC_DIR = join(ROOT, 'public', 'blog');   // HTMLs antigos
const OUT_DIR = join(ROOT, 'content', 'blog');  // .md gerados

await fse.ensureDir(OUT_DIR);

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_'
});

const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

const dirEntries = await readdir(SRC_DIR, { withFileTypes: true });
// onde monta fileHtmls:
const fileHtmls = dirEntries
  .filter(d => d.isFile() && d.name.endsWith('.html') && d.name !== 'index.html')
  .map(d => d.name);
const subdirs   = dirEntries.filter(d => d.isDirectory()).map(d => d.name);

// arquivos soltos em /public/blog/*.html
for (const name of fileHtmls) {
  await convertOne(join(SRC_DIR, name), basename(name, '.html'));
}
// subpastas tipo /public/blog/<slug>/index.html
for (const dir of subdirs) {
  const indexPath = join(SRC_DIR, dir, 'index.html');
  if (fse.existsSync(indexPath)) {
    await convertOne(indexPath, dir);
  }
}

console.log('✔ Conversão finalizada.');

async function convertOne(fullPath, fallbackSlug) {
  const raw = await readFile(fullPath, 'utf8');
  const $ = load(raw);  // ← usa load do cheerio

  // título
  let title =
    $('meta[property="og:title"]').attr('content') ||
    $('title').first().text() ||
    $('.article-header h1').first().text() ||
    $('h1').first().text();
  title = clean(title);

  // descrição
  let description =
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    $('.lead').first().text() ||
    $('p').first().text();
  description = clean(description).slice(0, 240);

  // data (ISO se houver)
  let dateISO = $('time[datetime]').attr('datetime') || '';
  if (!dateISO) {
    const metaText = ($('.meta').first().text() || $('p.meta').first().text() || '').trim();
    const guessYear = (metaText.match(/\b(20\d{2})\b/) || [])[1];
    const guessMonth = '01';
    dateISO = guessYear ? `${guessYear}-${guessMonth}-01` : new Date().toISOString().slice(0, 10);
  }
  dateISO = dateISO.slice(0, 10);

  // imagem
  const featuredImage =
    $('meta[property="og:image"]').attr('content') ||
    $('.featured img').attr('src') ||
    $('img').first().attr('src') ||
    '';

  // corpo principal
  let $content = $('.prose').first();
  if (!$content.length) $content = $('article').first();
  if (!$content.length) $content = $('main').first();
  if (!$content.length) $content = $('body');

  // remove navegação/cta/rodapé etc
  $content.find('header, footer, nav, script, style, .cta, .cards').remove();

  const htmlContent = $content.html() || '';
  const markdown = turndown.turndown(htmlContent).trim();

  const slugBase = title || fallbackSlug || 'artigo';
  const slug = slugify(slugBase, { lower: true, strict: true });

  const fm = [
    '---',
    `title: "${escapeYaml(title || slugBase)}"`,
    `date: "${dateISO}"`,
    featuredImage ? `featuredImage: "${featuredImage}"` : '',
    description ? `description: "${escapeYaml(description)}"` : '',
    'category: "Artigos"',
    '---',
    ''
  ].filter(Boolean).join('\n');

  await writeFile(join(OUT_DIR, `${slug}.md`), fm + markdown + '\n', 'utf8');
  console.log(`→ ${basename(fullPath)}  ⇒  content/blog/${slug}.md`);
}

function escapeYaml(s) {
  return String(s).replace(/"/g, '\\"');
}
