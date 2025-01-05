import css from "./ChannelItem.module.css";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
// import { useState } from "react";

export default function ChannelItem({
  index,
  channel,
  gmail,
  facebook,
  moveChannel,
}) {
  const ref = useRef(null);
  //   const [isDragActive, setIsDragActive] = useState(false);

  const [, drag] = useDrag(() => {
    // console.log("useDrag called for index:", index); // Лог для діагностики
    return {
      type: "ITEM",
      item: { index },
    };
  });

  const [, drop] = useDrop(() => ({
    accept: "ITEM",
    hover: (draggedItem) => {
      //   console.log("Hovered over index:", index);
      if (draggedItem.index !== index) {
        moveChannel(draggedItem.index, index);
        draggedItem.index = index; // Оновлюємо індекс перетягуваного елемента
      }
    },
  }));

  drag(drop(ref));

  return (
    <li key={channel.id} className={css.channelsListItem} ref={ref}>
      <div className={css.iconAndText}>
        <span className={css.iconBox}>
          <img
            src={channel.icon}
            alt=""
            className={`${css.channelImg} ${
              channel.icon === gmail && css.channelImgGmail
            } ${channel.icon === facebook && css.channelImgFB}`}
          />
        </span>
        <p className={css.channelName}>{channel.text}</p>
      </div>

      <div className={css.dragContainer}>
        <p className={css.numberBox}>{channel.value}</p>
        <RxDragHandleDots2 className={css.dragIcon} />
      </div>
    </li>
  );
}
