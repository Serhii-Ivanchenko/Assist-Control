import DiagnosticsModalSave from "./DiagnosticsModalSave/DiagnosticsModalSave";
import DiagnosticsModal from "./DiagnosticsModal/DiagnosticsModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getDiagnostic,
  getNodesAndParts,
} from "../../../redux/accounting/operations";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectDiagLoading,
  selectDiagnostic,
} from "../../../redux/accounting/selectors";

// const togglePoints = [
//   { label: "Двигун", checked: false, id: "1" },
//   { label: "Приводні ремені", checked: false, id: "2" },
//   { label: "Тех рідини", checked: false, id: "3" },
//   { label: "Рульове", checked: false, id: "4" },
//   { label: "Ходова", checked: false, id: "5" },
//   { label: "Гальма", checked: false, id: "6" },
//   { label: "Вихлопна", checked: false, id: "7" },
// ];

export default function DiagnosticsModals({ onClose, isRepairModal, diagId }) {
  const [openModalSave, setOpenModalSave] = useState(false);
  const [chosenPoints, setChosenPoints] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [chosenSpares, setChosenSpares] = useState([]);
  const [spares, setSpares] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNodesAndParts()).unwrap();
    // dispatch(getDiagnostic());
  }, []);

  const togglePoints = useSelector(selectCategories);
  const diagnosticsData = useSelector(selectDiagnostic);
  console.log("diagnosticsData", diagnosticsData);
  const loading = useSelector(selectDiagLoading);

  // const diagId = null;
  // const diagId = diagnosticsData.diagnostic_id;
  // console.log("diagId", diagId);

  useEffect(() => {
    console.log("spares", spares);
  });

  return (
    <>
      {openModalSave || isRepairModal || diagId ? (
        <DiagnosticsModalSave
          onClose={onClose}
          togglePoints={togglePoints}
          setOpenModalSave={setOpenModalSave}
          openModalSave={openModalSave}
          chosenPoints={chosenPoints}
          chosenSpares={chosenSpares}
          isRepairModal={isRepairModal}
          diagnosticsData={diagnosticsData}
          diagId={diagId}
          loading={loading}
        />
      ) : (
        <DiagnosticsModal
          onClose={onClose}
          setOpenModalSave={setOpenModalSave}
          togglePoints={togglePoints}
          setChosenPoints={setChosenPoints}
          chosenPoints={chosenPoints}
          setIsReadOnly={setIsReadOnly}
          isReadOnly={isReadOnly}
          setChosenSpares={setChosenSpares}
          chosenSpares={chosenSpares}
          spares={spares}
          setSpares={setSpares}
          diagnosticsData={diagnosticsData}
          loading={loading}
        />
      )}
    </>
  );
}
