import InfoIcon from '@mui/icons-material/Info';
import { Button, Container, Grid, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { useState, useEffect } from "react";
import ViewBids from './ViewBids';

function App() {
  const [listOfProds, setListOfProds] = useState([]);
  const [productId, setProductId] = useState(null);
  const getProducts = () => {
    fetch("http://localhost:6060/e-auction/api/v1/seller/getProducts", {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
      crossDomain: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    }).then(function (response) {
      if (response.status === 200) {
        response.json().then(function (result) {
          setListOfProds(result);
        })
      }
    })
  }
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [prodData, setProdData] = useState(null);
  const [bidding, setBidding] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sort, setSort] = useState("ASE");
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const viewProd = () => {
    if (productId != null) {
      setLoading(true);
      setBidding([]);
      const query = `?sort=${sort}&page=${page - 1}`
      fetch("http://personal.dev.com:6060/e-auction/api/v1/seller/show-bids/" + productId + query, {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        crossDomain: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
      }).then(function (response) {
        setLoading(false);
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("inside")
            setProdData(result.productData);
            setBidding(result.biddings);
            setCount(Math.ceil(result.totalBiddings / 3));
            setErrorMessage(null);
          })
        }
        else {
          response.json().then(function (result) {
            setErrorMessage(result?.errorData?.message);
            setProdData();
            setBidding([]);
          })
        }

      }).catch(error => {
        setLoading(false);
        setSnackBar(true);
        setSeverity("error");
        setMessage("Not Able to Proceed");
      })
    }
  }

  const changeSort = () => {
    if (sort === "ASE") setSort("DSE")
    else setSort("ASE")
  }

  useEffect(() => {
    viewProd();
  }, [sort, page])

  const changePage = (event, value) => {
    setPage(value);
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <Container sx={{ margin: '2%' }}>
        <Grid container sm={12} xs={12} justifyContent="center" spacing={2}>
          <Grid item sm={12} xs={12} md={12}>
            <Typography variant="h4">
              Bidding Application
            </Typography>
          </Grid>
          <Grid item sm={12} xs={12} md={4}>
            <Button
              fullWidth
              endIcon={<InfoIcon />}
              variant='contained'
              onClick={(e) => getProducts()}
            >
              Fetch Details
            </Button>
          </Grid>
          <Grid item sm={12} xs={12} md={10} container direction="row" spacing={2}
            sx={{ marginTop: '-0.5%', marginBottom: '0.5%' }}>
            <Grid item sm={12} xs={12} md={3} sx={{ margin: 'auto' }}>
              <Typography variant="subtitle2" align="left">
                Product
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12} md={5}>
              <Select
                size="small"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                disabled={listOfProds.length === 0}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {listOfProds && listOfProds.length > 0 &&
                  listOfProds.map((products, index) => (
                    <MenuItem key={index} value={products}>{products}</MenuItem>
                  ))
                }
              </Select>
            </Grid>
            <Grid item sm={12} xs={12} md={4}>
              <Button
                fullWidth
                endIcon={<InfoIcon />}
                variant='contained'
                onClick={(e) => viewProd()}
              >
                Get
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <ViewBids prodData={prodData} bidding={bidding}
          errorMessage={errorMessage} snackBar={snackBar} loading={loading}
          setSnackBar={setSnackBar} message={message} severity={severity}
          sort={sort} changeSort={changeSort} count={count}
          page={page} changePage={changePage} />
      </Container>
    </div>
  );
}

export default App;
