import { useState, useEffect, useRef } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import css from "./RightOfAccessSelect.module.css";
import { BsCheck } from "react-icons/bs";

export default function RightOfAccessSelect({ setFieldValue }) {
  const pages = [
    { value: "video-control", page: "Моніторинг" },
    { value: "crm", page: "Планувальник" },
    { value: "connections", page: "Звернення" },
    { value: "recommendations", page: "Рекомендації" },
    { value: "accounting", page: "Облік" },
    { value: "reports", page: "Звіти" },
    { value: "settings", page: "Налаштування" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (value) => {
    setSelectedPages((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((page) => page !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  useEffect(() => {
    setFieldValue("selectedPages", selectedPages);
  }, [selectedPages, setFieldValue]);

  return (
    <div className={css.container} ref={wrapperRef}>
      <div className={css.titlePart} onClick={() => setIsOpen(!isOpen)}>
        <p className={css.titleText}>Право доступу</p>
        <BsFillCaretDownFill
          className={`${css.iconArrow} ${isOpen && css.rotated}`}
        />
      </div>

      {isOpen && (
        <ul className={css.options}>
          {pages.map((page, index) => (
            <li key={index} className={css.option}>
              <label className={css.label}>
                <input
                  type="checkbox"
                  //   name="all"
                  //   id="all"
                  className={css.checkbox}
                  value={page.value}
                  checked={selectedPages.includes(page.value)}
                  onChange={() => handleCheckboxChange(page.value)}
                />
                <span className={css.cbMark}>
                  <BsCheck size={20} className={css.cbIcon} />
                </span>
                <p className={css.text}> {page.page}</p>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
