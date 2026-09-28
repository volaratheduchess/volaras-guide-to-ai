// platforms.js — the five supported platforms and how to recognise their pages.
// Loaded by the popup (to detect the current tab) and injected alongside content.js
// (to find character links). Plain script, no modules, so both contexts can use it.
//
// If a platform changes its URLs, this is the only file you should need to edit:
//   hosts          — hostnames the extension activates on (subdomains like www. match too)
//   characterPath  — regex run against a link's pathname; group 1 must be the character's ID
//   cardSelector   — optional CSS selector for a character card, if the generic
//                    "climb up from the link" heuristic in content.js picks the wrong box
//   nameSelector / descriptionSelector — optional, searched inside the card first

(function(){
  // Most platforms use /character/<id> or similar; this is the fallback pattern.
  // It deliberately does not match /user/ or /creator/ links (profile pages).
  const GENERIC_CHARACTER_PATH = /\/(?:characters?|bots?|companions?|chars?)\/([A-Za-z0-9_-]{4,})\/?$/i;

  const PLATFORMS = [
    {
      id: 'crushon',
      label: 'Crushon.AI',
      hosts: ['crushon.ai'],
      // e.g. /en/character/3f0c2b9e-1d2a-4c55-9a0e-6c8f1f3b7d21 (locale prefix optional)
      characterPath: /^(?:\/[a-z]{2}(?:-[A-Za-z]{2,4})?)?\/character\/([A-Za-z0-9-]{8,})\/?$/
    },
    {
      id: 'craveu',
      label: 'CraveU',
      hosts: ['craveu.ai'],
      characterPath: GENERIC_CHARACTER_PATH
    },
    {
      id: 'linkinlove',
      label: 'Linkin.love',
      hosts: ['linkin.love'],
      characterPath: GENERIC_CHARACTER_PATH
    },
    {
      id: 'saucepan',
      label: 'Saucepan',
      hosts: ['saucepan.ai'],
      characterPath: GENERIC_CHARACTER_PATH
    },
    {
      id: 'tipsychat',
      label: 'TipsyChat',
      hosts: ['tipsychat.com'],
      characterPath: GENERIC_CHARACTER_PATH
    }
  ];

  function hostMatches(hostname, host){
    hostname = String(hostname || '').toLowerCase();
    return hostname === host || hostname.endsWith('.' + host);
  }

  function detectPlatform(url){
    let u;
    try{ u = new URL(url); }catch(e){ return null; }
    if(u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    return PLATFORMS.find(function(p){
      return p.hosts.some(function(h){ return hostMatches(u.hostname, h); });
    }) || null;
  }

  globalThis.QA_PLATFORMS = { PLATFORMS: PLATFORMS, detectPlatform: detectPlatform, hostMatches: hostMatches };
})();
