import css from "./UserSettingsAccount.module.css";

export default function UserSettingsAccount() {
  return (
    <div className={css.accountBox}>
      <p className={css.titles}>Пошта</p>
      <p className={css.email}>autoassist@gmail.com</p>

      <p className={css.titles}>Пароль</p>
      <button className={css.passwortChBtn}>Змінити пароль</button>

      <p className={css.titles}>Назва компанії</p>
      <input className={css.inputs} />

      <p className={css.titles}>Мова</p>
      <select id="languages" name="languages" className={css.inputs}>
        <option value="ukr" selected>
          Українська
        </option>
        <option value="eng">English</option>
      </select>

      <div className={css.btnBox}>
        <button className={css.cancelBtn}>Відміна</button>
        <button className={css.saveBtn}>Зберегти зміни</button>
      </div>
    </div>
  );
}
