import css from './RecommendationsPBSection.module.css'
import CircleProgressBar from "../../sharedComponents/CircleProgressBar/CircleProgressBar.jsx"

const data = [
  {
    value: 2, maxvalue: 8, activecolor: "var(--status-new)",  
    noactivecolor: "var(--bg-input)",  title: "Заплановано"
  },
  {
    value: 8, maxvalue: 8, activecolor: "var(--play-btn-triangle)",
    noactivecolor: "var(--bg-input)",  title: "Оброблено"
  },
  {
    value: 3, maxvalue: 8, activecolor: "var(--green)",
    noactivecolor: "var(--bg-input)",  title: "Записано"
  },
  {
    value: 0, maxvalue: 0, activecolor: "var(--status-repair)",
    noactivecolor: "var(--bg-input)",  title: "Перенесено"
  },
  {
    value: 0, maxvalue: 0, activecolor: "var(--red)",
    noactivecolor: "var(--bg-input)",  title: "Видалено"
  },
];

export default function RecommendationsPBSection() {
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
  
