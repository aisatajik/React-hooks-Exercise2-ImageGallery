import styles from "./loadMoreButton.module.scss";

function LoadMoreButton({ onClick, disabled, children }) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default LoadMoreButton;
