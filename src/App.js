import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Pay from "./components/Pay";
import CreateInvoice from "./components/CreateInvoice";
import { Layout } from "antd";

import { Link, withRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import History from "./components/History";
import Minter from "./components/Minter";
// import Invoice from "../src/util/invoice";
import Invoice from "../src/components/Invoice/Invoice";
import { Row, Col, Button } from "antd";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
import { ADAPTER_EVENTS } from "@web3auth/base";
import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";
import { CONNECTED_EVENT_DATA } from "@web3auth/base";

import { SolanaWallet } from "@web3auth/solana-provider";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// WEB3 AUTH
// const solanaChainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.SOLANA,
//   rpcTarget: "https://api.testnet.solana.com",
//   blockExplorer: "https://explorer.solana.com?cluster=devnet",
//   chainId: "0x3",
//   displayName: "devnet",
//   ticker: "SOL",
//   tickerName: "solana",
// };

// const web3auth = new Web3Auth({
//   chainConfig: solanaChainConfig,
//   clientId:
//     "BFV4eJZ29II3snMJCPjQAHOvaGa5b74dK2a7lLetVuhAMSI1xeP_TcUagY5q3rRC9wSguCVphlLguLGqgOa34EY", // get your clientId from https://developer.web3auth.io
// });

const { Header, Content, Footer } = Layout;

function App() {
  const [account, setAccount] = useState();
  const [connected, setConnected] = useState();
  const path = window.location.pathname;
  const isPayment = path.startsWith("/pay");

  // function subscribeAuthEvents(Web3Auth) {
  //   Web3Auth.on(ADAPTER_EVENTS.CONNECTED, (CONNECTED_EVENT_DATA) => {
  //     console.log(
  //       "Yeah!, you are successfully logged in",
  //       CONNECTED_EVENT_DATA
  //     );
  //     setConnected(true);
  //   });

  //   Web3Auth.on(ADAPTER_EVENTS.CONNECTING, () => {
  //     console.log("connecting");
  //   });

  //   Web3Auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
  //     console.log("disconnected");
  //     setConnected(false);
  //   });

  //   Web3Auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
  //     console.log("some error or user have cancelled login request", error);
  //   });

  //   Web3Auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
  //     console.log("modal visibility", isVisible);
  //   });
  // }

  // useEffect(() => {
  //   web3auth.initModal();
  // });

  // useEffect(() => {
  //   subscribeAuthEvents(web3auth);
  // }, []);

  // const login = async () => {
  //   const provider = await web3auth.connect();
  //   console.log(provider);
  // };

  // const getUserInfo = async () => {
  //   try {
  //     const userInfo = await web3auth.getUserInfo();
  //     console.log(userInfo);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <div className="App" >
      <Router>
        {/* {!connected ? (
          <Layout >
            <Content style={{ padding: "0 50px" }}>
              <div className="hero-section">
                <Row span={100}>
                  <Col span={16}>
                    <div className="hero-slogan-section">
                    <h1>Invoicing built for speed and scale</h1>
                    <br/>
                      <Button type="primary" size="large" onClick={login}>
                        Start Now 
                      </Button>
                    </div>
                  </Col>
                  <Col span={8}>
                   <img src = ""/>
                  </Col>
                </Row>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              ©2022 - Created for Riptide 2022
            </Footer>
          </Layout>
        ) : ( */}
          <Layout className="layout">
            <Header>
              <NavBar />
            </Header>
            <Content style={{ padding: "0 50px" }}>
              <div className="container">
                <Switch>
                  <Route path="/" exact component={() => <Home />} />
                  <Route path="/pay/:payId" exact component={() => <Pay />} />
                  <Route
                    path="/create"
                    exact
                    component={() => <CreateInvoice />}
                  />
                  <Route path="/history" exact component={() => <History />} />
                </Switch>
              </div>
            </Content>

            <Footer style={{ textAlign: "center", backgroundColor:"#E6E6FA" }}>
              ©2022 - Created for Riptide 2022
            </Footer>
          </Layout>
        {/* )} */}
      </Router>
    </div>
  );
}

export default App;
