import { useEffect, useRef, useState } from "react";
import AddAutoServiceModal from "../AddAutoServiceModal/AddAutoServiceModal";
import ToggleSwitch from "../AddAutoServiceModal/ToggleSwitch/ToggleSwitch";
import css from "./AddNewClientModal.module.css";
import AddNewClientPerson from "./AddNewClientPerson/AddNewClientPerson";

export default function AddNewClientModal({ onClose }) {
  const [isPerson, setIsPerson] = useState(false);
  const [height, setHeight] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isPerson]);

  return (
    <div
      className={css.modal}
      style={{ height: `${height}px`, transition: "height 0.5s ease" }}
    >
      <div className={css.switchWrapper}>
        <p className={css.text}>Юридична особа</p>
        <ToggleSwitch setIsPerson={setIsPerson} />
        <p className={css.text}>Фізична особа</p>
      </div>
      <div ref={contentRef}>
        {isPerson ? (
          <AddNewClientPerson onClose={onClose} />
        ) : (
          <AddAutoServiceModal onClose={onClose} createClient={true} />
        )}
      </div>
    </div>
  );
}
