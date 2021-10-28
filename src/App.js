import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import React from "react";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Clubs NFT</p>
          <p className="sub-text">
            Mint an NFT for a chance to get your favorite club
          </p>
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
