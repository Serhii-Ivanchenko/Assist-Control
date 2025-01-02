import * as Yup from "yup";

export const ServiceBookingSchema = Yup.object().shape({
  car_number: Yup.string()
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Поле повинно містити лише латинські літери та цифри"
    )
    .required("Це поле повинно бути заповнене"),
  vin: Yup.string().matches(
    /^[a-zA-Z0-9]+$/,
    "Поле повинно містити лише латинські літери та цифри"
  ),
  service_id: Yup.string().required("Це поле повинно бути заповнене"),
  prepayment: Yup.number(),
  phone_number: Yup.string()
    .matches(
      /^\+380\d{9}$/,
      "Телефон повинен відповідати формату +380123456789"
    )
    .required("Це поле повинно бути заповнене"),
  position: Yup.string().required("Це поле повинно бути заповнене"),
  mechanic_id: Yup.string().required("Це поле повинно бути заповнене"),
  make_model: Yup.string()
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Поле повинно містити лише латинські літери та цифри"
    )
    .required("Це поле повинно бути заповнене"),
  name: Yup.string().required("Це поле повинно бути заповнене"),
});
