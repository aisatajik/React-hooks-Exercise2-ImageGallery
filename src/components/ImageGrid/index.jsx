import ImageCard from "../ImageCard";
import styles from "./imageGrid.module.scss";

function ImageGrid({ images }) {
  return (
    <div className={styles.grid}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}

export default ImageGrid;
