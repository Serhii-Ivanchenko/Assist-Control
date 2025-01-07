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
import { BsTrash } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa6";
import { GiAutoRepair } from "react-icons/gi";

export default function RecordBtnInfo({
  recordInfo,
  item,
  diagnostics,
  recommendation,
  repair,
}) {
  const [changeRepairInput, setChangeRepairInput] = useState(false);
  const [repairRecords, setRepairRecords] = useState(
    repair?.fillOfRepair || []
  );
  const [appealMsgToShow, setAppealMsgToShow] = useState(true);
  const [diagnostic, setDiagnostic] = useState(
    !diagnostics
      ? null
      : diagnostics.spareParts
      ? "spareParts"
      : diagnostics.PhotoOfBreakdown
      ? "PhotoOfBreakdown"
      : diagnostics.comment
      ? "comment"
      : "We don't have info about this car"
  );

  const [photos, setPhotos] = useState(diagnostics.photoOfBreakdown);
  // console.log("кнопка", recordInfo);
  // console.log("array", diagnostics);

  const deletePhotos = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

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

      {item.appeals &&
        recordInfo === "appeal" &&
        item.appeals.map((appeal, index) => (
          <div className={css.infoWrapper} key={index}>
            <div className={css.infoBtnWrapper}>
              <button
                className={clsx(
                  css.infoBtn,
                  !appealMsgToShow && css.nonActiveBtn,
                  !appeal.dialog && css.disabledBtn
                )}
                onClick={() => changeAppealMsg(true)}
                disabled={!appeal.dialog}
              >
                Клієнт
              </button>
              <button
                className={clsx(
                  css.infoBtn,
                  appealMsgToShow && css.nonActiveBtn,
                  !appeal.manager_response && css.disabledBtn
                )}
                onClick={() => changeAppealMsg(false)}
                disabled={!appeal.manager_response}
              >
                Менеджер
              </button>
            </div>
            {appealMsgToShow
              ? appeal.dialog && (
                  <div className={css.clientMsg}>{appeal.dialog}</div>
                )
              : appeal.manager_response && (
                  <div className={css.wrapperOfComent}>
                    {appeal.manager_response}
                  </div>
                )}
          </div>
        ))}

      {/* ДІАГНОСТИКА */}

      {recordInfo === "diagnostic" && diagnostics && (
        <div className={css.infoWrapper}>
          <div className={css.infoBtnWrapper}>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "spareParts" && css.nonActiveBtn,
                !diagnostics.spareParts && css.disabledBtn
              )}
              onClick={() => setDiagnostic("spareParts")}
              disabled={!diagnostics.spareParts}
            >
              Запчастини
            </button>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "PhotoOfBreakdown" && css.nonActiveBtn,
                !diagnostics.photoOfBreakdown && css.disabledBtn
              )}
              onClick={() => setDiagnostic("PhotoOfBreakdown")}
              disabled={!diagnostics.photoOfBreakdown}
            >
              Фото поломки
            </button>
            <button
              className={clsx(
                css.infoBtn,
                diagnostic !== "comment" && css.nonActiveBtn,
                !diagnostics.message && css.disabledBtn
              )}
              onClick={() => setDiagnostic("comment")}
              disabled={!diagnostics.message}
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
                    {diagnostics.spareParts.map((item) => (
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
          {diagnostic === "PhotoOfBreakdown" && (
            <div className={css.divForScroll}>
              <ul className={css.photoList}>
                {photos.map((item, index) => (
                  <li key={index} className={css.photoItem}>
                    <img src={item.photo} alt="car" className={css.img} />
                    <span
                      className={css.iconBox}
                      onClick={() => deletePhotos(index)}
                    >
                      <BsTrash className={css.icon} size={18} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {diagnostic === "comment" && (
            <div className={css.wrapperOfComent}>{diagnostics.message}</div>
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
          {repair.fillOfRepair && (
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
      {/* Рекомендації */}
      {recordInfo === "recommendation" && recommendation && (
        <div className={css.recommendationBox}>
          <div className={css.topPart}>
            <p className={css.recName}>{recommendation.name}</p>
            <div className={css.person}>
              {recommendation.person === "manager" ? (
                <FaUserTie size={18} className={css.iconPerson} />
              ) : (
                <GiAutoRepair size={18} className={css.iconPerson} />
              )}
              <p className={css.personName}>{recommendation.personName}</p>
            </div>
          </div>
          <span className={css.textBox}>
            <p className={css.text}>{recommendation.text}</p>
          </span>
        </div>
      )}
    </div>
  );
}
