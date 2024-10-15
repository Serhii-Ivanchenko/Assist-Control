import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Пароль повиннен бути не коротше за 8 символів")
    .required("Поле Пароль повинно бути заповнене"),
  repeatPassword: Yup.string()
    .min(8, "Пароль повиннен бути не коротше за 8 символів")
    .required("Поле Повторіть пароль повинно бути заповнене")
    .oneOf([Yup.ref("password"), null], "Паролі повинні збігатися"),
});
