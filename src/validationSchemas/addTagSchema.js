import * as Yup from "yup";

export const AddTagSchema = Yup.object().shape({
  tagName: Yup.string().required("Поле повинно бути заповнене"),
  bgdColor: Yup.string(),
});
