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
        className={css.customTooltip}
        style={{
          position: "absolute",
          left: `${leftPosition}px`,
          top: `${topPosition}px`,
        }}
      >
        <p className={css.popupTitle}>{`${label}`}</p>
        <p className={css.popupAuto}>
          Авто <span className={css.qtyAuto}>{`${payload[0].value} `}</span>
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
    <div className={css.containerLoadStats}>
      <div className={css.titleBox}>
        <p className={css.statTitle}>Завантаження сервісу</p>
        <p className={css.statPercent}>{actualPercent}%</p>
      </div>
      <div className={css.areaBox}>
        <ResponsiveContainer

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
              tick={{ fontSize: "clamp(6px, min(0.925vh, 0.54vw), 10px)" }}
              tickFormatter={(value) => value.slice(0, -3)}
            />

            <YAxis
              domain={[0, (dataMax) => dataMax + 1]}
              dataKey="value"
              margin={{ top: 10 }}
              tick={{ fontSize: "clamp(6px, min(0.925vh, 0.54vw), 10px)" }}
              interval={dataMax > 25 ? 2 : 0}
              axisLine={{ fill: "transparent" }}
              width={15}
              ticks={generateTicks(dataMax)}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--orange)"
              strokeWidth={3}
              fill="url(#colorGradientzs)"
              cursor="pointer"
              activeDot={customActiveDot}
            />
            
          </AreaChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
}
