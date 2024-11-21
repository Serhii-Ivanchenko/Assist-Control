import { useEffect, useRef, useState } from "react"; // useEffect
import { BsCheckCircleFill, BsPencil, BsFillPrinterFill } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
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
  const [changeRepairInput, setChangeRepairInput] = useState(false);
  const [repairRecords, setRepairRecords] = useState(
    item.repair?.fillOfRepair || []
  );
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
      : "We don't have info about this car"
  );

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (changeRepairInput && firstInputRef.current) {
      firstInputRef.current.focus(); // Встановлюємо фокус на інпут першого рядка
    }
  }, [changeRepairInput]);

  const toggleRepairInput = () => setChangeRepairInput((prev) => !prev);
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
                !appealMsgToShow && css.nonActiveBtn,
                !item.appeal.client && css.disabledBtn
              )}
              onClick={() => changeAppealMsg(true)}
              disabled={!item.appeal.client}
            >
              Клієнт
            </button>
            <button
              className={clsx(
                css.infoBtn,
                appealMsgToShow && css.nonActiveBtn,
                !item.appeal.menager && css.disabledBtn
              )}
              onClick={() => changeAppealMsg(false)}
              disabled={!item.appeal.menager}
            >
              Менеджер
            </button>
          </div>
          {appealMsgToShow
            ? item.appeal.client && (
                <div className={css.clientMsg}>{item.appeal.client}</div>
              )
            : item.appeal.menager && (
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
                diagnostic !== "spareParts" && css.nonActiveBtn,
                !item.diagnostic.spareParts && css.disabledBtn
              )}
              onClick={() => setDiagnostic("spareParts")}
              disabled={!item.diagnostic.spareParts}
            >
              Запчастини
            </button>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "PhotoOfBreakdown" && css.nonActiveBtn,
                !item.diagnostic.PhotoOfBreakdown && css.disabledBtn
              )}
              onClick={() => setDiagnostic("PhotoOfBreakdown")}
              disabled={!item.diagnostic.PhotoOfBreakdown}
            >
              Фото поломки
            </button>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "comment" && css.nonActiveBtn,
                !item.diagnostic.message && css.disabledBtn
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
            {Boolean(repairRecords.length) && (
              <div className={css.repairBtnWrapper}>
                {!changeRepairInput ? (
                  <button
                    className={css.editAndPrintIconWrapper}
                    onClick={() => toggleRepairInput()}
                  >
                    <BsPencil size={16} />
                  </button>
                ) : (
                  <button
                    className={css.editAndPrintIconWrapper}
                    onClick={() => toggleRepairInput()}
                  >
                    <RiSave3Fill size={16} />
                  </button>
                )}
                <button
                  className={css.editAndPrintIconWrapper}
                  onClick={() => window.print()}
                >
                  <BsFillPrinterFill size={16} />
                </button>
              </div>
            )}
          </div>
          {item.repair.fillOfRepair && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className={css.repairTableHeaderRow}>
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
                  {repairRecords.map((recordInfo, index) => {
                    const handleChangeRepairInput = (e) => {
                      const { name, value, id } = e.target;
                      setRepairRecords((prev) =>
                        prev.map((i) =>
                          i.id === id ? { ...i, [name]: value } : i
                        )
                      );
                    };
                    return !changeRepairInput ? (
                      <TableRow
                        className={css.repairTableRow}
                        key={recordInfo.id}
                      >
                        <TableCell
                          className={clsx(
                            css.repairTableCell,
                            css.repairNamedCell
                          )}
                        >
                          <Checkbox
                            checked={recordInfo.isCellChecked}
                            disabled={true}
                            sx={{ height: "100%" }}
                            checkedIcon={<BsCheckCircleFill size={18} />}
                            className={clsx(
                              css.repairTableCheckBox,
                              !recordInfo.isCellChecked &&
                                css.nonCheckedCheckBox
                            )}
                          />
                          {recordInfo.nameOfDetail}
                        </TableCell>
                        <TableCell className={css.priceCell}>
                          {recordInfo.priceOfDetail}
                        </TableCell>
                        <TableCell className={css.repairNamedCell}>
                          {recordInfo.repairName}
                        </TableCell>
                        <TableCell className={css.priceCell}>
                          {recordInfo.repairPrice}
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow
                        className={css.repairTableRow}
                        key={recordInfo.id}
                      >
                        <TableCell
                          className={clsx(
                            css.repairTableCell,
                            css.repairNamedCell
                          )}
                        >
                          <Checkbox
                            checked={recordInfo.isCellChecked}
                            disabled={true}
                            sx={{ height: "100%" }}
                            checkedIcon={<BsCheckCircleFill size={18} />}
                            className={clsx(
                              css.repairTableCheckBox,
                              !recordInfo.isCellChecked &&
                                css.nonCheckedCheckBox
                            )}
                          />
                          <input
                            ref={index === 0 ? firstInputRef : null}
                            className={css.editInput}
                            id={recordInfo.id}
                            name="nameOfDetail"
                            onChange={handleChangeRepairInput}
                            value={recordInfo.nameOfDetail}
                            style={{ width: "180px" }}
                          />
                        </TableCell>
                        <TableCell className={css.priceCell}>
                          <input
                            className={css.editInput}
                            id={recordInfo.id}
                            name="priceOfDetail"
                            onChange={handleChangeRepairInput}
                            value={recordInfo.priceOfDetail}
                            style={{ width: "80px", textAlign: "center" }}
                          />
                        </TableCell>
                        <TableCell className={css.repairNamedCell}>
                          <input
                            className={css.editInput}
                            id={recordInfo.id}
                            name="repairName"
                            onChange={handleChangeRepairInput}
                            value={recordInfo.repairName}
                            style={{ width: "180px" }}
                          />
                        </TableCell>
                        <TableCell className={css.priceCell}>
                          <input
                            className={css.editInput}
                            id={recordInfo.id}
                            name="repairPrice"
                            onChange={handleChangeRepairInput}
                            value={recordInfo.repairPrice}
                            style={{ width: "80px", textAlign: "center" }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow className={css.footerRow}>
                    <TableCell>Загальна вартість:</TableCell>
                    <TableCell className={css.priceCell}>
                      {repairRecords.reduce(
                        (sum, i) =>
                          sum +
                          (Number(i.priceOfDetail) || 0) +
                          (Number(i.repairPrice) || 0),
                        0
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}
    </div>
  );
}
