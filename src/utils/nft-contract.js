import myEpicNft from "./MyEpicNFT.json";
import * as metamask from "./metamask";

const CONTRACT_ADDRESS = "0x4406bceD782d84dE65126E35F187c45798BDBC09";

export const getContract = () => {
  return metamask.getContract(CONTRACT_ADDRESS, myEpicNft.abi);
};

export const getNFTsStats = async () => {
  const [current, max] = await getContract().getNFTsStats();
  return { current: current.toNumber(), max: max.toNumber() };
};

export const onMint = (cb) => {
  getContract().on("NewEpicNFTMinted", (from, tokenId, totalMinted) => {
    cb(from, tokenId, totalMinted.toNumber());
  });
};

export const makeAnEpicNFT = async () => {
  return await getContract().makeAnEpicNFT();
};
