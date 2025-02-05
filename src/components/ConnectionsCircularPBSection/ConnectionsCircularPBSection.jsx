import css from "./ConnectionsCircularPBSection.module.css";
import CircleProgressBar from "../sharedComponents/CircleProgressBar/CircleProgressBar.jsx"

const reference = [
{ id: 1, title: "Всі", titleeng: "ALL", activecolor: "var(--play-btn-triangle)", noactivecolor: "var(--bg-input)", },
{ id: 2, title: "Нові", titleeng: "NEW", activecolor: "var(--status-new)", noactivecolor: "var(--bg-input)", },
{ id: 3, title: "Запис", titleeng: "APPOINTMENT", activecolor: "var(--green)", noactivecolor: "var(--bg-input)", },
{ id: 4, title: "Клієнти", titleeng: "CLIENT", activecolor: "var(--status-repair)", noactivecolor: "var(--bg-input)", },
{ id: 5, title: "Втрачено", titleeng: "LOST", activecolor: "var(--red)", noactivecolor: "var(--bg-input)", },
]



const data = [
  {
    value: 8, maxvalue: 8, activecolor: "var(--play-btn-triangle)",
    noactivecolor: "var(--bg-input)",  title: "Всі"
  },
  {
    value: 2, maxvalue: 8, activecolor: "var(--status-new)",
    noactivecolor: "var(--bg-input)",  title: "Нові"
  },
  {
    value: 3, maxvalue: 8, activecolor: "var(--green)",
    noactivecolor: "var(--bg-input)", title: "Запис"
  },
  {
    value: 0, maxvalue: 0, activecolor: "var(--status-repair)",
    noactivecolor: "var(--bg-input)",  title: "Клієнти"
  },
  {
    value: 0, maxvalue: 0, activecolor: "var(--red)",
    noactivecolor: "var(--bg-input)",  title: "Втрачено"
  },
];


export default function ConnectionsCircularPBSection() {




// const maxValue = backendData["ALL"] || 0;

// // Формируем массив данных
// const data = reference
//   .map(({ id, title, titleeng, activecolor, noactivecolor }) => ({
//     id,
//     title,
//     value: backendData[titleeng] ?? 0,
//     maxvalue: maxValue,
//     activecolor,
//     noactivecolor
//   }))
//   .sort((a, b) => a.id - b.id); // Сортировка по id

//   console.log(data);
  

  return <div className={css.wrapper}>
   {data.map((item, index) => (
        <CircleProgressBar
          key={index}
          value={item.value}
          maxvalue={item.maxvalue}
          activecolor={item.activecolor}
          noactivecolor={item.noactivecolor}
          label={item.label}
          title={item.title}
        />
      ))}
  </div>;
}
