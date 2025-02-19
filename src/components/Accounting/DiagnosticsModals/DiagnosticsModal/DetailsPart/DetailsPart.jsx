import { useEffect } from "react";
import css from "./DetailsPart.module.css";
import { BsWrench } from "react-icons/bs";

export default function DetailsPart({
  title,
  togglePoints,
  setChosenSpares,
  chosenSpares,
  spares,
  setSpares,
}) {
  useEffect(() => {
    if (spares.length === 0 && togglePoints.length > 0) {
      setSpares((prevSpares) =>
        prevSpares.length > 0
          ? prevSpares
          : togglePoints.map((spare) => ({
              ...spare,
              parts: spare.parts.map((part) =>
                spare.name.includes("Гальма")
                  ? { ...part, isChosenLeft: false, isChosenRight: false }
                  : { ...part, isChosen: false }
              ),
            }))
      );
    }
  }, [togglePoints]);

  const toggleSpareSelection = (id, side) => {
    setSpares((prevSpares) =>
      prevSpares.map((category) => ({
        ...category,
        parts: category.parts.map((spare) =>
          spare.part_id === id
            ? {
                ...spare,
                [side]: !spare[side],
              }
            : spare
        ),
      }))
    );
  };

  useEffect(() => {
    const selectedSpares = spares.flatMap((category) =>
      category.parts.flatMap((part) => {
        const selected = [];
        if (part.isChosenLeft) selected.push({ ...part, side: "left" });
        if (part.isChosenRight) selected.push({ ...part, side: "right" });
        if (part.isChosen) selected.push(part);
        return selected;
      })
    );

    setChosenSpares(selectedSpares);
  }, [spares, setChosenSpares]);

  useEffect(() => {
    console.log("spares", spares);
    console.log("chosenSpares", chosenSpares);
  }, [spares, chosenSpares]);

  const twoBtns = title.includes("Гальма");

  return (
    <>
      <div className={css.title}>
        <p className={`${css.name} ${!twoBtns && css.onlyName}`}>{title}</p>
        {twoBtns && (
          <>
            <p className={`${css.sides} ${css.sideL}`}>Л</p>
            <p className={css.sides}>П</p>
          </>
        )}
      </div>
      <ul className={css.detailsList}>
        {spares.map((cat) =>
          cat.name === title
            ? cat.parts.map((category, index) => (
                <li
                  className={`${css.detailsItem} ${
                    !twoBtns && css.detailsItemFotItemWithOneBtn
                  }`}
                  key={index}
                >
                  <p
                    className={`${css.subcategoryName} ${
                      !twoBtns && css.subcategoryNameWithOneBtn
                    }`}
                  >
                    {category.name}
                  </p>
                  <div className={`${css.buttons} ${!twoBtns && css.btnAlone}`}>
                    {twoBtns ? (
                      <>
                        <button
                          type="button"
                          className={`${css.btn} ${
                            category.isChosenLeft && css.btnRed
                          }`}
                          onClick={() => {
                            toggleSpareSelection(
                              category.part_id,
                              "isChosenLeft"
                            );
                            // handleChosenLeft(category.part_id);
                            // handleSaveSpares();
                          }}
                        >
                          <BsWrench size={18} className={css.icon} />
                        </button>
                        <button
                          type="button"
                          className={`${css.btn} ${
                            category.isChosenRight && css.btnRed
                          }`}
                          onClick={() => {
                            toggleSpareSelection(
                              category.part_id,
                              "isChosenRight"
                            );
                            // handleChosenRight(category.part_id);
                            // handleSaveSpares();
                          }}
                        >
                          {" "}
                          <BsWrench size={18} className={css.icon} />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className={`${css.btn} ${
                          category.isChosen && css.btnRed
                        }`}
                        onClick={() => {
                          toggleSpareSelection(category.part_id, "isChosen");
                          // handleChosenRight(category.part_id);
                          // handleSaveSpares();
                        }}
                      >
                        {" "}
                        <BsWrench size={18} className={css.icon} />
                      </button>
                    )}
                  </div>
                </li>
              ))
            : ""
        )}
      </ul>
    </>
  );
}
