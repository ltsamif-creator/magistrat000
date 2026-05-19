/**
 * Импульс — Аккредитованная IT-компания
 * Основной JavaScript файл
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех модулей
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initRequisitesEditor();
});

/**
 * Мобильное меню (бургер)
 */
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    if (!burger || !nav) return;
    
    burger.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Анимация бургера
        const spans = burger.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = nav.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            const spans = burger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

/**
 * Плавная прокрутка к якорям
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Валидация и отправка форм
 */
function initFormValidation() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Сбор данных формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Валидация
        let isValid = true;
        const errors = [];
        
        // Проверка имени
        if (!data.name || data.name.trim().length < 2) {
            isValid = false;
            errors.push('Пожалуйста, введите корректное имя (минимум 2 символа)');
        }
        
        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            isValid = false;
            errors.push('Пожалуйста, введите корректный email адрес');
        }
        
        // Проверка телефона (если указан)
        if (data.phone) {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(data.phone)) {
                isValid = false;
                errors.push('Пожалуйста, введите корректный номер телефона');
            }
        }
        
        // Проверка сообщения
        if (!data.message || data.message.trim().length < 10) {
            isValid = false;
            errors.push('Пожалуйста, введите сообщение (минимум 10 символов)');
        }
        
        // Проверка согласия
        if (!data.consent) {
            isValid = false;
            errors.push('Необходимо согласие на обработку персональных данных');
        }
        
        if (!isValid) {
            alert(errors.join('\n'));
            return;
        }
        
        // Имитация отправки формы
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        setTimeout(function() {
            alert('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в течение одного рабочего дня.');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
        
        // В реальном проекте здесь будет AJAX запрос:
        // fetch(form.action, { method: 'POST', body: formData })
        //     .then(response => response.json())
        //     .then(data => { ... })
    });
    
    // Валидация в реальном времени
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

/**
 * Валидация отдельного поля
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        isValid = phoneRegex.test(value);
    } else if (field.hasAttribute('required')) {
        isValid = value.length > 0;
    }
    
    // Визуальная индикация
    if (isValid) {
        field.style.borderColor = 'var(--color-success)';
    } else if (value.length > 0) {
        field.style.borderColor = 'var(--color-error)';
    } else {
        field.style.borderColor = 'var(--color-border)';
    }
}

/**
 * Редактирование реквизитов (для администратора)
 * В реальном проекте это должно быть защищено паролем
 */
function initRequisitesEditor() {
    // Эта функция демонстрирует возможность редактирования реквизитов
    // В продакшене должна быть реализована через CMS с авторизацией
    
    const requisitesData = {
        companyName: 'Общество с ограниченной ответственностью «Импульс»',
        shortName: 'ООО «Импульс»',
        address: '101000, г. Москва, ул. Примерная, д. 10, офис 501',
        inn: '7700000000',
        kpp: '770101001',
        ogrn: '1207700000000',
        okved: [
            '62.01 — Разработка компьютерного программного обеспечения',
            '62.02 — Деятельность консультативная и работы в области компьютерных технологий',
            '62.03 — Деятельность по управлению компьютерным оборудованием',
            '62.09 — Деятельность, связанная с использованием вычислительной техники и информационных технологий, прочая',
            '63.11 — Деятельность по обработке данных, предоставление услуг по размещению информации',
            '58.29 — Издание прочих программных средств'
        ],
        email: 'info@impuls-it.ru',
        phone: '+7 (495) 000-00-00'
    };
    
    // Функция для обновления реквизитов (вызывается из CMS)
    window.updateRequisites = function(newData) {
        // Валидация ИНН (10 или 12 цифр)
        if (newData.inn && !/^\d{10}$|^\d{12}$/.test(newData.inn)) {
            console.error('Неверный формат ИНН. Должно быть 10 или 12 цифр.');
            return false;
        }
        
        // Валидация ОГРН (13 цифр)
        if (newData.ogrn && !/^\d{13}$/.test(newData.ogrn)) {
            console.error('Неверный формат ОГРН. Должно быть 13 цифр.');
            return false;
        }
        
        // Обновление данных
        Object.assign(requisitesData, newData);
        
        // Здесь должна быть логика обновления DOM и сохранения в базу данных
        console.log('Реквизиты обновлены:', requisitesData);
        return true;
    };
    
    // Функция для получения текущих реквизитов
    window.getRequisites = function() {
        return { ...requisitesData };
    };
    
    // Функция для проверки ОКВЭД на соответствие IT-перечню
    window.validateOKVED = function(okvedCode) {
        const itOkvedList = [
            '62.01', '62.02', '62.03', '62.09',
            '63.11', '58.29', '62.00', '63.1'
        ];
        
        const code = okvedCode.split(' ')[0];
        return itOkvedList.some(itCode => code.startsWith(itCode));
    };
}

/**
 * Утилита для форматирования цены
 */
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
}

/**
 * Утилита для форматирования телефона
 */
function formatPhone(phone) {
    // Простая маска для российского номера
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    
    if (match) {
        return `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
    
    return phone;
}

/**
 * Проверка доступности сайта (мониторинг)
 */
window.checkSiteAvailability = function() {
    const startTime = performance.now();
    
    fetch(window.location.href, { method: 'HEAD' })
        .then(response => {
            const loadTime = performance.now() - startTime;
            
            if (response.ok && loadTime < 3000) {
                console.log(`✓ Сайт доступен. Время загрузки: ${Math.round(loadTime)} мс`);
            } else if (!response.ok) {
                console.error('✗ Ошибка доступа к сайту:', response.status);
            } else {
                console.warn('⚠ Время загрузки превышает 3 секунды:', Math.round(loadTime), 'мс');
            }
        })
        .catch(error => {
            console.error('✗ Сайт недоступен:', error);
        });
};

// Экспорт функций для использования в CMS
window.ImpulseCMS = {
    updateRequisites: window.updateRequisites,
    getRequisites: window.getRequisites,
    validateOKVED: window.validateOKVED,
    formatPrice: formatPrice,
    formatPhone: formatPhone,
    checkSiteAvailability: window.checkSiteAvailability
};

console.log('Импульс IT-компания: сайт загружен успешно');
