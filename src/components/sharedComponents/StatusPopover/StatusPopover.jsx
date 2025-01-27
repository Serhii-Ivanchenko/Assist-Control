import styles from "./StatusPopover.module.css"
export function StatusPopover({ statuses, onStatusSelect, renderStatus, isFilter, dropdownStyle = {} }) {
  return (
    <ul className={styles.dropdownList} style={dropdownStyle}>
      {statuses.map(({ status }) => (
        <li
          key={status}
          onClick={(e) => {
            e.stopPropagation();
            onStatusSelect(status);
          }}
        >
          <div className={styles.statusItemContainer}>
            {renderStatus(status, false, styles, isFilter)}
          </div>
        </li>
      ))}
    </ul>
  );
}