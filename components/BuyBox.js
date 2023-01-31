import styles from "@/styles/BuyBox.module.css";
import { useState } from "react";
import { ethers } from "ethers";
import { ADDRESS, ABI } from "./constants";
//

const BuyBox = ({ box }) => {
  const [showBuy, setShowBuy] = useState(false);
  const [amount, setAmount] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(ADDRESS, ABI, signer);

  const navigationHandler = () => {
    setShowBuy(!showBuy);
  };

  const buyHandler = async (event) => {
    event.preventDefault();
    if(amount && amount != 0){
      try{
        const txValue = ethers.utils.parseEther(amount).toString();
        const tx = await contract.buy(box.boxId, {
          value: txValue
        });
        console.log({tx});
        const etherscanLink = `https://goerli.etherscan.io/tx/${tx.hash}`;
        console.log(etherscanLink);
        navigationHandler();
        alert("Transaction initiated!",);
      }
      catch(e){
        console.log(e);
        navigationHandler();
        alert(e.reason);
      }
    }
    else{
      navigationHandler();
      alert("Enter a buy amount");
    }
    setAmount("");
  };

  const Info = (props) => {
    return (
      <div className={styles.info}>
        <p className={styles.infoHeader}>{props.title}</p>
        <p className={styles.infoAmount}>{props.value}</p>
      </div>
    );
  };

  const PriceInfo = (props) => {
    return (
      <div className={styles.priceInfo}>
        <p className={styles.infoHeader}>{props.title}&nbsp;</p>
        <p className={styles.infoAmount}>{props.value}</p>
      </div>
    );
  };

  const InfoWithBorder = (props) => {
    return (
      <div className={styles.infoWithBorder}>
        <p className={styles.infoHeader}>{props.title}</p>
        <p className={styles.infoAmount}>{props.value}</p>
      </div>
    );
  };

  const Box = ({ box }) => {
    return (
      <div className={styles.outerBox}>
        <div className={styles.box}>
          <h2 className={styles.boxName}>{box.boxName}</h2>
          <div className={styles.infoArea}>
            {box.tokenDistribution.map((t) => {
              return <Info title={t.token} value={t.value} key={t.token} />;
            })}
          </div>
          <div className={styles.infoArea}>
            <InfoWithBorder title="Price" value={box.price} />
            <InfoWithBorder title="Total Value Locked" value={box.tvl} />
          </div>

          <button className={styles.buyPageButton} onClick={navigationHandler}>
            Proceed to Buy
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {!showBuy ? (
        <Box box={box} />
      ) : (
        <div className={styles.outerBox}>
          <div className={styles.buyBox}>
            <button className={styles.backButton} onClick={navigationHandler}>
              Back
            </button>

            <div className={styles.infoArea}>
              <form onSubmit={buyHandler} className={styles.inputForm}>
                <PriceInfo title="Buy Price:" value={box.price} />
                <p className={styles.enterAmounttext}>Enter Amount in ETH:</p>
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
                  BUY
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyBox;