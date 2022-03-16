import React, { useState, useEffect } from "react";
import { Button, Input, Select, Table } from "antd";
import * as web3 from "@solana/web3.js";
import { Connection, programs, actions } from "@metaplex/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
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
import { PublicKey } from "@solana/web3.js";

const axios = require("axios");

const { Option } = Select;

const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  new PhantomWalletAdapter(),
];

const COLUMNS = [
  //   col("tx_hash"),
  //   col("from_address"),
  "to_address",
  "value",
  "gas_spent",
];

function History(props) {
  const [address, setAddress] = useState(
    "0x73bceb1cd57c711feac4224d062b0f6ff338501e"
  );
  const userWallet = useWallet();
  const [loading, setLoading] = useState();
  const [data, setData] = useState();

  const fetchHistory = async () => {
    // if (!address || !chainId) {
    //   alert("Address and chainId are required");
    //   return;
    // }

    setLoading(true);
    try {
      let connection = new web3.Connection(web3.clusterApiUrl("devnet"));
      console.log(connection);
      const wallet = new PublicKey(userWallet.publicKey.toString());
      console.log(wallet);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = {
        jsonrpc: "2.0",
        id: 1,
        method: "qn_fetchNFTsByCreator",
        params: [{
          creator: "DznU28LgherhU2JwC2db3KmAeWPqoF9Yx2aVtNUudW6R",
          page: 1,
          perPage: 3
        }]
      };
      axios
        .post("http://sample-endpoint-name.network.quiknode.pro/token-goes-here/", data, config)
        .then(function (response) {
          // handle success
          console.log(response.data);
        })
        .catch((err) => {
          // handle error
          console.log(err);
        });
    } catch (e) {
      console.error(e);
      alert("error getting paydata" + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>
        This page can be used to lookup DockIT transactions against a given
        address.
      </p>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        prefix="Address"
      ></Input>
      <br />
      <p></p>
      &nbsp;
      <Button onClick={fetchHistory} disabled={loading} loading={loading}>
        View transactions
      </Button>
      <br />
      <hr />
      {data && (
        <div>
          <h1>Transaction History</h1>
          <Table
            dataSource={data}
            columns={COLUMNS}
            className="pointer"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  console.log("event", event.target.value);
                }, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
          />
          ;
        </div>
      )}
    </div>
  );
}

History.propTypes = {};

const AppWithProvider = () => (
  <ConnectionProvider endpoint="http://127.0.0.1:8899">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <History />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);

export default AppWithProvider;
