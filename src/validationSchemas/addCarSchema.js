import * as Yup from "yup";

export const AddCarSchema = Yup.object().shape({
  number: Yup.string()
    .required("Поле повинно бути заповнене")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Поле має містити цифри та латинські літери без пробілів"
    ),
  model: Yup.string().required("Поле повинно бути заповнене"),
  mileage: Yup.string().matches(/^\d+$/, "Поле повинно містити тільки цифри"),
  year: Yup.string()
    .matches(/^\d+$/, "Поле повинно містити тільки цифри")
    .length(4, "Поле повинно містити 4 цифри"),
  vin: Yup.string()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Поле повинно містити тільки цифри та латинські літери"
    )
    .length(17, "Поле повинно містити 17 символів"),
});
