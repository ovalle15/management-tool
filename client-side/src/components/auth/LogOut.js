import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class LogOut extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (
      <div style={{ height: "20vh"}}>
        <div className="row">
          <div className="col s12 right-align">
            <h4>
              <b>Welcome,</b> {user.name.split(" ")[0]}
              <p className="grey-text" style={{fontSize: '15px' }}>
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app
              </p>
            </h4>
            <Button
              onClick={this.onLogoutClick}
              variant="outlined"
              color="primary"
              size="small"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
LogOut.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(LogOut);