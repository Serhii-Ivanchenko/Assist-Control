import * as Yup from "yup";

export const AddServiceSchema = Yup.object().shape({
  address: Yup.string().required("Це поле повинно бути заповнене"),
  name: Yup.string().required("Це поле повинно бути заповнене"),
  userCode: Yup.number().required("Це поле повинно бути заповнене"),
  account: Yup.string()
    .matches(
      /^\UA\d{27}$/,
      "Номер рахунку повинен мати формат UA123456789012345678901234567"
    )
    .required("Це поле повинно бути заповнене"),
  bank: Yup.string().required("Це поле повинно бути заповнене"),
  bankDetails: Yup.number().required("Це поле повинно бути заповнене"),
  legalAddress: Yup.string().required("Це поле повинно бути заповнене"),
  managerPhone: Yup.string()
    .matches(/^\+380\d{9}$/, "Телефон повинен мати формат +380123456789")
    .required("Це поле повинно бути заповнене"),
  managerName: Yup.string().required("Це поле повинно бути заповнене"),
  officePhoneNumber: Yup.string()
    .matches(/^\+380\d{9}$/, "Телефон повинен мати формат +380123456789")
    .required("Це поле повинно бути заповнене"),
  headPhoneNumber: Yup.string()
    .matches(/^\+380\d{9}$/, "Телефон повинен мати формат +380123456789")
    .required("Це поле повинно бути заповнене"),
});