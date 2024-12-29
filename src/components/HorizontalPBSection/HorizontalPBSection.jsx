import css from './HorizontalPBSection.module.css'
// import LinearProgress from '@mui/material/LinearProgress';
import toast from "react-hot-toast";
import { useEffect } from "react";
import HorizontalProgressBar from '../sharedComponents/HorizontalProgressBar/HorizontalProgressBar.jsx'

const minvalue = 0;
const maxvalue = 2500;
const valuefirst = 250;
const valuesecond = 2400; 
const titlefirst = "розмов";
const titlesecond = "AI";
const activecolor = "var(--play-btn-triangle)";
const lineHeight = 12;
const borderradius = 5;

export default function HorizontalPBSection() {
  // const valueLinear = ((value - minvalue) * 100) / (maxvalue - minvalue);
 
  // const toastShown = useRef(false);
  
  useEffect(() => {
    if (valuefirst > maxvalue || valuesecond > maxvalue) {
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
  }, [valuefirst,valuesecond, maxvalue]);
   
  
  return (
    <div className={css.wrapper}>
      <div className={css.horizontalBox}>
        <HorizontalProgressBar value={valuefirst} minvalue={minvalue} maxvalue={maxvalue}
          title={titlefirst} activecolor={activecolor} lineHeight={lineHeight}
          borderradius={borderradius} />
        <button
          className={css.btnadd}
          type="button" > Додати</button>
      </div>
      
      <div className={css.horizontalBox}>
        <HorizontalProgressBar value={valuesecond} minvalue={minvalue} maxvalue={maxvalue}
          title={titlesecond} activecolor={activecolor} lineHeight={lineHeight}
          borderradius={borderradius} />
        <button
          className={css.btnadd}
          type="button" > Додати</button>
      </div>

      
    </div>

  );


};
