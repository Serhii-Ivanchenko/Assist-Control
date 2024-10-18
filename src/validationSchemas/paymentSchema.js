import * as Yup from "yup";

export const PaymentSchema = Yup.object().shape({
  sum: Yup.number("Значення повинно бути числом")
    .required("Поле повинно бути заповнене")
    .positive("Число повинно бути більше 0"),
});
