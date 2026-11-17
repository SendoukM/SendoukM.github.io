    AOS.init({ duration: 800, once: true });

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
    }

    function closeModal() {
        modalImg.classList.remove('scale-100');
        modalImg.classList.add('scale-95');
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
