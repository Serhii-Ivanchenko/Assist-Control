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

export default function SavedInfoTable() {
  const [diagnostic, setDiagnostic] = useState("spareParts");

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
            <TableContainer component={Paper}>
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
                  {/* {diagnostics.spareParts.map((item) => ( */}
                  <TableRow key={`${Math.random()}`}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    {/* <TableCell></TableCell> */}
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  {/* ))} */}
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
                <img src="" alt="car" className={css.img} />
                <span
                  className={css.iconBox}
                  //   onClick={() => deletePhotos(index)}
                >
                  {/* <BsTrash className={css.icon} size={18} /> */}
                </span>
              </li>
              {/* ))} */}
            </ul>
          </div>
        )}
        {diagnostic === "comment" && (
          <div className={css.wrapperOfComent}></div>
        )}
      </div>
    </div>
  );
}
