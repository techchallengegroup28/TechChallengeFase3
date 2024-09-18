import React from 'react';
import styles from  '@/styles/modules/longText.module.css';

interface LongTextProps {
  text: string;
}

const LongText: React.FC<LongTextProps> = ({ text }) => {
  return (
    <div className={styles['long-text-container']}>
      <p>{text}</p>
    </div>
  );
};

export default LongText;
