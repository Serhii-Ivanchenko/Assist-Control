import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import DiagnosticsInfo from "../DiagnosticsModal/DiagnosticsInfo/DiagnosticsInfo";
import css from "./DiagnosticsModalSave.module.css";
import car from "../../../../assets/images/car.png";
import { RxCross1 } from "react-icons/rx";
import ToggleListItem from "../DiagnosticsModal/ToggleListItem/ToggleListItem";
import SavedInfoTable from "./SavedInfoTable/SavedInfoTable";
import { TiTick } from "react-icons/ti";
import Loader from "../../../Loader/Loader";

export default function DiagnosticsModalSave({
  // onClose,
  togglePoints,
  setOpenModalSave,
  openModalSave,
  chosenPoints,
  chosenSpares,
  diagnosticsData,
  onClose,
  diagId,
  loading,
}) {
  // const diagId = diagnosticsData.diagnostic_id;
  const client = diagnosticsData?.client;
  const date = new Date(diagnosticsData?.created_at).toLocaleDateString(
    "uk-UA"
  );
  const parts = diagnosticsData?.parts;

  const handleClose = () => {
    if (diagId) {
      console.log("diagId", diagId);

      onClose();
    } else {
      setOpenModalSave(!openModalSave);
    }
  };

  // const spares = diagId ? parts : chosenSpares;

  return (
    <div className={css.modalWrapper}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RxCross1 className={css.cross} onClick={handleClose} />
          <p className={css.modalTitle}>Діагностика № 1</p>
          <div className={css.modalTopPart}>
            <CarInfo
              clientName={client?.name || "дані відсутні"}
              clientPhone={client?.phone || "дані відсутні"}
              carImg={diagnosticsData?.photo_url || car}
              carNumber={diagnosticsData?.plate || "дані відсутні"}
              carMake={diagnosticsData?.make || "дані відсутні"}
              carModel={diagnosticsData?.model || "дані відсутні"}
              carYear={diagnosticsData?.year || "дані відсутні"}
              vin={diagnosticsData?.vin || "дані відсутні"}
              mileage={diagnosticsData?.mileage || "- - - -"}
            />
            <DiagnosticsInfo
              time="23"
              mechName={diagnosticsData?.mechanic?.name || "дані відсутні"}
              managerName=" - - - - "
              createdAt={date || "дані відсутні"}
            />
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
              <SavedInfoTable
                chosenSpares={chosenSpares}
                parts={parts}
                diagId={diagId}
              />

              <div className={css.btnBox}>
                {!diagId && (
                  <button
                    type="button"
                    className={`${css.btn} ${css.cancel}`}
                    onClick={() => setOpenModalSave(!openModalSave)}
                  >
                    Скасувати
                  </button>
                )}
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
        </>
      )}
    </div>
  );
}
