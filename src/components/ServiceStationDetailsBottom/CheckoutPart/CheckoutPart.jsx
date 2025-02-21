import { useState } from "react";
import SwitchableBtns from "../../sharedComponents/SwitchableBtns/SwitchableBtns";
import css from "./CheckoutPart.module.css";
import { BsPlusLg } from "react-icons/bs";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectAllCashregisters } from "../../../redux/settings/selectors";
import { useDispatch } from "react-redux";
import {
  createCashRegister,
  deleteCashRegister,
  getAllCashRegisters,
  updateCashRegister,
  updateCashRegisterStatus,
} from "../../../redux/settings/operations";
import toast from "react-hot-toast";
import CustomSelect from "./CustomSelect/CustomSelect";

const currencyOptions = [
  { value: "UAH ₴", label: "UAH ₴" },
  { value: "USD $", label: "USD $" },
  { value: "EUR €", label: "EUR €" },
  // { value: "грн", label: "грн" },
];

const entrepreneurOptions = [
  { value: "TOB Назва", label: "TOB Назва" },
  { value: "ФОП Назва", label: "ФОП Назва" },
  { value: "ФОП Блудов", label: "ФОП Блудов" },
  // { value: "грн", label: "грн" },
];

const warehouseOptions = [
  { value: "Назва складу", label: "Назва складу" },
  { value: "Склад Черкаси", label: "Склад Черкаси" },
  { value: "Склад Київ", label: "Склад Київ" },
  // { value: "грн", label: "грн" },
];

const responsibleOptions = [
  { value: "Відповідальний Ваня ", label: "Відповідальний Ваня" },
  { value: "Відповідальний Саша", label: "Відповідальний Саша" },
  { value: "Відповідальний Даня", label: "Відповідальний Даня" },
  // { value: "грн", label: "грн" },
];

export default function CheckoutPart() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const checkouts = useSelector(selectAllCashregisters);

  const [newRow, setNewRow] = useState("");
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [editedValue, setEditedValue] = useState({});
  const [currencyValue, setCurrencyValue] = useState(null);
  const [warehouseValue, setWarehouseValue] = useState(null);
  const [responsibleValue, setResponsibleValue] = useState(null);
  const [entrepreneurValue, setEntrepreneurValue] = useState(null);
  const isFirstDataLoad = useRef(true);
  const [checkoutsLength, setCheckoutsLength] = useState(checkouts.length);
  const inputFocusRef = useRef();
  const scrollToTheLastItemRef = useRef();
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);
  const [isOpenWarehouse, setIsOpenWarehouse] = useState(false);
  const [isOpenResponsible, setIsOpenResponsible] = useState(false);
  const [isOpenEntrepreneur, setIsOpenEntrepreneur] = useState(false);

  const handleEditing = (id) => {
    const checkoutToEdit = checkouts.find((item) => item.id === id);
    setEditedValue((prev) => ({
      ...prev,
      [id]: checkoutToEdit.name,
    }));
    setIsEditing(isEditing === id ? null : id);
  };

  useEffect(() => {
    if (isEditing !== null && inputFocusRef.current) {
      inputFocusRef.current.focus();
    }
  }, [isEditing]);

  const deleteCheckout = (id) => {
    dispatch(deleteCashRegister(id))
      .unwrap()
      .then(() => {
        toast.success("Успішно видалено :)", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Щось пішло не так :(", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      });
  };

  const toDisable = (cash_register_id, status) => {
    const newStatus = status === 0 ? 1 : 0;
    dispatch(updateCashRegisterStatus({ cash_register_id, status: newStatus }))
      .unwrap()
      .then(() => {
        toast.success("Статус успішно змінено :)", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Щось пішло не так :(", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      });
    console.log("cash_register_id", cash_register_id);
    console.log("newStatus", newStatus);
  };

  const handleAdd = () => {
    if (newRow.trim()) {
      const dataToAdd = {
        name: newRow,
        currency: "UAH ₴",
        entrepreneur: "ФОП Назва",
        warehouse: "Склад Назва",
        responsible: "Відповідальний ПІБ",
        status: 1,
      };
      dispatch(createCashRegister(dataToAdd))
        .unwrap()
        .then(() => {
          dispatch(getAllCashRegisters());
          setNewRow("");
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    }
  };

  // useEffect(() => {
  //   if (checkouts.length > 0) {
  //     scrollToTheLastItemRef.current?.scrollTo({
  //       top: scrollToTheLastItemRef.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [checkouts]);

  useEffect(() => {
    if (isFirstDataLoad.current && checkouts.length > 0) {
      isFirstDataLoad.current = false;
      setCheckoutsLength(checkouts.length);
      return;
    }

    if (checkouts.length > checkoutsLength) {
      requestAnimationFrame(() => {
        scrollToTheLastItemRef.current?.scrollTo({
          top: scrollToTheLastItemRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
    setCheckoutsLength(checkouts.length);
  }, [checkouts, checkoutsLength]);

  const handleChangeName = (newName, id) => {
    setEditedValue((prev) => ({
      ...prev,
      [id]: newName,
    }));
  };

  const handleUpdate = (id) => {
    const checkout = checkouts.find((item) => item.id === id);
    if (!checkout) {
      console.error("Checkout not found for id:", id);
      return;
    }

    const updatedCashRegister = {
      id: checkout.id,
      name: editedValue[id] || checkout.name,
      currency: currencyValue?.value || checkout.currency,
      entrepreneur: entrepreneurValue?.value || checkout.entrepreneur,
      warehouse: warehouseValue?.value || checkout.warehouse,
      responsible: responsibleValue?.value || checkout.responsible,
      status: checkout.status,
    };

    const isChanged = Object.keys(updatedCashRegister).some(
      (key) => updatedCashRegister[key] !== checkout[key]
    );

    if (!isChanged) {
      console.log("Дані не змінилися, запит не відправляється.");
      setIsEditing(null);
      return;
    }
    // console.log("currencyValue", currencyValue);
    console.log("updatedCashRegister", updatedCashRegister);
    dispatch(
      updateCashRegister({ cash_register_id: id, ...updatedCashRegister })
    )
      .unwrap()
      .then(() => {
        // Отримуємо всі каси після оновлення
        dispatch(getAllCashRegisters())
          .unwrap()
          .then(() => {
            toast.success("Касу успішно оновлено :)", {
              position: "top-center",
              duration: 3000,
              style: {
                background: "var(--bg-input)",
                color: "var(--white)FFF",
              },
            });
            setIsEditing(null);
          });
      })
      .catch((error) => {
        console.error("Error updating cash register:", error);
        toast.error("Щось пішло не так :(", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      });
  };

  const handleRepeal = () => {
    // if (editedValue && editedValue.index !== undefined) {
    //   setCheckouts(
    //     checkouts.map((checkout, index) =>
    //       index === editedValue.index
    //         ? { ...checkout, name: editedValue.name }
    //         : checkout
    //     )
    //   );
    setIsEditing(null);
    // }
  };

  return (
    <div className={css.checkoutPart}>
      <div
        className={`${css.divForScroll} ${
          (isOpenCurrency ||
            isOpenEntrepreneur ||
            isOpenResponsible ||
            isOpenWarehouse) &&
          css.divForScrollForEditing
        }`}
        ref={scrollToTheLastItemRef}
      >
        <ul className={css.checkoutPartList}>
          {checkouts.map((checkout, index) => (
            <li key={index} className={css.checkoutItem}>
              {isEditing === checkout.id ? (
                <div className={css.infoPart}>
                  <div className={css.selectAndArrow}>
                    <input
                      value={editedValue[checkout.id]}
                      onChange={(e) =>
                        handleChangeName(e.target.value, checkout.id)
                      }
                      className={`${css.editInput} ${css.infoName}`}
                      ref={inputFocusRef}
                    />
                  </div>

                  <div className={css.selectAndArrow}>
                    <CustomSelect
                      options={currencyOptions}
                      chosenOption={checkout.currency}
                      width={css.infoCurrency}
                      setSelectedValue={setCurrencyValue}
                      selectedValue={currencyValue}
                      isOpen={isOpenCurrency}
                      setIsOpen={setIsOpenCurrency}
                      containerRef={scrollToTheLastItemRef}
                    />
                  </div>

                  <div className={css.selectAndArrow}>
                    <CustomSelect
                      options={entrepreneurOptions}
                      chosenOption={checkout.entrepreneur}
                      width={css.infoEnt}
                      setSelectedValue={setEntrepreneurValue}
                      selectedValue={entrepreneurValue}
                      isOpen={isOpenEntrepreneur}
                      setIsOpen={setIsOpenEntrepreneur}
                      containerRef={scrollToTheLastItemRef}
                    />
                  </div>

                  <div className={css.selectAndArrow}>
                    <CustomSelect
                      options={warehouseOptions}
                      chosenOption={checkout.warehouse}
                      width={css.infoWh}
                      setSelectedValue={setWarehouseValue}
                      selectedValue={warehouseValue}
                      isOpen={isOpenWarehouse}
                      setIsOpen={setIsOpenWarehouse}
                      containerRef={scrollToTheLastItemRef}
                    />
                  </div>

                  <div className={css.selectAndArrow}>
                    <CustomSelect
                      options={responsibleOptions}
                      chosenOption={checkout.responsible}
                      width={css.infoResp}
                      setSelectedValue={setResponsibleValue}
                      selectedValue={responsibleValue}
                      isOpen={isOpenResponsible}
                      setIsOpen={setIsOpenResponsible}
                      containerRef={scrollToTheLastItemRef}
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
                onEdit={() => handleEditing(checkout.id)}
                onSave={() => handleUpdate(checkout.id)}
                onDelete={() => deleteCheckout(checkout.id)}
                onToggleDisable={() => toDisable(checkout.id, checkout.status)}
                isDisabled={checkout.status}
                isEditing={isEditing}
                id={checkout.id}
                showIconSave={true}
                onRepeal={() => handleRepeal(index)}
                text={`касу ${checkout.name}`}
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
