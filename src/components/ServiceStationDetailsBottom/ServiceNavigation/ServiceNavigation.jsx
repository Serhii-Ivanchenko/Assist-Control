import css from "./ServiceNavigation.module.css"
import clsx from "clsx"
import { BsChevronRight, BsChevronLeft  } from "react-icons/bs";



export default function ServiceNavigation({page, setPage}) {
    return (
        <div className={css.navSettings}>

            <span className={css.arrowBtn}> <BsChevronLeft className={css.arrow } size={18}/> </span>
            
        <div className={css.btnBox}>
            <button className={css.btnService}>
                <p className={css.title}>Камери</p>
                <p className={css.value}>4</p>
            </button>
            <button type="button"
                onClick={()=>setPage("station")}
                className={clsx(css.btnService, {[css.isActiveBtn]: page === "station"})}>
                <p className={css.title}>Пости</p>
                <p className={css.value}>4</p>
            </button>
            <button type="button"
                onClick={()=>setPage("staff")}
                className={clsx(css.btnService, { [css.isActiveBtn]: page === "staff" })}>
                <p className={css.title}>Персонал</p>
                <p className={css.value}>8</p>
            </button>
            <button type="button"
                onClick={()=>setPage("works")}
                className={clsx(css.btnService, { [css.isActiveBtn]: page === "works" })}>
                <p className={css.title}>ПРАЙС</p>
                <p className={`${css.value} ${css.valueWords}`}>Роботи</p>
            </button>
            <button type="button"
                onClick={()=>setPage("spares")}
                className={clsx(css.btnService, { [css.isActiveBtn]: page === "spares" })}>
                <p className={css.title}>НАЦІНКА</p>
                <p className={`${css.value} ${css.valueWords}`}>Запчастини</p>
            </button>
             <button type="button"
                onClick={()=>setPage("warehouse")}
                className={clsx(css.btnService, { [css.isActiveBtn]: page === "warehouse" })}>
                <p className={css.title}>СКЛАД</p>
                {/* <p className={`${css.value} ${css.valueWords}`}>НАЦІНКА</p> */}
            </button>
            </div>
             <span className={css.arrowBtn}> <BsChevronRight className={css.arrow } size={18}/> </span>
        </div>
    )
}