/**
 * Конфигурационный файл для лендинга ООО «Магистрат»
 * Все данные можно редактировать без изменения HTML
 */

const CONFIG = {
    // Данные компании
    company: {
        fullName: "Общество с ограниченной ответственностью «Магистрат»",
        shortName: "ООО «Магистрат»",
        inn: "",           // Заполнить: 10 или 12 цифр
        kpp: "",           // Заполнить: 9 цифр
        ogrn: "",          // Заполнить: 13 цифр
        legalAddress: "",  // Заполнить: юридический адрес
        okved: [
            { code: "62.01", name: "Разработка компьютерного программного обеспечения" },
            { code: "62.02", name: "Деятельность консультативная и работы в области компьютерных технологий" },
            { code: "62.09", name: "Деятельность, связанная с использованием вычислительной техники и информационных технологий, прочая" },
            { code: "58.29", name: "Издание прочих программных средств" }
        ]
    },
    
    // Контакты
    contacts: {
        email: "info@magistrat.example",
        phone: "+7 (800) 123-45-67",
        phoneRaw: "+78001234567"
    },
    
    // Прайс-лист (цены в рублях)
    prices: {
        hourStandard: {
            name: "Час работы специалиста 1С (стандартный)",
            description: "Программирование, настройка, консультации в рабочее время",
            price: 3500,
            unit: "час"
        },
        hourUrgent: {
            name: "Час работы специалиста (срочно / вне графика)",
            description: "Задачи с повышенным приоритетом по согласованию",
            price: 5000,
            unit: "час"
        },
        subscription: {
            name: "Абонентское сопровождение 1С",
            description: "Пакет часов в месяц, обновления, консультации — условия по договору",
            price: 25000,
            unit: "мес."
        },
        implementation: {
            name: "Внедрение типовой конфигурации «под ключ» (базовый объём)",
            description: "Настройка, перенос справочников, обучение — оценка после обследования",
            price: 150000,
            unit: ""
        },
        update: {
            name: "Обновление типовой конфигурации 1С",
            description: "Подготовка, тестирование, внедрение релиза с учётом доработок",
            price: 15000,
            unit: "релиз"
        },
        integration: {
            name: "Интеграция с внешней системой (типовой сценарий)",
            description: "Обмен данными по ТЗ (техническому заданию), одна связка — стоимость по смете",
            price: 40000,
            unit: ""
        },
        development: {
            name: "Разработка отчёта / обработки / печатной формы",
            description: "По техническому заданию (ТЗ), оценка в часах",
            price: null, // По смете
            unit: "по смете"
        },
        survey: {
            name: "Обследование и техническое задание (ТЗ) на внедрение",
            description: "Фиксация требований, сроков и бюджета проекта",
            price: 30000,
            unit: ""
        },
        serverAdmin: {
            name: "Администрирование сервера 1С (абонемент)",
            description: "Мониторинг, резервное копирование, обновления платформы — пакет по договору",
            price: 20000,
            unit: "мес."
        }
    },
    
    // Валюта
    currency: "₽",
    
    // Примечания
    vatNote: "Цены указаны без НДС. Итоговая стоимость фиксируется в договоре.",
    disclaimer: "Ориентировочные расценки. Итоговая стоимость фиксируется в договоре или дополнительном соглашении после уточнения объёма работ."
};

/**
 * Форматирование цены
 * @param {number} price - Цена
 * @returns {string} Отформатированная цена
 */
function formatPrice(price) {
    if (price === null) {
        return "по смете";
    }
    return new Intl.NumberFormat('ru-RU').format(price) + " ₽";
}

/**
 * Валидация ИНН
 * @param {string} inn - ИНН
 * @returns {boolean} true если валиден
 */
function validateINN(inn) {
    if (!inn) return false;
    const cleaned = inn.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 12;
}

/**
 * Валидация ОГРН
 * @param {string} ogrn - ОГРН
 * @returns {boolean} true если валиден
 */
function validateOGRN(ogrn) {
    if (!ogrn) return false;
    const cleaned = ogrn.replace(/\D/g, '');
    return cleaned.length === 13;
}

/**
 * Валидация КПП
 * @param {string} kpp - КПП
 * @returns {boolean} true если валиден
 */
function validateKPP(kpp) {
    if (!kpp) return false;
    const cleaned = kpp.replace(/\D/g, '');
    return cleaned.length === 9;
}

/**
 * Проверка ОКВЭД на соответствие IT-перечню
 * @param {string} code - Код ОКВЭД
 * @returns {boolean} true если IT-код
 */
function validateOKVED(code) {
    const itCodes = ['62.01', '62.02', '62.03', '62.09', '63.11', '58.29'];
    return itCodes.includes(code);
}

/**
 * Обновление реквизитов компании
 * @param {Object} data - Новые данные
 */
function updateRequisites(data) {
    if (data.inn !== undefined) CONFIG.company.inn = data.inn;
    if (data.kpp !== undefined) CONFIG.company.kpp = data.kpp;
    if (data.ogrn !== undefined) CONFIG.company.ogrn = data.ogrn;
    if (data.legalAddress !== undefined) CONFIG.company.legalAddress = data.legalAddress;
}

/**
 * Обновление контактов
 * @param {Object} data - Новые данные
 */
function updateContacts(data) {
    if (data.email !== undefined) CONFIG.contacts.email = data.email;
    if (data.phone !== undefined) CONFIG.contacts.phone = data.phone;
}

/**
 * Обновление цены
 * @param {string} key - Ключ цены
 * @param {number} price - Новая цена
 */
function updatePrice(key, price) {
    if (CONFIG.prices[key]) {
        CONFIG.prices[key].price = price;
    }
}

/**
 * Получение всех данных для экспорта
 * @returns {Object} Все данные конфигурации
 */
function getCompanyData() {
    return JSON.parse(JSON.stringify(CONFIG));
}
