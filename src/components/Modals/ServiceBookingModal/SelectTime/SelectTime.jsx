import { useSelector } from "react-redux";
import { selectServiceData } from "../../../../redux/crm/selectors";
import css from "../SelectTime/SelectTime.module.css";
import clsx from "clsx";

export default function SelectTime({
  postId,
  chosenTime,
  setChosenTime,
  pickedDate,
}) {
  const { availability } = useSelector(selectServiceData);

  const isChosenDate = chosenTime?.find((item) => {
    return item.date === pickedDate;
  });
  const chosenHours = isChosenDate?.times;

  const onTimeBtnClick = (time, value) => {
    if (value !== 0) return;

    setChosenTime((prevValues) => {
      const newObject = { date: pickedDate, time: time };

      const indexOfElem = prevValues.findIndex(
        (item) => item.date === newObject.date && item.time === newObject.time
      );

      if (indexOfElem === -1) {
        return [...prevValues, newObject];
      } else {
        return prevValues.filter((_, index) => index !== indexOfElem);
      }
    });
  };

  if (!postId) {
    return;
  }

  const availableHours = availability.find(
    (item) => Number(item.post_id) === Number(postId)
  );
  // console.log(availableHours);
  console.log(availability);

  return (
    <>
      {Object.entries(availableHours.hours).map(([hour, value], index) => (
        <button
          type="button"
          className={clsx(
            css.timeBtn,
            value === 1 ||
              (hour.split(":")[0] <= new Date().getHours() &&
                pickedDate === new Date(Date.now()).toLocaleDateString())
              ? css.timeBtnDisabled
              : css.timeBtnFree,
            chosenHours?.includes(hour) && css.timeBtnChosen
          )}
          key={index}
          onClick={() => {
            onTimeBtnClick(hour, value);
          }}
          disabled={
            value === 1 ||
            (hour.split(":")[0] <= new Date().getHours() &&
              pickedDate === new Date(Date.now()).toLocaleDateString())
          }
        >
          {hour}
        </button>
      ))}
    </>
  );
}
