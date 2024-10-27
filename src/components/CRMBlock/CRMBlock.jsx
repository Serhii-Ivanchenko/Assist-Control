import { useState } from 'react';
import DayCarsList from '../DayCarsList/DayCarsList';
import css from './CRMBlock.module.css';
import clsx from 'clsx';

// Пробний масив автомобілів
const sampleCarsData = [
    { id: 1, plate: 'ABC1234', auto: 'Toyota Camry', status: 'new', complete_d: null, date_s: new Date().toISOString(), vin: 'VIN1', mileage: '15000', photo_url: null, client: { name: 'Іван', phone: '123-456-789' } },
    { id: 2, plate: 'DEF5678', auto: 'Honda Accord', status: 'repair', complete_d: null, date_s: new Date().toISOString(), vin: 'VIN2', mileage: '30000', photo_url: null, client: { name: 'Марія', phone: '987-654-321' } },
    { id: 3, plate: 'GHI9101', auto: 'BMW X5', status: 'check_repair', complete_d: null, date_s: new Date().toISOString(), vin: 'VIN3', mileage: '20000', photo_url: null, client: { name: 'Петро', phone: '555-666-777' } },
    { id: 4, plate: 'JKL2345', auto: 'Ford Mustang', status: 'complete', complete_d: new Date().toISOString(), date_s: new Date().toISOString(), vin: 'VIN4', mileage: '10000', photo_url: null, client: { name: 'Олена', phone: '333-444-555' } },
    { id: 5, plate: 'MNO6789', auto: 'Chevrolet Malibu', status: 'new', complete_d: null, date_s: new Date().toISOString(), vin: 'VIN5', mileage: '5000', photo_url: null, client: { name: 'Дмитро', phone: '222-111-000' } },
];

const statusMapping = {
    new: 'Нова',
    repair: 'Ремонт',
    check_repair: 'Діагностика',
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

const filterCarsByStatus = (carsData, status) => {
    return carsData.filter(car => car.status === status);
};

export default function CRMBlock() {
    const [carsData] = useState(sampleCarsData);

    return (
        <div className={css.container}>
            <div className={css.grid}>
                {Object.entries(statusMapping).map(([status, label], index) => {
                    const filteredCars = filterCarsByStatus(carsData, status);
                    const carCount = filteredCars.length;

                    return (
                        <div key={status} className={css.column}>
                            <h3 
                                className={clsx(css.statusHeader, { [css.firstStatus]: index === 0 })} 
                            >
                                {getSvgIcon(index)}
                                {label}
                                <span className={css.carCount}> {carCount}</span>
                            </h3>
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
