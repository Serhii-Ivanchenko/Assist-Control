// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";
// import  {selectDate } from "../../../../redux/cars/selectors.js";

import css from "./RetentionChart.module.css";

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
          RET <span className={css.kolret}>{`${payload[0].value} `}</span>
        </p>
        <p className={css.popupvalue}>
          CHURN <span className={css.kolchurn}>{`${payload[1].value} `}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function RetentionChart() {
  //  let actualDate = useSelector(selectDate);
  //   const carsForHours = useSelector(selectCarsForHours);
  //   const workHours = useSelector(selectWorkHours);
  //   const dispatch = useDispatch();

  // const currentDate = new Date().toISOString().substring(0, 10);
  // if (actualDate === null) {
  //     actualDate = currentDate;
  //   };

  const customActiveDotGreen = (props) => {
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
        <circle cx={cx} cy={cy} r={4} fill="var(--green)" stroke="none" />
      </>
    );
  };

  const customActiveDotRed = (props) => {
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
        <circle cx={cx} cy={cy} r={4} fill="var(--red)" stroke="none" />
      </>
    );
  };

  // const arrdata = Object.entries(carsForHours).map(([hour, value]) => ({
  //   hour,
  //   value,
  // }));

  const retData = [
    { date: "2025-01-27", churn_count: 15, ret_count: 85 },
    { date: "2025-01-28", churn_count: 10, ret_count: 90 },
    { date: "2025-01-29", churn_count: 5, ret_count: 95 },
    { date: "2025-01-30", churn_count: 10, ret_count: 90 },
    { date: "2025-01-31", churn_count: 15, ret_count: 85 },
    { date: "2025-02-01", churn_count: 10, ret_count: 90 },
    { date: "2025-02-02", churn_count: 5, ret_count: 95 },
    { date: "2025-02-03", churn_count: 10, ret_count: 90 },
    { date: "2025-02-04", churn_count: 15, ret_count: 85 },
    { date: "2025-02-05", churn_count: 10, ret_count: 90 },
  ];

  // const filteredData = arrdata.filter(
  //   (item) => item.hour >= workHours.start && item.hour <= workHours.end
  // );
  // const data = filteredData.map((el) => ({ ...el, hour: el.hour + ".00" }));
  // // const interval= workHours.end-workHours.start-1;
  // //  console.log(workHours.end, workHours.start, interval);
  // const dataMax = Math.max(...data.map((item) => item.value));
  let data = retData.map((el) => ({
    ...el,
    dateeng: el.date.substring(8, 10) + "/" + el.date.substring(5, 7),
    // +"/" +
    // el.date.substring(0, 4),
  }));

  // console.log(data);

  // let interval = 9;
  // const getMaxValue = (data) => Math.max(...data.map((d) => d.ltv_count));
  // const maxY = getMaxValue(data);
  // if (maxY > 2000) {
  //   interval = 499;
  // } else {
  //   interval = 249;
  // };

  return (
    <div className={css.containerloadstats}>
      <div className={css.titlebox}>
        <p className={css.charttitle}>Рівні Retention i Churn</p>
        <div className={css.charttitlecolor}>
          <div className={css.chartColor}>
            <p className={css.titleCac}></p>
            <p className={css.titletext}> -Churn</p>
          </div>
          <div className={css.chartColor}>
            <p className={css.titleLtv}></p>
            <p className={css.titletext}> -Retention</p>
          </div>
        </div>
      </div>
      <div className={css.areabox}>
        <ResponsiveContainer
          // height={108}
          // width={272}
          className={css.responseContainer}
        >
          <LineChart data={data}>
            {/* <defs>
              <linearGradient id="colorGradientzs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--orange)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--orange)" stopOpacity={0} />
              </linearGradient>
            </defs> */}

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
              domain={[0, 100]}
              dataKey="ret_count"
              margin={{ top: 10 }}
              tick={{ fontSize: 10 }}
              interval={0}
              // tickCount={maxY + 1}
              tickCount={11}
              // tick={{ fill: "transparent" }}
              axisLine={{ fill: "transparent" }}
              width={20}
              // label={{ angle: -90, position: 'insideLeft' }} unit={' L'}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              // ticks={generateTicks(dataMax)}
            />

            <Tooltip content={<CustomTooltip />} />
            {/* <Tooltip contentStyle={{ backgroundColor: 'var(--white)', border: '1px solid #ccc' }} */}

            <Line
              type="monotone"
              dataKey="ret_count"
              stroke="var(--green)"
              strokeWidth={3}
              dot={false}
              cursor="pointer"
              activeDot={customActiveDotGreen}
            />

            <Line
              type="monotone"
              dataKey="churn_count"
              stroke="var(--red)"
              strokeWidth={3}
              dot={false}
              cursor="pointer"
              activeDot={customActiveDotRed}
            />

            {/* <Area
              type="monotone"
              dataKey="ltv_count"
              stroke="var(--orange)"
              strokeWidth={3}
              fill="url(#colorGradientzs)"
              cursor="pointer"
              activeDot={customActiveDot}
              
            /> */}
          </LineChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
}
