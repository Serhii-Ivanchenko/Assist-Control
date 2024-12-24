import { Outlet } from "react-router-dom";
import css from "./InvoiceListSection.module.css";
import {
  // useEffect,
  useRef,
} from "react";
import { useState } from "react";

export default function InvoiceListSection() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  // const [startX, setStartX] = useState(0);
  // const [scrollLeft, setScrollLeft] = useState(0);

  // const handleMouseDown = (e) => {
  //   const container = containerRef.current;
  //   // setIsDragging(true);
  //   // setStartX(e.pageX - container.offsetLeft);
  //   // setScrollLeft(container.scrollLeft);
  // };

  // const handleMouseLeave = () => {
  //   setIsDragging(false);
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  // };

  const onMouseDown = () => {
    setIsDragging(true);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const container = containerRef.current;

    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const percentX = mouseX / containerRect.width;
    const percentY = mouseY / containerRect.height;

    const scrollX = percentX * (container.scrollWidth - containerRect.width);
    const scrollY = percentY * (container.scrollHeight - containerRect.height);

    container.scrollTo(scrollX, scrollY);
  };

  const handleWheel = (e) => {
    const container = containerRef.current;
    container.scrollLeft += e.deltaY;
    e.preventDefault();
  };

  return (
    <div
      className={css.wrapper}
      ref={containerRef}
      onWheel={handleWheel}
      // onMouseDown={handleMouseDown}
      // onMouseLeave={handleMouseLeave}
      // onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseDown={onMouseDown}
    >
      <Outlet />
    </div>
  );
}
