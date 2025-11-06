// scripts/build-blog.mjs
import { readFile, readdir, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, basename } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import fse from 'fs-extra';
import slugify from 'slugify';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, 'content', 'blog');
const PUBLIC_DIR = join(ROOT, 'public');
const BLOG_DIR = join(PUBLIC_DIR, 'blog');
const TPL_DIR = join(ROOT, 'templates');

const readTpl = async (name) => (await readFile(join(TPL_DIR, name), 'utf8'));
const articleTpl = await readTpl('article.html');
const indexTpl = await readTpl('blog-index.html');

const year = new Date().getFullYear();
const buildISO = new Date().toISOString();

// garante diretórios
if (!existsSync(CONTENT_DIR)) await mkdir(CONTENT_DIR, { recursive: true });
if (!existsSync(BLOG_DIR)) await mkdir(BLOG_DIR, { recursive: true });

// coleta .md
const files = (await readdir(CONTENT_DIR)).filter(f => f.endsWith('.md'));

const articles = [];

for (const file of files) {
  const full = join(CONTENT_DIR, file);
  const raw = await readFile(full, 'utf8');
  const { data, content } = matter(raw);

  const title = data.title ?? basename(file, '.md');
  const dateISO = (data.date ?? new Date().toISOString().slice(0,10)).slice(0,10);
  const dateHuman = safeFormat(dateISO);
  const slug = data.slug ?? slugify(title, { lower: true, strict: true });
  const featuredImage = data.featuredImage ?? '/og.jpg';
  const description = data.description ?? (content.replace(/\s+/g,' ').slice(0,160) + '…');
  const category = data.category ?? 'Artigos';
  const noImage = featuredImage ? 'false' : 'true';

  const html = marked.parse(content);

  const outDir = join(BLOG_DIR, slug);
  await fse.ensureDir(outDir);

  const articleHtml = articleTpl
    .replaceAll('{{title}}', escapeHtml(title))
    .replaceAll('{{description}}', escapeHtml(description))
    .replaceAll('{{slug}}', slug)
    .replaceAll('{{featuredImage}}', featuredImage)
    .replaceAll('{{dateISO}}', dateISO)
    .replaceAll('{{dateHuman}}', escapeHtml(dateHuman))
    .replaceAll('{{buildISO}}', buildISO)
    .replaceAll('{{category}}', escapeHtml(category))
    .replaceAll('{{noImage}}', noImage)
    .replaceAll('{{year}}', String(year))
    .replace('{{{content}}}', html);

  await writeFile(join(outDir, 'index.html'), articleHtml, 'utf8');

  articles.push({
    title, slug, dateISO, dateHuman, featuredImage,
    excerpt: description
  });
}

// ordena por data desc
articles.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

// monta listagem sem regex
let listHtml = indexTpl.replaceAll('{{year}}', String(year));

const itemTpl = `
      <a class="card" href="/blog/{{slug}}/">
        <p class="meta">{{dateHuman}}</p>
        <h3>{{title}}</h3>
        <p>{{excerpt}}</p>
      </a>`;

const rendered = articles.map(a =>
  itemTpl
    .replaceAll('{{slug}}', a.slug)
    .replaceAll('{{title}}', escapeHtml(a.title))
    .replaceAll('{{dateHuman}}', escapeHtml(a.dateHuman))
    .replaceAll('{{excerpt}}', escapeHtml(a.excerpt))
).join('\n');

listHtml = listHtml.replace('{{ARTICLES_BLOCK}}', rendered);

// grava listagem
await writeFile(join(BLOG_DIR, 'index.html'), listHtml, 'utf8');

console.log(`✔ Gerados ${articles.length} artigos e a listagem.`);

// helpers
function escapeHtml(s) {
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}

function safeFormat(dateISO) {
  try {
    return format(parseISO(dateISO), "LLLL 'de' yyyy", { locale: ptBR });
  } catch {
    return dateISO;
  }
}
