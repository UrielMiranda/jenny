import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import firebase from "firebase";
import { setSurveys } from "../../actions/surveys/setSurveys";
const db = firebase.firestore();

function mapStateToProps(state) {
  return {
    surveys: state.surveys
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSurveys: survey => {
      dispatch(setSurveys(survey));
    }
  };
}

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: this.props.surveys
    };
  }

  render() {
    const { surveys } = this.state.surveys;
    console.log(surveys);
    if (surveys.length) {
      return <div>No items</div>
    } else {
      return (
        <div>

        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Box);
