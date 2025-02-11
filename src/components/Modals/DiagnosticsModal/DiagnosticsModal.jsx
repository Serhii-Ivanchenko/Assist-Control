import CarInfo from "../../sharedComponents/CarInfo/CarInfo";
import css from "./DiagnosticsModal.module.css";
import car from "../../../assets/images/car.png";
export default function DiagnosticsModal() {
  return (
    <div className={css.modalWrapper}>
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
        <div></div>
      </div>

      <div className={css.modalBottomPart}>
        <div className={css.togglesPart}></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
