import styles from "./ArchiveList.module.css";
import ArchiveCarItem from "../ArchiveCarItem/ArchiveCarItem";

export default function ArchiveList({ carsDataArchive }) {

  return (
    <div className={styles.listContainer}>
      <div className={styles.scrollWrapper}>
        <ul className={styles.archiveList}>
          {carsDataArchive?.length > 0 ? (
            carsDataArchive.map((item) => (
              <li key={`${item.car_id}-${item.plate}-${item.date}`}>
                <ArchiveCarItem data={item} />
              </li>
            ))
          ) : (
            <p className={styles.message}>В архіві відсутні дані</p>
          )}
        </ul>
      </div>
    </div>
  );
}
