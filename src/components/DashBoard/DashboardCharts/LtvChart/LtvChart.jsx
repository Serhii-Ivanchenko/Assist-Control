// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
// import  {selectDate } from "../../../../redux/cars/selectors.js";

import css from "./LtvChart.module.css";

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
        <p className={css.popupvalue}>
          LTV <span className={css.kolvalue}>{`${payload[0].value} `}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function LtvChart() {
  //  let actualDate = useSelector(selectDate);
  //   const carsForHours = useSelector(selectCarsForHours);
  //   const workHours = useSelector(selectWorkHours);
  //   const dispatch = useDispatch();

  // const currentDate = new Date().toISOString().substring(0, 10);
  // if (actualDate === null) {
  //     actualDate = currentDate;
  //   };

  const customActiveDot = (props) => {
    const { cx, cy } = props;

    return (
      <>
        <circle
          cx={cx}
          cy={cy}
          r={10}
          fill="none" // Прозрачный внутренний цвет
          stroke="var(--white)" // Белая обводка
          strokeWidth={1} // Толщина обводки 1 пиксель
        />
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="var(--play-btn-triangle)"
          stroke="none"
        />
      </>
    );
  };

  // const arrdata = Object.entries(carsForHours).map(([hour, value]) => ({
  //   hour,
  //   value,
  // }));

  const ltvData = [
    { date: "2025-01-27", ltv_count: 1800 },
    { date: "2025-01-28", ltv_count: 1900 },
    { date: "2025-01-29", ltv_count: 1600 },
    { date: "2025-01-30", ltv_count: 1700 },
    { date: "2025-01-31", ltv_count: 1700 },
    { date: "2025-02-01", ltv_count: 1800 },
    { date: "2025-02-02", ltv_count: 1900 },
    { date: "2025-02-03", ltv_count: 1500 },
    { date: "2025-02-04", ltv_count: 1400 },
    { date: "2025-02-05", ltv_count: 1700 },
  ];

  // const filteredData = arrdata.filter(
  //   (item) => item.hour >= workHours.start && item.hour <= workHours.end
  // );
  // const data = filteredData.map((el) => ({ ...el, hour: el.hour + ".00" }));
  // // const interval= workHours.end-workHours.start-1;
  // //  console.log(workHours.end, workHours.start, interval);
  // const dataMax = Math.max(...data.map((item) => item.value));
  let data = ltvData.map((el) => ({
    ...el,
    dateeng: el.date.substring(8, 10) + "/" + el.date.substring(5, 7),
    // +"/" +
    // el.date.substring(0, 4),
  }));

  // console.log(data);

  let interval = 0;
  const getMaxValue = (data) => Math.max(...data.map((d) => d.ltv_count));
  const maxY = getMaxValue(data);
  if (maxY > 2000) {
    interval = 499;
  } else {
    interval = 249;
  }

  console.log(maxY);

  return (
    <div className={css.containerltvchart}>
      <div className={css.titlebox}>
        <p className={css.stattitle}>Динаміка LTV</p>
      </div>
      <div className={css.areabox}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradientzs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--orange)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--orange)" stopOpacity={0} />
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
              padding={{ right: 10 }}
              tick={{ fontSize: 10 }}
              // tickFormatter={(value) => value.slice(0, -3)}
              angle={-45}
              textAnchor="end"
            />

            <YAxis
              domain={[0, (dataMax) => dataMax + 100]}
              dataKey="ltv_count"
              margin={{ top: 10 }}
              tick={{ fontSize: 10 }}
              interval={interval}
              tickCount={maxY + 1}
              //  tickCount={12}
              // tick={{ fill: "transparent" }}
              axisLine={{ fill: "transparent" }}
              width={25}
              // label={{ angle: -90, position: 'insideLeft' }} unit={' L'}
              //  ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              // ticks={generateTicks(dataMax)}
            />

            <Tooltip content={<CustomTooltip />} />
            {/* <Tooltip contentStyle={{ backgroundColor: 'var(--white)', border: '1px solid #ccc' }} */}

            {/* /> */}

            <Area
              type="monotone"
              dataKey="ltv_count"
              stroke="var(--orange)"
              strokeWidth={3}
              fill="url(#colorGradientzs)"
              cursor="pointer"
              activeDot={customActiveDot}
              // activeDot={{  fill: "var(--blue)", border: '7px'}} // Активная точка больше
            />
          </AreaChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
}
