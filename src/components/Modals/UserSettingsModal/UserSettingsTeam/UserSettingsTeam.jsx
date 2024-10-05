import TeamList from "./TeamList/TeamList";
import css from "./UserSettingsTeam.module.css"

export default function UserSettingsTeam() {
    return (
        <div className={css.teamBox}>
            <div className={css.contentBox}>
                <p className={css.title}>Команда</p>
                <p className={css.text}>Додайте нового користувача до команди, надавши йому права доступу.
                    <br />
                    <br/>
                    Вкажіть ім&apos;я та електронну адресу нового члена команди для завершення процесу.</p>
                <button type="button" className={css.addBtn}>Додати користувача</button>
            </div>
            <TeamList/>
        </div>
    )
}