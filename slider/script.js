document.addEventListener('DOMContentLoaded', function() {
    const sliderBackground = document.querySelector('.slider-background');
    const textContainer = document.querySelector('.text-container');
    const slideTitle = document.querySelector('.slide-title');
    const slideDescription = document.querySelector('.slide-description');
    const thumbnails = document.querySelectorAll('.thumbnail');

    let currentSlide = 0;
    let isAnimating = false;

    function changeSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        const thumbnail = thumbnails[index];
        const image = thumbnail.dataset.image;
        const title = thumbnail.dataset.title;
        const description = thumbnail.dataset.description;

        sliderBackground.style.backgroundImage = `url(${image})`;
        slideTitle.textContent = title;
        slideDescription.textContent = description;

        // Remove active class from all thumbnails
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        // Add active class to current thumbnail
        thumbnail.classList.add('active');

        // Animate text
        textContainer.classList.remove('animate');
        void textContainer.offsetWidth; // Trigger reflow
        textContainer.classList.add('animate');
        textContainer.style.animation = 'rotateText 1.5s ease-in-out';

        setTimeout(() => {
            textContainer.style.animation = '';
            isAnimating = false;
        }, 1500);

        currentSlide = index;
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            changeSlide(index);
        });
    });

    // Set initial slide
    changeSlide(0);

    // Auto-advance slides every 5 seconds
    setInterval(() => {
        changeSlide((currentSlide + 1) % thumbnails.length);
    }, 5000);
});