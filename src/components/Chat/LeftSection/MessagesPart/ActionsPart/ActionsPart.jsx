import css from "./ActionsPart.module.css";
import { BsCheck } from "react-icons/bs";
import { BsArrowDownUp } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { BsTag } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

import { BsClock } from "react-icons/bs";
import { BsCheck2Square } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import { useRef } from "react";
import { tags } from "../../../RightSection/ChatTags/tags.js";
import { useEffect, useState } from "react";
import SearchTags from "../../../RightSection/ChatTags/SearchTags/SearchTags";

const quickActions = [
  { icon: <BsArchive />, name: "Додати в архів", value: "archive" },
  { icon: <BsBookmark />, name: "Додати в обрані", value: "isChosen" },
  { icon: <GrUserManager />, name: "Передати іншому менеджеру", value: "" },
  { icon: <BsCheck2Square />, name: "Закрити чат", value: "isClosed" },
  { icon: <BsClock />, name: "Додати у відкладені", value: "isDelayed" },
];

export default function ActionsPart({
  isChecked,
  handleChecked,
  allChecked,
  handleAllChecked,
  // chats,
  handleSort,
  sortOrder,
  handleQuickActions,
}) {
  const [openedActions, setOpenedActions] = useState(false);
  const [tagsArr, setTagsArr] = useState(tags);
  const [tagsModalIsOpen, setTagsModalIsOpen] = useState(false);

  const wrapperRef = useRef([]);

  const handleClickOutside = (event) => {
    const isOutside = wrapperRef.current.every(
      (ref) => ref && !ref.contains(event.target)
    );

    if (isOutside) {
      console.log("Клік поза всіма елементами");
      setOpenedActions(false);
      setTagsModalIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openTagsModal = (e) => {
    e.stopPropagation();
    setTagsModalIsOpen((prev) => !prev);
    setOpenedActions(false);
  };

  const handleTagsModalClose = (e) => {
    e.stopPropagation();
    setTagsModalIsOpen(false);
  };

  return (
    <div className={css.actions}>
      {isChecked && (
        <label className={css.newLabel}>
          <input
            type="checkbox"
            name="chooseAll"
            id="chooseAll"
            className={css.checkbox}
            checked={
              allChecked.length > 0 && allChecked.every((item) => item.checked)
            }
            onChange={handleAllChecked}
          />
          <span className={css.cbMark}>
            <BsCheck size={16} className={css.cbIcon} />
          </span>
        </label>
      )}
      <label className={css.label}>
        <input
          type="checkbox"
          name="actions"
          id="actions"
          className={css.checkbox}
          checked={isChecked}
          onChange={handleChecked}
        />
        <span className={`${css.cbMark} ${isChecked && css.cbMarkIsChecked}`}>
          <BsCheck size={16} className={css.cbIcon} />
        </span>
      </label>

      {!isChecked ? (
        <p className={css.text}> Дії</p>
      ) : (
        <div className={css.actionsChecked}>
          <div ref={(el) => (wrapperRef.current[0] = el)}>
            <div className={css.select} onClick={openTagsModal}>
              <BsTag size={16} className={css.icon} />
              <p className={css.actionsText}>Тег</p>
              <BsFillCaretDownFill
                size={16}
                className={`${css.icon} ${tagsModalIsOpen && css.rotated}`}
              />
            </div>

            {tagsModalIsOpen && (
              <SearchTags
                onClose={handleTagsModalClose}
                tagsArray={tagsArr}
                setTagsArr={setTagsArr}
                leftSectionTag={true}
              />
            )}
          </div>
          <div
            className={css.quickActionsBox}
            ref={(el) => (wrapperRef.current[1] = el)}
          >
            <div
              className={css.select}
              onClick={() => {
                setOpenedActions(!openedActions);
                setTagsModalIsOpen(false);
              }}
            >
              <BsThreeDots size={16} className={css.icon} />
              <p className={css.actionsText}>Швидкі дії</p>
              <BsFillCaretDownFill
                size={16}
                className={`${css.icon} ${openedActions && css.rotated}`}
              />
            </div>
            {openedActions && (
              <ul className={css.actionsList}>
                {quickActions.map((action, index) => (
                  <li
                    key={index}
                    className={css.actionsItem}
                    onClick={() => {
                      handleQuickActions(action.value);
                      setOpenedActions(false);
                    }}
                  >
                    {action.icon}
                    <p>{action.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className={css.filter}>
        <BsArrowDownUp size={18} className={css.icon} onClick={handleSort} />
        <p className={css.text}>Нові</p>
        {sortOrder === "newFirst" ? (
          <IoIosArrowUp size={20} style={{ fill: "var(--light-gray)" }} />
        ) : (
          <IoIosArrowDown size={20} style={{ fill: "var(--light-gray)" }} />
        )}
      </div>
    </div>
  );
}
