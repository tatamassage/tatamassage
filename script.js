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

    // Закрываем меню при клике на любую ссылку в нем
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Закрытие меню при клике вне его области
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

            // Сначала закрываем все открытые блоки (эффект классического аккордеона)
            faqItems.forEach(innerItem => {
                innerItem.classList.remove('active');
                innerItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Если кликнутый блок не был активен, открываем его с плавной анимацией
            if (!isActive) {
                item.classList.add('active');
                // Задаем динамическую высоту на основе реальной высоты текста
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});