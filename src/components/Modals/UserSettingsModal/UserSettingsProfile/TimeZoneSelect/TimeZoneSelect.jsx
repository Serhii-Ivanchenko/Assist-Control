import TimezoneSelect from "react-timezone-select"
import"./TimeZoneSelect.css"
export default function TimeZoneSelect({ field, form, onClick,...props}) {

    const handleChange = (value, ) => {
    form.setFieldValue(field.name, value.value);
    };
    
    const customStyles = {
        control: (provided) => ({
      ...provided,
      // Додаємо колір тексту для інпуту
      color: "var(--input-text)", 
    }),
        singleValue: (provided) => ({
            ...provided,
            color: "var(--input-text)", 
        }),
         input: (provided) => ({
      ...provided,
      color: "var(--input-text)", 
    }),
    }


    return (
         <TimezoneSelect
        value={field.value}
            onChange={handleChange}
            classNamePrefix="custom-select"
            styles={customStyles}
            onClick={onClick}
            // className={.customSelect} // Додаємо свій клас для стилізації
            theme={(theme) => ({
        ...theme,
                borderRadius: 4,
        
        colors: {
          ...theme.colors,
          primary25: "var(--bg-secondary)", // Цвет при наведении
            primary: "var(--bg-secondary)", // Основной цвет
            menuBackground: "var(--bg-input)",
        },
            })}
      />
    )
}