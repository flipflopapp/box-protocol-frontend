import Navbar from "../components/Navbar";
import BuySellTab from "@/components/BuySellTab";
import { useEffect, useState } from "react";
import styles from "@/styles/App.module.css";
import { useProvider, useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ethers } from "ethers";
import { ABI, ADDRESS } from "@/components/constants";
import dynamic from "next/dynamic";

const Web3Button = dynamic(
  () => {
    return import("@/components/Web3button.js");
  },
  { ssr: false }
);

export default function App() {

  const [allBox, setBoxes] = useState([
    {
      boxName: "Etherize",
      price: "Loading..",
      tvl: "Loading..",
      tokenDistribution: [
        { token: "ETH", value: "60%" },
        { token: "WETH", value: "40%" },
      ],
    },
    {
      boxName: "DeXplore",
      price: "Loading..",
      tvl: "Loading..",
      tokenDistribution: [
        { token: "UNI", value: "80%" },
        { token: "WETH", value: "20%" },
      ],
    },
    {
      boxName: "TrioBox",
      price: "Loading..",
      tvl: "Loading..",
      tokenDistribution: [
        { token: "ETH", value: "50%" },
        { token: "WETH", value: "20%" },
        { token: "UNI", value: "30%" },
      ],
    },
  ]);

  const {isConnected} = useAccount();
  const { chain } = useNetwork();
  const {
    chains,
    error: switchNetworkError,
    isLoading: switchNetworkIsLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();

  const provider = useProvider();
  const boxProtocolContract = new ethers.Contract(ADDRESS, ABI, provider);
  
  const init = async () => {
    let boxes = [];
    for(let i=0;i<3 ;i++){
      let singleBox;
      const priceTemp  = await boxProtocolContract.getBoxTokenPrice(i);
      const tvlTemp  = await boxProtocolContract.getBoxTVL(i);
      const price = priceTemp/10**18;
      const tvl = tvlTemp/10**18;
      if(i === 0){
        singleBox = {
          boxName: "Etherize",
          price: "$" + price.toFixed(2).toString(),
          tvl: "$" + tvl.toFixed(2).toString(),
          tokenDistribution: [
            { token: "ETH", value: "60%" },
            { token: "WETH", value: "40%" },
          ],
        }
      }else if(i === 1 ){
        singleBox = {
          boxName: "DeXplore",
          price: "$" + price.toFixed(2).toString(),
          tvl: "$" + tvl.toFixed(2).toString(),
          tokenDistribution: [
            { token: "UNI", value: "80%" },
            { token: "WETH", value: "20%" },
          ],
        }
      }else if (i === 2){
        singleBox = {
          boxName: "TrioBox",
          price: "$" + price.toFixed(2).toString(),
          tvl: "$" + tvl.toFixed(2).toString(),
          tokenDistribution: [
            { token: "ETH", value: "50%" },
            { token: "WETH", value: "20%" },
            { token: "UNI", value: "30%" },
          ],
        }
      }

      boxes.push(singleBox);
    }
    console.log({boxes});
    setBoxes(boxes);
  }

  useEffect(()=>{
    if(isConnected && chain.id === 5){
      init();
    }
  },[isConnected])

  const LogOutView = () => {
    return(
    <div className={styles.connectWalletBody}>
      {isConnected ? <SwitchNetworkButton/> : <>
        <h4 className={styles.connectWalletBodyText}>Wallet is not connected!</h4>
        <Web3Button/>
      </>}
    </div>)
  }

  const LogInView = () => {
    return(
    <div className={styles.body}>
      <BuySellTab buyBoxes={allBox} sellBoxes={allBox} />
    </div>
    )
  }

  const SwitchNetworkButton = () => {
    const swichToText = "Goerli Network";
    const switchId = 5;
    const currentNetworkName = chain.name;

    return (
      <>
        <h3 className={styles.currentNetworkName}>
          Connected to {currentNetworkName}
        </h3>
        {chain.id !== 5 && (
          <button
            className={styles.networkSwitchButton}
            onClick={() => {
              switchNetwork?.(switchId);
              // setIsOpen(false);
            }}
          >
            Switch to {swichToText}
          </button>
        )}
      </>
    );
  };



  return (
    <>
      <main>
        <Navbar activePage="App"/>
        {(isConnected && (chain.id === 5)) ? <LogInView/> : <LogOutView/>}
      </main>
    </>
  );
}
