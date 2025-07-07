import styles from "./settingsPage.module.css";
import VerticalTaskBar from "../vertical-task-bar/VerticalTaskBar";

export default function SettingsPage() {
  return (
    <div className={styles.layout}>
      <VerticalTaskBar currentNumber={2} />
      <div className={styles.settingsContainer}>
        <h1 className={styles.title}>Paramètres</h1>

        <section className={styles.section}>
          <h2>Langue</h2>
          <select className={styles.select} disabled>
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
          <p className={styles.note}>
            La sélection sera disponible prochainement
          </p>
        </section>

        <section className={styles.section}>
          <h2>Préférences</h2>
          <label className={styles.switchLabel}>
            <input type="checkbox" className={styles.switch} disabled />
            Activer le thème sombre (bientôt dispo)
          </label>
          <label className={styles.switchLabel}>
            <input type="checkbox" className={styles.switch} disabled />
            Recevoir des notifications par email
          </label>
        </section>

        <section className={styles.section}>
          <h2>À propos</h2>
          <ul className={styles.infoList}>
            <li>
              <strong>Version :</strong> 1.0.0
            </li>
            <li>
              <strong>Licence :</strong> MIT
            </li>
            <li>
              <strong>Développé par :</strong> @armanceau
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
