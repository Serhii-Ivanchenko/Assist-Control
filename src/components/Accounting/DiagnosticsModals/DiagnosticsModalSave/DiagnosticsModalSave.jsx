import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import DiagnosticsInfo from "../DiagnosticsModal/DiagnosticsInfo/DiagnosticsInfo";
import css from "./DiagnosticsModalSave.module.css";
import car from "../../../../assets/images/car.png";
import { RxCross1 } from "react-icons/rx";
import ToggleListItem from "../DiagnosticsModal/ToggleListItem/ToggleListItem";
import SavedInfoTable from "./SavedInfoTable/SavedInfoTable";
import { TiTick } from "react-icons/ti";
import Loader from "../../../Loader/Loader";
import { useDispatch } from "react-redux";
import { createDiagnostic } from "../../../../redux/accounting/operations";
import { useState } from "react";
import toast from "react-hot-toast";

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
  managerName,
  dataToSend,
}) {
  const [isLoading, setIsLoading] = useState(false);

  // const diagId = diagnosticsData.diagnostic_id;
  const client = diagnosticsData?.client;
  const date = diagnosticsData.created_at
    ? new Date(diagnosticsData?.created_at).toLocaleDateString("uk-UA")
    : new Date().toLocaleDateString("uk-UA");
  const parts = diagnosticsData?.parts;

  const dispatch = useDispatch();

  const handleDispatchData = async () => {
    try {
      setIsLoading(true);
      await dispatch(createDiagnostic(dataToSend));
      toast.success("Всі запчастини успішно знайдені :)", {
        position: "top-center",
        duration: 3000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)",
        },
      });
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Щось пішло не так :(", {
        position: "top-center",
        duration: 3000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)",
        },
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

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
      {/* {loading ? (
        <Loader />
      ) : (
        <> */}
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
          // time=""
          mechName={diagnosticsData?.mechanic?.name || "дані відсутні"}
          managerName={managerName}
          createdAt={date}
        />
      </div>

      {isLoading ? (
        <div className={css.loadingMessage}>
          <p>Запит виконується... </p>
          <p>Ще трошки і все буде готово :) </p>
        </div>
      ) : (
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
              {diagId ? (
                <button
                  type="button"
                  className={`${css.btn} ${css.cancel}`}
                  onClick={onClose}
                >
                  Закрити
                </button>
              ) : (
                <>
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
                    onClick={handleDispatchData}
                    // onClick={() => {
                    //   // setOpenModalSave(true);
                    //   // setIsReadOnly(true);
                    // }}
                  >
                    <TiTick className={css.tickIcon} />
                    Зберегти
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* </>
      )} */}
    </div>
  );
}
