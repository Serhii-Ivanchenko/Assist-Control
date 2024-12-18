import css from "./GeneralClientCircularPBSection.module.css";

import CircleProgressBar from "../sharedComponents/CircleProgressBar/CircleProgressBar.jsx"

const data = [
  {
    value: 2487, maxvalue: 10000, activecolor: "var(--green-btn-normal)",
    noactivecolor: "var(--bg-input)", title: "Клієнтів", label: 22486521,
   
    label2: 15200, activecolor2: "var(--status-complete)",
  },
  {
    value: 37.2, maxvalue: 100, activecolor: "var(--green-btn-normal)",
    noactivecolor: "var(--bg-input)", title: "Робот", label: 835500,
    titletext: "37.2%",
  },
{
    value: 14.8, maxvalue: 100, activecolor: "var(--status-new)",
  noactivecolor: "var(--bg-input)", title: "ЗП мех", label: 3342000,
    titletext: "14.8%",
  },
  {
    value: 62.8, maxvalue: 100, activecolor: "var(--green-btn-normal)",
    noactivecolor: "var(--bg-input)", title: "Запчастин", label: 14121521,
    titletext: "62.8%",
  },
  {
    value: 45, maxvalue: 100, activecolor: "var(--play-btn-triangle)",
    noactivecolor: "var(--bg-input)", title: "Націнка", label: 6359484,
    titletext: "45%",
  },
  {
    value: 5.6, maxvalue: 100, activecolor: "var(--status-new)",
    noactivecolor: "var(--bg-input)", title: "ЗП менеджер", label: 1271837, 
    titletext: "5.6%",
  },
  {
    value: 1, maxvalue: 100, activecolor: "var(--status-new)",
    noactivecolor: "var(--bg-input)", title: "ЗП админ", label: 225000,
    titletext: "1%",
  },
  {
    value: 1.7, maxvalue: 10, activecolor: "var(--status-complete)" ,
    noactivecolor: "var(--bg-input)", label: 1.6,  title: "Коеф"
  },
{
    value: 600, maxvalue: 1000, activecolor: "var(--red)",
    noactivecolor: "var(--bg-input)",  title: "НГ", label: 700
  },
  {
    value: 29, maxvalue: 100, activecolor: "var(--play-btn-triangle)",
    noactivecolor: "var(--bg-input)", label: 600491, title: "Прибуток",
    titletext: "29%",
  },
 
];


export default function GeneralClientCircularPBSection() {
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
        label2={item.label2}
        activecolor2={item.activecolor2}
        isoblic={true}
        titletext={item.titletext}
      />
    ))}
  </div>;
};





