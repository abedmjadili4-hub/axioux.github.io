
(function(){
  const SITE_CONFIG = {
    SITE_URL: "https://axioux.github.io",
    WHATSAPP_NUMBER: "970592483442",
    WHATSAPP_COMMUNITY_LINK: "",
    INSTAGRAM_URL: "",
    TELEGRAM_URL: "",
    LINKEDIN_URL: "",
    GITHUB_URL: "https://github.com/axioux",
    CONTACT_EMAIL: "axiouxai@gmail.com",
    WEB3FORMS_ACCESS_KEY: "09f1c054-94d6-4346-b026-1c21bd6de47d",
    CLOUDFLARE_ANALYTICS_TOKEN: "",
    PROJECT_LINKS: {
      p1: { demo: "", github: "" },
      p2: { demo: "", github: "" },
      p3: { demo: "", github: "" }
    },
    TEAM_LINKS: {
      qassam:      { photo: "", linkedin: "https://www.linkedin.com/in/qassam-hamdan-ai/", github: "https://github.com/qassam-hue" },
      nourhan:     { photo: "", linkedin: "https://www.linkedin.com/in/nourhan-hassouna-aa11463ab?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/nourhanhassouna" },
      abdulaziz:   { photo: "", linkedin: "", github: "" },
      batool:      { photo: "", linkedin: "", github: "https://github.com/foxamoca" },
      lama:        { photo: "", linkedin: "", github: "" },
      jinan:       { photo: "", linkedin: "https://www.linkedin.com/in/jenan-alrahman-aljammal-9b3207417?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/jenanaljammal" },
      saleh:       { photo: "", linkedin: "https://www.linkedin.com/in/sameh-fer-385a74394/", github: "https://github.com/Zero1264" },
      abdelrahman: { photo: "", linkedin: "", github: "" },
      bashar:      { photo: "", linkedin: "https://www.linkedin.com/in/bashar-bushnaq-142894419/", github: "https://github.com/basharbushnaq03-star" },
    },
    COURSES: []
  };

  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('admin') === '1';
  if (isAdmin) {
    document.body.classList.add('is-admin');
  }

  if (SITE_CONFIG.CLOUDFLARE_ANALYTICS_TOKEN) {
    const cfScript = document.createElement('script');
    cfScript.defer = true;
    cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cfScript.setAttribute('data-cf-beacon', JSON.stringify({ token: SITE_CONFIG.CLOUDFLARE_ANALYTICS_TOKEN }));
    document.head.appendChild(cfScript);
  }

  if (SITE_CONFIG.SITE_URL) {
    const base = SITE_CONFIG.SITE_URL.replace(/\/+$/, '');
    const canEl = document.getElementById('canonicalLink');
    const ogUrlEl = document.getElementById('ogUrl');
    const ogImgEl = document.getElementById('ogImage');
    const twImgEl = document.getElementById('twImage');
    if (canEl) canEl.href = base + '/';
    if (ogUrlEl) ogUrlEl.content = base + '/';
    if (ogImgEl) ogImgEl.content = base + '/assets/og.png';
    if (twImgEl) twImgEl.content = base + '/assets/og.png';
  }

  // 0. INTERACTIVE STAR / PARTICLE BACKGROUND ENGINE
  const canvas = document.getElementById('starParticlesCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];
  let animFrameId = null;
  const mouse = { x: -9999, y: -9999, radius: 165 };
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initParticles() {
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = window.innerWidth < 600 ? 38 : 78;
    particles = [];
    const colors = ['#60A5FA', '#3B82F6', '#38BDF8', '#F8F7F3'];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        r: Math.random() * 2.1 + 0.8,
        alpha: Math.random() * 0.65 + 0.25,
        color: colors[i % colors.length]
      });
    }
  }

  function drawParticles() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLight = document.body.classList.contains('ivory-mode');

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius && dist > 1) {
        const force = (mouse.radius - dist) / mouse.radius;
        p.x -= (dx / dist) * force * 1.15;
        p.y -= (dy / dist) * force * 1.15;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? 'rgba(37, 99, 235, 0.45)' : p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const ldx = p.x - p2.x;
        const ldy = p.y - p2.y;
        const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
        if (ldist < 115) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isLight
            ? 'rgba(37, 99, 235, ' + (0.14 * (1 - ldist / 115)) + ')'
            : 'rgba(96, 165, 250, ' + (0.16 * (1 - ldist / 115)) + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      if (dist < mouse.radius) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = isLight
          ? 'rgba(37, 99, 235, ' + (0.28 * (1 - dist / mouse.radius)) + ')'
          : 'rgba(96, 165, 250, ' + (0.35 * (1 - dist / mouse.radius)) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    if (!prefersReducedMotion) {
      animFrameId = requestAnimationFrame(drawParticles);
    }
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });
  window.addEventListener('resize', () => {
    initParticles();
    if (prefersReducedMotion) drawParticles();
  });

  initParticles();
  if (prefersReducedMotion) {
    drawParticles();
  } else {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    animFrameId = requestAnimationFrame(drawParticles);
  }

  // 1. SPLASH CONTROLLER
  const introSplash = document.getElementById('introSplash');
  const skipSplashBtn = document.getElementById('skipSplashBtn');
  let splashOpenTimer = null;
  let splashHideTimer = null;

  function dismissSplashImmediately() {
    if (!introSplash) return;
    if (splashOpenTimer) clearTimeout(splashOpenTimer);
    if (splashHideTimer) clearTimeout(splashHideTimer);
    introSplash.classList.add('opening', 'hidden');
    try { sessionStorage.setItem('axioux_splash_shown', '1'); } catch (e) {}
  }

  let splashAlreadyShown = false;
  try {
    splashAlreadyShown = sessionStorage.getItem('axioux_splash_shown') === '1';
  } catch (e) {}

  if (prefersReducedMotion || splashAlreadyShown) {
    dismissSplashImmediately();
  } else if (introSplash) {
    try { sessionStorage.setItem('axioux_splash_shown', '1'); } catch (e) {}
    splashOpenTimer = setTimeout(() => { introSplash.classList.add('opening'); }, 2550);
    splashHideTimer = setTimeout(() => { introSplash.classList.add('hidden'); }, 3450);
    introSplash.addEventListener('click', dismissSplashImmediately);
    if (skipSplashBtn) {
      skipSplashBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissSplashImmediately();
      });
    }
  }

  // 2. SCROLL-DRIVEN CURVED PATH TRAVELER & INTERSECTION OBSERVER
  const mainCurvePath = document.getElementById('mainCurvePath');
  const curveTravelerStar = document.getElementById('curveTravelerStar');
  const projectsSectionEl = document.getElementById('projects');

  function updateCurveTravelerOnScroll() {
    if (!mainCurvePath || !curveTravelerStar || !projectsSectionEl) return;
    try {
      const rect = projectsSectionEl.getBoundingClientRect();
      const winH = window.innerHeight || 800;
      const rawProgress = (winH * 0.65 - rect.top) / Math.max(rect.height, 1);
      const progress = Math.max(0.02, Math.min(0.98, rawProgress));
      const totalLen = mainCurvePath.getTotalLength();
      const pt = mainCurvePath.getPointAtLength(progress * totalLen);
      curveTravelerStar.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ', ' + pt.y.toFixed(1) + ')');
    } catch (e) {}
  }

  window.addEventListener('scroll', updateCurveTravelerOnScroll, { passive: true });
  setTimeout(updateCurveTravelerOnScroll, 150);

  const projectCardsAll = document.querySelectorAll('.project-card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.14 });
    projectCardsAll.forEach(card => io.observe(card));
  } else {
    projectCardsAll.forEach(card => card.classList.add('in-view'));
  }

  // 3. BILINGUAL DICTIONARY (AR / EN)
  let currentLang = 'ar';

  const i18n = {
    ar: {
      page_title: 'AXIOUX — The Art of Being Worthy | الصفحة الرئيسية',
      meta_desc: 'AXIOUX مجتمع وفريق تقني يبني منصات الذكاء الاصطناعي والأنظمة السحابية، ويوثّق المعرفة الهندسية — لأن الجدارة بتنبني بالشغل.',
      skip_to_content: 'تخطي إلى المحتوى الرئيسي',
      btn_skip_splash: 'تخطي الموشن ✦',
      splash_sub: 'الجدارة مش ادّعاء، بتنبني بالشغل.',
      nav_projects: 'مسار المشاريع',
      nav_articles: 'المقالات التقنية',
      nav_courses: 'الكورسات',
      nav_team: 'الفريق',
      nav_contact: 'تواصل معنا',
      btn_night_mode: '🌙 الوضع الداكن',
      btn_ivory_mode: '☀️ الوضع الفاتح',
      aria_lang_btn: 'التبديل إلى اللغة الإنجليزية',
      aria_theme_btn: 'تبديل وضع الإضاءة',
      aria_menu_btn: 'فتح أو إغلاق القائمة الرئيسية',
      hero_title: 'نحوّل الأفكار التقنية إلى <span>منصات ذكية وأثر ملموس.</span>',
      hero_lead: 'فريق ومجتمع هندسي يصمّم ويطوّر حلول الذكاء الاصطناعي والمنصات السحابية بانضباط وإبداع — تصفّح مسار مشاريعنا ومقالات فريقنا أدناه.',
      hero_cta_projects: 'استكشف مسار المشاريع ▾',
      hero_cta_articles: 'مقالات الفريق',
      wing_disc: 'انضباط',
      wing_creat: 'إبداع',
      eq_unmerged: 'انضباط + إبداع = ؟',
      eq_merged: '✦ انضباط + إبداع = أثر حقيقي (AXIOUX) ✦',
      btn_merge_wings: 'ادمج الجناحين الآن ✦',
      btn_unmerge_wings: 'إعادة فصل الجناحين',
      stat_members_lbl: 'أعضاء في الفريق الأساسي',
      stat_projects_lbl: 'منصات ومشاريع مصنفة',
      stat_articles_lbl: 'مقالات تقنية منشورة',
      proj_heading: 'المشاريع القادمة والحالية على مسار الابتكار',
      proj_sub: 'بطاقات مختصرة ومصنّفة حسب المجال التقني، موزّعة على مسار منحني تفاعلي — اضغط «اعرف المزيد» على أي مشروع لاستعراض التفاصيل والمحاكاة.',
      filter_upcoming: 'مشاريع قادمة (٣)',
      filter_current: 'المشاريع الحالية',
      filter_all: 'عرض الكل',
      filter_ai: 'ذكاء اصطناعي (AI)',
      filter_cloud: 'سحابة وتجارة (Cloud)',
      filter_health: 'صحة رقمية وAI',
      badge_upcoming: 'مشروع قادم',
      badge_current: 'مشروع حالي ملموس',
      curr_slot_title: 'خانة المشاريع الحالية والمنجزة',
      curr_slot_desc: 'هذه المساحة مخصصة للمشاريع الملموسة التي يُنهي فريق AXIOUX بناءها وإطلاقها فعلياً. نعمل حالياً على تطوير أولى منصاتنا من قائمة المشاريع القادمة.',
      btn_add_first_current: '+ إدراج أول مشروع حالي ملموس',
      btn_add_proj: '+ أضف مشروعاً جديداً',
      drawer_title: 'إضافة مشروع جديد',
      lbl_proj_title: 'اسم المشروع',
      lbl_proj_type: 'حالة المشروع',
      opt_type_current: 'مشروع حالي ملموس',
      opt_type_upcoming: 'مشروع قادم',
      lbl_proj_status: 'التصنيف التقني',
      lbl_proj_tags: 'التقنيات (مفصولة بفاصلة)',
      lbl_proj_desc: 'نبذة قصيرة',
      btn_save_proj: 'حفظ وإضافة ✦',
      btn_cancel: 'إلغاء',
      p1_domain: 'تصنيف: ذكاء اصطناعي وتقنيات تعليم',
      p1_title: 'منصة التعلم والتصحيح البرمجي الذكي',
      p1_summary: 'بيئة تفاعلية لتنفيذ أكواد Python وC++ مباشرة في المتصفح مع مساعد ذكي يوجه الطالب خطوة بخطوة.',
      p1_ov_title: 'نظرة عامة على المشروع',
      p1_ov_desc: 'بيئة متكاملة تتيح للمتعلمين كتابة وتنفيذ الأكواد البرمجية مباشرة داخل المتصفح عبر WebAssembly دون الحاجة لتثبيت أي بيئات عمل محلية.',
      p1_feat_title: 'أهم المزايا والخصائص:',
      p1_f1: '<strong>محرر أكواد مدمج وسريع:</strong> يدعم لغات متعددة مع التلوين البرمجي والإكمال التلقائي.',
      p1_f2: '<strong>نظام تصحيح وتقييم آلي:</strong> فحص مخرجات الكود مقابل حالات اختبار متنوعة (Test Cases) فورياً.',
      p1_f3: '<strong>مساعد ذكي توجيهي (Smart AI Guide):</strong> يحلل الأخطاء المنطقية ويرشد الطالب تدريجياً للحل دون إعطائه الإجابة المباشرة.',
      p1_f4: '<strong>مسارات تعلم متدرجة:</strong> تحديات برمجية مقسمة من المبتدئ إلى الاحترافي.',
      p1_req_box: '<strong>المتطلبات والتقنيات:</strong> Python Engine, WebAssembly (Wasm), Large Language Models (LLM API), Node.js, WebSockets.',
      sim_p1_btn: '▶ جرّب المساعد الذكي',
      sim_p1_out: '<strong>✕ فحص الكود (Test #2):</strong> المخرج المتوقع <code>12</code>، الفعلي <code>9</code>.<br><strong>💡 تلميح المساعد الذكي:</strong> راجع شرط باقي القسمة <code>n % 2 == 1</code> لاختيار الأعداد الزوجية فقط.',
      p2_domain: 'تصنيف: حوسبة سحابية وتجارة',
      p2_title: 'منصة دعم المتاجر والمشاريع الصغيرة',
      p2_summary: 'منصة سحابية موحدة تمنح المتاجر الناشئة واجهات بيع احترافية وتحليلات ذكية خلال دقائق.',
      p2_ov_title: 'فكرة وأهداف المنصة',
      p2_ov_desc: 'دعم رواد الأعمال وأصحاب المشاريع الصغيرة بصفحات متجر احترافية دون تكاليف بناء مواقع مستقلة.',
      p2_feat_title: 'المميزات الرئيسية:',
      p2_f1: '<strong>إنشاء متجر فوري:</strong> لوحة تحكم سهلة لرفع المنتجات وتحديد الأسعار خلال دقائق.',
      p2_f2: '<strong>تصفح مركزي ذكي:</strong> البحث عن المنتجات والخدمات المحلية جغرافياً وحسب التصنيف.',
      p2_f3: '<strong>باقات تسويقية ذكية:</strong> إبراز المتجر وإحصائيات تحليلية لحركة المبيعات.',
      p2_f4: '<strong>منظومة تواصل ودفع مباشرة:</strong> ربط الزبائن بالمتجر عبر قنوات تواصل ودفع سريعة.',
      p2_impact_box: '<strong>الأثر الاقتصادي:</strong> تخفيض التكاليف التشغيلية على المشاريع الناشئة ومساعدتها على الانتشار الرقمي المستدام.',
      sim_p2_btn: '🛍️ معاينة لوحة المتجر',
      sim_p2_out: '<strong>🏪 متجر "أثر" المحلي:</strong> ٢٤ منتجاً نشطاً · <strong>+٤٢٪ نمو في الطلبات الجغرافية القريبة</strong>.',
      p3_domain: 'تصنيف: ذكاء اصطناعي وصحة رقمية',
      p3_title: 'منصة "شَـفـاء" لإدارة الرعاية والفرز الصحي الذكي',
      p3_summary: 'منظومة صحية ذكية تربط المستشفيات بفرز طبي بالذكاء الاصطناعي وسجل طبي موحد وتأهيل رقمي.',
      p3_ov_title: 'رؤية مشروع شَـفـاء',
      p3_ov_desc: 'إعادة تنظيم المنظومة الطبية في أوقات الأزمات والضغط الشديد وتخفيف العبء عن الكوادر الطبية.',
      p3_feat_title: 'أهم محاور المنصة:',
      p3_f1: '<strong>نظام الفرز الطبي الذكي (AI Clinical Triage):</strong> تحليل الأعراض صوتياً أو نصياً وتوجيه المريض لأقرب طوارئ.',
      p3_f2: '<strong>تبويبات المستشفيات والأطباء الموحدة:</strong> استعراض المواعيد والأقسام الشاغرة وتوزيع الضغط.',
      p3_f3: '<strong>السجل الطبي الموحد (Unified EHR):</strong> ملف صحي مشفر يتيح قراءة التاريخ المرضي فورياً.',
      p3_f4: '<strong>التأهيل والعلاج الطبيعي الرقمي:</strong> برامج تمارين منزلية مخصصة للمصابين دون عناء التنقل.',
      p3_f5: '<strong>لوحة إدارة الأزمات وتنبيهات SMS:</strong> توجيه الحالات للمشافي الأقل ازدحاماً ودعم العمل عند انقطاع الإنترنت.',
      p3_f6: '<strong>مساعد صوتي باللهجة المحلية:</strong> لتسهيل الاستخدام لكبار السن والمصابين.',
      p3_impact_box: '<strong>الأثر الحيوي:</strong> تقليل التدافع، التوزيع العادل للموارد الطبية، وتوثيق البيانات الصحية لإنقاذ الأرواح.',
      sim_p3_btn: '🩺 جرّب محاكاة الفرز الطبي',
      sim_p3_out: '<strong>🎙️ إدخال صوتي باللهجة المحلية:</strong> «والدي عنده ضيقة نفس شديدة وألم بالصدر».<br><strong>🚨 قرار الفرز الذكي:</strong> أولوية قصوى (<strong>Code Red</strong>) · توجيه لأقرب طوارئ متاحة + تنبيه <strong>SMS</strong> فوري.',
      btn_view_full_proj: 'اعرف المزيد ▾',
      btn_hide_full_proj: 'إخفاء التفاصيل ▴',
      art_heading: 'مقالات وتجارب فريق AXIOUX',
      art_sub: 'مقالات تقنية يكتبها أعضاء الفريق حول هندسة الذكاء الاصطناعي، المعمارية البرمجية، وأساسيات علوم الحاسوب.',
      art_filter_all: 'كل المقالات',
      art_filter_ai: 'ذكاء اصطناعي ومنطق',
      art_filter_sys: 'معمارية وأنظمة',
      art_filter_cult: 'علوم الحاسوب',
      btn_add_article: '+ نشر مقال تقني جديد',
      art_drawer_title: 'إضافة مقال تقني جديد',
      lbl_art_title: 'عنوان المقال',
      lbl_art_cat: 'تصنيف المقال',
      opt_art_ai: 'ذكاء اصطناعي ومنطق',
      opt_art_sys: 'معمارية وأنظمة',
      opt_art_cult: 'علوم الحاسوب',
      lbl_art_author: 'اسم الكاتب',
      lbl_art_time: 'وقت القراءة',
      lbl_art_summary: 'نبذة مختصرة',
      lbl_art_body: 'النص الكامل للمقال',
      btn_save_article: 'نشر المقال ✦',
      art1_badge: 'هندسة الذكاء الاصطناعي والمنطق',
      art1_time: 'بقلم: جنان · ٤ دقائق',
      art1_title: 'من برمجة إلى تفكير هندسي: المنطق الرياضي والـ Problem Solving',
      art1_excerpt: 'لماذا الـ AI ليس سحراً بل رياضيات ومنطق، وكيف يشكّل التحليل المنطقي 80% من بناء أي نظام ذكي قبل كتابة الكود.',
      art1_author: 'جنان (Jenan) · مهندسة ذكاء اصطناعي',
      art2_badge: 'الرؤية التقنية وهندسة الأنظمة',
      art2_time: 'بقلم: نورهان طلال حسونة (CTO) · ٣ دقائق',
      art2_title: 'بناء أنظمة ذكية تثبت جدارتها عبر الزمن: الرؤية التقنية في AXIOUX',
      art2_excerpt: 'كيف نحول التحديات المعقدة إلى منتجات رقمية قابلة للتوسع وعالية الموثوقية تعكس فلسفة The Art of Being Worthy.',
      art2_author: 'نورهان طلال حسونة · CTO & AI Engineer',
      art3_badge: 'علوم الحاسوب والتفكير الحاسوبي',
      art3_time: 'بقلم: عبد الرحمن · ٤ دقائق',
      art3_title: 'لماذا يجب أن نتعلم علوم الحاسوب قبل التعمق في لغات البرمجة؟',
      art3_excerpt: 'المبرمج المتميز ليس من يعرف أكبر عدد من اللغات، بل من يستطيع التفكير بطريقة صحيحة وتحويل المشكلات إلى حلول فعّالة.',
      art3_author: 'عبد الرحمن · مهندس برمجيات وواجهات',
      btn_read_article: 'اعرف المزيد ▾',
      btn_hide_article: 'طي المقال ▴',
      courses_soon_badge: 'COURSES & TRAINING · قريباً',
      courses_soon_title: 'المسارات التدريبية التطبيقية — قريباً',
      courses_soon_desc: 'نعدّ حالياً مسارات تدريبية عملية مبنية على مشاريعنا الهندسية. سجّل اهتمامك المسبق أو انضم كمدرب أو شريك معنا.',
      btn_course_interest: 'سجّل اهتمامك أو اطلب شراكة',
      btn_become_trainer: 'انضم كمدرب معنا',
      team_heading: 'قيادة وفريق AXIOUX (٨ أعضاء)',
      team_sub: 'اضغط على بطاقة أي عضو لينزلق الأفاتار جانباً وتظهر لك نبذته، مهاراته، ومشاريعه في نفس المكان.',
      leader_qassam_bio: 'مؤسس ومدير AXIOUX — يقود الرؤية، هندسة الذكاء الاصطناعي، وتحويل الأفكار إلى مسار عمل واضح.',
      leader_nourhan_bio: 'مهندسة ذكاء اصطناعي والمديرة التقنية (CTO) — تحوّل التحديات المعقدة إلى منتجات رقمية ذكية قابلة للتوسع وعالية الموثوقية.',
      m_abdulaziz: 'عبد العزيز',
      m_batool: 'بتول',
      m_lama: 'لمى',
      m_jinan: 'جنان (Jenan)',
      m_saleh: 'صالح',
      m_abdelrahman: 'عبد الرحمن',
      m_qassam: 'قسّام صالح حمدان',
      m_nourhan: 'نورهان طلال حسونة',
      member_view_btn: 'اعرف المزيد ▾',
      member_hide_btn: 'إخفاء التفاصيل ▴',
      member_view_short: 'اعرف المزيد ▾',
      member_hide_short: 'طي ▴',
      join_heading: 'كيف تنضم إلينا أو تبدأ مشروعك معنا؟',
      join_s1_t: 'أرسل طلبك أو فكرتك',
      join_s1_d: 'اختر الهدف المناسب في نموذج التواصل أدناه (مشروع جديد، طرح فكرة، أو انضمام للتدريب).',
      join_s2_t: 'جلسة تقييم وتخطيط',
      join_s2_d: 'نراجع المتطلبات التقنية مع قيادة الفريق ونحدد نطاق العمل والجدول الزمني بوضوح.',
      join_s3_t: 'تنفيذ وتوثيق مشترك',
      join_s3_d: 'نبدأ البناء الفعلي ومراجعة الكود خطوة بخطوة حتى إطلاق المخرج النهائي.',
      contact_heading: 'تواصل معنا: لتنفيذ مشروع، طرح فكرة، أو شراكة تقنية',
      contact_sub: 'أرسل لنا تفاصيل مشروعك أو مقترح الشراكة وسيتواصل معك فريق AXIOUX لترتيب خطوة البداية.',
      lbl_c_name: 'الاسم الكامل أو اسم الجهة / المركز',
      lbl_c_email: 'البريد الإلكتروني أو رقم التواصل',
      lbl_c_type: 'الهدف من التواصل',
      opt_c_proj: 'طلب تنفيذ مشروع تقني',
      opt_c_part: 'شراكة في قسم الكورسات والتدريب',
      opt_c_trainer: 'الانضمام كمدرب / مدربة في قسم الكورسات',
      opt_c_idea: 'اقتراح فكرة مشروع للمجتمع',
      lbl_c_msg: 'التفاصيل',
      btn_send_msg: 'إرسال الرسالة ✦',
      btn_sending_msg: 'جارٍ الإرسال...',
      privacy_note: 'نستخدم بياناتك فقط للرد عليك.',
      form_err_validation: 'يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح قبل الإرسال.',
      form_success_msg: '✓ شكراً لك! تم استلام رسالتك بنجاح لدى فريق AXIOUX وسنتواصل معك قريباً.',
      form_err_generic: 'تعذّر إرسال النموذج حالياً. يرجى المحاولة لاحقاً أو التواصل معنا مباشرة عبر قنواتنا الرسمية.',
      form_err_wa_prefix: 'تعذّر إرسال النموذج حالياً. يمكنك مراسلتنا مباشرة عبر واتساب: ',
      btn_join_wa_comm: 'انضم لمجتمعنا على واتساب ✦',
      c_side_title: 'مجتمع يبني ويوثّق كل خطوة',
      c_side_desc: 'في <strong>AXIOUX</strong> نرحب بكل فكرة جادة، مشروع يخدم المجتمع، أو شراكة تدريبية تفتح آفاقاً جديدة للشباب.',
      c_loc: '<strong>المقر:</strong> غزة، فلسطين',
      c_focus: '<strong>مجالات العمل:</strong> تطوير المشاريع التقنية، الذكاء الاصطناعي، والمنصات السحابية',
      c_motto_lbl: 'شعار الهوية:',
      footer_tagline: '— الجدارة مش ادّعاء، بتنبني بالشغل.',
      btn_close_modal: '✕ إغلاق',
      b3d_eyebrow: '✦ 3D INTERACTIVE SHOWCASE · مجسم ثلاثي الأبعاد',
      b3d_heading: 'فراشة AXIOUX ثلاثية الأبعاد: انضباط وإبداع',
      b3d_sub: 'نموذج ثلاثي الأبعاد مستوحى من هوية AXIOUX (الجناح اللؤلؤي الأبيض بانضباطه وجناح الياقوت الأزرق بإبداعه). اسحب بالماوس أو اللمس للتدوير بحرية.',
      b3d_loading: 'جاري تحميل مجسم الفراشة ثلاثي الأبعاد...',
      b3d_pause_rotate: 'إيقاف الدوران',
      b3d_play_rotate: 'تشغيل الدوران',
      b3d_left_wing: 'الجناح اللؤلؤي الأبيض',
      b3d_front_view: 'المقدمة',
      b3d_right_wing: 'جناح الياقوت الأزرق',
      b3d_reset: '↺ إعادة ضبط',
      b3d_hint: '✦ اسحب للتدوير بحرية · متوافق تماماً مع التمرير باللمس على الهواتف دون إعاقة التصفح',
      mc_eyebrow: '✦ AI 3D MODEL CREATOR · استوديو توليد النماذج ثلاثية الأبعاد',
      mc_heading: 'استوديو AXIOUX لتوليد النماذج ثلاثية الأبعاد بالذكاء الاصطناعي',
      mc_sub: 'حوّل الأفكار والتوجيهات النصية إلى مجسمات ثلاثية الأبعاد تفاعلية بدقة هندسية وخامات PBR واقعية بضغطة زر واحدة.',
      mc_prompt_placeholder: 'اكتب وصف المجسم المطلوب لتوليده... (مثال: فراشة سيبرانية بأجنحة لؤلؤية وزرقاء وخامات معدنية)',
      mc_btn_generate: 'توليد بالذكاء الاصطناعي',
      mc_presets_label: 'نماذج جاهزة:',
      mc_preset_butterfly: '✦ فراشة AXIOUX سيبرانية',
      mc_preset_sphere: '✦ نواة الذكاء الاصطناعي',
      mc_preset_drone: '✦ روبوت استكشاف كمومي',
      mc_preset_monolith: '✦ مونوغلث كريستالي',
      mc_status_ready: 'AXIOUX MeshEngine v2.4 · جاهز للتوليد والتفاعل',
      mc_synth_title: 'جاري توليد الشبكة الهندسية والخامات...',
      mc_pause_rotate: 'إيقاف الدوران',
      mc_play_rotate: 'تشغيل الدوران',
      mc_mat_pearl: 'خامة اللؤلؤ الأبيض',
      mc_wireframe: 'شبكة Wireframe',
      mc_mat_sapphire: 'خامة الياقوت الأزرق',
      mc_export: 'تصدير النموذج GLB',
      mc_hint: '✦ اسحب للتفاعل وتدوير المجسم 360° · متوافق مع شاشات اللمس · اختر الخامات أو ولّد نماذج جديدة فوراً'
    },
    en: {
      page_title: 'AXIOUX — The Art of Being Worthy | Interactive Homepage',
      meta_desc: 'AXIOUX is an AI and cloud engineering community building intelligent platforms and documented technical insights — worthiness is built through work.',
      skip_to_content: 'Skip to main content',
      btn_skip_splash: 'Skip Intro ✦',
      splash_sub: 'Worthiness is not claimed — it is built through work.',
      nav_projects: 'Project Path',
      nav_articles: 'Tech Articles',
      nav_courses: 'Courses',
      nav_team: 'Team',
      nav_contact: 'Contact Us',
      btn_night_mode: '🌙 Dark Mode',
      btn_ivory_mode: '☀️ Light Mode',
      aria_lang_btn: 'Switch language to Arabic',
      aria_theme_btn: 'Toggle theme mode',
      aria_menu_btn: 'Toggle navigation menu',
      hero_title: 'Turning Tech Ideas Into <span>Intelligent Platforms &amp; Real Impact.</span>',
      hero_lead: 'An engineering community designing and building AI solutions and cloud platforms with discipline and creativity — explore our curved project path and team insights below.',
      hero_cta_projects: 'Explore Project Path ▾',
      hero_cta_articles: 'Team Articles',
      wing_disc: 'Discipline',
      wing_creat: 'Creativity',
      eq_unmerged: 'Discipline + Creativity = ?',
      eq_merged: '✦ Discipline + Creativity = Real Impact (AXIOUX) ✦',
      btn_merge_wings: 'Merge the Wings Now ✦',
      btn_unmerge_wings: 'Separate Wings',
      stat_members_lbl: 'Core Team Members',
      stat_projects_lbl: 'Classified Platforms & Projects',
      stat_articles_lbl: 'Published Tech Articles',
      proj_heading: 'Upcoming & Current Projects Along Our Innovation Path',
      proj_sub: 'Concise cards classified by technical domain along an interactive curved scroll path — click "Learn More" on any card to inspect full specs and live simulations.',
      filter_upcoming: 'Upcoming Projects (3)',
      filter_current: 'Current Projects',
      filter_all: 'View All',
      filter_ai: 'Artificial Intelligence (AI)',
      filter_cloud: 'Cloud & E-Commerce',
      filter_health: 'Digital Health & AI',
      badge_upcoming: 'UPCOMING',
      badge_current: 'LIVE PROJECT',
      curr_slot_title: 'Current & Launched Projects Slot',
      curr_slot_desc: 'Reserved strictly for tangible projects completed and launched by the AXIOUX team. We are actively developing our first flagship platform from our upcoming roadmap.',
      btn_add_first_current: '+ Add First Tangible Current Project',
      btn_add_proj: '+ Add New Project',
      drawer_title: 'Add a New Project',
      lbl_proj_title: 'Project Title',
      lbl_proj_type: 'Project Stage',
      opt_type_current: 'Current Tangible Project',
      opt_type_upcoming: 'Upcoming Project',
      lbl_proj_status: 'Technical Domain',
      lbl_proj_tags: 'Tech Stack (comma-separated)',
      lbl_proj_desc: 'Short Summary',
      btn_save_proj: 'Save & Add ✦',
      btn_cancel: 'Cancel',
      p1_domain: 'Category: AI & EdTech',
      p1_title: 'Smart Code Learning & AI Grading Platform',
      p1_summary: 'Interactive browser environment executing Python & C++ via WebAssembly with a step-by-step Socratic AI mentor.',
      p1_ov_title: 'Project Overview',
      p1_ov_desc: 'A zero-install environment enabling learners to write and run Python and C++ directly in the browser via WebAssembly.',
      p1_feat_title: 'Key Features:',
      p1_f1: '<strong>Fast Built-in Code Editor:</strong> Multi-language support with syntax highlighting and autocompletion.',
      p1_f2: '<strong>Automated Grading Engine:</strong> Instant verification of output against diverse test cases.',
      p1_f3: '<strong>Smart AI Guide:</strong> Analyzes logical errors and guides students progressively without giving away direct answers.',
      p1_f4: '<strong>Progressive Tracks:</strong> Coding challenges structured from beginner to advanced.',
      p1_req_box: '<strong>Tech Stack:</strong> Python Engine, WebAssembly (Wasm), Large Language Models (LLM API), Node.js, WebSockets.',
      sim_p1_btn: '▶ Try AI Mentor Demo',
      sim_p1_out: '<strong>✕ Grader (Test #2):</strong> Expected <code>12</code>, got <code>9</code>.<br><strong>💡 AI Guide Hint:</strong> Check your modulo condition <code>n % 2 == 1</code> so only even integers are summed.',
      p2_domain: 'Category: Cloud & E-Commerce',
      p2_title: 'SME & Micro-Storefront Support Platform',
      p2_summary: 'Unified cloud platform empowering emerging shops with instant storefronts, geo-discovery, and smart analytics.',
      p2_ov_title: 'Platform Vision',
      p2_ov_desc: 'Empowering entrepreneurs and micro-stores with professional storefront pages without standalone development overhead.',
      p2_feat_title: 'Core Highlights:',
      p2_f1: '<strong>Instant Storefront Creation:</strong> Upload products, set pricing, and launch in minutes.',
      p2_f2: '<strong>Smart Centralized Discovery:</strong> Search local products and services by location and category.',
      p2_f3: '<strong>Smart Marketing Tiers:</strong> Store spotlighting and real-time sales analytics.',
      p2_f4: '<strong>Direct Payment & Chat:</strong> Seamless buyer-to-merchant communication and checkout.',
      p2_impact_box: '<strong>Economic Impact:</strong> Lowering operational costs for emerging businesses and accelerating sustainable digital growth.',
      sim_p2_btn: '🛍️ Preview Storefront Demo',
      sim_p2_out: '<strong>🏪 "Athar" Local Store:</strong> 24 Active Products · <strong>+42% growth in nearby geo-discovery orders</strong>.',
      p3_domain: 'Category: AI & Digital Health',
      p3_title: '"Shifaa" — Smart Healthcare & Clinical Triage Platform',
      p3_summary: 'Smart healthcare ecosystem connecting hospitals with dialect-aware AI clinical triage, unified EHR, and digital rehab.',
      p3_ov_title: 'Vision of Project Shifaa',
      p3_ov_desc: 'Reorganizing medical triage and hospital coordination during high-pressure emergencies to relieve frontline teams.',
      p3_feat_title: 'Core Platform Pillars:',
      p3_f1: '<strong>AI Clinical Triage:</strong> Voice/text symptom analysis routing patients to the right urgency level or nearest ER.',
      p3_f2: '<strong>Unified Hospital Hubs:</strong> Live visibility into doctor schedules and department capacity.',
      p3_f3: '<strong>Unified Encrypted EHR:</strong> Instant medical history lookup across connected hospitals.',
      p3_f4: '<strong>Digital Home Rehab:</strong> Guided physical therapy modules for trauma and amputee recovery.',
      p3_f5: '<strong>Crisis Dashboard & SMS Alerts:</strong> Load balancing and automated SMS fallback during internet blackouts.',
      p3_f6: '<strong>Local Dialect Voice Assistant:</strong> Accessible Arabic dialect understanding for seniors and injured patients.',
      p3_impact_box: '<strong>Vital Impact:</strong> Reducing ER overcrowding, fair medical resource distribution, and saving lives in critical conditions.',
      sim_p3_btn: '🩺 Simulate AI Triage',
      sim_p3_out: '<strong>🎙️ Dialect Voice Input:</strong> "Elderly patient with severe shortness of breath and chest pain."<br><strong>🚨 AI Triage Decision:</strong> Critical Priority (<strong>Code Red</strong>) · Routed to nearest low-load ER + instant <strong>SMS</strong> alert.',
      btn_view_full_proj: 'Learn More ▾',
      btn_hide_full_proj: 'Hide Details ▴',
      art_heading: 'AXIOUX Team Articles & Insights',
      art_sub: 'Technical articles written by our team members on AI engineering, system architecture, and computer science fundamentals.',
      art_filter_all: 'All Articles',
      art_filter_ai: 'AI & Logic',
      art_filter_sys: 'Architecture & Systems',
      art_filter_cult: 'Computer Science',
      btn_add_article: '+ Publish New Article',
      art_drawer_title: 'Publish a New Technical Article',
      lbl_art_title: 'Article Title',
      lbl_art_cat: 'Category',
      opt_art_ai: 'AI & Logic',
      opt_art_sys: 'Architecture & Systems',
      opt_art_cult: 'Computer Science',
      lbl_art_author: 'Author Name',
      lbl_art_time: 'Reading Time',
      lbl_art_summary: 'Short Excerpt',
      lbl_art_body: 'Full Article Content',
      btn_save_article: 'Publish Article ✦',
      art1_badge: 'AI Engineering & Logic',
      art1_time: 'By: Jenan · 4 min',
      art1_title: 'From Coding to Engineering Thinking: Mathematical Logic & Problem Solving',
      art1_excerpt: 'Why AI is mathematics and structured logic rather than magic — and how 80% of engineering happens before writing a line of code.',
      art1_author: 'Jenan · AI Engineer at AXIOUX',
      art2_badge: 'CTO Vision & Architecture',
      art2_time: 'By: Nourhan Talal Hassouna (CTO) · 3 min',
      art2_title: 'Building Intelligent Systems That Prove Their Worth Over Time',
      art2_excerpt: 'How we turn complex challenges into scalable, high-reliability digital products reflecting The Art of Being Worthy.',
      art2_author: 'Nourhan Talal Hassouna · CTO & AI Engineer',
      art3_badge: 'Computer Science Fundamentals',
      art3_time: 'By: Abdelrahman · 4 min',
      art3_title: 'Why Should We Learn Computer Science Before Diving Deep Into Programming Languages?',
      art3_excerpt: 'A standout programmer is not defined by knowing the most languages, but by clear computational thinking and effective problem solving.',
      art3_author: 'Abdelrahman · Software & UI Engineer',
      btn_read_article: 'Learn More ▾',
      btn_hide_article: 'Collapse ▴',
      courses_soon_badge: 'COURSES & TRAINING · COMING SOON',
      courses_soon_title: 'Hands-On Training Tracks — Coming Soon',
      courses_soon_desc: 'We are preparing practical training tracks built around our real engineering builds. Register your early interest or partner with us.',
      btn_course_interest: 'Register Interest / Partner',
      btn_become_trainer: 'Become a Trainer',
      team_heading: 'AXIOUX Leadership & Core Team (8 Members)',
      team_sub: 'Click any member card to slide their avatar aside and reveal their bio, skills, and projects right in place.',
      leader_qassam_bio: 'Founder & Director of AXIOUX — leads strategic vision, AI engineering, and turning ideas into clear execution.',
      leader_nourhan_bio: 'AI Engineer & CTO at AXIOUX — transforms complex challenges into smart, scalable, and reliable digital products.',
      m_abdulaziz: 'Abdulaziz Salameh',
      m_batool: 'Batool Al-Muqayyid',
      m_lama: 'Lama',
      m_jinan: 'Jenan Alrahman Aljammal',
      m_saleh: 'Saleh Farwana',
      m_abdelrahman: 'Abdelrahman Al-Jdeili',
      m_qassam: 'Qassam Hamdan',
      m_bashar: 'Bashar Bushnaq',
      m_nourhan: 'Nourhan Hassouna',
      member_view_btn: 'Learn More ▾',
      member_hide_btn: 'Hide Details ▴',
      member_view_short: 'Learn More ▾',
      member_hide_short: 'Collapse ▴',
      join_heading: 'How to Join Us or Start Your Project',
      join_s1_t: 'Submit Your Request or Idea',
      join_s1_d: 'Select your inquiry type in the contact form below (new project, idea proposal, or training collaboration).',
      join_s2_t: 'Technical Scoping Session',
      join_s2_d: 'We review requirements with our technical leadership and align on scope, stack, and milestones.',
      join_s3_t: 'Collaborative Build & Docs',
      join_s3_d: 'We execute, review code, and document every milestone until final delivery.',
      contact_heading: 'Get in Touch: New Project, Tech Partnership, or Idea',
      contact_sub: 'Send us your project details or partnership proposal and the AXIOUX team will reach out to kick things off.',
      lbl_c_name: 'Full Name or Organization / Center Name',
      lbl_c_email: 'Email Address or Phone Number',
      lbl_c_type: 'Purpose of Contact',
      opt_c_proj: 'Request Technical Project Execution',
      opt_c_part: 'Course & Training Partnership',
      opt_c_trainer: 'Join as an Instructor in the Courses Division',
      opt_c_idea: 'Propose a Project Idea to the Community',
      lbl_c_msg: 'Details',
      btn_send_msg: 'Send Message ✦',
      btn_sending_msg: 'Sending...',
      privacy_note: 'We use your details only to reply to you.',
      form_err_validation: 'Please fill out all required fields properly before submitting.',
      form_success_msg: '✓ Thank you! Your message has been received by the AXIOUX team and we will reply shortly.',
      form_err_generic: 'Could not submit the form right now. Please try again later or reach out via our direct channels.',
      form_err_wa_prefix: 'Could not submit the form right now. You can message us directly on WhatsApp: ',
      btn_join_wa_comm: 'Join the WhatsApp Community ✦',
      c_side_title: 'A Community That Builds & Documents Every Step',
      c_side_desc: 'At <strong>AXIOUX</strong>, we welcome every serious idea, impactful project, or training partnership that opens new horizons.',
      c_loc: '<strong>Location:</strong> Gaza, Palestine',
      c_focus: '<strong>Focus Areas:</strong> Tech Project Development, AI Systems & Cloud Platforms',
      c_motto_lbl: 'Brand Motto:',
      footer_tagline: '— Worthiness is not claimed, it is built through work.',
      btn_close_modal: '✕ Close',
      b3d_eyebrow: '✦ 3D INTERACTIVE SHOWCASE · GLB MODEL',
      b3d_heading: 'AXIOUX 3D Butterfly: Discipline & Creativity',
      b3d_sub: 'Interactive 3D model reflecting the AXIOUX identity (pearl white wing of discipline and royal sapphire wing of creativity). Drag or swipe to rotate 360° freely.',
      b3d_loading: 'Loading 3D butterfly model...',
      b3d_pause_rotate: 'Pause Rotation',
      b3d_play_rotate: 'Auto Rotate',
      b3d_left_wing: 'Pearl White Wing',
      b3d_front_view: 'Front View',
      b3d_right_wing: 'Sapphire Blue Wing',
      b3d_reset: '↺ Reset View',
      b3d_hint: '✦ Drag or swipe to explore in 360° · Smooth touch scrolling without scroll-trapping',
      mc_eyebrow: '✦ AI 3D MODEL CREATOR · TEXT TO 3D STUDIO',
      mc_heading: 'AXIOUX AI 3D Model Creation Studio',
      mc_sub: 'Transform creative text prompts and concepts into interactive, production-ready 3D models with PBR shaders and instant mesh generation.',
      mc_prompt_placeholder: 'Describe your 3D asset to generate... (e.g. Cybernetic butterfly with crystal wings and PBR metals)',
      mc_btn_generate: 'Generate with AI',
      mc_presets_label: 'Quick Presets:',
      mc_preset_butterfly: '✦ Cyber Butterfly',
      mc_preset_sphere: '✦ AI Neural Sphere',
      mc_preset_drone: '✦ Quantum Probe',
      mc_preset_monolith: '✦ Crystal Monolith',
      mc_status_ready: 'AXIOUX MeshEngine v2.4 · Ready for Generation & Orbit',
      mc_synth_title: 'Synthesizing Neural Mesh & PBR Shaders...',
      mc_pause_rotate: 'Pause Rotation',
      mc_play_rotate: 'Auto Rotate',
      mc_mat_pearl: 'Pearl White PBR',
      mc_wireframe: 'Wireframe Mesh',
      mc_mat_sapphire: 'Sapphire Metallic',
      mc_export: 'Export 3D Model',
      mc_hint: '✦ Drag to orbit in 360° · Smooth touch scrolling · Switch shaders or synthesize new assets instantly'
    }
  };

  const teamMembersData = {
    qassam: {
      initials: 'QH',
      nameAr: 'قسّام صالح حمدان',
      nameEn: 'Qassam Saleh Hamdan',
      roleAr: 'المؤسس والمدير التنفيذي · مهندس ذكاء اصطناعي',
      roleEn: 'Founder & Director · AI Engineer',
      bioAr: 'مؤسس وقائد مجتمع وفريق AXIOUX. يقود الرؤية الاستراتيجية، تطوير نماذج الذكاء الاصطناعي ومعالجة اللغة الطبيعية (NLP / LLMs)، تنظيم فرق العمل، وتحويل الأفكار الطموحة إلى منتجات رقمية ذات أثر ملموس.',
      bioEn: 'Founder and leader of AXIOUX. Leads strategic vision, AI & LLM engineering, team orchestration, external partnerships, and transforming ambitious ideas into high-impact products.',
      skills: ['AI / LLMs', 'Python', 'NLP & Dialect Models', 'Product Strategy', 'Team Leadership'],
      projects: [
        { id: 'p1', titleAr: 'منصة التعلم والتصحيح البرمجي الذكي', titleEn: 'Smart Code Learning & AI Grading Platform' },
        { id: 'p2', titleAr: 'منصة دعم المتاجر والمشاريع الصغيرة', titleEn: 'SME & Micro-Storefront Cloud Platform' },
        { id: 'p3', titleAr: 'منصة "شَـفـاء" للفرز الصحي الذكي', titleEn: 'Shifaa Smart Healthcare Triage Platform' }
      ],
      articles: [
        { id: 'a2', titleAr: 'رؤية الهندسة والمعمارية في AXIOUX', titleEn: 'Technical Vision & Architecture at AXIOUX' }
      ]
    },
    nourhan: {
      initials: 'NH',
      nameAr: 'نورهان طلال حسونة',
      nameEn: 'Nourhan Talal Hassouna',
      roleAr: 'مهندسة ذكاء اصطناعي والمديرة التقنية (CTO) في AXIOUX',
      roleEn: 'AI Engineer & Chief Technology Officer (CTO) at AXIOUX',
      bioAr: 'بصفتي مهندسة ذكاء اصطناعي والمديرة التقنية (CTO) في AXIOUX، أحوّل التحديات المعقدة إلى منتجات رقمية ذكية، قابلة للتوسع وعالية الموثوقية. أؤمن بأن التكنولوجيا العظيمة لا تقتصر على كتابة الأكواد، بل تكمن في بناء أنظمة ذكية تصنع أثراً حقيقياً وتثبت جدارتها عبر الزمن. أقود الرؤية التقنية والتنفيذ الهندسي في الشركة، وأتولى اختيار البنية التقنية (Tech Stack) الأمثل لمشاريعنا، ودمج أحدث حلول الذكاء الاصطناعي، والحفاظ على معايير جودة صارمة عبر المراجعة الدقيقة للكود. وبالعمل عن قرب مع فريقنا الموهوب، أحرص على أن يعكس كل سطر برمجي نطلقه فلسفتنا الأساسية: The Art of Being Worthy.',
      bioEn: 'As an AI Engineer and Chief Technology Officer (CTO) at AXIOUX, I transform complex challenges into smart, scalable, and highly reliable digital products. I believe great technology is not just about writing code — it is about building intelligent systems that create real impact and prove their worth over time. I lead our technical vision and engineering execution, selecting the optimal Tech Stack, integrating state-of-the-art AI solutions, and upholding strict quality standards through rigorous code reviews so every line of code reflects our core philosophy: The Art of Being Worthy.',
      skills: ['AI Engineering', 'System Architecture (CTO)', 'Tech Stack Strategy', 'Code Review & Quality', 'Scalable Systems'],
      projects: [
        { id: 'p1', titleAr: 'منصة التعلم والتصحيح البرمجي الذكي', titleEn: 'Smart Code Learning & AI Grading Platform' },
        { id: 'p2', titleAr: 'منصة دعم المتاجر والمشاريع الصغيرة', titleEn: 'SME & Micro-Storefront Cloud Platform' },
        { id: 'p3', titleAr: 'منصة "شَـفـاء" للفرز الصحي الذكي', titleEn: 'Shifaa Smart Healthcare Triage Platform' }
      ],
      articles: [
        { id: 'a2', titleAr: 'مقال نورهان طلال حسونة: بناء أنظمة ذكية تثبت جدارتها عبر الزمن', titleEn: 'Nourhan Talal Hassouna’s Article: Building Intelligent Systems That Prove Their Worth' }
      ]
    },
    abdulaziz: {
      initials: 'AS',
      nameAr: 'عبد العزيز',
      nameEn: 'Abdulaziz',
      roleAr: 'مهندس العمليات وتطوير الأنظمة الخلفية',
      roleEn: 'Operations & Backend Engineer',
      bioAr: 'يركّز على بناء واجهات البرمجة (RESTful APIs)، إدارة العمليات التشغيلية للمشاريع، وضمان استقرار الخوادم وتدفق البيانات بسلاسة داخل منصات الفريق.',
      bioEn: 'Focuses on building robust RESTful APIs, coordinating project operations, and ensuring reliable backend service execution across AXIOUX platforms.',
      skills: ['Node.js', 'RESTful APIs', 'Backend Logic', 'Project Operations', 'WebSockets'],
      projects: [
        { id: 'p1', titleAr: 'منصة التعلم والتصحيح البرمجي الذكي', titleEn: 'Smart Code Learning & AI Grading Platform' },
        { id: 'p2', titleAr: 'منصة دعم المتاجر والمشاريع الصغيرة', titleEn: 'SME & Micro-Storefront Cloud Platform' }
      ],
      articles: [
        { id: 'a2', titleAr: 'بناء أنظمة ذكية تثبت جدارتها عبر الزمن', titleEn: 'Building Intelligent Systems That Prove Their Worth' }
      ]
    },
    batool: {
      initials: 'BA',
      nameAr: 'بتول',
      nameEn: 'Batool',
      roleAr: 'مهندسة ذكاء اصطناعي وأنظمة ذكية',
      roleEn: 'AI & Smart Systems Engineer',
      bioAr: 'تعمل على تطوير وتخصيص المساعدات الذكية (AI Agents & Fine-tuned Models)، وبناء خوارزميات التوجيه البرمجي والفرز الطبي الذكي.',
      bioEn: 'Specializes in designing intelligent assistants, prompt engineering, and building AI reasoning pipelines for educational and clinical triage platforms.',
      skills: ['AI / LLMs', 'Python', 'Smart AI Guides', 'NLP Pipelines', 'Model Evaluation'],
      projects: [
        { id: 'p1', titleAr: 'منصة التعلم والتصحيح البرمجي الذكي', titleEn: 'Smart Code Learning & AI Grading Platform' },
        { id: 'p3', titleAr: 'منصة "شَـفـاء" للفرز الصحي الذكي', titleEn: 'Shifaa Smart Healthcare Triage Platform' }
      ],
      articles: [
        { id: 'a1', titleAr: 'من برمجة إلى تفكير هندسي: المنطق والـ Problem Solving', titleEn: 'From Coding to Engineering Thinking' }
      ]
    },
    lama: {
      initials: 'LM',
      nameAr: 'لمى',
      nameEn: 'Lama',
      roleAr: 'مهندسة ذكاء اصطناعي وتحليل بيانات',
      roleEn: 'AI & Data Analytics Engineer',
      bioAr: 'تتولى بناء محركات التحليل الإحصائي (Analytics Engines)، تجهيز البيانات السريرية والتعليمية، واستخراج المؤشرات الذكية لدعم اتخاذ القرار في منصات الفريق.',
      bioEn: 'Builds analytics engines, structures training and clinical datasets, and designs actionable insights dashboards for merchants and healthcare teams.',
      skills: ['Data Analysis', 'Analytics Engine', 'Python', 'Machine Learning', 'Data Visualization'],
      projects: [
        { id: 'p2', titleAr: 'منصة دعم المتاجر والمشاريع الصغيرة', titleEn: 'SME & Micro-Storefront Cloud Platform' },
        { id: 'p3', titleAr: 'منصة "شَـفـاء" للفرز الصحي الذكي', titleEn: 'Shifaa Smart Healthcare Triage Platform' }
      ],
      articles: [
        { id: 'a1', titleAr: 'من برمجة إلى تفكير هندسي: المنطق والـ Problem Solving', titleEn: 'From Coding to Engineering Thinking' }
      ]
    },
    jinan: {
      initials: 'JA',
      nameAr: 'جنان (Jenan)',
      nameEn: 'Jenan',
      roleAr: 'مهندسة ذكاء اصطناعي وتصميم منطق الأنظمة (AI Engineering & Logic)',
      roleEn: 'AI Engineering & Algorithmic Logic Specialist',
      bioAr: 'طالبة ومهندسة ذكاء اصطناعي في AXIOUX، تركّز على الأساس الرياضي والمنطقي للخوارزميات، تحليل المشكلات المعقدة (Problem Solving)، وتصميم الهياكل المنطقية للأنظمة قبل تحويلها إلى كود فعّال بـ Python وC++.',
      bioEn: 'AI engineering specialist at AXIOUX focused on the mathematical and logical foundations of algorithms, structural problem solving, and designing clean system logic in Python and C++.',
      skills: ['AI Engineering', 'Mathematical Logic', 'Problem Solving', 'Algorithms', 'Python & C++'],
      projects: [
        { id: 'p1', titleAr: 'منصة التعلم والتصحيح البرمجي الذكي', titleEn: 'Smart Code Learning & AI Grading Platform' },
        { id: 'p3', titleAr: 'منصة "شَـفـاء" للفرز الصحي الذكي', titleEn: 'Shifaa Smart Healthcare Triage Platform' }
      ],
      articles: [
        { id: 'a1', titleAr: 'مقال جنان (Jenan): من برمجة » تفكير هندسي.. المنطق والـ Problem Solving', titleEn: 'Jenan’s Article: From Coding to Engineering Thinking & Problem Solving' }
      ]
    },
    saleh: {
      initials: 'SF',
      nameAr: 'صالح',
      nameEn: 'Saleh',
      roleAr: 'مهندس أمن سيبراني وحماية الأنظمة',
      roleEn: 'Cyber Security & Backend Engineer',
      bioAr: 'يشرف على معايير أمن المعلومات، تشفير السجلات الطبية الحساسة (HIPAA/Security Standards)، وحماية بيئات تنفيذ الأكواد وبوابات الدفع الإلكتروني.',
      bioEn: 'Leads application security, end-to-end encryption for sensitive medical records (HIPAA standards), sandboxed code execution security, and payment safety.',
      skills: ['Cyber Security', 'HIPAA / Encryption', 'WebAssembly Sandboxing', 'Secure APIs', 'Auth Systems'],
      projects: [
        { id: 'p1', titleAr: 'منصة التعلم والتصحيح البرمجي الذكي', titleEn: 'Smart Code Learning & AI Grading Platform' },
        { id: 'p3', titleAr: 'منصة "شَـفـاء" للفرز الصحي الذكي', titleEn: 'Shifaa Smart Healthcare Triage Platform' }
      ],
      articles: [
        { id: 'a2', titleAr: 'بناء أنظمة ذكية تثبت جدارتها عبر الزمن', titleEn: 'Building Intelligent Systems That Prove Their Worth' }
      ]
    },
    abdelrahman: {
      initials: 'AJ',
      nameAr: 'عبد الرحمن',
      nameEn: 'Abdelrahman',
      roleAr: 'مهندس برمجيات وواجهات الاستخدام (Software & Frontend Engineer)',
      roleEn: 'Software & Frontend UI Engineer',
      bioAr: 'مهندس برمجيات وواجهات في AXIOUX، يؤمن بأن جوهر التميز البرمجي ينبع من إتقان أساسيات علوم الحاسوب والتفكير الحاسوبي والخوارزميات عبر لغات مثل C++ وPython لتحويل المشكلات إلى حلول عملية فعّالة.',
      bioEn: 'Software and UI engineer at AXIOUX driven by strong computer science fundamentals, computational thinking, and algorithmic problem-solving across C++, Python, and modern web interfaces.',
      skills: ['Computer Science Fundamentals', 'C++ & Python', 'Computational Thinking', 'Frontend & Web UI', 'Problem Solving'],
      projects: [
        { id: 'p1', titleAr: 'منصة التعلم والتصحيح البرمجي الذكي', titleEn: 'Smart Code Learning & AI Grading Platform' },
        { id: 'p2', titleAr: 'منصة دعم المتاجر والمشاريع الصغيرة', titleEn: 'SME & Micro-Storefront Cloud Platform' }
      ],
      articles: [
        { id: 'a3', titleAr: 'مقال عبد الرحمن: لماذا يجب أن نتعلم علوم الحاسوب قبل التعمق في لغات البرمجة؟', titleEn: 'Abdelrahman’s Article: Why Learn Computer Science Before Programming Languages?' }
      ]
    },
    bashar: {
      initials: 'BB',
      nameAr: 'بشّار بشناق',
      nameEn: 'Bashar Bushnaq',
      roleAr: 'مطور أنظمة خلفية وحلول بالذكاء الاصطناعي (Backend & AI Solutions)',
      roleEn: 'Backend Developer & AI Solutions Engineer',
      bioAr: 'مطوّر ويب خلفي (Backend) يبني الأنظمة وواجهات البرمجة، ويوظّف الذكاء الاصطناعي لإيجاد حلول عملية للمشكلات وتحويلها إلى منتجات رقمية فعّالة.',
      bioEn: 'Backend web developer who builds robust systems and APIs, and uses AI to find practical solutions to real-world problems and turn them into effective digital products.',
      skills: ['Backend Development', 'RESTful APIs', 'AI-Powered Solutions', 'Problem Solving', 'Databases'],
      projects: [
        { id: 'p1', titleAr: 'منصة التعلم والتصحيح البرمجي الذكي', titleEn: 'Smart Code Learning & AI Grading Platform' },
        { id: 'p2', titleAr: 'منصة دعم المتاجر والمشاريع الصغيرة', titleEn: 'SME & Micro-Storefront Cloud Platform' },
        { id: 'p3', titleAr: 'منصة "شَـفـاء" للفرز الصحي الذكي', titleEn: 'Shifaa Smart Healthcare Triage Platform' }
      
      ],
      articles: [
       " ....."
      ]
    }
  };

  const fullArticlesData = {
    a1: {
      ar: {
        badge: 'هندسة الذكاء الاصطناعي والمنطق · بقلم: جنان (Jenan)',
        title: 'من برمجة إلى تفكير هندسي: كيف يصنع المنطق الرياضي والـ Problem Solving مهندس ذكاء اصطناعي؟',
        meta: 'بقلم: جنان (Jenan) · مهندسة ذكاء اصطناعي في AXIOUX',
        body: '<h4>١. من برمجة » تفكير هندسي...</h4>' +
              '<p>كطالبة بتدرس هندسة ذكاء اصطناعي.. أول درس تعلمته إنو الـ <strong>AI</strong> مش سحر ولا كلام خيالي.. هو بالأساس رياضيات، هو منطق، وهو بردو خوارزميات مصفوفة صح!!</p>' +
              '<p>التحدي بالرحلة الأكاديمية مش بس إنو نتعلم نكتب كود بلغة زي <strong>C++</strong> أو <strong>Python</strong> أو غيرها، بل كيف تفهم المنطق الرياضي والتفكير اللي بنبنى عليه النموذج... الذكاء الاصطناعي بيعلمك كيف تفكر كمشكلة وتصمملها حل منطقي قبل ما تبلش كتابة سطر كود، وهاد بالزبط الأساس اللي بيبني مهندس AI شاطر...</p>' +
              '<h4>٢. Logic &amp; Problem Solving — ليه المنطق والتفكير الهيكلي أهم من حفظ الكود؟!</h4>' +
              '<p>مرات نيجي نسأل حالنا كدا: هو ليه المنطق والتفكير الهيكلي أهم من حفظ الكود؟! كتير ناس بفكروا إنو البرمجة هي حفظ.. بس بالدراسة العملية بتكتشف إنو <strong>80% من الشغل هو تحليل منطقي وتصميم الدوائر والـ Logic للمشروع</strong>.</p>' +
              '<p>لما تفهم كيف الأفكار بتترتب وكيف الداتا بتتحرك داخل النظام... بتصير أي لغة برمجة مجرد أداة للتنفيذ. الفهم العميق للأساسيات هو اللي بخليك تبني مشاريع صح من أول مرة بدون تعقيد....</p>' +
              '<h4>٣. الـ Problem Solving والحياة العملية للهندسة..</h4>' +
              '<p>أكبر درس بتطلع فيه بسنواتك الأولى بهندسة الذكاء الاصطناعي هو <strong>الصبر على الـ Problem Solving</strong>.. يعني ازاي؟! يعني عادي جداً تقعد ساعتين تعيد وتزيد بخوارزمية أو تجرّب فكرة وما تزبط من أول مرة بس!!</p>' +
              '<p>الشعور لما الكود يشتغل والمنطق يزبط بيمحي كل التعب. البرمجة والهندسة مش بس دراسة مواد... بل هي أسلوب تفكير بيعلمك كيف تفكك أي مشكلة كبيرة لأجزاء صغيرة وتحلها خطوة بخطوة...</p>'
      },
      en: {
        badge: 'AI Engineering & Logic · By: Jenan',
        title: 'From Coding to Engineering Thinking: How Mathematical Logic & Problem Solving Forge an AI Engineer',
        meta: 'By: Jenan · AI Engineer at AXIOUX',
        body: '<h4>1. From Coding » Engineering Thinking...</h4>' +
              '<p>As an AI engineering student, the very first lesson I learned is that <strong>AI</strong> is neither magic nor science fiction — at its core, it is mathematics, logic, and carefully aligned algorithms!</p>' +
              '<p>The real challenge in the academic and engineering journey is not merely writing syntax in <strong>C++</strong> or <strong>Python</strong>, but understanding the mathematical logic and reasoning behind the model. AI teaches you to analyze a problem and design its logical solution before writing a single line of code — and that is the exact foundation of a strong AI engineer.</p>' +
              '<h4>2. Logic &amp; Problem Solving — Why Structural Thinking Beats Memorizing Syntax</h4>' +
              '<p>Why is logical, structural thinking far more important than memorizing code? Many assume programming is about memorization, but hands-on practice reveals that <strong>80% of the work is logical analysis and designing the system’s flow</strong>.</p>' +
              '<p>Once you understand how ideas are structured and how data moves through a system, any programming language becomes simply an execution tool. Deep mastery of fundamentals is what enables you to build projects right the first time without unnecessary complexity.</p>' +
              '<h4>3. Patience in Problem Solving &amp; Real Engineering Life</h4>' +
              '<p>The biggest lesson in the early years of AI engineering is <strong>patience with Problem Solving</strong>: spending hours iterating on an algorithm or testing an approach that does not work on the first try — until the moment the logic clicks and the code runs, erasing all the fatigue.</p>' +
              '<p>Programming and engineering are not just academic courses; they are a mindset that teaches you how to break any complex challenge into small parts and solve them step by step.</p>'
      }
    },
    a2: {
      ar: {
        badge: 'الرؤية التقنية وهندسة الأنظمة · بقلم: نورهان طلال حسونة (CTO)',
        title: 'بناء أنظمة ذكية تثبت جدارتها عبر الزمن: الرؤية التقنية والمعمارية الهندسية في AXIOUX',
        meta: 'بقلم: نورهان طلال حسونة (Nourhan Talal Hassouna) · المديرة التقنية (CTO) ومهندسة ذكاء اصطناعي في AXIOUX',
        body: '<h4>١. من التحديات المعقدة إلى منتجات ذكية عالية الموثوقية</h4>' +
              '<p>بصفتي <strong>مهندسة ذكاء اصطناعي والمديرة التقنية (CTO) في AXIOUX</strong>، أحوّل التحديات المعقدة إلى منتجات رقمية ذكية، قابلة للتوسع وعالية الموثوقية. أؤمن بأن التكنولوجيا العظيمة لا تقتصر على كتابة الأكواد، بل تكمن في بناء أنظمة ذكية تصنع أثراً حقيقياً وتثبت جدارتها عبر الزمن.</p>' +
              '<h4>٢. قيادة الرؤية التقنية ومعايير الجودة الصارمة</h4>' +
              '<p>أقود الرؤية التقنية والتنفيذ الهندسي في الشركة، وأتولى اختيار البنية التقنية (<strong>Tech Stack</strong>) الأمثل لمشاريعنا، ودمج أحدث حلول الذكاء الاصطناعي، والحفاظ على معايير جودة صارمة عبر المراجعة الدقيقة للكود.</p>' +
              '<h4>٣. تجسيد فلسفة The Art of Being Worthy في كل سطر برمجي</h4>' +
              '<p>وبالعمل عن قرب مع فريقنا الموهوب، أحرص على أن يعكس كل سطر برمجي نطلقه فلسفتنا الأساسية: <strong>The Art of Being Worthy</strong>.</p>'
      },
      en: {
        badge: 'CTO Vision & Architecture · By: Nourhan Talal Hassouna',
        title: 'Building Intelligent Systems That Prove Their Worth Over Time: Technical Vision & Architecture at AXIOUX',
        meta: 'By: Nourhan Talal Hassouna · Chief Technology Officer (CTO) & AI Engineer at AXIOUX',
        body: '<h4>1. Turning Complex Challenges Into Scalable, Reliable Digital Products</h4>' +
              '<p>As an <strong>AI Engineer and Chief Technology Officer (CTO) at AXIOUX</strong>, I transform complex challenges into smart, scalable, and highly reliable digital products. I believe great technology is not limited to writing code — it lies in building intelligent systems that create real impact and prove their worth over time.</p>' +
              '<h4>2. Leading Technical Vision, Tech Stack &amp; Code Quality</h4>' +
              '<p>I lead the technical vision and engineering execution across the organization, overseeing the optimal <strong>Tech Stack</strong> for our platforms, integrating advanced AI solutions, and maintaining strict quality standards through rigorous code reviews.</p>' +
              '<h4>3. Living Our Core Philosophy: The Art of Being Worthy</h4>' +
              '<p>Working closely with our talented team, I ensure that every single line of code we ship reflects our foundational philosophy: <strong>The Art of Being Worthy</strong>.</p>'
      }
    },
    a3: {
      ar: {
        badge: 'علوم الحاسوب والتفكير الحاسوبي · بقلم: عبد الرحمن',
        title: 'لماذا يجب أن نتعلم علوم الحاسوب قبل التعمق في لغات البرمجة؟',
        meta: 'بقلم: عبد الرحمن (Abdelrahman) · مهندس برمجيات وواجهات في AXIOUX',
        body: '<p>في بداية رحلتي مع البرمجة، كنت أعتقد أن تعلم البرمجة يقتصر على تعلم لغة معينة وإتقان أوامرها، لكن مع أولى خطواتي في هذا المجال بدأت أكتشف أن البرمجة أعمق بكثير من مجرد كتابة الأكواد؛ فهي طريقة للتفكير وتحليل المشكلات وإيجاد الحلول المناسبة لها.</p>' +
              '<h4>١. البداية مع لغة C++ وإدراك جوهر الأدوات المنطقية</h4>' +
              '<p>كانت بدايتي مع لغة <strong>C++</strong>، ومن خلالها تعرفت على المفاهيم الأساسية للبرمجة مثل المتغيرات، والشروط، والحلقات التكرارية، والدوال. ومع الوقت بدأت أدرك أن هذه المفاهيم ليست مجرد أوامر نحفظها، بل أدوات تساعدنا على بناء حلول منطقية ومنظمة.</p>' +
              '<h4>٢. بين تحكّم C++ وبساطة ومرونة Python</h4>' +
              '<p>كما بدأت أهتم بالتعرف على لغة <strong>Python</strong>، التي تتميز ببساطة كتابتها وسهولة قراءتها، وتُستخدم في مجالات متعددة مثل الذكاء الاصطناعي وتحليل البيانات وتطوير الويب. وعلى عكس C++، التي تمنح المبرمج تحكمًا أكبر في تفاصيل البرنامج وتُستخدم في التطبيقات التي تحتاج إلى أداء عالٍ، تجعل Python كتابة البرامج وقراءتها أكثر سهولة للمبتدئين.</p>' +
              '<p>ورغم اختلاف اللغتين في طريقة كتابة الكود وبعض الاستخدامات، فإنهما تشتركان في مفاهيم برمجية أساسية، وهذا ما جعلني أفهم أن تعلم البرمجة لا يتعلق بلغة واحدة، بل بفهم المبادئ التي تقوم عليها.</p>' +
              '<h4>٣. أهمية علوم الحاسوب وبناء التفكير الحاسوبي</h4>' +
              '<p>من هنا بدأت أقتنع بأهمية علوم الحاسوب؛ فهي تمنحنا أساسًا قويًا لفهم الخوارزميات وهياكل البيانات وطريقة عمل الحاسوب، والأهم من ذلك تطوير مهارة التفكير الحاسوبي، التي تساعدنا على تقسيم المشكلات وتحليلها والوصول إلى حلول فعّالة.</p>' +
              '<p>ما زلت في بداية رحلتي، وأعرف أن أمامي الكثير لأتعلمه، لكنني أصبحت أؤمن أن بناء أساس قوي أهم من الاستعجال في تعلم أكبر عدد من لغات البرمجة.</p>' +
              '<p><strong>فالمبرمج المتميز ليس من يعرف أكبر عدد من اللغات، بل من يستطيع التفكير بطريقة صحيحة وتحويل المشكلات إلى حلول فعّالة.</strong></p>'
      },
      en: {
        badge: 'Computer Science Fundamentals · By: Abdelrahman',
        title: 'Why Should We Learn Computer Science Before Diving Deep Into Programming Languages?',
        meta: 'By: Abdelrahman · Software & UI Engineer at AXIOUX',
        body: '<p>At the beginning of my programming journey, I used to think learning programming meant mastering a single language and memorizing its commands. With my first steps in the field, I discovered that programming is much deeper than writing syntax — it is a way of thinking, analyzing problems, and crafting effective solutions.</p>' +
              '<h4>1. Starting With C++ &amp; Discovering Logical Building Blocks</h4>' +
              '<p>My journey began with <strong>C++</strong>, where I learned core programming concepts such as variables, conditionals, loops, and functions. Over time, I realized these concepts are not commands to memorize, but tools for building structured, logical solutions.</p>' +
              '<h4>2. Bridging Low-Level Control in C++ &amp; Expressive Simplicity in Python</h4>' +
              '<p>I then explored <strong>Python</strong>, known for its clean readability and wide adoption across AI, data analysis, and web development. While C++ gives developers fine-grained control for high-performance systems, Python makes expressing and reading programs remarkably intuitive.</p>' +
              '<p>Despite their differences in syntax and use cases, both languages share the exact same underlying principles — proving that programming is about mastering fundamentals rather than a single language.</p>' +
              '<h4>3. Why Computer Science Comes First</h4>' +
              '<p>Computer science provides the foundation to understand algorithms, data structures, and how computers actually work — and most importantly, it cultivates computational thinking to decompose complex problems into effective solutions.</p>' +
              '<p><strong>A standout programmer is not the one who knows the most languages, but the one who thinks clearly and turns problems into effective solutions.</strong></p>'
      }
    }
  };

  const SVG_ICONS = {
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.97-.31-1.66-.61-2.92-1.26-4.82-4.21-4.97-4.4-.15-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.01-2.42.27-.29.58-.36.78-.36.19 0 .39.01.56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.56.34.08.12.08.7-.16 1.38z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.94 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.06 0z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>'
  };

  function renderDirectAndFooterChannels() {
    const channels = [];
    const digits = (SITE_CONFIG.WHATSAPP_NUMBER || '').replace(/\D/g, '');
    if (digits) channels.push({ href: 'https://wa.me/' + digits, icon: SVG_ICONS.whatsapp, label: 'WhatsApp', ariaAr: 'واتساب', ariaEn: 'WhatsApp' });
    if (SITE_CONFIG.INSTAGRAM_URL) channels.push({ href: SITE_CONFIG.INSTAGRAM_URL, icon: SVG_ICONS.instagram, label: 'Instagram', ariaAr: 'إنستغرام', ariaEn: 'Instagram' });
    if (SITE_CONFIG.TELEGRAM_URL) channels.push({ href: SITE_CONFIG.TELEGRAM_URL, icon: SVG_ICONS.telegram, label: 'Telegram', ariaAr: 'تيليجرام', ariaEn: 'Telegram' });
    if (SITE_CONFIG.LINKEDIN_URL) channels.push({ href: SITE_CONFIG.LINKEDIN_URL, icon: SVG_ICONS.linkedin, label: 'LinkedIn', ariaAr: 'لينكدإن', ariaEn: 'LinkedIn' });
    if (SITE_CONFIG.GITHUB_URL) channels.push({ href: SITE_CONFIG.GITHUB_URL, icon: SVG_ICONS.github, label: 'GitHub', ariaAr: 'جيت هاب', ariaEn: 'GitHub' });
    if (SITE_CONFIG.CONTACT_EMAIL) channels.push({ href: 'mailto:' + SITE_CONFIG.CONTACT_EMAIL, icon: SVG_ICONS.email, label: 'Email', ariaAr: 'البريد', ariaEn: 'Email' });

    const directWrap = document.getElementById('directChannelsWrap');
    const directRow = document.getElementById('directSocialRow');
    const footerRow = document.getElementById('footerSocialRow');
    const waCommWrap = document.getElementById('waCommunityWrap');

    const buttonsHtml = channels.map(ch => {
      const aria = currentLang === 'ar' ? ch.ariaAr : ch.ariaEn;
      return '<a href="' + ch.href + '" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="' + aria + '">' + ch.icon + '<span>' + ch.label + '</span></a>';
    }).join('');

    if (directRow) directRow.innerHTML = buttonsHtml;
    if (footerRow) footerRow.innerHTML = buttonsHtml;

    if (waCommWrap) {
      if (SITE_CONFIG.WHATSAPP_COMMUNITY_LINK) {
        waCommWrap.innerHTML = '<a href="' + SITE_CONFIG.WHATSAPP_COMMUNITY_LINK + '" class="btn btn-primary" target="_blank" rel="noopener noreferrer" style="width:100%;">' + SVG_ICONS.whatsapp + '<span>' + i18n[currentLang].btn_join_wa_comm + '</span></a>';
      } else {
        waCommWrap.innerHTML = '';
      }
    }
    if (directWrap) directWrap.style.display = (channels.length > 0 || SITE_CONFIG.WHATSAPP_COMMUNITY_LINK) ? 'block' : 'none';
  }

  function renderProjectConfigLinks() {
    document.querySelectorAll('[data-proj-links]').forEach(container => {
      const pid = container.getAttribute('data-proj-links');
      const cfg = (SITE_CONFIG.PROJECT_LINKS && SITE_CONFIG.PROJECT_LINKS[pid]) || {};
      let htmlLinks = '';
      if (cfg.demo) {
        const lbl = currentLang === 'ar' ? 'معاينة حية' : 'Live Demo';
        htmlLinks += '<a href="' + cfg.demo + '" class="social-icon-btn" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">' + SVG_ICONS.external + '<span>' + lbl + '</span></a>';
      }
      if (cfg.github) {
        htmlLinks += '<a href="' + cfg.github + '" class="social-icon-btn" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">' + SVG_ICONS.github + '<span>GitHub</span></a>';
      }
      container.innerHTML = htmlLinks;
    });
  }

  function bindPreselectContactButtons() {
    document.querySelectorAll('.preselect-contact-btn').forEach(btn => {
      btn.onclick = () => {
        const inq = btn.getAttribute('data-inquiry') || 'partnership';
        const selectEl = document.getElementById('inquiryType');
        if (selectEl) selectEl.value = inq;
        const contactSec = document.getElementById('contact');
        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('senderName');
        if (nameInput) setTimeout(() => nameInput.focus(), 450);
      };
    });
  }

  function updateRealStatsFromDOM() {
    const mCount = document.querySelectorAll('#coreTeamGrid .member-card').length;
    const pCount = document.querySelectorAll('#projectsGrid .project-card').length;
    const aCount = document.querySelectorAll('#articlesGrid .article-card').length;
    const mEl = document.getElementById('statMembersCount');
    const pEl = document.getElementById('statProjectsCount');
    const aEl = document.getElementById('statArticlesCount');
    if (mEl) mEl.textContent = String(mCount);
    if (pEl) pEl.textContent = String(pCount);
    if (aEl) aEl.textContent = String(aCount);
  }

  function getCustomMemberAvatars() {
    try { return JSON.parse(localStorage.getItem('axioux_member_avatars') || '{}'); } catch (e) { return {}; }
  }

  function applySavedAvatarsToPage() {
    const map = getCustomMemberAvatars();
    document.querySelectorAll('[data-avatar-box]').forEach(box => {
      const id = box.getAttribute('data-avatar-box');
      const cfgPhoto = (SITE_CONFIG.TEAM_LINKS && SITE_CONFIG.TEAM_LINKS[id] && SITE_CONFIG.TEAM_LINKS[id].photo) || '';
      const src = map[id] || cfgPhoto;
      if (src) {
        const m = teamMembersData[id];
        const altName = m ? (currentLang === 'ar' ? m.nameAr : m.nameEn) : id;
        box.innerHTML = '<img src="' + src + '" alt="' + altName + '" width="86" height="86" loading="lazy" style="width:100%;height:100%;object-fit:cover;">';
      } else if (teamMembersData[id]) {
        const customCrests = {
          qassam:
            '<svg viewBox="0 0 100 100" width="86" height="86">' +
              '<defs><linearGradient id="g-q" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#60A5FA"/><stop offset="100%" stop-color="#F59E0B"/></linearGradient></defs>' +
              '<circle cx="50" cy="50" r="42" fill="none" stroke="url(#g-q)" stroke-width="1.6" stroke-dasharray="5 3" opacity="0.75"/>' +
              '<path d="M26 28 C42 28, 47 44, 50 48 C47 52, 42 68, 26 68 C36 58, 41 52, 45 48 C41 44, 36 38, 26 28 Z" fill="#F8F7F3"/>' +
              '<path d="M74 28 C58 28, 53 44, 50 48 C53 52, 58 68, 74 68 C64 58, 59 52, 55 48 C59 44, 64 38, 74 28 Z" fill="#3B82F6"/>' +
              '<path d="M50 10 L53 22 L62 25 L53 28 L50 40 L47 28 L38 25 L47 22 Z" fill="#FBBF24"/>' +
              '<rect x="14" y="72" width="72" height="17" rx="8.5" fill="rgba(15,23,42,0.92)" stroke="#60A5FA" stroke-width="1"/>' +
              '<text x="50" y="83.5" text-anchor="middle" fill="#F8F7F3" font-family="Cairo, Inter, sans-serif" font-size="9.5" font-weight="800" letter-spacing="0.5">قسّام · QH</text>' +
            '</svg>',
          nourhan:
            '<svg viewBox="0 0 100 100" width="86" height="86">' +
              '<defs><linearGradient id="g-n" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#38BDF8"/><stop offset="100%" stop-color="#818CF8"/></linearGradient></defs>' +
              '<circle cx="50" cy="50" r="42" fill="none" stroke="url(#g-n)" stroke-width="1.6" stroke-dasharray="4 4" opacity="0.8"/>' +
              '<polygon points="50,14 74,27 50,40 26,27" fill="rgba(56,189,248,0.25)" stroke="#38BDF8" stroke-width="1.8"/>' +
              '<polyline points="26,38 50,51 74,38" fill="none" stroke="#818CF8" stroke-width="2"/>' +
              '<polyline points="26,49 50,62 74,49" fill="none" stroke="#60A5FA" stroke-width="2"/>' +
              '<circle cx="50" cy="27" r="3.5" fill="#F8F7F3"/>' +
              '<rect x="12" y="72" width="76" height="17" rx="8.5" fill="rgba(15,23,42,0.92)" stroke="#38BDF8" stroke-width="1"/>' +
              '<text x="50" y="83.5" text-anchor="middle" fill="#F8F7F3" font-family="Cairo, Inter, sans-serif" font-size="9" font-weight="800">نورهان · NTH</text>' +
            '</svg>',
          abdulaziz:
            '<svg viewBox="0 0 100 100" width="86" height="86">' +
              '<circle cx="50" cy="44" r="24" fill="none" stroke="#38BDF8" stroke-width="1.8" stroke-dasharray="6 4"/>' +
              '<polygon points="50,22 68,32 68,54 50,64 32,54 32,32" fill="rgba(59,130,246,0.2)" stroke="#60A5FA" stroke-width="1.8"/>' +
              '<circle cx="50" cy="43" r="6" fill="#38BDF8"/>' +
              '<rect x="10" y="72" width="80" height="17" rx="8.5" fill="rgba(15,23,42,0.92)" stroke="#60A5FA" stroke-width="1"/>' +
              '<text x="50" y="83.5" text-anchor="middle" fill="#F8F7F3" font-family="Cairo, Inter, sans-serif" font-size="8.5" font-weight="800">عبدالعزيز · AZ</text>' +
            '</svg>',
          batool:
            '<svg viewBox="0 0 100 100" width="86" height="86">' +
              '<circle cx="50" cy="44" r="25" fill="rgba(129,140,248,0.12)" stroke="#818CF8" stroke-width="1.5" stroke-dasharray="3 3"/>' +
              '<path d="M50 16 L55 37 L76 42 L55 47 L50 68 L45 47 L24 42 L45 37 Z" fill="#60A5FA"/>' +
              '<circle cx="50" cy="42" r="5" fill="#F8F7F3"/>' +
              '<circle cx="33" cy="27" r="2.5" fill="#93C5FD"/><circle cx="67" cy="27" r="2.5" fill="#93C5FD"/>' +
              '<rect x="14" y="72" width="72" height="17" rx="8.5" fill="rgba(15,23,42,0.92)" stroke="#818CF8" stroke-width="1"/>' +
              '<text x="50" y="83.5" text-anchor="middle" fill="#F8F7F3" font-family="Cairo, Inter, sans-serif" font-size="9.5" font-weight="800">بتول · BT</text>' +
            '</svg>',
          lama:
            '<svg viewBox="0 0 100 100" width="86" height="86">' +
              '<circle cx="50" cy="44" r="25" fill="rgba(45,212,191,0.1)" stroke="#2DD4BF" stroke-width="1.5"/>' +
              '<rect x="33" y="44" width="6" height="16" rx="3" fill="#38BDF8"/>' +
              '<rect x="44" y="34" width="6" height="26" rx="3" fill="#60A5FA"/>' +
              '<rect x="55" y="25" width="6" height="35" rx="3" fill="#2DD4BF"/>' +
              '<path d="M30 42 Q48 22 66 24" fill="none" stroke="#F8F7F3" stroke-width="1.8"/>' +
              '<rect x="14" y="72" width="72" height="17" rx="8.5" fill="rgba(15,23,42,0.92)" stroke="#2DD4BF" stroke-width="1"/>' +
              '<text x="50" y="83.5" text-anchor="middle" fill="#F8F7F3" font-family="Cairo, Inter, sans-serif" font-size="9.5" font-weight="800">لمى · LM</text>' +
            '</svg>',
          jinan:
            '<svg viewBox="0 0 100 100" width="86" height="86">' +
              '<circle cx="50" cy="43" r="25" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="5 3"/>' +
              '<polygon points="50,19 71,43 50,67 29,43" fill="rgba(59,130,246,0.22)" stroke="#60A5FA" stroke-width="1.8"/>' +
              '<circle cx="50" cy="43" r="7" fill="none" stroke="#F8F7F3" stroke-width="1.8"/>' +
              '<circle cx="50" cy="43" r="2.5" fill="#38BDF8"/>' +
              '<rect x="12" y="72" width="76" height="17" rx="8.5" fill="rgba(15,23,42,0.92)" stroke="#38BDF8" stroke-width="1"/>' +
              '<text x="50" y="83.5" text-anchor="middle" fill="#F8F7F3" font-family="Cairo, Inter, sans-serif" font-size="9" font-weight="800">جنان · JENAN</text>' +
            '</svg>',
          saleh:
            '<svg viewBox="0 0 100 100" width="86" height="86">' +
              '<path d="M50 17 L72 26 V43 C72 56 62 65 50 69 C38 65 28 56 28 43 V26 Z" fill="rgba(59,130,246,0.2)" stroke="#60A5FA" stroke-width="2"/>' +
              '<rect x="44" y="39" width="12" height="11" rx="2" fill="#F8F7F3"/>' +
              '<path d="M46 39 V35 A4 4 0 0 1 54 35 V39" fill="none" stroke="#60A5FA" stroke-width="2"/>' +
              '<rect x="14" y="72" width="72" height="17" rx="8.5" fill="rgba(15,23,42,0.92)" stroke="#60A5FA" stroke-width="1"/>' +
              '<text x="50" y="83.5" text-anchor="middle" fill="#F8F7F3" font-family="Cairo, Inter, sans-serif" font-size="9.5" font-weight="800">صالح · SL</text>' +
            '</svg>',
          abdelrahman:
            '<svg viewBox="0 0 100 100" width="86" height="86">' +
              '<circle cx="50" cy="43" r="25" fill="rgba(59,130,246,0.12)" stroke="#60A5FA" stroke-width="1.5"/>' +
              '<polyline points="39,32 28,43 39,54" fill="none" stroke="#38BDF8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
              '<polyline points="61,32 72,43 61,54" fill="none" stroke="#38BDF8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
              '<line x1="54" y1="29" x2="46" y2="57" stroke="#F8F7F3" stroke-width="2.2" stroke-linecap="round"/>' +
              '<rect x="8" y="72" width="84" height="17" rx="8.5" fill="rgba(15,23,42,0.92)" stroke="#38BDF8" stroke-width="1"/>' +
              '<text x="50" y="83.5" text-anchor="middle" fill="#F8F7F3" font-family="Cairo, Inter, sans-serif" font-size="8.2" font-weight="800">عبدالرحمن · AR</text>' +
            '</svg>',
            bashar:
            '<svg viewBox="0 0 100 100" width="86" height="86">' +
              '<defs><linearGradient id="g-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#38BDF8"/><stop offset="100%" stop-color="#A78BFA"/></linearGradient></defs>' +
              '<circle cx="50" cy="43" r="27" fill="rgba(56,189,248,0.1)" stroke="url(#g-b)" stroke-width="1.6" stroke-dasharray="5 3" opacity="0.85"/>' +
              '<ellipse cx="50" cy="31" rx="15" ry="5.5" fill="rgba(59,130,246,0.25)" stroke="#60A5FA" stroke-width="1.8"/>' +
              '<path d="M35 31 V43 C35 46 41.7 48.5 50 48.5 C58.3 48.5 65 46 65 43 V31" fill="none" stroke="#60A5FA" stroke-width="1.8"/>' +
              '<path d="M35 43 V55 C35 58 41.7 60.5 50 60.5 C58.3 60.5 65 58 65 55 V43" fill="none" stroke="#818CF8" stroke-width="1.8"/>' +
              '<circle cx="50" cy="31" r="2.6" fill="#F8F7F3"/>' +
              '<line x1="65" y1="34" x2="76" y2="24" stroke="#38BDF8" stroke-width="1.6" stroke-linecap="round"/>' +
              '<circle cx="77" cy="23" r="4" fill="#38BDF8"/>' +
              '<circle cx="77" cy="23" r="1.6" fill="#F8F7F3"/>' +
              '<line x1="35" y1="34" x2="24" y2="24" stroke="#A78BFA" stroke-width="1.6" stroke-linecap="round"/>' +
              '<circle cx="23" cy="23" r="3.2" fill="#A78BFA"/>' +
              '<rect x="14" y="72" width="72" height="17" rx="8.5" fill="rgba(15,23,42,0.92)" stroke="#38BDF8" stroke-width="1"/>' +
              '<text x="50" y="83.5" text-anchor="middle" fill="#F8F7F3" font-family="Cairo, Inter, sans-serif" font-size="9.5" font-weight="800">بشار · BA</text>' +
            '</svg>'
          
        };
        box.innerHTML = customCrests[id] || ('<span>' + teamMembersData[id].initials + '</span>');
      }
    });
  }

  function buildMemberInlineDrawerContent(memberId) {
    const m = teamMembersData[memberId];
    if (!m) return '';
    const role = currentLang === 'ar' ? m.roleAr : m.roleEn;
    const bio = currentLang === 'ar' ? m.bioAr : m.bioEn;
    const skillsLbl = currentLang === 'ar' ? 'المهارات والتخصصات التقنية:' : 'Technical Specializations & Stack:';
    const projsLbl = currentLang === 'ar' ? 'المشاريع المشارك في تطويرها:' : 'Contributed Projects:';
    const artsLbl = currentLang === 'ar' ? 'المقالات المنشورة:' : 'Published Articles:';
    const uploadLbl = currentLang === 'ar' ? '📷 تغيير صورة الأفاتار' : '📷 Change Avatar Photo';

    const skillsHtml = m.skills.map(s => '<li>' + s + '</li>').join('');
    const projsHtml = m.projects.map(p => {
      const pTitle = currentLang === 'ar' ? p.titleAr : p.titleEn;
      return '<button type="button" class="team-chip-btn inline-jump-proj" data-target-proj="' + p.id + '">🚀 ' + pTitle + '</button>';
    }).join('');
    const artsHtml = m.articles.map(a => {
      const aTitle = currentLang === 'ar' ? a.titleAr : a.titleEn;
      return '<button type="button" class="team-chip-btn inline-jump-art" data-target-art="' + a.id + '">📖 ' + aTitle + '</button>';
    }).join('');

    const adminUploadHtml =
      '<label class="admin-only" onclick="event.stopPropagation()" style="cursor:pointer; font-size:0.78rem; font-weight:700; padding:5px 12px; border-radius:100px; border:1px solid rgba(59,130,246,0.4); color:var(--blue-light); margin-top:8px;">' +
        uploadLbl +
        '<input type="file" class="inline-avatar-input" data-member="' + memberId + '" accept="image/*" style="display:none;">' +
      '</label>';

    return (
      '<div style="font-size:0.86rem; font-weight:800; color:var(--blue-light); margin-bottom:6px;">' + role + '</div>' +
      '<p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:10px;">' + bio + '</p>' +
      '<div style="font-size:0.8rem; font-weight:800; color:var(--blue-light); margin-bottom:6px;">' + skillsLbl + '</div>' +
      '<ul class="tech-stack-tags" style="margin-bottom:10px;">' + skillsHtml + '</ul>' +
      '<div style="font-size:0.8rem; font-weight:800; color:var(--blue-light); margin-bottom:6px;">' + projsLbl + '</div>' +
      '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:10px;">' + projsHtml + '</div>' +
      '<div style="font-size:0.8rem; font-weight:800; color:var(--blue-light); margin-bottom:6px;">' + artsLbl + '</div>' +
      '<div style="display:flex; flex-wrap:wrap; gap:8px;">' + artsHtml + '</div>' +
      adminUploadHtml
    );
  }

  function populateAllMemberInlineDrawers() {
    document.querySelectorAll('[data-member-drawer]').forEach(drawer => {
      const mId = drawer.getAttribute('data-member-drawer');
      drawer.innerHTML = buildMemberInlineDrawerContent(mId);
    });

    document.querySelectorAll('.inline-avatar-input').forEach(inp => {
      inp.onchange = (ev) => {
        const file = ev.target.files && ev.target.files[0];
        const mId = inp.getAttribute('data-member');
        if (!file || !mId) return;
        const reader = new FileReader();
        reader.onload = () => {
          const map = getCustomMemberAvatars();
          map[mId] = reader.result;
          try { localStorage.setItem('axioux_member_avatars', JSON.stringify(map)); } catch (e) {}
          applySavedAvatarsToPage();
        };
        reader.readAsDataURL(file);
      };
    });

    document.querySelectorAll('.inline-jump-proj').forEach(btn => {
      btn.onclick = (ev) => {
        ev.stopPropagation();
        const pid = btn.getAttribute('data-target-proj');
        const pCard = document.querySelector('.project-card[data-proj-id="' + pid + '"]');
        if (pCard) {
          applyFilter('all');
          pCard.classList.add('expanded');
          const toggleBtn = pCard.querySelector('.open-proj-modal-btn');
          if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.textContent = i18n[currentLang].btn_hide_full_proj;
          }
          pCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      };
    });

    document.querySelectorAll('.inline-jump-art').forEach(btn => {
      btn.onclick = (ev) => {
        ev.stopPropagation();
        const aid = btn.getAttribute('data-target-art');
        const artBtn = document.querySelector('.open-art-modal-btn[data-art="' + aid + '"]');
        const artCard = artBtn ? artBtn.closest('.article-card') : null;
        if (artCard) {
          applyArtFilter('all');
          artCard.classList.add('expanded');
          artBtn.setAttribute('aria-expanded', 'true');
          artBtn.textContent = i18n[currentLang].btn_hide_article;
          artCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      };
    });
  }

  function updateCardHintsLanguage() {
    const dict = i18n[currentLang];
    document.querySelectorAll('.team-interactive-card').forEach(card => {
      const isExp = card.classList.contains('expanded');
      const hint = card.querySelector('.member-click-hint');
      if (!hint) return;
      hint.textContent = isExp ? dict.member_hide_btn : dict.member_view_btn;
    });

    document.querySelectorAll('.project-card').forEach(card => {
      const isExp = card.classList.contains('expanded');
      const btn = card.querySelector('.open-proj-modal-btn');
      if (btn) btn.textContent = isExp ? dict.btn_hide_full_proj : dict.btn_view_full_proj;
    });

    document.querySelectorAll('.article-card').forEach(card => {
      const isExp = card.classList.contains('expanded');
      const btn = card.querySelector('.open-art-modal-btn');
      if (btn) btn.textContent = isExp ? dict.btn_hide_article : dict.btn_read_article;
    });

    document.querySelectorAll('[data-art-drawer]').forEach(drawer => {
      const aid = drawer.getAttribute('data-art-drawer');
      if (aid && fullArticlesData[aid]) {
        const d = fullArticlesData[aid][currentLang] || fullArticlesData[aid].ar;
        drawer.innerHTML = d.body;
      }
    });
  }

  const langToggleBtn = document.getElementById('langToggleBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const wingsStage = document.getElementById('wingsStage');
  const mergeWingsBtn = document.getElementById('mergeWingsBtn');
  const equationStatusText = document.getElementById('equationStatusText');
  const equationBox = document.getElementById('equationBox');

  function applyLanguage(lang) {
    currentLang = lang;
    const dict = i18n[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'عربي';
    langToggleBtn.setAttribute('aria-label', dict.aria_lang_btn);
    themeToggleBtn.setAttribute('aria-label', dict.aria_theme_btn);
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-label', dict.aria_menu_btn);

    document.title = dict.page_title;
    const metaDesc = document.getElementById('metaDescription');
    if (metaDesc) metaDesc.setAttribute('content', dict.meta_desc);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) el.innerHTML = dict[key];
    });

    const isIvory = document.body.classList.contains('ivory-mode');
    themeToggleBtn.textContent = isIvory ? dict.btn_night_mode : dict.btn_ivory_mode;

    const isMerged = wingsStage.classList.contains('merged');
    equationStatusText.textContent = isMerged ? dict.eq_merged : dict.eq_unmerged;
    mergeWingsBtn.textContent = isMerged ? dict.btn_unmerge_wings : dict.btn_merge_wings;

    populateAllMemberInlineDrawers();
    updateCardHintsLanguage();
    renderDirectAndFooterChannels();
    renderProjectConfigLinks();
    if (typeof update3DViewerRotateBtnText === 'function') update3DViewerRotateBtnText();
    if (typeof updateCreatorRotateBtnText === 'function') updateCreatorRotateBtnText();
    const promptInput = document.getElementById('modelPromptInput');
    if (promptInput && dict.mc_prompt_placeholder) {
      promptInput.setAttribute('placeholder', dict.mc_prompt_placeholder);
    }
  }

  langToggleBtn.addEventListener('click', () => {
    applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
  });

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('ivory-mode');
    const isIvory = document.body.classList.contains('ivory-mode');
    const dict = i18n[currentLang];
    themeToggleBtn.textContent = isIvory ? dict.btn_night_mode : dict.btn_ivory_mode;
  });

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  const wingDiscipline = document.getElementById('wingDiscipline');
  const wingCreativity = document.getElementById('wingCreativity');

  function toggleWingsMerge() {
    const merged = wingsStage.classList.toggle('merged');
    if (equationBox) equationBox.classList.toggle('merged-state', merged);
    const dict = i18n[currentLang];
    equationStatusText.textContent = merged ? dict.eq_merged : dict.eq_unmerged;
    mergeWingsBtn.textContent = merged ? dict.btn_unmerge_wings : dict.btn_merge_wings;
  }

  mergeWingsBtn.addEventListener('click', toggleWingsMerge);
  wingDiscipline.addEventListener('click', toggleWingsMerge);
  wingCreativity.addEventListener('click', toggleWingsMerge);

  // 5. PROJECTS FILTERING + IN-PLACE EXPANSION
  const filterBtns = document.querySelectorAll('#projects .filter-btn');
  const projectsGrid = document.getElementById('projectsGrid');
  const currentProjectsPlaceholder = document.getElementById('currentProjectsPlaceholder');
  const addFirstCurrentProjBtn = document.getElementById('addFirstCurrentProjBtn');
  const toggleAddDrawerBtn = document.getElementById('toggleAddDrawerBtn');
  const cancelAddDrawerBtn = document.getElementById('cancelAddDrawerBtn');
  const addProjectDrawer = document.getElementById('addProjectDrawer');
  const newProjectForm = document.getElementById('newProjectForm');
  let activeFilter = 'upcoming';

  function applyFilter(cat) {
    activeFilter = cat;
    const cards = projectsGrid.querySelectorAll('.project-card');
    let visibleCurrentCount = 0;

    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const cardDomain = card.getAttribute('data-domain') || '';
      let match = false;

      if (cat === 'all') match = true;
      else if (cat === 'upcoming' || cat === 'current') match = (cardCat === cat);
      else if (cat === 'ai') match = (cardDomain === 'ai' || cardDomain === 'health');
      else match = (cardDomain === cat);

      card.style.display = match ? 'flex' : 'none';
      if (cardCat === 'current') visibleCurrentCount++;
    });

    if (currentProjectsPlaceholder) {
      currentProjectsPlaceholder.style.display = ((cat === 'current' || cat === 'all') && visibleCurrentCount === 0) ? 'flex' : 'none';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-filter') || 'upcoming';
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(cat);
    });
  });

  if (addFirstCurrentProjBtn) {
    addFirstCurrentProjBtn.addEventListener('click', () => {
      document.getElementById('projType').value = 'current';
      addProjectDrawer.classList.add('open');
      addProjectDrawer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  toggleAddDrawerBtn.addEventListener('click', () => { addProjectDrawer.classList.toggle('open'); });
  cancelAddDrawerBtn.addEventListener('click', () => { addProjectDrawer.classList.remove('open'); });

  function toggleProjectCardInPlace(card) {
    const isExpanded = card.classList.toggle('expanded');
    const btn = card.querySelector('.open-proj-modal-btn');
    if (btn) {
      btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      btn.textContent = isExpanded ? i18n[currentLang].btn_hide_full_proj : i18n[currentLang].btn_view_full_proj;
    }
  }

  function appendProjectCard(item) {
    const stage = (item.type === 'current') ? 'current' : 'upcoming';
    const article = document.createElement('article');
    article.className = 'project-card in-view';
    article.setAttribute('data-category', stage);
    article.setAttribute('data-domain', 'ai');
    article.setAttribute('data-curve-pos', '1');

    const badgeText = stage === 'current' ? i18n[currentLang].badge_current : i18n[currentLang].badge_upcoming;
    const tagsHtml = (item.tags || []).map(t => '<li>' + t + '</li>').join('');

    article.innerHTML =
      '<div class="proj-meta-top">' +
        '<span class="proj-domain-pill">' + item.status + '</span>' +
        '<span class="proj-status-tag">' + badgeText + '</span>' +
      '</div>' +
      '<h3>' + item.title + '</h3>' +
      '<p class="proj-short-summary">' + item.desc + '</p>' +
      '<div class="proj-specs-box"><ul class="tech-stack-tags">' + tagsHtml + '</ul></div>' +
      '<div><button type="button" class="btn-read-more open-proj-modal-btn" aria-expanded="false">' + i18n[currentLang].btn_view_full_proj + '</button></div>';

    projectsGrid.prepend(article);
    applyFilter(activeFilter);
    bindInteractiveCardsAndModals();
    updateRealStatsFromDOM();
  }

  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('projTitle').value.trim();
    const type = document.getElementById('projType').value;
    const status = document.getElementById('projStatus').value.trim();
    const tags = document.getElementById('projTags').value.split(',').map(s => s.trim()).filter(Boolean);
    const desc = document.getElementById('projDesc').value.trim();
    appendProjectCard({ title, type, status, tags, desc });
    newProjectForm.reset();
    addProjectDrawer.classList.remove('open');
  });

  // 6. WEB3FORMS CONTACT FORM
  const contactForm = document.getElementById('contactForm');
  const contactSubmitBtn = document.getElementById('contactSubmitBtn');
  const contactToast = document.getElementById('contactToast');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dict = i18n[currentLang];
    const name = document.getElementById('senderName').value.trim();
    const contact = document.getElementById('senderContact').value.trim();
    const selectEl = document.getElementById('inquiryType');
    const inquiryTypeVal = selectEl.value;
    const inquiryText = selectEl.options[selectEl.selectedIndex].text;
    const message = document.getElementById('senderMsg').value.trim();
    const botcheck = document.getElementById('botcheck').checked;

    if (name.length < 2 || contact.length < 5 || message.length < 10) {
      contactToast.style.display = 'block';
      contactToast.style.borderColor = '#EF4444';
      contactToast.textContent = dict.form_err_validation;
      return;
    }

    contactSubmitBtn.disabled = true;
    contactSubmitBtn.textContent = dict.btn_sending_msg;
    contactToast.style.display = 'none';

    try {
      if (!SITE_CONFIG.WEB3FORMS_ACCESS_KEY) throw new Error('MISSING_KEY');
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: SITE_CONFIG.WEB3FORMS_ACCESS_KEY,
          subject: 'AXIOUX — ' + inquiryText,
          from_name: 'AXIOUX Website',
          name: name,
          contact: contact,
          inquiry_type: inquiryTypeVal,
          message: message,
          botcheck: botcheck
        })
      });
      const result = await response.json();
      if (response.ok && result.success === true) {
        contactToast.style.display = 'block';
        contactToast.style.borderColor = '#22C55E';
        contactToast.textContent = dict.form_success_msg;
        contactForm.reset();
      } else {
        throw new Error('FAILED');
      }
    } catch (err) {
      contactToast.style.display = 'block';
      contactToast.style.borderColor = '#EF4444';
      const digits = (SITE_CONFIG.WHATSAPP_NUMBER || '').replace(/\D/g, '');
      if (digits) {
        contactToast.innerHTML = dict.form_err_wa_prefix + '<a href="https://wa.me/' + digits + '" target="_blank" rel="noopener noreferrer" style="color:var(--blue-light);font-weight:800;">WhatsApp</a>';
      } else {
        contactToast.textContent = dict.form_err_generic;
      }
    } finally {
      contactSubmitBtn.disabled = false;
      contactSubmitBtn.textContent = dict.btn_send_msg;
    }
  });

  // 7. ARTICLES & IN-PLACE EXPANSION
  const artFilterBtns = document.querySelectorAll('.art-filter-btn');
  const articlesGrid = document.getElementById('articlesGrid');
  const toggleAddArticleBtn = document.getElementById('toggleAddArticleBtn');
  const cancelAddArticleBtn = document.getElementById('cancelAddArticleBtn');
  const addArticleDrawer = document.getElementById('addArticleDrawer');
  const newArticleForm = document.getElementById('newArticleForm');
  const detailReaderModal = document.getElementById('detailReaderModal');
  const closeReaderModalBtn = document.getElementById('closeReaderModalBtn');
  let activeArtFilter = 'all';

  function applyArtFilter(cat) {
    activeArtFilter = cat;
    articlesGrid.querySelectorAll('.article-card').forEach(card => {
      card.style.display = (cat === 'all' || card.getAttribute('data-art-cat') === cat) ? 'flex' : 'none';
    });
  }

  artFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-art-filter') || 'all';
      artFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyArtFilter(cat);
    });
  });

  toggleAddArticleBtn.addEventListener('click', () => { addArticleDrawer.classList.toggle('open'); });
  cancelAddArticleBtn.addEventListener('click', () => { addArticleDrawer.classList.remove('open'); });
  closeReaderModalBtn.addEventListener('click', () => { detailReaderModal.classList.remove('open'); });

  document.addEventListener('keydown', (e) => {
    if (introSplash && !introSplash.classList.contains('hidden') && (e.key === 'Escape' || e.key === 'Enter')) {
      dismissSplashImmediately();
      return;
    }
    if (e.key === 'Escape') {
      detailReaderModal.classList.remove('open');
      document.querySelectorAll('.team-interactive-card.expanded, .project-card.expanded, .article-card.expanded').forEach(c => {
        c.classList.remove('expanded');
        c.setAttribute('aria-expanded', 'false');
      });
      updateCardHintsLanguage();
    }
  });

  function bindInteractiveCardsAndModals() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.onclick = (e) => {
        if (e.target.closest('a')) return;
        toggleProjectCardInPlace(card);
      };
    });

    document.querySelectorAll('.team-interactive-card').forEach(card => {
      card.onclick = (e) => {
        if (e.target.closest('button, a, label, input')) return;
        const wasExpanded = card.classList.contains('expanded');
        const parent = card.parentElement;
        if (parent) {
          parent.querySelectorAll('.team-interactive-card.expanded').forEach(other => {
            if (other !== card) {
              other.classList.remove('expanded');
              other.setAttribute('aria-expanded', 'false');
            }
          });
        }
        card.classList.toggle('expanded', !wasExpanded);
        card.setAttribute('aria-expanded', !wasExpanded ? 'true' : 'false');
        updateCardHintsLanguage();
      };
      card.onkeydown = (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target === card) {
          e.preventDefault();
          card.click();
        }
      };
    });

    document.querySelectorAll('[data-art-drawer]').forEach(drawer => {
      const aid = drawer.getAttribute('data-art-drawer');
      if (aid && fullArticlesData[aid]) {
        const d = fullArticlesData[aid][currentLang] || fullArticlesData[aid].ar;
        drawer.innerHTML = d.body;
      }
    });

    document.querySelectorAll('.article-card').forEach(card => {
      card.onclick = (e) => {
        if (e.target.closest('a')) return;
        const isExp = card.classList.toggle('expanded');
        const btn = card.querySelector('.open-art-modal-btn');
        if (btn) {
          btn.setAttribute('aria-expanded', isExp ? 'true' : 'false');
          btn.textContent = isExp ? i18n[currentLang].btn_hide_article : i18n[currentLang].btn_read_article;
        }
      };
    });

    document.querySelectorAll('[data-sim-btn]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute('data-sim-btn');
        const outBox = document.getElementById('simOut_' + pid);
        if (outBox) outBox.classList.toggle('visible');
      };
    });
  }

  newArticleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('artTitle').value.trim();
    const category = document.getElementById('artCategory').value;
    const author = document.getElementById('artAuthor').value.trim();
    const readTime = document.getElementById('artReadTime').value.trim();
    const summary = document.getElementById('artSummary').value.trim();
    const body = document.getElementById('artBody').value.trim();

    const article = document.createElement('article');
    article.className = 'article-card';
    article.setAttribute('data-art-cat', category);
    article.innerHTML =
      '<div>' +
        '<div class="article-meta"><span class="article-cat-badge">' + category + '</span><span class="article-read-time">' + readTime + '</span></div>' +
        '<h3>' + title + '</h3>' +
        '<p>' + summary + '</p>' +
        '<div class="article-inline-body"><p style="white-space:pre-line;">' + body + '</p></div>' +
      '</div>' +
      '<div class="article-author-row"><div class="article-author-info"><span>' + author + '</span></div><button type="button" class="btn-read-more open-art-modal-btn">' + i18n[currentLang].btn_read_article + '</button></div>';

    articlesGrid.prepend(article);
    applyArtFilter(activeArtFilter);
    bindInteractiveCardsAndModals();
    updateRealStatsFromDOM();
    newArticleForm.reset();
    addArticleDrawer.classList.remove('open');
  });

  applySavedAvatarsToPage();
  populateAllMemberInlineDrawers();
  bindInteractiveCardsAndModals();
  bindPreselectContactButtons();
  renderDirectAndFooterChannels();
  renderProjectConfigLinks();
  applyFilter('upcoming');
  updateRealStatsFromDOM();

  // ================= 3D BUTTERFLY INTERACTIVE CONTROLLER =================
  let update3DViewerRotateBtnText = null;

  (function init3DButterflyViewer() {
    const viewer = document.getElementById('butterflyModelViewer');
    const toggleRotateBtn = document.getElementById('toggleRotateBtn');
    const viewLeftWingBtn = document.getElementById('viewLeftWingBtn');
    const viewCenterBtn = document.getElementById('viewCenterBtn');
    const viewRightWingBtn = document.getElementById('viewRightWingBtn');
    const resetViewBtn = document.getElementById('resetViewBtn');

    if (!viewer) return;

    // Offline / file protocol fallback to bypass CORS restriction in local browsers
    if (window.location.protocol === 'file:' && window.AXIOUX_BUTTERFLY_B64) {
      viewer.src = 'data:model/gltf-binary;base64,' + window.AXIOUX_BUTTERFLY_B64;
    }

    let isAutoRotating = true;

    function updateRotateBtnState() {
      if (!toggleRotateBtn) return;
      const iconSpan = toggleRotateBtn.querySelector('.btn-icon');
      const textSpan = toggleRotateBtn.querySelector('.btn-text');
      const dict = i18n[currentLang] || i18n.ar;

      if (isAutoRotating) {
        if (iconSpan) iconSpan.textContent = '⏸';
        if (textSpan) {
          textSpan.setAttribute('data-i18n', 'b3d_pause_rotate');
          textSpan.textContent = dict.b3d_pause_rotate;
        }
        toggleRotateBtn.classList.remove('active');
      } else {
        if (iconSpan) iconSpan.textContent = '▶️';
        if (textSpan) {
          textSpan.setAttribute('data-i18n', 'b3d_play_rotate');
          textSpan.textContent = dict.b3d_play_rotate;
        }
        toggleRotateBtn.classList.add('active');
      }
    }

    update3DViewerRotateBtnText = updateRotateBtnState;

    if (toggleRotateBtn) {
      toggleRotateBtn.addEventListener('click', () => {
        isAutoRotating = !isAutoRotating;
        if (isAutoRotating) {
          viewer.setAttribute('auto-rotate', '');
        } else {
          viewer.removeAttribute('auto-rotate');
        }
        updateRotateBtnState();
      });
    }

    function setActiveAngleBtn(btn) {
      [viewLeftWingBtn, viewCenterBtn, viewRightWingBtn].forEach(b => {
        if (b) b.classList.remove('active');
      });
      if (btn) btn.classList.add('active');
    }

    if (viewLeftWingBtn) {
      viewLeftWingBtn.addEventListener('click', () => {
        viewer.cameraOrbit = '40deg 75deg 2.1m';
        viewer.cameraTarget = 'auto auto auto';
        setActiveAngleBtn(viewLeftWingBtn);
      });
    }

    if (viewCenterBtn) {
      viewCenterBtn.addEventListener('click', () => {
        viewer.cameraOrbit = '0deg 75deg 2.2m';
        viewer.cameraTarget = 'auto auto auto';
        setActiveAngleBtn(viewCenterBtn);
      });
    }

    if (viewRightWingBtn) {
      viewRightWingBtn.addEventListener('click', () => {
        viewer.cameraOrbit = '-40deg 75deg 2.1m';
        viewer.cameraTarget = 'auto auto auto';
        setActiveAngleBtn(viewRightWingBtn);
      });
    }

    if (resetViewBtn) {
      resetViewBtn.addEventListener('click', () => {
        viewer.cameraOrbit = '0deg 75deg 2.2m';
        viewer.cameraTarget = 'auto auto auto';
        setActiveAngleBtn(null);
        if (!isAutoRotating) {
          isAutoRotating = true;
          viewer.setAttribute('auto-rotate', '');
          updateRotateBtnState();
        }
      });
    }
  })();

  // ================= 3D MODEL CREATOR ENGINE (THREE.JS) =================
  let updateCreatorRotateBtnText = null;

  (function initModelCreatorEngine() {
    const canvas = document.getElementById('creator3DCanvas');
    const container = document.getElementById('creatorCanvasContainer');
    if (!canvas || !container || typeof THREE === 'undefined') return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8FAFC);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 4.2);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    if ('toneMapping' in renderer) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    }

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.9);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xFFFFFF, 1.1);
    mainKeyLight.position.set(4, 6, 5);
    scene.add(mainKeyLight);

    const blueRimLight = new THREE.DirectionalLight(0x3B82F6, 0.7);
    blueRimLight.position.set(-5, 2, -4);
    scene.add(blueRimLight);

    const warmFillLight = new THREE.DirectionalLight(0xE2E8F0, 0.4);
    warmFillLight.position.set(0, -4, 2);
    scene.add(warmFillLight);

    // 3. Grid Floor
    const gridHelper = new THREE.GridHelper(10, 20, 0x94A3B8, 0xCBD5E1);
    gridHelper.position.y = -1.2;
    scene.add(gridHelper);

    // 4. Materials Library
    const materials = {
      pearl: new THREE.MeshStandardMaterial({
        color: 0xF8F7F3,
        roughness: 0.22,
        metalness: 0.55,
        wireframe: false
      }),
      sapphire: new THREE.MeshStandardMaterial({
        color: 0x1D4ED8,
        roughness: 0.18,
        metalness: 0.85,
        wireframe: false
      }),
      obsidian: new THREE.MeshStandardMaterial({
        color: 0x0F172A,
        roughness: 0.15,
        metalness: 0.95,
        wireframe: false
      }),
      goldAccent: new THREE.MeshStandardMaterial({
        color: 0xF59E0B,
        roughness: 0.25,
        metalness: 0.9,
        wireframe: false
      })
    };

    let activeMaterialMode = 'dual'; // 'dual', 'pearl', 'sapphire'
    let isWireframeActive = false;

    // 5. Procedural 3D Generators
    const activeModelGroup = new THREE.Group();
    scene.add(activeModelGroup);

    let wingLeftPivot, wingRightPivot;

    function buildButterfly() {
      const g = new THREE.Group();

      // Body / Torso
      const bodyGeom = new THREE.CylinderGeometry(0.06, 0.08, 0.8, 16);
      const bodyMesh = new THREE.Mesh(bodyGeom, materials.obsidian);
      bodyMesh.rotation.x = Math.PI / 2.8;
      g.add(bodyMesh);

      // Head
      const headGeom = new THREE.SphereGeometry(0.1, 16, 16);
      const headMesh = new THREE.Mesh(headGeom, materials.obsidian);
      headMesh.position.set(0, 0.15, 0.42);
      g.add(headMesh);

      // Antennae
      [-0.05, 0.05].forEach((xOffset, idx) => {
        const antCurve = new THREE.CylinderGeometry(0.012, 0.008, 0.4, 8);
        const antMesh = new THREE.Mesh(antCurve, materials.obsidian);
        antMesh.position.set(xOffset * 1.5, 0.32, 0.52);
        antMesh.rotation.z = (idx === 0 ? 0.35 : -0.35);
        antMesh.rotation.x = 0.3;
        g.add(antMesh);
      });

      // Left Wing (Pearl White)
      wingLeftPivot = new THREE.Group();
      wingLeftPivot.position.set(-0.06, 0.05, 0.1);

      const lWingShape = new THREE.Shape();
      lWingShape.moveTo(0, 0);
      lWingShape.bezierCurveTo(-0.6, 0.4, -1.3, 0.9, -1.5, 0.4);
      lWingShape.bezierCurveTo(-1.6, -0.1, -1.2, -0.6, -0.6, -0.7);
      lWingShape.bezierCurveTo(-0.3, -0.7, -0.1, -0.3, 0, 0);

      const lWingGeom = new THREE.ExtrudeGeometry(lWingShape, { depth: 0.02, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.015, bevelThickness: 0.015 });
      lWingGeom.center();
      const lWingMesh = new THREE.Mesh(lWingGeom, materials.pearl);
      lWingMesh.position.set(-0.75, 0.05, 0);
      wingLeftPivot.add(lWingMesh);
      g.add(wingLeftPivot);

      // Right Wing (Sapphire Blue)
      wingRightPivot = new THREE.Group();
      wingRightPivot.position.set(0.06, 0.05, 0.1);

      const rWingShape = new THREE.Shape();
      rWingShape.moveTo(0, 0);
      rWingShape.bezierCurveTo(0.6, 0.4, 1.3, 0.9, 1.5, 0.4);
      rWingShape.bezierCurveTo(1.6, -0.1, 1.2, -0.6, 0.6, -0.7);
      rWingShape.bezierCurveTo(0.3, -0.7, 0.1, -0.3, 0, 0);

      const rWingGeom = new THREE.ExtrudeGeometry(rWingShape, { depth: 0.02, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.015, bevelThickness: 0.015 });
      rWingGeom.center();
      const rWingMesh = new THREE.Mesh(rWingGeom, materials.sapphire);
      rWingMesh.position.set(0.75, 0.05, 0);
      wingRightPivot.add(rWingMesh);
      g.add(wingRightPivot);

      g.scale.set(1.4, 1.4, 1.4);
      g.rotation.x = -0.35;
      return g;
    }

    function buildSphere() {
      const g = new THREE.Group();
      // Geodesic Core
      const coreGeom = new THREE.IcosahedronGeometry(0.75, 2);
      const coreMesh = new THREE.Mesh(coreGeom, materials.pearl);
      g.add(coreMesh);

      // Inner Core wireframe glow
      const wireGeom = new THREE.IcosahedronGeometry(0.85, 1);
      const wireMat = new THREE.MeshBasicMaterial({ color: 0x3B82F6, wireframe: true, transparent: true, opacity: 0.6 });
      const wireMesh = new THREE.Mesh(wireGeom, wireMat);
      g.add(wireMesh);

      // Concentric Rings
      const ring1Geom = new THREE.TorusGeometry(1.15, 0.025, 16, 64);
      const ring1 = new THREE.Mesh(ring1Geom, materials.sapphire);
      ring1.rotation.x = Math.PI / 3;
      ring1.userData.rotSpeed = 0.015;
      g.add(ring1);

      const ring2Geom = new THREE.TorusGeometry(1.35, 0.02, 16, 64);
      const ring2 = new THREE.Mesh(ring2Geom, materials.obsidian);
      ring2.rotation.y = Math.PI / 4;
      ring2.userData.rotSpeed = -0.012;
      g.add(ring2);

      g.userData.rings = [ring1, ring2, wireMesh];
      g.scale.set(1.2, 1.2, 1.2);
      return g;
    }

    function buildDrone() {
      const g = new THREE.Group();
      // Center sphere
      const centerGeom = new THREE.SphereGeometry(0.5, 24, 24);
      const centerMesh = new THREE.Mesh(centerGeom, materials.obsidian);
      g.add(centerMesh);

      // Glowing lens
      const lensGeom = new THREE.CylinderGeometry(0.2, 0.25, 0.2, 16);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x3B82F6, roughness: 0.1, metalness: 0.9 });
      const lens = new THREE.Mesh(lensGeom, lensMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.z = 0.45;
      g.add(lens);

      // Ring Frame
      const frameGeom = new THREE.TorusGeometry(1.1, 0.05, 12, 48);
      const frame = new THREE.Mesh(frameGeom, materials.sapphire);
      frame.rotation.x = Math.PI / 2.2;
      g.add(frame);

      // 4 Sensor Thruster Pods
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const podGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.4, 12);
        const pod = new THREE.Mesh(podGeom, materials.pearl);
        pod.position.set(Math.cos(angle) * 1.1, 0, Math.sin(angle) * 1.1);
        g.add(pod);
      }

      g.scale.set(1.1, 1.1, 1.1);
      return g;
    }

    function buildMonolith() {
      const g = new THREE.Group();
      // Sharp faceted crystal obelisk
      const geom = new THREE.ConeGeometry(0.7, 2.0, 6);
      const meshTop = new THREE.Mesh(geom, materials.sapphire);
      meshTop.position.y = 0.3;
      g.add(meshTop);

      const geomBot = new THREE.ConeGeometry(0.7, 0.9, 6);
      const meshBot = new THREE.Mesh(geomBot, materials.pearl);
      meshBot.position.y = -0.75;
      meshBot.rotation.x = Math.PI;
      g.add(meshBot);

      // Orbiting crystal shards
      g.userData.shards = [];
      for (let i = 0; i < 5; i++) {
        const shardGeom = new THREE.OctahedronGeometry(0.12, 0);
        const shardMat = (i % 2 === 0) ? materials.pearl : materials.sapphire;
        const shard = new THREE.Mesh(shardGeom, shardMat);
        shard.userData = { angle: (i * Math.PI * 2) / 5, radius: 1.15 + (i * 0.08), speed: 0.02 * (i % 2 === 0 ? 1 : -1) };
        g.add(shard);
        g.userData.shards.push(shard);
      }

      g.scale.set(1.1, 1.1, 1.1);
      return g;
    }

    let currentModelType = 'butterfly';
    let currentModelObj = null;

    function setModel(type) {
      currentModelType = type;
      while (activeModelGroup.children.length > 0) {
        activeModelGroup.remove(activeModelGroup.children[0]);
      }
      wingLeftPivot = null;
      wingRightPivot = null;

      if (type === 'butterfly') {
        currentModelObj = buildButterfly();
      } else if (type === 'sphere') {
        currentModelObj = buildSphere();
      } else if (type === 'drone') {
        currentModelObj = buildDrone();
      } else if (type === 'monolith') {
        currentModelObj = buildMonolith();
      }
      activeModelGroup.add(currentModelObj);

      // Apply current wireframe / material settings
      applyMaterialSettings();

      // Smooth entry pop
      activeModelGroup.scale.set(0.01, 0.01, 0.01);
      let progress = 0;
      function animatePop() {
        progress += 0.08;
        const s = Math.min(progress * (2 - progress), 1);
        activeModelGroup.scale.set(s, s, s);
        if (progress < 1) requestAnimationFrame(animatePop);
      }
      animatePop();
    }

    function applyMaterialSettings() {
      materials.pearl.wireframe = isWireframeActive;
      materials.sapphire.wireframe = isWireframeActive;
      materials.obsidian.wireframe = isWireframeActive;

      if (activeMaterialMode === 'pearl') {
        materials.sapphire.color.setHex(0xF8F7F3);
        materials.sapphire.metalness = 0.55;
        materials.pearl.color.setHex(0xF8F7F3);
        materials.pearl.metalness = 0.55;
      } else if (activeMaterialMode === 'sapphire') {
        materials.pearl.color.setHex(0x1D4ED8);
        materials.pearl.metalness = 0.85;
        materials.sapphire.color.setHex(0x1D4ED8);
        materials.sapphire.metalness = 0.85;
      } else {
        // Dual
        materials.pearl.color.setHex(0xF8F7F3);
        materials.pearl.metalness = 0.55;
        materials.sapphire.color.setHex(0x1D4ED8);
        materials.sapphire.metalness = 0.85;
      }
    }

    // Initialize first model
    setModel('butterfly');

    // 6. User Interaction: Orbit controls via Mouse & Touch with pan-y
    let isDragging = false;
    let prevMouseX = 0, prevMouseY = 0;
    let rotX = 0.15, rotY = 0;
    let targetRotX = 0.15, targetRotY = 0;
    let isAutoRotating = true;

    function onPointerDown(e) {
      isDragging = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const y = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const deltaX = x - prevMouseX;
      const deltaY = y - prevMouseY;

      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;

      // Clamp vertical orbit
      targetRotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotX));

      prevMouseX = x;
      prevMouseY = y;
    }

    function onPointerUp() {
      isDragging = false;
    }

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // 7. Render Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Auto rotation
      if (isAutoRotating && !isDragging) {
        targetRotY += 0.008;
      }

      // Smooth inertia lerp
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      activeModelGroup.rotation.y = rotY;
      activeModelGroup.rotation.x = rotX;

      // Model-specific procedural animations
      if (currentModelType === 'butterfly' && wingLeftPivot && wingRightPivot) {
        const flap = Math.sin(elapsed * 4.5) * 0.42;
        wingLeftPivot.rotation.y = flap;
        wingRightPivot.rotation.y = -flap;
      } else if (currentModelType === 'sphere' && currentModelObj && currentModelObj.userData.rings) {
        const rings = currentModelObj.userData.rings;
        rings[0].rotation.z += 0.015;
        rings[1].rotation.x += -0.012;
        rings[2].rotation.y += 0.008;
      } else if (currentModelType === 'monolith' && currentModelObj && currentModelObj.userData.shards) {
        currentModelObj.userData.shards.forEach(shard => {
          shard.userData.angle += shard.userData.speed;
          shard.position.x = Math.cos(shard.userData.angle) * shard.userData.radius;
          shard.position.z = Math.sin(shard.userData.angle) * shard.userData.radius;
          shard.rotation.x += 0.02;
          shard.rotation.y += 0.03;
        });
      }

      renderer.render(scene, camera);
    }
    animate();

    // 8. Resize Handler
    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleResize, { passive: true });

    // 9. UI Wire-ups
    const toggleRotateBtn = document.getElementById('creatorToggleRotateBtn');
    const matPearlBtn = document.getElementById('creatorMatPearlBtn');
    const matSapphireBtn = document.getElementById('creatorMatSapphireBtn');
    const toggleWireframeBtn = document.getElementById('creatorToggleWireframeBtn');
    const exportBtn = document.getElementById('creatorExportBtn');
    const generateBtn = document.getElementById('generateModelBtn');
    const promptInput = document.getElementById('modelPromptInput');
    const presetChips = document.querySelectorAll('.preset-chip');
    const synthOverlay = document.getElementById('creatorSynthOverlay');
    const synthProgressBar = document.getElementById('synthProgressBar');
    const synthStepText = document.getElementById('synthStepText');
    const statusText = document.getElementById('creatorStatusText');

    function updateCreatorRotateBtn() {
      if (!toggleRotateBtn) return;
      const iconSpan = toggleRotateBtn.querySelector('.btn-icon');
      const textSpan = toggleRotateBtn.querySelector('.btn-text');
      const dict = i18n[currentLang] || i18n.ar;

      if (isAutoRotating) {
        if (iconSpan) iconSpan.textContent = '⏸';
        if (textSpan) {
          textSpan.setAttribute('data-i18n', 'mc_pause_rotate');
          textSpan.textContent = dict.mc_pause_rotate;
        }
        toggleRotateBtn.classList.remove('active');
      } else {
        if (iconSpan) iconSpan.textContent = '▶️';
        if (textSpan) {
          textSpan.setAttribute('data-i18n', 'mc_play_rotate');
          textSpan.textContent = dict.mc_play_rotate;
        }
        toggleRotateBtn.classList.add('active');
      }
    }
    updateCreatorRotateBtnText = updateCreatorRotateBtn;

    if (toggleRotateBtn) {
      toggleRotateBtn.addEventListener('click', () => {
        isAutoRotating = !isAutoRotating;
        updateCreatorRotateBtn();
      });
    }

    if (matPearlBtn) {
      matPearlBtn.addEventListener('click', () => {
        activeMaterialMode = (activeMaterialMode === 'pearl') ? 'dual' : 'pearl';
        applyMaterialSettings();
        matPearlBtn.classList.toggle('active', activeMaterialMode === 'pearl');
        if (matSapphireBtn) matSapphireBtn.classList.remove('active');
      });
    }

    if (matSapphireBtn) {
      matSapphireBtn.addEventListener('click', () => {
        activeMaterialMode = (activeMaterialMode === 'sapphire') ? 'dual' : 'sapphire';
        applyMaterialSettings();
        matSapphireBtn.classList.toggle('active', activeMaterialMode === 'sapphire');
        if (matPearlBtn) matPearlBtn.classList.remove('active');
      });
    }

    if (toggleWireframeBtn) {
      toggleWireframeBtn.addEventListener('click', () => {
        isWireframeActive = !isWireframeActive;
        applyMaterialSettings();
        toggleWireframeBtn.classList.toggle('active', isWireframeActive);
      });
    }

    // AI Generation Simulation Trigger
    function triggerAIGeneration(targetModelType, promptValue) {
      if (synthOverlay) {
        synthOverlay.classList.add('active');
        if (synthProgressBar) synthProgressBar.style.width = '0%';
        if (synthStepText) synthStepText.textContent = 'Analyzing prompt: "' + promptValue.substring(0, 30) + '..."';

        let p = 0;
        const timer = setInterval(() => {
          p += 20;
          if (synthProgressBar) synthProgressBar.style.width = p + '%';
          if (p === 40 && synthStepText) synthStepText.textContent = 'Synthesizing Neural Voxel Grid...';
          if (p === 80 && synthStepText) synthStepText.textContent = 'Applying PBR Shaders & Topology...';

          if (p >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              synthOverlay.classList.remove('active');
              setModel(targetModelType);
              if (statusText) {
                const dict = i18n[currentLang] || i18n.ar;
                statusText.textContent = (currentLang === 'ar')
                  ? 'تم توليد النموذج بنجاح · AXIOUX MeshEngine v2.4'
                  : '3D Asset Synthesized Successfully · MeshEngine v2.4';
              }
            }, 300);
          }
        }, 150);
      } else {
        setModel(targetModelType);
      }
    }

    if (generateBtn) {
      generateBtn.addEventListener('click', () => {
        const text = promptInput ? promptInput.value.toLowerCase() : '';
        let targetType = 'butterfly';
        if (text.includes('نواة') || text.includes('sphere') || text.includes('كرة')) targetType = 'sphere';
        else if (text.includes('روبوت') || text.includes('drone') || text.includes('كمومي')) targetType = 'drone';
        else if (text.includes('مونوغلث') || text.includes('monolith') || text.includes('كريستال')) targetType = 'monolith';
        else targetType = 'butterfly';

        presetChips.forEach(chip => {
          chip.classList.toggle('active', chip.getAttribute('data-preset') === targetType);
        });

        triggerAIGeneration(targetType, promptInput ? promptInput.value : 'Custom Model');
      });
    }

    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const type = chip.getAttribute('data-preset');
        if (promptInput) {
          if (type === 'butterfly') promptInput.value = 'فراشة AXIOUX سيبرانية بأجنحة كريستالية لؤلؤية وزرقاء وخامات PBR';
          else if (type === 'sphere') promptInput.value = 'نواة طاقة سحابية icosahedron بحلقات مدارية دوارة';
          else if (type === 'drone') promptInput.value = 'روبوت استكشاف فضائي كمومي بمجسات استشعار ودوافع نفاثة';
          else if (type === 'monolith') promptInput.value = 'مونوغلث كريستالي حاد الأوجه مع شظايا عائمة';
        }
        triggerAIGeneration(type, chip.textContent);
      });
    });

    // 10. Export Model
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        // Generate an OBJ text file on the fly with real mesh data
        let objContent = '# AXIOUX AI 3D Mesh Export\n# Model: ' + currentModelType + '\n# Engine: AXIOUX MeshEngine v2.4\n';
        objContent += 'o AXIOUX_' + currentModelType + '\n';
        
        let vIndex = 1;
        activeModelGroup.traverse(child => {
          if (child.isMesh && child.geometry) {
            const pos = child.geometry.attributes.position;
            if (pos) {
              for (let i = 0; i < pos.count; i++) {
                const v = new THREE.Vector3();
                v.fromBufferAttribute(pos, i);
                v.applyMatrix4(child.matrixWorld);
                objContent += 'v ' + v.x.toFixed(4) + ' ' + v.y.toFixed(4) + ' ' + v.z.toFixed(4) + '\n';
              }
              for (let i = 0; i < pos.count - 2; i += 3) {
                objContent += 'f ' + (vIndex + i) + ' ' + (vIndex + i + 1) + ' ' + (vIndex + i + 2) + '\n';
              }
              vIndex += pos.count;
            }
          }
        });

        const blob = new Blob([objContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AXIOUX_' + currentModelType + '_3D.obj';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  })();

  // ================= CINEMATIC SCROLL-LINKED SEQUENCE ENGINE =================
  (function initScrollSequenceEngine() {
    const seqCanvas = document.getElementById('heroSequenceCanvas');
    if (!seqCanvas) return;
    const seqCtx = seqCanvas.getContext('2d', { alpha: false });
    if (!seqCtx) return;

    const heroSection = document.getElementById('heroScrollSection') || document.querySelector('.hero');
    const heroContent = document.getElementById('heroContent') || document.querySelector('.hero-content');

    const TOTAL_FRAMES = 192;
    const frameCache = new Map();
    let currentFrame = 1.0;
    let targetFrame = 1.0;
    let lastRenderedIndex = -1;
    let needsRedraw = true;
    let hasDrawnFirstFrame = false;

    // Motion preference
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReduced = motionMedia.matches;
    motionMedia.addEventListener('change', (e) => {
      prefersReduced = e.matches;
    });

    // Helper for 3-digit padding: 1 -> "001", 192 -> "192"
    function formatFrameName(num, ext = 'webp') {
      return 'frame-' + String(num).padStart(3, '0') + '.' + ext;
    }

    // Load individual frame with WebP primary and JPG fallback
    function loadFrame(idx, isPriority = false) {
      if (frameCache.has(idx)) {
        return frameCache.get(idx);
      }
      const img = new Image();
      const entry = { img, loaded: false, error: false };
      frameCache.set(idx, entry);

      img.onload = () => {
        entry.loaded = true;
        const curInt = Math.round(currentFrame);
        // If close to current frame, or the very first frame, mark redraw immediately
        if (Math.abs(idx - curInt) <= 3 || !hasDrawnFirstFrame) {
          needsRedraw = true;
        }
      };

      img.onerror = () => {
        if (!img.dataset.retried) {
          img.dataset.retried = 'true';
          // Fallback to high-resolution JPG
          img.src = 'public/frames/' + formatFrameName(idx, 'jpg');
        } else {
          entry.error = true;
        }
      };

      // Primary path: ultra-crisp, high-performance WebP
      img.src = 'public/frames/' + formatFrameName(idx, 'webp');
      return entry;
    }

    // Best available loaded frame (closest neighbor search)
    function getBestFrame(targetIdx) {
      const exact = frameCache.get(targetIdx);
      if (exact && exact.loaded && exact.img.naturalWidth > 0) {
        return exact.img;
      }
      // Search outward
      for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
        const lower = targetIdx - delta;
        if (lower >= 1) {
          const lEntry = frameCache.get(lower);
          if (lEntry && lEntry.loaded && lEntry.img.naturalWidth > 0) {
            return lEntry.img;
          }
        }
        const higher = targetIdx + delta;
        if (higher <= TOTAL_FRAMES) {
          const hEntry = frameCache.get(higher);
          if (hEntry && hEntry.loaded && hEntry.img.naturalWidth > 0) {
            return hEntry.img;
          }
        }
      }
      return null;
    }

    // Retina-ready responsive canvas resize
    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const container = seqCanvas.parentElement;
      const width = container ? container.clientWidth : window.innerWidth;
      const height = container ? container.clientHeight : window.innerHeight;

      const pxW = Math.round(width * dpr);
      const pxH = Math.round(height * dpr);

      if (seqCanvas.width !== pxW || seqCanvas.height !== pxH) {
        seqCanvas.width = pxW;
        seqCanvas.height = pxH;
        seqCanvas.style.width = width + 'px';
        seqCanvas.style.height = height + 'px';
        needsRedraw = true;
      }
    }

    // Draw the image frame scaled to cover with extended central focus
    function drawFrame(idx) {
      const img = getBestFrame(idx);
      if (!img) return;

      const cw = seqCanvas.width;
      const ch = seqCanvas.height;
      if (cw === 0 || ch === 0) return;

      // Dark luxury background fill
      const isLight = document.body.classList.contains('ivory-mode');
      seqCtx.fillStyle = isLight ? '#F8F7F3' : '#060A14';
      seqCtx.fillRect(0, 0, cw, ch);

      seqCtx.imageSmoothingEnabled = true;
      seqCtx.imageSmoothingQuality = 'high';

      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;
      const imgRatio = iw / ih;
      const canvasRatio = cw / ch;

      // Extended central focus calculation: keep main action centered through panning
      let focalX = 0.5;
      if (idx > 70) {
        const panT = Math.min((idx - 70) / 75, 1);
        const easePan = panT * panT * (3 - 2 * panT);
        focalX = 0.5 + easePan * 0.10;
      }

      let dw, dh, dx, dy;
      if (canvasRatio > imgRatio) {
        dw = cw;
        dh = cw / imgRatio;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * imgRatio;
        dx = (cw - dw) * focalX;
        dy = 0;
      }

      seqCtx.drawImage(img, dx, dy, dw, dh);
      hasDrawnFirstFrame = true;
    }

    // Compute progress: 0% at top of hero, 100% when hero scroll finishes
    function getScrollProgress() {
      if (!heroSection) return 0;
      const rect = heroSection.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;
      const scrollable = rect.height - winH;
      if (scrollable <= 0) return 0;

      const scrolled = -rect.top;
      return Math.min(Math.max(scrolled / scrollable, 0), 1);
    }

    function updateFromScroll() {
      const progress = getScrollProgress();
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);

      // Hero content smooth fade & parallax
      if (heroContent) {
        const fade = Math.min(Math.max(progress * 4.5, 0), 1);
        const opacity = 1 - fade;
        heroContent.style.opacity = opacity;
        heroContent.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
        if (!prefersReduced) {
          heroContent.style.transform = `translate3d(0, ${-fade * 50}px, 0)`;
        } else {
          heroContent.style.transform = 'none';
        }

        // Ethereal luxury transparency: soft 0.30 ambient opacity while text is present,
        // subtly blooms to 0.70 only when text fades out for unobstructed cinematic view
        if (seqCanvas) {
          const isLight = document.body.classList.contains('ivory-mode');
          const baseOpacity = isLight ? 0.20 : 0.30;
          const bloom = isLight ? 0.35 : 0.40;
          const canvasOpacity = baseOpacity + fade * bloom;
          seqCanvas.style.opacity = canvasOpacity.toFixed(3);
        }
      }
    }

    // Animation loop with smooth lerp
    function tick() {
      updateFromScroll();

      if (prefersReduced) {
        currentFrame = targetFrame;
      } else {
        const diff = targetFrame - currentFrame;
        if (Math.abs(diff) < 0.01) {
          currentFrame = targetFrame;
        } else {
          // Smooth 0.12 responsive cinematic lerp
          currentFrame += diff * 0.12;
        }
      }

      // Ensure full scene plays through to completion
      const progress = getScrollProgress();
      if (progress >= 0.995) {
        currentFrame = TOTAL_FRAMES;
      } else if (progress <= 0.005) {
        currentFrame = 1;
      }

      const frameIdx = Math.min(Math.max(Math.round(currentFrame), 1), TOTAL_FRAMES);
      if (frameIdx !== lastRenderedIndex || needsRedraw) {
        drawFrame(frameIdx);
        lastRenderedIndex = frameIdx;
        needsRedraw = false;
      }

      requestAnimationFrame(tick);
    }

    // Progressive frame loading strategy
    function startProgressivePreload() {
      // 1. Immediately load initial frame
      loadFrame(1, true);

      // 2. Load keyframe milestones across the whole duration
      const milestones = [15, 30, 50, 75, 100, 125, 150, 175, 192];
      milestones.forEach(m => loadFrame(m));

      // 3. Queue remaining frames with concurrency control
      const queue = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!milestones.includes(i)) {
          queue.push(i);
        }
      }

      const MAX_ACTIVE = 5;
      let activeCount = 0;

      function processQueue() {
        while (activeCount < MAX_ACTIVE && queue.length > 0) {
          // Dynamic priority: load frames closest to current targetFrame first
          queue.sort((a, b) => Math.abs(a - targetFrame) - Math.abs(b - targetFrame));
          const next = queue.shift();
          activeCount++;
          const entry = loadFrame(next);
          if (entry.loaded || entry.error) {
            activeCount--;
          } else {
            const onFinish = () => {
              activeCount--;
              processQueue();
            };
            entry.img.addEventListener('load', onFinish, { once: true });
            entry.img.addEventListener('error', onFinish, { once: true });
          }
        }
      }

      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => processQueue());
      } else {
        setTimeout(processQueue, 40);
      }

      window.addEventListener('scroll', () => {
        processQueue();
      }, { passive: true });
    }

    // Initialize
    resizeCanvas();
    const initialProgress = getScrollProgress();
    currentFrame = 1 + initialProgress * (TOTAL_FRAMES - 1);
    targetFrame = currentFrame;

    startProgressivePreload();

    window.addEventListener('resize', () => {
      resizeCanvas();
      updateFromScroll();
    }, { passive: true });

    window.addEventListener('scroll', () => {
      updateFromScroll();
    }, { passive: true });

    // Start persistent animation loop
    requestAnimationFrame(tick);
  })();
   (function () {
  'use strict';

  function init() {
    var container = document.getElementById('axioux-3d-section');
    var loaderEl = document.getElementById('axioux-loader');
    var canvas = container ? container.querySelector('#canvas3d') : null;

    if (!container || !canvas) {
      console.error('AXIOUX: عناصر axioux-3d-section أو canvas3d غير موجودة في الصفحة');
      return;
    }

    function showError(msg, err) {
      console.error('AXIOUX:', msg, err || '');
      if (loaderEl) {
        loaderEl.style.display = '';
        loaderEl.style.opacity = '1';
        loaderEl.textContent = msg;
      }
    }

    // التحقق من تحميل المكتبات
    if (typeof THREE === 'undefined') return showError('تعذّر تحميل مكتبة three.js');
    if (typeof THREE.OrbitControls !== 'function') return showError('OrbitControls غير محمّل، أضفه في index.html');
    if (typeof THREE.GLTFLoader !== 'function') return showError('GLTFLoader غير محمّل، أضفه في index.html');

    function getSize() {
      return {
        w: container.clientWidth || window.innerWidth,
        h: container.clientHeight || Math.round(window.innerHeight * 0.7)
      };
    }
    var size0 = getSize();

    // 1. Scene, Camera, Renderer
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a14);

    var camera = new THREE.PerspectiveCamera(40, size0.w / size0.h, 0.05, 100);
    camera.position.set(0, 0.4, 2.3);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      return showError('المتصفح لا يدعم WebGL', e);
    }
    renderer.setSize(size0.w, size0.h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputEncoding = THREE.sRGBEncoding;

    // 2. Controls
    var controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 0.35;
    controls.maxDistance = 5.0;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.6;

    // 3. Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    var keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    var cyanRim = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyanRim.position.set(-5, 2, -3);
    scene.add(cyanRim);

    var sapphireRim = new THREE.DirectionalLight(0x2563eb, 1.2);
    sapphireRim.position.set(5, -3, -3);
    scene.add(sapphireRim);

    // 4. Floor grid
    var grid = new THREE.GridHelper(8, 24, 0x1e3a8a, 0x0f172a);
    grid.position.y = -1.1;
    scene.add(grid);

    // 5. تحميل النموذج
    var axiouxModel = null;
    var baseY = 0;
    var gltfLoader = new THREE.GLTFLoader();

    function onModelLoaded(gltf) {
      axiouxModel = gltf.scene;

      var box = new THREE.Box3().setFromObject(axiouxModel);
      var center = box.getCenter(new THREE.Vector3());
      var size = box.getSize(new THREE.Vector3());
      var maxDim = Math.max(size.x, size.y, size.z) || 1;
      var scale = 1.5 / maxDim;

      axiouxModel.scale.setScalar(scale);
      axiouxModel.position.sub(center.multiplyScalar(scale));
      baseY = axiouxModel.position.y; // نحفظ الموضع الأصلي كي لا يفسده تأثير الطفو
      scene.add(axiouxModel);

      axiouxModel.traverse(function (child) {
        if (child.isMesh && child.material) {
          var mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(function (m) {
            m.envMapIntensity = 1.5;
            m.needsUpdate = true;
          });
        }
      });

      if (loaderEl) {
        loaderEl.style.opacity = '0';
        setTimeout(function () { loaderEl.style.display = 'none'; }, 500);
      }
    }

    function loadFromFile() {
      gltfLoader.load(
        'public/axioux.glb',
        onModelLoaded,
        undefined,
        function (e) { showError('تعذّر تحميل النموذج، راجع Console', e); }
      );
    }

    function base64ToArrayBuffer(b64) {
      // إزالة أي بادئة data: والمسافات وأسطر جديدة
      b64 = String(b64).replace(/^data:[^,]*,/, '').replace(/\s+/g, '');
      var bin = atob(b64);
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return bytes.buffer;
    }

    var b64 = window.AXIOUX_MODEL_B64 || window.AXIOUX_B64;

    if (b64) {
      try {
        var buffer = base64ToArrayBuffer(b64);
        gltfLoader.parse(buffer, '', onModelLoaded, function (err) {
          console.error('AXIOUX: فشل parse للنموذج المضمّن', err);
          loadFromFile();
        });
      } catch (e) {
        console.error('AXIOUX: نص Base64 غير صالح', e);
        loadFromFile();
      }
    } else {
      console.warn('AXIOUX: متغير Base64 غير معرّف، سيتم تحميل public/axioux.glb');
      loadFromFile();
    }

    // 6. الأزرار (آمنة إن لم يوجد العنصر)
    function $(sel) { return container.querySelector(sel); }
    function on(sel, fn) {
      var el = $(sel);
      if (el) el.addEventListener('click', fn);
    }
    function setRotateUI() {
      var icon = $('#axioux-rotateIcon');
      var text = $('#axioux-rotateText');
      if (icon) icon.textContent = controls.autoRotate ? '⏸' : '▶️';
      if (text) text.textContent = controls.autoRotate ? 'إيقاف الدوران' : 'تشغيل الدوران';
    }
    function zoom(delta) {
      var dir = camera.position.clone().sub(controls.target).normalize();
      var dist = camera.position.distanceTo(controls.target);
      var next = Math.min(Math.max(dist + delta, controls.minDistance), controls.maxDistance);
      camera.position.copy(controls.target).add(dir.multiplyScalar(next));
    }

    on('#axioux-btnToggleRotate', function () {
      controls.autoRotate = !controls.autoRotate;
      setRotateUI();
    });
    on('#axioux-btnZoomIn', function () { zoom(-0.4); });
    on('#axioux-btnZoomOut', function () { zoom(0.4); });
    on('#axioux-btnReset', function () {
      camera.position.set(0, 0.4, 2.3);
      controls.target.set(0, 0, 0);
      controls.autoRotate = true;
      setRotateUI();
    });

    // 7. Render loop
    var clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      if (axiouxModel) {
        axiouxModel.position.y = baseY + Math.sin(clock.getElapsedTime() * 1.5) * 0.025;
      }
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // 8. Resize
    function onResize() {
      var s = getSize();
      camera.aspect = s.w / s.h;
      camera.updateProjectionMatrix();
      renderer.setSize(s.w, s.h, false);
    }
    window.addEventListener('resize', onResize);
    if (window.ResizeObserver) new ResizeObserver(onResize).observe(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
    
})();

 