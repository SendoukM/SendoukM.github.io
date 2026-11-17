    AOS.init({ duration: 1000, once: true });

    // Filtre niveaux
    const levelFilter = document.getElementById('levelFilter');
    if (levelFilter) {
        levelFilter.addEventListener('change', function() {
            const val = this.value;
            const n1s = document.querySelectorAll('.n1-content');
            const n2s = document.querySelectorAll('.n2-content');

            if (val === 'all') {
                n1s.forEach(el => el.style.display = 'block');
                n2s.forEach(el => el.style.display = 'block');
            } else if (val === 'n1') {
                n1s.forEach(el => el.style.display = 'block');
                n2s.forEach(el => el.style.display = 'none');
            } else if (val === 'n2') {
                n1s.forEach(el => el.style.display = 'none');
                n2s.forEach(el => el.style.display = 'block');
            }
        });
    }

    // Scroll spy
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const dots = document.querySelectorAll('.nav-dot');
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${current}`) {
                dot.classList.add('active');
            }
        });
    });

    // Burger
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    function filterById(type) {
        const cards = document.querySelectorAll('.competence-card');
        const buttons = document.querySelectorAll('.type-btn');

        // Groupes basés sur tes IDs
        const majeures = ['c1', 'c5', 'c6'];
        const mineures = ['c2', 'c3', 'c4'];

        // Gestion de l'état actif des boutons
        buttons.forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');

        // Animation et affichage des cartes
        cards.forEach(card => {
            const cardId = card.id.toLowerCase();

            let shouldShow = false;
            if (type === 'all') shouldShow = true;
            else if (type === 'majeure') shouldShow = majeures.includes(cardId);
            else if (type === 'mineure') shouldShow = mineures.includes(cardId);

            if (shouldShow) {
                card.style.display = 'block';
                // Petit délai pour l'animation de fondu
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 400); // Correspond à la durée de la transition CSS
            }
        });
    }
