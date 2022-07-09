import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import AddTransaction from './AddTransaction'

function Dashboard (props) {
	console.log('calling')
  // function onLogoutClick (e){
  //   e.preventDefault();
  //   props.logoutUser();
  // };
	return (
		<Grid>
      <Typography style={{fontSize:'24px',textAlign:'center',fontWeight:450,padding:10}}>Dashboard for staff/Admin</Typography>
      <AddTransaction/>
		</Grid>
	);
}


Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
