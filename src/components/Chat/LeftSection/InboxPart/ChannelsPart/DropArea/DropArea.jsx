import css from "./DropArea.module.css";
import { useState } from "react";

export default function DropArea({ onDrop }) {
  // { handleDrop, index }
  const [showDrop, setShowDrop] = useState(false);
  //   console.log(showDrop);

  //   const handleDragLeave = (event) => {
  //     if (
  //       !event.relatedTarget ||
  //       !event.currentTarget.contains(event.relatedTarget)
  //     ) {
  //       console.log("leave");
  //       setShowDrop(false);
  //     }
  //   };

  //   useEffect(() => {
  //     console.log("showDrop updated:", showDrop);
  //   }, [showDrop]);

  return (
    <section
      className={`${showDrop ? css.dropArea : css.dropAreaHidden}`}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(event) => event.preventDefault()}
      //   className={`${showDrop ? css.dropArea : css.dropAreaHidden}`}
      //   onDragEnter={(event) => {
      //     event.preventDefault();
      //     console.log("enter");
      //     setShowDrop(true);
      //   }}
      //   onDragLeave={handleDragLeave}
      //   onDrop={(event) => {
      //     event.preventDefault();
      //     handleDrop(index);
      //     setShowDrop(false);
      //   }}
      //   onDragOver={(event) => event.preventDefault()}
    >
      {" "}
      drop here
    </section>
  );
}
