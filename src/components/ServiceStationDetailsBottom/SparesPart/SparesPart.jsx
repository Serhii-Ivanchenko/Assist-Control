import { useEffect, useRef, useState } from "react";
import css from "./SparesPart.module.css";
// import { BsCheckSquare } from "react-icons/bs";
// import CustomRadioBtn from "../../CustomRadioBtn/CustomRadioBtn.jsx"
import { BsPlusLg } from "react-icons/bs";
import { BsDashSquareFill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
// import { BsRecordFill } from "react-icons/bs";
import { BsCircle } from "react-icons/bs";
import { BsRecordCircle } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";

export default function SparesPart() {
  const [isChecked, setIsChecked] = useState(null);

  const [fixedRow, setFixedRow] = useState({ UAH: "", percent: "" });

  const [rows, setRows] = useState(() => {
    const savedObject = window.localStorage.getItem("saved-rows");
    if (savedObject !== null) {
      return JSON.parse(savedObject);
    }
    return [{ from: "", to: "", percentage: "" }];
  });

  const scrollToTheLastItemRef = useRef();
  const prevRowsLength = useRef(rows.length);

  useEffect(() => {
    window.localStorage.setItem("saved-rows", JSON.stringify(rows));
  }, [rows]);

  // useEffect(() => {
  //   window.localStorage.setItem("saved-rows-fixed", JSON.stringify(fixedRow));
  // }, [fixedRow]);

  const addRow = () => {
    setRows([...rows, { from: "", to: "", percentage: "" }]);
  };

  useEffect(() => {
    if (rows.length > prevRowsLength.current) {
      scrollToTheLastItemRef.current?.scrollTo({
        top: scrollToTheLastItemRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    prevRowsLength.current = rows.length;
  }, [rows]);

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateInputs = (index, field, value) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const updateFixedRow = (field, value) => {
    setFixedRow((fixedRow) => ({ ...fixedRow, [field]: value }));
  };

  const chosenRadio = (index) => {
    setIsChecked(isChecked === index ? null : index);
  };

  return (
    <div className={css.sparesPart}>
      <div className={css.cbPartBox}>
        <label className={css.cbLabel}>
          <input type="checkbox" className={css.checkbox}></input>
          <span className={css.cbMark}>
            <BsCheck size={24} className={css.cbIcon} />
          </span>
          Загальна
        </label>

        {/* <label className={css.cbLabel}> </label>*/}
        <div className={css.selectBox}>
          <select className={css.select}>
            <option value="default">Постачальник</option>
            <option value="1">Постачальник1</option>
            <option value="2">Постачальник2</option>
          </select>
          <BsFillCaretDownFill className={css.iconArrow} size={20} />
        </div>
        {/* Постачальник */}

        {/* <label className={css.cbLabel}></label> */}
        <div className={css.selectBox}>
          <select className={css.select}>
            <option value="default">Бренд</option>
            <option value="1">Бренд1</option>
            <option value="2">Бренд2</option>
          </select>
          <BsFillCaretDownFill className={css.iconArrow} size={20} />
        </div>
        {/* <span className={css.cbMark}>
            <BsCheck size={24} className={css.cbIcon} />
          </span> */}
        {/* Бренд */}

        {/* <label className={css.cbLabel}></label> */}
        <div className={css.selectBox}>
          <select className={css.select}>
            <option value="default">Група</option>
            <option value="1">Група1</option>
            <option value="2">Група2</option>
          </select>
          <BsFillCaretDownFill className={css.iconArrow} size={20} />
        </div>
        {/* Група */}
      </div>

      <div className={css.radioAndInputs} ref={scrollToTheLastItemRef}>
        <div className={css.radioBtns}>
          <label className={css.radioLabel}>
            <input
              type="radio"
              className={css.radiobutton}
              onClick={() => chosenRadio(0)}
            />
            {isChecked === 0 ? (
              <BsRecordCircle className={css.radiospan} />
            ) : (
              <BsCircle className={css.radiospan} />
            )}
            Фіксована націнка (%)
          </label>

          <label className={css.radioLabel}>
            <input
              type="radio"
              className={css.radiobutton}
              onClick={() => chosenRadio(1)}
            />
            {isChecked === 1 ? (
              <BsRecordCircle className={css.radiospan} />
            ) : (
              <BsCircle className={css.radiospan} />
            )}
            Динамічна націнка (%)
          </label>
        </div>

        <div className={css.inputsPart}>
          <div className={css.Inputs}>
            <div className={css.inputBox}>
              <label className={css.inputLabel}>грн</label>
              <input
                type="number"
                placeholder="400"
                className={css.input}
                value={fixedRow.UAH}
                onChange={(e) => updateFixedRow("UAH", e.target.value)}
              />
            </div>

            <div className={css.inputBox}>
              <label className={css.inputLabel}>%</label>
              <input
                type="number"
                placeholder="10"
                className={css.input}
                value={fixedRow.percent}
                onChange={(e) => updateFixedRow("percent", e.target.value)}
              />
            </div>
          </div>

          <div className={css.labelAndInputs}>
            <div className={css.labels}>
              <label className={css.inputLabel}>Від грн</label>
              <label className={css.inputLabel}>До грн</label>
              <label className={css.inputLabel}>%</label>
            </div>

            <ul className={css.inputsList}>
              {rows.map((row, index) => (
                <li key={index} className={css.Inputs}>
                  <input
                    placeholder="250"
                    type="number"
                    className={css.input}
                    value={row.from}
                    onChange={(e) =>
                      updateInputs(index, "from", e.target.value)
                    }
                  />

                  <input
                    placeholder="400"
                    type="number"
                    className={css.input}
                    value={row.to}
                    onChange={(e) => updateInputs(index, "to", e.target.value)}
                  />

                  <input
                    placeholder="7"
                    type="number"
                    className={css.input}
                    value={row.percentage}
                    onChange={(e) =>
                      updateInputs(index, "percentage", e.target.value)
                    }
                  />

                  {index === rows.length - 1 ? (
                    <button
                      type="button"
                      className={css.btnPlus}
                      onClick={addRow}
                    >
                      <span className={css.plus}>
                        <BsPlusLg className={css.iconPlus} />
                      </span>
                    </button>
                  ) : (
                    <BsDashSquareFill
                      className={css.iconMinus}
                      size={24}
                      onClick={() => removeRow(index)}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={css.btnBox}>
        <button type="button" className={css.save}>
          {" "}
          <BsCheckLg size={18} /> Зберегти
        </button>
      </div>
    </div>
  );
}
