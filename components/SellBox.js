import styles from "@/styles/SellBox.module.css";
import { useState } from "react";
import { ethers } from "ethers";
import { ADDRESS, ABI } from "./constants";
import { useAccount } from "wagmi";

const SellBox = ({ box }) => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("Fetching...");
  const {address} = useAccount();

  const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(ADDRESS, ABI, signer);

  const sellHandler = async (event) => {
    event.preventDefault();
    if(amount && amount != 0){
      try{
          const tx = await contract.sell(box.boxId, amount);
          console.log({tx});
          const etherscanLink = `https://goerli.etherscan.io/tx/${tx.hash}`;
          console.log(etherscanLink);
          alert("Transaction initiated!",);
      }
      catch(e){
        console.log(e);
        alert(e.reason);
      }
    }
    else{
      alert("Enter a sell amount");
    }
    setAmount("");
  };

  const getBalance = async () => {
    if(address){
      const result = await contract.balanceOf(address, box.boxId);
      const bal = result.toString();
      setBalance(bal);
    }else{
      console.log("address undefined")
    }
  }

  const PriceInfo = (props) => {
    getBalance();

    return (<div className={styles.infoBox}>
      <div className={styles.priceInfo}>
        <p className={styles.infoHeader}>{props.title}&nbsp;</p>
        <p className={styles.infoAmount}>{props.value}</p>
      </div>
      <div className={styles.priceInfo}>
        <p className={styles.infoHeader}>Token Balance:&nbsp;</p>
        <p className={styles.infoAmount}>{balance}</p>
      </div>
    </div>
    );
  };

  return (
    <>
       
        <div className={styles.outerBox}>
          <div className={styles.buyBox}>
          <h2 className={styles.boxName}>{box.boxName}</h2>

            <div className={styles.infoArea}>
              <form onSubmit={sellHandler} className={styles.inputForm}>
                <PriceInfo title="Sell Price:" value={box.price} />
                <p className={styles.enterAmounttext}>Enter Amount:</p>
                <input
                  className={styles.inputBox}
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  className={styles.buyButton}
                  type="submit"
                  value="Submit"
                >
                  SELL
                </button>
              </form>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default SellBox;