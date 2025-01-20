import css from "./ChannelItem.module.css";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useState } from "react";

export default function ChannelItem({
  index,
  channel,
  gmail,
  facebook,
  handleFilter,
  handleDragOver,
  isActive,
  handleIsActive,
  onDragStart,
  flashingBorder,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingElement, setDraggingElement] = useState(null);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart(e, index);

    // Зберігаємо початкове зміщення між курсором і позицією елемента
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Зберігаємо значення зміщення в стані
    setInitialX(offsetX);
    setInitialY(offsetY);

    // Створюємо дубліката елемента для перетягування
    const dragElement = e.target.cloneNode(true);
    dragElement.style.position = "absolute";
    dragElement.style.pointerEvents = "none";
    dragElement.classList.add(css.cloneDragging);

    document.body.appendChild(dragElement);
    setDraggingElement(dragElement);

    // Відміняємо стандартний образ перетягування
    const img = new Image();
    img.src = "";
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e) => {
    if (draggingElement) {
      const currentX = e.clientX;
      const currentY = e.clientY;

      // Обновляємо позицію дубліката, додаючи зміщення
      draggingElement.style.top = `${currentY - initialY}px`;
      draggingElement.style.left = `${currentX - initialX}px`;
    }
  };
  const handleDragEnd = (e) => {
    setIsDragging(false);

    // Відновлюємо початковий стан оригінального елемента
    e.target.style.transform = "";

    // Видаляємо дублікат
    if (draggingElement) {
      document.body.removeChild(draggingElement);
      setDraggingElement(null);
    }
  };

  return (
    <li
      key={channel.id}
      className={`${css.channelsListItem} ${
        isActive === channel.id ? css.channelsListItemActive : ""
      } 
        ${isDragging ? css.isDragging : ""}  `}
      onClick={(e) => {
        handleFilter(e, channel.type, "channel");
        handleIsActive(channel.id);
      }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={(event) => handleDragOver(event, index)}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
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
        <p
          className={`${css.numberBox} ${
            (channel.value === 0 || !channel.value) && css.numberBoxHidden
          } 
          ${flashingBorder(channel.type)}`}
        >
          {channel.value}
        </p>
        <span className={css.dragIcon}>
          <RxDragHandleDots2 className={css.dragIcon} />
        </span>
      </div>
    </li>
  );
}
