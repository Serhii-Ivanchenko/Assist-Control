import Archive from "../Archive/Archive.jsx";
import ChatBtn from "../ChatBtn/ChatBtn.jsx";
import LogOut from "../LogOut/LogOut.jsx";
import NewServiceBookingBtn from "../NewServiceBookingBtn/NewServiceBookingBtn.jsx";
import PhoneCalls from "../PhoneCalls/PhoneCalls.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Support from "../Support/Support.jsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.jsx";
import css from "./ControlBar.module.css";

export default function ControlBar() {
  
  return (
    <div className={css.wrapper}>
      <NewServiceBookingBtn />
      <Archive />
      {/* <SearchBar /> */}
      <ThemeSwitcher />
      <Support />
      <PhoneCalls />
      <ChatBtn />
      <LogOut />
    </div>
  );
}
