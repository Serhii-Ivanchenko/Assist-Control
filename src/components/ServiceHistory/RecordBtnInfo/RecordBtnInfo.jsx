import { useState } from "react";
import css from "./RecordBtnInfo.module.css";

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
              className={css.infoBtn}
              onClick={() => changeAppealMsg(true)}
            >
              Клієнт
            </button>
            <button
              className={css.infoBtn}
              onClick={() => changeAppealMsg(false)}
            >
              Менеджер
            </button>
          </div>
          {item.appeal && appealMsgToShow ? (
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
              className={css.infoBtn}
              onClick={() => setDiagnostic("spareParts")}
            >
              Запчастини
            </button>
            <button
              className={css.infoBtn}
              onClick={() => setDiagnostic("PhotoOfBreakdown")}
            >
              Фото поломки
            </button>
            <button
              className={css.infoBtn}
              onClick={() => setDiagnostic("comment")}
            >
              Коментар механіка
            </button>
          </div>
          {diagnostic === "spareParts" && (
            <div className={css.sparePartsTableWrapper}>
              <table className={css.sparePartsTable}>
                <tr>
                  <th>№</th>
                  <th>Назва</th>
                  <th>Номер </th>
                  <th>Стан</th>
                  <th>Рекомендація</th>
                </tr>
              </table>
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
