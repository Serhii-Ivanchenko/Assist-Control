import css from "./SavedInfoTable.module.css";
import clsx from "clsx";
import {
  // Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import car from "../../../../../assets/images/carListImg.webp";
import { BsTrash } from "react-icons/bs";

const recommendation = {
  name: "Ремонт ходової",
  message:
    "Проведено попередній огляд авто. Виявлено деформацію передньогокрила та бампера. Для відновлення геометрії кузова та заміни пошкоджених деталей потрібно приблизно 3 дні. Рекомендую додатково перевірити ходову частину після ремонту. Очікуємо доставку деталей на наступний тиждень, після чого можна буде узгодити точну дату завершення робіт.",
  person: "manager",
  personName: "Шевченко А.В.",
};

export default function SavedInfoTable({ chosenSpares, parts, diagId }) {
  const [diagnostic, setDiagnostic] = useState("spareParts");

  const chosenSparesWithSides = chosenSpares.map((spare) => ({
    ...spare,
    name: `${spare.name} ${
      spare.side === "left"
        ? "(лівий)"
        : spare.side === "right"
        ? "(правий)"
        : " "
    }`,
  }));

  // const spares = diagId ? parts : chosenSparesWithSides;

  return (
    <div className={css.tableWrapper}>
      <div className={css.infoWrapper}>
        <div className={css.infoBtnWrapper}>
          <button
            className={clsx(css.infoBtn, {
              [css.nonActiveBtn]: diagnostic === "spareParts",
            })}
            onClick={() => setDiagnostic("spareParts")}
          >
            Запчастини
          </button>
          <button
            className={clsx(css.infoBtn, {
              [css.nonActiveBtn]: diagnostic === "PhotoOfBreakdown",
            })}
            onClick={() => setDiagnostic("PhotoOfBreakdown")}
          >
            Фото поломки
          </button>
          <button
            className={clsx(css.infoBtn, {
              [css.nonActiveBtn]: diagnostic === "comment",
            })}
            onClick={() => setDiagnostic("comment")}
          >
            Коментар механіка
          </button>
        </div>
        {diagnostic === "spareParts" && (
          <div className={css.sparePartsTableWrapper}>
            <TableContainer
              component={Paper}
              // style={{ maxHeight: "280px", overflow: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={css.firstHeaderCell}>№</TableCell>
                    <TableCell className={css.nameHeaderCell}>Назва</TableCell>
                    {/* <TableCell>Номер</TableCell> */}
                    {/* <TableCell>Стан</TableCell> */}
                    <TableCell className={css.recHeaderCell}>
                      Рекомендація
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Table>
                <div className={css.scrollableBody}>
                  <TableBody style={{ maxHeight: "280px", overflow: "auto" }}>
                    {diagId
                      ? Array.isArray(parts) && parts.length > 0
                        ? parts.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className={css.firstHeaderCell}>
                                {index + 1}
                              </TableCell>
                              <TableCell className={css.nameHeaderCell}>
                                {item.part_name}
                              </TableCell>
                              <TableCell className={css.recHeaderCell}>
                                {item.comment}
                              </TableCell>
                            </TableRow>
                          ))
                        : ""
                      : Array.isArray(chosenSparesWithSides) &&
                        chosenSparesWithSides.length > 0
                      ? chosenSparesWithSides.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className={css.firstHeaderCell}>
                              {index + 1}
                            </TableCell>
                            <TableCell className={css.nameHeaderCell}>
                              {item.name}
                            </TableCell>
                            <TableCell className={css.recHeaderCell}>
                              {"Під заміну"}
                            </TableCell>
                          </TableRow>
                        ))
                      : ""}
                  </TableBody>
                </div>
              </Table>
            </TableContainer>
          </div>
        )}
        {diagnostic === "PhotoOfBreakdown" && (
          <div className={css.divForScroll}>
            <ul className={css.photoList}>
              {/* {photos.map((item, index) => ( */}
              <li className={css.photoItem}>
                <img src={car} alt="car" className={css.img} />
                <span
                  className={css.iconBox}
                  //   onClick={() => deletePhotos(index)}
                >
                  <BsTrash className={css.icon} size={18} />
                </span>
              </li>
              {/* ))} */}
            </ul>
          </div>
        )}
        {diagnostic === "comment" && (
          <div className={css.wrapperOfComent}>{recommendation.message}</div>
        )}
      </div>
    </div>
  );
}
