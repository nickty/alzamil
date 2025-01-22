document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("sliderModal")
    const openBtn = document.getElementById("openSliderBtn")
    const closeBtn = document.querySelector(".close")
    const sliderBackground = document.querySelector(".slider-background")
    const textContainer = document.querySelector(".text-container")
    const slideTitle = document.querySelector(".slide-title")
    const slideDescription = document.querySelector(".slide-description")
    const slides = document.querySelector(".slides")
    const prevBtn = document.querySelector(".slider-nav.prev")
    const nextBtn = document.querySelector(".slider-nav.next")
  
    let currentSlide = 0
    let currentThumbnail = 0
    let isAnimating = false
  
    openBtn.onclick = () => {
      modal.style.display = "block"
      updateSlide()
    }
  
    closeBtn.onclick = () => {
      modal.style.display = "none"
    }
  
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none"
      }
    }
  
    function updateSlide() {
      slides.style.transform = `translateX(-${currentSlide * 100}%)`
      const thumbnails = document.querySelectorAll(`.slide:nth-child(${currentSlide + 1}) .thumbnail`)
      thumbnails[currentThumbnail].click()
    }
  
    prevBtn.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--
        currentThumbnail = 0
        updateSlide()
      }
    })
  
    nextBtn.addEventListener("click", () => {
      if (currentSlide < slides.children.length - 1) {
        currentSlide++
        currentThumbnail = 0
        updateSlide()
      }
    })
  
    document.querySelectorAll(".thumbnail").forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        if (isAnimating) return
        isAnimating = true
  
        const image = thumbnail.dataset.image
        const title = thumbnail.dataset.title
        const description = thumbnail.dataset.description
  
        sliderBackground.style.backgroundImage = `url(${image})`
        slideTitle.textContent = title
        slideDescription.textContent = description
  
        document.querySelectorAll(".thumbnail").forEach((thumb) => thumb.classList.remove("active"))
        thumbnail.classList.add("active")
  
        textContainer.classList.remove("animate")
        void textContainer.offsetWidth // Trigger reflow
        textContainer.classList.add("animate")
        textContainer.style.animation = "rotateText 1.5s ease-in-out"
  
        setTimeout(() => {
          textContainer.style.animation = ""
          isAnimating = false
        }, 1500)
  
        currentThumbnail = index
      })
    })
  
    // Set initial slide
    updateSlide()
  })
  
  