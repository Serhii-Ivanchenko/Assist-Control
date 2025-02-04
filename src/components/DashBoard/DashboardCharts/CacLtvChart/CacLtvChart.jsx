import css from "./CacLtvChart.module.css"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const cacLtvData = [
  { date: '2025-01-27', cac_count: 500, ltv_count: 800 },
  { date: '2025-01-28', cac_count: 400, ltv_count: 900 },
  { date: '2025-01-29', cac_count: 300, ltv_count: 1000 },
  { date: '2025-01-30', cac_count: 200, ltv_count: 700 },
  { date: '2025-01-31', cac_count: 100, ltv_count: 700 },
  { date: '2025-02-01', cac_count: 200, ltv_count: 800 },
  { date: '2025-02-02', cac_count: 300, ltv_count: 900 },
  { date: '2025-02-03', cac_count: 400, ltv_count: 1000 },
  { date: '2025-02-04', cac_count: 500, ltv_count: 1100 },
  { date: '2025-02-05', cac_count: 400, ltv_count: 1200 },
]

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
          <p className={css.popupvalue}>CAC </p>
          <p className={css.kolcac}>{`${payload[0].value} `}</p>
        </div>
        <div className={css.chartflex}>
          <p className={css.popupvalue}>LTV </p>
          <p className={css.kolltv}>{`${payload[1].value} `}</p>
        </div>
      </div>
    );
  }
  return null;
};


export default function CacLtvChart() {

//  const carSelectDate = useSelector(selectDate);
//   const currentDay = new Date().toISOString().substring(0, 10);
//   const dispatch = useDispatch();
//   const newCarsData = useSelector(selectNewCars);
//   const currentDate = new Date();
//   const sevenDaysAgo = new Date(currentDate);
//   sevenDaysAgo.setDate(currentDate.getDate() - 7);

//   const [dateBegin, setDateBegin] = useState(sevenDaysAgo);
//   const [dateEnd, setDateEnd] = useState(currentDate);
//   let dateBeginStr = dateBegin.toISOString().substring(0, 10);
//   let dateEndStr = dateEnd.toISOString().substring(0, 10);

//   const selectedServiceId = useSelector(selectSelectedServiceId);
//  useEffect(() => {
//     if (carSelectDate === null) {
//       dispatch(changeActualDate(currentDay));
//     }
//   }, [carSelectDate, dispatch, currentDay]);

//   const handleDataChangeBeg = (newData) => {
//     setDateBegin(newData);
//   };

//   const handleDataChangeEnd = (newData) => {
//     setDateEnd(newData);
//   };

//   useEffect(() => {
//     const fetchNewCarsData = async () => {
//       if (!selectedServiceId) {
//         // console.warn("Service ID is not available yet. Skipping fetch.");
//         return;
//       }

//       await dispatch(getNewCarsRange({ dateBeginStr, dateEndStr }));
//     };

//     fetchNewCarsData();
//   }, [dispatch, dateBeginStr, dateEndStr, selectedServiceId]); // необхідно для коректної роботи вибору сервісів


  let data = cacLtvData.map((el) => ({
    ...el,
    dateeng: el.date.substring(8, 10) + "/" + el.date.substring(5, 7),
    // +"/" +
    // el.date.substring(0, 4),
  }));
  let interval = 0;
  const getMaxValue = (data) => Math.max(...data.map((d) => d.ltv_count));
  const maxY = getMaxValue(data);
  if (maxY > 2000) {
    interval = 499;
  } else {
    interval = 249;
  }

  // const sumNewCars = data.reduce((acc, current) => {
  //   return acc + current.new_for_day;
  // }, 0);

  // const handleClick = (data) => {
  //   dispatch(changeActualDate(data.date));
  // };


  return (
    <div className={css.containerchart}>
      <div className={css.charttitlebox}>
        <p className={css.charttitle}>Порівняння CAC та LTV </p>
        <div className={css.charttitlecolor}>
        <div className={css.chartColor}>
        <p className={css.titleCac}></p>
        <p className={css.titletext}> -CAC</p>
        </div>
      <div className={css.chartColor}>
        <p className={css.titleLtv}></p>
        <p className={css.titletext}> -LTV</p>
        </div>
        </div>
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
              //  tickFormatter={value}
              //  tickFormatter={(value) => (value / 1000).toFixed(1)}
              width={30}

                // label={{ angle: -90, position: 'insideLeft' }} 
              //  ticks={[0, 2, 4, 6, 8, 10]}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgb(107, 132, 255, 0.2)" }}
            />
            <Bar
              dataKey="cac_count"
              fill="var(--blue-btn-normal)"
              radius={[7, 7, 0, 0]}
              cursor="pointer"
              // onClick={handleClick}
            />
            <Bar
              dataKey="ltv_count"
              fill="var(--play-btn-triangle)"
              radius={[7, 7, 0, 0]}
              cursor="pointer"
              // onClick={handleClick}
            />
          
          </BarChart>{" "}
        </ResponsiveContainer>{" "}
      </div>
</div>
  );
};

