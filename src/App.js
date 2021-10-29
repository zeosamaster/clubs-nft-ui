import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import React from "react";
import * as metamask from "./utils/metamask";
import * as contract from "./utils/nft-contract";

// Constants
const COLLECTION_LINK =
  "https://rinkeby.rarible.com/collection/0x4406bced782d84de65126e35f187c45798bdbc09";

const App = () => {
  const [chainId, setChainId] = React.useState("");
  const [currentAccount, setCurrentAccount] = React.useState("");
  const [currentNFTCount, setCurrentNFTCount] = React.useState(0);
  const [maxNFTCount, setMaxNFTCount] = React.useState(0);
  const [isMinting, setIsMinting] = React.useState(false);

  const fetchNFTsStats = async () => {
    try {
      const { current, max } = await contract.getNFTsStats();
      setCurrentNFTCount(current);
      setMaxNFTCount(max);
    } catch (error) {
      console.error(error);
    }
  };

  const onChainChange = (chainId) => {
    setChainId(chainId);

    if (chainId === metamask.CHAINS.RINKEBY_CHAIN_ID) {
      fetchNFTsStats();
    }
  };

  const setupEventListeners = async () => {
    try {
      contract.onMint((from, tokenId, totalMinted) => {
        setCurrentNFTCount(totalMinted);
      });

      metamask.onChainChange(onChainChange);
    } catch (error) {
      console.error(error);
    }
  };

  const getConnectedAccount = async () => {
    try {
      const account = await metamask.getConnectedAccount();
      setCurrentAccount(account);
    } catch (error) {
      console.error(error);
    }
  };

  const checkChain = async () => {
    const id = await metamask.getChainId();
    onChainChange(id);
  };

  React.useEffect(() => {
    setupEventListeners();
    getConnectedAccount();
    checkChain();
  });

  const switchChain = async () => {
    try {
      await metamask.switchChain(metamask.CHAINS.RINKEBY_CHAIN_ID);
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      const account = await metamask.connectAccount();
      setCurrentAccount(account);
    } catch (error) {
      console.error(error);
    }
  };

  const mintNFT = async () => {
    setIsMinting(true);

    try {
      let nftTxn = await contract.makeAnEpicNFT();
      await nftTxn.wait();

      console.info(
        `New transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
      );
    } catch (error) {
      console.error(error);
    }

    setIsMinting(false);
  };

  const renderCTA = () => {
    if (chainId !== "0x4") {
      return (
        <button
          onClick={switchChain}
          className="cta-button switch-chain-button"
        >
          Switch to Rinkesby
        </button>
      );
    }

    if (currentAccount === "") {
      return (
        <button
          onClick={connectWallet}
          className="cta-button connect-wallet-button"
        >
          Connect to Wallet
        </button>
      );
    }

    if (isMinting) {
      return <button className="cta-button disabled-button">Minting...</button>;
    }

    if (maxNFTCount > currentNFTCount) {
      return (
        <button onClick={mintNFT} className="cta-button mint-button">
          Mint NFT
        </button>
      );
    }

    if (maxNFTCount === currentNFTCount) {
      return (
        <button className="cta-button disabled-button">Unavailable</button>
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Clubs NFT</p>
          <p className="sub-text">
            Mint an NFT for a chance to get your favorite club
          </p>
          {maxNFTCount > 0 && (
            <p className="sub-text">
              NFTs minted: {currentNFTCount}/{maxNFTCount}
            </p>
          )}
          <p className="sub-text tiny">
            <a href={COLLECTION_LINK} target="_blank" rel="noopener noreferrer">
              View Collection
            </a>
          </p>
          {renderCTA()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <span className="footer-text">
            built on{" "}
            <a
              href="https://twitter.com/_buildspace"
              target="_blank"
              rel="noopener noreferrer"
            >
              _buildspace
            </a>{" "}
            by{" "}
            <a
              href="https://twitter.com/zeox7_eth"
              target="_blank"
              rel="noopener noreferrer"
            >
              @zeox7_eth
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
