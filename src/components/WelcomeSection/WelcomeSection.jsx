import css from "../../components/WelcomeSection/WelcomeSection.module.css";

export default function WelcomeSection() {
  return (
    <div className={css.welcomeSection}>
      <h2 className={css.welcomeHeader}>Welcome to your dashboard</h2>
      <p className={css.welcomeText}>Sign in to explore change we`ve made</p>
    </div>
  );
}
