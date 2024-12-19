import * as Yup from "yup";

export const EnterAmountSchema = Yup.object().shape({
  sum: Yup.string()
    .matches(/^\d+$/, "Це поле повинно містити тільки цифри")
    .required("Це поле повинно бути заповнене"),
});
