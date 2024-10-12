import { useState } from "react";
import PeriodSelector from "../PeriodSelector/PeriodSelector.jsx";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import css from "./Chart.module.css";

const CustomTooltip = ({ active, payload, label, coordinate }) => {
  if (active && payload && payload.length) {
    const { x, y } = coordinate;

    return (
      <div
        className="custom-tooltip"
        style={{
          // backgroundColor: '#fff', padding: '5px',border: '1px solid #ccc',
          width: "70px",
          border: "none",
          position: "absolute",
          left: x,
          top: y - 30,
          transform: "translateX(-50%)",
          fontweight: "400",
          fontsize: "6px",
          fontvariant: "smallCaps",
          color: "#9e9e9e",
          fontStyle: "normal",
        }}
      >
        <p
          className={css.popuptitle}
        >{`${payload[0].value} автомобілів ${label}`}</p>
      </div>
    );
  }
  return null;
};

let data = [
  {
    date: "2024-09-19",
    dateeng: "19/09/2024",
    value: 5,
  },

  {
    date: "2024-09-20",
    dateeng: "20/09/2024",
    value: 6,
  },

  {
    date: "2024-09-21",
    dateeng: "21/09/2024",
    value: 7,
  },

  {
    date: "2024-09-22",
    dateeng: "22/09/2024",
    value: 7,
  },

  {
    date: "2024-09-23",
    dateeng: "23/09/2024",
    value: 9,
  },

  {
    date: "2024-09-24",
    dateeng: "24/09/2024",
    value: 8,
  },

  {
    date: "2024-09-25",
    dateeng: "25/09/2024",
    value: 5,
  },

  {
    date: "2024-09-26",
    dateeng: "26/09/2024",
    value: 6,
  },

  {
    date: "2024-09-27",
    dateeng: "27/09/2024",
    value: 7,
  },

  {
    date: "2024-09-28",
    dateeng: "28/09/2024",
    value: 7,
  },

  {
    date: "2024-09-29",
    dateeng: "29/09/2024",
    value: 9,
  },

  {
    date: "2024-09-30",
    dateeng: "30/09/2024",
    value: 8,
  },

  {
    date: "2024-10-01",
    dateeng: "01/10/2024",
    value: 6,
  },

  {
    date: "2024-10-02",
    dateeng: "02/10/2024",
    value: 6,
  },
  {
    date: "2024-10-03",
    dateeng: "03/10/2024",
    value: 8,
  },
  {
    date: "2024-10-04",
    dateeng: "04/10/2024",
    value: 9,
  },
];

export default function Chart() {
  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const [dateBegin, setDateBegin] = useState(sevenDaysAgo);
  const [dateEnd, setDateEnd] = useState(currentDate);
  let interval = data.length;

  const handleDataChangeBeg = (newData) => {
    setDateBegin(newData);
  };

  const handleDataChangeEnd = (newData) => {
    setDateEnd(newData);
  };

  const customActiveDot = (props) => {
    const { cx, cy } = props;

    return (
      <>
        <circle
          cx={cx}
          cy={cy}
          r={7}
          fill="none"
          stroke="white"
          strokeWidth={1}
        />
        <circle cx={cx} cy={cy} r={3} fill="#db8120" stroke="none" />
      </>
    );
  };

  const yTickFormatter = (tick) => {
    if (tick >= 10) {
      return "";
    }
    return tick;
  };

  //  console.log('start', dateBegin)
  //  console.log('end', dateEnd)

  return (
    <div className={css.containerchart}>
      <p className={css.charttitle}>Машинозаїзди</p>

      <div className={css.areabox}>
        <ResponsiveContainer
          
          className={css.responsecontainer}
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3956cc" stopOpacity={1} />
                <stop offset="100%" stopColor="#3956cc" stopOpacity={0} />
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
                <stop stopColor="#4A4A4A" />
                <stop offset="1" stopColor="#4A4A4A" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* <CartesianGrid strokeDasharray="3 3" />  */}
            <CartesianGrid
              stroke="url(#linear)"
              strokeDasharray="0"
              vertical={false}
              horizontal={true}
            />

            <XAxis
              dataKey="dateeng"
              interval={interval}
              //  padding={{ right: 10 }}
              tick={{ fill: "transparent" }}
            />

            <YAxis
              //  domain={[0, (dataMax) => dataMax + 1]}
              domain={[0, 10]}
              dataKey="value"
              //  padding={{ top: 10 }}
              allowDataOverflow={true}
              //  tickCount={10}
              tick={{ fill: "transparent" }}
              axisLine={{ fill: "transparent" }}
              tickCount={10}
              interval={0}
              ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              //  axisLine={false}
              tickFormatter={yTickFormatter}
              //  tickFormatter={(value) => (value / 1000).toFixed(1)}
              width={1}
              // label={{ angle: -90, position: 'insideLeft' }} unit={' L'}
              //  ticks={[0, 2, 4, 6, 8, 10]}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#3956cc"
              strokeWidth={3}
              fill="url(#colorGradient)"
              activeDot={customActiveDot}
              //   activeDot={{  fill: "#3956cc"}} // Активная точка больше

              //  dot={{ r: 8, fill: '#fff', stroke: '#87D28D', strokeWidth: '4px' }} // Полностью закрашенные кружочки
              //   label={({ x, y, value }) => (
              //     <text x={x} y={y - 10} fill="#000" textAnchor="middle">
              //       {`${value} ml`} {/* Добавляем "ml" к значению */}
              //     </text>
              //   )}
            />

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
          </AreaChart>{" "}
        </ResponsiveContainer>{" "}
      </div>

      <PeriodSelector
        startDate={dateBegin}
        endDate={dateEnd}
        onDateBegChange={handleDataChangeBeg}
        onDateEndChange={handleDataChangeEnd}
      />
    </div>
  );
}
