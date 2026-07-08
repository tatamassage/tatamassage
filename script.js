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
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.getElementById('nextBtn');
        const prevButton = document.getElementById('prevBtn');
        const dotsContainer = document.getElementById('carouselDots');
        
        let currentIndex = 0;
        let autoplayTimer = null;
        const autoplayInterval = 5000; // Автопрокрутка каждые 5 секунд

        // Очистим dots перед генерацией
        dotsContainer.innerHTML = '';

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
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateSlider();
        };

        const showNextSlide = () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Возврат на первый слайд
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

        nextButton.addEventListener('click', () => {
            showNextSlide();
            resetAutoplay();
        });

        prevButton.addEventListener('click', () => {
            showPrevSlide();
            resetAutoplay();
        });

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

        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);

        // Запуск автопрокрутки
        startAutoplay();
    }


    // --- 4. Автоматическое обновление года в футере ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // --- 5. Ультра-оптимизация: Ленивая подгрузка Google Карт через IntersectionObserver ---
    // Это исключает скачивание тяжелых скриптов карт до тех пор, пока пользователь не доскроллит до контактов [1].
    const mapContainer = document.getElementById('mapContainer');
    if (mapContainer && 'IntersectionObserver' in window) {
        const mapObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Если блок карты находится в зоне видимости (+300px запас снизу) [1]
                if (entry.isIntersecting) {
                    const iframe = document.createElement('iframe');
                    iframe.src = "https://maps.google.com/maps?q=ЖК%20Family%20Гатне&t=&z=16&ie=UTF8&iwloc=&output=embed";
                    iframe.width = "100%";
                    iframe.height = "100%";
                    iframe.style.border = "0";
                    iframe.allowFullscreen = true;
                    iframe.loading = "lazy";
                    iframe.referrerPolicy = "no-referrer-when-downgrade";
                    
                    // Удаляем лоадер и рендерим интерактивную карту во фрейме
                    mapContainer.innerHTML = '';
                    mapContainer.appendChild(iframe);
                    
                    // Прекращаем наблюдение за контейнером
                    observer.unobserve(mapContainer);
                }
            });
        }, { rootMargin: "0px 0px 300px 0px" }); // Карта начнет качаться за 300px до появления на экране! [1]

        mapObserver.observe(mapContainer);
    } else if (mapContainer) {
        // Запасной вариант для старых браузеров без поддержки IntersectionObserver
        const iframe = document.createElement('iframe');
        iframe.src = "https://maps.google.com/maps?q=ЖК%20Family%20Гатне&t=&z=16&ie=UTF8&iwloc=&output=embed";
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "0";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        mapContainer.innerHTML = '';
        mapContainer.appendChild(iframe);
    }
});