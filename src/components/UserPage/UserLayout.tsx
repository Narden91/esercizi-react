import React from 'react';
import styles from "./user.module.css";

export const UserLayout: React.FC = ({children}) => {
  return (
    <div className={`${styles.tifBackground}`}>
      {children}
   </div>
  );
};
