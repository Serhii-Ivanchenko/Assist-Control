import CarInfo from "../../sharedComponents/CarInfo/CarInfo";
import css from "./DiagnosticsModal.module.css";
import car from "../../../assets/images/car.png";
import DiagnosticsInfo from "./DiagnosticsInfo/DiagnosticsInfo";
import ToggleListItem from "./ToggleListItem/ToggleListItem";
import { useEffect, useState } from "react";
import ChosenPointCategoriesListItem from "./ChosenPointCategoriesListItem/ChosenPointCategoriesListItem";
import DetailsPart from "./DetailsPart/DetailsPart";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { getNodesAndParts } from "../../../redux/accounting/operations.js";

const togglePoints = [
  { label: "Двигун", checked: false, id: "1" },
  { label: "Приводні ремені", checked: false, id: "2" },
  { label: "Тех рідини", checked: false, id: "3" },
  { label: "Рульове", checked: false, id: "4" },
  { label: "Ходова", checked: false, id: "5" },
  { label: "Гальма", checked: false, id: "6" },
  { label: "Вихлопна", checked: false, id: "7" },
];

export default function DiagnosticsModal({ onClose }) {
  const [chosenPoints, setChosenPoints] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [categoryForDetailsPart, setCategoryForDetailsPart] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNodesAndParts());
  }, []);

  useEffect(() => {
    console.log("chosenPoints", chosenPoints);
    console.log("categoryForDetailsPart", categoryForDetailsPart);
  }, [chosenPoints, categoryForDetailsPart]);

  useEffect(() => {
    if (chosenPoints.length === 0) {
      setCategoryForDetailsPart("");
      setOpenDetails(false);
    }
  }, [chosenPoints]);

  const handleCheckboxChange = (event, id, label) => {
    setChosenPoints((prevPoints) => {
      if (event.target.checked) {
        // Додаємо новий об'єкт у масив
        return [...prevPoints, { id, label }];
      } else {
        // Видаляємо об'єкт із масиву, якщо чекбокс знято
        return prevPoints.filter((point) => point.id !== id);
      }
    });
  };

  return (
    <div className={css.modalWrapper}>
      <RxCross1 className={css.cross} onClick={onClose} />
      <p className={css.modalTitle}>Діагностика № 1</p>
      <div className={css.modalTopPart}>
        <div>
          <CarInfo
            clientName="Іван Петренко"
            clientPhone="+38 073 329 12 17"
            carImg={car}
            carNumber="CA 6864 CO"
            carMake="HONDA"
            carModel="CIVIC"
            carYear="2001"
            vin="VW8795218794H46J"
            mileage="284563"
          />
        </div>

        <DiagnosticsInfo />
      </div>

      <div className={css.modalBottomPart}>
        <div className={css.togglesPart}>
          <ul className={css.togglesList}>
            {togglePoints.map((point, index) => (
              <ToggleListItem
                point={point}
                key={index}
                // setChosenPoints={setChosenPoints}
                // chosenPoints={chosenPoints}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </ul>
        </div>
        <div className={css.categoriesPart}>
          <ul className={css.categoriesList}>
            {chosenPoints.map((point) => (
              <ChosenPointCategoriesListItem
                key={point.id}
                point={point}
                setOpenDetails={setOpenDetails}
                openDetails={openDetails}
                setCategoryForDetailsPart={setCategoryForDetailsPart}
                chosenPoints={chosenPoints}
              />
            ))}
          </ul>
        </div>
        <div className={css.detailsPart}>
          {openDetails && <DetailsPart title={categoryForDetailsPart} />}
        </div>
      </div>
      <div className={css.btnBox}>
        <button type="button" className={`${css.btn} ${css.cancel}`}>
          Скасувати
        </button>
        <button type="button" className={`${css.btn} ${css.save}`}>
          <TiTick className={css.tickIcon} />
          Зберегти
        </button>
      </div>
    </div>
  );
}
