// Статуси по машинах

export const statusesCar = [
    { status: "all", label: "Всі авто" },
    { status: "new", label: "Нові" },
    { status: "diagnostic", label: "Діагностика" },
    { status: "repair", label: "Ремонт" },
    { status: "view_repair", label: "Огляд ПР" },
    { status: "complete", label: "Завершено" },
  ];

  // Статуси по клієнтах

  export const statusesCommunications = [
    { status: "all_appeal", label: "Всі" },
    { status: "new_appeal", label: "Нові" },
    { status: "client", label: "Клієнти" },
    { status: "missing", label: "Втрачено" },
    { status: "appointment", label: "Запис" },
  ];

  // Заголовки срм компоненті

  export const statusMapping = {
    new: "Нова",
    diagnostic: "Діагностика",
    repair: "Ремонт",
    complete: "Завершено",
  };

  // пробний масив для компоненту зв'язку (клієнти)

  export const connections = [
    { timeCall: "9:39", typeMessage: "call_incoming", photoUrl: null, name: "Максим", auto: "HONDA CIVIC", status: "missing", callTranscription: null, content: null, clientId: null }, 
    { timeCall: "9:20", typeMessage: "call_missed", photoUrl: null, name: "Гість", auto: "HONDA CIVIC", status: "diagnostic", callTranscription: null, content: null, clientId: "123" },
    { timeCall: "9:27", typeMessage: "call_incoming", photoUrl: null, name: "Олександр Макаренковчук", auto: "2001 Volkswagen Passat", status: "repair", callTranscription: null, content: null, clientId: null },
    { timeCall: "9:15", typeMessage: "call_outgoing", photoUrl: null, name: "Петро", auto: "2001 HONDA CIVIC", status: "appointment", callTranscription: null, content: null, clientId: "456" },
    { timeCall: "9:39", typeMessage: "setting", photoUrl: null, name: "Максим", auto: "HONDA CIVIC", status: "diagnostic", callTranscription: null, content: null, clientId: null }, 
    { timeCall: "9:39", typeMessage: "browser", photoUrl: null, name: "Максим", auto: "HONDA CIVIC", status: "appointment", callTranscription: null, content: null, clientId: "789" }, 
    { timeCall: "9:27", typeMessage: "telegram", photoUrl: null, name: "Іван Петренко", auto: "2001 HONDA CIVIC", status: "repair", callTranscription: null, content: null, clientId: null },
    { timeCall: "9:27", typeMessage: "telegram", photoUrl: null, name: "Іван Петренко", auto: "2001 HONDA CIVIC", status: "repair", callTranscription: null, content: null, clientId: "987" },
    { timeCall: "9:27", typeMessage: "telegram", photoUrl: null, name: "Іван Петренко", auto: "2001 HONDA CIVIC", status: "repair", callTranscription: null, content: null, clientId: null }
  ];

  // пробні статуси для компоненту зв'язку (клієнти)

  export const statusesInConnections = {
    missing: "Втрачено",
    diagnostic: "Діагностика",
    repair: "Ремонт",
    appointment: "Запис",
  };

  // пробний масив для аудіоплеера

  export const summary =
  "Привіт! Мене звати [Ім'я], і я хочу записатися на ремонт свого автомобіля. У мене[марка і модель авто], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей.Також цікавить діагностика стану автомобіля після ремонту.Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!";

  
  export const messages = [
    {
      orClientMsg: true,
      time: "00:00",
      message:
        "Доброго дня, ще раз заставлю. Скажіть, будь ласка, якщо я щось відвіду, я вам дзвоню, у мене нашовання блок АБС. Може хтось подивитися, це він чи не він?",
    },
    {
      orClientMsg: false,
      time: "00:15",
      message:
        "Можемо тільки з наступної середи, тому що електрик у нас відпустив.",
    },
    {
      orClientMsg: true,
      time: "00:00",
      message:
        "Доброго дня, ще раз заставлю. Скажіть, будь ласка, якщо я щось відвіду, я вам дзвоню, у мене нашовання блок АБС. Може хтось подивитися, це він чи не він?",
    },
    {
      orClientMsg: false,
      time: "00:15",
      message:
        "Можемо тільки з наступної середи, тому що електрик у нас відпустив.",
    },
    {
      orClientMsg: true,
      time: "00:00",
      message:
        "Доброго дня, ще раз заставлю. Скажіть, будь ласка, якщо я щось відвіду, я вам дзвоню, у мене нашовання блок АБС. Може хтось подивитися, це він чи не він?",
    },
    {
      orClientMsg: false,
      time: "00:15",
      message:
        "Можемо тільки з наступної середи, тому що електрик у нас відпустив.",
    },
  ];

  // Лейбл для модлаки - налаштування видимості 

  export const labelNamesInModal = {
    name: "Ім'я",
    rating: "Рейтинг",
    carNum: "Номер машини",
    carModelYear: "Марка-модель",
    vin: "VIN",
    mileage: "Пробіг",
    time: "Час",
    photo: "Фото",
    totalPrice: "Загальна сума",
    phoneNumber: "Телефон",
    status: "Статус",
    info: "Інфо",
    prePayment: "Предоплата"
  };

// Лейбл для CRM - налаштування видимості 

export const labelNamesInCrm = {
  name: "Ім'я",
  rating: "Рейтинг",
  carNum: "Номер машини",
  carModelYear: "Марка-модель",
  vin: "VIN",
  mileage: "Пробіг",
  time: "Час",
  photo: "Фото",
  totalPrice: "Загальна сума",
  paymentBtn: "Оплатити",
  phoneNumber: "Телефон",
  status: "Статус",
  info: "Інфо",
  createBtn: "Створити запис",
  archive: "Архів",
  prePayment: "Предоплата"
};

  // Лейбл для секції постачальників - налаштування видимості 

  export const labelNamesDistributorSection = {
    date: "Дата",
    quantity: "Кількість",
    article: "Артикул",
    brand: "Бренд",
    nomenclature: "Номенклатура",
    purchasePrice: "Ціна закупки",
    purchaseAmount: "Сума закупки",
    saleAmount: "Сума продажу",
    profit: "Прибуток",
    percent: "% прибутку"
  };

  // Лейбл для секції накладних - налаштування видимості 

  export const labelNamesInvoices = {
    diagnostics: "Діагностика",
    agreed: "Погоджено",
    reserved: "Замовлено",
    received: "Отримано",
    soldOut: "Продано",
    returned: "Повернуто",
    moved: "Переміщено",
    revaluation: "Переоцінка",
    inventory: "Інвентарізація",
    writeOff: "Списано"
  };

  // Прикожу назви в компонентів до назв в стані заголовки

  export const categoryNameMapping = {
      "Діагностика": "diagnostics",
      "Погоджено": "agreed",
      "Замовлено": "reserved",
      "Отримано": "received",
      "Продано": "soldOut",
      "Повернуто": "returned",
      "Переміщено": "moved",
      "Переоцінка": "revaluation",
      "Інвентаризація": "inventory",
      "Списано": "writeOff"
    };


    // Лейбл для секції облік(клієнти у роботі) - налаштування видимості 

    export const labelNamesClientsInWork = {
      appeal: "Звернення",
      diagnostics: "Діагностика",
      KP: "КП",
      prePayment: "Аванс",
      order: "Замовлення",
      provider: "Постачальник",
      repair: "Ремонт",
      totaAmount: "Загальна сума",
      notification: "Сповіщення"
    };

    // export const categoryNameClients = {
    //   "Звернення": "appeal",
    //   "Діагностика": "diagnostics",
    //   "КП": "KP",
    //   "Замовлення": "order",
    //   "Аванс": "prePayment",
    //   "Постчальник": "provider",
    //   "Ремонт": "repair",
    //   "Тотальна сума": "totalAmount",
    //   "Сповіщення": "notification"
    // };

    export const categoryIdClients = {
      "1": "appeal",
      "2": "diagnostics",
      "3": "KP",
      "4": "prePayment",
      "5": "order",
      "6": "provider",
      "7": "repair",
      "8": "totalAmount",
      "9": "notification"
    };


    
    // Лейбл для секції облік(загальний список клієнтів) - налаштування видимості 

    export const labelNamesAllClients = {
      photo: "Фото",
      name: "Ім'я",
      rating: "Рейтинг",
      appeal: "Звернення",
      repair: "Ремонт",
      averageCheck: "Середній чек",
      diagnostics: "Каса",
      workPayment: "Оплата за роботу",
      salaryMechanics: "ЗП механіка",
      spareParts: "Запчастини",
      markUp: "Націнка",
      salaryManager: "ЗП Менеджер",
      salaryAdmin: "ЗП Адмін",
      coefficient: "Коефіцієнт",
      NG: "НГ",
      profit: "Прибуток",
      percent: "% прибутку"
    };