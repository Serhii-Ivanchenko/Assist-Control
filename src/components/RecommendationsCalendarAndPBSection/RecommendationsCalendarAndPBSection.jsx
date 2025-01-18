import RecommendationsCalendar from './RecommendationsCalendar/RecommendationsCalendar.jsx';
import css from './RecommendationsCalendarAndPBSection.module.css'
import RecommendationsPBSection from './RecommendationsPBSection/RecommendationsPBSection.jsx';

export default function RecommendationsCalendarAndPBSection() {
    return (
        <div className={css.wrapper}>
            <RecommendationsCalendar />
            <RecommendationsPBSection/>
      </div>
    );
};
