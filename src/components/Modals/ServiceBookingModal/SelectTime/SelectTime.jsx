import { useSelector } from "react-redux";
import { selectServiceData } from "../../../../redux/crm/selectors";
import css from "../SelectTime/SelectTime.module.css";
import clsx from "clsx";
import { useEffect } from "react";

export default function SelectTime({ postId, chosenTime, setChosenTime }) {
  const { availability } = useSelector(selectServiceData);

  useEffect(() => {
    setChosenTime([]);
  }, [postId, setChosenTime]);

  const onTimeBtnClick = (time, value) => {
    if (value !== 0) return;

    setChosenTime((prevValues) => {
      if (prevValues.includes(time)) {
        return prevValues.filter((item) => item !== time);
      }
      const updatedValues = [...prevValues, time].sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a}:00`);
        const timeB = new Date(`1970-01-01T${b}:00`);
        return timeA - timeB;
      });
      return updatedValues;
    });
  };

  if (!postId) {
    return;
  }

  const availableHours = availability.find(
    (item) => Number(item.post_id) === Number(postId)
  );

  return (
    <>
      {Object.entries(availableHours.hours).map(([time, value], index) => (
        <button
          type="button"
          className={clsx(
            css.timeBtn,
            value === 0 ? css.timeBtnFree : css.timeBtnDisabled,
            chosenTime.includes(time) && css.timeBtnChosen
          )}
          key={index}
          onClick={() => {
            onTimeBtnClick(time, value);
          }}
          disabled={value === 1}
        >
          {time}
        </button>
      ))}
    </>
  );
}
