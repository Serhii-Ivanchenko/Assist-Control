import { DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import css from "./SortableOverlay.module.css";

// Налаштування анімації для скидання
const dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

export default function SortableOverlay({ children }) {
  return (
    <DragOverlay className={css.overlay} dropAnimation={dropAnimationConfig}>
      {children}
    </DragOverlay>
  );
}
