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
  const [sortValue, setSortValue] = useState("recommended");

  // Fetch on client side (Netlify safe)
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Client fetch error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Safe Sorting
  const sortedProducts = useMemo(() => {
    const arr = [...products];

    switch (sortValue) {
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

  return (
    <>
      <Head>
        <title>Discover Our Products – mettā muse</title>
        <meta
          name="description"
          content="Explore curated sustainable products at mettā muse."
        />
      </Head>

      <Header />

      <main>
        <section className={styles.hero}>
          <h1>DISCOVER OUR PRODUCTS</h1>
        </section>

        <div className={styles.contentLayout}>
          <FilterSidebar />

          <section className={styles.gridSection}>
            <h2 className={styles.srOnly}>Products</h2>

            {loading ? (
              <p style={{ padding: "40px" }}>Loading products...</p>
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
