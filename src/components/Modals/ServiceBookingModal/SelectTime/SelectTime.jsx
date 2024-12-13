import { useSelector } from "react-redux";
import {
  selectDayRecords,
  selectServiceData,
} from "../../../../redux/crm/selectors";
import css from "../SelectTime/SelectTime.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function SelectTime({
  postId,
  recordId,
  setDatesArray,
  setBooking,
  pickedDate,
}) {
  const [chosenTime, setChosenTime] = useState([]);
  const { availability } = useSelector(selectServiceData);
  const dayRecords = useSelector(selectDayRecords);

  // const recordById = dayRecords?.find((dayRecord) => {
  //   return dayRecord.id === recordId;
  // });
  console.log(dayRecords);
  console.log(recordId);

  const newArr = [
    { appointment_date: "13.12.2024", times: ["19:00"] },
    { appointment_date: "14.12.2024", times: ["09:00"] },
  ];

  const onTimeBtnClick = (time) => {
    setChosenTime((prevValues) => {
      const existingDate = prevValues.find(
        (item) => item.appointment_date === pickedDate
      );

      if (existingDate) {
        let updatedTimes = existingDate.times.includes(time)
          ? existingDate.times.filter((t) => t !== time)
          : [...existingDate.times, time];

        updatedTimes = updatedTimes.sort();

        return updatedTimes.length > 0
          ? prevValues.map((item) =>
              item.appointment_date === pickedDate
                ? { ...item, times: updatedTimes }
                : item
            )
          : prevValues.filter((item) => item.appointment_date !== pickedDate);
      } else {
        return [
          ...prevValues,
          { appointment_date: pickedDate, times: [time].sort() },
        ];
      }
    });
  };
  console.log(chosenTime);

  useEffect(() => {
    if (recordId) {
      // const bookingRecord = dayRecords?.find((record) => {
      //   return (record.id = recordId);
      // });
      // console.log(bookingRecord);

      setChosenTime(newArr);
    }
  }, [recordId]);

  useEffect(() => {
    const dataForBooking = chosenTime?.map(({ appointment_date, times }) => ({
      appointment_date: appointment_date.split(".").reverse().join("-"),
      times,
    }));

    const datesArray = chosenTime?.map(({ appointment_date, times }) => ({
      appointment_date: appointment_date.split(".").reverse().join("-"),
      start_time: times[0],
      end_time: times[times.length - 1],
    }));
    setDatesArray(datesArray);
    setBooking(dataForBooking);
    console.log(datesArray);
    console.log(dataForBooking);
  }, [setDatesArray, chosenTime, setBooking]);

  const isChosenDate = chosenTime?.find((item) => {
    return item.appointment_date === pickedDate;
  });
  const chosenHours = isChosenDate?.times;

  if (!postId) {
    return;
  }

  const availableHours = availability?.find(
    (item) => Number(item.post_id) === Number(postId)
  );

  return (
    <>
      {Object.entries(availableHours.hours).map(([hour, value], index) => (
        <button
          type="button"
          className={clsx(
            css.timeBtn,
            css.timeBtnFree,
            !recordId &&
              value === 1 &&
              !chosenHours?.includes(hour) &&
              css.timeBtnDisabled,
            recordId &&
              value === 1 &&
              chosenHours?.includes(hour) &&
              css.timeBtnChosen,
            chosenHours?.includes(hour) && css.timeBtnChosen
          )}
          key={index}
          onClick={() => {
            onTimeBtnClick(hour, value);
          }}
          disabled={
            // value === 1 ||
            (hour.split(":")[0] <= new Date().getHours() &&
              pickedDate === new Date(Date.now()).toLocaleDateString()) ||
            pickedDate < new Date(Date.now()).toLocaleDateString()
          }
        >
          {hour}
        </button>
      ))}
    </>
  );
}
