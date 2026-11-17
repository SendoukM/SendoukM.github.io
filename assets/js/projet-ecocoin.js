    AOS.init({ duration: 1000, once: true, offset: 50 });

    /* --- SCRIPT 3D TILT EFFECT --- */
    const heroContainer = document.getElementById('tiltHero');
    const heroImg = heroContainer.querySelector('img');
    const badge = heroContainer.querySelector('.absolute');

    // On s'assure que les éléments existent
    if(heroContainer && heroImg) {
        heroContainer.addEventListener('mousemove', (e) => {
            const rect = heroContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calcul du centre
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Rotation (plus on s'éloigne du centre, plus ça tourne)
            // On divise par 20 ou 25 pour adoucir l'effet
            const rotateX = ((y - centerY) / 20) * -1; // Inverser pour effet naturel
            const rotateY = (x - centerX) / 20;

            // Appliquer la transformation
            heroImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

            // Le badge bouge un peu plus pour effet de parallaxe
            if(badge) {
                badge.style.transform = `perspective(1000px) translateZ(40px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        // Remettre à zéro quand la souris sort
        heroContainer.addEventListener('mouseleave', () => {
            heroImg.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
            if(badge) {
                badge.style.transform = `perspective(1000px) translateZ(20px) rotateX(0) rotateY(0)`;
            }
        });
    }

    /* --- SCRIPT MODAL --- */
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    function openModal(src) {
        modal.classList.remove('hidden');
        void modal.offsetWidth; // Force reflow
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
