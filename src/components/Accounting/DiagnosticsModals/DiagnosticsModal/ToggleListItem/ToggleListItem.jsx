import css from "./ToggleListItem.module.css";

export default function ToggleListItem({
  point,
  handleCheckboxChange,
  disabled,
  chosenPoints,
}) {
  return (
    <li className={css.listItem}>
      <p className={css.label}>{point.name}</p>
      <label className={css.toggleSwitch}>
        <input
          type="checkbox"
          checked={chosenPoints.some((p) => p.id === point.category_id)}
          onChange={(e) =>
            handleCheckboxChange(e, point.category_id, point.name)
          }
          disabled={disabled}
        />
        <span className={css.slider}></span>
      </label>
    </li>
  );
}
