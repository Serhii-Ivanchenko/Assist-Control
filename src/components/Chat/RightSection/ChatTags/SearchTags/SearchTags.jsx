import { Field, Form, Formik } from "formik";
import css from "./SearchTags.module.css";
import CheckBoxBtns from "../CheckBoxBtns/CheckBoxBtns";
import { BsPencil } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import CreateTag from "../CreateTag/CreateTag";
import clsx from "clsx";

export default function SearchTags({
  onClose,
  checkedTagsArray,
  tagsArray,
  setTagsArr,
  leftSectionTag,
}) {
  const [dataToSearch, setDataToSearch] = useState("");
  const [searchedTags, setSearchedTags] = useState(tagsArray);
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false);
  const [changedTag, setChangedTag] = useState("");

  const handleOpenModal = () => {
    setIsCreateTagModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateTagModalOpen(false);
  };

  const popoverRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dataToSearch) {
      const getVisibleTags = searchedTags.filter((item) =>
        item.tagName.toLowerCase().includes(dataToSearch.toLowerCase())
      );
      setSearchedTags(getVisibleTags);
    } else {
      setSearchedTags(tagsArray);
    }
  }, [dataToSearch, tagsArray]);

  const handleSubmit = (values, actions) => {
    if (!checkedTagsArray) {
      console.log(values);
    } else {
      setTagsArr((prevTagsArr) => {
        const updatedCheckedTagsArr = prevTagsArr.map((prevTag) => {
          return values.checkedTags.includes(prevTag.id)
            ? { ...prevTag, isChecked: true }
            : { ...prevTag, isChecked: false };
        });
        return updatedCheckedTagsArr;
      });
    }
    actions.resetForm();
    onClose();
  };

  const onPencilBtnClick = (id) => {
    if (id) {
      const changedTagById = tagsArray.find((tag) => {
        return tag.id === id;
      });
      setChangedTag(changedTagById);
      handleOpenModal();
    } else {
      setChangedTag("");
      handleOpenModal();
    }
  };

  const initialValues = {
    checkedTags: checkedTagsArray || [],
  };

  return (
    <div
      className={clsx(
        css.wrapper,
        leftSectionTag ? css.leftSectionTags : css.rightSectionTags
      )}
      ref={popoverRef}
    >
      <div className={css.headerWrapper}>
        <h3 className={css.header}>Теги</h3>
        <BsXLg className={css.closeIcon} onClick={onClose} />
      </div>
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
            <button
              type="button"
              className={css.submitBtn}
              onClick={() => onPencilBtnClick()}
            >
              Створити тег
            </button>
          </Form>
        )}
      </Formik>
      {isCreateTagModalOpen && (
        <CreateTag
          onClose={handleCloseModal}
          changedTag={changedTag}
          setTagsArr={setTagsArr}
          leftSectionTag={leftSectionTag}
        />
      )}
    </div>
  );
}
