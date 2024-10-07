import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Невірний формат email"
    )
    .required("Поле Email повинно бути заповнене"),
  password: Yup.string()
    .required("Поле Пароль повинно бути заповнене"),
});
