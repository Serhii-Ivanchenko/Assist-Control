// import { useState } from 'react';
import "./PhoneSelect.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BsFillCaretDownFill } from "react-icons/bs";
// import { useEffect } from 'react';
// import { useRef } from 'react';

// import { useSelector } from 'react-redux';
// import { selectUser } from '../../../../../redux/auth/selectors';

export default function PhoneSelect({ field, form, ...props }) {

   const handleChange = (value) => {
    form.setFieldValue(field.name, value);
  };

// const [hover, setHover] = useState(false)
  // const user = useSelector(selectUser)
  // const [activeDropdown, setActiveDropdown] = useState(false);
  // const phoneInputRef = useRef(null);

  
  // const handleToggleDropdown = () => {
  //   setActiveDropdown(!activeDropdown);
  // };

  // const handleCloseDropdown = (event) => {
  //   if (phoneInputRef.current && !phoneInputRef.current.contains(event.target)) {
  //     setActiveDropdown(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('click', handleCloseDropdown);

  //   return () => {
  //     document.removeEventListener('click', handleCloseDropdown);
  //   };
  // }, []);

  //  useEffect(() => {
  //   const buttonElement = buttonRef.current?.querySelector('.flag-dropdown');
  //   if (buttonElement) {
  //     buttonElement.addEventListener('click', handleToggleDropdown);
  //   }

  //   return () => {
  //     if (buttonElement) {
  //       buttonElement.removeEventListener('click', handleToggleDropdown);
  //     }
  //   };
  // }, []);


  return (
    <div className="phoneBox">
    <PhoneInput
      country={"ua"}
        value={field.value}
        isValid={true}
      onChange={handleChange}
      placeholder="1234567"
      // containerClass={css.container}
      // buttonClass={css.button}
      // inputClass={css.input}
      // dropdownClass={css.dropdown}
      // enableAreaCodes={true}
      // disableDropdown={false}
      containerStyle={{
        display: "flex",
        marginTop: "8px",
      }}
      buttonStyle={{
        display: "flex",
        alignItems: "center",
        backgroundColor:"var(--drop-menu)",
        borderColor: "var(--input-stroke)",
        borderRadius: "10px 0 0 10px",
        // paddingLeft: "10px",
        // paddingRight: "10px",
        width:"80px",
      }}
      inputStyle={{
        backgroundColor: "var(--bg-input)",
        color: "var(--light-gray)",
        borderColor: "var(--input-stroke)",
        borderLeft: "none",
        borderRadius: "10px",
        paddingLeft: "90px",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "normal",
        height: "56px",
        width: "420px",
      }}
      dropdownStyle={{
        backgroundColor: "var(--bg-input)",
        marginTop: '8px',
        }}
        //  onClick={handleToggleDropdown}
      />

<BsFillCaretDownFill className="arrowPhone" />
    </div>
  );
}

// import { BsChevronDown } from "react-icons/bs";
// import "flag-icons/css/flag-icons.min.css";
// const countryCodes = [
//     { code: '+380', name: 'Україна', flag: 'fi-ua' },
//     { code: '+44', name: 'Великобританія', flag: 'fi-gb' },
// ]

// export default function PhoneSelect({field, form}) {

// const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
// const [phone, setPhone] = useState('');
// const [showDropdown, setShowDropdown] = useState(false);

//     const { name, value, onChange } = field;

//     const handleCodeSelect = (country) => {
//         setSelectedCode(country);
//         setShowDropdown(false);
//     };

//     return (
//         <div className={css.phoneInputContainer}>
//             <div
//                 className={css.codeButton}
//                 onClick={() => setShowDropdown((prev) => !prev)}
//             >
//                 <span className={`fi ${selectedCode.flag} ${css.icon}`} />
//                  {selectedCode.code}
//                  <BsChevronDown className={`${css.arrowSelect} ${ showDropdown ? css.rotated : ''}`}  />
//             </div>
//             {showDropdown && (
//                 <div className={css.dropdown}>
//                     {countryCodes.map((country) => (
//                         <div
//                             key={country.code}
//                             className={css.countryOption}
//                             onClick={() => handleCodeSelect(country)}
//                         >
//                             <span className={`fi ${country.flag} ${css.icon}`} />
//                             {country.code}
//                         </div>
//                     ))}
//                 </div>
//             )}
//             <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="123456789"
//                 className={css.phoneInput}
//             />
//         </div>
//     )
// }
