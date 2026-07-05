document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Логика мобильного меню (бургер) ---
    const menuToggle = document.getElementById('menuToggle');
    const navContainer = document.getElementById('navContainer');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navContainer.classList.toggle('active');
    };

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navContainer.classList.remove('active');
    };

    menuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        if (!navContainer.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });


    // --- 2. Логика аккордеона FAQ ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(innerItem => {
                innerItem.classList.remove('active');
                innerItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });


    // --- 3. Логика карусели отзывов (Слайдер) ---
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    let currentIndex = 0;
    let autoplayTimer = null;
    const autoplayInterval = 5000; // Прокрутка каждые 5 секунд

    // Генерация точек навигации
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const updateSlider = () => {
        // Сдвигаем трек на ширину текущего слайда
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновляем активные классы для точек
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSlider();
    };

    const showNextSlide = () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Возврат на первый слайд в конце
        }
        updateSlider();
    };

    const showPrevSlide = () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // Переход на последний слайд
        }
        updateSlider();
    };

    // Навешиваем обработчики на кнопки-стрелки
    nextButton.addEventListener('click', () => {
        showNextSlide();
        resetAutoplay();
    });

    prevButton.addEventListener('click', () => {
        showPrevSlide();
        resetAutoplay();
    });

    // Логика автопрокрутки
    const startAutoplay = () => {
        autoplayTimer = setInterval(showNextSlide, autoplayInterval);
    };

    const stopAutoplay = () => {
        clearInterval(autoplayTimer);
    };

    const resetAutoplay = () => {
        stopAutoplay();
        startAutoplay();
    };

    // Остановка слайдера при наведении курсора
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    // Запуск автопрокрутки
    startAutoplay();
});