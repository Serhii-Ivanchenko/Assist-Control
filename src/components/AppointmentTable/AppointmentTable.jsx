import css from './AppointmentTable.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectDate } from "../../redux/cars/selectors.js";
import {selectVisits, selectServiceData } from '../../redux/crm/selectors.js'
import { getPlannedVisits, getServiceDataForBooking } from '../../redux/crm/operations.js'
import { selectSelectedServiceId } from "../../redux/auth/selectors.js";
import { changeActualDate } from "../../redux/cars/slice.js";
 import AppointmentGrid from '../AppointmentGrid/AppointmentGrid.jsx';



// Входные данные с дополнительным полем `workType` для определения вида работ
// const data = [
//   {
//     post_id: 1,
//     cars: [
//       { plate: 'AA6121CA', mechanic: 'Мироненко', start_time: 9, end_time: 13, workType: 'checkRepair' },
//       { plate: 'CA9867OO', mechanic: 'Мироненко', start_time: 14, end_time: 15, workType: 'repair' },
//     ],
//   },
//   {
//     post_id: 2,
//     cars: [
//       { plate: 'AC45660KO', mechanic: 'Мироненко', start_time: 9, end_time: 13, workType: 'repair' },
//       { plate: 'AA6121CA', mechanic: 'Шевчук', start_time: 15, end_time: 17, workType: 'viewRepair' },
//     ],
//   },
//   { post_id: 3,
//     cars: [
//       { plate: 'AC45660KO', mechanic: 'Мироненко', start_time: 9, end_time: 17, workType: 'repair' },
//       { plate: 'AA6121CA', mechanic: 'Шевчук', start_time: 12, end_time: 13, workType: 'checkRepair' },
//     ],
//   },
//  { post_id: 4,
//     cars: [
//       { plate: 'AC45660KO', mechanic: 'Мироненко', start_time: 9, end_time: 12, workType: 'viewRepair' },
//       { plate: 'AA6121CA', mechanic: 'Шевчук', start_time: 12, end_time: 13, workType: 'viewRepair' },
//     ],
//   },
//   { post_id: 5,
//     cars: [
//       { plate: 'AC45660KO', mechanic: 'Мироненко', start_time: 9, end_time: 10, workType: 'repair' },
//       { plate: 'AA6121CA', mechanic: 'Шевчук', start_time: 12, end_time: 15, workType: 'checkRepair' },
//     ],
//   },
// ];



// const groups = data.map((post) => ({
//   id: post.post_id,
//   title: `Пост ${post.post_id}`,
// }));


export default function AppointmentTable() {
  const dispatch = useDispatch();
  const carSelectDate = useSelector(selectDate);
  const selectedServiceId = useSelector(selectSelectedServiceId); 
  const crmSelectVisits = useSelector(selectVisits);
  const crmServiceData = useSelector(selectServiceData);
  const currentDate = new Date().toISOString().substring(0, 10);

useEffect(() => {
    if (carSelectDate === null) {
      dispatch(changeActualDate(currentDate));
    }
}, [carSelectDate, dispatch, currentDate]);
  
  
   useEffect(() => {

      const fetchVisitData = async () => {
        if (!selectedServiceId) {
          // console.warn("Service ID is not available yet. Skipping fetch.");
          return;
        }
          await dispatch(getServiceDataForBooking(carSelectDate));

          await dispatch(getPlannedVisits(carSelectDate));
        
      };

      fetchVisitData();
   
  }, [dispatch, carSelectDate, selectedServiceId]);

  // console.log(crmServiceData);
  // console.log(crmSelectVisits);
  const data = crmSelectVisits;
  const startOfDay = crmServiceData.workingHours.start_h;
  const endOfWorkDay = crmServiceData.workingHours.end_h;
  const endOfDay = crmServiceData.workingHours.end_h -1 ;
  const intervalHours = endOfWorkDay - startOfDay +1;
   

  const hours = Array.from({ length: intervalHours }, (_, i) => i + startOfDay); // Массив часов от 9 до 18

  const resultHours = hours.map(hour => hour.toString().padStart(2, '0') + '.00');
   resultHours.unshift('Пости/  Години');
  
  const referencePosts = crmServiceData.posts;

  // console.log(referencePosts);
  
  // const result = data.flatMap((post, postIndex) =>
  //   post.cars.map((car) => ({
  //     ...car,
  //     postIndex: post.post_id,
  //   }))
  // );


// function ensureAllPosts(data, totalPosts) {
//   const allPostsData = [];

//   for (let i = 1; i <= totalPosts; i++) {
//     const postData = data.find(post => post.post_id === i);
//     if (postData) {
//       allPostsData.push(postData);
//     } else {
//       // Добавляем пустую запись для поста без данных
//       allPostsData.push({
//         post_id: i,
//         cars: [],
//       });
//     }
//   }
//   return allPostsData;
  // }
  
  function ensureAllPosts(data, referencePosts) {
  const allPostsData = [];

  for (const post of referencePosts) {
    const postData = data.find(item => item.post_id === post.id_post);
    if (postData) {
      allPostsData.push(postData);
    } else {
      // Добавляем пустую запись для поста без данных
      allPostsData.push({
        post_id: post.id_post,
        cars: []
      });
    }
  }

  return allPostsData;
}


  
function splitWorkStages(data) {
  const result = [];
  
  data.forEach(post => {
    const { post_id, cars } = post;

     let sortedCars = [...cars].sort((a, b) => a.start_time - b.start_time); // сортируем работы по времени начала

    for (let i = 0; i < sortedCars.length; i++) {
      const work = sortedCars[i];
      let { start_time, end_time } = work;
      
      // Проверяем, если текущая работа пересекается с другими работами на этом посту
      for (let j = i + 1; j < sortedCars.length; j++) {
        const nextWork = sortedCars[j];

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
function addEmptySlots(result,  referencePosts) {
  const fullResult = [];
  const posts = new Set(result.map(item => item.post_id));
  const groupedByPost = result.reduce((acc, item) => {
    acc[item.post_id] = acc[item.post_id] || [];
    acc[item.post_id].push(item);
    return acc;
  }, {});

  // const startOfDay = 9;
  // const endOfDay = 17;

  for (const post of referencePosts) {
    const post_id = post.id_post;
    const works = groupedByPost[post_id] || [];
    let lastEnd = startOfDay;

    if (works.length === 0) {
      fullResult.push({
        car_id: null,
        post_id,
        service_name: "empty",
        stage_start: startOfDay,
        stage_end: endOfDay,
        background: "rgba(255, 255, 255, 0.3)",
      });
    } else {
      works.forEach(work => {
        if (work.stage_start > lastEnd) {
          fullResult.push({
            car_id: null,
            post_id,
            service_name: "empty",
            stage_start: lastEnd,
            stage_end: work.stage_start - 1,
            background: "rgba(255, 255, 255, 0.3)",
          });
        }
        fullResult.push(work);
        lastEnd = work.end_time+1;
      });

      if (lastEnd <= endOfDay) {
        fullResult.push({
          car_id: null,
          post_id,
          service_name: "empty",
          stage_start: lastEnd,
          stage_end: endOfDay,
          background: "rgba(255, 255, 255, 0.3)",
        });
      }
    }
  }

 // Функция для сопоставления post_id в fullResult с отсортированными постами
  const postIdOrder = new Map();
  referencePosts.forEach((post, index) => postIdOrder.set(post.id_post, index));

  // Сортируем fullResult в порядке наименований постов
  fullResult.sort((a, b) => postIdOrder.get(a.post_id) - postIdOrder.get(b.post_id));


  return fullResult;
}


// const totalPosts = 5;

// Убедимся, что каждый пост имеет данные, даже если они пустые
const allPostsData = ensureAllPosts(data, referencePosts);
  // console.log('r',allPostsData);
// Создаем этапы работ, разбивая их, если необходимо
let result = splitWorkStages(allPostsData);
result.sort((a, b) => {
  if (a.post_id === b.post_id) {
    return a.stage_start - b.stage_start; // Сортировка по stage_start, если post_id совпадают
  }
  return a.post_id - b.post_id; // Сортировка по post_id
});

  // console.log('r1',result);
  
   // Сначала сортируем справочник постов по name_post
  const sortedReferencePosts = [...referencePosts].sort((a, b) => a.name_post.localeCompare(b.name_post));

  
// Добавляем пустые ячейки для отсутствующих работ
result = addEmptySlots(result, sortedReferencePosts);

  //  console.log('r2',result);
// result.sort((a, b) => {
//   if (a.post_id === b.post_id) {
//     return a.stage_start - b.stage_start; // Сортировка по stage_start, если post_id совпадают
//   }
//   return a.post_id - b.post_id; // Сортировка по post_id
// });


  const datares = { dates: resultHours,
    posts: sortedReferencePosts,
      // ['Пост 1', 'Пост 2', 'Пост 3', 'Пост 4', 'Пост 5'],
    workItems: result
  }
  
  //  console.log(datares);

  return (
    <div className={css.apptablecontainer}>
     
      <AppointmentGrid data={datares} />
    </div>
  );
};
