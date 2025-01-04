import { Link } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

export default function NotFoundPage() {
  return (
    <div>
      <p>Ууупс, сторінку не знайдено!!!</p>
      <Link to="/video-control">Повернутись до Відеоконтролю</Link>
    </div>
  );
}
