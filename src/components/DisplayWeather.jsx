import React, { Component } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import HelpOutlineSharpIcon from "@material-ui/icons/HelpOutlineSharp";
import axios from "axios";
import { ForecastTable } from "./Table";
import './loader.css';

export default class DisplayWeather extends Component {
  state = {
    data: [],
    cityName: "",
    isLoading:false
  };

  getData = () => {
    this.setState({ isLoading: true }, () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&appid=1635890035cbba097fd5c26c8ea672a1&cnt=5`
      )
      .then((res) => {
        const data = res.data.list;
        this.setState({ data: data,isLoading:false });
      })
      .catch((error) => {
        this.setState({ isLoading:false });
        alert(error.response.data.message);
      });
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.getData();
    }
  };

  render() {
    return (
      <Grid container spacing="8" style={{ margin: "1rem" }}>
        <Grid item xs={12}>
          <Grid container spacing="5">
            <Grid item xs={12} sm={4} lg={4}>
              <Typography variant="h5" color="secondary">
                WeatherForeCast
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <Grid container spacing="2">
                <Grid item xs={12} sm={3} lg={3}>
                  <TextField
                    onChange={(e) =>
                      this.setState({ cityName: e.target.value })
                    }
                    onKeyDown={this.handleKeyDown}
                    placeholder="Enter city name"
                  />
                </Grid>
                <Grid item xs={12} sm={3} lg={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.getData}
                    startIcon={<HelpOutlineSharpIcon />}
                  >
                    Search
                  </Button>
                  {this.state.isLoading && <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Grid container spacing="2">
              {!!this.state.data ? this.state.data.map((item, index) => (
                <Grid item xs={12} sm={2} lg={2} key={index}>
                  <ForecastTable {...item} />
                </Grid>
              ))
              :<Typography variant="h6">Search by city to display data</Typography>
            }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
