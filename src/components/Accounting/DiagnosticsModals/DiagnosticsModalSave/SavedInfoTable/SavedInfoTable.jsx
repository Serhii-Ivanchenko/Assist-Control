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

export default function SavedInfoTable({ chosenSpares }) {
  const [diagnostic, setDiagnostic] = useState("spareParts");

  const chosenSparesWithSides = chosenSpares.map((spare) => ({
    ...spare,
    name: `${spare.name} ${spare.side === "left" ? "(лівий)" : "(правий)"}`,
  }));

  return (
    <div className={css.tableWrapper}>
      {/* <p>SavedInfoTable</p> */}
      <div className={css.infoWrapper}>
        <div className={css.infoBtnWrapper}>
          <button
            // className={clsx(
            //   css.infoBtn
            //   // diagnostic !== "spareParts" && css.nonActiveBtn,
            //   // !diagnostics.spareParts && css.disabledBtn
            // )}
            className={clsx(css.infoBtn, {
              [css.nonActiveBtn]: diagnostic === "spareParts",
            })}
            onClick={() => setDiagnostic("spareParts")}
            // disabled={!diagnostics.spareParts}
          >
            Запчастини
          </button>
          <button
            // className={clsx(
            //   css.infoBtn
            //   // diagnostic !== "PhotoOfBreakdown" && css.nonActiveBtn,
            //   // !diagnostics.photoOfBreakdown && css.disabledBtn
            // )}
            className={clsx(css.infoBtn, {
              [css.nonActiveBtn]: diagnostic === "PhotoOfBreakdown",
            })}
            onClick={() => setDiagnostic("PhotoOfBreakdown")}
            // disabled={!diagnostics.photoOfBreakdown}
          >
            Фото поломки
          </button>
          <button
            // className={clsx(
            //   css.infoBtn
            //   // diagnostic !== "comment" && css.nonActiveBtn,
            //   // !diagnostics.message && css.disabledBtn
            // )}
            className={clsx(css.infoBtn, {
              [css.nonActiveBtn]: diagnostic === "comment",
            })}
            onClick={() => setDiagnostic("comment")}
            // disabled={!diagnostics.message}
          >
            Коментар механіка
          </button>
        </div>
        {diagnostic === "spareParts" && (
          <div className={css.sparePartsTableWrapper}>
            <TableContainer
              component={Paper}
              style={{ maxHeight: "225px", overflow: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={css.firstHeaderCell}>№</TableCell>
                    <TableCell>Назва</TableCell>
                    {/* <TableCell>Номер</TableCell> */}
                    <TableCell>Стан</TableCell>
                    <TableCell>Рекомендація</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chosenSparesWithSides.map((item, index) => (
                    <TableRow
                      key={`${Math.random()}`}
                      // style={{ display: "table", width: "100%" }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      {/* <TableCell></TableCell> */}
                      <TableCell>Критично</TableCell>
                      <TableCell>Не вказано</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
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
