import Form from "../Form/Form";
import Box from "../Box/Box";
import {
  Container,
  Avatar,
  Toolbar,
  AppBar,
  makeStyles,
  Menu,
  MenuItem
} from "@material-ui/core";
import { connect } from "react-redux";
import Save from "../Save/Save";
import React from "react";
import firebase from "firebase";
import { setSurveys } from "../../actions/surveys/setSurveys";
const db = firebase.firestore();

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSurveys: survey => {
      dispatch(setSurveys(survey));
    }
  };
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menu: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  container: {
    height: "100vh"
  },
  avatar: {
    margin: 10,
    cursor: "pointer"
  }
}));

const Dashboard = props => {
  const { photoURL, displayName } = props.user.user;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();


  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    setAnchorEl(null);
    firebase.auth().signOut();
    props.history.push("/login");
  };


  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.menu}>
            <p>Jenny Survey's</p>
            <Avatar
              onClick={handleClick}
              alt={displayName}
              src={photoURL}
              className={classes.avatar}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
      <Container fixed className={classes.container}>
        <div>
          <Form />
          <Box />
        </div>
      </Container>
    </div>
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
