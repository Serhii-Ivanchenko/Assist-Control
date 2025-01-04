import { Field, Form, Formik } from "formik";
import css from "./SearchTags.module.css";
import CheckBoxBtns from "../CheckBoxBtns/CheckBoxBtns";
import { BsPencil } from "react-icons/bs";
import { useEffect, useState } from "react";
import CreateTag from "../CreateTag/CreateTag";

const tags = [
  {
    id: "1",
    tagName: "Записи на послуги",
    bgdColor: "darkGreen",
    isChecked: true,
  },
  {
    id: "2",
    tagName: "Новий рік 2024",
    bgdColor: "midOrange",
    isChecked: false,
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

export default function SearchTags({ onClose, checkedTagsArray }) {
  const [dataToSearch, setDataToSearch] = useState("");
  const [searchedTags, setSearchedTags] = useState(tags);
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false);
  const [changedTagName, setChangedTagName] = useState("");
  const [changedTagBgd, setChangedTagBgd] = useState("");
  const [changedTagId, setChangedTagId] = useState("");

  const handleOpenModal = () => {
    setIsCreateTagModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateTagModalOpen(false);
  };

  useEffect(() => {
    if (dataToSearch) {
      const getVisibleTags = searchedTags.filter((item) =>
        item.tagName.toLowerCase().includes(dataToSearch.toLowerCase())
      );
      setSearchedTags(getVisibleTags);
    } else {
      setSearchedTags(tags);
    }
  }, [dataToSearch]);

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    onClose();
  };

  const onPencilBtnClick = (id) => {
    const changedTag = tags.find((tag) => {
      return tag.id === id;
    });
    setChangedTagName(changedTag.tagName);
    setChangedTagBgd(changedTag.bgdColor);
    setChangedTagId(id);
    handleOpenModal();
  };

  const initialValues = {
    checkedTags: checkedTagsArray || [],
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.header}>Теги</h3>
      <input
        type="text"
        className={css.input}
        placeholder="Шукати теги..."
        onChange={(e) => {
          setDataToSearch(e.target.value);
        }}
      />
      <p className={css.text}>Теги</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur
      >
        {({ values }) => (
          <Form>
            <div className={css.tagsWrapper}>
              {searchedTags.map((tag, index) => {
                return (
                  <div key={index} className={css.labelWrapper}>
                    <Field
                      type="checkbox"
                      name="checkedTags"
                      value={tag.id}
                      id={tag.tagName}
                      className={css.checkbox}
                    />
                    <label htmlFor={tag.tagName} className={css.checkboxLabel}>
                      <CheckBoxBtns
                        isChecked={values.checkedTags.includes(tag.id)}
                      />
                      <p className={`${css.tagName} ${css[tag.bgdColor]}`}>
                        {tag.tagName}
                      </p>
                    </label>
                    <BsPencil
                      className={css.icon}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPencilBtnClick(tag.id);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <button type="submit" className={css.submitBtn}>
              Зберегти
            </button>
          </Form>
        )}
      </Formik>
      {isCreateTagModalOpen && (
        <CreateTag
          onClose={handleCloseModal}
          name={changedTagName}
          color={changedTagBgd}
          tagId={changedTagId}
        />
      )}
    </div>
  );
}
