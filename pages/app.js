import Navbar from "../components/Navbar/Navbar";
import BuySellTab from "@/components/App/BuySellTab";
import { useEffect, useState, useContext } from "react";
import styles from "@/styles/App.module.css";
import { useProvider, useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ethers } from "ethers";
import { ABI, ADDRESS } from "@/components/constants";
import dynamic from "next/dynamic";
import { TxModalContext } from "@/components/Modals/TxModalContext";

const Web3Button = dynamic(
  () => {
    return import("@/components/Navbar/Web3button.js");
  },
  { ssr: false }
);


export default function App() {
  const loadingText = "Loading..."

  const [modal, setModal] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  
  const [allBox, setBoxes] = useState([
    {
      boxId: 0,
      boxName: "Etherize",
      price: loadingText,
      tvl: loadingText,
      tokenDistribution: [
        { token: "ETH", value: "60%" },
        { token: "WETH", value: "40%" },
      ],
    },
    {
      boxId: 1,
      boxName: "DeXplore",
      price: loadingText,
      tvl: loadingText,
      tokenDistribution: [
        { token: "UNI", value: "80%" },
        { token: "WETH", value: "20%" },
      ],
    },
    {
      boxId: 2,
      boxName: "TrioBox",
      price: loadingText,
      tvl: loadingText,
      tokenDistribution: [
        { token: "ETH", value: "50%" },
        { token: "WETH", value: "20%" },
        { token: "UNI", value: "30%" },
      ],
    },
  ]);
  const [appArea, setAppArea] = useState();
  const [dataStored, setDataStored] = useState(false);

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
          boxId: 0,
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
          boxId: 1,
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
          boxId: 2,
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
    if((isConnected && (chain.id === 5))){
      setAppArea(<LogInView/>);
    }else{
      setAppArea(<LogOutView/>);
    }
  },[])

  useEffect(()=>{
    if(isConnected ){
      if(chain.id === 5){
        setAppArea(<LogInView/>);
        if(!dataStored){
          console.log("====")
          init();
          setDataStored(true);
        }
      }
      else{
     
        setAppArea(<div className={styles.connectWalletBody}>
          <SwitchNetworkButton/>
        </div>)
      }
    }else{
      setAppArea(<div className={styles.connectWalletBody}>
          <h4 className={styles.connectWalletBodyText}>Wallet is not connected!</h4>
          <Web3Button/>
      </div>)
    }
  },[isConnected, allBox, chain])



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
    const values = {setModal, setModalOpen}
    return(
    <div className={styles.body}>
      <TxModalContext.Provider value={values}>
          <BuySellTab buyBoxes={allBox} sellBoxes={allBox} />
      </TxModalContext.Provider>
    </div>
    )
  }

  const SwitchNetworkButton = () => {
    const swichToText = "Goerli Network";
    const switchId = 5;
    const currentNetworkName = chain.name;

    return (
      <>
      <div className={styles.loginText}>

        <h3 className={styles.currentNetworkName}>
          Connected to {currentNetworkName}
        </h3>
        <p className={styles.demoNetworkText}>Currently the app only works on Goerli Testnet</p>
      </div>
        {chain.id !== 5 && (
          <button
            className={styles.networkSwitchButton}
            onClick={() => {
              switchNetwork?.(switchId);
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
        {appArea}
        {isModalOpen && modal}
      </main>
    </>
  );
}
