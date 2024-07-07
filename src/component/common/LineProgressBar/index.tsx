'use client'
import React from "react";
import styles from './styles.module.css'

interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  return (
    <div className={styles["progress-container"]}>
      <div className={styles["progress"]}>
        <div className={styles["progress-small"]}>
          <div className={styles["progress-bar"]} style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;