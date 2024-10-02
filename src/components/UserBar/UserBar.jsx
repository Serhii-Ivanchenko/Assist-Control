import { useRef, useState } from 'react';
import css from './UserBar.module.css';
import { FiUser } from "react-icons/fi";
import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';

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
    <div className={css.userBarContainer}>
      <button ref={buttonRef} className={css.btn} onClick={togglePopover}>
        <FiUser className={css.icon} />
      </button>
      <UserBarPopover
        isVisible={isPopoverOpen}
        onClose={closePopover}
        buttonRef={buttonRef}
      />
    </div>
  );
}
