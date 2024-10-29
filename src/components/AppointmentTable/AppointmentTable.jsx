import css from './AppointmentTable.module.css'
// import AppointmentGrid from '../AppointmentGrid/AppointmentGrid.jsx';


import Timeline from 'react-calendar-timeline';
 import 'react-calendar-timeline/lib/Timeline.css';

// Входные данные с дополнительным полем `workType` для определения вида работ
const data = [
  {
    post_id: 1,
    cars: [
      { plate: 'AA6121CA', mechanic: 'Мироненко', start_time: 9, end_time: 13, workType: 'diagnostic' },
      { plate: 'CA9867OO', mechanic: 'Мироненко', start_time: 13, end_time: 15, workType: 'repair' },
    ],
  },
  {
    post_id: 2,
    cars: [
      { plate: 'AC45660KO', mechanic: 'Мироненко', start_time: 9, end_time: 13, workType: 'inspection' },
      { plate: 'AA6121CA', mechanic: 'Шевчук', start_time: 13, end_time: 15, workType: 'maintenance' },
    ],
  },
];

// Определяем цвета для каждого типа работ
const workTypeColors = {
  diagnostic: '#FF5733',
  repair: '#C70039',
  inspection: '#900C3F',
  maintenance: '#581845',
};



export default function AppointmentTable() {

const groups = data.map((post) => ({
  id: post.post_id,
  title: `Пост ${post.post_id}`,
}));

const items = data.flatMap((post) =>
  post.cars.map((car, index) => ({
    id: `${post.post_id}-${index}`,
    group: post.post_id,
    title: car.plate,
    start_time: new Date(2023, 9, 15, car.start_time),
    end_time: new Date(2023, 9, 15, car.end_time),
    itemProps: {
      style: {
        padding: '0',
        border: 'none',
        backgroundColor: 'transparent', 
      },
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '2px 5px',
            textAlign: 'center',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            fontSize: '12px', // уменьшенный размер шрифта для лучшей видимости
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}>
            {car.plate}
          </div>
          <div style={{
            backgroundColor: workTypeColors[car.workType] || '#333',
            color: '#fff',
            padding: '2px 5px',
            textAlign: 'center',
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
            fontSize: '12px', // уменьшенный размер шрифта
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}>
            {car.mechanic}
          </div>
        </div>
      ),
    },
  }))
);
  console.log(items);

  return (
    
    <div  className={css.apptablecontainer}>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={new Date(2023, 9, 15, 8, 0)}
        defaultTimeEnd={new Date(2023, 9, 15, 18, 0)}
        lineHeight={60}
        itemHeightRatio={0.8}
        timeSteps={{ hour: 1 }} // Шаг временной шкалы
        minZoom={60 * 60 * 1000} // Минимальный зум: 1 час
        maxZoom={24 * 60 * 60 * 1000} // Максимальный зум: 24 часа
        traditionalZoom // Включает классический режим зума
      />
    </div>
  );
};


// export default function AppointmentTable() {
  
  // const data = {
  //   dates: ['Пост/Години','09.00', '10.00', '11.00','12.00', '13.00', '14.00','15.00', '16.00', '17.00', '18.00'],
  //   posts: ['Пост 1', 'Пост 2', 'Пост 3',  'Пост 4'],
  //   workItems: [
  //   { name: 'Иванов', startTime: '2024-10-15T09:00', endTime: '2024-10-15T12:00', color: '#ffcccb', postIndex: 1 },
  //   { name: 'Петров', startTime: '2024-10-15T10:00', endTime: '2024-10-15T15:00', color: '#add8e6', postIndex: 2 },
  //   { name: 'Петров', startTime: '2024-10-15T15:00', endTime: '2024-10-15T16:00', color: '#add8e6', postIndex: 2 },
  //   { name: 'Иванов', startTime: '2024-10-15T10:00', endTime: '2024-10-15T15:00', color: '#add8e6', postIndex: 1 },
  //   { name: 'Петров', startTime: '2024-10-15T16:00', endTime: '2024-10-15T18:00', color: '#add8e6', postIndex: 2 },
  //   { name: 'Сидоров',startTime: '2024-10-15T10:00', endTime: '2024-10-15T12:00', color: '#add8e6', postIndex: 3 },
    
      
  //     ],
  // };

  // return (
  //   <div className={css.apptablecontainer}>
     
  //     <AppointmentGrid data={data} />
  //   </div>
  // );
// };



