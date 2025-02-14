import css from "./ToggleListItem.module.css";

export default function ToggleListItem({
  point,
  handleCheckboxChange,
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
          // checked={point.checked}
          onChange={(e) => handleCheckboxChange(e, point.id, point.label)}
        />
        <span className={css.slider}></span>
      </label>
    </li>
  );
}
