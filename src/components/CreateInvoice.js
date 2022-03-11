import React, { useState } from "react";
import { Button, Input, Row, Col, Radio, Steps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { uploadMetadata } from "../util/invoice";
import { TextField, Paper } from "@material-ui/core";
import { invoiceUrl, areraveUrl } from "../util";
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

const { Step } = Steps;

function CreateInvoice(props) {
  const [recipientX, setReceipient] = useState("");
  const [amountX, setAmount] = useState("");
  const [labelX, setLabel] = useState("");
  const [messageX, setMessage] = useState("");
  const [memoX, setMemo] = useState("");
  const [payURLX, setURL] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

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
    const cid = await uploadMetadata(payURL, receipient);
    console.log(cid);
    setResult(cid);
    setLoading(false);
  };

  const mintNFT = () => {};

  const isValid = () => {
    return recipientX && amountX && labelX && messageX && memoX;
  };

  const isValidData = isValid();

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (isValidData) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            <Paper elevation={3} style={{ padding: 10}}>
              <h2 style={{marginLeft: "35%", marginRight: "35%"}}>GENERATE INVOICE</h2>
            </Paper>
            <br />
            <Paper elevation={3} style={{ padding: 20 }}>
              <Input
                placeholder="Receipient Address"
                value={recipientX}
                prefix="Receipient Address"
                onChange={(e) => setReceipient(e.target.value)}
              />
              <br />
              <br />
              <Input
                placeholder="1000"
                type="number"
                value={amountX}
                prefix="Item cost:"
                onChange={(e) => setAmount(e.target.value)}
              />
              <br />
              <br />
              <Input
                aria-label="Label"
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Label"
                prefix="Label"
                value={labelX}
              />
              <br />
              <br />
              <Input
                aria-label="Description"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Description of the invoice"
                prefix="Description"
                value={messageX}
              />
              <br />
              <br />
              <Input
                aria-label="Memo"
                onChange={(e) => setMemo(e.target.value)}
                placeholder="Memo"
                prefix="Memo"
                value={memoX}
              />

              <br />
              <br/>
            <br/>
              <Button
                type="primary"
                disabled={loading || !isValidData}
                loading={loading}
                onClick={uploadMetaData}
                style={{marginLeft: "37%", marginRight: "37%"}}
              >
                Generate Invoice
              </Button>
            </Paper>
            {!result && loading && (
              <span>&nbsp;Note this may take a few moments.</span>
            )}
            <br />
            <br />
            {result && (
              <div>
                <div className="success-text">Created invoice!</div>
                <a href={areraveUrl(result)} target="_blank">
                  View metadata
                </a>
                <br />
                <a href={invoiceUrl(result)} target="_blank">
                  Share payment URL
                </a>
              </div>
            )}
          </div>
        </Col>

        <Col span={1}></Col>

        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              current={getStep()}
            >
              <Step title="Fill in fields" description="Enter required data." />
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

CreateInvoice.propTypes = {};

export default CreateInvoice;
