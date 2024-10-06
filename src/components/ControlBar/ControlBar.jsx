import SearchBar from "../SearchBar/SearchBar.jsx";
import Support from "../Support/Support.jsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.jsx";
import css from './ControlBar.module.css'

export default function ControlBar() {
  return <div className={css.wrapper}>
    <SearchBar />
    <ThemeSwitcher />
    <Support />
  </div>;
}
