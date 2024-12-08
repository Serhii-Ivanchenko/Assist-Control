import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import css from "./AnimatedContent.module.css"

export default function AnimatedContent ({ children })  {
  const { values } = useFormikContext(); // Отримуємо доступ до values із Formik
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [animateOnMount, setAnimateOnMount] = useState(false);

  useEffect(() => {
    if (values.schedule) {
      setAnimationInProgress(true); // Додаємо в DOM
      setTimeout(() => setAnimateOnMount(true), 10); // Активуємо анімацію
    } else {
      setAnimateOnMount(false); // Починаємо закриття
      const timeout = setTimeout(() => setAnimationInProgress(false), 300); // Видаляємо з DOM після завершення
      return () => clearTimeout(timeout);
    }
  }, [values.schedule]);

  return (
    animationInProgress && (
      <div
        className={`${css.scincenter} ${animateOnMount ? css.show : css.hide}`}
        onTransitionEnd={() => {
          if (!animateOnMount) {
            setAnimationInProgress(false); // Видаляємо після завершення анімації
          }
        }}
      >
        {children}
      </div>
    )
  );
};
