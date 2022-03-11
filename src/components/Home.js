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
  "Free invoice page hosting on IPFS",
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
                X for
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

            <Button type="primary" size="large">
              <Link className="nav-link" to="/create">
                Create Invoice
              </Link>
            </Button>
          </div>
        </Col>
        <Col span={12}>
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
          </Grid>
          <br/>

          <br/>

          <br/>
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
          </Grid>

        </Col>
      </Row>
    </div>
  );
}

Home.propTypes = {};

export default withRouter(Home);
