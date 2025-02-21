// import CarInfo from "../../sharedComponents/CarInfo/CarInfo";
import css from "./DiagnosticsModal.module.css";
import car from "../../../../assets/images/car.png";
import DiagnosticsInfo from "./DiagnosticsInfo/DiagnosticsInfo";
import ToggleListItem from "./ToggleListItem/ToggleListItem";
import { useEffect, useState } from "react";
import ChosenPointCategoriesListItem from "./ChosenPointCategoriesListItem/ChosenPointCategoriesListItem";
import DetailsPart from "./DetailsPart/DetailsPart";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
// import { getNodesAndParts } from "../../../redux/accounting/operations.js";
import CarInfo from "../../../sharedComponents/CarInfo/CarInfo.jsx";
import { getNodesAndParts } from "../../../../redux/accounting/operations.js";
// import Loader from "../../../Loader/Loader.jsx";

export default function DiagnosticsModal({
  onClose,
  setOpenModalSave,
  togglePoints,
  chosenPoints,
  setChosenPoints,
  setIsReadOnly,
  setChosenSpares,
  chosenSpares,
  spares,
  setSpares,
  diagnosticsData,
  // loading,
}) {
  // const [chosenPoints, setChosenPoints] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  // const [isReadOnly, setIsReadOnly] = useState(false);
  const [categoryForDetailsPart, setCategoryForDetailsPart] = useState("");
  const dispatch = useDispatch();

  // const diagId = diagnosticsData.diagnostic_id;
  const client = diagnosticsData?.client;
  const date = new Date(diagnosticsData?.created_at).toLocaleDateString(
    "uk-UA"
  );

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

    if (chosenPoints.every((point) => point.label !== categoryForDetailsPart)) {
      setOpenDetails(false);
    }
  }, [chosenPoints, categoryForDetailsPart]);

  const handleCheckboxChange = (event, id, label) => {
    setChosenPoints((prevPoints) => {
      if (event.target.checked) {
        return [...prevPoints, { id, label }];
      } else {
        return prevPoints.filter((point) => point.id !== id);
      }
    });
  };

  return (
    <div className={css.modalWrapper}>
      {/* {loading ? (
        <Loader />
      ) : (
        <> */}
      <RxCross1 className={css.cross} onClick={onClose} />
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
          // time="23"
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
                // setChosenPoints={setChosenPoints}
                chosenPoints={chosenPoints}
                handleCheckboxChange={handleCheckboxChange}
                // isReadOnly={isReadOnly}
                disabled={false}
                // checked={checked}
              />
            ))}
          </ul>
        </div>
        {chosenPoints.length > 0 ? (
          <>
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
                    togglePoints={togglePoints}
                  />
                ))}
              </ul>
            </div>
            <div className={css.detailsPart}>
              {openDetails && (
                <DetailsPart
                  title={categoryForDetailsPart}
                  togglePoints={togglePoints}
                  setChosenSpares={setChosenSpares}
                  chosenSpares={chosenSpares}
                  spares={spares}
                  setSpares={setSpares}
                />
              )}
            </div>
          </>
        ) : (
          <p className={css.defaultMessage}>
            Для вибору запчастин оберіть категорію
          </p>
        )}
      </div>
      <div className={css.btnBox}>
        <button
          type="button"
          className={`${css.btn} ${css.cancel}`}
          onClick={onClose}
        >
          Скасувати
        </button>
        <button
          type="button"
          className={`${css.btn} ${css.save}`}
          onClick={() => {
            setOpenModalSave(true);
            setIsReadOnly(true);
          }}
        >
          <TiTick className={css.tickIcon} />
          Зберегти
        </button>
      </div>
      {/* </>
      )} */}
    </div>
  );
}
