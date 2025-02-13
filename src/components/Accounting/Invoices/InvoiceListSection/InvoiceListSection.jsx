import { Outlet } from "react-router-dom";
import css from "./InvoiceListSection.module.css";
import {
  // useEffect,
  useRef,
} from "react";
import { useState } from "react";
// import { useEffect } from "react";

export default function InvoiceListSection() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0); // Початкова позиція миші
  const scrollLeftRef = useRef(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    scrollLeftRef.current = containerRef.current.scrollLeft;
    containerRef.current.style.scrollBehavior = "auto";
  };

  const onMouseUp = () => {
    setIsDragging(false);

    containerRef.current.style.scrollBehavior = "";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startXRef.current; // Різниця між поточною і початковою позицією миші
    containerRef.current.scrollLeft = scrollLeftRef.current - dx;
  };

  const handleWheel = (e) => {
    const container = containerRef.current;
    container.scrollLeft += e.deltaY;
    // e.preventDefault();
  };

  return (
    <div
      className={css.wrapper}
      ref={containerRef}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseDown={onMouseDown}
    >
      <Outlet />
    </div>
  );
}
