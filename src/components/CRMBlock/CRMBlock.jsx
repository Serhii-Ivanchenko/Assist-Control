import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DayCarsListCrm from '../DayCarsListCrm/DayCarsListCrm';
import css from './CRMBlock.module.css';
import clsx from 'clsx';
import { selectDate } from '../../redux/cars/selectors.js';
import toast from 'react-hot-toast';
import { selectRecords } from '../../redux/crm/selectors.js';
import { getRecordsFromDate } from '../../redux/crm/operations.js';

const statusMapping = {
    new: 'Нова',
    diagnostic: 'Діагностика',
    repair: 'Ремонт',
    complete: 'Завершено',
};

const getSvgIcon = (index) => {
    const svgData = [
        null,
        { fill: "var(--blue)" },
        { fill: "#994CA5" },
        { fill: "#246D4D" }
    ];

    if (!svgData[index]) return null;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="61" viewBox="0 0 12 61" fill="none" className={css.svgIcon}>
            <path d="M0 0.253906H3.02041L11.3265 30.5079L3.02041 60.7618H0L8.30612 30.5079L0 0.253906Z" fill={svgData[index].fill}/>
        </svg>
    );
};

const filterRecordsByStatus = (records, status) => {
    return records.filter(record => record.status === status);
};

export default function CRMBlock() {
    const dispatch = useDispatch();
    const selectedDate = useSelector(selectDate);
    const records = useSelector(selectRecords);

    useEffect(() => {
        if (selectedDate) {
            dispatch(getRecordsFromDate(selectedDate))
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
                    const filteredRecords = filterRecordsByStatus(records, status);
                    const recordCount = filteredRecords.length;

                    return (
                        <div key={status} className={css.headerColumn}>
                            <h3 
                                className={clsx(css.statusHeader, { [css.firstStatus]: index === 0 })} 
                            >
                                {getSvgIcon(index)}
                                {label}
                                <span className={css.carCount}>{recordCount}</span> 
                            </h3>
                        </div>
                    );
                })}
            </div>

            <div className={css.columnsContainer}>
                {Object.entries(statusMapping).map(([status]) => {
                    const filteredRecords = filterRecordsByStatus(records, status);

                    return (
                        <div key={status} className={css.column}>
                            <DayCarsListCrm 
                                    records={filteredRecords}
                                />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
