import * as Yup from "yup";
import { services } from "../components/Modals/ServiceBookingModal/constants.js";

export const ServiceBookingSchema = (mechanicsList, postsList) =>
  Yup.object().shape({
    car_number: Yup.string().matches(
      /^[a-zA-Z0-9 ]+$/,
      "Поле повинно містити лише латинські літери та цифри"
    ),
    vin: Yup.string().matches(
      /^[a-zA-Z0-9]+$/,
      "Поле повинно містити лише латинські літери та цифри"
    ),
    service: Yup.string()
      .oneOf(services, "Оберіть одне із значень")
      .required("Це поле повинно бути заповнене"),
    prepayment: Yup.number(),
    phone_number: Yup.string().required("Це поле повинно бути заповнене"),
    position: Yup.string()
      .oneOf(postsList, "Оберіть одне із значень")
      .required("Це поле повинно бути заповнене"),
    mechanic: Yup.string()
      .oneOf(mechanicsList, "Оберіть одне із значень")
      .required("Це поле повинно бути заповнене"),
    make_model: Yup.string()
      .matches(
        /^[a-zA-Z0-9 ]+$/,
        "Поле повинно містити лише латинські літери та цифри"
      )
      .required("Це поле повинно бути заповнене"),
    name: Yup.string().required("Це поле повинно бути заповнене"),
  });
