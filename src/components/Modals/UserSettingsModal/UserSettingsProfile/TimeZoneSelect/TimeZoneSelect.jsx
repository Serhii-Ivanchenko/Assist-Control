import TimezoneSelect from "react-timezone-select"
import"./TimeZoneSelect.css"
export default function TimeZoneSelect({ field, form, ...props }) {

    const handleChange = (value) => {
    form.setFieldValue(field.name, value.value);
  };


    return (
         <TimezoneSelect
        value={field.value}
        onChange={handleChange}
        // className={.customSelect} // Додаємо свій клас для стилізації
      />
    )
}