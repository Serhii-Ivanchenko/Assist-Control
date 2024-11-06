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
              <TableContainer
                sx={{
                  borderRadius: "0px",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  backgroundColor: "var(--bg-input)",
                  border: "1px solid #d8e1ff40",
                  borderBottom: "none",
                }}
                component={Paper}
              >
                <Table sx={{}}>
                  <TableHead>
                    <TableRow
                      sx={{
                        background: "var(--main-gray)",
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "var(--white)",
                          outline: "#d8e1ff40",
                          borderTopLeftRadius: "8px",
                          padding: "6px 0 6px 10px",
                          border: "none",
                          borderRight: "1px solid #d8e1ff40",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                        align="left"
                      >
                        №
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "var(--white)",
                          outline: "#d8e1ff40",
                          border: "none",
                          borderRight: "1px solid #d8e1ff40",
                          padding: "6px 0 6px 0",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Назва
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "var(--white)",
                          outline: "#d8e1ff40",
                          border: "none",
                          borderRight: "1px solid #d8e1ff40",
                          padding: "6px 0 6px 0",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Номер
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "var(--white)",
                          outline: "#d8e1ff40",
                          border: "none",
                          borderRight: "1px solid #d8e1ff40",
                          padding: "6px 0 6px 0",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Стан
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "var(--white)",
                          outline: "#d8e1ff40",
                          border: "none",
                          padding: "6px 0 6px 0",
                          borderTopRightRadius: "8px",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Рекомендація
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.diagnostic.spareParts.map((item) => (
                      <TableRow key={`${Math.random()}`}>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            color: "var(--white)",
                            outline: "#d8e1ff40",
                            border: "none",
                            borderRight: "1px solid #d8e1ff40",
                            borderBottom: "1px solid #d8e1ff40",
                            padding: "6px 0 6px 15px",
                          }}
                          align="left"
                        >
                          {item.id}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            color: "var(--white)",
                            outline: "#d8e1ff40",
                            border: "none",
                            borderRight: "1px solid #d8e1ff40",
                            borderBottom: "1px solid #d8e1ff40",
                            padding: "6px 0 6px 0",
                          }}
                          align="center"
                        >
                          {item.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            color: "var(--white)",
                            outline: "#d8e1ff40",
                            border: "none",
                            borderRight: "1px solid #d8e1ff40",
                            borderBottom: "1px solid #d8e1ff40",
                            padding: "6px 0 6px 0",
                          }}
                          align="center"
                        >
                          {item.number}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            color: "var(--white)",
                            outline: "#d8e1ff40",
                            border: "none",
                            borderRight: "1px solid #d8e1ff40",
                            borderBottom: "1px solid #d8e1ff40",
                            padding: "6px 0 6px 0",
                          }}
                          align="center"
                        >
                          {item.state}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            color: "var(--white)",
                            outline: "#d8e1ff40",
                            border: "none",
                            borderBottom: "1px solid #d8e1ff40",
                            padding: "6px 0 6px 0",
                          }}
                          align="center"
                        >
                          {item.recomendation}
                        </TableCell>
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
