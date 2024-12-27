import css from "./InvoicesPart.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsPlusCircleDotted } from "react-icons/bs";
import InvoicesList from "./InvoicesList/InvoicesList";
import car from "../../assets/images/carsItem.png";
import { useSelector } from "react-redux";
import { selectVisibilityInvoices } from "../../redux/visibility/selectors";
import clsx from "clsx";
import { categoryNameMapping } from "../../utils/dataToRender";
import { useState } from "react";
import InvoicesColumnPopup from "./InvoicesColumnPopup/InvoicesColumnPopup";
import { useRef } from "react";
import { useEffect } from "react";

export default function InvoicesPart({ categories }) {
  const visibility = useSelector(selectVisibilityInvoices);

  const invoices = [
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
      status: "completed",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
      status: "completed",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
      status: "completed",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
      status: "completed",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
      status: "completed",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
      status: "completed",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
      status: "completed",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
      status: "completed",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
      status: "completed",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
      status: "completed",
    },
  ];

  const invoicesMoney = [
    {
      date: "19.12.28",
      distributorName: "Elit",
      amount: "8000 грн",
      status: "completed",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
      status: "pending",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
      status: "pending",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
      status: "completed",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
      status: "completed",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
      status: "pending",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
      status: "completed",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
      status: "completed",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
      status: "pending",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
      status: "completed",
    },
  ];

  const sold = [
    {
      photo: "",
      date: "19.12.24",
      name: "Клієнт 1",
      amount: "8000 грн",
      status: "completed",
    },
    {
      photo: "",
      date: "19.12.24",
      name: "Клієнт 1",
      amount: "8000 грн",
      status: "completed",
    },
    {
      photo: car,
      date: "19.12.24",
      name: "Клієнт 1",
      amount: "8000 грн",
      status: "rejected",
    },
    {
      photo: "",
      date: "19.12.24",
      name: "Клієнт 1",
      amount: "8000 грн",
      status: "rejected",
    },
    {
      photo: car,
      date: "19.12.24",
      name: "Клієнт 1",
      amount: "8000 грн",
      status: "pending",
    },
    {
      photo: car,
      date: "19.12.24",
      name: "Клієнт 1",
      amount: "8000 грн",
      status: "completed",
    },
  ];

  const replacedAndothers = [
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "7000 ",
      currency: "грн",
      status: "completed",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "7000",
      currency: "грн",
      status: "rejected",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "10000",
      currency: "грн",
      status: "pending",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "7000",
      currency: "грн",
      status: "completed",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "9000",
      currency: "грн",
      status: "completed",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "9000",
      currency: "грн",
      status: "pending",
    },

    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "10000",
      currency: "грн",
      status: "rejected",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "7000",
      currency: "грн",
      status: "completed",
    },
  ];

  const categoryMap = {
    Діагностика: invoices,
    Погоджено: invoices,
    Замовлено: invoicesMoney,
    Отримано: invoicesMoney,
    Продано: sold,
    Повернуто: invoicesMoney,
    Переміщено: replacedAndothers,
    Переоцінка: replacedAndothers,
    Інвентаризація: replacedAndothers,
    Списано: replacedAndothers,
  };

  const [openPopup, setOpenPopup] = useState(false);
  const buttonRefs = useRef([]);

  const [filteredDataMap, setFilteredDataMap] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedStatusMap, setSelectedStatusMap] = useState({});
  const [borderColor, setBorderColor] = useState({});

  const handleOpen = (index) => {
    const category = categories[index].name;
    setActiveCategory(openPopup === index ? null : category);
    setOpenPopup(openPopup === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRefs.current &&
        !buttonRefs.current.some((ref) => ref && ref.contains(event.target))
      ) {
        setOpenPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Працюючий варіант
  const showParticularCards = (list, category) => {
    const selectedStatus = selectedStatusMap[category] || [];

    const filteredCards =
      selectedStatus.length === 0 || selectedStatus.includes("")
        ? list
        : list.filter((card) => selectedStatus.includes(card.status));

    setFilteredDataMap((prev) => ({
      ...prev,
      [category]: filteredCards,
    }));

    changeBorderColor(filteredCards, category);
  };

  const changeBorderColor = (list, category) => {
    if (list.some((item) => item.status === "rejected")) {
      setBorderColor((prev) => ({
        ...prev,
        [category]: css.amountMinus,
      }));
    } else if (list.some((item) => item.status === "pending")) {
      setBorderColor((prev) => ({ ...prev, [category]: css.amountDiagnostic }));
    } else if (list.every((item) => item.status === "completed")) {
      setBorderColor((prev) => ({ ...prev, [category]: css.amountGreen }));
    }
  };

  useEffect(() => {
    categories.forEach((category) => {
      const list = categoryMap[category.name] || [];
      showParticularCards(list, category.name);
    });
  }, []);

  useEffect(() => {
    if (activeCategory) {
      const list = categoryMap[activeCategory] || [];
      showParticularCards(list, activeCategory);
    }
  }, [selectedStatusMap, activeCategory]);

  return (
    <div>
      <ul className={css.categoriesList}>
        {categories.map((category, index) => {
          const list = categoryMap[category.name] || [];
          const filteredList = filteredDataMap[category.name] || list;
          const categoryBorderColor = borderColor[category.name];

          const visibilityKey = categoryNameMapping[category.name];
          const isVisible = visibility[visibilityKey];

          return (
            <li
              key={index}
              className={clsx(css.categoriesItem, {
                [css.hidden]:
                  !isVisible ||
                  !categories.some((c) => c.name === category.name),
              })}
            >
              <div
                className={css.titleBox}
                ref={(el) => (buttonRefs.current[index] = el)}
              >
                <p className={css.categoryName}>{category.name}</p>
                <div className={css.amountAndBtnMore}>
                  <span
                    className={`${css.amount} ${categoryBorderColor}
                    `}
                    // ${
                    //   category.name === "Діагностика" && css.amountDiagnostic
                    // } ${
                    //   (category.name === "Списано" ||
                    //     category.name === "Переоцінка" ||
                    //     category.name === "Інвентаризація") &&
                    //   css.amountMinus
                    //   }
                  >
                    {category.name === "Списано" ||
                    category.name === "Переоцінка" ||
                    category.name === "Інвентаризація"
                      ? -1000
                      : 16000}{" "}
                    грн
                  </span>
                  <BsThreeDotsVertical
                    className={css.icon}
                    onClick={() => handleOpen(index)}
                    ref={buttonRefs.current[index]}
                  />
                  {openPopup === index && (
                    <InvoicesColumnPopup
                      // list={list}
                      category={category.name}
                      // setSelectedStatus={setSelectedStatus}
                      // selectedStatus={selectedStatus}
                      selectedStatus={selectedStatusMap[category.name] || []}
                      setSelectedStatusMap={setSelectedStatusMap}
                    />
                  )}
                </div>
              </div>
              <div>
                <InvoicesList
                  category={category.name}
                  // list={list}
                  list={filteredList}
                />
              </div>
              <button type="button" className={css.addBtn}>
                <BsPlusCircleDotted size={18} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
