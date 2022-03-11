import { Button, Tooltip, Modal, Input } from "antd";
import React, { useState, useEffect } from "react";

import logo from "../../logo.svg";
import "./Invoice.css";
import { extractMetadata, getDateStringFromTimestamp } from "../../util/index";
// import { createTx } from "../../util/pay";
// Solana Wallet Imports
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, programs, actions } from '@metaplex/js';
import { useParams } from "react-router-dom";

import { parseURL, createTransaction } from '@solana/pay';
require('@solana/wallet-adapter-react-ui/styles.css');
const IMG_WIDTH = "200px";

const DEMO_NUMBER =
  Date.now().toString(36) + Math.random().toString(36).substring(2);

  const wallets = [
    /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
    new PhantomWalletAdapter()
  ];
  
  // const makeXPayment = (connection, url, payerWallet) => {
  //   console.log("MAAT AAA SALEEE");
  //   // const x = await createTx(connection, url, payerWallet);
  //   // console.log(x);
  // }

  // const getDetails = async (x) => {
  //   const id = x;
  //   console.log("KUTEE AA N",id);
  //   const details = await extractMetadata(id);
  //   // setPayURL(details.description);
  //   return details.description;
  // };

async function Invoice({ match }) {
  const { payId } = useParams();
  const [buyerAddress, setBuyerAddress] = useState();
  const [payURL, setPayURL] = useState();
  
  const userWallet = useWallet();
  console.log(userWallet);

  const invoiceNumber = payId;
  // const details = await extractMetadata(payId);
  // console.log(details);

  console.log("AA n be",invoiceNumber)
  const total = 1;
  const currency = "SOL";

  const amountString = `${total} ${currency}`;

  const connection = new Connection('devnet');
  console.log(connection);


  
  // const { recipient, message, memo, amount, reference, label } = parseURL(payURL);
  // console.log('label: ', label);
  // console.log('message: ', message);

  console.log(userWallet.connected)
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
                          src={logo}
                          style={{ width: "100%", maxWidth: IMG_WIDTH }}
                        />
                      </td>
    
                      <td>
                        NFT Voucher #:&nbsp;
                        <Tooltip
                          placement="top"
                          title={<span>{invoiceNumber}</span>}
                        >
                          {invoiceNumber.slice(0, 16)}
                        </Tooltip>
                        <br />
                        Created:&nbsp;
                        {getDateStringFromTimestamp(Date.now(), true)}
                        <br />
                        Active Until:&nbsp;
                        {getDateStringFromTimestamp(
                          Date.now() + 31 * 24 * 60 * 60 * 1000
                        )}
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
                <td>Item Name</td>
    
                <td>COST {}</td>
              </tr>
    
              <tr className="total">
                <td>
                  {logo && <img className="img-invoice" src={logo} />}
                  <br />
                  <br />
                  {  console.log(connection)}
                  <Button
                    type="primary"
                    size="large"
                    className="standard-button"
    
                    // onClick={getDetails()}
                  >
                    Pay with Solana Pay
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
        <Invoice />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)

export default AppWithProvider;