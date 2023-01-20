import {
  useConnect,
  useAccount,
  useDisconnect,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
  goerli,
  mainnet,
} from "wagmi";
import styles from "@/styles/Navbar.module.css";
import { useState } from "react";

const Web3Button = () => {
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("./copy.png");

  const {
    connect,
    connectors,
    error: connectError,
    isLoading: connectIsLoading,
    pendingConnector,
  } = useConnect();
  const { address, isConnected, isDisconnected, isConnecting } = useAccount();
  const { chain } = useNetwork();
  const {
    chains,
    error: switchNetworkError,
    isLoading: switchNetworkIsLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();
  // console.log({ goerli });

  const copyAddressHandler = () => {
    navigator.clipboard.writeText(address);
    setCopyStatus("./check.png");
    setTimeout(() => {
      setCopyStatus("./copy.png");
    }, 1000);
  };

  const ConnectWalletButton = () => {
    return (
      <>
        {connectors.map((connector) => (
          <button
            className={styles.connectButton}
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            Connect Wallet
          </button>
        ))}
      </>
    );
  };

  const SwitchNetworkButton = () => {
    let swichToText;
    let switchId;
    let currentNetworkName;
    if (chain.id === goerli.id) {
      switchId = mainnet.id;
      swichToText = "Ethereum Network";
      currentNetworkName = "Goerli Network";
    } else if (chain.id === mainnet.id) {
      switchId = goerli.id;
      swichToText = "Goerli Network";
      currentNetworkName = "Ethereum Network";
    }

    return (
      <>
        <h3 className={styles.currentNetworkName}>
          Connected to {currentNetworkName}
        </h3>
        <button
          className={styles.networkSwitchButton}
          onClick={() => {
            switchNetwork?.(switchId);
            // setIsOpen(false);
          }}
        >
          Switch to {swichToText}
        </button>
      </>
    );
  };

  const DisconnectWalletButton = () => {
    let displayAddress =
      address.substring(0, 6) + "...." + address.substring(address.length - 4);
    const { data: ensName } = useEnsName({
      address: address,
    });
    if (ensName) {
      displayAddress = ensName;
    }

    return (
      <div className={styles.disconnectArea}>
        <button
          className={styles.diconnectButtonHandler}
          onClick={() => setIsOpen(true)}
        >
          {displayAddress}
        </button>
        {isOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalHeaderText}>
                  {displayAddress}
                  {isConnected && (
                    <button
                      className={styles.copyButton}
                      onClick={copyAddressHandler}
                    >
                      <img className={styles.copyIcon} src={copyStatus} />
                    </button>
                  )}
                </h2>
                <button
                  className={styles.modalCrossButton}
                  onClick={() => setIsOpen(false)}
                >
                  Back
                </button>
              </div>
              <div className={styles.modalFooter}>
                <SwitchNetworkButton />
                <button
                  className={styles.disconnectButton}
                  onClick={() => {
                    disconnect();
                    setIsOpen(false);
                  }}
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>{isConnected ? <DisconnectWalletButton /> : <ConnectWalletButton />}</>
    // <ConnectWalletButton />
  );
};

export default Web3Button;
