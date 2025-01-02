import css from "./ChatTags.module.css";
import { IoIosArrowUp } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import CreateTag from "./CreateTag/CreateTag";
import { useState } from "react";
import SearchTags from "./SearchTags/SearchTags";

export default function ChatTags() {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handlePlusBtnClick = () => {
    setIsPopOverOpen(true);
  };

  const handleCloseModal = () => {
    setIsPopOverOpen(false);
  };

  const handleChangeBtnClick = () => {
    setIsSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <div className={css.sectionWrapper}>
      <div className={css.topWrapper}>
        <div className={css.leftWrapper}>
          <h3 className={css.header}>Тегі</h3>
          <IoIosArrowUp className={css.arrow} />
        </div>
        <FaMagnifyingGlass className={css.glass} />
        <div className={css.plus} onClick={handlePlusBtnClick}>
          <FaPlus />
        </div>
        {isPopOverOpen && (
          <CreateTag
            onClose={handleCloseModal}
            name={null}
            color={null}
            isPopOverOpen={isPopOverOpen}
          />
        )}
      </div>
      <div className={css.buttonWrapper}></div>
      <div className={css.bottomWrapper} onClick={handleChangeBtnClick}>
        <BsPencil className={css.pencil} />
        <p className={css.bottomText}>Змінтити Тегі</p>
        {isSearchModalOpen && <SearchTags onClose={handleCloseSearchModal} />}
      </div>
    </div>
  );
}
