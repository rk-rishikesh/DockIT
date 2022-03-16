import React, { useState, useEffect } from "react";
import { Button, Input, Row, Col, Tooltip, Modal, Steps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { runUpload, uploadMetadata } from "../util/invoice";
import { TextField, Paper } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import { invoiceUrl, areraveUrl } from "../util";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";
import { Spin, Alert } from "antd";
import { Layout } from "antd";
import "../App.css";
// SOLANA PAY
import {
  Cluster,
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
} from "@solana/web3.js";
import { encodeURL, createQR } from "@solana/pay";
import BigNumber from "bignumber.js";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
import { ADAPTER_EVENTS } from "@web3auth/base";
import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";
import { CONNECTED_EVENT_DATA } from "@web3auth/base";

import { SolanaWallet } from "@web3auth/solana-provider";
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

// WEB3 AUTH
const solanaChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.SOLANA,
  rpcTarget: "https://api.testnet.solana.com",
  blockExplorer: "https://explorer.solana.com?cluster=devnet",
  chainId: "0x3",
  displayName: "devnet",
  ticker: "SOL",
  tickerName: "solana",
};

const web3auth = new Web3Auth({
  chainConfig: solanaChainConfig,
  clientId:
    "BFV4eJZ29II3snMJCPjQAHOvaGa5b74dK2a7lLetVuhAMSI1xeP_TcUagY5q3rRC9wSguCVphlLguLGqgOa34EY", // get your clientId from https://developer.web3auth.io
});

const { Step } = Steps;
const { Header, Content, Footer } = Layout;

function CreateInvoice(props) {
  // Web3Auth Part - START
  function subscribeAuthEvents(Web3Auth) {
    Web3Auth.on(ADAPTER_EVENTS.CONNECTED, (CONNECTED_EVENT_DATA) => {
      console.log(
        "Yeah!, you are successfully logged in",
        CONNECTED_EVENT_DATA
      );
      setConnected(true);
    });

    Web3Auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      console.log("connecting");
    });

    Web3Auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      console.log("disconnected");
      setConnected(false);
    });

    Web3Auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.log("some error or user have cancelled login request", error);
    });

    Web3Auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
      console.log("modal visibility", isVisible);
    });
  }

  useEffect(() => {
    web3auth.initModal();
  });

  useEffect(() => {
    subscribeAuthEvents(web3auth);
  }, []);

  const login = async () => {
    const provider = await web3auth.connect();
    console.log(provider);
  };

  const getUserInfo = async () => {
    try {
      const userInfo = await web3auth.getUserInfo();
      console.log(userInfo);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [connected, setConnected] = useState();
  // Web3Auth Part - END

  const [recipientX, setReceipient] = useState("");
  const [amountX, setAmount] = useState("");
  const [labelX, setLabel] = useState("");
  const [messageX, setMessage] = useState("");
  const [memoX, setMemo] = useState("");
  const [payURLX, setURL] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState("");

  const uploadNFT = async (e) => {
    e.preventDefault();
    var bufferValue;
    const contentType = ["Content-Type", "image/png"];
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      setLoading(true);
      bufferValue = Buffer(reader.result);
      console.log("buffer", bufferValue);

      const cid = await runUpload(bufferValue, contentType);

      console.log(cid);
      console.log("url", `https://arweave.net/${cid}`);
      setBuffer(`https://arweave.net/${cid}`);
      setLoading(false);
    };
  };

  const generatePaymentURL = async () => {
    if (!isValidData) {
      alert("Invalid Form Details");
      return;
    }

    const recipient = new PublicKey(recipientX);
    const amount = new BigNumber(amountX);
    const reference = new Keypair().publicKey;
    const label = labelX;
    const message = messageX;
    const memo = memoX;

    const url = encodeURL({
      recipient,
      amount,
      reference,
      label,
      message,
      memo,
    });
    console.log(url);
    setURL(url);
    return url;
  };

  const uploadMetaData = async () => {
    setLoading(true);

    const payURL = await generatePaymentURL();
    const receipient = recipientX;
    const cid = await uploadMetadata(buffer, payURL, receipient);
    console.log(cid);
    setResult(cid);
    setLoading(false);
  };

  const isValid = () => {
    return recipientX && amountX && labelX && messageX && memoX;
  };

  const isValidData = isValid();

  const isNFTUploaded = () => {
    return buffer;
  };

  const nftUploaded = isNFTUploaded();

  const getStep = () => {
    if (!!result) {
      return 3;
    } else if (isValidData) {
      return 2;
    } else if (nftUploaded) {
      return 1;
    }
    return 0;
  };

  if (!connected) {
    return (
      <div>
        <Content style={{ padding: "0 50px" }}>
          <div className="hero-section">
            <Row span={100}>
              <Col span={40}>
                <div className="hero-slogan-section">
                  <br />
                  <Grid container>
                    <Grid item xs>
                      <h1 style= {{color:"purple"}}>Eliminate external Vendor</h1>
                      {`No need to open a partnership with an external vendor for managing invoices, 
                      or paying vendor-specific fees such as those from Stripe.`}
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                      .
                    </Divider>
                    <Grid item xs>
                      <h1 style= {{color:"purple"}}>Easy to get started</h1>
                      {`Create, customize, and send a NFT backed invoice in minutes—all from the 
                      Dashboard with no code required.`}
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                      .
                    </Divider>
                    <Grid item xs>
                      <h1 style= {{color:"purple"}}>Send an Invoice to customers</h1>
                      {`Email your customers a link to a NFT backed invoice page and get paid without
                       the need to share your wallet address`}
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                      .
                    </Divider>
                    <Grid item xs>
                      <h1 style= {{color:"purple"}}>Leverages Solana Pay</h1>
                      {`Solana Pay is built for immediate transactions, fees that are fractions of a penny, 
                      and a net-zero environmental impact.`}
                    </Grid>
                  </Grid>
                  <br />
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={login}
                    style={{
                      backgroundColor: "#720e9e",
                      outline: "none",
                    }}
                  >
                    Start Now
                  </Button>
                </div>
              </Col>
              <Col span={8}>
                <img src="" />
              </Col>
            </Row>
          </div>
        </Content>
        <br/>
      </div>
    );
  } else {
    return (
      <div className="invoiceInput">
        <Row>
          <Col span={14}>
            <Spin tip="Uploading Data ..." spinning={loading && !result}>
              <div className="create-form white boxed">
                <Paper
                  elevation={3}
                  style={{ padding: 10, backgroundColor: "#720e9e" }}
                >
                  <h2 style={{ paddingLeft: "35%", color: "white" }}>
                    GENERATE INVOICE
                  </h2>
                </Paper>
                <br />
                <Paper elevation={3} style={{ padding: 10 }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;Upload NFT
                  <input
                    accept=".png, .jpeg .gif"
                    id="icon-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={uploadNFT}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      style={{ marginLeft: "76%" }}
                    >
                      <AddAPhotoIcon />
                    </IconButton>
                  </label>
                </Paper>

                <br />

                <Paper elevation={3} style={{ padding: 20 }}>
                  <Input
                    placeholder="Receipient Address"
                    value={recipientX}
                    prefix="Receipient Address &nbsp;&nbsp;&nbsp; :"
                    onChange={(e) => setReceipient(e.target.value)}
                  />
                  <br />
                  <br />
                  <Input
                    placeholder="1000"
                    type="number"
                    value={amountX}
                    prefix="Item cost  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <br />
                  <br />
                  <Input
                    aria-label="Label"
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Label"
                    prefix="Label &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:"
                    value={labelX}
                  />
                  <br />
                  <br />
                  <Input
                    aria-label="Description"
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Description of the invoice"
                    prefix="Description &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:"
                    value={messageX}
                  />
                  <br />
                  <br />
                  <Input
                    aria-label="Memo"
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="Memo"
                    prefix="Memo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:"
                    value={memoX}
                  />

                  <br />
                  <br />
                  <br />
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    disabled={loading || !isValidData || !nftUploaded}
                    loading={loading}
                    onClick={uploadMetaData}
                    style={{
                      marginLeft: "37%",
                      marginRight: "37%",
                      backgroundColor: "#720e9e",
                      outline: "none",
                    }}
                  >
                    Generate Invoice
                  </Button>
                  <br />
                  <br />

                  {result && (
                    <div className="success-text">
                      Created invoice!
                      <Chip
                        label="View Metadata"
                        component="a"
                        href={areraveUrl(result)}
                        clickable
                        target="_blank"
                        style={{ marginLeft: "23%" }}
                      />
                      &nbsp;
                      <Chip
                        label="Share payment URL"
                        component="a"
                        href={invoiceUrl(result)}
                        clickable
                        target="_blank"
                        style={{ marginLeft: "17%" }}
                      />
                    </div>
                  )}
                </Paper>
                <br />
                <br />
              </div>
            </Spin>
          </Col>

          <Col span={1}></Col>

          <Col span={7} style={{ marginTop: "25%" }}>
            <div className="white boxed">
              <Steps
                className="standard-margin"
                direction="vertical"
                size="small"
                current={getStep()}
              >
                <Step
                  title="Upload NFT"
                  description="Upload the NFT related to the product."
                />
                <Step
                  title="Fill in fields"
                  description="Enter required data."
                />
                <Step
                  title="Create invoice"
                  description="Requires authorizing a create invoice operation."
                />
                <Step
                  title="Wait for payment"
                  description="Your invoice will be live for others to view and submit payment."
                />
              </Steps>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

CreateInvoice.propTypes = {};

export default CreateInvoice;
