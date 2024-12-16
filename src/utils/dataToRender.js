export const statusesCar = [
    { status: "all", label: "Всі авто" },
    { status: "new", label: "Нові" },
    { status: "diagnostic", label: "Діагностика" },
    { status: "repair", label: "Ремонт" },
    { status: "view_repair", label: "Огляд ПР" },
    { status: "complete", label: "Завершено" },
  ];

  export const statusesCommunications = [
    { status: "all_appeal", label: "Всі" },
    { status: "new_appeal", label: "Нові" },
    { status: "client", label: "Клієнти" },
    { status: "missing", label: "Втрачено" },
    { status: "appointment", label: "Запис" },
  ];

  export const statusMapping = {
    new: "Нова",
    diagnostic: "Діагностика",
    repair: "Ремонт",
    complete: "Завершено",
  };

  export const connections = [
    { timeCall: "9:39", typeMessage: "call_incoming", photoUrl: null, name: "Максим", auto: "HONDA CIVIC", status: "missing", callTranscription: null, content: null }, 
    { timeCall: "9:20", typeMessage: "call_missed", photoUrl: null, name: "Гість", auto: "HONDA CIVIC", status: "diagnostic", callTranscription: null, content: null },
    { timeCall: "9:27", typeMessage: "call_incoming", photoUrl: null, name: "Іван Петренко", auto: "2001 HONDA CIVIC", status: "repair", callTranscription: null, content: null },
    { timeCall: "9:15", typeMessage: "call_outgoing", photoUrl: null, name: "Петро", auto: "2001 HONDA CIVIC", status: "appointment", callTranscription: null, content: null },
    { timeCall: "9:39", typeMessage: "setting", photoUrl: null, name: "Максим", auto: "HONDA CIVIC", status: "diagnostic", callTranscription: null, content: null }, 
    { timeCall: "9:39", typeMessage: "browser", photoUrl: null, name: "Максим", auto: "HONDA CIVIC", status: "appointment", callTranscription: null, content: null }, 
    { timeCall: "9:27", typeMessage: "telegram", photoUrl: null, name: "Іван Петренко", auto: "2001 HONDA CIVIC", status: "repair", callTranscription: null, content: null }
  ];

  export const statusesInConnections = {
    missing: "Втрачено",
    diagnostic: "Діагностика",
    repair: "Ремонт",
    appointment: "Запис",
  };

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