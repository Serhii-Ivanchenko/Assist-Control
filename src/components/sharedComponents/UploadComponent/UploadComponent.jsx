import css from "./UploadComponent.module.css";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useRef } from "react";

export default function UploadComponent({ title, name, setAvatar }) {
  const fileInputRef = useRef(null);

  const handleChangePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatar(newAvatarUrl);
      // try {
      //   await dispatch(updateUserAvatar(file)).unwrap();

      //   toast.success("Аватар успішно оновлено :)", {
      //     position: "top-right",
      //     duration: 5000,
      //     style: {
      //       background: "var(--bg-input)",
      //       color: "var(--white)FFF",
      //     },
      //   });
      // } catch (error) {
      //   setAvatar(userPhoto);
      //   console.error("Помилка при оновленні аватара", error);
      //   toast.error("Не вдалося оновити аватар :(", {
      //     position: "top-right",
      //     duration: 5000,
      //     style: {
      //       background: "var(--bg-input)",
      //       color: "var(--white)FFF",
      //     },
      //   });
      // }
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
      {/* <Field type="file" name={name} className={css.docInput} /> */}
    </div>
  );
}
