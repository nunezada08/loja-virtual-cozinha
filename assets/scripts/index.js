document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const indicators = Array.from(carousel.querySelectorAll('.indicator'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    let current = 0;
    let interval = null;
    const delay = 5000; // tempo entre slides (ms)

    function showSlide(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
        current = index;
    }

    function next() {
        showSlide((current + 1) % slides.length);
    }
    function prev() {
        showSlide((current - 1 + slides.length) % slides.length);
    }

    nextBtn.addEventListener('click', () => {
        next();
        resetInterval();
    });
    prevBtn.addEventListener('click', () => {
        prev();
        resetInterval();
    });

    indicators.forEach(ind => {
        ind.addEventListener('click', () => {
            const idx = parseInt(ind.dataset.index, 10);
            showSlide(idx);
            resetInterval();
        });
    });

    function startInterval() {
        interval = setInterval(next, delay);
    }
    function stopInterval() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
    function resetInterval() {
        stopInterval();
        startInterval();
    }

    carousel.addEventListener('mouseenter', stopInterval);
    carousel.addEventListener('mouseleave', startInterval);

    showSlide(0);
    startInterval();
});