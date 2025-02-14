import css from "./ChosenPointCategoriesListItem.module.css";
import { BsFillCaretDownFill } from "react-icons/bs";

const categories = [
  {
    label: "Двигун",
    categ: [
      { name: "Система запалювання", id: "1" },
      { name: "Система подачі пального", id: "2" },
      { name: "ГРМ (газорозподільний механізм)", id: "3" },
      { name: "Система охолодження", id: "4" },
      { name: "Турбонаддув", id: "5" },
      { name: "Впускна і випускна системи", id: "6" },
    ],
  },
  {
    label: "Приводні ремені",
    categ: [
      { name: "Ремінь ГРМ", id: "1" },
      { name: "Ремінь генератора", id: "2" },
      { name: "Натяжний механізм", id: "3" },
      { name: "Ремінь кондиціонера", id: "4" },
    ],
  },
  {
    label: "Тех рідини",
    categ: [
      { name: "Охолоджувальна рідина", id: "1" },
      { name: "Моторне масло", id: "2" },
      { name: "Гальмівна рідина", id: "3" },
      { name: "Трансмісійна рідина", id: "4" },
      { name: "Рідина ГУР (гідропідсилювача керма)", id: "5" },
    ],
  },
  {
    label: "Рульове",
    categ: [
      { name: "Рульова рейка", id: "1" },
      { name: "Рульові тяги", id: "2" },
      { name: "Електропідсилювач керма", id: "3" },
      { name: "Гідропідсилювач керма", id: "4" },
      { name: "Хрестовина рульового вала", id: "5" },
    ],
  },
  {
    label: "Ходова",
    categ: [
      { name: "Передня підвіска", id: "1" },
      { name: "Задня підвіска", id: "2" },
      { name: "Сайлентблоки", id: "3" },
      { name: "Амортизатори", id: "4" },
      { name: "Пружини", id: "5" },
      { name: "Кульові опори", id: "6" },
      { name: "Стабілізатор поперечної стійкості", id: "7" },
    ],
  },
  {
    label: "Гальма",
    categ: [
      { name: "Гальмівна система задня", id: "1" },
      { name: "Гальмівна система передня", id: "2" },
      { name: "Гальмівний супорт", id: "3" },
      { name: "Гальмівні шланги", id: "4" },
      { name: "Головний гальмівний циліндр", id: "5" },
    ],
  },
  {
    label: "Вихлопна",
    categ: [
      { name: "Глушник", id: "1" },
      { name: "Резонатор", id: "2" },
      { name: "Каталізатор", id: "3" },
      { name: "Лямбда-зонд", id: "4" },
      { name: "Колектор", id: "5" },
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
