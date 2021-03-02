import {
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
  header_temp: {
    background: "#9e9e9e",
  },
  dt_bg: {
    background: "#f44336",
    color: "#fff",
  },
});

export const ForecastTable = (props) => {
  const classes = useStyles();
  const row = props;
  return (
    <Grid>
      <TableContainer classes={{ root: "o-hidden" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableRow className={classes.dt_bg}>
            <TableCell width="100%">
              Date:
              {new Date(row.dt).toLocaleString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </TableCell>
          </TableRow>
          <TableRow className={classes.header_temp}>
            <TableCell align="center">Temprature</TableCell>
          </TableRow>
          <TableRow className={classes.header_temp}>
            <TableCell>Min</TableCell>
            <TableCell>Max</TableCell>
          </TableRow>
          <TableRow className={classes.header_temp}>
            <TableCell>{row.main.temp_min}</TableCell>
            <TableCell>{row.main.temp_max}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pressure</TableCell>
            <TableCell>{row.main.pressure}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Humidity</TableCell>
            <TableCell>{row.main.humidity}</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </Grid>
  );
};
