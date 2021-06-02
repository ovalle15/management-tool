import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/display.css';
import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green , blue} from '@material-ui/core/colors';
const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h2>
              <b>Welcome</b> to the trial managment tool
            </h2>
            <p className="flow-text grey-text text-darken-1">
             This tool was build with the aim to support trial managmenet tasks at <b>DFCI</b>
             <br></br>
            sign-up or log in if you already have an account
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  textDecoration: 'none'
                }}
              >
                <ThemeProvider theme={theme}>
                  <Button
                      style= {{fontSize: '20px'}}
                      variant="outlined"
                      color="primary"
                      size="large">
                      Register
                  </Button>
                </ThemeProvider>
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  textDecoration: 'none'
                }}
              >
                <ThemeProvider theme={theme}>
                  <Button
                      style= {{fontSize: '20px'}}
                      variant="outlined"
                      color="primary"
                      size="large"
                  >
                        Log In
                  </Button>
                </ThemeProvider>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;