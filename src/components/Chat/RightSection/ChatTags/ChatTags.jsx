import css from "./ChatTags.module.css";
import { BsPencil } from "react-icons/bs";
import { useEffect, useState } from "react";
import SearchTags from "./SearchTags/SearchTags";

const tags = [
  {
    id: "1",
    tagName: "Записи на послуги",
    bgdColor: "darkGreen",
    isChecked: false,
  },
  {
    id: "2",
    tagName: "Новий рік 2024",
    bgdColor: "midOrange",
    isChecked: true,
  },
  {
    id: "3",
    tagName: "Чорна п’ятниця",
    bgdColor: "lightViolet",
    isChecked: true,
  },
  {
    id: "4",
    tagName: "Ремонт",
    bgdColor: "darkPink",
    isChecked: true,
  },
  {
    id: "5",
    tagName: "Новий",
    bgdColor: "lightRed",
    isChecked: false,
  },
  {
    id: "6",
    tagName: "Діагностика",
    bgdColor: "lightYellow",
    isChecked: false,
  },
];

export default function ChatTags() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [checkedTagsArray, setCheckedTagsArray] = useState([]);
  const [checkedTagsIdArray, setCheckedTagsIdArray] = useState([]);

  useEffect(() => {
    const checkedTags = tags.filter((checkedTag) => {
      return checkedTag.isChecked === true;
    });
    setCheckedTagsArray(checkedTags);

    let checkedTagsById = [];
    checkedTags.map((item) => {
      checkedTagsById.push(item.id);
    });
    setCheckedTagsIdArray(checkedTagsById);
  }, []);

  const handleChangeBtnClick = (event) => {
    event.stopPropagation();
    setIsSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <div className={css.sectionWrapper}>
      <div className={css.buttonWrapper}>
        {checkedTagsArray.map((tag, index) => {
          return (
            <p key={index} className={`${css[tag.bgdColor]} ${css.tag}`}>
              {tag.tagName}
            </p>
          );
        })}
      </div>
      <div className={css.bottomWrapper} onClick={handleChangeBtnClick}>
        <BsPencil className={css.pencil} />
        <p className={css.bottomText}>Змінтити Тегі</p>
        {isSearchModalOpen && (
          <SearchTags
            onClose={handleCloseSearchModal}
            checkedTagsArray={checkedTagsIdArray}
          />
        )}
      </div>
    </div>
  );
}
