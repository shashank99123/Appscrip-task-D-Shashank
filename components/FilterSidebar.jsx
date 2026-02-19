import { useState } from "react";
import styles from "../styles/FilterSidebar.module.css";

const FILTER_GROUPS = [
  {
    id: "idealFor",
    label: "IDEAL FOR",
    options: ["All", "Men", "Women", "Baby & Kids"],
  },
  {
    id: "occasion",
    label: "OCCASION",
    options: ["All", "Casual", "Formal", "Party", "Work"],
  },
  {
    id: "work",
    label: "WORK",
    options: ["All"],
  },
  {
    id: "fabric",
    label: "FABRIC",
    options: ["All", "Cotton", "Linen", "Silk", "Recycled"],
  },
  {
    id: "segment",
    label: "SEGMENT",
    options: ["All"],
  },
  {
    id: "suitableFor",
    label: "SUITABLE FOR",
    options: ["All"],
  },
  {
    id: "rawMaterials",
    label: "RAW MATERIALS",
    options: ["All"],
  },
  {
    id: "pattern",
    label: "PATTERN",
    options: ["All", "Solid", "Stripes", "Checks", "Floral"],
  },
];

function FilterGroup({ group }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(["All"]);

  const toggle = (option) => {
    if (option === "All") {
      setSelected(["All"]);
      return;
    }
    setSelected((prev) => {
      const without = prev.filter((o) => o !== "All");
      return without.includes(option)
        ? without.filter((o) => o !== option) || ["All"]
        : [...without, option];
    });
  };

  const displayValue = selected.includes("All") ? "All" : selected.join(", ");

  return (
    <div className={styles.filterGroup}>
      <button
        className={`${styles.groupHeader} ${open ? styles.groupHeaderOpen : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`filter-${group.id}`}
      >
        <span>{group.label}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {!open && (
        <p className={styles.groupValue}>{displayValue}</p>
      )}

      <div
        id={`filter-${group.id}`}
        className={`${styles.groupBody} ${open ? styles.groupBodyOpen : ""}`}
      >
        {group.options.map((option) => (
          <label key={option} className={styles.filterOption}>
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggle(option)}
              className={styles.checkbox}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FilterSidebar({ visible }) {
  const [customizable, setCustomizable] = useState(false);

  return (
    <aside
      className={`${styles.sidebar} ${!visible ? styles.sidebarHidden : ""}`}
      aria-label="Product filters"
      aria-hidden={!visible}
    >
      <label className={styles.customizableRow}>
        <input
          type="checkbox"
          checked={customizable}
          onChange={() => setCustomizable(!customizable)}
          className={styles.checkbox}
        />
        <span>CUSTOMIZABLE</span>
      </label>

      {FILTER_GROUPS.map((group) => (
        <FilterGroup key={group.id} group={group} />
      ))}
    </aside>
  );
}