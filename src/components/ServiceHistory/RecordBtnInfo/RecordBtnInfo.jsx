import { useState } from "react";
import { BsCheckCircleFill, BsPencil, BsFillPrinterFill } from "react-icons/bs";
import css from "./RecordBtnInfo.module.css";
import clsx from "clsx";
import {
  Checkbox,
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
  const [diagnostic, setDiagnostic] = useState(
    !item.diagnostic
      ? null
      : item.diagnostic.spareParts
      ? "spareParts"
      : item.diagnostic.PhotoOfBreakdown
      ? "PhotoOfBreakdown"
      : item.diagnostic.comment
      ? "comment"
      : "We dont have info about this car"
  );
  const changeAppealMsg = (value) =>
    setAppealMsgToShow((prev) => (value !== prev ? value : prev));
  return (
    <div className={css.recordBtnInfoWrapper}>
      {/* ЗВЕРНЕННЯ */}
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
      {/* ДІАГНОСТИКА */}
      {recordInfo === "diagnostic" && item.diagnostic && (
        <div className={css.infoWrapper}>
          <div className={css.infoBtnWrapper}>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "spareParts" && css.nonActiveBtn
              )}
              onClick={() => setDiagnostic("spareParts")}
              disabled={!item.diagnostic.spareParts}
            >
              Запчастини
            </button>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "PhotoOfBreakdown" && css.nonActiveBtn
              )}
              onClick={() => setDiagnostic("PhotoOfBreakdown")}
              disabled={!item.diagnostic.PhotoOfBreakdown}
            >
              Фото поломки
            </button>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "comment" && css.nonActiveBtn
              )}
              onClick={() => setDiagnostic("comment")}
              disabled={!item.diagnostic.message}
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
      {/* РЕМОНТ */}
      {recordInfo === "repair" && (
        <div className={css.repairWrapper}>
          <div className={css.repairHeader}>
            <p className={css.repairTitle}>Запчастини + робота</p>
            <div className={css.repairBtnWrapper}>
              <div className={css.editAndPrintIconWrapper}>
                <BsPencil size={13} />
              </div>
              <div className={css.editAndPrintIconWrapper}>
                <BsFillPrinterFill size={13} />
              </div>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={css.repairTableHeaderCell}>
                    Запчастини
                  </TableCell>
                  <TableCell className={css.priceCell}>Вартість</TableCell>
                  <TableCell className={css.repairTableHeaderCell}>
                    Робота
                  </TableCell>
                  <TableCell className={css.priceCell}>Вартість</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.repair.fillOfRepair.map((item) => {
                  return (
                    <TableRow
                      className={css.repairTableRow}
                      key={`${Math.random()}`}
                    >
                      <TableCell
                        className={clsx(
                          css.repairTableCell,
                          css.repairNamedCell
                        )}
                      >
                        <Checkbox
                          checked={item.isCellChecked}
                          disabled={true}
                          sx={{ height: "100%" }}
                          checkedIcon={<BsCheckCircleFill size={18} />}
                          className={clsx(
                            css.repairTableCheckBox,
                            !item.isCellChecked && css.nonCheckedCheckBox
                          )}
                        />
                        {item.nameOfDetail}
                      </TableCell>
                      <TableCell className={css.priceCell}>
                        {item.priceOfDetail}
                      </TableCell>
                      <TableCell className={css.repairNamedCell}>
                        {item.repairName}
                      </TableCell>
                      <TableCell className={css.priceCell}>
                        {item.repairPrice}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className={css.footerRow}>
                  <TableCell>Загальна вартість</TableCell>
                  <TableCell className={css.priceCell}>
                    {item.repair.repairSum}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
