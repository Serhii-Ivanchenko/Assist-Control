import css from './AppointmentTable.module.css'
 import AppointmentGrid from '../AppointmentGrid/AppointmentGrid.jsx';


// import Timeline from 'react-calendar-timeline';
//  import 'react-calendar-timeline/lib/Timeline.css';

// Входные данные с дополнительным полем `workType` для определения вида работ
const data = [
  {
    post_id: 1,
    cars: [
      { plate: 'AA6121CA', mechanic: 'Мироненко', start_time: 9, end_time: 13, workType: 'checkRepair' },
      { plate: 'CA9867OO', mechanic: 'Мироненко', start_time: 14, end_time: 15, workType: 'repair' },
    ],
  },
  {
    post_id: 2,
    cars: [
      { plate: 'AC45660KO', mechanic: 'Мироненко', start_time: 9, end_time: 13, workType: 'repair' },
      { plate: 'AA6121CA', mechanic: 'Шевчук', start_time: 15, end_time: 17, workType: 'viewRepair' },
    ],
  },
  { post_id: 3,
    cars: [
      { plate: 'AC45660KO', mechanic: 'Мироненко', start_time: 9, end_time: 17, workType: 'repair' },
      { plate: 'AA6121CA', mechanic: 'Шевчук', start_time: 12, end_time: 13, workType: 'viewRepair' },
    ],
  },

];



// const groups = data.map((post) => ({
//   id: post.post_id,
//   title: `Пост ${post.post_id}`,
// }));


//             borderTopLeftRadius: '4px',
//             borderTopRightRadius: '4px',
//             overflow: 'hidden',
//             whiteSpace: 'nowrap',
//             textOverflow: 'ellipsis'


export default function AppointmentTable() {
  
 
  const hours = Array.from({ length: 10 }, (_, i) => i + 9); // Массив часов от 9 до 18
  // const result = data.flatMap((post, postIndex) =>
  //   post.cars.map((car) => ({
  //     ...car,
  //     postIndex: post.post_id,
  //   }))
  // );


function ensureAllPosts(data, totalPosts) {
  const allPostsData = [];

  for (let i = 1; i <= totalPosts; i++) {
    const postData = data.find(post => post.post_id === i);
    if (postData) {
      allPostsData.push(postData);
    } else {
      // Добавляем пустую запись для поста без данных
      allPostsData.push({
        post_id: i,
        cars: [],
      });
    }
  }
  return allPostsData;
}


  
function splitWorkStages(data) {
  const result = [];
  
  data.forEach(post => {
    const { post_id, cars } = post;

    cars.sort((a, b) => a.start_time - b.start_time); // сортируем работы по времени начала

    for (let i = 0; i < cars.length; i++) {
      const work = cars[i];
      let { start_time, end_time } = work;
      
      // Проверяем, если текущая работа пересекается с другими работами на этом посту
      for (let j = i + 1; j < cars.length; j++) {
        const nextWork = cars[j];

        if (nextWork.start_time < end_time && nextWork.start_time >= start_time) {
          // Если наложение, добавляем первый этап текущей работы до начала следующей
          result.push({
            ...work,
            post_id,
            stage_start: start_time,
            stage_end: nextWork.start_time-1,
          });
          
          // Обновляем начало текущей работы для следующего этапа
          start_time = nextWork.end_time > end_time ? end_time+1 : nextWork.end_time+1;
        } else {
          // Если больше наложений нет, завершаем текущий этап
          break;
        }
      }

      // Добавляем последний этап текущей работы
      result.push({
        ...work,
        post_id,
        stage_start: start_time,
        stage_end: end_time,
      });
    }
  });

  return result;
}
 // Функция для вставки пустых ячеек
function addEmptySlots(result, totalPosts) {
  const fullResult = [];
  const posts = new Set(result.map(item => item.post_id));
  const groupedByPost = result.reduce((acc, item) => {
    acc[item.post_id] = acc[item.post_id] || [];
    acc[item.post_id].push(item);
    return acc;
  }, {});

  const startOfDay = 9;
  const endOfDay = 17;

  for (let post_id = 1; post_id <= totalPosts; post_id++) {
    const works = groupedByPost[post_id] || [];
    let lastEnd = startOfDay;

    if (works.length === 0) {
      fullResult.push({
        post_id,
        workType: 'empty',
        stage_start: startOfDay,
        stage_end: endOfDay,
        background: 'rgba(255, 255, 255, 0.3)',
      });
    } else {
      works.forEach(work => {
        if (work.stage_start > lastEnd) {
          fullResult.push({
            post_id,
            workType: 'empty',
            stage_start: lastEnd,
            stage_end: work.stage_start-1,
            background: 'rgba(255, 255, 255, 0.3)',
          });
        }
        fullResult.push(work);
        lastEnd = work.end_time+1;
      });

      if (lastEnd <= endOfDay) {
        fullResult.push({
          post_id,
          workType: 'empty',
          stage_start: lastEnd,
          stage_end: endOfDay,
          background: 'rgba(255, 255, 255, 0.3)',
        });
      }
    }
  }

  return fullResult;
}

// let result = splitWorkStages(data);
// result = addEmptySlots(result);
const totalPosts = 4;

// Убедимся, что каждый пост имеет данные, даже если они пустые
const allPostsData = ensureAllPosts(data, totalPosts);

// Создаем этапы работ, разбивая их, если необходимо
let result = splitWorkStages(allPostsData);
result.sort((a, b) => {
  if (a.post_id === b.post_id) {
    return a.stage_start - b.stage_start; // Сортировка по stage_start, если post_id совпадают
  }
  return a.post_id - b.post_id; // Сортировка по post_id
});
// Добавляем пустые ячейки для отсутствующих работ
result = addEmptySlots(result, totalPosts);

  
result.sort((a, b) => {
  if (a.post_id === b.post_id) {
    return a.stage_start - b.stage_start; // Сортировка по stage_start, если post_id совпадают
  }
  return a.post_id - b.post_id; // Сортировка по post_id
});


  const datares = { dates: ['Пости/  Години', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00'],
  posts: ['Пост 1', 'Пост 2', 'Пост 3', 'Пост 4'],
    workItems: result
  }
  
  // console.log(datares);

  return (
    <div className={css.apptablecontainer}>
     
      <AppointmentGrid data={datares} />
    </div>
  );
};
