import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import Invoice from "./Invoice/Invoice";
// import { getInvoice, payInvoice } from "../util/invoice";
import { useParams } from "react-router-dom";
import logo from '../logo.svg';
import Minter from "./Minter";
function Pay({ match }) {
  const { payId } = useParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const fetchData = async () => {
    console.log("fetch", payId);
    if (!payId) {
      return;
    }

    // setLoading(true);
    
    // setLoading(false);
    
  };

  useEffect(() => {
    fetchData();
  }, [payId]);

  if (loading) {
    return (
      <div className="container">
        <Spin size="large" />
      </div>
    );
  }

  if (result) {
    return (
      <div>
        <img src={logo} className="header-logo" />
        <br />
        <br />
        <h1>Transaction complete!</h1>
        <p>
          Both you and the issuer received NFT's in your respective wallet
          addresses.
        </p>
        <p>Full response below:</p>
        {/* <pre>{JSON.stringify(result, null, "\t")}</pre> */}
      </div>
    );
  }

  return (
    <div>
      {console.log(payId)}
      <Minter payId={payId} />
    </div>
  );
}

Pay.propTypes = {};

export default Pay;
