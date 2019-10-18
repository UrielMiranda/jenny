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
      surveys: this.props.surveys.surveys
    };
  }

  render() {
    const { surveys } = this.props;
    if (surveys && surveys.length) {
      return (
        <div>
          {surveys.data.map((item, index) => {
            return (
              <span key={index}>
                <p>
                  {item.question} <DeleteBtn id={item.id} />
                </p>
              </span>
            );
          })}
        </div>
      );
    } else {
      return <div>No items</div>;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Box);
