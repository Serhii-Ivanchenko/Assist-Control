import { useState } from "react";
import css from "./RecordBtnInfo.module.css";
import clsx from "clsx";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function RecordBtnInfo({ recordInfo, item }) {
  const [appealMsgToShow, setAppealMsgToShow] = useState(true);
  const [diagnostic, setDiagnostic] = useState("spareParts");
  const changeAppealMsg = (value) =>
    setAppealMsgToShow((prev) => (value !== prev ? value : prev));
  return (
    <div className={css.recordBtnInfoWrapper}>
      {item.appeal && recordInfo === "appeal" && (
        <div className={css.infoWrapper}>
          <div className={css.infoBtnWrapper}>
            <button
              className={clsx(
                css.infoBtn,
                !appealMsgToShow && css.nonActiveBtn
              )}
              onClick={() => changeAppealMsg(true)}
            >
              Клієнт
            </button>
            <button
              className={clsx(css.infoBtn, appealMsgToShow && css.nonActiveBtn)}
              onClick={() => changeAppealMsg(false)}
            >
              Менеджер
            </button>
          </div>
          {appealMsgToShow ? (
            <div className={css.clientMsg}>{item.appeal.client}</div>
          ) : (
            <div className={css.wrapperOfComent}>{item.appeal.menager}</div>
          )}
        </div>
      )}
      {recordInfo === "diagnostic" && item.diagnostic && (
        <div className={css.infoWrapper}>
          <div className={css.infoBtnWrapper}>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "spareParts" && css.nonActiveBtn
              )}
              onClick={() => setDiagnostic("spareParts")}
            >
              Запчастини
            </button>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "PhotoOfBreakdown" && css.nonActiveBtn
              )}
              onClick={() => setDiagnostic("PhotoOfBreakdown")}
            >
              Фото поломки
            </button>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "comment" && css.nonActiveBtn
              )}
              onClick={() => setDiagnostic("comment")}
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
                      <TableCell>№</TableCell>
                      <TableCell>Назва</TableCell>
                      <TableCell>Номер</TableCell>
                      <TableCell>Стан</TableCell>
                      <TableCell>Рекомендація</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.diagnostic.spareParts.map((item) => (
                      <TableRow key={`${Math.random()}`}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.number}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell>{item.recomendation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          {diagnostic === "PhotoOfBreakdown" && <div></div>}
          {diagnostic === "comment" && (
            <div className={css.wrapperOfComent}>{item.diagnostic.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
