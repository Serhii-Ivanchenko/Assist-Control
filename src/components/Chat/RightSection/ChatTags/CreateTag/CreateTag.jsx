import { useEffect, useRef, useState } from "react";
import css from "./CreateTag.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import BtnsCloseAndSubmit from "../../../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit";
import { AddTagSchema } from "../../../../../validationSchemas/addTagSchema.js";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import clsx from "clsx";

const colors = [
  "darkGreen",
  "midGreen",
  "lightGreen",
  "darkBlue",
  "midBlue",
  "lightBlue",
  "darkYellow",
  "midYellow",
  "lightYellow",
  "darkAqua",
  "midAqua",
  "lightAqua",
  "darkOrange",
  "midOrange",
  "lightOrange",
  "darkKhaki",
  "midKhaki",
  "lightKhaki",
  "darkRed",
  "midRed",
  "lightRed",
  "darkPink",
  "midPink",
  "lightPink",
  "darkViolet",
  "midViolet",
  "lightViolet",
  "darkGrey",
  "midGrey",
  "lightGrey",
];

export default function CreateTag({
  onClose,
  changedTag,
  setTagsArr,
  leftSectionTag,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const createPopoverRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      createPopoverRef.current &&
      !createPopoverRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [newTagName, setNewTagName] = useState(changedTag.tagName || "");
  const [bgdColor, setBgdColor] = useState(changedTag.bgdColor || colors[0]);

  const handleSubmit = (values, actions) => {
    if (changedTag) {
      setTagsArr((prevTagsArr) => {
        const updatedTagsArr = prevTagsArr.map((prevTag) => {
          return prevTag.id === changedTag.id
            ? { ...prevTag, ...values }
            : prevTag;
        });
        return updatedTagsArr;
      });
    } else {
      setTagsArr((prevTagsArr) => {
        const existingTag = prevTagsArr.find(
          (prevTag) =>
            prevTag.tagName.toLowerCase() === values.tagName.toLowerCase()
        );
        if (existingTag) {
          toast.error("Такий тег вже існує", {
            position: "top-center",
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          return prevTagsArr;
        } else {
          return [
            ...prevTagsArr,
            { ...values, isChecked: false, id: nanoid() },
          ];
        }
      });
    }
    actions.resetForm();
    setNewTagName("");
    setBgdColor("");
    onClose();
  };

  const initialValues = {
    tagName: newTagName,
    bgdColor: bgdColor,
  };

  return (
    <div
      className={clsx(
        css.modalWrapper,
        leftSectionTag
          ? css.leftSectionModalWrapper
          : css.rightSectionModalWrapper
      )}
      ref={createPopoverRef}
    >
      {changedTag.tagName ? (
        <h3 className={css.header}>Редагувати тег</h3>
      ) : (
        <h3 className={css.header}>Створити тег</h3>
      )}

      <div className={css.tagExampleWrapper}>
        <p className={`${css.tagExample} ${css[bgdColor]}`}>{newTagName}</p>
      </div>
      <div
        className={clsx(
          css.wrapper,
          leftSectionTag ? css.leftSectionWrapper : css.rightSectionWrapper
        )}
      >
        <h4 className={css.name}>Назва</h4>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={AddTagSchema}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur
        >
          <Form>
            <div className={css.inputWrapper}>
              <Field
                name="tagName"
                type="text"
                className={css.input}
                onChange={(e) => setNewTagName(e.target.value)}
                value={newTagName}
                innerRef={inputRef}
              />
              <ErrorMessage
                name="tagName"
                component="div"
                className={css.errorMsg}
              />
            </div>
            <p className={css.name}>Оберіть колір</p>
            <div className={css.buttonWrapper}>
              {colors.map((color, index) => {
                return (
                  <div key={index}>
                    <Field
                      id={`${color}`}
                      name="bgdColor"
                      type="radio"
                      className={css.radioBtn}
                      value={`${color}`}
                    />
                    <label
                      className={`${css.button} ${css[color]}`}
                      onClick={() => setBgdColor(color)}
                      htmlFor={`${color}`}
                    />
                  </div>
                );
              })}
            </div>
            <BtnsCloseAndSubmit
              onClose={onClose}
              handleSubmit={handleSubmit}
              btnSave={"Зберегти"}
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
