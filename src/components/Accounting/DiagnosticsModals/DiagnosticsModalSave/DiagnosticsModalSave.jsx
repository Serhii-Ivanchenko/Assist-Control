import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import DiagnosticsInfo from "../DiagnosticsModal/DiagnosticsInfo/DiagnosticsInfo";
import css from "./DiagnosticsModalSave.module.css";
import car from "../../../../assets/images/car.png";
import { RxCross1 } from "react-icons/rx";
import ToggleListItem from "../DiagnosticsModal/ToggleListItem/ToggleListItem";
import SavedInfoTable from "./SavedInfoTable/SavedInfoTable";
import { TiTick } from "react-icons/ti";

export default function DiagnosticsModalSave({
  // onClose,
  togglePoints,
  setOpenModalSave,
  openModalSave,
  chosenPoints,
  chosenSpares,
}) {
  return (
    <div className={css.modalWrapper}>
      <RxCross1
        className={css.cross}
        onClick={() => setOpenModalSave(!openModalSave)}
      />
      <p className={css.modalTitle}>Діагностика № 1</p>
      <div className={css.modalTopPart}>
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
        <DiagnosticsInfo time="23" />
      </div>

      <div className={css.modalBottomPart}>
        <div className={css.togglesPart}>
          <ul className={css.togglesList}>
            {togglePoints.map((point, index) => (
              <ToggleListItem
                point={point}
                key={index}
                disabled={true}
                // checked={checked}
                // setChosenPoints={setChosenPoints}
                chosenPoints={chosenPoints}
                // handleCheckboxChange={handleCheckboxChange}
                modalSave={true}
              />
            ))}
          </ul>
        </div>
        <div>
          <SavedInfoTable chosenSpares={chosenSpares} />

          <div className={css.btnBox}>
            <button
              type="button"
              className={`${css.btn} ${css.cancel}`}
              onClick={() => setOpenModalSave(!openModalSave)}
            >
              Скасувати
            </button>
            <button
              type="button"
              className={`${css.btn} ${css.save}`}
              // onClick={() => {
              //   // setOpenModalSave(true);
              //   // setIsReadOnly(true);
              // }}
            >
              <TiTick className={css.tickIcon} />
              Зберегти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
