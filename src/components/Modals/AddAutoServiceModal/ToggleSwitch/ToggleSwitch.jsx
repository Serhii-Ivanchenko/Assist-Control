import { useEffect, useState } from "react";
import css from "./ToggleSwitch.module.css";

export default function ToggleSwitch({ setIsPerson }) {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    setIsPerson(isOn);
  }, [isOn]);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <label className={css.toggleSwitch}>
      <input type="checkbox" checked={isOn} onChange={toggleSwitch} />
      <span className={css.slider} />
    </label>
  );
}
