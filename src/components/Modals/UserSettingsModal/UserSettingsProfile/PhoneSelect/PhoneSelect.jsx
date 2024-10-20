// import { useState } from 'react';
import css from "./PhoneSelect.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../../../../redux/auth/selectors';

export default function PhoneSelect({ value, onChange }) {
  // const user = useSelector(selectUser)

  return (
    <PhoneInput
      country={"ua"}
      value={value}
      onChange={onChange}
      placeholder="1234567"
      containerClass={css.container}
      buttonClass={css.button}
      inputClass={css.input}
      dropdownClass={css.dropdown}
      // enableAreaCodes={true}
      // disableDropdown={false}
      containerStyle={{
        display: "flex",
        marginTop: "8px",
        // marginBottom: '12px',
      }}
      buttonStyle={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--drop-menu)",
        borderColor: "var(--input-stroke)",
        borderRadius: "10px 0 0 10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        // width: '100px',
      }}
      inputStyle={{
        backgroundColor: "var(--bg-input)",
        color: "var(--light-gray)",
        borderColor: "var(--input-stroke)",
        borderLeft: "none",
        borderRadius: "10px",
        paddingLeft: "70px",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "normal",
        height: "56px",
        width: "420px",
      }}
      // renderString={(selected) => (
      //     <div className={css.customButton}>
      //         <span className={`flag ${selected.iso2}`} />
      //         <span className={css.dialCode}>+{selected.dialCode}</span>
      //     </div>
      // )}
    />
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
