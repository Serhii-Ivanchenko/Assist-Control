import css from "./HorizontalProgressBar.module.css";
import LinearProgress from "@mui/material/LinearProgress";
// import toast from "react-hot-toast";
// import { useEffect, useRef } from "react";

export default function HorizontalProgressBar({
  value,
  minvalue,
  maxvalue,
  title,
  activecolor,
  lineHeight,
  borderradius,
}) {
  const valueLinear = ((value - minvalue) * 100) / (maxvalue - minvalue);

  return (
    <div className={css.wrapper}>
      <div className={css.titlebox}>
        <p className={css.title}>
          {" "}
          Хвилин
          <span className={css.title}> {title} </span> :
          <span className={css.titlespan}> {value} </span>з {maxvalue}{" "}
        </p>

        {/* <button
                        className={css.btnadd}
                        type="button" > Додати</button> */}
      </div>
      <LinearProgress
        variant="determinate"
        value={valueLinear}
        sx={{
          height: lineHeight,
          borderRadius: borderradius,
          backgroundColor: "var(--main-gray)", // Цвет неактивной части
          "& .MuiLinearProgress-bar": {
            backgroundColor: activecolor, // Цвет активной части
          },
        }}
      />

      {value > maxvalue ? (
        <p className={css.error}>
          Ліміт дзвінків по тарифу “Телефонія 2500” вичерпано.
        </p>
      ) : (
        <p className={css.tarplan}>
          Тариф “Телефонія 2500” буде продовжений 26 квітня 2025 р.
        </p>
      )}
    </div>
  );
}
