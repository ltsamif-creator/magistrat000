/**
 * Основной JavaScript файл для лендинга ООО «Магистрат»
 * Обрабатывает загрузку данных, формы и интерактивность
 */

(function() {
    'use strict';

    // ==========================================
    // Инициализация при загрузке страницы
    // ==========================================
    document.addEventListener('DOMContentLoaded', function() {
        initPrices();
        initContacts();
        initNavigation();
        initForm();
        initFooter();
    });

    // ==========================================
    // Инициализация прайс-листа
    // ==========================================
    function initPrices() {
        const tbody = document.getElementById('prices-body');
        if (!tbody || !CONFIG) return;

        const pricesData = CONFIG.prices;
        let html = '';

        for (const key in pricesData) {
            const item = pricesData[key];
            const priceDisplay = item.price !== null 
                ? formatPrice(item.price) + (item.unit ? ' / ' + item.unit : '')
                : item.unit;

            html += `
                <tr>
                    <td><strong>${item.name}</strong></td>
                    <td>${item.description}</td>
                    <td class="price-cell">${priceDisplay}</td>
                </tr>
            `;
        }

        tbody.innerHTML = html;
    }

    // ==========================================
    // Инициализация контактов
    // ==========================================
    function initContacts() {
        if (!CONFIG) return;

        // Обновление контактов
        const emailEl = document.getElementById('contact-email');
        const phoneEl = document.getElementById('contact-phone');
        const footerEmail = document.getElementById('footer-email');
        const footerPhone = document.getElementById('footer-phone');

        if (emailEl) {
            emailEl.textContent = CONFIG.contacts.email;
            emailEl.href = 'mailto:' + CONFIG.contacts.email;
        }

        if (phoneEl) {
            phoneEl.textContent = CONFIG.contacts.phone;
            phoneEl.href = 'tel:' + CONFIG.contacts.phoneRaw;
        }

        if (footerEmail) {
            footerEmail.textContent = CONFIG.contacts.email;
            footerEmail.href = 'mailto:' + CONFIG.contacts.email;
        }

        if (footerPhone) {
            footerPhone.textContent = CONFIG.contacts.phone;
            footerPhone.href = 'tel:' + CONFIG.contacts.phoneRaw;
        }

        // Обновление реквизитов
        updateRequisitesDisplay();
    }

    // ==========================================
    // Отображение реквизитов
    // ==========================================
    function updateRequisitesDisplay() {
        if (!CONFIG) return;

        const innEl = document.getElementById('req-inn');
        const kppEl = document.getElementById('req-kpp');
        const ogrnEl = document.getElementById('req-ogrn');
        const addressEl = document.getElementById('req-address');

        const footerInn = document.getElementById('footer-inn');
        const footerKpp = document.getElementById('footer-kpp');
        const footerOgrn = document.getElementById('footer-ogrn');

        if (innEl) innEl.textContent = CONFIG.company.inn || 'Не указан';
        if (kppEl) kppEl.textContent = CONFIG.company.kpp || 'Не указан';
        if (ogrnEl) ogrnEl.textContent = CONFIG.company.ogrn || 'Не указан';
        if (addressEl) addressEl.textContent = CONFIG.company.legalAddress || 'Не указан';

        if (footerInn) footerInn.textContent = CONFIG.company.inn || 'Не указан';
        if (footerKpp) footerKpp.textContent = CONFIG.company.kpp || 'Не указан';
        if (footerOgrn) footerOgrn.textContent = CONFIG.company.ogrn || 'Не указан';
    }

    // ==========================================
    // Инициализация футера
    // ==========================================
    function initFooter() {
        const yearEl = document.getElementById('footer-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    // ==========================================
    // Навигация (плавная прокрутка, бургер-меню)
    // ==========================================
    function initNavigation() {
        // Плавная прокрутка к якорям
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Закрыть мобильное меню после клика
                    closeMobileMenu();
                }
            });
        });

        // Бургер-меню
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav__list');
        
        if (burger && nav) {
            burger.addEventListener('click', function() {
                burger.classList.toggle('active');
                nav.classList.toggle('active');
            });

            // Закрытие меню при клике вне
            document.addEventListener('click', function(e) {
                if (!burger.contains(e.target) && !nav.contains(e.target)) {
                    closeMobileMenu();
                }
            });
        }
    }

    function closeMobileMenu() {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav__list');
        
        if (burger && nav) {
            burger.classList.remove('active');
            nav.classList.remove('active');
        }
    }

    // ==========================================
    // Обработка формы
    // ==========================================
    function initForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Сбор данных формы
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Валидация
            if (!validateForm(data)) {
                return;
            }

            // Отправка (здесь должна быть логика отправки на сервер)
            console.log('Данные формы:', data);
            
            // Уведомление об успешной отправке
            alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
            
            // Очистка формы
            form.reset();
        });

        // Маска для телефона
        const phoneInput = document.getElementById('form-phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value[0] === '7' || value[0] === '8') {
                        value = value.substring(1);
                    }
                    let formatted = '+7';
                    if (value.length > 0) formatted += ' (' + value.substring(0, 3);
                    if (value.length > 3) formatted += ') ' + value.substring(3, 6);
                    if (value.length > 6) formatted += '-' + value.substring(6, 8);
                    if (value.length > 8) formatted += '-' + value.substring(8, 10);
                    e.target.value = formatted;
                } else {
                    e.target.value = '';
                }
            });
        }
    }

    function validateForm(data) {
        let isValid = true;
        const errors = [];

        // Проверка имени
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Пожалуйста, введите корректное имя');
            isValid = false;
        }

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push('Пожалуйста, введите корректный email');
            isValid = false;
        }

        // Проверка сообщения
        if (!data.message || data.message.trim().length < 5) {
            errors.push('Пожалуйста, введите сообщение (минимум 5 символов)');
            isValid = false;
        }

        // Проверка согласия
        if (!data.consent) {
            errors.push('Необходимо согласие на обработку персональных данных');
            isValid = false;
        }

        if (!isValid) {
            alert(errors.join('\n'));
        }

        return isValid;
    }

    // ==========================================
    // Экспорт функций для внешнего использования
    // ==========================================
    window.MagistratCMS = {
        updateRequisites: updateRequisites,
        updateContacts: updateContacts,
        updatePrice: updatePrice,
        getCompanyData: getCompanyData,
        validateINN: validateINN,
        validateOGRN: validateOGRN,
        validateKPP: validateKPP,
        validateOKVED: validateOKVED,
        refreshDisplay: function() {
            updateRequisitesDisplay();
            initPrices();
            initContacts();
        }
    };

})();
