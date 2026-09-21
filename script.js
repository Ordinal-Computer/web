/* Ordinal — scroll choreography, menu, pricing, FAQ */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.getElementById("siteHeader");
  const menuBtn = document.getElementById("menuBtn");
  const menuLabel = document.getElementById("menuLabel");

  /* ---------- Menu overlay ---------- */
  const menuOverlay = document.getElementById("menuOverlay");
  let menuReturnFocus = null;

  const setMenu = (open) => {
    const wasOpen = document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuLabel.textContent = open ? "Close" : "Menu";
    menuOverlay.setAttribute("aria-hidden", String(!open));
    if (open && !wasOpen) {
      menuReturnFocus = document.activeElement;
      const first = menuOverlay.querySelector("a, button");
      if (first) first.focus();
    } else if (!open && wasOpen) {
      const back = menuReturnFocus && menuReturnFocus !== document.body ? menuReturnFocus : menuBtn;
      back.focus();
      menuReturnFocus = null;
    }
  };

  // keep Tab inside the open menu
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !document.body.classList.contains("menu-open")) return;
    const focusables = [menuBtn, ...menuOverlay.querySelectorAll("a, button")];
    const i = focusables.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) {
      e.preventDefault();
      focusables[focusables.length - 1].focus();
    } else if (!e.shiftKey && i === focusables.length - 1) {
      e.preventDefault();
      focusables[0].focus();
    }
  });
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

  /* ------------- Hero field: the fleet as a quiet plane of cores -------------
     Points on a receding plane. Site grays on white; a few dots at a time
     warm to violet and fade, like jobs finishing somewhere far away. */

  const heroField = document.getElementById("heroField");

  if (heroField && window.THREE && !reduceMotion) {
    try {
      const COLS = 96;
      const ROWS = 40;
      const COUNT = COLS * ROWS;

      const renderer = new THREE.WebGLRenderer({ canvas: heroField, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
      camera.position.set(0, 4.4, 26);
      camera.lookAt(0, 0, 0);

      const pos = new Float32Array(COUNT * 3);
      const grid = new Float32Array(COUNT * 2);
      const rand = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        const gx = (i % COLS) / (COLS - 1) - 0.5;
        const gz = Math.floor(i / COLS) / (ROWS - 1) - 0.5;
        pos[i * 3] = gx * 46;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = gz * 26;
        grid[i * 2] = gx;
        grid[i * 2 + 1] = gz;
        rand[i] = Math.random();
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("aGrid", new THREE.BufferAttribute(grid, 2));
      geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

      const uniforms = {
        uTime: { value: 0 },
        uDPR: { value: Math.min(window.devicePixelRatio || 1, 2) },
      };

      const material = new THREE.RawShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        vertexShader: `
          precision highp float;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          uniform float uDPR;
          attribute vec3 position;
          attribute vec2 aGrid;
          attribute float aRand;
          varying float vPulse;
          varying float vFade;

          void main() {
            vec3 p = position;
            p.y += sin(aGrid.x * 7.0 + uTime * 0.26) * cos(aGrid.y * 6.0 + uTime * 0.21) * 0.55;

            // each dot warms briefly on its own slow clock
            float ph = fract(uTime * 0.03 + aRand);
            vPulse = smoothstep(0.0, 0.035, ph) * (1.0 - smoothstep(0.035, 0.11, ph));

            // no hard rectangle: fade the plane out toward its own edges
            float ex = 1.0 - smoothstep(0.3, 0.5, abs(aGrid.x));
            float ez = 1.0 - smoothstep(0.28, 0.5, abs(aGrid.y));
            vFade = ex * ez;

            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (1.5 + vPulse * 1.5) * uDPR * (30.0 / -mv.z);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying float vPulse;
          varying float vFade;

          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.18, d) * vFade * (0.32 + vPulse * 0.5);
            vec3 base = vec3(0.63, 0.63, 0.66);
            vec3 warm = vec3(0.486, 0.361, 1.0);
            gl_FragColor = vec4(mix(base, warm, vPulse), a);
          }
        `,
      });

      const cloud = new THREE.Points(geo, material);
      cloud.frustumCulled = false;
      scene.add(cloud);

      const resizeField = () => {
        const r = heroField.getBoundingClientRect();
        if (!r.width || !r.height) return;
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / r.height;
        camera.updateProjectionMatrix();
      };

      let running = false;
      const frame = (now) => {
        if (!running) return;
        uniforms.uTime.value = now / 1000;
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
      };

      const fieldIO = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !running) {
            running = true;
            requestAnimationFrame(frame);
          } else if (!en.isIntersecting) {
            running = false;
          }
        });
      });
      fieldIO.observe(heroField);

      resizeField();
      window.addEventListener("resize", resizeField);
      renderer.render(scene, camera); // frame zero: never a blank hero
    } catch (err) {
      heroField.style.display = "none"; // no WebGL, the hero stays quiet
    }
  }

  /* ------------------- CTA finale: the fleet at night -------------------
     The same idea the hero opens with, restated quietly at the end. A field
     of core-lights drifting in the dark behind the closing line. Points, one
     draw call, paused the moment the card scrolls away. */

  const starsCanvas = document.getElementById("ctaStars");

  if (starsCanvas && window.THREE && !reduceMotion) {
    try {
      const N = 1600;

      const renderer = new THREE.WebGLRenderer({ canvas: starsCanvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
      camera.position.set(0, 0, 30);

      const pos = new Float32Array(N * 3);
      const rand = new Float32Array(N);
      const size = new Float32Array(N);
      const shade = new Float32Array(N); // 0 = deep indigo, 1 = near white
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 56;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
        rand[i] = Math.random();
        const big = Math.random() < 0.06;
        size[i] = big ? 5 + Math.random() * 4 : 1.2 + Math.random() * 2.2;
        shade[i] = big ? 0.75 + Math.random() * 0.25 : Math.random() * 0.6;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
      geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
      geo.setAttribute("aShade", new THREE.BufferAttribute(shade, 1));

      const uniforms = {
        uTime: { value: 0 },
        uDPR: { value: Math.min(window.devicePixelRatio || 1, 2) },
      };

      const material = new THREE.RawShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          precision highp float;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          uniform float uDPR;
          attribute vec3 position;
          attribute float aRand;
          attribute float aSize;
          attribute float aShade;
          varying float vTwinkle;
          varying float vShade;

          void main() {
            vec3 p = position;
            float ph = aRand * 6.2831;
            p.x += sin(uTime * 0.11 + ph) * 0.9;
            p.y += cos(uTime * 0.09 + ph * 1.7) * 0.7;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * uDPR * (26.0 / -mv.z);
            vTwinkle = 0.72 + 0.28 * sin(uTime * (0.25 + 0.5 * aRand) + ph * 3.0);
            vShade = aShade;
          }
        `,
        fragmentShader: `
          precision highp float;
          varying float vTwinkle;
          varying float vShade;

          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.12, d) * vTwinkle;
            vec3 col = mix(vec3(0.29, 0.22, 1.0), vec3(0.82, 0.78, 1.0), vShade);
            gl_FragColor = vec4(col * a, a * 0.85);
          }
        `,
      });

      const cloud = new THREE.Points(geo, material);
      cloud.frustumCulled = false;
      scene.add(cloud);

      let running = false;
      let starPX = 0;
      let starTX = 0;

      window.addEventListener("pointermove", (e) => {
        starTX = (e.clientX / window.innerWidth - 0.5) * 2;
      });

      const resizeStars = () => {
        const r = starsCanvas.getBoundingClientRect();
        if (!r.width || !r.height) return;
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / r.height;
        camera.updateProjectionMatrix();
      };

      const frame = (now) => {
        if (!running) return;
        const t = now / 1000;
        uniforms.uTime.value = t;
        starPX += (starTX - starPX) * 0.03;
        cloud.rotation.y = Math.sin(t * 0.05) * 0.05 + starPX * 0.05;
        cloud.rotation.z = Math.sin(t * 0.03) * 0.02;
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
      };

      const starsIO = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !running) {
            running = true;
            requestAnimationFrame(frame);
          } else if (!en.isIntersecting) {
            running = false;
          }
        });
      });
      starsIO.observe(starsCanvas);

      resizeStars();
      window.addEventListener("resize", resizeStars);
      renderer.render(scene, camera); // paint frame zero now: never a blank card
    } catch (err) {
      starsCanvas.style.display = "none"; // the card's own gradient carries it
    }
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
