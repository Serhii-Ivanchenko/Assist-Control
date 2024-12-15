import css from './HorizontalPBSection.module.css'
import LinearProgress from '@mui/material/LinearProgress';
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

const minvalue = 0;
const maxvalue = 2500;
const value = 2502; 
export default function HorizontalPBSection() {
  const valueLinear = ((value - minvalue) * 100) / (maxvalue - minvalue);
 
  const toastShown = useRef(false);
  
  useEffect(() => {
    if (value > maxvalue) {
      toast.error("Ліміт дзвінків вичерпано.", {
        position: "top-center",
        duration: 5000,
        style: {
          fontSize: "20px",
          background: "var(--bg-input)",
          color: "var(--white)",
        },
      });
      // toastShown.current = true; // Устанавливаем флаг после первого вызова
    }
  }, [value, maxvalue]);
   
  
    return (
      <div className={css.wrapper}>
        <p className={css.title}>
          {" "}
          Контакти: <span className={css.titlespan}> {value} </span>з {maxvalue}{" "}
        </p>

        <LinearProgress
          variant="determinate"
          value={valueLinear}
          sx={{
            height: 12,
            borderRadius: 5,
            backgroundColor: "var(--main-gray)", // Цвет неактивной части
            "& .MuiLinearProgress-bar": {
              backgroundColor: "var(--play-btn-triangle)", // Цвет активной части
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
};
