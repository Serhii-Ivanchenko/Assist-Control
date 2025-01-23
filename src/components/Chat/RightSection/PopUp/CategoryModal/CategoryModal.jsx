import clsx from "clsx";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.jsx"; // Импортируем ModalWrapper
import css from "./CategoryModal.module.css";

const CategoryModal = ({ isOpen, onClose, categories, activeCategory, onSelect, triggerRef }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
      <div className={css.categorySelector}>
        {categories.map((category) => (
          <div
            className={clsx(css.category, {
              [css.categoryActive]: category.categ === activeCategory.categ,
            })}
            key={category.categ}
            onClick={() => {
              onSelect(category); // Передаем выбранную категорию в родительский компонент
              onClose(); // Закрываем модалку
            }}
          >
            {category.fullname}
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default CategoryModal;