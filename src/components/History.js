import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { useMoralisSolanaApi, useMoralisSolanaCall } from "react-moralis";
import { useMoralis } from "react-moralis";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#720e9e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(tokenAddress, link) {
  return { tokenAddress, link };
}

const rows = [];

function History(props) {
  const { account } = useMoralisSolanaApi();

  // get devnet SPL NFT balance for a given address
  const options = {
    network: "devnet",
    address: "9m4dVgFdzNnTJnE38uPPuCg22iMQ3L3CKpTNzWFSsFb4",
  };
  const { fetch } = useMoralisSolanaCall(account.getNFTs, options);

  const [loading, setLoading] = useState();

  const fetchHistory = async () => {
    setLoading(true);
    const data = await fetch();
    console.log(data);
    console.log(data[0].mint);
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
      rows.push(createData(data[i].associatedTokenAddress, data[i].mint));
    }
    setLoading(false);
  };

  return (
    <div>
      <br />
      &nbsp;
      <Paper elevation={3} style={{ padding: 10 }}>
      &nbsp;&nbsp;<Input
          type="text"
          placeholder="Account address"
          style={{ paddingRight: "40%" }}
        ></Input>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={fetchHistory}
          disabled={loading}
          component="span"
        >
          View Transactions
        </Button>
      </Paper>
      <br />
      <hr />
      {true && (
        <div>
          <h1>Transaction History</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Token Address</StyledTableCell>
                  <StyledTableCell align="left">
                    Solscan&nbsp;Link
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.tokenAddress}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <a
                        target="_blank"
                        href="www.google.com"
                      >{`https://solscan.io/token/${row.link}?cluster=devnet`}</a>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

History.propTypes = {};

export default History;
