// content.js — injected into the current tab (only on supported platforms, only when the
// popup is opened) to read the LIVE rendered DOM. These sites render client-side, so the
// page source (Ctrl+U) is an empty shell; everything here runs against what's on screen.
//
// Strategy: every character card links to the character's page, so we find all links
// whose path matches the platform's characterPath, then climb up from each link to the
// largest element that still belongs to only that one character — that's the "card".
// Name, description, avatar and tags are pulled from inside that card.

(function(){
  // Injected again each time the popup opens; only register the listener once.
  if(globalThis.__qaContentLoaded) return;
  globalThis.__qaContentLoaded = true;

  const MAX_CARD_DEPTH = 8;
  const MAX_DESCRIPTION = 1000;

  function clean(text){
    return String(text || '').replace(/\s+/g, ' ').trim();
  }

  function characterIdFromHref(href, platform){
    let u;
    try{ u = new URL(href, location.href); }catch(e){ return null; }
    if(!platform.hosts.some(function(h){ return QA_PLATFORMS.hostMatches(u.hostname, h); })) return null;
    const m = platform.characterPath.exec(u.pathname);
    return m ? { id: m[1], url: u.origin + u.pathname } : null;
  }

  // Distinct character IDs linked from inside an element.
  function characterIdsWithin(el, platform){
    const ids = new Set();
    el.querySelectorAll('a[href]').forEach(function(a){
      const c = characterIdFromHref(a.getAttribute('href'), platform);
      if(c) ids.add(c.id);
    });
    return ids;
  }

  function findCard(link, id, platform){
    if(platform.cardSelector){
      const explicit = link.closest(platform.cardSelector);
      if(explicit) return explicit;
    }
    let card = link;
    let el = link.parentElement;
    for(let depth = 0; el && el !== document.body && depth < MAX_CARD_DEPTH; depth++){
      const ids = characterIdsWithin(el, platform);
      if(ids.size > 1 || (ids.size === 1 && !ids.has(id))) break;
      card = el;
      el = el.parentElement;
    }
    return card;
  }

  // Next.js serves images through /_next/image?url=<real url>; unwrap to the original.
  function unwrapImageUrl(src){
    if(!src) return '';
    let u;
    try{ u = new URL(src, location.href); }catch(e){ return ''; }
    if(u.protocol === 'data:' || u.protocol === 'blob:') return '';
    if(u.pathname.endsWith('/_next/image') && u.searchParams.get('url')){
      try{ return new URL(u.searchParams.get('url'), location.href).href; }catch(e){}
    }
    return u.href;
  }

  function bestFromSrcset(srcset){
    if(!srcset) return '';
    const parts = srcset.split(',').map(function(s){ return s.trim().split(/\s+/)[0]; }).filter(Boolean);
    return parts[parts.length - 1] || '';
  }

  function imageUrlOf(img){
    return unwrapImageUrl(
      img.currentSrc || img.getAttribute('src') || img.getAttribute('data-src') ||
      bestFromSrcset(img.getAttribute('srcset') || img.getAttribute('data-srcset'))
    );
  }

  function backgroundImageOf(el){
    const bg = getComputedStyle(el).backgroundImage;
    const m = bg && /url\(["']?(.*?)["']?\)/.exec(bg);
    return m ? unwrapImageUrl(m[1]) : '';
  }

  function findAvatar(card){
    // Largest visible image in the card is almost always the character portrait
    // (small ones are creator avatars, badges, icons).
    let best = '', bestArea = 0;
    card.querySelectorAll('img').forEach(function(img){
      const url = imageUrlOf(img);
      if(!url || /\.svg(\?|$)/i.test(url)) return;
      const r = img.getBoundingClientRect();
      const area = (r.width || img.naturalWidth || 1) * (r.height || img.naturalHeight || 1);
      if(area > bestArea){ best = url; bestArea = area; }
    });
    if(best) return best;
    const els = [card].concat(Array.from(card.querySelectorAll('div, span, figure')));
    for(const el of els){
      const url = backgroundImageOf(el);
      if(url) return url;
    }
    return '';
  }

  function firstText(card, selectors){
    for(const sel of selectors){
      if(!sel) continue;
      let el;
      try{ el = card.querySelector(sel); }catch(e){ continue; }
      const t = el && clean(el.innerText || el.textContent);
      if(t) return t;
    }
    return '';
  }

  function findName(card, link, platform){
    const fromSelectors = firstText(card, [
      platform.nameSelector,
      '[class*="name" i]:not([class*="user" i]):not([class*="creator" i]):not([class*="author" i])',
      '[class*="title" i]',
      'h1, h2, h3, h4, h5'
    ]);
    if(fromSelectors && fromSelectors.length <= 80) return fromSelectors;
    const img = card.querySelector('img[alt]');
    const alt = img && clean(img.getAttribute('alt'));
    if(alt && alt.length <= 80 && !/^(avatar|image|img|cover|picture)$/i.test(alt)) return alt;
    const title = clean(link.getAttribute('title') || link.getAttribute('aria-label'));
    if(title) return title;
    // Fall back to the first short line of visible text.
    const lines = String(card.innerText || '').split('\n').map(clean).filter(Boolean);
    return lines.find(function(l){ return l.length <= 60; }) || '';
  }

  function findDescription(card, name, platform){
    const fromSelectors = firstText(card, [
      platform.descriptionSelector,
      '[class*="desc" i]',
      '[class*="intro" i]',
      '[class*="bio" i]',
      '[class*="summary" i]',
      'p'
    ]);
    if(fromSelectors && fromSelectors !== name) return fromSelectors.slice(0, MAX_DESCRIPTION);
    // Otherwise the longest line of text that isn't the name or a stat like "12.3k".
    const lines = String(card.innerText || '').split('\n').map(clean).filter(function(l){
      return l && l !== name && l.length > 20;
    });
    lines.sort(function(a, b){ return b.length - a.length; });
    return (lines[0] || '').slice(0, MAX_DESCRIPTION);
  }

  function findTags(card, name){
    const seen = new Set();
    card.querySelectorAll('[class*="tag" i], [class*="chip" i], [class*="label" i]').forEach(function(el){
      // Only leaf-ish elements; a "tags" wrapper would give us all tags glued together.
      if(el.children.length > 1) return;
      const t = clean(el.innerText || el.textContent).replace(/^#/, '');
      if(t && t !== name && t.length <= 30 && !/^\d[\d.,]*[kKmM]?$/.test(t)) seen.add(t);
    });
    return Array.from(seen).slice(0, 15);
  }

  function metaContent(prop){
    const el = document.querySelector('meta[property="' + prop + '"], meta[name="' + prop + '"]');
    return el ? clean(el.getAttribute('content')) : '';
  }

  // When the tab is a single character's page, read it from the page head / heading.
  function scanCharacterPage(platform){
    const c = characterIdFromHref(location.href, platform);
    if(!c) return null;
    const name = clean((document.querySelector('h1') || {}).innerText) ||
      metaContent('og:title').split(/\s[|\-–]\s/)[0];
    if(!name) return null;
    return {
      id: c.id,
      url: c.url,
      name: name,
      description: metaContent('og:description') || metaContent('description'),
      avatarUrl: unwrapImageUrl(metaContent('og:image')),
      tags: []
    };
  }

  function scan(platformId){
    const platform = QA_PLATFORMS.PLATFORMS.find(function(p){ return p.id === platformId; });
    if(!platform) return { ok: false, error: 'Unsupported platform.' };

    const found = new Map();
    document.querySelectorAll('a[href]').forEach(function(link){
      const c = characterIdFromHref(link.getAttribute('href'), platform);
      if(!c) return;
      const card = findCard(link, c.id, platform);
      const name = findName(card, link, platform);
      const entry = {
        id: c.id,
        url: c.url,
        name: name,
        description: findDescription(card, name, platform),
        avatarUrl: findAvatar(card),
        tags: findTags(card, name)
      };
      // Cards often contain the same link twice (image + title); keep the richest result.
      const prev = found.get(c.id);
      if(!prev){ found.set(c.id, entry); return; }
      ['name', 'description', 'avatarUrl'].forEach(function(k){
        if((entry[k] || '').length > (prev[k] || '').length) prev[k] = entry[k];
      });
      if(entry.tags.length > prev.tags.length) prev.tags = entry.tags;
    });

    let characters = Array.from(found.values()).filter(function(c){ return c.name; });

    const self = scanCharacterPage(platform);
    if(self && !found.has(self.id)) characters.unshift(self);

    return { ok: true, pageUrl: location.href, characters: characters };
  }

  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    if(msg && msg.type === 'QA_SCAN'){
      try{ sendResponse(scan(msg.platformId)); }
      catch(e){ sendResponse({ ok: false, error: e.message }); }
    }
  });

  // Exposed for testing against saved pages.
  globalThis.__qaScan = scan;
})();
