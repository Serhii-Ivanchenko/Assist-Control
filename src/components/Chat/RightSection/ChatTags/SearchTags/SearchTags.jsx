import { Field, Form, Formik } from "formik";
import css from "./SearchTags.module.css";
import CheckBoxBtns from "../CheckBoxBtns/CheckBoxBtns";
import { BsPencil } from "react-icons/bs";
import { useEffect, useState } from "react";
import CreateTag from "../CreateTag/CreateTag";

const tags = [
  {
    id: 1,
    tagName: "Записи на послуги",
    bgdColor: "currentMileageText",
  },
  {
    id: 2,
    tagName: "Новий рік 2024",
    bgdColor: "midOrange",
  },
  {
    id: 3,
    tagName: "Чорна п’ятниця",
    bgdColor: "red",
  },
  {
    id: 4,
    tagName: "Ремонт",
    bgdColor: "statusDiag",
  },
  {
    id: 5,
    tagName: "Новий",
    bgdColor: "statusRepair",
  },
  {
    id: 6,
    tagName: "Діагностика",
    bgdColor: "statusComplete",
  },
];

export default function SearchTags({ onClose }) {
  const [dataToSearch, setDataToSearch] = useState("");
  const [searchedTags, setSearchedTags] = useState(tags);
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [changedTagName, setChangedTagName] = useState("");
  const [changedTagBgd, setChangedTagBgd] = useState("");

  const handleOpenModal = () => {
    setIsPopOverOpen(true);
  };

  const handleCloseModal = () => {
    setIsPopOverOpen(false);
  };

  useEffect(() => {
    if (dataToSearch) {
      const getVisibleTags = (tags, dataToSearch) => {
        return tags.filter((item) =>
          item.tagName.toLowerCase().includes(dataToSearch.toLowerCase())
        );
      };
      setSearchedTags(getVisibleTags);
    } else {
      setSearchedTags(tags);
    }
  }, [dataToSearch]);

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  const onPencilBtnClick = (id) => {
    const changedTag = tags.find((tag) => {
      return tag.id === id;
    });
    setChangedTagName(changedTag.tagName);
    setChangedTagBgd(changedTag.bgdColor);
    handleOpenModal();
    // onClose();
  };

  const initialValues = {
    checkedTags: [],
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
        // validationSchema={AddTagSchema}
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
                      value={tag.tagName}
                      id={tag.tagName}
                      className={css.checkbox}
                    />
                    <label htmlFor={tag.tagName} className={css.checkboxLabel}>
                      <CheckBoxBtns
                        isChecked={values.checkedTags.includes(tag.tagName)}
                      />
                      <p className={`${css.tagName} ${css[tag.bgdColor]}`}>
                        {tag.tagName}
                      </p>
                    </label>
                    <BsPencil
                      className={css.icon}
                      onClick={() => {
                        onPencilBtnClick(tag.id);
                      }}
                    />
                    {isPopOverOpen && (
                      <CreateTag
                        onClose={handleCloseModal}
                        name={changedTagName}
                        color={changedTagBgd}
                        isPopOverOpen={isPopOverOpen}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <button type="submit" onSubmit={handleSubmit}></button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
