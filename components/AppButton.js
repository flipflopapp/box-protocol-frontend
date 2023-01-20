import styles from "@/styles/Navbar.module.css";
import Link from "next/link";

const AppButton = (props) => {
  return (
    <Link href="/app">
      <button className={styles.connectButton}>{props.text}</button>
    </Link>
  );
};

export default AppButton;
