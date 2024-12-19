import css from "./CircleProgressBar.module.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircleProgressBar({
  value,
  maxvalue,
  activecolor,
  noactivecolor,
  label,
  title,
  label2,
  activecolor2,
  isoblic,
  titletext,
}) {
  const percent = value > 0 ? (value / maxvalue) * 100 : 1;
  const percentage = value > 0 ? ((value / maxvalue) * 100).toFixed(1) : 0;

  return (
    <div className={css.wrapper}>
      <p className={css.title}> {title} </p>

      <p className={css.titlenum}>
        {" "}
        {titletext !== undefined ? titletext : value}{" "}
      </p>

      <div className={css.progressBar}>
        {/* Неактивный бордер */}
        <CircularProgress
          variant="determinate"
          value={100} // Полный круг
          size="126px"
          thickness={3}
          sx={{
            color: noactivecolor,
            position: "absolute",
          }}
        />

        <CircularProgress
          variant="determinate"
          value={percent}
          size="126px"
          thickness={3}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            color: activecolor, // Цвет активной части
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round", // Закругляем концы линии
            },
          }}
        />

        <div
          className={css.label}
          style={{ color: activecolor, fontSize: isoblic ? "20px" : "24px" }}
        >
          {label !== undefined
            ? new Intl.NumberFormat("uk-UA", {
                useGrouping: true,
                minimumFractionDigits: label % 1 === 0 ? 0 : 2,
                maximumFractionDigits: 2,
              })
                .format(label)
                .replace(",", ".")
            : `${percentage}%`}
        </div>
        {label2 !== undefined ? (
          <span style={{ color: activecolor2 }} className={css.labelsecond}>
            {new Intl.NumberFormat("uk-UA", {
              useGrouping: true,
              minimumFractionDigits: label2 % 1 === 0 ? 0 : 2,
              maximumFractionDigits: 2,
            })
              .format(label2)
              .replace(",", ".")}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
