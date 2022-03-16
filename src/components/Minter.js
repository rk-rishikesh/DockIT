import React, { useState, useEffect } from "react";
import { Button, Tooltip, Modal, Input } from "antd";
// Solana Wallet Imports
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Connection, programs, actions } from "@metaplex/js";
import { useParams } from "react-router-dom";
import { parseURL, createTransaction } from "@solana/pay";
import BigNumber from "bignumber.js";
import { encodeURL, createQR } from "@solana/pay";
import { TextField, Paper } from "@material-ui/core";
import { Cluster, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";
import { extractMetadata, getDateStringFromTimestamp } from "../util/index";
import solanapay from "../Solana-Pay-logo.png";
import QRCode from "qrcode.react";
require("@solana/wallet-adapter-react-ui/styles.css");

const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  new PhantomWalletAdapter(),
];
const IMG_WIDTH = "200px";

const DEMO_NUMBER =
  Date.now().toString(36) + Math.random().toString(36).substring(2);

function Minter(props) {
  const { payId } = useParams();
  const [receipient, setReceipient] = useState();
  const [message, setMessage] = useState();
  const [memo, setMemo] = useState();
  const [amount, setAmount] = useState();
  const [reference, setReference] = useState();
  const [label, setLabel] = useState();
  const [buyerAddress, setBuyerAddress] = useState();
  const [paid, setPaid] = useState();
  const [qr, setQR] = useState();
  const [image, setImage] = useState();

  const userWallet = useWallet();
  console.log(userWallet);
  const invoiceNumber = payId;
  console.log(invoiceNumber);
  const total = 1;
  const currency = "SOL";

  const amountString = `${total} ${currency}`;
  console.log(payId);

  const getDetails = async (x) => {
    const cid = x;
    console.log("KUTEE AA N", cid);
    let url = `https://arweave.net/${cid}`;
    console.log(url);
    const response = await fetch(url);
    console.log(response);

    const json = await response.json();
    console.log(json);
    setImage(json.image);

    const qrCode = createQR(json.description);
    console.log(qrCode);
    setQR(qrCode);

    const { recipient, message, memo, amount, reference, label } = parseURL(
      json.description
    );
    setReceipient(recipient);
    setMessage(message);
    setMemo(memo);
    setAmount(amount);
    setReference(reference);
    setLabel(label);
    console.log("message: ", message);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(payId);
      const data = await getDetails(payId);
      console.log("Fisrt : ", data);
    };

    fetchData();
  }, []);

  const makePayment = async () => {
    const connection = new Connection("devnet");
    console.log(connection);
    const wallet = userWallet;
    console.log(wallet);

    const amountX = new BigNumber(amount);
    console.log(amountX);
    const use = new PublicKey(userWallet.publicKey.toBase58());
    const tx = await createTransaction(connection, use, receipient, amountX, {
      reference,
      memo,
    });
    console.log(tx);

    const trnx = await wallet.sendTransaction(tx, connection);
    console.log("HSHSHSHSHSHHSHSH", trnx);
    if (trnx) {
      setPaid(true);
    }

    // console.log(receipient);
    // console.log(memo);
    // const maxSupply = 1;
    // const uri = "https://arweave.net/JhMYHRb0wgcThWpwdJN27nfW2886k0ymQRHxIdZY1og";
    // const x = await actions.mintNFT({
    //     connection,
    //     wallet,
    //     uri,
    //     maxSupply
    //   });
    // console.log(x)
  };

  const mintMyNFT = async () => {
    console.log(payId);
    const connection = new Connection("devnet");
    console.log(connection);
    const wallet = userWallet;
    console.log(wallet);

    console.log(receipient);
    console.log(memo);
    const maxSupply = 1;
    const uri = `https://arweave.net/${payId}`;
    console.log(uri);
    const x = await actions.mintNFT({
      connection,
      wallet,
      uri,
      maxSupply,
    });
    console.log(x);
  };

  console.log(userWallet.connected);

  if (!userWallet.connected) {
    /* If the user's wallet is not connected, display connect wallet button. */
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        {console.log("HENJIN")}
        <WalletMultiButton />
      </div>
    );
  } else {
    return (
      <div className="invoice-box" id="download">
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            <tr className="top">
              <td colSpan="2">
                <table>
                  <tr>
                    <td className="title">
                      <img
                        src={solanapay}
                        style={{ width: "100%", maxWidth: IMG_WIDTH }}
                      />
                    </td>

                    <td>
                      MEMO #:&nbsp;
                      <Tooltip placement="top" title={<span>{memo}</span>}>
                        {memo}
                      </Tooltip>
                      <br />
                      Created:&nbsp;
                      {getDateStringFromTimestamp(Date.now(), true)}
                      <br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="information">
              <td colSpan="2">
                <table>
                  <tr>
                    <td>
                      <br />
                      NAME
                      <br />
                      CONTACT
                    </td>

                    <td>
                      <br />
                      John Doe
                      <br />
                      nike@gmail.com
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="heading">
              <td>Payment Method</td>

              <td>Check #</td>
            </tr>
            <tr className="details">
              <td>{currency}</td>

              <td>
                {/* {payId} */}
                {amountString}
              </td>
            </tr>
            <tr className="heading">
              <td>Item</td>

              <td>Price</td>
            </tr>
            <tr className="item">
              <td>{message}</td>

              <td>COST</td>
            </tr>
            <tr>
              <td></td>

              <td>Total: {amountString}</td>
            </tr>
            <br />
            <br />
            {/* <div>
              {image && (
                <img
                  className="img-invoice"
                  src={image}
                  style={{ maxHeight: "250px", maxWidth: "250px" ,width: "300px",
                  height: "280px",
                  padding: "20px",
                  boxShadow: "10px 10px 5px lightblue"
                }}
                />
              )}
            </div> */}
            <tr>
              <td>
                <div>
                  {qr && <QRCode value={qr} style={{ marginRight: 50 }} />}
                </div>
              </td>

              <td>
                <div style={{ marginTop: "22%" }}>
                  <Button
                    type="secondary"
                    size="large"
                    shape="round"
                    disabled={paid}
                    onClick={makePayment}
                    style={{
                      backgroundColor: "#720e9e",
                      outline: "none",
                      textEmphasisColor: "white",
                    }}
                  >
                    <div>
                      <a style={{ color: "white" }}>
                        Pay with &nbsp;&nbsp; &nbsp;
                      </a>
                      <img src={solanapay}></img>
                    </div>
                  </Button>
                </div>
              </td>
            </tr>
            &nbsp;
          </tbody>
        </table>
        <Modal
          title="Claim your NFT !"
          centered
          visible={paid}
          footer={[
            <Button key="submit" type="primary" onClick={mintMyNFT}>
              Claim NFT
            </Button>,
          ]}
        >
          <div
            style={{
              backgroundColor: "lightcoral",
            }}
          >
            <img
              src={image}
              style={{
                maxHeight: "250px",
                maxWidth: "250px",
                margin:"22%"
              }}
            ></img>
          </div>
        </Modal>
      </div>
    );
  }
}

const AppWithProvider = () => (
  <ConnectionProvider endpoint="http://127.0.0.1:8899">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <Minter />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);

export default AppWithProvider;

// export default Minter;
