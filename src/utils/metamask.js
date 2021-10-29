import { ethers } from "ethers";

export const CHAINS = {
  RINKEBY_CHAIN_ID: "0x4",
};

function getEthereum() {
  const { ethereum } = window;

  if (!ethereum) {
    throw new Error("Ethereum object doesn't exist!");
  }

  return ethereum;
}

export const getContract = (contractId, abi) => {
  const provider = new ethers.providers.Web3Provider(getEthereum());
  const signer = provider.getSigner();
  return new ethers.Contract(contractId, abi, signer);
};

export const getConnectedAccount = async () => {
  const accounts = await getEthereum().request({ method: "eth_accounts" });

  if (accounts.length === 0) {
    throw new Error("No authorized account found");
  }

  return accounts[0];
};

export const getChainId = async () => {
  return await getEthereum().request({ method: "eth_chainId" });
};

export const addChain = async ({ chainId, chainName, rpcUrls }) => {
  await getEthereum().request({
    method: "wallet_addEthereumChain",
    params: [{ chainId, chainName, rpcUrls }],
  });
};

export const switchChain = async (chainId) => {
  await getEthereum().request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId }],
  });
};

export const addToken = async ({ address, symbol }) => {
  await getEthereum().request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: { address, symbol },
    },
  });
};

export const onChainChange = (cb) => {
  getEthereum().on("chainChanged", cb);
};

export const connectAccount = async () => {
  const accounts = await getEthereum().request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};
