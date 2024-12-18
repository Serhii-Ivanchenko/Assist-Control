import { useState } from 'react';
import { BsSortUp, BsSortDownAlt } from "react-icons/bs";
import styles from './TimeSortItem.module.css';

export default function TimeSortItem({ onSortChange }) {
  const [isDescending, setIsDescending] = useState(true);
  
  const toggleSortOrder = () => {
    setIsDescending(!isDescending);
    onSortChange(!isDescending);
  };

  return (
    <div>
      <button className={styles.filter} onClick={toggleSortOrder}>
        {isDescending ? <BsSortUp size={18} /> : <BsSortDownAlt size={18} />}
      </button>
    </div>
  );
}
