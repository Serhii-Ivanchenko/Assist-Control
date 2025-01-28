import * as Yup from "yup";

export const AddServiceSchema = Yup.object().shape({
  logo: Yup.string(),
  companyName: Yup.string().required("Це поле повинно бути заповнене"),
  address: Yup.string().required("Це поле повинно бути заповнене"),
  email: Yup.string().matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    "Невірний формат email"
  ),
  fop_name: Yup.string(),
  // .required("Це поле повинно бути заповнене"),
  ipn: Yup.string()
    .matches(/^\d+$/, "Це поле повинно містити тільки цифри")
    .length(10, "Це поле повинно містити 10 цифр"),
  // .required("Це поле повинно бути заповнене"),
  iban: Yup.string().matches(
    /^\UA\d{27}$/,
    "Номер рахунку повинен мати формат UA123456789012345678901234567"
  ),
  // .required("Це поле повинно бути заповнене"),
  bank_name: Yup.string(),
  // .required("Це поле повинно бути заповнене"),
  mfo_bank: Yup.string()
    .matches(/^\d+$/, "Це поле повинно містити тільки цифри")
    .length(6, "Це поле повинно містити 6 цифр"),
  // .required("Це поле повинно бути заповнене"),
  legal_address: Yup.string(),
  // .required("Це поле повинно бути заповнене"),
  manager_phone: Yup.string().matches(
    /^380\d{9}$/,
    "Телефон повинен мати формат 380123456789"
  ),
  // .required("Це поле повинно бути заповнене"),
  manager_name: Yup.string(),
  // .required("Це поле повинно бути заповнене"),
  office_phone: Yup.string().matches(
    /^380\d{9}$/,
    "Телефон повинен мати формат 380123456789"
  ),
  // .required("Це поле повинно бути заповнене"),
  director_phone: Yup.string().matches(
    /^380\d{9}$/,
    "Телефон повинен мати формат 380123456789"
  ),
  // .required("Це поле повинно бути заповнене"),
});
