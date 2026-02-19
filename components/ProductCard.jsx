import { useState } from "react";
import styles from "../styles/ProductCard.module.css";

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  const seoAlt = slugify(product.title) + "-sustainable-product";
  const isNew = product.id <= 2;
  const isOutOfStock = product.id === 2;

  return (
    <article
      className={styles.card}
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Image Area */}
      <div className={styles.imageWrap}>
        <img
          src={product.image}
          alt={seoAlt}
          className={styles.image}
          loading="lazy"
          itemProp="image"
        />
        {isNew && !isOutOfStock && (
          <span className={styles.badge}>NEW PRODUCT</span>
        )}
        {isOutOfStock && (
          <span className={`${styles.badge} ${styles.badgeOut}`}>OUT OF STOCK</span>
        )}
      </div>

      {/* Info: name + heart on same row, price below */}
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <h2 className={styles.name} itemProp="name">
            {product.title}
          </h2>
          <button
            className={styles.wishlistBtn}
            onClick={() => setWishlisted(!wishlisted)}
            aria-label={`${wishlisted ? "Remove from" : "Add to"} wishlist`}
            aria-pressed={wishlisted}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={wishlisted ? "#e53935" : "none"}
              stroke={wishlisted ? "#e53935" : "#777"}
              strokeWidth="1.8"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <p className={styles.price}>
          <a href="/login" className={styles.priceLink}>
            Sign in or Create an account to see pricing
          </a>
        </p>
      </div>
    </article>
  );
}