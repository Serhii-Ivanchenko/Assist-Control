import { useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import { selectPercent, selectDate, selectWorkHours, selectCarsForHours } from '../../redux/cars/selectors.js'
import { getCarsForHour, getPercentForHour } from '../../redux/cars/operations.js'
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

const stringAvto = (data) => {
  let datastring = '';
  const arrAvto = ['автомобілів', 'автомобіль', 'автомобіля', 'автомобіля', 'автомобіля', 'автомобілів', 'автомобілів',
    'автомобілів', 'автомобілів', 'автомобілів'];
  datastring = arrAvto[data % 10];
   if (data>=11 && data<=20) {
     datastring = 'автомобілів';
  };
  return datastring;
  };

const CustomTooltip = ({ active, payload, label, coordinate }) => {
  if (active && payload && payload.length) {
    const { x, y } = coordinate;

    return (
      <div
        className="custom-tooltip"
        style={{
          // backgroundColor: '#fff',
          width: "70px",
          // padding: '5px',
          border: "none",
          // border: '1px solid #ccc',
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
        >{`${payload[0].value} ${stringAvto(payload[0].value)} ${label}`}</p>
      </div>
    );
  }
  return null;
};



export default function LoadStatsChart() {
  const actualPercent = useSelector(selectPercent);
  let actualDate = useSelector(selectDate);
  const carsForHours = useSelector(selectCarsForHours);
  const workHours = useSelector(selectWorkHours)
  const dispatch = useDispatch();
 
  const currentDate = new Date().toISOString().substring(0, 10);


 if (actualDate === null) {
    actualDate=currentDate;
   }
  // const [startIndex, setStartIndex] = useState(startDay);
  //     const [endIndex, setEndIndex] = useState(endDay);

  //  const [activeIndex, setActiveIndex] = useState(null); // Для отслеживания наведения на точку

  const customActiveDot = (props) => {
    const { cx, cy } = props;

    return (
      <>
        <circle
          cx={cx}
          cy={cy}
          r={7}
          fill="none" // Прозрачный внутренний цвет
          stroke="white" // Белая обводка
          strokeWidth={1} // Толщина обводки 1 пиксель
        />
        <circle cx={cx} cy={cy} r={3} fill="#00A3FF" stroke="none" />
      </>
    );
  };

  if (actualPercent === null ) {
   const fetchPercentForHour = async () => {
       await Promise.all([
         dispatch(getPercentForHour(currentDate)),
       ]);
     };

     fetchPercentForHour();
}

 useEffect(() => {
     
     const fetchCarsForHour = async () => {
       await Promise.all([
         dispatch(getCarsForHour(actualDate)),
       ]);
     };

     fetchCarsForHour();
   }, [dispatch, actualDate ]);
  
 const arrdata = Object.entries(carsForHours).map(([hour, value]) => ({
  hour,
  value
}));

const filteredData = arrdata.filter(item => item.hour >= workHours.start && item.hour <= workHours.end);
   const data = filteredData.map(el => ({ ...el, hour: el.hour + '.00' }));
  // const interval= workHours.end-workHours.start-1;
  //  console.log(workHours.end, workHours.start, interval);
  
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
                <stop offset="0%" stopColor="#db8120" stopOpacity={1} />
                <stop offset="100%" stopColor="#db8120" stopOpacity={0} />
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
              dataKey="hour"
              interval={0}
              padding={{ right: 10 }}
              tick={{ fontSize: 10 }}
               tickFormatter={(value) => (value.slice(0,-3) )}
            />

            <YAxis
              domain={[0, (dataMax) => dataMax]}
              dataKey="value"
              margin={{ topt: 10 }}
               interval={0}
              //  tickCount={12}
              // tick={{ fill: "transparent" }}
              axisLine={{ fill: "transparent" }}
              //  tickFormatter={(value) => (value / 1000).toFixed(1)}
              width={20}
              // label={{ angle: -90, position: 'insideLeft' }} unit={' L'}
                ticks={[0,1,2,3,4,5,6,7,8,9,10,11,12]}
            />

             <Tooltip content={<CustomTooltip />} /> 
            {/* <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} */}
            
            {/* /> */}

            <Area
              type="monotone"
              dataKey="value"
              stroke="#db8120"
              strokeWidth={3}
              fill="url(#colorGradientzs)"
              activeDot={customActiveDot}
              // activeDot={{  fill: "#3956cc", border: '7px'}} // Активная точка больше

              //  dot={{ r: 8, fill: '#fff', stroke: '#87D28D', strokeWidth: '4px' }} // Полностью закрашенные кружочки
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
