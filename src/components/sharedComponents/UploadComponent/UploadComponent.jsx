import css from "./UploadComponent.module.css";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useRef } from "react";

export default function UploadComponent({
  title,
  name,
  setLogo,
  setFieldValue,
  fieldname,
  staffModal,
  setLogoBase64,
}) {
  const fileInputRef = useRef(null);

  const handleChangePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const base64Logo = await makeBase64Logo(file); // Перетворюємо файл у base64
      setLogo(base64Logo); // зберігаємо base64 значення в стані
      setLogoBase64(base64Logo); // зберігаємо base64 значення в окремому стані (для подальшої обробки)
      setFieldValue(fieldname, file);
    }
  };

  // Функція для перетворення файлу в base64
  const makeBase64Logo = (logoFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Повертає Base64
      reader.onerror = reject;
      reader.readAsDataURL(logoFile); // Читає файл як Base64
    });
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
        onChange={(e) => handleFileChange(e, setFieldValue)}
        multiple
        // accept="image/*"
      />
    </div>
  );
}
