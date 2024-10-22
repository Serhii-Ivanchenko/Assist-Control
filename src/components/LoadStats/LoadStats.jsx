import styles from './LoadStats.module.css';
import statsChart from '../../assets/images/statsChart.png';
import { FiArrowUpRight } from 'react-icons/fi';


export default function LoadStats() {
  return (
    <div className={styles.loadStatsContainer}>
      <img src={statsChart} alt="Stats Chart" className={styles.statsChart} />
      <div className={styles.statsInfo}>
        <div className={styles.percentage}>
          <span className={styles.num}>117</span><span className={styles.symbol}>%</span>
          <div className={styles.iconBtn}>
          <FiArrowUpRight className={styles.icon} color='#3CBC81' />
          </div>
        </div>
        <p className={styles.description}>Завантаження сервісу</p>
      </div>
    </div>
  );
}
