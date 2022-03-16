import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";

import ReactRotatingText from "react-rotating-text";
import { Link, withRouter } from "react-router-dom";
import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const CHECKLIST_ITEMS = [
  "Free invoice page hosting on Arerave",
  "Receipts auto-generated as NFTs",
  "No vendor agreements required",
];

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

function Home(props) {
  return (
    <div className="hero-section">
      <Row>
        <Col span={12}>
          <div className="hero-slogan-section">
            <div className="hero-slogan">
              <p>
                Decentralized Invoices for
                <br />
                <ReactRotatingText
                  items={["businesses", "consultants", "everyone"]}
                />
                .
              </p>
            </div>
            {CHECKLIST_ITEMS.map((item, i) => {
              return (
                <p>
                  <CheckCircleTwoTone twoToneColor="#eb2f96" />
                  &nbsp;
                  {item}
                </p>
              );
            })}
            <br />

            <Button
              type="secondary"
              size="large"
              shape="round"
              style={{ backgroundColor: "#720e9e", outline: "none" }}
            >
              <Link className="nav-link" to="/create" style={{color:"white"}}>
                Create Invoice
              </Link>
            </Button>
          </div>
        </Col>
        <Col span={12}>
          {/* <Grid container>
            <Grid item xs>
              <img src="https://th.bing.com/th/id/OIP.UYKd8I8SK1WdPpIVY7cArAHaHa?w=204&h=203&c=7&r=0&o=5&dpr=1.12&pid=1.7" />
            </Grid>
            <Divider orientation="vertical" flexItem>
              .
            </Divider>
            <Grid item xs>
              <h1 style={{ color: "white" }}>Mello</h1>
              <h5 style={{ color: "whitesmoke" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus id dignissim justo. Nulla ut facilisis ligula.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Sed malesuada lobortis pretium.
              </h5>
            </Grid>
          </Grid>
          <br />

          <br />

          <br />
          <Grid container>
            <Grid item xs>
              <h1>Hello</h1>
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
            </Grid>
            <Divider orientation="vertical" flexItem>
              .
            </Divider>
            <Grid item xs>
              <h1>Mello</h1>
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
            </Grid>
          </Grid> */}
        </Col>
      </Row>
      <br/>
      
    </div>
    
  );
}

Home.propTypes = {};

export default withRouter(Home);
