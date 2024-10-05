import Statistics from "../Statistics/Statistics";
import VideoFrame from "../VideoFrame/VideoFrame";
import CurrentCarsList from "../CurrentCarsList/CurrentCarsList";
import css from "./PageContent.module.css";
export default function PageContent() {
  return (
    <div className={css.pageContent}>
      <Statistics />
      <VideoFrame />
      <CurrentCarsList />
    </div>
  );
}
