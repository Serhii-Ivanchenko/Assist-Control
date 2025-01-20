import css from './ClientsInWorkCircularPBSection.module.css'

import CircleProgressBar from "../sharedComponents/CircleProgressBar/CircleProgressBar.jsx"

const data = [
  {
    value: 4, maxvalue: 4, activecolor: "var(--play-btn-triangle)",
    noactivecolor: "var(--bg-input)",  title: "Всього"
  },
  {
    value: 0, maxvalue: 4, activecolor: "var(--status-new)",
    noactivecolor: "var(--bg-input)",  title: "Звернення"
  },
{
    value: 1, maxvalue: 4, activecolor: "var(--status-diag)",
    noactivecolor: "var(--bg-input)",  title: "Діагностика"
  },
  {
    value: 0, maxvalue: 4, activecolor: "var(--status-diag)",
    noactivecolor: "var(--bg-input)",  title: "КП"
  },
  {
    value: 0, maxvalue: 0, activecolor: "var(--status-repair)",
    noactivecolor: "var(--bg-input)",  title: "Замовлення"
  },
  {
    value: 0, maxvalue: 0, activecolor: "var(--status-repair)",
    noactivecolor: "var(--bg-input)",  title: "Постачальник"
  },
  {
    value: 1, maxvalue: 4, activecolor: "var(--status-repair)",
    noactivecolor: "var(--bg-input)",  title: "Ремонт"
  },
  {
    value: 0, maxvalue: 4, activecolor: "#FFFF8C",
    noactivecolor: "var(--bg-input)", label: 12000,  title: "Оплата"
  },
{
    value: 1, maxvalue: 4, activecolor: "var(--red)",
    noactivecolor: "var(--bg-input)",  title: "Рекомендації"
  },
  {
    value: 1, maxvalue: 4, activecolor: "var(--green)",
    noactivecolor: "var(--bg-input)",  title: "Готово"
  },
 
];


export default function ClientsInWorkCircularPBSection() {
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
};


