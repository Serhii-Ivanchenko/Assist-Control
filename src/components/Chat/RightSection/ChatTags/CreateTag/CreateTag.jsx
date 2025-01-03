import { useEffect, useRef, useState } from "react";
import css from "./CreateTag.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import BtnsCloseAndSubmit from "../../../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit";
import { AddTagSchema } from "../../../../../validationSchemas/addTagSchema.js";
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

export default function CreateTag({ name, color, onClose, tagId }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const [newTagName, setNewTagName] = useState(name || "");
  const [bgdColor, setBgdColor] = useState(color || "");

  const handleSubmit = (values, actions) => {
    if (tagId) {
      console.log({ ...values, id: tagId });
    } else {
      console.log(values);
    }
    actions.resetForm();
    setNewTagName("");
    setBgdColor("");
    onClose();
  };

  const initialValues = {
    tagName: name || newTagName,
    bgdColor: color || bgdColor,
  };

  return (
    <div className={css.modalWrapper}>
      {name ? (
        <h3 className={css.header}>Редагувати тег</h3>
      ) : (
        <h3 className={css.header}>Створити тег</h3>
      )}

      <div className={css.tagExampleWrapper}>
        <p className={`${css.tagExample} ${css[bgdColor]}`}>{newTagName}</p>
      </div>
      <div className={css.wrapper}>
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
