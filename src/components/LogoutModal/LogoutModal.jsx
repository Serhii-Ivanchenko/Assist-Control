import css from './LogoutModal.module.css'

export default function LogoutModal() {
    return (
        <div className={css.logoutBox}>
            <h3>Вихід</h3>
            <p>Ви дійсно бажаєте вийти?</p>
            <div className={css.btnBox}>
            <button type="button" className={css.btn}>Вихід</button>
            <button type="button" className={css.btn}>Відміна</button>
            </div>
        </div>
    )
}
