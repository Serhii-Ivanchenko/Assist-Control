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

  const handleWheel = (e) => {
    const container = containerRef.current;
    container.scrollLeft += e.deltaY;
    e.preventDefault();
  };

  return (
    <div className={css.wrapper} ref={containerRef} onWheel={handleWheel}>
      <Outlet />
    </div>
  );
}
