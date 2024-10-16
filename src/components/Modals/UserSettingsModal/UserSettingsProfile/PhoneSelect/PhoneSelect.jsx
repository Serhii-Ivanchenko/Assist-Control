// import { useState } from 'react';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import css from "./PhoneSelect.module.css"

// export default function PhoneSelect() {
//     const [phone, setPhone] = useState('');

//     return (
//        <PhoneInput
//             country={'ua'}
//             value={phone}
//             onChange={(value) => setPhone(value)}
//             placeholder="1234567"
//             containerClass={css.container}
//             buttonClass={css.button}
//             inputClass={css.input}
//             dropdownClass={css.dropdown}
//             enableAreaCodes={true}
//             disableDropdown={false}
//             buttonStyle={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 backgroundColor: '#282828',
//                 borderColor: '#4A4A4A',
//                 borderRadius: '10px 0 0 10px',
//                 paddingLeft: '10px',
//                 paddingRight: '10px',
//             }}
//             inputStyle={{
//                 backgroundColor: '#282828',
//                 color: '#fff',
//                 borderColor: '#4A4A4A',
//                 borderLeft: 'none',
//                 borderRadius: '0 10px 10px 0',
//                 paddingLeft: '60px',
//                 fontSize: '16px',
//                 fontWeight: 400,
//                 lineHeight: 'normal',
//                 width: '100%',
//             }}
//             renderString={(selected) => (
//                 <div className={css.customButton}>
//                     <span className={`flag ${selected.iso2}`} />
//                     <span className={css.dialCode}>+{selected.dialCode}</span>
//                 </div>
//             )}
//         />
//     )
// }