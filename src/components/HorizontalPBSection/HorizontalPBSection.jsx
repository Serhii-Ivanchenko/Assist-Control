import css from './HorizontalPBSection.module.css'
import LinearProgress from '@mui/material/LinearProgress';

const minvalue = 0;
const maxvalue = 2500;
const value = 198; 
export default function HorizontalPBSection() {
    const valueLinear =  ((value - minvalue) * 100) / (maxvalue - minvalue);

    return <div className={css.wrapper}>
    
      <p className={css.title}> Контакти: <span className={css.titlespan}> {value} </span>
        з {maxvalue} </p>

      <LinearProgress variant="determinate" value={valueLinear}
      sx={{
          height: 12, 
          borderRadius: 5, 
          backgroundColor: "var(--main-gray)", // Цвет неактивной части
          '& .MuiLinearProgress-bar': {
            backgroundColor: "var(--play-btn-triangle)", // Цвет активной части
          },
        }}
      />

    <p className={css.tarplan}>Тариф “Телефонія 2500” буде продовжений 26 квітня 2025 р.</p>

    </div>;
};
