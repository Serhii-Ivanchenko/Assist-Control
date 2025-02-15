import css from "./ToggleListItem.module.css";

export default function ToggleListItem({
  point,
  handleCheckboxChange,
  disabled,
  chosenPoints,
}) {
  return (
    <li className={css.listItem}>
      <p className={css.label}>{point.label}</p>
      <label className={css.toggleSwitch}>
        <input
          type="checkbox"
          checked={chosenPoints.some((p) => p.id === point.id)}
          onChange={(e) => handleCheckboxChange(e, point.id, point.label)}
          disabled={disabled}
        />
        <span className={css.slider}></span>
      </label>
    </li>
  );
}
