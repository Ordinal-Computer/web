/* Ordinal — scroll choreography, menu, pricing, FAQ */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.getElementById("siteHeader");
  const menuBtn = document.getElementById("menuBtn");
  const menuLabel = document.getElementById("menuLabel");

  /* ---------- Menu overlay ---------- */
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuLabel.textContent = open ? "Close" : "Menu";
    document.getElementById("menuOverlay").setAttribute("aria-hidden", String(!open));
  };
  menuBtn.addEventListener("click", () =>
    setMenu(!document.body.classList.contains("menu-open"))
  );
  document.querySelectorAll("[data-menu-link]").forEach((a) =>
    a.addEventListener("click", () => setMenu(false))
  );
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          revealIO.unobserve(en.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

  /* ---------- CTA word stagger ---------- */
  const ctaCard = document.getElementById("ctaCard");
  if (ctaCard) {
    const ctaIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            ctaCard.classList.add("in");
            ctaIO.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    ctaIO.observe(ctaCard);
  }

  /* ---------- Header: dark-section awareness ---------- */
  const darkSections = document.querySelectorAll("[data-dark], .cta-card");
  const updateHeaderTheme = () => {
    const probeY = 48; // point under the header
    let onDark = false;
    darkSections.forEach((sec) => {
      const r = sec.getBoundingClientRect();
      if (r.top <= probeY && r.bottom >= probeY) onDark = true;
    });
    header.classList.toggle("on-dark", onDark);
  };

  /* ---------- Statement word split ---------- */
  const statement = document.getElementById("statementText");
  let statementWords = [];
  if (statement) {
    const words = statement.textContent.trim().split(/\s+/);
    statement.innerHTML = words
      .map((w) => `<span class="w">${w}</span>`)
      .join(" ");
    statementWords = [...statement.querySelectorAll(".w")];
  }

  /* ---------- Logo: click scrolls home ---------- */
  const logoChip = document.getElementById("logoHome");
  logoChip.addEventListener("click", (e) => {
    e.preventDefault();
    setMenu(false);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    logoSpin += 6; // give the 3D mark a kick
  });

  /* ---------- Pinned demo ---------- */
  const demo = document.getElementById("demo");
  const demoPanel = document.getElementById("demoPanel");

  /* ---------- Dark walkthrough ---------- */
  const how = document.getElementById("how");
  const howSteps = [...document.querySelectorAll(".how-step")];
  const howShots = [...document.querySelectorAll(".how-shot")];
  const howBarFills = [...document.querySelectorAll("#howBars span i")];
  let activeStep = 0;

  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  /* Progress of a tall pinned section: 0 when its top hits the viewport
     top, 1 when its bottom leaves the viewport bottom. */
  const pinProgress = (el) => {
    const r = el.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    return total <= 0 ? 0 : clamp01(-r.top / total);
  };

  const onFrame = () => {
    const vh = window.innerHeight;

    header.classList.toggle("scrolled", window.scrollY > vh * 0.5);
    updateHeaderTheme();

    // demo states
    if (demo && demoPanel) {
      const p = pinProgress(demo);
      demoPanel.classList.toggle("live", p > 0.02 || isInView(demo));
      demoPanel.classList.toggle("info", p > 0.38);
      demoPanel.classList.toggle("done", p > 0.78);
    }

    // statement words
    if (statementWords.length) {
      const r = statement.getBoundingClientRect();
      const f = clamp01((vh * 0.8 - r.top) / (vh * 0.55));
      const litCount = Math.round(f * statementWords.length);
      statementWords.forEach((w, i) => w.classList.toggle("lit", i < litCount));
    }

    // walkthrough steps + bars
    if (how) {
      const p = pinProgress(how);
      const n = howSteps.length;
      const step = Math.min(n - 1, Math.floor(p * n));
      if (step !== activeStep) {
        activeStep = step;
        howSteps.forEach((s, i) => s.classList.toggle("active", i === step));
        howShots.forEach((s, i) => s.classList.toggle("active", i === step));
      }
      howBarFills.forEach((bar, i) => {
        const q = clamp01(p * n - i);
        bar.style.width = `${q * 100}%`;
      });
    }
  };

  const isInView = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  };

  if (!reduceMotion) {
    // Scroll events are frame-aligned in modern engines and onFrame is cheap,
    // so run it directly: an rAF gate stalls in throttled/background tabs.
    window.addEventListener("scroll", onFrame, { passive: true });
    window.addEventListener("resize", onFrame);
    onFrame();
  } else {
    // static fallbacks
    header.classList.add("scrolled");
    if (demoPanel) demoPanel.classList.add("live", "info");
    howSteps.forEach((s) => s.classList.add("active"));
    howShots.forEach((s) => s.classList.add("active"));
    if (ctaCard) ctaCard.classList.add("in");
  }

  /* ---------- 3D logo: the omega mark swept as a metal tube ---------- */
  let logoSpin = 0;
  const logoCanvas = document.getElementById("logoCanvas");
  if (logoCanvas && !reduceMotion && window.THREE) {
    try {
      const renderer = new THREE.WebGLRenderer({ canvas: logoCanvas, alpha: true, antialias: true });
      const px = 46 * Math.min(window.devicePixelRatio || 1, 2);
      renderer.setSize(px, px, false);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 10);
      camera.position.z = 3.5;

      // same bezier data as the SVG mark, lifted into 3D
      const V = (x, y) => new THREE.Vector3((x - 12) / 10, (12.6 - y) / 10, 0);
      const path = new THREE.CurvePath();
      path.add(new THREE.CubicBezierCurve3(V(5, 8), V(5, 14.4), V(7.9, 17.2), V(9.6, 17.2)));
      path.add(new THREE.CubicBezierCurve3(V(9.6, 17.2), V(11.3, 17.2), V(12, 14.8), V(12, 12.8)));
      path.add(new THREE.CubicBezierCurve3(V(12, 12.8), V(12, 14.8), V(12.7, 17.2), V(14.4, 17.2)));
      path.add(new THREE.CubicBezierCurve3(V(14.4, 17.2), V(16.1, 17.2), V(19, 14.4), V(19, 8)));

      const mat = new THREE.MeshStandardMaterial({ color: 0x161616, metalness: 0.45, roughness: 0.3 });
      const group = new THREE.Group();
      group.add(new THREE.Mesh(new THREE.TubeGeometry(path, 140, 0.11, 14), mat));
      const cap = new THREE.SphereGeometry(0.11, 12, 12);
      [V(5, 8), V(19, 8)].forEach((p) => {
        const m = new THREE.Mesh(cap, mat);
        m.position.copy(p);
        group.add(m);
      });
      scene.add(group);

      scene.add(new THREE.AmbientLight(0xffffff, 0.65));
      const key = new THREE.DirectionalLight(0xffffff, 0.9);
      key.position.set(2, 3, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x7c5cff, 0.9);
      rim.position.set(-3, -2, -1);
      scene.add(rim);

      let hover = 1;
      logoChip.addEventListener("mouseenter", () => (hover = 3.2));
      logoChip.addEventListener("mouseleave", () => (hover = 1));

      let angle = 0;
      let last = performance.now();
      const tick = (now) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        logoSpin *= Math.pow(0.15, dt); // click impulse decays
        angle += dt * (0.9 * hover + logoSpin);
        group.rotation.y = angle;
        group.rotation.x = Math.sin(now / 1400) * 0.28;
        group.rotation.z = Math.sin(now / 2300) * 0.1;
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      logoChip.classList.add("live");
    } catch (err) {
      /* WebGL unavailable: the SVG mark stays */
    }
  }

  /* ---------- Pricing toggle ---------- */
  const billToggle = document.getElementById("billToggle");
  if (billToggle) {
    const opts = [...billToggle.querySelectorAll(".bt-opt")];
    const priceNums = [...document.querySelectorAll(".price-num[data-monthly]")];
    const priceNotes = [...document.querySelectorAll(".price-note[data-monthly]")];
    opts.forEach((opt) =>
      opt.addEventListener("click", () => {
        const bill = opt.dataset.bill;
        opts.forEach((o) => {
          o.classList.toggle("active", o === opt);
          o.setAttribute("aria-selected", String(o === opt));
        });
        billToggle.classList.toggle("annual", bill === "annual");
        priceNums.forEach((el) => (el.textContent = el.dataset[bill]));
        priceNotes.forEach((el) => (el.textContent = el.dataset[bill]));
      })
    );
  }

  /* ---------- FAQ: close others when one opens ---------- */
  const faqItems = [...document.querySelectorAll(".faq-list details")];
  faqItems.forEach((d) =>
    d.addEventListener("toggle", () => {
      if (d.open) faqItems.forEach((o) => o !== d && (o.open = false));
    })
  );
})();
