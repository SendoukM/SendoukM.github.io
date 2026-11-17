    // Effet parallax subtil
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const mesh = document.querySelector('.bg-mesh');
        mesh.style.transform = `translateY(${scrolled * 0.3}px)`;
    });

    // Animation hover sur features
    document.querySelectorAll('.glass').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'translateY(-8px)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0)';
        });
    });
