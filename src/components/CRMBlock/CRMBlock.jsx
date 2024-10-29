import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DayCarsList from '../DayCarsList/DayCarsList';
import css from './CRMBlock.module.css';
import clsx from 'clsx';
import { selectDate, selectDayCars } from '../../redux/cars/selectors.js';
import { getCarsByDate } from '../../redux/cars/operations.js';
import toast from 'react-hot-toast';

const statusMapping = {
    new: 'Нова',
    repair: 'Ремонт',
    check_repair: 'Діагностика',
    complete: 'Завершено',
};

const getSvgIcon = (index) => {
    const svgData = [
        null,
        { fill: "#994CA5" },
        { fill: "var(--blue)" },
        { fill: "#246D4D" }
    ];

    if (!svgData[index]) return null;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="61" viewBox="0 0 12 61" fill="none" className={css.svgIcon}>
            <path d="M0 0.253906H3.02041L11.3265 30.5079L3.02041 60.7618H0L8.30612 30.5079L0 0.253906Z" fill={svgData[index].fill}/>
        </svg>
    );
};

const filterCarsByStatus = (carsData, status) => {
    return carsData.filter(car => car.status === status);
};

export default function CRMBlock() {
    const dispatch = useDispatch();
    const selectedDate = useSelector(selectDate);
    const carsData = useSelector(selectDayCars);

    useEffect(() => {
        if (selectedDate) {
            dispatch(getCarsByDate(selectedDate))
                .unwrap()
                .then(() => {})
                .catch(() => {
                    toast.error("Щось пішло не так. Будь ласка, спробуйте ще раз.");
                });
        }
    }, [dispatch, selectedDate]);

    return (
        <div className={css.container}>
            <div className={css.headersContainer}>
                {Object.entries(statusMapping).map(([status, label], index) => {
                    const filteredCars = filterCarsByStatus(carsData, status);
                    const carCount = filteredCars.length;

                    return (
                        <div key={status} className={css.headerColumn}>
                            <h3 
                                className={clsx(css.statusHeader, { [css.firstStatus]: index === 0 })} 
                            >
                                {getSvgIcon(index)}
                                {label}
                                <span className={css.carCount}>{carCount}</span> 
                            </h3>
                        </div>
                    );
                })}
            </div>

            <div className={css.columnsContainer}>
                {Object.entries(statusMapping).map(([status]) => {
                    const filteredCars = filterCarsByStatus(carsData, status);

                    return (
                        <div key={status} className={css.column}>
                            <div className={css.carListBlock}>
                                <DayCarsList 
                                    carsData={filteredCars} 
                                    isCRMBlock
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
