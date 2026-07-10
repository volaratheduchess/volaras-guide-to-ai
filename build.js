// build.js — compiles content/*.md (+ content/quizzes.json, content/platforms.json) into data.js
// Run this every time you add or edit a page: node build.js

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const CONTENT_DIR = path.join(__dirname, 'content');
const OUTPUT_FILE = path.join(__dirname, 'data.js');

marked.setOptions({ headerIds: false, mangle: false });

function readPage(filePath){
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  if(!data.title) throw new Error('Missing "title" in ' + filePath);
  if(!data.slug) throw new Error('Missing "slug" in ' + filePath + ' — never invent a new slug for an existing page, or its quiz and read-progress will stop matching.');
  const html = marked.parse(content || '');
  const page = { slug: data.slug, title: data.title, html: html, cover: data.cover || null };
  if(data.group) page.group = data.group;
  page._order = typeof data.order === 'number' ? data.order : 9999;
  return page;
}

function clusterByGroup(items){
  const order = [];
  const buckets = {};
  items.forEach(function(it){
    const g = it.group || null;
    if(!(g in buckets)){ buckets[g] = []; order.push(g); }
    buckets[g].push(it);
  });
  let out = [];
  order.forEach(function(g){ out = out.concat(buckets[g]); });
  return out;
}

function buildTree(){
  const sectionDirs = fs.readdirSync(CONTENT_DIR).filter(function(f){
    return fs.statSync(path.join(CONTENT_DIR, f)).isDirectory();
  });

  const sections = sectionDirs.map(function(dirName){
    const dirPath = path.join(CONTENT_DIR, dirName);
    const indexPath = path.join(dirPath, '_index.md');
    if(!fs.existsSync(indexPath)) throw new Error('Missing _index.md in ' + dirPath);
    const section = readPage(indexPath);
    const sectionOrder = section._order;

    const childFiles = fs.readdirSync(dirPath).filter(function(f){
      return f.endsWith('.md') && f !== '_index.md';
    });
    let children = childFiles.map(function(f){ return readPage(path.join(dirPath, f)); });
    children.sort(function(a, b){ return a._order - b._order; });
    children = clusterByGroup(children);
    children.forEach(function(c){ delete c._order; });

    delete section._order;
    section.children = children;
    return { section: section, order: sectionOrder };
  });

  sections.sort(function(a, b){ return a.order - b.order; });
  return sections.map(function(s){ return s.section; });
}

function main(){
  const tree = buildTree();
  const quizzes = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'quizzes.json'), 'utf8'));
  const platforms = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'platforms.json'), 'utf8'));

  let out = 'window.SITE_DATA = ' + JSON.stringify(tree) + ';\n';
  out += 'window.QUIZZES = ' + JSON.stringify(quizzes) + ';\n';
  out += 'window.PLATFORMS = ' + JSON.stringify(platforms) + ';\n';

  fs.writeFileSync(OUTPUT_FILE, out, 'utf8');

  let pageCount = 0;
  tree.forEach(function(s){ pageCount += s.children.length; });
  console.log('Built data.js — ' + tree.length + ' sections, ' + pageCount + ' pages, ' +
    Object.keys(quizzes).length + ' quizzes, ' + platforms.length + ' platforms.');
}

try{
  main();
}catch(e){
  console.error('Build failed:', e.message);
  process.exit(1);
}
