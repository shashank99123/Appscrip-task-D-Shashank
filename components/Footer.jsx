import { useState } from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Top Section */}
      <div className={styles.footerTop}>
        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h3 className={styles.sectionTitle}>BE THE FIRST TO KNOW</h3>
          <p className={styles.sectionSubtitle}>Sign up for updates from mettā muse.</p>
          <form className={styles.newsletterForm} onSubmit={handleSubscribe} aria-label="Newsletter signup">
            <input
              type="email"
              className={styles.emailInput}
              placeholder="Enter your e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              autoComplete="email"
              required
            />
            <button type="submit" className={styles.subscribeBtn}>
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* Contact */}
        <div className={styles.contact}>
          <h3 className={styles.sectionTitle}>CONTACT US</h3>
          <p className={styles.contactInfo}>+44 221 133 5360</p>
          <p className={styles.contactInfo}>customercare@mettamuse.com</p>

          <div className={styles.currency}>
            <h4 className={styles.currencyTitle}>CURRENCY</h4>
            <span className={styles.currencyValue}>
              <span aria-hidden="true">🇺🇸</span> • USD
            </span>
            <p className={styles.currencyNote}>
              Transactions will be completed in Euros and a currency reference is available on hover.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.footerBottom}>
        {/* Brand */}
        <div className={styles.footerCol}>
          <h4 className={styles.colTitle}>mettā muse</h4>
          <nav aria-label="Brand links">
            <ul className={styles.linkList}>
              {["About Us", "Stories", "Artisans", "Boutiques", "Contact Us", "EU Compliances Docs"].map((item) => (
                <li key={item}>
                  <a href="#" className={styles.footerLink}>{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Quick Links */}
        <div className={styles.footerCol}>
          <h4 className={styles.colTitle}>QUICK LINKS</h4>
          <nav aria-label="Quick links">
            <ul className={styles.linkList}>
              {["Orders & Shipping", "Join/Login as a Seller", "Payment & Pricing", "Return & Refunds", "FAQs", "Privacy Policy", "Terms & Conditions"].map((item) => (
                <li key={item}>
                  <a href="#" className={styles.footerLink}>{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Follow Us */}
        <div className={styles.footerCol}>
          <h4 className={styles.colTitle}>FOLLOW US</h4>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Payments */}
        <div className={styles.footerCol}>
          <h4 className={styles.colTitle}>mettā muse ACCEPTS</h4>
          <div className={styles.paymentMethods}>
            {["G Pay", "Mastercard", "PayPal", "Amex", "Apple Pay", "OPay"].map((p) => (
              <span key={p} className={styles.paymentBadge}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerBar}>
        <p>Copyright © 2023 mettamuse. All rights reserved.</p>
      </div>
    </footer>
  );
}