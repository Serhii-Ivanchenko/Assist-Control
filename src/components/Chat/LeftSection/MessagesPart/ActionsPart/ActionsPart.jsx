// import { useState } from "react";
import css from "./ActionsPart.module.css";
import { BsCheck } from "react-icons/bs";
import { BsArrowDownUp } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BsTag } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { tags } from "../../../RightSection/ChatTags/tags.js";
import { useState } from "react";
import SearchTags from "../../../RightSection/ChatTags/SearchTags/SearchTags";

export default function ActionsPart({
  isChecked,
  handleChecked,
  allChecked,
  handleAllChecked,
}) {
  const [tagsArr, setTagsArr] = useState(tags);
  const [tagsModalIsOpen, setTagsModalIsOpen] = useState(false);

  const openTagsModal = () => setTagsModalIsOpen(true);
  const handleTagsModalClose = () => setTagsModalIsOpen(false);

  return (
    <div className={css.actions}>
      {isChecked && (
        <label className={css.newLabel}>
          <input
            type="checkbox"
            name="chooseAll"
            id="chooseAll"
            className={css.checkbox}
            checked={allChecked.every((item) => item)}
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
          <div className={css.select} onClick={openTagsModal}>
            <BsTag size={16} className={css.icon} />
            <p className={css.actionsText}>Тег</p>
            {tagsModalIsOpen ? (
              <BsFillCaretUpFill size={16} className={css.icon} />
            ) : (
              <BsFillCaretDownFill size={16} className={css.icon} />
            )}
          </div>

          <div className={css.select}>
            <BsThreeDots size={16} className={css.icon} />
            <p className={css.actionsText}>Швидкі дії</p>
            <BsFillCaretDownFill size={16} className={css.icon} />
          </div>
        </div>
      )}

      <div className={css.filter}>
        <BsArrowDownUp size={18} className={css.icon} />
        <p className={css.text}>Нові</p>
        <IoIosArrowDown size={20} className={css.icon} />
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
  );
}
