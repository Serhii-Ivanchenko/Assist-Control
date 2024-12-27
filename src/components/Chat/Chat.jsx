import css from "./Chat.module.css";
import clsx from "clsx";
import { BsChevronRight } from "react-icons/bs";
import RightSection from "./RightSection/RightSection.jsx";
import MiddleSection from "./MiddleSection/MiddleSection.jsx";
import LeftSection from "./LeftSection/LeftSection.jsx";

export default function Chat({ onClose, chatIsOpen }) {
  return (
    <div
      className={clsx(css.chatWrapper, chatIsOpen ? css.isOpen : css.isClosed)}
    >
      <BsChevronRight className={css.closeIcon} onClick={onClose} />
      <LeftSection/>
      <MiddleSection />
      <RightSection />
    </div>
  );
}
