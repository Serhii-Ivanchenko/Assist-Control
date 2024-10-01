import { Oval } from "react-loader-spinner";
import css from "./Loader.module.css";


export default function Loader() {
  return (
    <div className={css.loader}>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#DB8120"
        secondaryColor="#4A4A4A"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p>Будь ласка, зачекайте...</p>
    </div>
  );
}
