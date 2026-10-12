/**
 * APPLE DESIGN SYSTEM · INTERACTION ENGINE
 * Refined Edition · Poised Hero · Dynamic Looping Ticker · In-Place Studio · Bento Grid
 * Author: Fatih (fth2745)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageEngine();
  initNavbarScroll();
  initHeroTicker();
  initArchitectureStudio();
  initCardSheen();
  initProjectFilters();
  initInteractiveTerminal();
});

/* ==========================================================================
   1. BILINGUAL TRANSLATION ENGINE (TR / EN)
   ========================================================================== */
let currentLang = 'tr';

function initLanguageEngine() {
  const langToggle = document.getElementById('langToggle');
  const langOpts = document.querySelectorAll('.lang-opt');
  const htmlTag = document.documentElement;

  // Read saved preference or detect system language
  currentLang = localStorage.getItem('fth_portfolio_lang') || 'tr';
  applyLanguage(currentLang);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'tr' ? 'en' : 'tr';
      applyLanguage(currentLang);
    });
  }

  function applyLanguage(lang) {
    currentLang = lang;
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

    // Update current ticker slide content for language
    if (window.renderTickerSlide) {
      window.renderTickerSlide();
    }
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
   3. DYNAMIC HERO METRICS TICKER (Looping across 8 Projects with Fade)
   ========================================================================== */
function initHeroTicker() {
  const tickerCard = document.getElementById('heroTickerCard');
  const tickerCounter = document.getElementById('tickerCounter');
  const dotsContainer = document.getElementById('tickerNavDots');
  const wrapper = document.querySelector('.hero-ticker-wrapper');

  if (!tickerCard || !dotsContainer) return;

  const tickerData = [
    {
      index: "01",
      name: "CoAttentionNLI",
      tag: "SBERT · DeBERTa-v3",
      m1Val: "0.98", m1Tr: "Entailment Skoru", m1En: "Entailment Score",
      m2Val: "Cross-Attn", m2Tr: "Müfredat Eğitimi", m2En: "Curriculum Learning",
      m3Val: "PyTorch", m3Tr: "BiLSTM Hibrit", m3En: "BiLSTM Hybrid"
    },
    {
      index: "02",
      name: "Squad-V2-QA",
      tag: "DeBERTa · SQuAD 2.0",
      m1Val: "0.99", m1Tr: "Yanıtlanabilirlik", m1En: "Answerability",
      m2Val: "Span [38:51]", m2Tr: "Metin Aralığı", m2En: "Extractive Span",
      m3Val: "Dual Head", m3Tr: "Ortak Sınıflandırıcı", m3En: "Joint Classifier"
    },
    {
      index: "03",
      name: "Turkish-NER",
      tag: "BERTurk + BiLSTM",
      m1Val: "0.941", m1Tr: "F1 Başarımı", m1En: "F1-Score",
      m2Val: "BIO-Tags", m2Tr: "PER / LOC / ORG", m2En: "PER / LOC / ORG",
      m3Val: "CRF Head", m3Tr: "Sıralı Kodlayıcı", m3En: "Sequence Decoder"
    },
    {
      index: "04",
      name: "TSummarized-Finish",
      tag: "Google UMT5",
      m1Val: "42.8", m1Tr: "ROUGE-1 Skoru", m1En: "ROUGE-1 Score",
      m2Val: "Live HF", m2Tr: "Hugging Face Hub", m2En: "Hugging Face Hub",
      m3Val: "Seq2Seq", m3Tr: "Soyutlamalı Özet", m3En: "Abstractive Summary"
    },
    {
      index: "05",
      name: "Multi-Modal-Fusion",
      tag: "ViT + BERT Tensor",
      m1Val: "%93.4", m1Tr: "Ortak Doğruluk", m1En: "Joint Accuracy",
      m2Val: "2048+768", m2Tr: "Füzyon Boyutu", m2En: "Fusion Dimension",
      m3Val: "Multi-Task", m3Tr: "Çoklu Başlık Kaybı", m3En: "Multi-Task Loss"
    },
    {
      index: "06",
      name: "EffiToRag",
      tag: "EfficientNet + Qwen 2.5",
      m1Val: "%99.13", m1Tr: "Tanı Doğruluğu", m1En: "Diagnostic Precision",
      m2Val: "Zero-Shot", m2Tr: "Klinik Reçete", m2En: "Treatment Synthesis",
      m3Val: "FAISS", m3Tr: "Vektör Bilgi Arama", m3En: "Dense Retrieval"
    },
    {
      index: "07",
      name: "Turkish Medical QA",
      tag: "Mistral-7B + FAISS",
      m1Val: "0.95", m1Tr: "Cosine Benzerliği", m1En: "Cosine Similarity",
      m2Val: "Sıfır Halüs.", m2Tr: "Klinik Doğruluk", m2En: "Clinical Reliability",
      m3Val: "Dense L2", m3Tr: "Tıp Literatürü", m3En: "Medical Corpora"
    },
    {
      index: "08",
      name: "TrayHardwareMonitor",
      tag: "Native C# .NET 8",
      m1Val: "< 0.1%", m1Tr: "İşlemci Tüketimi", m1En: "CPU Overhead",
      m2Val: "60 FPS", m2Tr: "Asenkron Tarama", m2En: "Async Sensors",
      m3Val: "0.8s", m3Tr: "Aerodinamik Süzülme", m3En: "Aerodynamic Fade"
    }
  ];

  let currentIndex = 0;
  let intervalTimer = null;
  let isPaused = false;

  // Build dots
  dotsContainer.innerHTML = '';
  tickerData.forEach((_, i) => {
    const dotBtn = document.createElement('button');
    dotBtn.className = `t-dot-btn ${i === 0 ? 'active' : ''}`;
    dotBtn.setAttribute('aria-label', `Project ${i + 1}`);
    dotBtn.addEventListener('click', () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dotBtn);
  });

  function renderSlide(index) {
    const item = tickerData[index];
    const isEn = currentLang === 'en';

    tickerCounter.textContent = `${index + 1} / ${tickerData.length}`;

    // Update dots
    const dots = dotsContainer.querySelectorAll('.t-dot-btn');
    dots.forEach((d, i) => {
      if (i === index) d.classList.add('active');
      else d.classList.remove('active');
    });

    tickerCard.innerHTML = `
      <div class="ticker-slide active">
        <div class="ticker-project-info">
          <span class="ticker-p-index">${item.index}</span>
          <span class="ticker-p-name">${item.name}</span>
          <span class="ticker-p-tag">${item.tag}</span>
        </div>
        <div class="ticker-metrics-row">
          <div class="t-metric">
            <span class="t-val">${item.m1Val}</span>
            <span class="t-lbl">${isEn ? item.m1En : item.m1Tr}</span>
          </div>
          <div class="t-divider"></div>
          <div class="t-metric">
            <span class="t-val">${item.m2Val}</span>
            <span class="t-lbl">${isEn ? item.m2En : item.m2Tr}</span>
          </div>
          <div class="t-divider"></div>
          <div class="t-metric">
            <span class="t-val">${item.m3Val}</span>
            <span class="t-lbl">${isEn ? item.m3En : item.m3Tr}</span>
          </div>
        </div>
      </div>
    `;
  }

  window.renderTickerSlide = () => renderSlide(currentIndex);

  function goToSlide(index) {
    currentIndex = index;
    renderSlide(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % tickerData.length;
    renderSlide(currentIndex);
  }

  function startTimer() {
    stopTimer();
    intervalTimer = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 3500); // 3.5 seconds smooth rotation
  }

  function stopTimer() {
    if (intervalTimer) clearInterval(intervalTimer);
  }

  // Pause on hover so user can inspect metrics calmly
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => { isPaused = true; });
    wrapper.addEventListener('mouseleave', () => { isPaused = false; });
  }

  // Initial render & start
  renderSlide(0);
  startTimer();
}

/* ==========================================================================
   4. IN-PLACE ARCHITECTURE STUDIO (NO PAGE JUMPING · SMOOTH TAB SWITCHING)
   ========================================================================== */
function initArchitectureStudio() {
  const tabBtns = document.querySelectorAll('.studio-tab-btn');
  const views = document.querySelectorAll('.studio-view');

  if (tabBtns.length === 0 || views.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Prevent any unwanted scroll jump
      e.preventDefault();

      const layerTarget = btn.getAttribute('data-layer');

      // Update button active state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Switch active view in-place with smooth opacity fade
      views.forEach(view => {
        const vLayer = view.getAttribute('data-layer-view');
        if (vLayer === layerTarget) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   5. APPLE CARD SHEEN (Cursor Light Reflection)
   ========================================================================== */
function initCardSheen() {
  const cards = document.querySelectorAll('.project-card, .bento-box, .studio-stage, .hero-ticker-wrapper');

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
   6. PROJECT CATEGORY FILTERS
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
   7. INTERACTIVE TERMINAL CONSOLE
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
      '  EffiToRag Precision        : 99.13% verified',
      '  TrayHardwareMonitor Latency: < 0.1ms render cycle',
      '  CPU Overhead               : ~0.08% idle, 60 FPS UI',
      '  Open Source Systems        : 8 Active repositories'
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

    const cmdEcho = document.createElement('div');
    cmdEcho.className = 'term-line';
    cmdEcho.innerHTML = `<span class="term-prompt">fth2745 $</span> <span style="color:#ffffff">${escapeHtml(raw)}</span>`;
    
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
