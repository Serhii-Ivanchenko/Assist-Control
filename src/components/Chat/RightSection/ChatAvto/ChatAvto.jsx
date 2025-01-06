import css from "./ChatAvto.module.css";
import { IoCarSportSharp } from "react-icons/io5";
import { forwardRef, useImperativeHandle, useState } from "react";
let dataAvto = {
  id: 1,
  avtoNum: "AR 5678 OP",
  avtoYear: 2001,
  avtoType: "Honda",
};

const dataAvtoEmpty = {
  id: 1,
  avtoNum: "Номер авто",
  avtoYear: "Рік",
  avtoType: "Марка авто",
};

const ChatAvto = forwardRef(({ isEditable }, ref) => {
  const dataAvtoChat =
    dataAvto && Object.keys(dataAvto).length > 0 ? dataAvto : dataAvtoEmpty;

  const [data, setData] = useState(dataAvtoChat);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useImperativeHandle(ref, () => ({
    saveData() {
      console.log("Данные сохранены:", data);
    },
    resetData() {
      console.log("Данные сброшены");
      setData(dataAvtoChat);
    },
  }));

  return (
    <div className={css.wrapper}>
      <div className={css.avtoBox}>
        <IoCarSportSharp className={css.iconAvto} />

        {isEditable ? (
          <input
            type="text"
            name="avtoYear"
            value={data.avtoYear}
            onChange={handleInputChange}
            className={css.editInput}
          />
        ) : (
          <p className={css.dataValueYear}>{data.avtoYear}</p>
        )}

        {isEditable ? (
          <input
            type="text"
            name="avtoType"
            value={data.avtoType}
            onChange={handleInputChange}
            className={css.editInput}
          />
        ) : (
          <p className={css.dataValue}>{data.avtoType}</p>
        )}
      </div>

      {isEditable ? (
        <input
          type="text"
          name="avtoNum"
          value={data.avtoNum}
          onChange={handleInputChange}
          className={css.editInput}
        />
      ) : (
        <p className={css.dataValueNum}>{data.avtoNum}</p>
      )}
    </div>
  );
});

ChatAvto.displayName = "ChatAvto";
export default ChatAvto;
