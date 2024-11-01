import * as Yup from "yup";
import { services } from "../components/Modals/ServiceBookingModal/constants.js";
import { posts } from "../components/Modals/ServiceBookingModal/constants.js";
import { mechanics } from "../components/Modals/ServiceBookingModal/constants.js";

export const ServiceBookingSchema = Yup.object().shape({
  car_number: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Поле повинно містити лише латинські літери та цифри"
    )
    .required("Це поле повинно бути заповнене"),
  vin: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Поле повинно містити лише латинські літери та цифри"
    )
    .required("Це поле повинно бути заповнене"),
  service: Yup.string()
    .oneOf(services, "Оберіть одне із значень")
    .required("Це поле повинно бути заповнене"),
  prepayment: Yup.number().required("Це поле повинно бути заповнене"),
  phone_number: Yup.string().required("Це поле повинно бути заповнене"),
  position: Yup.string()
    .oneOf(posts, "Оберіть одне із значень")
    .required("Це поле повинно бути заповнене"),
  mechanic: Yup.string()
    .oneOf(mechanics, "Оберіть одне із значень")
    .required("Це поле повинно бути заповнене"),
  make_model: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Поле повинно містити лише латинські літери та цифри"
    )
    .required("Це поле повинно бути заповнене"),
  name: Yup.string().required("Це поле повинно бути заповнене"),
});
