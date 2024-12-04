import { useState } from "react";
import SwitchableBtns from "../../sharedComponents/SwitchableBtns/SwitchableBtns";
import css from "./CheckoutPart.module.css";
import { BsPlusLg } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";

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

  const handleEditing = (index) => {
    setIsEditing(isEditing === index ? null : index);
  };

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

  return (
    <div className={css.checkoutPart}>
      <div className={css.divForScroll}>
        <ul className={css.checkoutPartList}>
          {checkouts.map((checkout, index) => (
            <li key={index} className={css.checkoutItem}>
              {isEditing === index ? (
                <div className={css.infoPart}>
                  <div className={css.selectAndArrow}>
                    <select
                      name="name"
                      id=""
                      className={`${css.editInfo} ${css.infoName}`}
                    >
                      <option value="1">Блудов</option>
                      <option value="2">Блудов</option>
                      <option value="3">Блудов</option>
                    </select>
                    <BsFillCaretDownFill className={css.icon} />
                  </div>

                  <div className={css.selectAndArrow}>
                    <select
                      name="currency"
                      id=""
                      className={`${css.editInfo} ${css.infoCurrency}`}
                    >
                      <option value="">грн</option>
                      <option value="">грн</option>
                      <option value="">грн</option>
                    </select>
                    <BsFillCaretDownFill className={css.icon} />
                  </div>

                  <div className={css.selectAndArrow}>
                    <select
                      name="enterpreneur"
                      id=""
                      className={`${css.editInfo} ${css.infoEnt}`}
                    >
                      <option value="">ФОП Блудов</option>
                      <option value="">ФОП Блудов</option>
                      <option value="">ФОП Блудов</option>
                    </select>
                    <BsFillCaretDownFill className={css.icon} />
                  </div>

                  <div className={css.selectAndArrow}>
                    <select
                      name=" warehouse"
                      id=""
                      className={`${css.editInfo} ${css.infoWh}`}
                    >
                      <option value="">Склад Черкаси</option>
                      <option value="">Склад Черкаси</option>
                      <option value="">Склад Черкаси</option>
                    </select>
                    <BsFillCaretDownFill className={css.icon} />
                  </div>

                  <div className={css.selectAndArrow}>
                    <select
                      name="responsible"
                      id=""
                      className={`${css.editInfo} ${css.infoResp}`}
                    >
                      <option value="">Відповідальний ПІБ</option>
                      <option value="">Відповідальний ПІБ</option>
                      <option value="">Відповідальний ПІБ</option>
                    </select>
                    <BsFillCaretDownFill className={css.icon} />
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
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={css.addBox}>
        <input
          placeholder="Додати нову касу..."
          className={css.addInput}
          //   value={newPost}
          //   onChange={(e) => setNewPost(e.target.value)}
        />
        <button type="button" className={css.addBtn}>
          <span className={css.plus}>
            <BsPlusLg className={css.iconPlus} />
          </span>
          Додати
        </button>
      </div>
    </div>
  );
}
