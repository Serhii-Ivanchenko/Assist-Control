// import { useState } from "react";
import ChannelsPart from "./ChannelsPart/ChannelsPart";
import EmailType from "./EmailType/EmailType";
import css from "./InboxPart.module.css";
import { IoIosArrowDown } from "react-icons/io";

export default function InboxPart({ handleFilter }) {
  // const [isActive, setIsActive] = useState(false)

  // const handleClick = () => {
  //   setIsActive(true);
  // }

  return (
    <div className={css.inboxContainer}>
      <p className={css.title}>Inbox </p>

      <div className={css.emailSelect}>
        <p className={css.email}>lisa@avtoatmosfera.com</p>
        <IoIosArrowDown className={css.iconArrow} size={20} />
      </div>

      <div className={css.totalContainer}>
        <div className={css.totalInbox}>
          <p className={`${css.numberBox} ${css.numberBoxIsActive}`}>11</p>
          <button type="button" className={`${css.text} ${css.textIsActive}`}>
            Клієнти
          </button>
        </div>

        <div className={css.totalInbox}>
          {/* <span className={css.numberBox}> */}
          <p className={css.numberBox}>1</p>
          {/* </span> */}
          <button type="button" className={css.text}>
            Колеги
          </button>
        </div>
      </div>

      <EmailType />
      <ChannelsPart handleFilter={handleFilter} />
    </div>
  );
}
