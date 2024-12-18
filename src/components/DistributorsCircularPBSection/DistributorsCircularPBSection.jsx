import css from './DistributorsCircularPBSection.module.css'
import CircleProgressBar from "../sharedComponents/CircleProgressBar/CircleProgressBar.jsx"

const data = [
  {
    value: 42, maxvalue: 100, activecolor: "var(--green-btn-normal)",
    noactivecolor: "var(--bg-input)", title: "Постачальники", label: 14151321,
  },
  {
    value: 45, maxvalue: 100, activecolor: "var(--play-btn-triangle)",
    noactivecolor: "var(--bg-input)", title: "Прибуток", label: 6359184,
     titletext: "45%",
  },
{
    value: 1.7, maxvalue: 100, activecolor: "var(--status-complete)",
    noactivecolor: "var(--bg-input)",  title: "Коеф", label: 1.6,
  },
  {
    value: 48, maxvalue: 100, activecolor: "var(--status-new)",
    noactivecolor: "var(--bg-input)", title: "Топ 1", label: 1700000,
     titletext: "Elit 48%",
     label2: 1000000, activecolor2: "#FFFF8C",
  },
  {
    value: 32, maxvalue: 100, activecolor: "var(--status-new)",
    noactivecolor: "var(--bg-input)", title: "Топ 2", label: 1700000,
     titletext: "GRS 32%",
     label2: 1000000, activecolor2: "#FFFF8C",
  },
  {
    value: 29, maxvalue: 100, activecolor: "var(--status-new)",
    noactivecolor: "var(--bg-input)", title: "Топ 3", label: 1700000,
     titletext: "AZR 29%",
     label2: 1000000, activecolor2: "#FFFF8C",
  },
  {
    value: 29, maxvalue: 100, activecolor: "var(--red)",
    noactivecolor: "var(--bg-input)", title: "Анті-топ 1", label: 1700000,
     titletext: "AZR 29%",
     label2: 1000000, activecolor2: "#FF8C8C",
  },
  {
    value: 29, maxvalue: 100, activecolor: "var(--red)" ,
    noactivecolor: "var(--bg-input)", label: 1700000, title: "Анті-топ 2",
     titletext: "AZR 29%",
     label2: 1000000, activecolor2: "#FF8C8C",
  },
   {
    value: 29, maxvalue: 100, activecolor: "var(--red)",
     noactivecolor: "var(--bg-input)", label: 1700000, title: "Анті-топ 3",
     titletext: "AZR 29%",
     label2: 1000000, activecolor2: "#FF8C8C",
  },
{
    value: 1, maxvalue: 100, activecolor: "var(--red)",
  noactivecolor: "var(--bg-input)", title: "Не продано", label: 25491,
     titletext: "1%",
  },
  
 
];


export default function DistributorsCircularPBSection() {
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


