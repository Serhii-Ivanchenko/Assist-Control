import { useRef, useState } from 'react';
import styles from './UserBar.module.css';
import { FiSettings } from "react-icons/fi";

export default function UserBar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef(null);

    const togglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const closePopover = () => {
      setIsPopoverOpen(false);
    };
  return (
    <div className={styles.userBarContainer}>
      <button className={styles.btn}><FiSettings className={styles.iconSettings} /></button>
      {/* <button className={styles.btn}><FiLogOut  /></button> */}
    </div>
  );
}
