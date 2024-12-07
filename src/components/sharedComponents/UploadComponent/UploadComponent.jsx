import css from "./UploadComponent.module.css";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useRef } from "react";

export default function UploadComponent({ title, name, setLogo }) {
  const fileInputRef = useRef(null);

  const handleChangePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const newLogoUrl = URL.createObjectURL(file);
      setLogo(newLogoUrl);
    }
  };

  return (
    <div>
      <label className={`${css.docLabel} ${css.docLabelForPhoto}`}>
        {" "}
        <BsFillCloudUploadFill
          className={css.icon}
          onClick={handleChangePhoto}
        />{" "}
        {title}
      </label>
      <input
        type="file"
        name={name}
        className={css.docInput}
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
      />
    </div>
  );
}
