import { useState, useMemo } from "react";
import Head from "next/head";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const SORT_OPTIONS = [
  { value: "recommended", label: "RECOMMENDED" },
  { value: "newest", label: "NEWEST FIRST" },
  { value: "popular", label: "POPULAR" },
  { value: "price-high", label: "PRICE: HIGH TO LOW" },
  { value: "price-low", label: "PRICE: LOW TO HIGH" },
];

export default function Home({ products = [] }) {
  const [filterVisible, setFilterVisible] = useState(true);
  const [sortValue, setSortValue] = useState("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Safe Sorting
  const sortedProducts = useMemo(() => {
    const arr = [...products];

    switch (sortValue) {
      case "newest":
        return arr.reverse();

      case "price-high":
        return arr.sort((a, b) => (b.price || 0) - (a.price || 0));

      case "price-low":
        return arr.sort((a, b) => (a.price || 0) - (b.price || 0));

      case "popular":
        return arr.sort(
          (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
        );

      default:
        return arr;
    }
  }, [products, sortValue]);

  const currentSort =
    SORT_OPTIONS.find((o) => o.value === sortValue) ||
    SORT_OPTIONS[0];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Discover Our Products",
    description:
      "Browse our collection of sustainable handcrafted products",
    numberOfItems: products.length,
  };

  return (
    <>
      <Head>
        <title>
          Discover Our Products – mettā muse | Sustainable Fashion
        </title>

        <meta
          name="description"
          content="Explore curated sustainable products at mettā muse."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </Head>

      <Header />

      <main>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            DISCOVER OUR PRODUCTS
          </h1>
        </section>

        <div className={styles.contentLayout}>
          <div
            className={`${styles.sidebarWrap} ${
              !filterVisible ? styles.sidebarWrapHidden : ""
            }`}
          >
            <FilterSidebar />
          </div>

          <section className={styles.gridSection}>
            <h2 className={styles.srOnly}>Products</h2>

            <div className={styles.productGrid}>
              {sortedProducts.length === 0 ? (
                <p style={{ padding: "40px" }}>
                  No products available.
                </p>
              ) : (
                sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* =====================================
   STATIC GENERATION (NETLIFY SAFE)
===================================== */

export async function getStaticProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await res.json();

    return {
      props: {
        products: products || [],
      },
      revalidate: 60, // Regenerate every 60 seconds
    };
  } catch (error) {
    console.error("Static Fetch Error:", error);

    return {
      props: {
        products: [],
      },
      revalidate: 60,
    };
  }
}
