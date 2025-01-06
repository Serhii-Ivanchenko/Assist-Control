import css from "./ServiceHistory.module.css";
import ItemOfRecord from "./ItemOfRecord/ItemOfRecord";
import { IoIosSearch } from "react-icons/io";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { BsArrowDownSquareFill } from "react-icons/bs";
import absentAuto from "../../assets/images/absentAutoImg.webp/";

export default function ServiceHistory({ carName, clientInfo }) {
  const [inputValue, setInputValue] = useState("");
  const [maxItemRecord, setMaxItemRecord] = useState(1);
  const [filteredRecords, setFilteredRecords] = useState([]); // Додаємо стан для фільтрованих записів

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

  const recordRace = clientInfo.service_history;
  // console.log(recordRace);

  const diagnostic = {
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
    photoOfBreakdown: [
      { photo: absentAuto, id: "1" },
      { photo: absentAuto, id: "2" },
      { photo: absentAuto, id: "3" },
      { photo: absentAuto, id: "4" },
      { photo: absentAuto, id: "5" },
      { photo: absentAuto, id: "6" },
      { photo: absentAuto, id: "7" },
      { photo: absentAuto, id: "8" },
    ],
  };

  const recommendation = {
    name: "Ремонт ходової",
    text: "Привіт! Мене звати [Ім'я], і я хочу записатися на ремонт свого автомобіля. У мене [марка і модель авто], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей. Також цікавить діагностика стану автомобіля після ремонту. Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!",
    person: "manager",
    personName: "Шевченко А.В.",
  };

  const repair = {
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
  };
  //[
  //   {
  //     index: "1",
  //     totalkilometrs: "246750",
  //     newkilometrs: "9272",
  //     date: "19.06.2024",
  //     time: "16:08",
  //     appeal: {
  //       client:
  //         "Привіт! Мене звати [Ім'я], і я хочу записатися на ремонт свого автомобіля. У мене [марка і модель авто], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей. Також цікавить діагностика стану автомобіля після ремонту. Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!",
  //       menager:
  //         "Привіт! Мене звати [Ім'я], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей. Також цікавить діагностика стану автомобіля після ремонту. Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!",
  //     },
  //     diagnostic: {
  //       spareParts: [
  //         {
  //           id: "1",
  //           name: "Тормозні",
  //           number: "BRK123456",
  //           state: "Зношений",
  //           recomendation: "Заміна",
  //         },
  //         {
  //           id: "2",
  //           name: "Тормозні",
  //           number: "BRK123456",
  //           state: "Зношений",
  //           recomendation: "Заміна",
  //         },
  //         {
  //           id: "3",
  //           name: "Тормозні",
  //           number: "BRK123456",
  //           state: "Зношений",
  //           recomendation: "Заміна",
  //         },
  //       ],
  //       message:
  //         "Проведено попередній огляд авто. Виявлено деформацію передньогокрила та бампера. Для відновлення геометрії кузова та заміни пошкоджених деталей потрібно приблизно 3 дні. Рекомендую додатково перевірити ходову частину після ремонту. Очікуємо доставку деталей на наступний тиждень, після чого можна буде узгодити точну дату завершення робіт.",
  //     },
  //     repair: {
  //       fillOfRepair: [
  //         {
  //           isCellChecked: true,
  //           nameOfDetail: "Лобове скло",
  //           priceOfDetail: "3500",
  //           repairName: "Заміна лобового скла",
  //           repairPrice: "800",
  //           id: "1",
  //         },
  //         {
  //           isCellChecked: false,
  //           nameOfDetail: "Бампер передній",
  //           priceOfDetail: "4500",
  //           repairName: "Установка бампера",
  //           repairPrice: "1200",
  //           id: "2",
  //         },
  //         {
  //           isCellChecked: true,
  //           nameOfDetail: "Капот",
  //           priceOfDetail: "6000",
  //           repairName: "Встановлення капота",
  //           repairPrice: "1500",
  //           id: "3",
  //         },
  //         {
  //           isCellChecked: true,
  //           nameOfDetail: "Крила (л + п)",
  //           priceOfDetail: "4000",
  //           repairName: "Встановлення крил",
  //           repairPrice: "1000",
  //           id: "4",
  //         },
  //         {
  //           isCellChecked: false,
  //           nameOfDetail: "Фари передні (2 шт.)",
  //           priceOfDetail: "3200",
  //           repairName: "Налаштування фар",
  //           repairPrice: "600",
  //           id: "5",
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     index: "3",
  //     totalkilometrs: "246749",
  //     newkilometrs: "9272",
  //     date: "18.06.2024",
  //     time: "16:08",
  //   },
  //   {
  //     index: "2",
  //     totalkilometrs: "246748",
  //     newkilometrs: "9272",
  //     date: "17.06.2024",
  //     time: "16:08",
  //     appeal: {},
  //     diagnostic: {},
  //     repair: {
  //       fillOfRepair: [
  //         {
  //           isCellChecked: true,
  //           nameOfDetail: "Лобове скло",
  //           priceOfDetail: "3500",
  //           repairName: "Заміна лобового скла",
  //           repairPrice: "800",
  //           id: "1",
  //         },
  //         {
  //           isCellChecked: false,
  //           nameOfDetail: "Бампер передній",
  //           priceOfDetail: "4500",
  //           repairName: "Установка бампера",
  //           repairPrice: "1200",
  //           id: "2",
  //         },
  //         {
  //           isCellChecked: true,
  //           nameOfDetail: "Крила (л + п)",
  //           priceOfDetail: "4000",
  //           repairName: "Встановлення крил",
  //           repairPrice: "1000",
  //           id: "4",
  //         },
  //         {
  //           isCellChecked: false,
  //           nameOfDetail: "Фари передні (2 шт.)",
  //           priceOfDetail: "3200",
  //           repairName: "Налаштування фар",
  //           repairPrice: "600",
  //           id: "5",
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     index: "4",
  //     totalkilometrs: "246747",
  //     newkilometrs: "9272",
  //     date: "16.06.2024",
  //     time: "16:08",
  //     appeal: {
  //       client:
  //         "Привіт! Мене звати [Ім'я], і я хочу записатися на ремонт свого автомобіля. У мене [марка і модель авто], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей. Також цікавить діагностика стану автомобіля після ремонту. Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!",
  //       menager:
  //         "Привіт! Мене звати [Ім'я], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей. Також цікавить діагностика стану автомобіля після ремонту. Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!",
  //     },
  //     diagnostic: {
  //       spareParts: [
  //         {
  //           id: "1",
  //           name: "Тормозні колодки",
  //           number: "BRK123456",
  //           state: "Зношений",
  //           recomendation: "Заміна",
  //         },
  //         {
  //           id: "2",
  //           name: "Тормозні колодки",
  //           number: "BRK123456",
  //           state: "Зношений",
  //           recomendation: "Заміна",
  //         },
  //         {
  //           id: "3",
  //           name: "Тормозні колодки",
  //           number: "BRK123456",
  //           state: "Зношений",
  //           recomendation: "Заміна",
  //         },
  //       ],
  //       message:
  //         "Проведено попередній огляд авто. Виявлено деформацію передньогокрила та бампера. Для відновлення геометрії кузова та заміни пошкоджених деталей потрібно приблизно 3 дні. Рекомендую додатково перевірити ходову частину після ремонту. Очікуємо доставку деталей на наступний тиждень, після чого можна буде узгодити точну дату завершення робіт.",
  //     },
  //     repair: {
  //       fillOfRepair: [
  //         {
  //           isCellChecked: true,
  //           nameOfDetail: "Лобове скло",
  //           priceOfDetail: "3500",
  //           repairName: "Заміна лобового скла",
  //           repairPrice: "800",
  //           id: "1",
  //         },
  //         {
  //           isCellChecked: false,
  //           nameOfDetail: "Бампер передній",
  //           priceOfDetail: "4500",
  //           repairName: "Установка бампера",
  //           repairPrice: "1200",
  //           id: "2",
  //         },
  //         {
  //           isCellChecked: true,
  //           nameOfDetail: "Крила (л + п)",
  //           priceOfDetail: "4000",
  //           repairName: "Встановлення крил",
  //           repairPrice: "1000",
  //           id: "4",
  //         },
  //       ],
  //     },
  //   },
  // ];
  const sortedArr = [...recordRace].sort((a, b) =>
    a.mileage > b.mileage ? -1 : 1
  );

  // const newMileage = sortedArr.slice(1).map((item, index) => {
  //   return sortedArr[index].mileage - item.mileage;
  // });
  // console.log(newMileage);

  const handleButtonClick = (e) => {
    e.preventDefault();
    const input = e.target.value;
    setInputValue(input);
    const searchTerm = input.toLowerCase().trim();
    if (!searchTerm) {
      setMaxItemRecord(1);
      setFilteredRecords(sortedArr); // Повертаємо початковий список
      return;
    }
    // Фільтруємо записи, де у repair.fillOfRepair є значення nameOfDetail, що містить inputValue
    const filtered = sortedArr.filter((repair) =>
      repair?.fillOfRepair?.some((repairItem) =>
        repairItem.nameOfDetail
          .toLowerCase()
          .trim()
          .includes(input.toLowerCase().trim())
      )
    );
    setMaxItemRecord(filtered.length);
    setFilteredRecords(filtered);
  };
  useEffect(() => {
    setFilteredRecords(sortedArr);
  }, []);
  return (
    <div className={css.serviceHistory}>
      <div>
        <div className={css.headerOfServiceHistory}>
          <h3 className={css.title}>Історія обслуговування</h3>
          <h2>{carName}</h2>
          <div className={css.filtrationWrapper}>
            <button
              className={css.searchBtn}
              type="sumbit"
              onClick={handleButtonClick}
            >
              <IoIosSearch size={14} />
            </button>
            <input
              className={css.filtrationInput}
              type="text"
              placeholder="Пошук"
              value={inputValue}
              onChange={handleButtonClick}
            />
          </div>
        </div>

        <div className={css.recordsListWrapper}>
          <ul
            className={clsx(
              css.listOfAccardion,
              maxItemRecord >= (filteredRecords.length || sortedArr.length) &&
                css.higherContainer
            )}
          >
            {/* {(filteredRecords.length > 0 ? filteredRecords : sortedArr).map( */}
            {filteredRecords.length === 0 ? (
              <p className={css.notFoundText}>Нічого не знайдено</p>
            ) : (
              filteredRecords.map((item, index) => {
                if (index >= maxItemRecord) {
                  return null;
                } else {
                  return (
                    <ItemOfRecord
                      // clientInfo={clientInfo}
                      key={item.service_id}
                      item={item}
                      messages={messages}
                      isExpanded={index === 0}
                      diagnostics={diagnostic}
                      recommendation={recommendation}
                      repair={repair}
                    />
                  );
                }
              })
            )}
          </ul>
        </div>
      </div>
      {maxItemRecord < filteredRecords.length && (
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
