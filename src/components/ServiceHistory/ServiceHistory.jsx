import css from "./ServiceHistory.module.css";
import ItemOfRecord from "./ItemOfRecord/ItemOfRecord";
import { useState } from "react";
import { clsx } from "clsx";
import { BsArrowDownSquareFill } from "react-icons/bs";
export default function ServiceHistory() {
  const [maxItemRecord, setMaxItemRecord] = useState(1);
  const messages = [
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
  const recordRace = [
    {
      index: "1",
      totalkilometrs: "246750",
      newkilometrs: "9272",
      date: "19.06.2024",
      time: "16:08",
      appeal: {
        client:
          "Привіт! Мене звати [Ім'я], і я хочу записатися на ремонт свого автомобіля. У мене [марка і модель авто], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей. Також цікавить діагностика стану автомобіля після ремонту. Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!",
        menager:
          "Привіт! Мене звати [Ім'я], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей. Також цікавить діагностика стану автомобіля після ремонту. Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!",
      },
      diagnostic: {
        spareParts: [
          {
            id: "1",
            name: "Тормозні",
            number: "BRK123456",
            state: "Зношений",
            recomendation: "Заміна",
          },
          {
            id: "2",
            name: "Тормозні",
            number: "BRK123456",
            state: "Зношений",
            recomendation: "Заміна",
          },
          {
            id: "3",
            name: "Тормозні",
            number: "BRK123456",
            state: "Зношений",
            recomendation: "Заміна",
          },
        ],
        message:
          "Проведено попередній огляд авто. Виявлено деформацію передньогокрила та бампера. Для відновлення геометрії кузова та заміни пошкоджених деталей потрібно приблизно 3 дні. Рекомендую додатково перевірити ходову частину після ремонту. Очікуємо доставку деталей на наступний тиждень, після чого можна буде узгодити точну дату завершення робіт.",
      },
      repair: {
        fillOfRepair: [
          {
            isCellChecked: true,
            nameOfDetail: "Лобове скло",
            priceOfDetail: "3500",
            repairName: "Заміна лобового скла",
            repairPrice: "800",
            id: "1",
          },
          {
            isCellChecked: false,
            nameOfDetail: "Бампер передній",
            priceOfDetail: "4500",
            repairName: "Установка бампера",
            repairPrice: "1200",
            id: "2",
          },
          {
            isCellChecked: true,
            nameOfDetail: "Капот",
            priceOfDetail: "6000",
            repairName: "Встановлення капота",
            repairPrice: "1500",
            id: "3",
          },
          {
            isCellChecked: true,
            nameOfDetail: "Крила (л + п)",
            priceOfDetail: "4000",
            repairName: "Встановлення крил",
            repairPrice: "1000",
            id: "4",
          },
          {
            isCellChecked: false,
            nameOfDetail: "Фари передні (2 шт.)",
            priceOfDetail: "3200",
            repairName: "Налаштування фар",
            repairPrice: "600",
            id: "5",
          },
        ],
        repairSum: "21200",
      },
    },
    {
      index: "3",
      totalkilometrs: "246749",
      newkilometrs: "9272",
      date: "18.06.2024",
      time: "16:08",
    },
    {
      index: "2",
      totalkilometrs: "246748",
      newkilometrs: "9272",
      date: "17.06.2024",
      time: "16:08",
      appeal: {},
      diagnostic: {},
      repair: {},
    },
    {
      index: "4",
      totalkilometrs: "246747",
      newkilometrs: "9272",
      date: "16.06.2024",
      time: "16:08",
      appeal: {
        client:
          "Привіт! Мене звати [Ім'я], і я хочу записатися на ремонт свого автомобіля. У мене [марка і модель авто], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей. Також цікавить діагностика стану автомобіля після ремонту. Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!",
        menager:
          "Привіт! Мене звати [Ім'я], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей. Також цікавить діагностика стану автомобіля після ремонту. Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!",
      },
      diagnostic: {
        spareParts: [
          {
            id: "1",
            name: "Тормозні колодки",
            number: "BRK123456",
            state: "Зношений",
            recomendation: "Заміна",
          },
          {
            id: "2",
            name: "Тормозні колодки",
            number: "BRK123456",
            state: "Зношений",
            recomendation: "Заміна",
          },
          {
            id: "3",
            name: "Тормозні колодки",
            number: "BRK123456",
            state: "Зношений",
            recomendation: "Заміна",
          },
        ],
        message:
          "Проведено попередній огляд авто. Виявлено деформацію передньогокрила та бампера. Для відновлення геометрії кузова та заміни пошкоджених деталей потрібно приблизно 3 дні. Рекомендую додатково перевірити ходову частину після ремонту. Очікуємо доставку деталей на наступний тиждень, після чого можна буде узгодити точну дату завершення робіт.",
      },
    },
  ];
  const sortedArr = recordRace.sort((a, b) =>
    a.totalkilometrs > b.totalkilometrs ? -1 : 1
  );
  return (
    <div className={css.serviceHistory}>
      <div>
        <h3 className={css.title}>Історія обслуговування</h3>
        <div className={css.recordsListWrapper}>
          <ul
            className={clsx(
              css.listOfAccardion,
              maxItemRecord >= sortedArr.length && css.higherContainer
            )}
          >
            {sortedArr.map((item, index) => {
              if (index >= maxItemRecord) {
                return null;
              } else {
                return (
                  <ItemOfRecord
                    key={item.index}
                    item={item}
                    messages={messages}
                    isExpanded={index === 0}
                  />
                );
              }
            })}
          </ul>
        </div>
      </div>
      {maxItemRecord < sortedArr.length && (
        <div className={css.paginationRecord}>
          <button
            onClick={() => setMaxItemRecord((prev) => prev + 1)}
            className={css.addRecordBtn}
          >
            <BsArrowDownSquareFill size={16} fill="var(--white)" />
            <p>Історія</p>
          </button>
        </div>
      )}
    </div>
  );
}
