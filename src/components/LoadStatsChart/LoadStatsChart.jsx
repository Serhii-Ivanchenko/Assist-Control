import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPercent,
  selectDate,
  selectWorkHours,
  selectCarsForHours,
} from "../../redux/cars/selectors.js";
import {
  getCarsForHour,
  getPercentForHour,
} from "../../redux/cars/operations.js";
// import { changeActualDate } from "../../redux/cars/slice.js";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import css from "./LoadStatsChart.module.css";
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
        <p className={css.popupavto}>
          Авто <span className={css.kolavto}>{`${payload[0].value} `}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function LoadStatsChart() {
  const actualPercent = useSelector(selectPercent);
  let actualDate = useSelector(selectDate);
  const carsForHours = useSelector(selectCarsForHours);
  const workHours = useSelector(selectWorkHours);
  const dispatch = useDispatch();

  const selectedServiceId = useSelector(selectSelectedServiceId); // необхідно для коректної роботи вибору сервісів

  const currentDate = new Date().toISOString().substring(0, 10);

  if (actualDate === null) {
    actualDate = currentDate;
  }
  // const [startIndex, setStartIndex] = useState(startDay);
  //     const [endIndex, setEndIndex] = useState(endDay);

  //  const [activeIndex, setActiveIndex] = useState(null); // Для отслеживания наведения на точку

  // Генерируем массив ticks
  const generateTicks = (dataMax) => {
    return Array.from({ length: dataMax + 2 }, (_, index) => index);
  };

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

  useEffect(() => {
    if (!selectedServiceId) {
      // console.warn("Service ID is not available yet. Skipping fetch.");
      return;
    }

    if (actualPercent === null) {
      dispatch(getPercentForHour(currentDate));
    }

    const fetchCarsForHour = async () => {
      await dispatch(getCarsForHour(actualDate));
    };

    fetchCarsForHour();
  }, [actualPercent, currentDate, actualDate, dispatch, selectedServiceId]); // необхідно для коректної роботи вибору сервісів

  const arrdata = Object.entries(carsForHours).map(([hour, value]) => ({
    hour,
    value,
  }));

  const filteredData = arrdata.filter(
    (item) => item.hour >= workHours.start && item.hour <= workHours.end
  );
  const data = filteredData.map((el) => ({ ...el, hour: el.hour + ".00" }));
  // const interval= workHours.end-workHours.start-1;
  //  console.log(workHours.end, workHours.start, interval);
  const dataMax = Math.max(...data.map((item) => item.value));

  return (
    <div className={css.containerloadstats}>
      <div className={css.titlebox}>
        <p className={css.stattitle}>Завантаження сервісу</p>
        <p className={css.statpercent}>{actualPercent}%</p>
      </div>
      <div className={css.areabox}>
        <ResponsiveContainer
          // height={108}
          // width={272}
          className={css.responseContainer}
        >
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
              dataKey="hour"
              interval={0}
              padding={{ right: 10 }}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => value.slice(0, -3)}
            />

            <YAxis
              domain={[0, (dataMax) => dataMax + 1]}
              dataKey="value"
              margin={{ topt: 10 }}
              tick={{ fontSize: 10 }}
              interval={dataMax > 25 ? 2 : 0}
              //  tickCount={12}
              // tick={{ fill: "transparent" }}
              axisLine={{ fill: "transparent" }}
              //  tickFormatter={(value) => (value / 1000).toFixed(1)}
              width={15}
              // label={{ angle: -90, position: 'insideLeft' }} unit={' L'}
              //  ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              ticks={generateTicks(dataMax)}
            />

            <Tooltip content={<CustomTooltip />} />
            {/* <Tooltip contentStyle={{ backgroundColor: 'var(--white)', border: '1px solid #ccc' }} */}

            {/* /> */}

            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--orange)"
              strokeWidth={3}
              fill="url(#colorGradientzs)"
              cursor="pointer"
              activeDot={customActiveDot}
              // activeDot={{  fill: "var(--blue)", border: '7px'}} // Активная точка больше

              //  dot={{ r: 8, fill: 'var(--white)', stroke: '#87D28D', strokeWidth: '4px' }} // Полностью закрашенные кружочки
              //   label={({ x, y, value }) => (
              //     <text x={x} y={y - 10} fill="#000" textAnchor="middle">
              //       {`${value} ml`} {/* Добавляем "ml" к значению */}
              //     </text>
              //   )}
            />
            {/* 
                    <Brush
          dataKey="name"
          height={30}
          stroke="#8884d8"
          startIndex={startIndex}
          endIndex={data.length - 1}
          onChange={(indexRange) => setStartIndex(indexRange.startIndex)}
        /> */}

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
      </div>{" "}
    </div>
  );
}
