import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewCarsRange } from "../../redux/cars/operations.js";
import { selectNewCars, selectDate } from "../../redux/cars/selectors.js";
import PeriodSelector from "../PeriodSelector/PeriodSelector.jsx";
import { changeActualDate } from "../../redux/cars/slice.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import css from "./Chart.module.css";
import { selectSelectedServiceId } from "../../redux/auth/selectors.js";

const CustomTooltip = ({ active, payload, label, coordinate, viewBox }) => {
  if (active && payload && payload.length) {
    const { x, y } = coordinate;
    const tooltipWidth = 23;
    const tooltipHeight = 34;
    let leftPosition = x + 30;
    let topPosition = y - 35;

    if (x + tooltipWidth > viewBox.width) {
      leftPosition = viewBox.width - tooltipWidth + 30; // Смещаем тултип влево
    }
    if (y - tooltipHeight / 2 < 0) {
      topPosition = -35; // Смещаем тултип вниз
    }
    return (
      <div
        className={css.customTooltip}
        style={{
          position: "absolute",
          left: `${leftPosition}px`,
          top: `${topPosition}px`,
        }}
      >
        <p className={css.popupTitle}>{`${label}`}</p>
        <div className={css.chartFlex}>
          <p className={css.popupAuto}>All </p>
          <p className={css.qtyAll}>{`${payload[0].value} `}</p>
        </div>
        <div className={css.chartFlex}>
          <p className={css.popupAuto}>New </p>
          <p className={css.qtyNew}>{`${payload[1].value} `}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function Chart() {
  const carSelectDate = useSelector(selectDate);
  const currentDay = new Date().toISOString().substring(0, 10);
  const dispatch = useDispatch();
  const newCarsData = useSelector(selectNewCars);
  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const [dateBegin, setDateBegin] = useState(sevenDaysAgo);
  const [dateEnd, setDateEnd] = useState(currentDate);
  let dateBeginStr = dateBegin.toISOString().substring(0, 10);
  let dateEndStr = dateEnd.toISOString().substring(0, 10);

  const selectedServiceId = useSelector(selectSelectedServiceId); // необхідно для коректної роботи вибору сервісів

  useEffect(() => {
    if (carSelectDate === null) {
      dispatch(changeActualDate(currentDay));
    }
  }, [carSelectDate, dispatch, currentDay]);

  const handleDataChangeBeg = (newData) => {
    setDateBegin(newData);
  };

  const handleDataChangeEnd = (newData) => {
    setDateEnd(newData);
  };

  useEffect(() => {
    const fetchNewCarsData = async () => {
      if (!selectedServiceId) {
        // console.warn("Service ID is not available yet. Skipping fetch.");
        return;
      }

      await dispatch(getNewCarsRange({ dateBeginStr, dateEndStr }));
    };

    fetchNewCarsData();
  }, [dispatch, dateBeginStr, dateEndStr, selectedServiceId]); // необхідно для коректної роботи вибору сервісів

  let data = newCarsData.map((el) => ({
    ...el,
    dateeng: el.date.substring(8, 10) + "/" + el.date.substring(5, 7),
    // +"/" +
    // el.date.substring(0, 4),
  }));
  let interval = 0;
  const getMaxValue = (data) => Math.max(...data.map((d) => d.total_count));
  const maxY = getMaxValue(data);
  if (maxY > 15) {
    interval = 4;
  } else {
    interval = 0;
  }

  const sumNewCars = data.reduce((acc, current) => {
    return acc + current.new_for_day;
  }, 0);

  const handleClick = (data) => {
    dispatch(changeActualDate(data.date));
  };

  // console.log('date',data)
  //  console.log('end', dateEnd)
  // let interval = data.length;
  return (
    <>
      <div className={css.chartTitleBox}>
        <p className={css.chartTitle}>Машинозаїзди</p>
        <p className={css.chartTitleAuto}>
          За період:<span className={css.titleNumber}>{sumNewCars}</span>
        </p>
      </div>
      <div className={css.areaBox}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--blue)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--blue)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <defs>
              <linearGradient
                id="linear"
                x1="136.5"
                y1="1.50024"
                x2="243"
                y2="1.99937"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="var(--input-stroke)" />
                <stop
                  offset="1"
                  stopColor="var(--input-stroke)"
                  stopOpacity="0.25"
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="url(#linear)"
              strokeDasharray="3,3"
              vertical={false}
              horizontal={true}
            />

            <XAxis
              dataKey="dateeng"
              interval={0}
              tick={{ fontSize: "clamp(6px, 0.925vh, 10px)" }}
              angle={-45}
              textAnchor="end"
            />

            <YAxis
              domain={[0, maxY]}
              allowDataOverflow={true}
              tick={{ fontSize: "clamp(6px, 0.925vh, 10px)" }}
              axisLine={{ fill: "transparent" }}
              tickCount={maxY + 1}
              interval={interval}
              width={13}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgb(107, 132, 255, 0.2)" }}
            />
            <Bar
              dataKey="total_count"
              fill="var(--blue-btn-normal)"
              radius={[7, 7, 0, 0]}
              cursor="pointer"
              onClick={handleClick}
            />
            <Bar
              dataKey="new_for_day"
              fill="var(--play-btn-triangle)"
              radius={[7, 7, 0, 0]}
              cursor="pointer"
              onClick={handleClick}
            />
          </BarChart>{" "}
        </ResponsiveContainer>{" "}
      </div>

      <PeriodSelector
        startDate={dateBegin}
        endDate={dateEnd}
        onDateBegChange={handleDataChangeBeg}
        onDateEndChange={handleDataChangeEnd}
      />
    </>
  );
}
