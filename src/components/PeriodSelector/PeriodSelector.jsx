import { useState } from 'react';
import css from './PeriodSelector.module.css'
import DatePicker from 'react-datepicker';
import { FaCalendar } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
export default function PeriodSelector({ startDate, endDate, onDateBegChange, onDateEndChange }) {

    const [periodStartData, setPeriodStartData] = useState(startDate);
    const [periodEndData, setPeriodEndData] = useState(endDate);
    const [isOpenBeg, setIsOpenBeg] = useState(false);
    const [isOpenEnd, setIsOpenEnd] = useState(false);

    console.log(startDate);
    console.log(periodStartData);

  const handleInputChangeBeg = (e) => {
    // const value = e.target.value;
    setPeriodStartData(e);
    onDateBegChange(e);
  };

const handleInputChangeEnd = (e) => {
    // const value = e.target.value;
    setPeriodEndData(e);
    onDateEndChange(e);
    };
    

  const handleIconClickBeg = () => {
    setIsOpenBeg((prev) => !prev); // Переключение состояния открытия календаря
    };
  const handleIconClickEnd = () => {
    setIsOpenEnd((prev) => !prev); // Переключение состояния открытия календаря
  };
    
     return ( 

             <div className={css.containerperiodselector}>
             <p className={css.periodtitle}>З</p>

             <div className={css.datewrapper}>
<DatePicker className={css.periodinput}
        selected={periodStartData}
        onChange={(date) => handleInputChangeBeg(date)}
        dateFormat="dd/MM/yyyy"
        open={isOpenBeg} 
        onClickOutside={() => setIsOpenBeg(false)} 
     
//  placeholderText="Click to select a date" 
             />
             <FaCalendar 
                 className={css.icon} 
                 onClick={handleIconClickBeg} />
         </div>    
             <p className={css.periodtitle}>По</p>   

       <div className={css.datewrapper}>       
    <DatePicker className={css.periodinput}
        selected={periodEndData}
        onChange={(date) => handleInputChangeEnd(date)}
        dateFormat="dd/MM/yyyy"
        open={isOpenEnd} 
        onClickOutside={() => setIsOpenEnd(false)} 
//  placeholderText="Click to select a date" 
             />
             <FaCalendar  className={css.icon} 
             onClick={handleIconClickEnd}/>
             </div>
             </div>)

    
    
    // return (
    //     <div className={css.containerperiodselector}>
    //         <p className={css.periodtitle}>З</p>
    //         <input type="date" name="datebegin" className={css.periodInput}
    //             value={periodStartData}
    //             onChange={handleInputChangeBeg} />
    //         <p className={css.periodtitle}>По</p>
    //         <input type="date" name="dateend" className={css.periodInput}
    //             value={periodEndData}
    //             onChange={handleInputChangeEnd} />
    //     </div>

    // );


};