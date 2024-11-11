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
        className={css.customtooltip}
        style={{
          position: "absolute",
          left: `${leftPosition}px`,
          top: `${topPosition}px`,
        }}
      >
        <p className={css.popuptitle}>{`${label}`}</p>
        <div className={css.chartflex}>
          <p className={css.popupavto}>All </p>
          <p className={css.kolall}>{`${payload[0].value} `}</p>
        </div>
        <div className={css.chartflex}>
          <p className={css.popupavto}>New </p>
          <p className={css.kolnew}>{`${payload[1].value} `}</p>
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

  // const customActiveDot = (props) => {
  //   const { cx, cy } = props;

  //   return (
  //     <>
  //       <circle
  //         cx={cx}
  //         cy={cy}
  //         r={7}
  //         fill="none"
  //         stroke="white"
  //         strokeWidth={1}
  //       />
  //       <circle cx={cx} cy={cy} r={3} fill="var(--orange)" stroke="none" />
  //     </>
  //   );
  // };

  // const yTickFormatter = (tick) => {
  //   if (tick >= 10) {
  //     return "";
  //   }
  //   return tick;
  // };

  // useEffect(() => {
  //   const fetchNewCarsData = async () => {
  //     await Promise.all([
  //       dispatch(getNewCarsRange({ dateBeginStr, dateEndStr })),
  //     ]);
  //   };

  //   fetchNewCarsData();
  // }, [dispatch, dateBeginStr, dateEndStr]);

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
      <div className={css.charttitlebox}>
        <p className={css.charttitle}>Машинозаїзди</p>
        <p className={css.charttitleavto}>
          За період:<span className={css.titlekolvo}>{sumNewCars}</span>
        </p>
      </div>
      <div className={css.areabox}>
        <ResponsiveContainer className={css.responsecontainer}>
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

            {/* <CartesianGrid strokeDasharray="3 3" />  */}
            <CartesianGrid
              stroke="url(#linear)"
              strokeDasharray="3,3"
              vertical={false}
              horizontal={true}
            />

            <XAxis
              dataKey="dateeng"
              interval={0}
              //  padding={{ right: 10 }}
              tick={{ fontSize: 10 }}
              // tick={{ fill: 'transparent' }}
              angle={-45}
              textAnchor="end"
            />

            <YAxis
              // domain={[0, (dataMax) => dataMax + 1]}
              domain={[0, maxY]}
              // domain={[0, 11]}
              // dataKey="count"
              //  padding={{ top: 10 }}
              allowDataOverflow={true}
              //  tickCount={10}
              tick={{ fontSize: 10 }}
              axisLine={{ fill: "transparent" }}
              tickCount={maxY + 1}
              interval={interval}
              // ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
              //  axisLine={false}
              // tickFormatter={yTickFormatter}
              //  tickFormatter={(value) => (value / 1000).toFixed(1)}
              width={13}

              // label={{ angle: -90, position: 'insideLeft' }} unit={' L'}
              //  ticks={[0, 2, 4, 6, 8, 10]}
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
            {/* <Area
              type="monotone"
              dataKey="count"
              stroke="var(--blue)"
              strokeWidth={3}
              fill="url(#colorGradient)"
              activeDot={customActiveDot} 
              //   activeDot={{  fill: "var(--blue)"}} // Активная точка больше

              //  dot={{ r: 8, fill: 'var(--white)', stroke: '#87D28D', strokeWidth: '4px' }} // Полностью закрашенные кружочки
              //   label={({ x, y, value }) => (
              //     <text x={x} y={y - 10} fill="#000" textAnchor="middle">
              //       {`${value} ml`} {/* Добавляем "ml" к значению 
              //     </text>
              //   )}
        // />*/}

            {/* <Brush
                        dataKey="day"
           height={10}
                        stroke="#87D28D8"
                         travellerWidth={5} // Ширина ползунка
          traveller={{ stroke: 'rgba(50, 63, 71, 0.2)', fill:'rgba(50, 63, 71, 0.2)' }}
          startIndex={startIndex}
          endIndex={endIndex}
          onChange={(indexRange) => {
            setStartIndex(indexRange.startIndex);
            setEndIndex(indexRange.endIndex);
          }}
        /> */}
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
