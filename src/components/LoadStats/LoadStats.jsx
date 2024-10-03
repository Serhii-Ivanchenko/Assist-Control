import styles from './LoadStats.module.css';
import ellipseImg from '../../assets/images/ellipseLoad.png';
import gridImg from '../../assets/images/grid.png';
import chartImg from '../../assets/images/chart.png';
import { FiArrowUpRight } from 'react-icons/fi';


export default function LoadStats() {
  return (
    <div className={styles.loadStatsContainer}>
      <img src={ellipseImg} alt="Ellipse" className={styles.ellipse} />
      <img src={gridImg} alt="Grid" className={styles.grid} />
      <img src={chartImg} alt="Chart" className={styles.chart} />
      <div className={styles.statsInfo}>
        <div className={styles.percentage}>
          <span className={styles.num}>117</span><span className={styles.symbol}>%</span>
          <div className={styles.iconBtn}>
          <FiArrowUpRight className={styles.icon} />
          </div>
        </div>
        <p className={styles.description}>Завантаження сервісу</p>
      </div>
    </div>
  );
}
