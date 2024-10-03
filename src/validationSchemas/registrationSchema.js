import * as Yup from "yup";

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім’я повинно складатись з більш ніж 2 символів")
    .max(50, "Ім’я повинно складатись з менш ніж 50 символів")
    .required("Поле Ім’я повинно бути заповнене"),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Невірний формат email"
    )
    .required("Поле Email повинно бути заповнене"),
  phone: Yup.string()
    .matches(
      /[+38][0-9]{10}$/,
      "Поле Телефон повинно відповідати формату +38555000"
    )
    .required("Поле Телефон повинно бути заповнене"),
  password: Yup.string().required("Поле Пароль повинно бути заповнене"),
  repeatPassword: Yup.string()
    .required("Поле Повторіть пароль повинно бути заповнене")
    .oneOf([Yup.ref("password"), null], "Паролі повинні збігатися"),
});
