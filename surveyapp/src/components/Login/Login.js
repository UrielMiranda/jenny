import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { setUser } from "../../actions/user/setUser";

firebase.initializeApp({
  apiKey: "AIzaSyD5RkmvdwYLV6ozUfzsPY134A0u6ga8wSg",
  authDomain: "jenny-hpawmv.firebaseapp.com",
  databaseURL: "https://jenny-hpawmv.firebaseio.com",
  projectId: "jenny-hpawmv",
  storageBucket: "jenny-hpawmv.appspot.com",
  messagingSenderId: "218303481755",
  appId: "1:218303481755:web:9b2cf9e845171f7e64833e"
});

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => {
      dispatch(setUser(user));
    }
  };
}

class Login extends Component {
  state = {
    isSignedIn: false
  };
  uiConfig = {
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      const { displayName, photoURL, email } = user;
      const usrObj = {
        displayName: displayName,
        photoURL: photoURL,
        email: email
      };
      this.props.setUser(usrObj);
      if (user) {
        this.props.history.push("/dashboard");
      }
    });
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    if (!this.state.isSignedIn) {
      return (
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>
          Welcome {firebase.auth().currentUser.displayName}! You are now
          signed-in!
        </p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
