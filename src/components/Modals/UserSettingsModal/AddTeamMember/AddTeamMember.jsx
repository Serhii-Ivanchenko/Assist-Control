import { Field, Form, Formik } from "formik";
import { useId } from "react";
import css from "./AddTeamMember.module.css";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import { TfiClose } from "react-icons/tfi";
import { BsPersonPlusFill } from "react-icons/bs";
// import CustomRadioBtn from "../../../CustomRadioBtn/CustomRadioBtn";

const Validation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Занадто коротке")
    .max(30, "Занадто довге")
    .required("Обов'язкове поле для заповнення"),
  surname: Yup.string()
    .min(2, "Занадто коротке")
    .max(30, "Занадто довге")
    .required("Обов'язкове поле для заповнення"),
  email: Yup.string()
    .email("Введіть коректну пошту")
    .required("Обов'язкове поле для заповнення")
    .test("has-domain", 'Email має містити ".com", ".net" і тд.', (value) => {
      return value && value.includes("@") && value.split("@")[1].includes(".");
    }),
});

const initialValues = {
  name: "",
  surname: "",
  email: "",
  role: "viewer",
};

export default function AddTeamMember({ onClose }) {
  const nameFieldId = useId();
  const surnameFieldId = useId();
  const emailFieldId = useId();
  const roleAdminFieldId = useId();
  const roleViewerFieldId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <div className={css.addBox}>
      <TfiClose onClick={onClose} className={css.closeBtn} />

      <div className={css.contentBox}>
        <p className={css.addTitle}>Додати користувача</p>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Validation}
        >
          <Form className={css.addForm}>
            <div className={css.nameBox}>
              <div className={css.name}>
                <label htmlFor={nameFieldId} className={css.fieldName}>
                  Ім&apos;я
                </label>
                <Field
                  type="text"
                  name="name"
                  id={nameFieldId}
                  className={css.field}
                  placeholder="Володимиp"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.name}>
                <label htmlFor={surnameFieldId} className={css.fieldName}>
                  Прізвище
                </label>
                <Field
                  type="text"
                  name="surname"
                  id={surnameFieldId}
                  className={css.field}
                  placeholder="Зеленський"
                />
                <ErrorMessage
                  name="surname"
                  component="span"
                  className={css.errorMessage}
                />
              </div>
            </div>

            <div className={css.nameEmail}>
              <label htmlFor={emailFieldId} className={css.fieldName}>
                Пошта
              </label>
              <Field
                type="email"
                name="email"
                id={emailFieldId}
                className={css.fieldEmail}
                placeholder="zelensky.official@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.errorMessageEmail}
              />
            </div>

            <p className={css.fieldName}>Роль</p>

            <div className={css.radioBtnBox}>
              <label htmlFor={roleViewerFieldId} className={css.radioName}>
                <Field
                  type="radio"
                  name="role"
                  value="viewer"
                  id={roleViewerFieldId}
                  className={css.radioInput}
                />

                <span className={css.castomRadio}>
                  <span className={css.dot}></span>
                </span>
                {/* <CustomRadioBtn/> */}

                <div className={css.roleDescription}>
                  <p className={css.title}> Перегляд</p>
                  <p className={css.text}>
                    користувач може лише переглядати інформацію без можливості
                    її змінювати, додавати або видаляти. Доступ обмежений тільки
                    для ознайомлення з даними.
                  </p>
                </div>
              </label>

              <label htmlFor={roleAdminFieldId} className={css.radioName}>
                <Field
                  type="radio"
                  name="role"
                  value="admin"
                  id={roleAdminFieldId}
                  className={css.radioInput}
                />

                <span className={css.castomRadio}>
                  <span className={css.dot}></span>
                </span>
                {/* <CustomRadioBtn /> */}
                


                <div className={css.roleDescription}>
                  <p className={css.title}>Адміністратор</p>
                  <p className={css.text}>
                    користувач має повний доступ до всіх функцій системи,
                    включаючи керування{" "}
                    <span className={css.responsiveBr}>
                      <br />
                    </span>
                    налаштуваннями, редагування, створення та видалення даних,а
                    також{" "}
                    <span className={css.responsiveBr2}>
                      <br />
                    </span>
                    управління правами інших користувачів.
                  </p>
                </div>
              </label>
            </div>

            <div className={css.btnBox}>
              <button type="button" className={css.cancelBtn} onClick={onClose}>
                Відміна
              </button>
              <button type="submit" className={css.addBtn}>
                <BsPersonPlusFill className={css.addIcon} />
                Додати
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
