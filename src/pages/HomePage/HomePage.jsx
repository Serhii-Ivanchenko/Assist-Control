import { Link} from "react-router-dom";
import css from './HomePage.module.css'


export default function HomePage() {
  return (
    <div className={css.homePageContainer} >
      <Link className={css.link} to="/login">Вхід / Реєстрація</Link>
    </div>
  );
}
