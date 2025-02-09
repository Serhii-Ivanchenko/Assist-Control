import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";


import css from "./ProfitChart.module.css";

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
                {/* Прибуток */}
                <span className={css.kolvalue}>{`${payload[0].value} `}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ProfitChart() {


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
          fill="var(--green-btn-normal)"
          stroke="none"
        />
      </>
    );
  };

  // const arrdata = Object.entries(carsForHours).map(([hour, value]) => ({
  //   hour,
  //   value,
  // }));

  const profitData = [
    { date: "2025-01-27", p_count: 1800 },
    { date: "2025-01-28", p_count: 1900 },
    { date: "2025-01-29", p_count: 1600 },
    { date: "2025-01-30", p_count: 1700 },
    { date: "2025-01-31", p_count: 1700 },
    { date: "2025-02-01", p_count: 1800 },
    { date: "2025-02-02", p_count: 1900 },
    { date: "2025-02-03", p_count: 1500 },
    { date: "2025-02-04", p_count: 1400 },
    { date: "2025-02-05", p_count: 1700 },
  ];

  // const filteredData = arrdata.filter(
  //   (item) => item.hour >= workHours.start && item.hour <= workHours.end
  // );
  // const data = filteredData.map((el) => ({ ...el, hour: el.hour + ".00" }));
  // // const interval= workHours.end-workHours.start-1;
  // //  console.log(workHours.end, workHours.start, interval);
  // const dataMax = Math.max(...data.map((item) => item.value));
  let data = profitData.map((el) => ({
    ...el,
    dateeng: el.date.substring(8, 10) + "/" + el.date.substring(5, 7),
    // +"/" +
    // el.date.substring(0, 4),
  }));

  // console.log(data);

//   let interval = 0;
  const getMaxValue = (data) => Math.max(...data.map((d) => d.ltv_count));
  const maxY = getMaxValue(data);
//   if (maxY > 2000) {
//     interval = 499;
//   } else {
//     interval = 249;
//   }

// const generateTicks = (maxY, interval) => {
//     return Array.from(
//       { length: Math.floor(maxY / (interval + 1)) +2 },
//       (_, i) => i * (interval + 1) 
//     );
//   };


  return (
    <div className={css.containerltvchart}>
      <div className={css.areabox}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--green-btn-normal)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--green-btn-normal)" stopOpacity={0} />
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
            //   interval={0}
            //   padding={{ right: 10 }}
            //   tick={{ fontSize: 10 }}
              // tickFormatter={(value) => value.slice(0, -3)}
            //   angle={-45}
                          //   textAnchor="end"
              height={5}
              tick={false}
            />

            <YAxis
              domain={[0, maxY+100]}
              dataKey="p_count"
               margin={{ top: 10 }}
            //   tick={{ fontSize: 10 }}
            //    interval={interval}
              // tickCount={maxY + 1}
              //  tickCount={12}
                          // tick={{ fill: "transparent" }}
              tick={false}
              axisLine={{ fill: "transparent" }}
               width={5}
            //    ticks={generateTicks(maxY, interval)}
              // label={{ angle: -90, position: 'insideLeft' }} unit={' L'}
              //  ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              // ticks={generateTicks(dataMax)}
            />

            <Tooltip content={<CustomTooltip />} />
            {/* <Tooltip contentStyle={{ backgroundColor: 'var(--white)', border: '1px solid #ccc' }} */}

            {/* /> */}

            <Area
              type="monotone"
              dataKey="p_count"
              stroke="var(--green-btn-normal)"
              strokeWidth={3}
              fill="url(#colorGrad)"
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
