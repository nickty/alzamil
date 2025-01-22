document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('sliderModal');
    const openBtn = document.getElementById('openSliderBtn');
    const closeBtn = document.querySelector('.close');
    const sliderBackground = document.querySelector('.slider-background');
    const textContainer = document.querySelector('.text-container');
    const slideTitle = document.querySelector('.slide-title');
    const slideDescription = document.querySelector('.slide-description');
    const thumbnails = document.querySelectorAll('.thumbnail');

    let currentThumbnail = 0;
    let isAnimating = false;

    openBtn.onclick = function() {
        modal.style.display = 'block';
        updateSlide(0);
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    function updateSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        const thumbnail = thumbnails[index];
        const image = thumbnail.dataset.image;
        const title = thumbnail.dataset.title;
        const description = thumbnail.dataset.description;

        sliderBackground.style.backgroundImage = `url(${image})`;
        slideTitle.textContent = title;
        slideDescription.textContent = description;

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');

        textContainer.classList.remove('animate');
        void textContainer.offsetWidth; // Trigger reflow
        textContainer.classList.add('animate');
        textContainer.style.animation = 'rotateText 1.5s ease-in-out';

        setTimeout(() => {
            textContainer.style.animation = '';
            isAnimating = false;
        }, 1500);

        currentThumbnail = index;
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateSlide(index);
        });
    });

    // Set initial slide
    updateSlide(0);
});