  AOS.init({ duration: 1000, once: true });
  
  const scrollToTopBtn = document.getElementById('scrollToTop');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) scrollToTopBtn.classList.add('show');
    else scrollToTopBtn.classList.remove('show');
  });
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Menu mobile
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  window.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('bio-intro-3d');
    const container = document.getElementById('intro-human-canvas');
    const bar = document.getElementById('intro-bar');
    const percentTxt = document.getElementById('intro-percent');
    const statusTxt = document.getElementById('intro-status');
    const skipBtn = document.getElementById('skip-intro');

    if (!introOverlay) return;

    let animId;
    let isClosed = false;

    function closeIntro() {
      if (isClosed) return;
      isClosed = true;
      if (animId) cancelAnimationFrame(animId);
      if (statusTxt) statusTxt.textContent = "ACCÈS AUTORISÉ ✓";
      
      introOverlay.style.opacity = '0';
      introOverlay.style.transform = 'scale(1.06)';
      introOverlay.style.pointerEvents = 'none';
      document.body.style.overflow = '';

      setTimeout(() => {
        introOverlay.remove();
      }, 700);
    }

    if (skipBtn) skipBtn.addEventListener('click', closeIntro);

    if (!window.THREE || !container) {
      setTimeout(closeIntro, 500);
      return;
    }

    document.body.style.overflow = 'hidden';

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.1, 5.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lumières médicales
    scene.add(new THREE.AmbientLight(0x0ea5e9, 0.8));
    const dirLight1 = new THREE.DirectionalLight(0x22d3ee, 2.5);
    dirLight1.position.set(4, 5, 5);
    scene.add(dirLight1);
    const dirLight2 = new THREE.DirectionalLight(0x3b82f6, 2);
    dirLight2.position.set(-4, -3, -4);
    scene.add(dirLight2);

    const humanGroup = new THREE.Group();
    scene.add(humanGroup);

    // Matériaux du corps (Peau Rayons-X translucide + Maillage chirurgical + Os)
    const skinMat = new THREE.MeshPhongMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      specular: 0x67e8f9,
      shininess: 90,
      transparent: true,
      opacity: 0.45
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    const boneMat = new THREE.MeshBasicMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.7
    });

    // Fonction pour créer un membre 3D sculpté (peau + maillage)
    function createPart(geo, x, y, z, sx = 1, sy = 1, sz = 1, rz = 0, rx = 0) {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(geo, skinMat);
      const wire = new THREE.Mesh(geo, wireMat);
      group.add(mesh);
      group.add(wire);
      group.scale.set(sx, sy, sz);
      group.position.set(x, y, z);
      group.rotation.set(rx, 0, rz);
      humanGroup.add(group);
      return group;
    }

    const sphereGeo = new THREE.SphereGeometry(1, 20, 16);
    const cylGeo = new THREE.CylinderGeometry(0.85, 0.7, 1, 18, 6);

    // --- 1. TÊTE, VISAGE & COU ---
    createPart(sphereGeo, 0, 1.78, 0, 0.23, 0.29, 0.25); // Crâne
    createPart(cylGeo, 0, 1.66, 0.04, 0.16, 0.22, 0.18); // Mâchoire / Visage
    createPart(cylGeo, 0, 1.44, -0.01, 0.12, 0.24, 0.12); // Cou

    // --- 2. TORSE MUSCULAIRE (Pectoraux, Abdos, Bassin) ---
    createPart(cylGeo, 0, 1.02, 0, 0.44, 0.62, 0.24); // Thorax
    createPart(sphereGeo, -0.15, 1.12, 0.12, 0.16, 0.13, 0.10); // Pectoral D
    createPart(sphereGeo, 0.15, 1.12, 0.12, 0.16, 0.13, 0.10);  // Pectoral G
    createPart(cylGeo, 0, 0.52, 0, 0.33, 0.48, 0.20); // Abdomen / Taille
    createPart(sphereGeo, 0, 0.16, 0, 0.37, 0.24, 0.23); // Bassin / Hanches

    // --- 3. COLONNE VERTÉBRALE & CAGE THORACIQUE INTERNE (Rayons-X) ---
    for (let i = 0; i < 12; i++) {
      const vert = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.06, 8), boneMat);
      vert.position.set(0, 0.25 + i * 0.1, -0.06);
      humanGroup.add(vert);
    }
    for (let i = 0; i < 5; i++) {
      const ribGeo = new THREE.TorusGeometry(0.26 - i * 0.015, 0.015, 8, 24, Math.PI * 1.5);
      const rib = new THREE.Mesh(ribGeo, boneMat);
      rib.rotation.x = Math.PI / 2;
      rib.rotation.z = -Math.PI * 0.25;
      rib.position.set(0, 1.22 - i * 0.09, 0);
      humanGroup.add(rib);
    }

    // --- 4. ÉPAULES, BRAS, AVANT-BRAS & MAINS ---
    // Gauche et Droite
    [-1, 1].forEach((side) => {
      createPart(sphereGeo, side * 0.48, 1.24, 0, 0.14, 0.14, 0.14); // Épaule (Deltoïde)
      createPart(cylGeo, side * 0.58, 0.86, 0, 0.11, 0.62, 0.11, side * -0.15); // Biceps / Bras
      createPart(sphereGeo, side * 0.63, 0.54, 0, 0.09, 0.09, 0.09); // Coude
      createPart(cylGeo, side * 0.70, 0.22, 0.04, 0.09, 0.58, 0.09, side * -0.1, 0.1); // Avant-bras
      createPart(sphereGeo, side * 0.74, -0.12, 0.08, 0.07, 0.14, 0.04, side * -0.1); // Main
    });

    // --- 5. CUISSES, GENOUX, MOLLETS & PIEDS ---
    [-1, 1].forEach((side) => {
      createPart(cylGeo, side * 0.21, -0.38, 0, 0.17, 0.82, 0.17, side * -0.03); // Cuisse (Quadriceps)
      createPart(sphereGeo, side * 0.22, -0.82, 0.02, 0.11, 0.11, 0.11); // Rotule / Genou
      createPart(cylGeo, side * 0.22, -1.28, -0.01, 0.12, 0.82, 0.12); // Tibia / Mollet
      createPart(sphereGeo, side * 0.22, -1.72, 0.08, 0.09, 0.07, 0.20); // Pied
    });

    // --- 6. CŒUR ANATOMIQUE QUI BAT ---
    const heartGeo = new THREE.OctahedronGeometry(0.10, 2);
    const heartMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true });
    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    heartMesh.position.set(0.10, 1.05, 0.06);
    humanGroup.add(heartMesh);

    // --- 7. ANNEAU LASER DE SCAN MÉDICAL ---
    const ringGeo = new THREE.RingGeometry(0.88, 0.98, 64);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide, transparent: true, opacity: 0.95 });
    const scanRing = new THREE.Mesh(ringGeo, ringMat);
    humanGroup.add(scanRing);

    const laserPlaneGeo = new THREE.CircleGeometry(0.88, 64);
    laserPlaneGeo.rotateX(Math.PI / 2);
    const laserPlaneMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide, transparent: true, opacity: 0.15 });
    scanRing.add(new THREE.Mesh(laserPlaneGeo, laserPlaneMat));

    // --- ANIMATION (2.8 secondes puis ouverture du site) ---
    const DURATION = 2800;
    const startTime = performance.now();

    function animate() {
      if (isClosed) return;
      animId = requestAnimationFrame(animate);

      const elapsed = performance.now() - startTime;
      const t = elapsed / 1000;
      const progress = Math.min((elapsed / DURATION) * 100, 100);

      // Rotation 3D du corps
      humanGroup.rotation.y = t * 1.4;

      // Descente du laser de la tête aux pieds
      scanRing.position.y = 1.95 - (progress / 100) * 3.8;

      // Battement du cœur
      const beat = 1 + 0.35 * Math.pow(Math.sin(t * 4.5), 6);
      heartMesh.scale.set(beat, beat, beat);

      if (bar) bar.style.width = progress + '%';
      if (percentTxt) percentTxt.textContent = Math.round(progress) + '%';

      if (statusTxt) {
        if (progress < 35) {
          statusTxt.textContent = "MODÉLISATION ANATOMIQUE 3D...";
        } else if (progress < 75) {
          statusTxt.textContent = "SCAN BIOMÉTRIQUE & THORACIQUE...";
        } else {
          statusTxt.textContent = "SYNCHRONISATION DU PORTFOLIO...";
        }
      }

      renderer.render(scene, camera);

      if (progress >= 100) {
        closeIntro();
      }
    }

    animate();
  });
