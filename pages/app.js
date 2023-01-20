import Navbar from "../components/Navbar";
import BuySellTab from "@/components/BuySellTab";
import { useState } from "react";
import styles from "@/styles/App.module.css";

export default function App() {
  const buyBoxes = [
    {
      boxName: "Metaverse",
      price: "$500",
      tvl: "$40000",
      tokenDistribution: [
        { token: "BTC", value: "25%" },
        { token: "ETH", value: "25%" },
        { token: "LINK", value: "25%" },
        { token: "MATIC", value: "25%" },
      ],
    },
    {
      boxName: "NFT",
      price: "$100",
      tvl: "$10000",
      tokenDistribution: [
        { token: "BTC", value: "25%" },
        { token: "ETH", value: "25%" },
      ],
    },
    {
      boxName: "DeFi",
      price: "$50",
      tvl: "$50",
      tokenDistribution: [
        { token: "BTC", value: "25%" },
        { token: "ETH", value: "25%" },
        { token: "LINK", value: "25%" },
      ],
    },
  ];

  const sellBoxes = [
    {
      boxName: "Metaverse",
      price: "$500",
      tvl: "$40000",
      tokenDistribution: [
        { token: "BTC", value: "25%" },
        { token: "ETH", value: "25%" },
        { token: "LINK", value: "25%" },
        { token: "MATIC", value: "25%" },
      ],
    },
    {
      boxName: "NFT",
      price: "$100",
      tvl: "$10000",
      tokenDistribution: [
        { token: "BTC", value: "25%" },
        { token: "ETH", value: "25%" },
      ],
    },
  ];

  return (
    <>
      <main>
        <Navbar />
        <div className={styles.body}>
          {/* <p className={styles.walletDetails}>Hello World</p> */}
          <BuySellTab buyBoxes={buyBoxes} sellBoxes={sellBoxes} />
        </div>
      </main>
    </>
  );
}
