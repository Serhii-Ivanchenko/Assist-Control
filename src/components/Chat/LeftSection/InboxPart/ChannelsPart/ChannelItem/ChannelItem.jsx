import css from "./ChannelItem.module.css";
import { RxDragHandleDots2 } from "react-icons/rx";
// import { useRef } from "react";
// import { useState } from "react";
// import { useDraggable } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";

export default function ChannelItem({
  index,
  channel,
  gmail,
  facebook,
  // id,
  handleFilter,
  // moveChannel,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  isActive,
  handleIsActive,
}) {
  // const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
  //   id,
  // });

  // const style = {
  //   opacity: isDragging ? 0.5 : 1,
  //   // cursor: "move",
  //   // ...CSS.Transform.toString(),
  // };
  // const ref = useRef(null);
  //   const [isDragActive, setIsDragActive] = useState(false);

  return (
    <li
      key={channel.id}
      className={`${css.channelsListItem} ${
        isActive === channel.id ? css.channelsListItemActive : ""
      }`}
      // style={style}
      // ref={setNodeRef}
      // {...listeners}
      // {...attributes}
      onClick={(e) => {
        handleFilter(e, channel.type);
        handleIsActive(channel.id);
      }}
      // ref={ref}
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={(event) => handleDragOver(event, index)}
      onDragEnd={handleDragEnd}
    >
      <div className={css.iconAndText}>
        <span className={css.iconBox}>
          {channel.type === "site" ? (
            channel.icon
          ) : (
            <img
              src={channel.icon}
              alt=""
              className={`${css.channelImg} ${
                channel.icon === gmail && css.channelImgGmail
              } ${channel.icon === facebook && css.channelImgFB}`}
            />
          )}
        </span>
        <p className={css.channelName}>{channel.text}</p>
      </div>

      <div className={css.dragContainer}>
        <p className={css.numberBox}>{channel.value}</p>
        <span
          className={css.dragIcon}

          // draggable
          // onDragStart={(event) => handleDragStart(event, index)}
          // onDragOver={(event) => handleDragOver(event, index)}
          // onDragEnd={(event) => handleDragEnd(event)}
        >
          <RxDragHandleDots2
            className={css.dragIcon}
            // {...listeners}
            // {...attributes}
          />
        </span>
      </div>
    </li>
  );
}
