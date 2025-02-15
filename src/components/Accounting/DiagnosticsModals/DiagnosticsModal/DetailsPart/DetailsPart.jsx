import { useEffect, useState } from "react";
import css from "./DetailsPart.module.css";
import { BsWrench } from "react-icons/bs";

export default function DetailsPart({
  title,
  togglePoints,
  setChosenSpares,
  chosenSpares,
}) {
  const [spares, setSpares] = useState([]);

  useEffect(() => {
    const newSparesArray = togglePoints.map((spare) => ({
      ...spare,
      parts: spare.parts.map((part) => ({
        ...part,
        isChosenLeft: false,
        isChosenRight: false,
      })),
    }));
    setSpares(newSparesArray);
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
        return selected;
      })
    );

    setChosenSpares(selectedSpares);
  }, [spares, setChosenSpares]);

  useEffect(() => {
    console.log("spares", spares);
    console.log("chosenSpares", chosenSpares);
  }, [spares, chosenSpares]);

  return (
    <>
      <div className={css.title}>
        <p className={css.name}>{title}</p>
        <p className={`${css.sides} ${css.sideL}`}>Л</p>
        <p className={css.sides}>П</p>
      </div>
      <ul className={css.detailsList}>
        {spares.map((cat) =>
          cat.name === title
            ? cat.parts.map((category, index) => (
                <li className={css.detailsItem} key={index}>
                  <p className={css.subcategoryName}>{category.name}</p>
                  <div className={css.buttons}>
                    <button
                      type="button"
                      className={`${css.btn} ${
                        category.isChosenLeft && css.btnRed
                      }`}
                      onClick={() => {
                        toggleSpareSelection(category.part_id, "isChosenLeft");
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
                        toggleSpareSelection(category.part_id, "isChosenRight");
                        // handleChosenRight(category.part_id);
                        // handleSaveSpares();
                      }}
                    >
                      {" "}
                      <BsWrench size={18} className={css.icon} />
                    </button>
                  </div>
                </li>
              ))
            : ""
        )}
      </ul>
    </>
  );
}
