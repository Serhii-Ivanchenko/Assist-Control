import { Link, useNavigate } from "react-router-dom";
import css from './HomePage.module.css'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/video-control"); // Якщо залогінений, переходимо на /video-control
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={css.homePageContainer} >
      <Link className={css.link} to="/login">Вхід / Реєстрація</Link>
    </div>
  );
}
