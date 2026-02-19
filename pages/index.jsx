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

export default function Home({ products }) {
  const [filterVisible, setFilterVisible] = useState(true);
  const [sortValue, setSortValue] = useState("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sort products
  const sortedProducts = useMemo(() => {
    const arr = [...products];
    switch (sortValue) {
      case "newest":
        return arr.reverse();
      case "price-high":
        return arr.sort((a, b) => b.price - a.price);
      case "price-low":
        return arr.sort((a, b) => a.price - b.price);
      case "popular":
        return arr.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return arr;
    }
  }, [products, sortValue]);

  const currentSort = SORT_OPTIONS.find((o) => o.value === sortValue);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Discover Our Products",
    description: "Browse our collection of sustainable handcrafted products",
    url: "https://mettamuse.com/shop",
    numberOfItems: products.length,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mettamuse.com" },
        { "@type": "ListItem", position: 2, name: "Shop", item: "https://mettamuse.com/shop" },
      ],
    },
  };

  return (
    <>
      <Head>
        <title>Discover Our Products – mettā muse | Sustainable Fashion &amp; Accessories</title>
        <meta
          name="description"
          content="Explore 3425 curated sustainable products at mettā muse. Shop recycled backpacks, handcrafted accessories, and eco-friendly fashion. Filter by fabric, occasion, segment and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Discover Our Products – mettā muse" />
        <meta property="og:description" content="Explore curated sustainable products at mettā muse." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <Header />

      <main>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <span>HOME</span>
          <span className={styles.breadcrumbSep}>›</span>
          <span>SHOP</span>
        </nav>

        {/* Hero Section */}
        <section className={styles.hero} aria-labelledby="page-title">
          <h1 id="page-title" className={styles.heroTitle}>
            DISCOVER OUR PRODUCTS
          </h1>
          <p className={styles.heroDesc}>
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque.
            Dolor integer scelerisque nibh amet mi ut elementum dolor.
          </p>
        </section>

        {/* Toolbar */}
        <div className={styles.toolbar} role="toolbar" aria-label="Filter and sort">
          <div className={styles.toolbarLeft}>
            <span className={styles.itemsCount}>
              {products.length} ITEMS
            </span>

            {/* Desktop filter toggle */}
            <button
              className={styles.filterToggle}
              onClick={() => setFilterVisible(!filterVisible)}
              aria-expanded={filterVisible}
              aria-controls="filter-sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="4" y1="12" x2="20" y2="12"/>
                <line x1="4" y1="18" x2="20" y2="18"/>
              </svg>
              {filterVisible ? "‹ HIDE FILTER" : "› SHOW FILTER"}
            </button>

            {/* Mobile filter button */}
            <button
              className={styles.mobileFilterBtn}
              onClick={() => setMobileFilterOpen(true)}
              aria-label="Open filters"
            >
              FILTER
            </button>
          </div>

          {/* Sort dropdown */}
          <div className={styles.sortWrapper}>
            <button
              className={styles.sortBtn}
              onClick={() => setSortOpen(!sortOpen)}
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              aria-label="Sort products"
            >
              {currentSort.label}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={sortOpen ? styles.chevronUp : ""}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {sortOpen && (
              <>
                <div className={styles.sortBackdrop} onClick={() => setSortOpen(false)} />
                <div className={styles.sortDropdown} role="listbox" aria-label="Sort options">
                  {SORT_OPTIONS.map((opt) => (
                    <div
                      key={opt.value}
                      className={`${styles.sortOption} ${sortValue === opt.value ? styles.sortOptionActive : ""}`}
                      role="option"
                      aria-selected={sortValue === opt.value}
                      onClick={() => {
                        setSortValue(opt.value);
                        setSortOpen(false);
                      }}
                    >
                      {sortValue === opt.value && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                      {opt.label}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Layout */}
        <div className={styles.contentLayout}>
          {/* Desktop Sidebar */}
          <div
            id="filter-sidebar"
            className={`${styles.sidebarWrap} ${!filterVisible ? styles.sidebarWrapHidden : ""}`}
          >
            <FilterSidebar visible={filterVisible} />
          </div>

          {/* Product Grid */}
          <section
            className={`${styles.gridSection} ${!filterVisible ? styles.gridSectionFull : ""}`}
            aria-label="Products"
          >
            <h2 className={styles.srOnly}>Products</h2>
            <div className={`${styles.productGrid} ${!filterVisible ? styles.productGridFull : ""}`}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <>
          <div
            className={styles.drawerOverlay}
            onClick={() => setMobileFilterOpen(false)}
            aria-hidden="true"
          />
          <div
            className={styles.filterDrawer}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>FILTERS</span>
              <button
                className={styles.drawerClose}
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>
            <div className={styles.drawerBody}>
              <FilterSidebar visible={true} />
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}

// Server Side Rendering — fetches products at request time
export async function getServerSideProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    return { props: { products } };
  } catch (error) {
    return { props: { products: [] } };
  }
}