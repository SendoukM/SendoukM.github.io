  AOS.init({ duration: 1000, once: true, offset: 50 });

  /* --- MATRIX BACKGROUND --- */
  const canvas = document.getElementById('matrix-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  const count = 4200;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i]   = (Math.random() - 0.5) * 40;
    positions[i+1] = (Math.random() - 0.5) * 40;
    positions[i+2] = (Math.random() - 0.5) * 40;

    colors[i]   = 0;
    colors[i+1] = 0.9 + Math.random() * 0.1;
    colors[i+2] = 0;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  });

  const mesh = new THREE.Points(geo, mat);
  scene.add(mesh);

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.0018;
    const array = geo.attributes.position.array;
    for (let i = 1; i < array.length; i += 3) {
      array[i] -= 0.05;
      if (array[i] < -20) array[i] = 20;
    }
    geo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  /* --- SCRIPT 3D TILT EFFECT --- */
  const heroContainer = document.getElementById('tiltHero');
  const heroImg = heroContainer ? heroContainer.querySelector('img') : null;
  const badge = heroContainer ? heroContainer.querySelector('.absolute') : null;

  if (heroContainer && heroImg) {
    heroContainer.addEventListener('mousemove', (e) => {
      const rect = heroContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / 20) * -1;
      const rotateY = (x - centerX) / 20;

      heroImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      if (badge) {
        badge.style.transform = `perspective(1000px) translateZ(40px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });

    heroContainer.addEventListener('mouseleave', () => {
      heroImg.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
      if (badge) {
        badge.style.transform = `perspective(1000px) translateZ(20px) rotateX(0) rotateY(0)`;
      }
    });
  }

  /* --- SCRIPT MODAL --- */
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');

  function openModal(src) {
    modal.classList.remove('hidden');
    void modal.offsetWidth;
    modal.classList.remove('opacity-0');

    setTimeout(() => {
      modalImg.classList.remove('scale-95');
      modalImg.classList.add('scale-100');
    }, 50);
    modalImg.src = src;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-95');
    modal.classList.add('opacity-0');

    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }
