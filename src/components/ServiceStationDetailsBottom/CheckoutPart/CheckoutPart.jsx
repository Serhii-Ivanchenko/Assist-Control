import { useState } from "react";
import SwitchableBtns from "../../sharedComponents/SwitchableBtns/SwitchableBtns";
import css from "./CheckoutPart.module.css";
import { BsPlusLg } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import clsx from "clsx";
import { useEffect } from "react";
import { useRef } from "react";

export default function CheckoutPart() {
  const [isEditing, setIsEditing] = useState(false);
  const [checkouts, setCheckouts] = useState([
    {
      name: "Блудов",
      currency: "грн",
      entrepreneur: "ФОП Блудов",
      warehouse: "Склад Черкаси",
      responsible: "Відповідальний ПІБ",
      isDisabled: false,
    },
    {
      name: "Блудов",
      currency: "грн",
      entrepreneur: "ФОП Блудов",
      warehouse: "Склад Черкаси",
      responsible: "Відповідальний ПІБ",
      isDisabled: false,
    },
    {
      name: "Блудов",
      currency: "грн",
      entrepreneur: "ФОП Блудов",
      warehouse: "Склад Черкаси",
      responsible: "Відповідальний ПІБ",
      isDisabled: false,
    },
    {
      name: "Блудов",
      currency: "грн",
      entrepreneur: "ФОП Блудов",
      warehouse: "Склад Черкаси",
      responsible: "Відповідальний ПІБ",
      isDisabled: false,
    },
    {
      name: "Блудов",
      currency: "грн",
      entrepreneur: "ФОП Блудов",
      warehouse: "Склад Черкаси",
      responsible: "Відповідальний ПІБ",
      isDisabled: false,
    },
    {
      name: "Блудов",
      currency: "грн",
      entrepreneur: "ФОП Блудов",
      warehouse: "Склад Черкаси",
      responsible: "Відповідальний ПІБ",
      isDisabled: false,
    },
    {
      name: "Блудов",
      currency: "грн",
      entrepreneur: "ФОП Блудов",
      warehouse: "Склад Черкаси",
      responsible: "Відповідальний ПІБ",
      isDisabled: false,
    },
    {
      name: "Блудов",
      currency: "грн",
      entrepreneur: "ФОП Блудов",
      warehouse: "Склад Черкаси",
      responsible: "Відповідальний ПІБ",
      isDisabled: false,
    },
    {
      name: "Блудов",
      currency: "грн",
      entrepreneur: "ФОП Блудов",
      warehouse: "Склад Черкаси",
      responsible: "Відповідальний ПІБ",
      isDisabled: false,
    },
  ]);
  const [newRow, setNewRow] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editedValue, setEditedValue] = useState({});
  const inputFocusRef = useRef();
  const scrollToTheLastItemRef = useRef();

  const handleEditing = (index) => {
    const checkoutToEdit = checkouts[index];
    setEditedValue({ ...checkoutToEdit, index });
    setIsEditing(isEditing === index ? null : index);
  };

  useEffect(() => {
    if (isEditing) {
      inputFocusRef.current.focus();
    }
  }, [isEditing]);

  const deleteCheckout = (index) => {
    setCheckouts((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  const toDisable = (index) => {
    setCheckouts(
      checkouts.map((checkout, i) =>
        i === index
          ? { ...checkout, isDisabled: !checkout.isDisabled }
          : checkout
      )
    );
  };

  const handleAdd = () => {
    if (newRow.trim()) {
      setCheckouts([
        ...checkouts,
        {
          name: newRow,
          currency: "грн",
          entrepreneur: "ФОП Блудов",
          warehouse: "Склад Черкаси",
          responsible: "Відповідальний ПІБ",
          isDisabled: false,
        },
      ]);
      setNewRow("");
    }
  };

  useEffect(() => {
    if (checkouts.length > 0) {
      scrollToTheLastItemRef.current?.scrollTo({
        top: scrollToTheLastItemRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [checkouts]);

  const handleChangeName = (newName, index) => {
    setCheckouts(
      checkouts.map((checkout, i) =>
        i === index ? { ...checkout, name: newName } : checkout
      )
    );
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setActiveDropdown(null);
    }
  };

  const handleRepeal = () => {
    if (editedValue && editedValue.index !== undefined) {
      setCheckouts(
        checkouts.map((checkout, index) =>
          index === editedValue.index
            ? { ...checkout, name: editedValue.name }
            : checkout
        )
      );
      setIsEditing(null);
    }
  };

  return (
    <div className={css.checkoutPart} onBlur={handleBlur}>
      <div className={css.divForScroll} ref={scrollToTheLastItemRef}>
        <ul className={css.checkoutPartList}>
          {checkouts.map((checkout, index) => (
            <li key={index} className={css.checkoutItem}>
              {isEditing === index ? (
                <div className={css.infoPart}>
                  <div className={css.selectAndArrow}>
                    {/* <select
                      name="name"
                      id=""
                      className={`${css.editInfo} ${css.infoName}`}
                    >
                      <option value="1">Блудов</option>
                      <option value="2">Блудов</option>
                      <option value="3">Блудов</option>
                    </select>
                    <BsFillCaretDownFill className={css.icon} />*/}
                    <input
                      value={checkout.name}
                      onChange={(e) => handleChangeName(e.target.value, index)}
                      className={`${css.editInput} ${css.infoName}`}
                      ref={inputFocusRef}
                    />
                  </div>

                  <div className={css.selectAndArrow}>
                    <select
                      name="currency"
                      id=""
                      className={`${css.editInfo} ${css.infoCurrency}`}
                      onClick={() => toggleDropdown(1)}
                    >
                      <option value="">грн</option>
                      <option value="">грн</option>
                      <option value="">грн</option>
                    </select>
                    <BsFillCaretDownFill
                      className={clsx(css.icon, {
                        [css.rotated]: activeDropdown === 1,
                      })}
                    />
                  </div>

                  <div className={css.selectAndArrow}>
                    <select
                      name="entrepreneur"
                      id=""
                      className={`${css.editInfo} ${css.infoEnt}`}
                      onClick={() => toggleDropdown(2)}
                    >
                      <option value="">ФОП Блудов</option>
                      <option value="">ФОП Блудов</option>
                      <option value="">ФОП Блудов</option>
                    </select>
                    <BsFillCaretDownFill
                      className={clsx(css.icon, {
                        [css.rotated]: activeDropdown === 2,
                      })}
                    />
                  </div>

                  <div className={css.selectAndArrow}>
                    <select
                      name=" warehouse"
                      id=""
                      className={`${css.editInfo} ${css.infoWh}`}
                      onClick={() => toggleDropdown(3)}
                    >
                      <option value="">Склад Черкаси</option>
                      <option value="">Склад Черкаси</option>
                      <option value="">Склад Черкаси</option>
                    </select>
                    <BsFillCaretDownFill
                      className={clsx(css.icon, {
                        [css.rotated]: activeDropdown === 3,
                      })}
                    />
                  </div>

                  <div className={css.selectAndArrow}>
                    <select
                      name="responsible"
                      id=""
                      className={`${css.editInfo} ${css.infoResp}`}
                      onClick={() => toggleDropdown(4)}
                    >
                      <option value="">Відповідальний ПІБ</option>
                      <option value="">Відповідальний ПІБ</option>
                      <option value="">Відповідальний ПІБ</option>
                    </select>
                    <BsFillCaretDownFill
                      className={clsx(css.icon, {
                        [css.rotated]: activeDropdown === 4,
                      })}
                    />
                  </div>
                </div>
              ) : (
                <div className={css.infoPart}>
                  <p className={`${css.info} ${css.infoName}`}>
                    {checkout.name}
                  </p>
                  <p className={`${css.info} ${css.infoCurrency}`}>
                    {checkout.currency}
                  </p>
                  <p className={`${css.info} ${css.infoEnt}`}>
                    {checkout.entrepreneur}
                  </p>
                  <p className={`${css.info} ${css.infoWh}`}>
                    {checkout.warehouse}
                  </p>
                  <p className={`${css.info} ${css.infoResp}`}>
                    {checkout.responsible}
                  </p>
                </div>
              )}

              <SwitchableBtns
                onEdit={() => handleEditing(index)}
                onDelete={() => deleteCheckout(index)}
                onToggleDisable={() => toDisable(index)}
                isDisabled={checkout.isDisabled}
                isEditing={isEditing}
                id={index}
                showIconSave={true}
                onRepeal={() => handleRepeal(index)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={css.addBox}>
        <input
          placeholder="Додати нову касу..."
          className={css.addInput}
          value={newRow}
          onChange={(e) => setNewRow(e.target.value)}
        />
        <button type="button" className={css.addBtn} onClick={handleAdd}>
          <span className={css.plus}>
            <BsPlusLg className={css.iconPlus} />
          </span>
          Додати
        </button>
      </div>
    </div>
  );
}
