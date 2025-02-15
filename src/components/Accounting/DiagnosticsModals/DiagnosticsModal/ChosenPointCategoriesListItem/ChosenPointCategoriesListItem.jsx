import css from "./ChosenPointCategoriesListItem.module.css";
import { BsFillCaretDownFill } from "react-icons/bs";

const categories = [
  {
    label: "Двигун",
    categ: [
      { name: "Система запалювання", id: "101" },
      { name: "Система подачі пального", id: "102" },
      { name: "ГРМ (газорозподільний механізм)", id: "103" },
      { name: "Система охолодження", id: "104" },
      { name: "Турбонаддув", id: "105" },
      { name: "Впускна і випускна системи", id: "106" },
    ],
  },
  {
    label: "Приводні ремені",
    categ: [
      { name: "Ремінь ГРМ", id: "201" },
      { name: "Ремінь генератора", id: "202" },
      { name: "Натяжний механізм", id: "203" },
      { name: "Ремінь кондиціонера", id: "204" },
    ],
  },
  {
    label: "Тех рідини",
    categ: [
      { name: "Охолоджувальна рідина", id: "301" },
      { name: "Моторне масло", id: "302" },
      { name: "Гальмівна рідина", id: "303" },
      { name: "Трансмісійна рідина", id: "304" },
      { name: "Рідина ГУР (гідропідсилювача керма)", id: "305" },
    ],
  },
  {
    label: "Рульове",
    categ: [
      { name: "Рульова рейка", id: "401" },
      { name: "Рульові тяги", id: "402" },
      { name: "Електропідсилювач керма", id: "403" },
      { name: "Гідропідсилювач керма", id: "404" },
      { name: "Хрестовина рульового вала", id: "405" },
    ],
  },
  {
    label: "Ходова",
    categ: [
      { name: "Передня підвіска", id: "501" },
      { name: "Задня підвіска", id: "502" },
      { name: "Сайлентблоки", id: "503" },
      { name: "Амортизатори", id: "504" },
      { name: "Пружини", id: "505" },
      { name: "Кульові опори", id: "506" },
      { name: "Стабілізатор поперечної стійкості", id: "507" },
    ],
  },
  {
    label: "Гальма",
    categ: [
      { name: "Гальмівна система задня", id: "601" },
      { name: "Гальмівна система передня", id: "602" },
      { name: "Гальмівний супорт", id: "603" },
      { name: "Гальмівні шланги", id: "604" },
      { name: "Головний гальмівний циліндр", id: "605" },
    ],
  },
  {
    label: "Вихлопна",
    categ: [
      { name: "Глушник", id: "701" },
      { name: "Резонатор", id: "702" },
      { name: "Каталізатор", id: "703" },
      { name: "Лямбда-зонд", id: "704" },
      { name: "Колектор", id: "705" },
    ],
  },
];

export default function ChosenPointCategoriesListItem({
  point,
  openDetails,
  setOpenDetails,
  setCategoryForDetailsPart,
}) {
  const showDetails = (id) => {
    setOpenDetails(openDetails === id ? null : id);
    const chosenCategory = categories
      .find((cat) => cat.label === point.label)
      ?.categ.find((categ) => categ.id === id);
    console.log(chosenCategory);

    if (chosenCategory) {
      setCategoryForDetailsPart(chosenCategory.name);
    }
  };

  return (
    <li>
      <p className={css.categoryName}>{point.label}</p>

      <ul className={css.subcategoriesList}>
        {categories.map((cat) =>
          cat.label === point.label
            ? cat.categ.map((category, index) => (
                <li
                  className={css.subcategoriesListItem}
                  key={index}
                  onClick={() => showDetails(category.id)}
                >
                  <p className={css.subCategory}>{category.name}</p>
                  <div className={css.divForShadow}>
                    <span
                      className={`${css.iconBox} ${
                        openDetails === category.id && css.rotated
                      }`}
                    >
                      <BsFillCaretDownFill className={css.icon} />
                    </span>
                  </div>
                </li>
              ))
            : ""
        )}
      </ul>
    </li>
  );
}
