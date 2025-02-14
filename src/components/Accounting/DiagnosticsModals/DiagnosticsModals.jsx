import DiagnosticsModalSave from "./DiagnosticsModalSave/DiagnosticsModalSave";
import DiagnosticsModal from "./DiagnosticsModal/DiagnosticsModal";
import { useState } from "react";

const togglePoints = [
  { label: "Двигун", checked: false, id: "1" },
  { label: "Приводні ремені", checked: false, id: "2" },
  { label: "Тех рідини", checked: false, id: "3" },
  { label: "Рульове", checked: false, id: "4" },
  { label: "Ходова", checked: false, id: "5" },
  { label: "Гальма", checked: false, id: "6" },
  { label: "Вихлопна", checked: false, id: "7" },
];

export default function DiagnosticsModals({ onClose }) {
  const [openModalSave, setOpenModalSave] = useState(false);
  const [chosenPoints, setChosenPoints] = useState([]);
  // const [isReadOnly, setIsReadOnly] = useState(false);

  return (
    <>
      {openModalSave ? (
        <DiagnosticsModalSave
          onClose={onClose}
          togglePoints={togglePoints}
          //   chosenPoints={chosenPoints}
        />
      ) : (
        <DiagnosticsModal
          onClose={onClose}
          setOpenModalSave={setOpenModalSave}
          togglePoints={togglePoints}
          setChosenPoints={setChosenPoints}
          chosenPoints={chosenPoints}
        />
      )}
    </>
  );
}
