import { Outlet } from "react-router-dom";
import css from "./InvoiceListSection.module.css";
import {
  // useEffect,
  useRef,
} from "react";

export default function InvoiceListSection() {
  const containerRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = (evt) => {
  //     evt.preventDefault();
  //     containerRef.current.scrollLeft += evt.deltaY * 2;
  //   };

  //   containerRef.current.addEventListener("wheel", handleScroll);

  //   return () => {
  //     containerRef.current.removeEventListener("wheel", handleScroll);
  //   };
  // }, []);

  // Майже робочий варіант)
  // const handleWheel = (e) => {
  //   const container = containerRef.current;

  //   // Якщо мишка НЕ над списком карток
  //   if (!e.target.closest("li")) {
  //     container.scrollLeft += e.deltaY; // Горизонтальний скрол
  //     e.preventDefault(); // Забороняємо стандартний скрол
  //   }
  // };

  const handleWheel = (e) => {
    const container = containerRef.current;

    // Горизонтальний скрол, якщо подія не зупинена дочірнім елементом
    container.scrollLeft += e.deltaY;
    e.preventDefault(); // Забороняємо стандартний скрол
  };

  return (
    <div className={css.wrapper} ref={containerRef} onWheel={handleWheel}>
      <Outlet />
    </div>
  );
}
