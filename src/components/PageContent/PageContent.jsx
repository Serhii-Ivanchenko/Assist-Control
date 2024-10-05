import Statistics from "../Statistics/Statistics";
import VideoFrame from "../VideoFrame/VideoFrame";
import css from "./PageContent.module.css";
export default function PageContent() {
  return (
    <div className={css.pageContent}>
      <Statistics />
      <VideoFrame />
    </div>
  );
}
