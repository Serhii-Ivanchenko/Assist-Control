import { useEffect } from "react";

function useAutoScroll({ isOpen, containerRef, popupRef, lastItemRef }) {
  useEffect(() => {
    if (isOpen && containerRef.current && popupRef.current) {
      const container = containerRef.current;
      const popup = popupRef.current;
      const containerRect = container.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();

      const extraPadding = 10;

      if (popupRect.bottom + extraPadding > containerRect.bottom) {
        container.scrollTo({
          top:
            container.scrollTop +
            (popupRect.bottom - containerRect.bottom + extraPadding),
          behavior: "smooth",
        });
      } else if (popupRect.top - extraPadding < containerRect.top) {
        container.scrollTo({
          top:
            container.scrollTop -
            (containerRect.top - popupRect.top + extraPadding),
          behavior: "smooth",
        });
      }
    }
  }, [isOpen, containerRef, popupRef]);

  useEffect(() => {
    if (lastItemRef?.current) {
      setTimeout(() => {
        lastItemRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [lastItemRef]);
}

export default useAutoScroll;
