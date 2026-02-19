import { useState } from "react";
import styles from "../styles/Header.module.css";

const NAV_LINKS = ["SHOP", "SKILLS", "STORIES", "ABOUT", "CONTACT US"];

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Announcement Bar */}
      <div className={styles.announcementBar} role="complementary" aria-label="Announcements">
        <span>Lorem ipsum dolor amet</span>
        <span>Lorem ipsum dolor amet</span>
        <span>Lorem ipsum dolor amet</span>
      </div>

      {/* Main Header */}
      <div className={styles.headerMain}>
        <div className={styles.headerLeft}>
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileNavOpen}
          >
            <span className={mobileNavOpen ? styles.barOpen : ""}></span>
            <span className={mobileNavOpen ? styles.barOpen : ""}></span>
            <span className={mobileNavOpen ? styles.barOpen : ""}></span>
          </button>
          <div className={styles.logoIcon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="1" y="1" width="26" height="26" stroke="black" strokeWidth="1.5"/>
              <path d="M14 4L24 14L14 24L4 14L14 4Z" stroke="black" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
        </div>

        <a href="/" className={styles.logo} aria-label="mettā muse home">
          LOGO
        </a>

        <div className={styles.headerActions}>
          <button className={styles.iconBtn} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7"/>
              <path d="m16.5 16.5 4 4"/>
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          <button className={styles.langBtn} aria-label="Select language">
            ENG
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" className={styles.navLink}>
            {link}
          </a>
        ))}
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <nav className={styles.mobileNav} role="navigation" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className={styles.mobileNavLink} onClick={() => setMobileNavOpen(false)}>
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}