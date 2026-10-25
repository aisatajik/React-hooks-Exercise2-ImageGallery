import { useEffect, useState } from "react";
import { fetchImages, PAGE_SIZE, SOURCE_NAME } from "../services/imageApi";
import ImageGrid from "../components/ImageGrid";
import LoadMoreButton from "../components/LoadMoreButton";
import Message from "../components/Message";
import styles from "./app.module.scss";

function App() {
  const [images, setImages] = useState([]); // all loaded images
  const [page, setPage] = useState(1); // current page number
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [retryKey, setRetryKey] = useState(0); // changes to re-run the fetch after an error

  // Fetch images when the page loads and whenever the page number changes
  useEffect(() => {
    let ignore = false;

    async function loadImages() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchImages(page);
        if (ignore) return;

        // Skip images that are already in the list
        setImages((prevImages) => {
          const ids = new Set(prevImages.map((image) => image.id));
          return [...prevImages, ...data.filter((image) => !ids.has(image.id))];
        });

        if (data.length < PAGE_SIZE) setHasMore(false);
      } catch (err) {
        if (ignore) return;
        setError(
          // "Failed to fetch" is a TypeError: the server could not be reached
          err instanceof TypeError
            ? "Could not connect to the image server. Please check your internet connection or VPN."
            : err.message
        );
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadImages();
    return () => {
      ignore = true;
    };
  }, [page, retryKey]);

  const handleLoadMore = () => setPage((prevPage) => prevPage + 1);
  const handleRetry = () => setRetryKey((prevKey) => prevKey + 1);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Image Gallery</h1>

      <ImageGrid images={images} />

      {loading && <Message>Loading images...</Message>}
      {error && <Message variant="error">{error}</Message>}

      <div className={styles.actions}>
        {hasMore ? (
          <LoadMoreButton
            onClick={error ? handleRetry : handleLoadMore}
            disabled={loading}
          >
            {error ? "Try Again" : "Load More"}
          </LoadMoreButton>
        ) : (
          <Message>All images have been loaded.</Message>
        )}
      </div>

      <p className={styles.source}>Images from {SOURCE_NAME}</p>
    </main>
  );
}

export default App;
