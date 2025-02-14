import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import DiagnosticsInfo from "../DiagnosticsModal/DiagnosticsInfo/DiagnosticsInfo";
import css from "./DiagnosticsModalSave.module.css";
import car from "../../../../assets/images/car.png";
import { RxCross1 } from "react-icons/rx";
import ToggleListItem from "../DiagnosticsModal/ToggleListItem/ToggleListItem";

export default function DiagnosticsModalSave({
  onClose,
  togglePoints,
  // chosenPoints,
}) {
  // const checked = (id) => {
  //   // chosenPoints.map((item) => (item.id === id ? true : false));
  //   chosenPoints.includes(id);
  // };

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
                // checked={checked}
                // setChosenPoints={setChosenPoints}
                // chosenPoints={chosenPoints}
                // handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
