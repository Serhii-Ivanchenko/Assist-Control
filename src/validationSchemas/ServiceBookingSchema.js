import * as Yup from "yup";
import { services } from "../components/Modals/ServiceBookingModal/constants.js";
import { posts } from "../components/Modals/ServiceBookingModal/constants.js";
import { mechanics } from "../components/Modals/ServiceBookingModal/constants.js";

export const ServiceBookingSchema = Yup.object().shape({
  carNumber: Yup.string().required("Це поле повинно бути заповнене"),
  vin: Yup.string().required("Це поле повинно бути заповнене"),
  service: Yup.string()
    .oneOf(services, "Оберіть одне із значень")
    .required("Це поле повинно бути заповнене"),
  prepayment: Yup.number().required("Це поле повинно бути заповнене"),
  phoneNumber: Yup.string().required("Це поле повинно бути заповнене"),
  post: Yup.string()
    .oneOf(posts, "Оберіть одне із значень")
    .required("Це поле повинно бути заповнене"),
  mechanic: Yup.string()
    .oneOf(mechanics, "Оберіть одне із значень")
    .required("Це поле повинно бути заповнене"),
  carModel: Yup.string().required("Це поле повинно бути заповнене"),
  clientName: Yup.string().required("Це поле повинно бути заповнене"),
});
