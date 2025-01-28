import * as Yup from "yup";

export const AddClientPersonSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім’я повинно складатись з більш ніж 2 символів")
    .max(50, "Ім’я повинно складатись з менш ніж 50 символів")
    .required("Поле Ім’я повинно бути заповнене"),
  phoneNumber1: Yup.string()
    .matches(/^380\d{9}$/, "Телефон повинен мати формат 380123456789")
    .required("Це поле повинно бути заповнене"),
  phoneNumber2: Yup.string().matches(
    /^380\d{9}$/,
    "Телефон повинен мати формат 380123456789"
  ),
  // .required("Це поле повинно бути заповнене"),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Невірний формат email"
    )
    .required("Поле Email повинно бути заповнене"),
  telegram: Yup.string().min(
    2,
    "Ім’я повинно складатись з більш ніж 2 символів"
  ),
});
