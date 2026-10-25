import styles from "./message.module.scss";

// variant: "info" (default) | "error"
function Message({ variant = "info", children }) {
  return <p className={`${styles.message} ${styles[variant]}`}>{children}</p>;
}

export default Message;
