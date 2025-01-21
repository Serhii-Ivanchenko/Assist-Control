import { useState } from "react";
import AddAutoServiceModal from "../AddAutoServiceModal/AddAutoServiceModal";
import ToggleSwitch from "../AddAutoServiceModal/ToggleSwitch/ToggleSwitch";
import css from "./AddNewClientModal.module.css";
import AddNewClientPerson from "./AddNewClientPerson/AddNewClientPerson";


export default function AddNewClientModal({ onClose }) {
  const [isPerson, setIsPerson] = useState(false);

  return (
    <div className={css.modal}>
      <div className={css.switchWrapper}>
        <p className={css.text}>Юридична особа</p>
        <ToggleSwitch setIsPerson={setIsPerson} />
        <p className={css.text}>Фізічна особа</p>
      </div>
      {isPerson ? (
        <AddNewClientPerson onClose={onClose} />
      ) : (
        <AddAutoServiceModal
          onClose={onClose}
          createClient={true}
          infoToEdit={true}
        />
      )}
    </div>
  );
}
