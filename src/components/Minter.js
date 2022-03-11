
import React, { useState, useEffect } from "react";
import { Button, Tooltip, Modal, Input } from "antd";
// Solana Wallet Imports
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, programs, actions } from '@metaplex/js';
import { useParams } from "react-router-dom";
import { parseURL, createTransaction } from '@solana/pay';
import BigNumber from "bignumber.js";
import { encodeURL, createQR } from '@solana/pay';
import { sendAndConfirmTransaction } from '@solana/web3.js';
import {
  Cluster,
  clusterApiUrl,
  PublicKey,
  Keypair,
} from "@solana/web3.js";
import { extractMetadata, getDateStringFromTimestamp } from "../util/index";
import solanapay from "../Solana-Pay-logo.png"
import QRCode from "qrcode.react";
require('@solana/wallet-adapter-react-ui/styles.css');

const wallets = [
    /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
    new PhantomWalletAdapter()
  ]
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

  const userWallet = useWallet();
  console.log(userWallet);
  const invoiceNumber = payId;
  const total = 1;
  const currency = "SOL";

  const amountString = `${total} ${currency}`;
    console.log(payId);
    
    const getDetails = async (x) => {
      const cid = x;
      console.log("KUTEE AA N",cid);
      let url = `https://arweave.net/${cid}`;
      const response = await fetch(url);
      console.log(response);

      const json = await response.json();
      console.log(json);

      const qrCode = createQR(json.description);
      setQR(qrCode);
      
      const { recipient, message, memo, amount, reference, label } = parseURL(json.description);
      setReceipient(recipient);
      setMessage(message);
      setMemo(memo);
      setAmount(amount);
      setReference(reference);
      setLabel(label);
      console.log('message: ', message);
    };
    
    useEffect(() => {
      const fetchData = async () => {
        console.log(payId); 
        const data = await getDetails(payId);
      }
    
      fetchData();
    }, []);


    const mintInvoice = async () => {
        const connection = new Connection('devnet');
        console.log(connection);
        const wallet = userWallet;
        console.log(wallet)
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
        const amountX = new BigNumber(amount);
        console.log(amountX);
        const use = new PublicKey(userWallet.publicKey.toBase58());
        const tx = await createTransaction(connection, use, receipient, amountX, {
            reference,
            memo,
        });
        console.log(tx);

        const trnx = await wallet.sendTransaction(tx,connection);
        console.log("HSHSHSHSHSHHSHSH", trnx);
        if(trnx){
          setPaid(true);
        }
    };

    console.log(userWallet.connected)
    {console.log("HENJI")}
    if (!userWallet.connected) {
        /* If the user's wallet is not connected, display connect wallet button. */
        return (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop:'100px' }}>
            {console.log("HENJI")}
            <WalletMultiButton />
          </div>
        )
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
                        NFT Voucher #:&nbsp;
                        <Tooltip
                          placement="top"
                          title={<span>{memo}</span>}
                        >
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
                        Fulfilled by SolVISA, Inc.
                        <br />
                        {/* {name} */} Name
                        <br />
                        {/* {description} */} Description
                      </td>
    
                      <td>
                        {/* {payURL} */}
                        <br />
                        John Doe
                        <br />
                        SolVISA@gmail.com
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
    
              <tr className="total">
                <td>
                  {solanapay && <img className="img-invoice" src={solanapay} />}
                  <br />
                  <br />
                  <QRCode
                    value={qr} style={{ marginRight: 50 }}/>
                  <Button
                    type="primary"
                    size="large"
                    className="standard-button"
                    disabled={paid}
                    onClick={mintInvoice}
                  >
                    Pay with <img src={solanapay}></img>
                  </Button>
                  &nbsp;
                </td>
    
                <td>Total: {amountString}</td>
              </tr>
            </tbody>
          </table>
    
          <Input
            value={buyerAddress}
            prefix="NFT address:"
            onChange={(e) => setBuyerAddress(e.target.value)}
            placeholder="Enter the address to receive your NFT receipt"
          />
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
  )
  
export default AppWithProvider;

// export default Minter;