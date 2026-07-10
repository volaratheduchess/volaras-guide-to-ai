(function(){
  "use strict";

  var TREE = window.SITE_DATA || [];
  var QUIZZES = window.QUIZZES || {};
  var PLATFORMS = window.PLATFORMS || [];
  var PLATFORMS_SLUG = 'ai-art-resources-list-of-platforms';
  var WIZARD_SLUG = 'making-chatbots-bot-type-wizard';

  var STORE_KEY = 'volara-guide-progress-v2';
  var state = loadState();

  function loadState(){
    try{
      var raw = localStorage.getItem(STORE_KEY);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return { read: {}, quiz: {} };
  }
  function saveState(){
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){}
  }

  // ---------- index ----------
  var bySlug = {};
  var flatOrder = [];
  var iconFor = { 'Making Chatbots': '\u270E', 'AI Art Resources': '\u2726', 'Advice from Creators': '\u275D' };

  TREE.forEach(function(section){
    section.children = section.children || [];
    section.isSection = true;
    bySlug[section.slug] = section;
    flatOrder.push(section.slug);
    section.children.forEach(function(page){
      page.section = section;
      bySlug[page.slug] = page;
      flatOrder.push(page.slug);
    });
  });

  function textOf(html){
    var d = document.createElement('div');
    d.innerHTML = html || '';
    return d.textContent || '';
  }

  var searchIndex = flatOrder.map(function(slug){
    var p = bySlug[slug];
    return { slug: slug, title: p.title, text: (p.title + ' ' + textOf(p.html)).toLowerCase() };
  });

  function escapeHTML(s){
    return (s||'').replace(/[&<>"']/g, function(m){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
    });
  }
  function cssEsc(s){ return s.replace(/"/g, '\\"'); }

  // ---------- DOM refs ----------
  var navEl = document.getElementById('nav-tree');
  var rightPanel = document.getElementById('right-panel');
  var searchInput = document.getElementById('search-input');
  var progressReadEl = document.getElementById('progress-read');
  var progressBarEl = document.getElementById('progress-bar-fill');
  var progressQuizEl = document.getElementById('progress-quiz');
  var navOverlay = document.getElementById('nav-overlay');
  var menuBtn = document.getElementById('menu-btn');
  var closeBtn = document.getElementById('close-btn');
  var brandMark = document.getElementById('brand-mark');

  var crumbEl = document.getElementById('crumb');
  var topicNumEl = document.getElementById('topic-num');
  var topicTitleEl = document.getElementById('topic-title');
  var progFillEl = document.getElementById('prog-fill');
  var progLabelEl = document.getElementById('prog-label');

  var totalQuizzes = Object.keys(QUIZZES).length;

  function updateProgress(){
    var readCount = Object.keys(state.read).filter(function(k){ return state.read[k]; }).length;
    var total = flatOrder.length;
    progressReadEl.textContent = readCount + ' / ' + total + ' read';
    progressBarEl.style.width = (total ? (readCount/total*100) : 0) + '%';
    var quizPassed = Object.keys(state.quiz).filter(function(k){ return state.quiz[k]; }).length;
    progressQuizEl.textContent = quizPassed + ' / ' + totalQuizzes + ' quizzes passed';
  }

  // ---------- nav tree rendering (flat pages under each section, grouped by label) ----------
  function buildTree(){
    var wrap = document.createElement('div');
    TREE.forEach(function(section){
      var secNode = document.createElement('div');
      secNode.className = 'tree-node depth-0' + (state.read[section.slug] ? ' read' : '');
      secNode.dataset.slug = section.slug;

      var label = document.createElement('div');
      label.className = 'node-label';
      var caret = document.createElement('span');
      caret.className = 'caret'; caret.textContent = '\u25B8';
      var titleSpan = document.createElement('span');
      titleSpan.textContent = (iconFor[section.title] || '') + ' ' + section.title;
      var check = document.createElement('span'); check.className = 'check';
      label.appendChild(caret); label.appendChild(titleSpan); label.appendChild(check);
      label.addEventListener('click', function(e){
        e.stopPropagation();
        renderPage(section.slug);
        secNode.classList.toggle('expanded');
        closeDrawer();
      });
      secNode.appendChild(label);

      var childWrap = document.createElement('div');
      childWrap.className = 'tree-children';
      var lastGroup = undefined;
      section.children.forEach(function(page){
        if(page.group && page.group !== lastGroup){
          var divider = document.createElement('div');
          divider.className = 'group-divider';
          divider.textContent = page.group;
          childWrap.appendChild(divider);
        }
        lastGroup = page.group || null;

        var pNode = document.createElement('div');
        pNode.className = 'tree-node depth-1' + (state.read[page.slug] ? ' read' : '');
        pNode.dataset.slug = page.slug;
        var pLabel = document.createElement('div');
        pLabel.className = 'node-label';
        var pCaret = document.createElement('span'); pCaret.className = 'caret';
        var pTitle = document.createElement('span'); pTitle.textContent = page.title;
        var pCheck = document.createElement('span'); pCheck.className = 'check';
        pLabel.appendChild(pCaret); pLabel.appendChild(pTitle); pLabel.appendChild(pCheck);
        pLabel.addEventListener('click', function(e){
          e.stopPropagation();
          renderPage(page.slug);
          closeDrawer();
        });
        pNode.appendChild(pLabel);
        childWrap.appendChild(pNode);
      });
      secNode.appendChild(childWrap);
      wrap.appendChild(secNode);
    });
    return wrap;
  }
  navEl.appendChild(buildTree());

  function expandToSlug(slug){
    var p = bySlug[slug];
    if(!p) return;
    var secSlug = p.isSection ? p.slug : p.section.slug;
    var el = navEl.querySelector('.tree-node[data-slug="'+cssEsc(secSlug)+'"]');
    if(el) el.classList.add('expanded');
  }
  function highlightActive(slug){
    var all = navEl.querySelectorAll('.tree-node');
    all.forEach(function(n){ n.classList.remove('active'); });
    if(!slug) return;
    var el = navEl.querySelector('.tree-node[data-slug="'+cssEsc(slug)+'"]');
    if(el) el.classList.add('active');
  }
  function refreshReadMarks(){
    var all = navEl.querySelectorAll('.tree-node');
    all.forEach(function(n){
      var s = n.dataset.slug;
      n.classList.toggle('read', !!state.read[s]);
    });
  }

  // ---------- left panel ----------
  function paintLeftPanel(opts){
    crumbEl.textContent = opts.crumb || '';
    topicNumEl.textContent = opts.num || '';
    topicTitleEl.textContent = opts.title || '';
    progFillEl.style.width = opts.pct + '%';
    progLabelEl.textContent = opts.label || '';
  }

  // ---------- pager ----------
  function renderPager(slug){
    var idx = flatOrder.indexOf(slug);
    var wrap = document.createElement('div');
    wrap.className = 'pager';
    if(idx > 0){
      var prevSlug = flatOrder[idx-1];
      var a1 = document.createElement('a');
      a1.href = '#'; a1.textContent = '\u2190 ' + bySlug[prevSlug].title;
      a1.addEventListener('click', function(e){ e.preventDefault(); renderPage(prevSlug); rightPanel.scrollTop = 0; });
      wrap.appendChild(a1);
    } else { wrap.appendChild(document.createElement('span')); }
    if(idx < flatOrder.length - 1){
      var nextSlug = flatOrder[idx+1];
      var a2 = document.createElement('a');
      a2.href = '#'; a2.className = 'to';
      a2.textContent = bySlug[nextSlug].title + ' \u2192';
      a2.addEventListener('click', function(e){ e.preventDefault(); renderPage(nextSlug); rightPanel.scrollTop = 0; });
      wrap.appendChild(a2);
    }
    return wrap;
  }

  // ---------- quiz rendering ----------
  function renderQuiz(slug){
    var quiz = QUIZZES[slug];
    if(!quiz) return null;
    var box = document.createElement('div');
    box.className = 'quiz';
    var h3 = document.createElement('h3'); h3.textContent = quiz.title;
    box.appendChild(h3);
    var sub = document.createElement('div'); sub.className = 'quiz-sub';
    sub.textContent = 'Answer all questions to mark this quiz passed.';
    box.appendChild(sub);

    var correctCount = 0;
    var answeredCount = 0;

    quiz.questions.forEach(function(q, qi){
      var qWrap = document.createElement('div'); qWrap.className = 'quiz-q';
      var qt = document.createElement('div'); qt.className = 'qtext';
      qt.textContent = (qi+1) + '. ' + q.q;
      qWrap.appendChild(qt);

      var explain = document.createElement('div'); explain.className = 'quiz-explain';
      explain.textContent = q.explain;

      q.options.forEach(function(opt, oi){
        var btn = document.createElement('button');
        btn.className = 'quiz-opt';
        btn.textContent = opt;
        btn.addEventListener('click', function(){
          if(qWrap.dataset.answered) return;
          qWrap.dataset.answered = '1';
          var allBtns = qWrap.querySelectorAll('.quiz-opt');
          allBtns.forEach(function(b, bi){
            b.setAttribute('disabled','disabled');
            if(bi === q.answer) b.classList.add('correct');
            else if(bi === oi) b.classList.add('incorrect');
          });
          explain.classList.add('show');
          answeredCount++;
          if(oi === q.answer) correctCount++;
          if(answeredCount === quiz.questions.length){
            var passed = correctCount === quiz.questions.length;
            state.quiz[slug] = passed;
            saveState();
            updateProgress();
            resultEl.textContent = passed
              ? '\u2713 Quiz passed \u2014 nice work!'
              : 'You got ' + correctCount + '/' + quiz.questions.length + ' correct. Try again?';
            resultEl.classList.add('show');
            retryBtn.classList.add('show');
          }
        });
        qWrap.appendChild(btn);
      });
      qWrap.appendChild(explain);
      box.appendChild(qWrap);
    });

    var resultEl = document.createElement('div'); resultEl.className = 'quiz-result';
    box.appendChild(resultEl);
    var retryBtn = document.createElement('button'); retryBtn.className = 'quiz-retry'; retryBtn.textContent = 'Retry quiz';
    retryBtn.addEventListener('click', function(){ renderPage(slug); });
    box.appendChild(retryBtn);

    if(state.quiz[slug]){
      resultEl.textContent = '\u2713 Already passed \u2014 retry anytime.';
      resultEl.classList.add('show');
      retryBtn.classList.add('show');
    }
    return box;
  }

  // ---------- platform directory ----------
  function renderPlatformDirectory(){
    var wrap = document.createElement('div');
    var intro = document.createElement('div');
    intro.className = 'content';
    intro.innerHTML = textOf(bySlug[PLATFORMS_SLUG].html) ? bySlug[PLATFORMS_SLUG].html : '<p>An interactive directory of AI art platforms mentioned in the guide.</p>';
    wrap.appendChild(intro);

    var controls = document.createElement('div');
    controls.className = 'dir-controls';
    var searchBox = document.createElement('input');
    searchBox.type = 'text'; searchBox.placeholder = 'Search platforms\u2026';
    controls.appendChild(searchBox);
    var filterAll = document.createElement('button'); filterAll.className = 'dir-filter-btn active'; filterAll.textContent = 'All';
    var filterWeb = document.createElement('button'); filterWeb.className = 'dir-filter-btn'; filterWeb.textContent = 'Web platform';
    var filterLocal = document.createElement('button'); filterLocal.className = 'dir-filter-btn'; filterLocal.textContent = 'Local install';
    [filterAll, filterWeb, filterLocal].forEach(function(b){ controls.appendChild(b); });
    wrap.appendChild(controls);

    var grid = document.createElement('div'); grid.className = 'dir-grid';
    wrap.appendChild(grid);

    var note = document.createElement('div'); note.className = 'dir-note';
    note.textContent = 'Names and links come from the guide itself. "Local install" / "Web platform" tags are general public knowledge about these tools, not claims from the guide\u2019s text \u2014 always check each site\u2019s own terms before using it.';
    wrap.appendChild(note);

    var activeFilter = 'All';
    function draw(){
      var q = searchBox.value.trim().toLowerCase();
      grid.innerHTML = '';
      PLATFORMS.filter(function(pl){
        if(activeFilter !== 'All' && pl.type !== activeFilter) return false;
        if(q && pl.title.toLowerCase().indexOf(q) === -1) return false;
        return true;
      }).forEach(function(pl){
        var card = document.createElement('div'); card.className = 'dir-card';
        var thumb = document.createElement('div'); thumb.className = 'thumb';
        if(pl.cover){
          var img = document.createElement('img'); img.src = pl.cover; img.alt = pl.title;
          thumb.appendChild(img);
        } else {
          var fb = document.createElement('div'); fb.className = 'fallback'; fb.textContent = pl.title.slice(0,2).toUpperCase();
          thumb.appendChild(fb);
        }
        card.appendChild(thumb);
        var body = document.createElement('div'); body.className = 'body';
        var name = document.createElement('div'); name.className = 'name'; name.textContent = pl.title;
        var tag = document.createElement('div'); tag.className = 'tag'; tag.textContent = pl.type;
        body.appendChild(name); body.appendChild(tag);
        if(pl.desc){
          var d = document.createElement('div'); d.className = 'desc'; d.textContent = pl.desc;
          body.appendChild(d);
        }
        if(pl.href){
          var visit = document.createElement('a'); visit.className = 'visit'; visit.href = pl.href;
          visit.target = '_blank'; visit.rel = 'noopener noreferrer'; visit.textContent = 'Visit site \u2192';
          body.appendChild(visit);
        }
        card.appendChild(body);
        grid.appendChild(card);
      });
    }
    searchBox.addEventListener('input', draw);
    [filterAll, filterWeb, filterLocal].forEach(function(b){
      b.addEventListener('click', function(){
        [filterAll, filterWeb, filterLocal].forEach(function(x){ x.classList.remove('active'); });
        b.classList.add('active');
        activeFilter = b.textContent;
        draw();
      });
    });
    draw();
    return wrap;
  }

  // ---------- decision tree wizard ----------
  var WIZARD_TREE = [
    {
      label: 'Romance-focused',
      children: [
        {
          label: 'Pure / sweet romance',
          result: {
            blurb: 'Lean into warmth, security, and affection that\u2019s earned rather than declared up front.',
            links: ['making-chatbots-healthy-romance', 'making-chatbots-flirting-naturally', 'making-chatbots-avoiding-instant-love']
          }
        },
        {
          label: 'Dark romance',
          children: [
            {
              label: 'Possession / yandere themes',
              result: {
                blurb: 'Devotion and danger in the same breath \u2014 the craft challenge is making both feel real at once.',
                links: ['making-chatbots-yandere', 'making-chatbots-avoiding-instant-love']
              }
            },
            {
              label: 'Rivalry & intensity',
              result: {
                blurb: 'Antagonism that\u2019s really two equals sizing each other up.',
                links: ['making-chatbots-rivals-to-lovers']
              }
            },
            {
              label: 'Protective & high-stakes',
              result: {
                blurb: 'A reason to protect that\u2019s specific, not generic \u2014 and edges enough to feel dangerous when needed.',
                links: ['making-chatbots-protective-dynamics']
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Slow-building connection',
      children: [
        {
          label: 'Friends who catch feelings',
          result: {
            blurb: 'Built on established history \u2014 in-jokes, comfort, and a shift that feels like a risk.',
            links: ['making-chatbots-friends-to-lovers', 'making-chatbots-avoiding-instant-love']
          }
        },
        {
          label: 'Long, patient burn',
          result: {
            blurb: 'Withholding as a craft tool \u2014 what the bot doesn\u2019t say matters as much as what it does.',
            links: ['making-chatbots-slow-burn', 'making-chatbots-avoiding-instant-love']
          }
        }
      ]
    },
    {
      label: 'Banter & comedy',
      result: {
        blurb: 'Deflection, teasing, and a mismatch between what\u2019s said and what\u2019s felt.',
        links: ['making-chatbots-tsundere', 'making-chatbots-flirting-naturally']
      }
    },
    {
      label: 'Multiple characters or a bigger world',
      result: {
        blurb: 'Precoding a cast, cycling NPCs, or running a tracked scenario \u2014 the technical side of bigger bots.',
        links: ['making-chatbots-bot-creation-multi-bots', 'making-chatbots-bot-creation-rpg-bots-and-trackers']
      }
    },
    {
      label: 'Just the basics first',
      result: {
        blurb: 'Start here \u2014 identity, formatting, and a portable save file before anything fancier.',
        links: ['making-chatbots-bot-creation-writing-personality', 'making-chatbots-bot-creation-bot-personality-formatting', 'making-chatbots-json']
      }
    }
  ];

  function renderDecisionTree(){
    var wrap = document.createElement('div');
    wrap.className = 'wizard';

    var stepsEl = document.createElement('div');
    stepsEl.className = 'wizard-steps';
    var resultEl = document.createElement('div');
    resultEl.className = 'wizard-result';
    wrap.appendChild(stepsEl);
    wrap.appendChild(resultEl);

    function renderStep(options, path){
      var stepEl = document.createElement('div');
      stepEl.className = 'wizard-step';

      var label = document.createElement('div');
      label.className = 'wizard-q';
      label.textContent = path.length === 0 ? 'I want to make a bot that\u2019s\u2026' : path[path.length - 1] + ' \u2014 more specifically\u2026';
      stepEl.appendChild(label);

      var btnRow = document.createElement('div');
      btnRow.className = 'wizard-opts';
      options.forEach(function(opt){
        var btn = document.createElement('button');
        btn.className = 'wizard-opt';
        btn.textContent = opt.label;
        btn.addEventListener('click', function(){
          var after = stepEl.nextSibling;
          while(after){ var toRemove = after; after = after.nextSibling; toRemove.remove(); }
          resultEl.innerHTML = '';
          btnRow.querySelectorAll('.wizard-opt').forEach(function(b){ b.classList.remove('active'); });
          btn.classList.add('active');

          if(opt.children){
            stepsEl.appendChild(renderStep(opt.children, path.concat([opt.label])));
          } else if(opt.result){
            resultEl.innerHTML = '';
            var card = document.createElement('div');
            card.className = 'wizard-result-card';
            var t = document.createElement('div'); t.className = 't'; t.textContent = opt.label;
            var d = document.createElement('div'); d.className = 'd'; d.textContent = opt.result.blurb;
            card.appendChild(t); card.appendChild(d);
            var linkWrap = document.createElement('div'); linkWrap.className = 'wizard-links';
            opt.result.links.forEach(function(slug){
              var p = bySlug[slug];
              if(!p) return;
              var a = document.createElement('button');
              a.className = 'wizard-link';
              a.textContent = p.title + ' \u2192';
              a.addEventListener('click', function(){ renderPage(slug); rightPanel.scrollTop = 0; });
              linkWrap.appendChild(a);
            });
            card.appendChild(linkWrap);
            resultEl.appendChild(card);
          }
        });
        btnRow.appendChild(btn);
      });
      stepEl.appendChild(btnRow);
      return stepEl;
    }

    stepsEl.appendChild(renderStep(WIZARD_TREE, []));
    return wrap;
  }

  // ---------- section landing (no card grid — just intro + group list as plain text) ----------
  function renderSectionLanding(section){
    var wrap = document.createElement('div');
    var groups = [];
    section.children.forEach(function(c){
      var g = c.group || null;
      if(g && groups.indexOf(g) === -1) groups.push(g);
    });
    var hint = document.createElement('p');
    hint.style.cssText = 'font-size:12.5px; color:var(--text-faint); margin-top:26px;';
    hint.textContent = groups.length
      ? 'Covers: ' + groups.join(' \u00b7 ') + '. Open the menu (\u2630) to jump to any topic.'
      : 'Open the menu (\u2630) to jump to any topic.';
    wrap.appendChild(hint);
    return wrap;
  }

  // ---------- main render ----------
  function renderPage(slug){
    var p = bySlug[slug];
    if(!p) return renderHome();

    var isSection = !!p.isSection;
    var section = isSection ? p : p.section;
    var siblingList = section.children.map(function(c){ return c.slug; });
    var readInSection = siblingList.filter(function(s){ return state.read[s]; }).length;

    if(isSection){
      paintLeftPanel({
        crumb: 'Section',
        num: siblingList.length + ' topics',
        title: p.title,
        pct: siblingList.length ? (readInSection/siblingList.length*100) : 0,
        label: readInSection + ' / ' + siblingList.length + ' read in this section'
      });
    } else {
      var idx = siblingList.indexOf(slug) + 1;
      paintLeftPanel({
        crumb: section.title + (p.group ? ' \u00b7 ' + p.group : ''),
        num: 'Topic ' + String(idx).padStart(2,'0') + ' of ' + siblingList.length,
        title: p.title,
        pct: siblingList.length ? (readInSection/siblingList.length*100) : 0,
        label: readInSection + ' / ' + siblingList.length + ' read in ' + section.title
      });
    }

    rightPanel.innerHTML = '';
    var col = document.createElement('div');
    col.className = 'content-col';

    var markRow = document.createElement('div');
    markRow.className = 'mark-read-row';
    var btn = document.createElement('button');
    function paintBtn(){
      btn.textContent = state.read[slug] ? '\u2713 Marked as read' : 'Mark as read';
      btn.className = state.read[slug] ? 'on' : '';
    }
    paintBtn();
    btn.addEventListener('click', function(){
      state.read[slug] = !state.read[slug];
      saveState();
      paintBtn();
      updateProgress();
      refreshReadMarks();
      var freshRead = siblingList.filter(function(s){ return state.read[s]; }).length;
      progFillEl.style.width = (siblingList.length ? (freshRead/siblingList.length*100) : 0) + '%';
      progLabelEl.textContent = freshRead + ' / ' + siblingList.length + ' read in ' + section.title;
    });
    markRow.appendChild(btn);
    col.appendChild(markRow);

    if(slug === PLATFORMS_SLUG){
      col.appendChild(renderPlatformDirectory());
    } else if(slug === WIZARD_SLUG){
      var wizIntro = document.createElement('div');
      wizIntro.className = 'content';
      wizIntro.innerHTML = p.html || '';
      col.appendChild(wizIntro);
      col.appendChild(renderDecisionTree());
    } else {
      var content = document.createElement('div');
      content.className = 'content';
      content.innerHTML = p.html || '<p><em>No written content on this page.</em></p>';
      col.appendChild(content);

      if(isSection){
        col.appendChild(renderSectionLanding(p));
      }

      var quiz = renderQuiz(slug);
      if(quiz) col.appendChild(quiz);
    }

    col.appendChild(renderPager(slug));
    rightPanel.appendChild(col);

    col.addEventListener('click', function(e){
      var a = e.target.closest ? e.target.closest('a') : null;
      if(!a) return;
      var href = a.getAttribute('href') || '';
      if(href.charAt(0) === '#' && bySlug[href.slice(1)]){
        e.preventDefault();
        renderPage(href.slice(1));
        rightPanel.scrollTop = 0;
      }
    });

    expandToSlug(slug);
    highlightActive(slug);
    try{ history.replaceState(null, '', '#' + slug); }catch(e){}
  }

  // ---------- home ----------
  function renderHome(){
    var readCount = Object.keys(state.read).filter(function(k){ return state.read[k]; }).length;
    var total = flatOrder.length;
    paintLeftPanel({
      crumb: 'An interactive companion',
      num: readCount + ' / ' + total + ' read overall',
      title: "Volara's Guide",
      pct: total ? (readCount/total*100) : 0,
      label: 'Making chatbots \u00b7 AI art'
    });

    rightPanel.innerHTML = '';
    var col = document.createElement('div');
    col.className = 'content-col';

    var note = document.createElement('div');
    note.className = 'home-note';
    note.innerHTML = 'Written and researched by Volara, independently, through personal experience and testing \u2014 not an official or exhaustive resource. ' +
      'Information may drift out of date (pricing, features, site names) \u2014 always double-check on the platform itself. ' +
      'This guide is Volara\u2019s own work: please don\u2019t copy or repost it without credit and a link back to the original.';
    col.appendChild(note);

    var sections = document.createElement('div');
    sections.className = 'home-sections';
    TREE.forEach(function(sec){
      var card = document.createElement('div');
      card.className = 'home-section-card';
      card.innerHTML = '<div class="ic">' + (iconFor[sec.title] || '\u2022') + '</div>' +
        '<h2>' + escapeHTML(sec.title) + '</h2>' +
        '<p>' + sec.children.length + ' topics to explore.</p>';
      card.addEventListener('click', function(){ renderPage(sec.slug); });
      sections.appendChild(card);
    });
    col.appendChild(sections);
    rightPanel.appendChild(col);

    highlightActive(null);
    try{ history.replaceState(null, '', '#'); }catch(e){}
  }

  // ---------- search ----------
  searchInput.addEventListener('input', function(){
    var q = searchInput.value.trim().toLowerCase();
    var allNodes = navEl.querySelectorAll('.tree-node');
    var allDividers = navEl.querySelectorAll('.group-divider');
    if(!q){
      allNodes.forEach(function(n){ n.style.display = ''; });
      allDividers.forEach(function(d){ d.style.display = ''; });
      return;
    }
    var matchSlugs = {};
    searchIndex.forEach(function(item){
      if(item.text.indexOf(q) !== -1){
        matchSlugs[item.slug] = true;
        var p = bySlug[item.slug];
        if(!p.isSection) matchSlugs[p.section.slug] = true;
      }
    });
    allNodes.forEach(function(n){
      var s = n.dataset.slug;
      var show = matchSlugs[s];
      n.style.display = show ? '' : 'none';
      if(show && bySlug[s].isSection) n.classList.add('expanded');
    });
    allDividers.forEach(function(d){ d.style.display = 'none'; });
  });

  // ---------- drawer open/close ----------
  function openDrawer(){ navOverlay.classList.add('show'); }
  function closeDrawer(){ navOverlay.classList.remove('show'); }
  menuBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  navOverlay.addEventListener('click', function(e){ if(e.target === navOverlay) closeDrawer(); });
  brandMark.addEventListener('click', function(){ renderHome(); closeDrawer(); });

  // ---------- init ----------
  updateProgress();
  refreshReadMarks();
  var initSlug = location.hash ? location.hash.slice(1) : '';
  if(initSlug && bySlug[initSlug]) renderPage(initSlug);
  else renderHome();

})();
