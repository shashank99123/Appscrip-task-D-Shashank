import { useState, useMemo, useEffect } from "react";
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

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterVisible, setFilterVisible] = useState(true);
  const [sortValue, setSortValue] = useState("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // 🔥 CLIENT SIDE FETCH (NETLIFY SAFE)
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // ✅ Safe Sorting (with rating protection)
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
          Discover Our Products – mettā muse | Sustainable Fashion & Accessories
        </title>
        <meta
          name="description"
          content="Explore curated sustainable products at mettā muse."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </Head>

      <Header />

      <main>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <span>HOME</span>
          <span className={styles.breadcrumbSep}>›</span>
          <span>SHOP</span>
        </nav>

        {/* Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            DISCOVER OUR PRODUCTS
          </h1>
        </section>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.itemsCount}>
              {products.length} ITEMS
            </span>

            <button
              className={styles.filterToggle}
              onClick={() => setFilterVisible(!filterVisible)}
            >
              {filterVisible ? "‹ HIDE FILTER" : "› SHOW FILTER"}
            </button>
          </div>

          {/* SORT DROPDOWN */}
          <div className={styles.sortWrapper}>
            <button
              className={styles.sortBtn}
              onClick={() => setSortOpen(!sortOpen)}
            >
              {currentSort.label}
            </button>

            {sortOpen && (
              <div className={styles.sortDropdown}>
                {SORT_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className={`${styles.sortOption} ${
                      sortValue === opt.value
                        ? styles.sortOptionActive
                        : ""
                    }`}
                    onClick={() => {
                      setSortValue(opt.value);
                      setSortOpen(false);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Layout */}
        <div className={styles.contentLayout}>
          {filterVisible && (
            <div className={styles.sidebarWrap}>
              <FilterSidebar visible={true} />
            </div>
          )}

          <section className={styles.gridSection}>
            <h2 className={styles.srOnly}>Products</h2>

            {loading ? (
              <p style={{ padding: "40px" }}>
                Loading products...
              </p>
            ) : sortedProducts.length === 0 ? (
              <p style={{ padding: "40px" }}>
                No products available.
              </p>
            ) : (
              <div className={styles.productGrid}>
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
