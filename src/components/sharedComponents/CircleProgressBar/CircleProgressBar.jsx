import css from "./CircleProgressBar.module.css";
import CircularProgress from '@mui/material/CircularProgress';

export default function CircleProgressBar({value, maxvalue, activecolor, noactivecolor, label, title}) {
    const percent = maxvalue > 0 ? (value / maxvalue) * 100 : 1;
    const percentage = maxvalue > 0 ? ((value / maxvalue) * 100 ).toFixed(1): 0;
   
    return <div className={css.wrapper}> 
    
         <p className={css.title}> {title}  </p>
        
        <p className={css.titlenum}> {value}  </p> 

        <div style={{
        position: "relative",
        display: "inline-block",
        width: "126px",
        height: "126px",
      }}>

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
            
        <CircularProgress variant="determinate" 
             value={percent} 
                size="126px"
                thickness={3}
      sx={{
          position: "absolute",
            top: 0,
            left: 0,
          color: activecolor, // Цвет активной части
          '& .MuiCircularProgress-circle': {
            strokeLinecap: "round", // Закругляем концы линии
          },
        }}
      />

            <div className={css.label}
          style={{ color: activecolor, }}
        >
          {label !== undefined ? label : `${percentage}%`}
        </div>

    </div>
    </div>;
};
