/**
 * APPLE DESIGN SYSTEM · INTERACTION ENGINE
 * Bilingual Translation · Scrollytelling Stage · Cursor Sheen · Interactive Console
 * Author: Fatih (fth2745)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageEngine();
  initNavbarScroll();
  initScrollytelling();
  initCardSheen();
  initProjectFilters();
  initInteractiveTerminal();
});

/* ==========================================================================
   1. BILINGUAL TRANSLATION ENGINE (TR / EN)
   ========================================================================== */
function initLanguageEngine() {
  const langToggle = document.getElementById('langToggle');
  const langOpts = document.querySelectorAll('.lang-opt');
  const htmlTag = document.documentElement;

  // Read saved preference or detect system language
  const savedLang = localStorage.getItem('fth_portfolio_lang') || 'tr';
  applyLanguage(savedLang);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = htmlTag.getAttribute('data-lang') || 'tr';
      const target = current === 'tr' ? 'en' : 'tr';
      applyLanguage(target);
    });
  }

  function applyLanguage(lang) {
    htmlTag.setAttribute('data-lang', lang);
    htmlTag.setAttribute('lang', lang);
    localStorage.setItem('fth_portfolio_lang', lang);

    // Update Pill state
    langOpts.forEach(opt => {
      if (opt.getAttribute('data-value') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Translate all elements with data-tr / data-en
    const translatableElements = document.querySelectorAll('[data-tr][data-en]');
    translatableElements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        // If element contains only text or specific spans
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else if (el.querySelector('span:not(.btn-arrow)')) {
          const span = el.querySelector('span:not(.btn-arrow)');
          span.textContent = text;
        } else {
          el.textContent = text;
        }
      }
    });
  }
}

/* ==========================================================================
   2. NAVBAR BLUR & SCROLL STATE
   ========================================================================== */
function initNavbarScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. APPLE SCROLLYTELLING ENGINE (3D Exploded Stage)
   ========================================================================== */
function initScrollytelling() {
  const stage = document.getElementById('explodedStage');
  const narrativeCards = document.querySelectorAll('.narrative-card');
  const stepDots = document.querySelectorAll('.step-dot');
  const stageContainer = document.getElementById('stageContainer');

  if (!stage || narrativeCards.length === 0) return;

  // Set default step
  setStageStep(0);

  // IntersectionObserver for narrative cards
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0.3
  };

  const narrativeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const step = parseInt(entry.target.getAttribute('data-step-target') || '0', 10);
        setStageStep(step);

        narrativeCards.forEach(card => card.classList.remove('in-view'));
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  narrativeCards.forEach(card => narrativeObserver.observe(card));

  // Stepper dot manual controls
  stepDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const step = parseInt(dot.getAttribute('data-step') || '0', 10);
      setStageStep(step);

      // Smooth scroll to corresponding card
      const targetCard = document.querySelector(`.narrative-card[data-step-target="${step}"]`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  function setStageStep(stepIndex) {
    if (stageContainer) {
      stageContainer.setAttribute('data-active-step', stepIndex);
    }

    stepDots.forEach(d => {
      const dotStep = parseInt(d.getAttribute('data-step') || '0', 10);
      if (dotStep === stepIndex) {
        d.classList.add('active');
      } else {
        d.classList.remove('active');
      }
    });

    const layers = document.querySelectorAll('.stage-layer');
    layers.forEach(layer => {
      const lNum = parseInt(layer.getAttribute('data-layer') || '0', 10);
      if (stepIndex === 0 || lNum === stepIndex) {
        layer.classList.add('active');
      } else {
        layer.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   4. APPLE CARD SHEEN (Mouse Light Reflection)
   ========================================================================== */
function initCardSheen() {
  const cards = document.querySelectorAll('.project-card, .bento-box, .scrolly-visual-wrapper');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   5. PROJECT CATEGORY FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE TERMINAL CONSOLE
   ========================================================================== */
function initInteractiveTerminal() {
  const termBody = document.getElementById('termBody');
  const termInput = document.getElementById('termInput');
  const quickPills = document.querySelectorAll('.t-pill');

  if (!termInput || !termBody) return;

  const commands = {
    help: () => [
      'Available commands:',
      '  <span class="accent-cyan">projects</span>    - List prioritized open-source systems',
      '  <span class="accent-cyan">stats</span>       - Display system precision & telemetry stats',
      '  <span class="accent-cyan">stack</span>       - Neural architectures & native toolsets',
      '  <span class="accent-cyan">contact</span>     - Reach out via email or GitHub',
      '  <span class="accent-cyan">clear</span>       - Clear console screen'
    ],
    projects: () => [
      '1. <a href="https://github.com/fth2745/NLI-Classification" target="_blank" style="color:#00f2fe">NLI-Classification</a> (DeBERTa + SBERT Co-Attention)',
      '2. <a href="https://github.com/fth2745/Squad-V2-QA" target="_blank" style="color:#00f2fe">Squad-V2-QA</a> (DeBERTa Extractive SQuAD v2)',
      '3. <a href="https://github.com/fth2745/Turkish-NER" target="_blank" style="color:#00f2fe">Turkish-NER</a> (BERT + BiLSTM Multi-Task)',
      '4. <a href="https://github.com/fth2745/TSummarized-Finish" target="_blank" style="color:#00f2fe">TSummarized-Finish</a> (Google UMT5 Summarization)',
      '5. <a href="https://github.com/fth2745/Multi-Modal-Fusion" target="_blank" style="color:#00f2fe">Multi-Modal-Fusion</a> (Vision + Text Intermediate Fusion)',
      '6. <a href="https://github.com/fth2745/EffiToRag" target="_blank" style="color:#00f2fe">EffiToRag</a> (99.13% Accuracy Decision System)',
      '7. <a href="https://github.com/fth2745/Turkish-Hospital-Medicals-Articles-With-RAG-Mistral-7B" target="_blank" style="color:#00f2fe">Medical-RAG-Mistral</a> (Clinical FAISS RAG)',
      '8. <a href="https://github.com/fth2745/TrayHardwareMonitor" target="_blank" style="color:#00f2fe">TrayHardwareMonitor</a> (Native C# .NET 8, 60 FPS)'
    ],
    stats: () => [
      'SYSTEM TELEMETRY:',
      '  EffiToRag Precision      : 99.13% verified',
      '  TrayHardwareMonitor Latency: < 0.1ms render cycle',
      '  CPU Overhead             : ~0.08% idle, 60 FPS UI',
      '  Open Source Systems     : 8 Active repositories'
    ],
    stack: () => [
      'TECHNOLOGY STACK:',
      '  AI & Deep Learning : PyTorch, Hugging Face, Transformers, DeBERTa, SBERT, UMT5, Mistral, Qwen',
      '  Vector & RAG       : FAISS, Cosine Similarity, Dense Embeddings, LangChain',
      '  Systems & Native   : C# .NET 8, WinForms, Win32 API, LibreHardwareMonitor, Multi-threading'
    ],
    contact: () => [
      'GET IN TOUCH:',
      '  Email  : <a href="mailto:kya.fth10@gmail.com" style="color:#2997ff">kya.fth10@gmail.com</a>',
      '  GitHub : <a href="https://github.com/fth2745" target="_blank" style="color:#2997ff">github.com/fth2745</a>'
    ],
    clear: () => {
      termBody.querySelectorAll('.term-line:not(:first-child)').forEach(el => el.remove());
      return null;
    }
  };

  function executeCommand(cmdStr) {
    const raw = cmdStr.trim().toLowerCase();
    if (!raw) return;

    // Print command line
    const cmdEcho = document.createElement('div');
    cmdEcho.className = 'term-line';
    cmdEcho.innerHTML = `<span class="term-prompt">fth2745 $</span> <span style="color:#ffffff">${escapeHtml(raw)}</span>`;
    
    // Insert before input row
    const inputRow = document.querySelector('.term-input-row');
    termBody.insertBefore(cmdEcho, inputRow);

    if (commands[raw]) {
      const outputLines = commands[raw]();
      if (outputLines) {
        outputLines.forEach(line => {
          const outEl = document.createElement('div');
          outEl.className = 'term-line output';
          outEl.innerHTML = line;
          termBody.insertBefore(outEl, inputRow);
        });
      }
    } else {
      const errEl = document.createElement('div');
      errEl.className = 'term-line output';
      errEl.innerHTML = `<span style="color:#ff5f56">zsh: command not found: ${escapeHtml(raw)}</span>. Type <span class="cmd-highlight">help</span> for available commands.`;
      termBody.insertBefore(errEl, inputRow);
    }

    termBody.scrollTop = termBody.scrollHeight;
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value;
      termInput.value = '';
      executeCommand(val);
    }
  });

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-run');
      if (cmd) executeCommand(cmd);
    });
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
