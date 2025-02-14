import css from "./ToggleListItem.module.css";

export default function ToggleListItem({
  point,
  handleCheckboxChange,
  checked,
  // setChosenPoints,
  // chosenPoints,
}) {
  // const handleCheckboxChange = (event) => {
  //   const isChecked = event.target.value;
  //   setChosenPoints()
  // };

  return (
    <li className={css.listItem}>
      <p className={css.label}>{point.label}</p>
      <label className={css.toggleSwitch}>
        <input
          type="checkbox"
          checked={() => checked(point.id)}
          onChange={(e) => handleCheckboxChange(e, point.id, point.label)}
        />
        <span className={css.slider}></span>
      </label>
    </li>
  );
}
