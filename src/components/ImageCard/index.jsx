import styles from "./imageCard.module.scss";

function ImageCard({ image }) {
  return (
    <figure className={styles.card}>
      <img className={styles.image} src={image.url} alt={image.alt} loading="lazy" />
      <figcaption className={styles.caption}>{image.author}</figcaption>
    </figure>
  );
}

export default ImageCard;
