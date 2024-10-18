import { useState } from 'react';
import css from "./PhoneSelect.module.css"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';



export default function PhoneSelect() {
    const [phone, setPhone] = useState('');

    return (
       <PhoneInput
            country={'ua'}
            value={phone}
            onChange={(value) => setPhone(value)}
            placeholder="1234567"
            containerClass={css.container}
            buttonClass={css.button}
            inputClass={css.input}
            dropdownClass={css.dropdown}
            // enableAreaCodes={true}
            // disableDropdown={false}
            containerStyle={
                {
                    display: 'flex',
                    marginTop: '8px',
                    // marginBottom: '12px',
                    
                }
            }
            buttonStyle={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#282828',
                borderColor: '#4A4A4A',
                borderRadius: '10px 0 0 10px',
                paddingLeft: '10px',
                paddingRight: '10px',
            }}
            inputStyle={{
                backgroundColor: '#282828',
                color: '#fff',
                borderColor: '#4A4A4A',
                borderLeft: 'none',
                borderRadius: '10px',
                paddingLeft: '70px',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 'normal',
                height: '56px',
                width: '420px',
            }}
            // renderString={(selected) => (
            //     <div className={css.customButton}>
            //         <span className={`flag ${selected.iso2}`} />
            //         <span className={css.dialCode}>+{selected.dialCode}</span>
            //     </div>
            // )}
        />
    )
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











