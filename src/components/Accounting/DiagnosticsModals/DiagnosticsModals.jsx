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
import { selectUser } from "../../../redux/auth/selectors";

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
    diagId && dispatch(getDiagnostic(diagId));
  }, []);

  const togglePoints = useSelector(selectCategories);
  const diagnosticsData = useSelector(selectDiagnostic);
  const user = useSelector(selectUser);
  console.log("diagnosticsData", diagnosticsData);
  const loading = useSelector(selectDiagLoading);

  const nodes = spares
    .map((spare) => {
      const chosenParts = spare.parts.filter(
        (part) =>
          part.isChosen === true ||
          part.isChosenRight === true ||
          part.isChosenLeft === true
      );

      return chosenParts.length > 0
        ? {
            node_name: spare.name,
            parts: chosenParts.map((part) => ({
              part_name: part.name,
              comment: "Заміна",
              audio_file: "",
              photo_file: "",
            })),
          }
        : null;
    })
    .filter((category) => category !== null);
  console.log("dataToSend", nodes);

  const dataToSend = {
    car_id: 99444,
    mechanic_id: 168,
    nodes: nodes,
  };

  console.log("dataToSend", dataToSend);

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
          diagnosticsData={diagnosticsData}
          diagId={diagId}
          loading={loading}
          managerName={user.name}
          dataToSend={dataToSend}
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
          managerName={user.name}
        />
      )}
    </>
  );
}
