import styles from "@/styles/App.module.css";

const TransactionInProcess = ({etherscanTxLink}) => {
  return(<div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <img src="loading.gif" className={styles.loadingGif}/>
        <h3 className={styles.modalHeaderText}>
          Transaction In Process
        </h3>
        <p className={styles.modalText}>Waiting for confirmation</p>
        <a className={styles.etherscanLink} href={etherscanTxLink} target="_blank" rel="noreferrer"><button  className={styles.etherscanButton}>View on Etherscan</button></a>
    </div>
  </div>)
}

const TransactionCompleted = ({etherscanTxLink, amount, type, backHandler}) => {
  return(<div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
    
      <img src="success.jpeg" className={styles.successImg}/>
        <h3 className={styles.modalHeaderText}>
          Transaction Completed
        </h3>
        
        <p className={styles.modalText}>{amount} Box Tokens {type}</p>
        <a className={styles.etherscanLink} href={etherscanTxLink} target="_blank" rel="noreferrer"><button  className={styles.etherscanButton}>View on Etherscan</button></a>
        <div className={styles.modalCrossButtonDiv}>
      <button
          className={styles.smodalCrossButton}
          onClick={() => backHandler}
        >
            Back
        </button>
      </div>
    </div>
  </div>)
}

const TransactionFailed = ({backHandler}) => {
  return(<div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      
      <img src="failed.png" className={styles.failImg}/>
        <h3 className={styles.modalHeaderText}>
          Transaction Failed
        </h3> 
        <div className={styles.modalCrossButtonDiv}>
      <button
          className={styles.modalCrossButton}
          onClick={() => backHandler}
        >
            Back
        </button>
      </div>
    </div>
  </div>)
}



export {TransactionCompleted, TransactionInProcess, TransactionFailed}