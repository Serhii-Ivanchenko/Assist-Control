import { differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";


export const renderTime = (complete_d, date_s) => {
  const startDate = new Date(date_s);
  const endDate = complete_d ? new Date(complete_d) : new Date();

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return "Invalid Date";
  }

  const days = differenceInDays(endDate, startDate);
  const hours = differenceInHours(endDate, startDate) % 24;
  const minutes = differenceInMinutes(endDate, startDate) % 60;

  return days > 0
    ? `${days} д ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

// Для відображення дати машини в роботі у CRM у форматі Хд ХХ:ХХ

export const renderTimeinWork = (date_s) => {
  if (!date_s) return "Уточнення";

  const startDate = new Date(date_s);
  const now = new Date();

  if (isNaN(startDate.getTime())) return "Invalid Date";

  const days = differenceInDays(now, startDate);
  const hours = differenceInHours(now, startDate) % 24;
  const minutes = differenceInMinutes(now, startDate) % 60;

  return days > 0
    ? `${days} д ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
