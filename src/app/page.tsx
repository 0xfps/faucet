"use client"

import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "./components/nav-bar";
import AssetSelect from "./components/asset-select";

export default function Home() {
  return (
    <div className={styles.main}>
      <NavBar />
      <AssetSelect/>
    </div>
  );
}
