import css from "./RecommendationsPage.module.css";
import RecommendationsControlBar from "../../components/RecommendationsControlBar/RecommendationsControlBar.jsx";
import RecommendationsCalendarAndPBSection from "../../components/RecommendationsCalendarAndPBSection/RecommendationsCalendarAndPBSection.jsx";
import RecommendationsCardsSection from "../../components/RecommendationsCardsSection/RecommendationsCardsSection.jsx";

export default function RecommendationsPage() {
  return (
    <div className={css.wrapper}>
      <RecommendationsControlBar />
      <RecommendationsCalendarAndPBSection />
      <RecommendationsCardsSection/>
    </div>
  );
}
