import styles from "./ArchiveList.module.css";
import ArchiveCarItem from "../ArchiveCarItem/ArchiveCarItem";

export default function ArchiveList({ carsDataArchive }) {

  console.log(JSON.stringify(carsDataArchive, null, 2));
  

  return (
    <div className={styles.listContainer}>
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
  );
}
