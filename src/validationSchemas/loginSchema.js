import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім’я повинно складатись з більш ніж 2 символів")
    .max(50, "Ім’я повинно складатись з менш ніж 50 символів")
    .required("Поле Ім’я повинно бути заповнене"),
  password: Yup.string().required("Поле Пароль повинно бути заповнене"),
});
