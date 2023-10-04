import styles from "@/styles/Card.module.css";

export const Card = ({ title, subtitle = "", body, isLoading = false }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      {subtitle && <h5>{subtitle}</h5>}
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div className={styles.body}>
          {body}
        </div>
      )}
    </div>
  );
};
