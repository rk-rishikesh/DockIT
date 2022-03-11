import { Keypair, PublicKey } from "@solana/web3.js";
import Arweave from "arweave";

const initOptions = {
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
};

const arweave = Arweave.init(initOptions);

let key = null;

const getMetadata = (paymentURL, imageUrl, creatorAddress) => ({
  name: "DockIT",
  symbol: "DOCK",
  description: paymentURL,
  properties: {
    files: [
      {
        uri: imageUrl,
        type: "image/png",
      },
    ],
    creators: [
      {
        address: creatorAddress,
        share: 100,
      },
    ],
  },
  image: imageUrl,
});

const runUpload = async (data, contentType, isUploadByChunk = false) => {
  key = await arweave.wallets.generate();
  const tx = await arweave.createTransaction({ data: data }, key);
  console.log(tx);
  tx.addTag(...contentType);

  await arweave.transactions.sign(tx, key);

  if (isUploadByChunk) {
    const uploader = await arweave.transactions.getUploader(tx);
    console.log(uploader);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
    }
  }

  await arweave.transactions.post(tx);
  console.log("url", `https://arweave.net/${tx.id}`);
  return tx.id;
};

export const uploadMetadata = async (paymentURL, creatorAddress) => {
  // const contentType = ["Content-Type", "image/png"];
  // const { id } = iRfKZbkkA5BR7R6sOBHav9nR1g-x85ZXjOfT7it7fJw;
  // const imageUrl = id ? `https://arweave.net/${id}` : undefined;
  console.log(paymentURL);
  console.log(creatorAddress);
  const imageUrl =
    "https://arweave.net/iRfKZbkkA5BR7R6sOBHav9nR1g-x85ZXjOfT7it7fJw";
  console.log("imageUrl", imageUrl);

  const metadata = getMetadata(paymentURL, imageUrl, creatorAddress);
  console.log(metadata);
  const metaContentType = ["Content-Type", "application/json"];
  const metadataString = JSON.stringify(metadata);
  console.log(metadataString);
  const cid = await runUpload(metadataString, metaContentType);
  return cid;
};

// const getMetadata = (name, imageUrl) => ({
//   name: "DockIT",
//   symbol: "DOCK",
//   description:
//     "You hold in your possession an OG thugbird. It was created with love for the Solana community by 0x_thug",
//   seller_fee_basis_points: 500,
//   external_url: "https://www.thugbirdz.com/",
//   collection: {
//     name: "Test Collection",
//     family: "thugbirdz",
//   },
//   properties: {
//     files: [
//       {
//         uri: imageUrl,
//         type: "image/png",
//       },
//     ],
//     category: "image",
//     maxSupply: 1,
//     creators: [
//       {
//         address: "9m4dVgFdzNnTJnE38uPPuCg22iMQ3L3CKpTNzWFSsFb4",
//         share: 100,
//       },
//     ],
//   },
//   image: imageUrl,
// });
