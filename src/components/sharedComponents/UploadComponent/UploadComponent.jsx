import css from "./UploadComponent.module.css";
import { Field } from "formik";
import { BsFillCloudUploadFill } from "react-icons/bs";

export default function UploadComponent({ title, name }) {
  return (
    <div>
      <label className={`${css.docLabel} ${css.docLabelForPhoto}`}>
        {" "}
        <BsFillCloudUploadFill className={css.icon} /> {title}
      </label>
      <Field type="file" name={name} className={css.docInput} />
    </div>
  );
}
