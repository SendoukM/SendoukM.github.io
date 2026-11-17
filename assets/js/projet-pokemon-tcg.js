  AOS.init({ duration: 800, once: true });

  // Fonctions pour le Modal
  function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.classList.remove('hidden');
    // Petit timeout pour l'animation
    setTimeout(() => {
      modalImg.classList.remove('scale-95');
      modalImg.classList.add('scale-100');
    }, 10);
    modalImg.src = src;
    document.body.style.overflow = 'hidden'; // Empêche le scroll
  }

  function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 200);
  }
