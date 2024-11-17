import { useEffect, useState } from "react";
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
  const [changeRepairInput, setChangeRepairInput] = useState(false);
  const [repairRecords, setRepairRecords] = useState([]);
  useEffect(() => {
    if (item.repair) {
      setRepairRecords(() => {
        return [{ index: item.index, repair: item.repair }];
      });
    }
    return () => {
      setRepairRecords({});
    };
  }, []);
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
  const toggelRepairInput = () => setChangeRepairInput((prev) => !prev);
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
            <div className={css.repairBtnWrapper}>
              <div
                className={css.editAndPrintIconWrapper}
                onClick={() => toggelRepairInput()}
              >
                <BsPencil size={13} />
              </div>
              <div
                className={css.editAndPrintIconWrapper}
                onClick={() => window.print()}
              >
                <BsFillPrinterFill size={13} />
              </div>
            </div>
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
                  {repairRecords.map((i) => {
                    return i.repair.fillOfRepair.map((recordInfo) => {
                      const handleChangeRepairInput = (e) => {
                        const { name, value } = e.target;
                        console.log("====================================");
                        console.log("name:", name, "value:", value);
                        console.log("====================================");
                        // setRepairRecords((prev) => {
                        //   return prev.map((recordItem) => {
                        //     if (recordInfo.repair) {
                        //       return recordItem.repair.fillOfRepair.map(
                        //         (detailItem) =>
                        //           detailItem.index === id
                        //             ? { ...detailItem, [name]: value }
                        //             : detailItem
                        //       );
                        //     }
                        //   });
                        // });
                      };
                      return !changeRepairInput ? (
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
                          key={`${Math.random()}`}
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
                              id={i.index}
                              name="nameOfDetail"
                              onChange={(e) => handleChangeRepairInput(e)}
                              value={recordInfo.nameOfDetail}
                            />
                          </TableCell>
                          <TableCell className={css.priceCell}>
                            <input
                              id={i.index}
                              name="priceOfDetail"
                              onChange={(e) => handleChangeRepairInput(e)}
                              value={recordInfo.priceOfDetail}
                              style={{ width: "80px", textAlign: "center" }}
                            />
                          </TableCell>
                          <TableCell className={css.repairNamedCell}>
                            <input
                              id={i.index}
                              name="repairName"
                              onChange={(e) => handleChangeRepairInput(e)}
                              value={recordInfo.repairName}
                            />
                          </TableCell>
                          <TableCell className={css.priceCell}>
                            <input
                              id={i.index}
                              name="repairPrice"
                              onChange={(e) => handleChangeRepairInput(e)}
                              value={recordInfo.repairPrice}
                              style={{ width: "80px", textAlign: "center" }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    });
                  })}
                  <TableRow className={css.footerRow}>
                    <TableCell>Загальна вартість:</TableCell>
                    {!changeRepairInput ? (
                      <TableCell className={css.priceCell}>
                        {item.repair.repairSum}
                      </TableCell>
                    ) : (
                      <TableCell className={css.priceCell}>
                        <input
                          style={{ width: "80px", textAlign: "center" }}
                          defaultValue={item.repair.repairSum}
                        />
                      </TableCell>
                    )}
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
