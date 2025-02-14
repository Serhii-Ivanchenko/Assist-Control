import { useState } from "react";
import css from "./DetailsPart.module.css";
import { BsWrench } from "react-icons/bs";

const categoriesWithSubcategories = [
  {
    label: "Система запалювання",
    categ: [
      { name: "Система розподілу запалювання", id: "1" },
      { name: "Свічки запалювання", id: "2" },
      { name: "Індукційний котел", id: "3" },
      { name: "Датчик обертів колінвала", id: "4" },
      { name: "Модуль запалювання", id: "5" },
    ],
  },
  {
    label: "Система подачі пального",
    categ: [
      { name: "Фільтр пального", id: "1" },
      { name: "Насос подачі пального", id: "2" },
      { name: "Паливна рейка", id: "3" },
      { name: "Форсунки", id: "4" },
      { name: "Рел насоса пального", id: "5" },
    ],
  },
  {
    label: "ГРМ (газорозподільний механізм)",
    categ: [
      { name: "Ремінь ГРМ", id: "1" },
      { name: "Ланцюг ГРМ", id: "2" },
      { name: "Ролики натягувачі", id: "3" },
      { name: "Кільця клапанів", id: "4" },
      { name: "Корпус ГРМ", id: "5" },
    ],
  },
  {
    label: "Система охолодження",
    categ: [
      { name: "Радіатор", id: "1" },
      { name: "Помпа", id: "2" },
      { name: "Термостат", id: "3" },
      { name: "Трубопроводи охолодження", id: "4" },
      { name: "Контур охолодження", id: "5" },
      { name: "Реле вентилятора", id: "6" },
    ],
  },
  {
    label: "Турбонаддув",
    categ: [
      { name: "Турбокомпресор", id: "1" },
      { name: "Інтеркулер", id: "2" },
      { name: "Вихлопна труба турбонаддува", id: "3" },
      { name: "Паливний насос турбонаддува", id: "4" },
      { name: "Робочий вал турбонаддува", id: "5" },
    ],
  },
  {
    label: "Впускна і випускна системи",
    categ: [
      { name: "Колектор", id: "1" },
      { name: "Фільтр повітря", id: "2" },
      { name: "Система фільтрації випуску", id: "3" },
      { name: "Трубопроводи впускної системи", id: "4" },
      { name: "Клапани впуску", id: "5" },
      { name: "Глушник", id: "6" },
    ],
  },
  {
    label: "Ремінь ГРМ",
    categ: [
      { name: "Ремінь для приводу клапанів", id: "1" },
      { name: "Ремінь для турбонагнітача", id: "2" },
      { name: "Натяжний ролик", id: "3" },
      { name: "Ремінь генератора", id: "4" },
      { name: "Заміна ременя ГРМ", id: "5" },
    ],
  },
  {
    label: "Ремінь генератора",
    categ: [
      { name: "Ремінь для стартер-генератора", id: "1" },
      { name: "Ремінь для насосів", id: "2" },
      { name: "Регулювання натягу ременя", id: "3" },
      { name: "Ремінь для вентиляторів", id: "4" },
    ],
  },
  {
    label: "Натяжний механізм",
    categ: [
      { name: "Натяжний ролик", id: "1" },
      { name: "Шків натяжного механізму", id: "2" },
      { name: "Система натягу ременя", id: "3" },
      { name: "Механізм натягу для трансмісії", id: "4" },
    ],
  },
  {
    label: "Ремінь кондиціонера",
    categ: [
      { name: "Ремінь для компресора", id: "1" },
      { name: "Ремінь для вентилятора", id: "2" },
      { name: "Регулювання натягу ременя кондиціонера", id: "3" },
      { name: "Ремінь для насосів кондиціонера", id: "4" },
    ],
  },
  {
    label: "Охолоджувальна рідина",
    categ: [
      { name: "Охолоджувач", id: "1" },
      { name: "Фільтр охолоджувача", id: "2" },
      { name: "Трубопроводи охолодження", id: "3" },
      { name: "Термостат", id: "4" },
    ],
  },
  {
    label: "Моторне масло",
    categ: [
      { name: "Масляний фільтр", id: "1" },
      { name: "Олія для коробки передач", id: "2" },
      { name: "Олія для двигуна", id: "3" },
      { name: "Заміна масла в двигуні", id: "4" },
    ],
  },
  {
    label: "Гальмівна рідина",
    categ: [
      { name: "Рідина для гальмівних систем", id: "1" },
      { name: "Рідина для антиблокувальних систем", id: "2" },
      { name: "Гальмівний циліндр", id: "3" },
      { name: "Заміна гальмівної рідини", id: "4" },
    ],
  },
  {
    label: "Трансмісійна рідина",
    categ: [
      { name: "Масло для коробки передач", id: "1" },
      { name: "Масло для трансмісій", id: "2" },
      { name: "Гідравлічне масло для трансмісії", id: "3" },
      { name: "Заміна трансмісійної рідини", id: "4" },
    ],
  },
  {
    label: "Рідина ГУР",
    categ: [
      { name: "Масло для підсилювача керма", id: "1" },
      { name: "Гідравлічне масло", id: "2" },
      { name: "Рідина для насосів", id: "3" },
      { name: "Очищення рідини ГУР", id: "4" },
    ],
  },
  {
    label: "Рульова рейка",
    categ: [
      { name: "Система підсилювача рульового", id: "1" },
      { name: "Система кріплення", id: "2" },
      { name: "Заміна рульової рейки", id: "3" },
      { name: "Ремонт рульової рейки", id: "4" },
    ],
  },
  {
    label: "Рульові тяги",
    categ: [
      { name: "Тяги для переднього колеса", id: "1" },
      { name: "Тяги для заднього колеса", id: "2" },
      { name: "Налаштування рульових тяг", id: "3" },
      { name: "Заміна рульових тяг", id: "4" },
    ],
  },
  {
    label: "Електропідсилювач керма",
    categ: [
      { name: "Електродвигун підсилювача", id: "1" },
      { name: "Система датчиків", id: "2" },
      { name: "Ремонт електропідсилювача", id: "3" },
    ],
  },
  {
    label: "Гідропідсилювач керма",
    categ: [
      { name: "Гідравлічний насос", id: "1" },
      { name: "Шланги підсилювача", id: "2" },
      { name: "Заміна рідини ГУР", id: "3" },
      { name: "Очищення системи", id: "4" },
    ],
  },
  {
    label: "Хрестовина рульового вала",
    categ: [
      { name: "Кріплення хрестовини", id: "1" },
      { name: "Шарніри", id: "2" },
      { name: "Заміна хрестовини", id: "3" },
    ],
  },
  {
    label: "Передня підвіска",
    categ: [
      { name: "Пружини підвіски", id: "1" },
      { name: "Амортизатори передньої підвіски", id: "2" },
      { name: "Шарніри передньої підвіски", id: "3" },
      { name: "Сайлентблоки", id: "4" },
    ],
  },
  {
    label: "Задня підвіска",
    categ: [
      { name: "Ремонт задньої підвіски", id: "1" },
      { name: "Амортизатори задньої підвіски", id: "2" },
      { name: "Підшипники задньої підвіски", id: "3" },
    ],
  },
];

export default function DetailsPart({ title }) {
  const [isChosen, setIsChosen] = useState(false);

  const handleChosenLeft = (id) => {
    setIsChosen(isChosen === id ? false : id);
  };

  const handleChosenRight = (id) => {
    setIsChosen(isChosen === id ? false : id);
  };

  return (
    <>
      <div className={css.title}>
        <p className={css.name}>{title}</p>
        <p className={`${css.sides} ${css.sideL}`}>Л</p>
        <p className={css.sides}>П</p>
      </div>
      <ul className={css.detailsList}>
        {categoriesWithSubcategories.map((cat) =>
          cat.label === title
            ? cat.categ.map((category, index) => (
                <li className={css.detailsItem} key={index}>
                  <p className={css.subcategoryName}>{category.name}</p>
                  <div className={css.buttons}>
                    <button
                      type="button"
                      className={`${css.btn} ${
                        isChosen === category.id && css.btnRed
                      }`}
                      onClick={() => handleChosenLeft(category.id)}
                    >
                      <BsWrench size={18} className={css.icon} />
                    </button>
                    <button
                      type="button"
                      className={`${css.btn} ${
                        isChosen === category.id && css.btnRed
                      }`}
                      onClick={() => handleChosenRight(category.id)}
                    >
                      {" "}
                      <BsWrench size={18} className={css.icon} />
                    </button>
                  </div>
                </li>
              ))
            : ""
        )}
      </ul>
    </>
  );
}
