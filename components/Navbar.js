import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
// import Web3Button from "./Web3button";

const Web3Button = dynamic(
  () => {
    return import("./Web3button.js");
  },
  { ssr: false }
);

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <img className={styles.logo} src="logo.png" />
      </Link>
      <ul className={styles.navlist}>
        <li className={styles.navlistitem}></li>
        <li className={styles.navlistitem}>
          <Link className={styles.navText} href="/app">
            App
          </Link>
        </li>
        <li className={styles.navlistitem}>
          <Link className={styles.navText} href="/team">
            Team
          </Link>
        </li>
        <li className={styles.navlistitem}>
          <Web3Button />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
